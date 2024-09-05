import express from 'express'; // require -> commonJS
import { createProductRouter } from './routes/productRouter.js';
import { createCategoryRouter } from './routes/categoryRouter.js';
import { corsMiddleware } from './middlewares/cors.js';
import { createTeamRouter } from './routes/teamRouter.js';
import { createUserRouter } from './routes/userRouter.js';
import { createOrderRouter } from './routes/orderRouter.js';
import {createAuthRouter} from './routes/authRouter.js';
import { createGeoNamesRouter } from './routes/geonamesRouter.js';
import {errorHandler} from './middlewares/errorHandler.js';
import 'dotenv/config';
import db from './models/index.js';
import logger from './utils/logger.js';
import morgan from 'morgan';

import { createDiscountRouter } from './routes/discountRouter.js';


db.sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

// Sincronizar los modelos
db.sequelize.sync().then(() => {
  console.log('Models synchronized successfully.');
}).catch((error) => {
  console.error('Error synchronizing models:', error);
});

const app = express()

app.use(morgan('combined', {
  stream: {
    write: message => logger.info(message.trim())
  }
}));

app.use(express.json());
app.use(corsMiddleware())
app.disable('x-powered-by')
app.use('/api/auth', createAuthRouter( db.User));
app.use('/api/products', createProductRouter( db.Product, db.ProductUnit, db.ProductImage, db.Category));
app.use('/api/categories', createCategoryRouter( db.Category));
app.use('/api/teams', createTeamRouter( db.Team));
app.use('/api/users', createUserRouter( db.User, db.Order, db.Address, db.ProductUnit, db.CartItem, db.Product, db.ProductImage));
app.use('/api/orders', createOrderRouter( db.Order, db.OrderProductUnit, db.OrderHistory));
app.use('/api/geonames', createGeoNamesRouter());
app.use('/api/discounts', createDiscountRouter(db.Discount))
app.use(errorHandler);

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

