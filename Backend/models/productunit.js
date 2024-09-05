
export default function(sequelize, DataTypes) {
  const ProductUnit =  sequelize.define('productunit', {
    productID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'productID'
      }
    },
    productNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stock: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false
    },
    weight: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    size: {
      type: DataTypes.CHAR(1),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'productunit',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productID" },
          { name: "productNumber" },
        ]
      },
      {
        name: "idx_ProductUnit_productID_productNumber",
        using: "BTREE",
        fields: [
          { name: "productID" },
          { name: "productNumber" },
        ]
      },
    ]
  });

  ProductUnit.associate = function(models) {
    // Asociación con ProductImage
    ProductUnit.belongsTo(models.Product, {
      foreignKey: 'productID',
      as: 'product'
    })
    
  };


  return ProductUnit;
};


