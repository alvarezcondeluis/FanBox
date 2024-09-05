import Sequelize from 'sequelize';
export default function(sequelize, DataTypes) {
  return sequelize.define('address', {
    addressID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    street: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    province: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    postalCode: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    number: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'address',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "addressID" },
        ]
      },
      {
        name: "FK_Address_User",
        using: "BTREE",
        fields: [
          { name: "userID" },
        ]
      },
    ]
  });
};
