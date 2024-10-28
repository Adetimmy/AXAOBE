const { OK } = require("http-status-codes").StatusCodes;
const db = require("../../db");
const NotFound = require("../../errors/not-found");

// Update an existing Order
module.exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { value, error } = OrderSchema.validate(req.body);

  if (error) {
    throw new BadRequest(error.message);
  }

  const order = await db.order.find({
    where: {
      id: id,
    },
    value,
  });

  if (!order) {
    throw new NotFound(`Order with id:${id} not found`);
  }

  res.status(OK).json({ success: true, order });
};
