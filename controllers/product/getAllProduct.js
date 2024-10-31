const db = require("../../db");
const BadRequest = require("../../errors/bad-request");

const { OK } = require("http-status-codes").StatusCodes;

module.exports = async (req, res, next) => {
  const products = await db.product.findAll({
    attributes:["id", "name", "status", "images", "price", "colors"]
  });
  if (!products) {
    throw new BadRequest("Unable to fetch product");
  }
  console.log(products)
  res.status(OK).json({ sucess: true, count: products.length, products });
};
