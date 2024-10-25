module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      shipping_fee: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.ENUM("payment on delivery", "paystack"),
        defaultValue: "paystack",
      },
      customer_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "customer",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    { freezeTableName: true }
  );
  return Order;
};


// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const Order = sequelize.define("Order", {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,  // UUIDV4 should be a reference, not a call
//       primaryKey: true,
//     },
//     total_amount: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//       validate: {
//         notNull: {
//           msg: "please provide an amount",
//         },
//       },
//     },
//     payment_method: {
//       type: DataTypes.ENUM('payment on delivery', 'paystack'),  // Correct ENUM definition
//       defaultValue: 'paystack',
//     },
//     customerId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: 'Customers',  // You should pass the table name as a string or the model name
//         key: 'id',           // Primary key of the referenced table
//       },
//       onUpdate: 'CASCADE',
//       onDelete: 'CASCADE',
//     },
//   });

//   return Order;
// };

