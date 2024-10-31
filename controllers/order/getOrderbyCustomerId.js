const { OK, INTERNAL_SERVER_ERROR } = require("http-status-codes").StatusCodes;
const db = require("../../db");
const BadRequest = require("../../errors/bad-request");

// Get all Orders by Customer ID
module.exports = async function getOrdersByCustomerId(req, res) {
  const { customer_id } = req.params;
  try {
    const orders = await db.order.findAll({
      where: { customer_id: customer_id },
      include: {
        model: db.orderItem,
        as: "items", // as named in the association
        include: { all: true },
      }, // Include order items with each order
    });

    if (orders.length === 0) {
      throw new BadRequest("No orders found for this customer");
    }

    res.status(OK).json({ success: true, orders });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};
