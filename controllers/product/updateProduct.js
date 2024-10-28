const db = require("../../db");
const BadRequest = require("../../errors/bad-request");
const { ProductSchema } = require("../../utils/schema");

const { OK } = require("http-status-codes").StatusCodes;

module.exports = async (req, res, next) => {
  const { value, error } = ProductSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const products = await db.product.update(value, { 
    where: { id: req.params.id },
  });

  if (!products) {
    throw new BadRequest(`Unable to fetch product with id:${req.params.id}`);
  }
  res
    .status(OK)
    .json({
      sucess: true,
      msg: `successfully updated the product with id:${req.params.id}`,
    });
};
