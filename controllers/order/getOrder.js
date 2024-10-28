const { OK, INTERNAL_SERVER_ERROR } = require("http-status-codes").StatusCodes;
const db = require("../../db");
const NotFound = require("../../errors/not-found");

// Get Order with Order Items by Order ID
module.exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await db.order.findByPk(id, {
    include: [
      { model: OrderItem, as: "orderItems" },
      { model: Customer, as: "customer" },
    ],
  });
  if (!order) {
    throw new NotFound(`Order with id:${id} not found`);
  }

  res.status(OK).json({ success: true, order });
};
