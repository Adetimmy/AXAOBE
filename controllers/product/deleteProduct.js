const db = require("../../db");
const BadRequest = require("../../errors/bad-request");

const { OK } = require("http-status-codes").StatusCodes;

module.exports = async (req, res, next) => {
  const products = await db.product.destroy({
    where: { id: req.params.id },
  });

  if (!products) {
    throw new BadRequest(`Unable to fetch product with id:${req.params.id}`);
  }
  res.status(OK).json({
    sucess: true,
    msg: `successfully deleted the product with id:${req.params.id}`,
  });
};
