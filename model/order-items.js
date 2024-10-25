module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define(
      "order_item",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        price: {
          type: DataTypes.FLOAT,
          defaultValue: 0.0,
        },
        quantity: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
        },
        order_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "order",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        product_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "product",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      { freezeTableName: true }
    );
    return OrderItem;
  };

  //module.exports = function OrderItems(sequelize, Sequelize) {
//   const OrderItem = sequelize.define("orderItem", {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     price: {
//       type: DataTypes.FLOAT,
//       defaultValue: 0.0,
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0,
//     },
//     order_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: "orders", // Reference to Product model
//         key: "id", // Primary key of Product model
//       },
//       onUpdate: "CASCADE", // What happens on update
//       onDelete: "CASCADE", // What happens on delete
//     },
//     product_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: "products", // Reference to Product model
//         key: "id", // Primary key of Product model
//       },
//       onUpdate: "CASCADE", // What happens on update
//       onDelete: "CASCADE", // What happens on delete
//     },
//     freezeTableName: true,
//   });
//   return OrderItem
// };