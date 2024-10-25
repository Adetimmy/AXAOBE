const Joi = require("joi");

const CustomerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .required()
    .messages({ "string.email": "Please provide a valid email" }),

  fullName: Joi.string()
    .required()
    .messages({ "string.empty": "Please provide your full name" }),

  address: Joi.string()
    .required()
    .messages({ "string.empty": "Please provide your address" }),

  phoneNumber: Joi.string()
  .pattern(/^(\+?[0-9]{13}|0[0-9]{10})$/)
    .required()
    .messages({ 
      "string.empty": "Please provide your phone number",
      "string.pattern.base": "Phone number should contain only digits"
    }),
});

module.exports = {
  CustomerSchema,
};
