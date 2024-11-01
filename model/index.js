// Associations
module.exports = (sequelize, DataTypes) => {
  const Customer = require("./customer")(sequelize, DataTypes);
  const Order = require("./order")(sequelize, DataTypes);
  const OrderItem = require("./order-items")(sequelize, DataTypes);
  const Product = require("./product")(sequelize, DataTypes);
  const Discount = require('./discount')(sequelize, DataTypes)

  // Customer-Order Association
  Customer.hasMany(Order, { foreignKey: "customer_id", as: "order" });
  Order.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });

  // Order-OrderItem Association
  Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
  OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });

  // Product-OrderItem Association
  Product.hasMany(OrderItem, { foreignKey: "product_id", as: "orderItems" });
  OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });

  return { Customer, Order, OrderItem, Product, Discount };
};
