module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "customer",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "Please provide a valid email address" },
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: {
            args: [/^(\+?[0-9]{13}|0[0-9]{10})$/],
            msg: "Phone number must be in the format +234XXXXXXXXXX or 0XXXXXXXXX",
          },
        },
      },
    },
    { freezeTableName: true }
  );
  return Customer;
};

// module.exports = (sequelize, Sequelize) => {
//   const Customer = sequelize.define("customer", {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique:true,
//       validate: {
//         notNull: {
//           msg: "please provide a valid email",
//         },
//       },
//     },
//     fullName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: {
//           msg: "Please enter Full Name",
//         },
//       },
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: {
//           msg: "Please enter address",
//         },
//       },
//     },
//     phoneNumber: {
//       type: DataTypes.STRING, // define string with + as number
//       allowNull: false,
//       unique: true,
//       validate: {
//         notNull: {
//           msg: "Please Enter Phone Number",
//         },
//         is: {
//           args: [/^(\+?[0-9]{13}|0[0-9]{10})$/],
//           msg: 'Phone number must be in the format +234XXXXXXXXXX or 0XXXXXXXXX',
//         },
//       },
//     },
//   });
//   return Customer;
// };
