const CustomAPIError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const { Sequelize } = require("../db");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  if (err instanceof Sequelize.ValidationError) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: err.errors[0].message });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }
  if (err instanceof Sequelize.UniqueConstraintError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Something went wrong try again later");
};

module.exports = errorHandlerMiddleware;
