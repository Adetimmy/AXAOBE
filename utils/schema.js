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
      "string.pattern.base": "Phone number should contain only digits",
    }),
});

// Product Schema
const ProductSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "Please provide a name for your product." }),
  colors: Joi.array(),
  description: Joi.array().required().messages({
    "array.empty": "Please provide the descriptions of the product",
  }),
  images: Joi.array(),
  status: Joi.string()
    .valid("new", "preorder", "hot", "sold")
    .required()
    .messages({
      "any.only": "Status must be one of 'new', 'preorder', 'hot', or 'sold'",
    }),
  price: Joi.object({
    local: Joi.number().precision(2).required().messages({
      "number.base": "Local price must be a number",
      "any.required": "Please provide a local price",
    }),
    foreign: Joi.number().precision(2).required().messages({
      "number.base": "Foreign price must be a number",
      "any.required": "Please provide a foreign price",
    }),
  })
    .required()
    .messages({
      "object.base": "Price must be an object with local and foreign values",
      "any.required": "Please provide the price details",
    }),
});

// Order Schema
const OrderSchema = Joi.object({
  shipping_fee: Joi.number(),
  payment_method: Joi.string()
    .valid("payment on delivery", "paystack")
    .required()
    .messages({
      "string.empty":
        "Please provide method of payment, either pay on delivery or paystack service",
    }),
  customer_id: Joi.string()
    .required()
    .messages({ "number.empty": "Please provide customer id for the order" }),
  product_id: Joi.array()
    .required()
    .messages({ "string.empty": "Product ordered id can't be empty" }),
  quantity: Joi.array()
    .required()
    .messages({ "string.empty": "Product quantity can't be empty" }),
  color: Joi.array()
    .required()
    .messages({ "string.empty": "Product selected color can't be empty" }),
});

// Discount Schema
const DiscountSchema = Joi.object({
  code:Joi.string()
  .required()
  .messages({'string.empty':"discount code must be provided"}),
  type:Joi.string()
  .default('percentage')
  .required()
  .valid('percentage', 'fixed')
  .messages({'string.empty':'please provide type of dscount'}),
  discount_value: Joi.number()
  .required()
  .messages({'string.empty':'please provide discount value either in percentage or flat value'}),
  expiry_date:Joi.date()
  .required()
  .messages({'date.empty':'please insert delete this code expires'})
})


module.exports = {
  CustomerSchema,
  ProductSchema,
  OrderSchema,
  DiscountSchema
};
