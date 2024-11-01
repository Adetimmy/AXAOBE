const { CREATED } = require("http-status-codes").StatusCodes;
const db = require("../../db");
const BadRequest = require("../../errors/bad-request");
const { DiscountSchema } = require("../../utils/schema");

module.exports.createDiscount = async (res, req) => {
  const { error, value } = DiscountSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const discount = await db.discount.create(value);
  res.status(CREATED).json({ success: true, discount });
};
