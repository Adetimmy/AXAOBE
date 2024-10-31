const db = require("../../db");
const BadRequest = require("../../errors/bad-request");

const { OK } = require("http-status-codes").StatusCodes;

module.exports = async (req, res, next) => {

  await db.product.increment("views", { where: { id: req.params.id } });
  const products = await db.product.findOne({ where: { id: req.params.id }, attributes:["id", "images", "price", "description", "name", "colors"] });

  if (!products) {
    throw new BadRequest(`Unable to fetch product with id:${req.params.id}`);
  }
  res.status(OK).json({ sucess: true, count: products.length, products });
};
