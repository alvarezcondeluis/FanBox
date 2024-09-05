import Sequelize from 'sequelize';

export default function(sequelize, DataTypes) {
  const Product = sequelize.define('product', {
    productID: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sport: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'categoryID'
      }
    },
    teamID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'team',
        key: 'teamID'
      }
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false
  });

  // Definir las asociaciones
  Product.associate = function(models) {
    
    Product.hasMany(models.ProductImage, {
      foreignKey: 'productID',
      as: 'images', 
      onDelete: 'CASCADE' 
    });

    
    Product.hasMany(models.ProductUnit, {
      foreignKey: 'productID',
      as: 'units', 
      onDelete: 'CASCADE' 
    });

    
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryID',
      as: 'category' 
    });

    
    Product.belongsTo(models.Team, {
      foreignKey: 'teamID',
      as: 'team', 
      allowNull: true
    });
  };

  return Product;
};
