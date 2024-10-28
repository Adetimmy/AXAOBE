const { OK } = require("http-status-codes").StatusCodes;
const db = require("../../db");
const NotFound = require("../../errors/not-found");

module.exports = async function getCustomer(req, res) {
  const { id } = req.params;
  const customer = await db.customer.findOne({
    where: {
      id: id,
    },
  });
  if (!customer) {
    throw new NotFound(`Customer with id:${id} not foun`);
  }
  res.status(OK).json({ success: true, customer });
};
