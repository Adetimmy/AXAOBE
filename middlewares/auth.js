require("dotenv").config();
const jwt = require("jsonwebtoken");
const BadRequest = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

// Middleware to protect routes
module.exports = function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token

  if (!token || !req.headers.authorization.startsWith("Bearer ")) {
    throw new BadRequest("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user info (userId, role) to the request object
    next();
  } catch (err) {
    throw new UnauthenticatedError("Invalid Token");
  }
};

 function RegisterValidator(req, res, next) {
  const querySchema = Joi.object({
    firstName: Joi.string().required().messages({
      "any.required": "First Name cannot be blank",
    }),
    lastName: Joi.string().required().messages({
      "any.required": "Last Name cannot be blank",
    }),
    email: Joi.string().email().messages({
      "string.email": "Please provide a valid email",
    }),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
      .messages({
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
  });

  // Validate the request body
  const { error, value } = querySchema.validate(req.body);
  if (!error) {
    req.valid = value;
    next();
  }
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};


 async function LoginValidator(req, res, next) {
  const querySchema = Joi.object({
    email: Joi.string().email().messages({
      "string.email": "Please provide a valid email",
    }),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
      .messages({
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
  });

  const { value, error } = querySchema.validate(req.body);

  if (!error) {
    req.user = value;
    next();
  }

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
};


module.exports = {
  LoginValidator,
  RegisterValidator
}