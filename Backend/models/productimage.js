import Sequelize from 'sequelize';

export default function(sequelize, DataTypes) {
  const ProductImage = sequelize.define('productimage', {
    imageID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isMain: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    productID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'product',
        key: 'productID'
      }
    }
  }, {
    sequelize,
    tableName: 'productimage',
    timestamps: false
  });

  // Definir la asociación con Product
  ProductImage.associate = function(models) {
    ProductImage.belongsTo(models.Product, {
      foreignKey: 'productID',
      as: 'product'
    });
  };

  return ProductImage;
};
