module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
      "product",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        colors: {
          type: DataTypes.JSONB,
          defaultValue:['#000'],
          allowNull: false,
        },
        description: {
          type: DataTypes.JSONB,
        },
        images: {
          type: DataTypes.JSONB,
          defaultValue:[''],
          allowNull: false,
        },
        stock_quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          validate: { min: 0 },
        },
        status: {
          type: DataTypes.ENUM("new", "preorder", "hot", "sold"),
          defaultValue: "new",
        },
        price: {
          type: DataTypes.JSONB,
          allowNull: false,
          defaultValue: { local: "0.00", foreign: "0.00" },
        },
        views: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        sales_count: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        freezeTableName: true,
        indexes: [
          { fields: ["name"] },
          { fields: ["views"] },
          { fields: ["sales_count"] },
        ],
      }
    );
    return Product;
  };

  // module.exports = (sequelize, Sequelize) => {
//   const Product = sequelize.define(
//     "product",
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       colors: {
//         type: DataTypes.JSONB,
//         allowNull: false,
//       },
//       //   category: {
//       //     type: DataTypes.STRING,
//       //     allowNull: false,
//       //   },
//       desc: {
//         type: DataTypes.TEXT, // Use TEXT for potentially long descriptions
//       },
//       images: {
//         type: DataTypes.JSON, // JSON datatype for array of images
//       },
//       stock_quantity: {
//         type: DataTypes.INTEGER,
//         defaultValue: 0,
//         allowNull: false,
//         validate: {
//           min: 0,
//         },
//       },
//       status: {
//         type: DataTypes.ENUM("new", "preorder", "hot", "sold"),
//         defaultValue: "new",
//       },
//       price: {
//         type: DataTypes.JSONB, // JSONB to store local and foreign prices together
//         allowNull: false,
//         defaultValue: {
//           local: "0.00", // Default local price
//           foreign: "0.00", // Default foreign price
//         },
//       },
//       // Tracking product popularity
//       views: {
//         type: DataTypes.INTEGER, // To track how many times a product has been viewed
//         defaultValue: 0,
//       },
//       salesCount: {
//         type: DataTypes.INTEGER, // To track how many times a product has been sold
//         defaultValue: 0,
//       },
//     },
//     {
//       // Additional option to make performance improvements for large datasets
//       indexes: [
//         {
//           fields: ["name"], // Add index for name to speed up queries based on the product name
//         },
//         // {
//         //   fields: ['category'],  // Add index for category to speed up filtering by category
//         // },
//         {
//           fields: ["views"], // Index to optimize queries that sort or filter by views
//         },
//         {
//           fields: ["salesCount"], // Index to optimize queries that sort or filter by salesCount
//         },
//       ],
//     }
//   );
//   return Product
// };