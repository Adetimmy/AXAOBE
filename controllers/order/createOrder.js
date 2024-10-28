const db = require("../../db");
const BadRequest = require("../../errors/bad-request");
const { OrderSchema } = require("../../utils/schema");
const { calculateSubtotal, calculateTotalAmount } = require("../../utils/util");
const { CREATED, INTERNAL_SERVER_ERROR } =
  require("http-status-codes").StatusCodes;

module.exports = async function createOrder(req, res) {
  const { value, error } = OrderSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
    // Start a transaction
    const transaction = await db.sequelize.transaction();

    const item = typeof value.items === 'string'? JSON.parse(value.items) : value.items;

    try {
      // Create the order within the transaction
      const newOrder = await db.order.create(
        {
          shipping_fee: value.shipping_fee,
          subtotal: calculateSubtotal(item),
          total_amount: calculateTotalAmount(item, value.shipping_fee),
          payment_method: value.payment_method,
          customer_id: value.customer_id,
        },
        { transaction }
      );

      // Bulk create order items within the transaction
      await db.orderItem.bulkCreate(
        {
          quantity: item.quantity,
          order_id: newOrder.id,
          product_id: item.id,
        },
        { transaction }
      );

      // Commit the transaction if all operations succeed
      await transaction.commit();

      res.status(CREATED).json({ success: true, newOrder });
    } catch (error) {
      // Rollback the transaction if any operation fails
      await transaction.rollback();
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "Error creating order", error: error.message });
    }
};
