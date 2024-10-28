const db = require("../../db");
const BadRequest = require("../../errors/bad-request");

const { OK } = require("http-status-codes").StatusCodes;

module.exports = async (req, res, next) => {
  const products = await db.product.findAll();
  if (!products) {
    throw new BadRequest("Unable to fetch product");
  }
  res.status(OK).json({ sucess: true, count: products.length, products });
};
