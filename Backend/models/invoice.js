import Sequelize from 'sequelize';
export default function(sequelize, DataTypes) {
  return sequelize.define('invoice', {
    invoiceID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    vat: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false,
      defaultValue: 21.00
    },
    isPayed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    orderID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'order',
        key: 'orderID'
      },
      unique: "FK_Invoice_Order"
    }
  }, {
    sequelize,
    tableName: 'invoice',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "invoiceID" },
        ]
      },
      {
        name: "orderID",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderID" },
        ]
      },
    ]
  });
};
