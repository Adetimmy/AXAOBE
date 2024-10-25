require("express-async-errors");
require("dotenv").config();
const db = require("./db/index");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const NotFoundMiddleWare = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// router
const createCustomer = require("./router/index");

const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use("/api/v1", createCustomer);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Home Page</>");
});

// NotFoundMiddleWare
app.use(NotFoundMiddleWare);

// ErrorHandler
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    // await db.order.drop()
    // await db.customer.sync({force:true})
    // await db.order.sync()
    await db.sequelize.sync();
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
