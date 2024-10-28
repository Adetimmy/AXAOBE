const { CREATED } = require("http-status-codes").StatusCodes;
const { Op } = require("sequelize");
const db = require("../../db");
const BadRequest = require("../../errors/bad-request");
const { CustomerSchema } = require("../../utils/schema");

module.exports = async function createCustomer(req, res) {
  const { value, error } = CustomerSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }

  // Correct the where clause by specifying the columns explicitly
  const existingCustomer = await db.customer.findAll({
    where: {
      [Op.or]: [
        { email: value.email }, // Search by email
        { phoneNumber: value.phoneNumber }, // Search by phone number
      ],
    },
  });

  if (existingCustomer && existingCustomer.length > 0) {
    // Step 2: Update the rest of the fields (if new data is provided)
    await existingCustomer[0].update({
      fullName: value.fullName || existingCustomer[0].fullName, // Keep existing value if new data isn't provided
      address: value.address || existingCustomer[0].address,
    });
    return res
      .status(CREATED)
      .json({ success: true, customer: existingCustomer[0] });
  }

  // If no existing customer, upsert (create or update)
  const data = await db.customer.upsert(value);
  res.status(CREATED).json({ success: true, customer: data });
};
