import Sequelize from 'sequelize';
export default function(sequelize, DataTypes) {
  return sequelize.define('orderhistory', {
    orderHistoryID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    initialDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    orderID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'order',
        key: 'orderID'
      }
    }
  }, {
    sequelize,
    tableName: 'orderhistory',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderHistoryID" },
        ]
      },
      {
        name: "FK_OrderHistory_Order",
        using: "BTREE",
        fields: [
          { name: "orderID" },
        ]
      },
    ]
  });
};
