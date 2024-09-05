import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import defineProduct from './product.js';
import defineProductUnit  from './productunit.js';
import defineCategory from './category.js';
import defineProductImage from './productimage.js';
import defineTeam from './team.js';
import defineUser from './user.js';
import defineAdress from './address.js';
import defineCartItem from './cartitem.js';
import defineDiscount from './discount.js';
import defineOrder from './order.js';
import defineOrderProductUnit from './orderproductunit.js';

import defineInvoice from './invoice.js';
import defineOrderHistory from './orderhistory.js';

const Product = defineProduct(sequelize, DataTypes);
const ProductUnit = defineProductUnit(sequelize, DataTypes);
const Category = defineCategory(sequelize, DataTypes);
const ProductImage = defineProductImage(sequelize, DataTypes);
const Team = defineTeam(sequelize, DataTypes);
const User = defineUser(sequelize, DataTypes);
const Address = defineAdress(sequelize, DataTypes);
const CartItem = defineCartItem(sequelize, DataTypes);
const Discount = defineDiscount(sequelize, DataTypes);
const Order = defineOrder(sequelize, DataTypes);
const OrderProductUnit = defineOrderProductUnit(sequelize, DataTypes);
const Invoice = defineInvoice(sequelize, DataTypes);
const OrderHistory = defineOrderHistory(sequelize, DataTypes);


const db = {
  sequelize,
  Product,
    ProductUnit,
    Category,
    ProductImage,
    Team,
    User,
    Address,
    CartItem,
    Discount,
    Order,
    OrderProductUnit,
    Invoice,
    OrderHistory
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
