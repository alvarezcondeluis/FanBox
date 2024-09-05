import Sequelize from 'sequelize';
export default function(sequelize, DataTypes) {
  return sequelize.define('orderproductunit', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cost: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false
    },
    orderID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'order',
        key: 'orderID'
      }
    },
    productID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'productunit',
        key: 'productID'
      }
    },
    productNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'productunit',
        key: 'productNumber'
      }
    }
  }, {
    sequelize,
    tableName: 'orderproductunit',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderID" },
          { name: "productID" },
          { name: "productNumber" },
        ]
      },
      {
        name: "FK_Order_ProductUnit",
        using: "BTREE",
        fields: [
          { name: "productID" },
          { name: "productNumber" },
        ]
      },
      
    ]
  });
};
