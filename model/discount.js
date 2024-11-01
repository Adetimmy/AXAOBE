module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define(
    "discount",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.ENUM("percentage", "fixed"),
        defaultValue:"percentage",
        allowNull: false,
      },
      discount_value: {
        type: DataTypes.FLOAT, // Supports percentage or fixed amount
        defaultValue: 0,
      },
      expiry_date: {
        type: DataTypes.DATE, // DATE type may be enough
        allowNull: false,
      },

      usage_limit: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
      },
    },
    { freezeTableName: true }
  );
  return Discount;
};
