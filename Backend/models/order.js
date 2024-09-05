import { Sequelize as _Sequelize } from 'sequelize';
export default function(sequelize, DataTypes) {
  const Order = sequelize.define('order', {
    orderID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: _Sequelize.fn('curdate')
    },
    deliveryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    userID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'user',
        key: 'userID'
      }
    },
    discountID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'discount',
        key: 'discountID'
      }
    },
    addressID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Address',
        key: 'addressID'
      }
    }
  }, {
    sequelize,
    tableName: 'order',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderID" },
        ]
      },
      {
        name: "FK_Order_Discount",
        using: "BTREE",
        fields: [
          { name: "discountID" },
        ]
      },
      {
        name: "idx_Order_userID",
        using: "BTREE",
        fields: [
          { name: "userID" },
        ]
      },
      {
        name: "FK_Order_Address",
        using: "BTREE",
        fields: [
          { name: "addressID" },
        ]
      }
    ]
  });

  Order.associate = function(models) {
   
    // Asociación con Discount
    Order.belongsTo(models.Discount, { foreignKey: 'discountID', as: 'discount' });
    // Asociación con Address
    Order.belongsTo(models.Address, { foreignKey: 'addressID', as: 'address' });
  };
  return Order
};
