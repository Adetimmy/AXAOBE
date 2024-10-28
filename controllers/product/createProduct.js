const db = require("../../db");
const BadRequest = require("../../errors/bad-request");
const { ProductSchema } = require("../../utils/schema");

const { CREATED } = require("http-status-codes").StatusCodes;

module.exports = async (req, res, next) => {
  const { value, error } = ProductSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const data = await db.product.create(value);
  res.status(CREATED).json({ sucess: true, data });
};
