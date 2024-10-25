const Sequelize = require("sequelize");
const model = require("../model");

const sequelize = new Sequelize("task", "adetimmy", "1417", {
  host: "localhost",
  dialect: "postgresql",
  port: "5432",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customer = model(sequelize, Sequelize.DataTypes).Customer;
db.order = model(sequelize, Sequelize.DataTypes).Order;
db.orderItem = model(sequelize, Sequelize.DataTypes).OrderItem;
db.product = model(sequelize, Sequelize.DataTypes).Product;

module.exports = db;
