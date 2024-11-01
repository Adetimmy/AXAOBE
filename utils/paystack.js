require("dotenv").config();
const { CREATED, UNAUTHORIZED } = require("http-status-codes").StatusCodes;
const db = require("../db");
const BadRequest = require("../errors/bad-request");
// Require paystack library
const paystack = require("paystack-api")(process.env.TEST_SECRET);

// initialize transaction
const initializeTrans = async (req, res) => {
  try {
    // order id
    let { id } = req.params;
    const { email, amount, plan } = req.body;
    if (!email && !amount && !id) {
      throw new BadRequest("Please Provide email, amount and id for order");
    }
    const response = await paystack.transaction.initialize({
      email,
      amount,
      plan, // optional but we'll use for subscription
    });

    const data = {
      paystack_ref: response.data.reference,
    };

    const orderExisting = await db.order.findOne({
      where: {
        id: id,
      },
    });

    if (!orderExisting) {
      throw new BadRequest("Order not found");
    }
    const order = await db.order.update(data, {
      where: {
        id: id,
      },
    });

    if (!order) {
      throw new BadRequest("Order not found");
    }

    res.status(CREATED).json({
      data: response.data,
      message: response.message,
      status: response.status,
    });
  } catch (error) {
    throw new BadRequest(error.message);
  }
};

// verify transaction
const verifyTrans = async (req, res) => {
  try {
    let { id } = req.params;

    const order = await db.order.findOne({
      where: {
        id: id,
      },
    });

    if (order.paystack_ref === "success")
      return res.status(UNAUTHORIZED).send({
        data: {},
        message: "Transaction has been verified",
        status: 1,
      });

    const response = await paystack.transaction.verify({
      reference: order.paystack_ref,
    });

    if (response.data.status == "success") {
      const data = {
        paystack_ref: response.data.status,
        transaction_id: `AXAO${response.data.reference}${Date.now()}`,
      };
      await db.order.update(data, {
        where: {
          id: id,
        },
      });

      return res.status(CREATED).send({
        data: response.data,
        message: response.message,
        status: response.status,
      });
    } else {
      return res.status(CREATED).send({
        data: response.data,
        message: response.message,
        status: response.status,
      });
    }
  } catch (error) {
    throw new BadRequest(error.message);
  }
};

module.exports = {
  verifyTrans,
  initializeTrans,
};
