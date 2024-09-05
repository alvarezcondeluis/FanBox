import Sequelize from 'sequelize';

export default function(sequelize, DataTypes) {
  const CartItem = sequelize.define('cartitem', {
    cartItemID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    productID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'productunit',
        key: 'productID'
      }
    },
    productNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productunit',
        key: 'productNumber'
      }
    },
    userID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'user',
        key: 'userID'
      }
    }
  }, {
    sequelize,
    tableName: 'cartitem',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cartItemID" },
        ]
      },
      {
        name: "FK_CartItem_ProductUnit",
        using: "BTREE",
        fields: [
          { name: "productID" },
          { name: "productNumber" },
        ]
      },
      {
        name: "FK_CartItem_User",
        using: "BTREE",
        fields: [
          { name: "userID" },
        ]
      },
    ]
  });

  // Definir las asociaciones
  CartItem.associate = function(models) {
    // Asociación con User
    CartItem.belongsTo(models.User, {
      foreignKey: 'userID',
      as: 'user'
    });

    CartItem.belongsTo(models.ProductUnit, {
      foreignKey: {
        name: 'productID',
        field: 'productID'
      },
      targetKey: 'productID'
    });

    CartItem.belongsTo(models.ProductUnit, {
      foreignKey: {
        name: 'productNumber',
        field: 'productNumber'
      },
      targetKey: 'productNumber'
    });


  };

  return CartItem;
}
