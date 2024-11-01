const db = require("../../db");
const BadRequest = require("../../errors/bad-request");
const { OrderSchema } = require("../../utils/schema");
const { calculateSubtotal, calculateTotalAmount } = require("../../utils/util");
const { CREATED, INTERNAL_SERVER_ERROR } = require("http-status-codes").StatusCodes;

module.exports = async function createOrder(req, res) {
  const { value, error } = OrderSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }

  // Start a transaction
  const transaction = await db.sequelize.transaction();

  try {
    // Fetch all products based on product_id
    const products = await Promise.all(
      value.product_id.map((id) => db.product.findOne({ where: { id } }))
    );

    // Check if any products do not exist
    if (products.includes(null)) {
      throw new BadRequest("One or more products do not exist");
    }

    // Extract data values from each successful result
    const productData = products.map((product) => product.dataValues);
    
    // Create the order within the transaction
    const newOrder = await db.order.create(
      {
        shipping_fee: value.shipping_fee || 0,
        subtotal: calculateSubtotal(productData, value.quantity),
        total_amount: calculateTotalAmount(productData, value.quantity, value.shipping_fee || 0),
        payment_method: value.payment_method,
        customer_id: value.customer_id,
      },
      { transaction }
    );

    // Create order items within the transaction
    await Promise.all(
      value.product_id.map((productId, index) => 
        db.orderItem.create(
          {
            quantity: value.quantity[index], // Assuming quantity is an array
            order_id: newOrder.id,
            product_id: productId,
            color: value.color
          },
          { transaction }
        )
      )
    );

    // Commit the transaction if all operations succeed
    await transaction.commit();
    res.status(CREATED).json({ success: true, newOrder });
  } catch (error) {
    // Rollback the transaction if any operation fails
    await transaction.rollback();
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Error creating order", error: error.message });
  }
};
