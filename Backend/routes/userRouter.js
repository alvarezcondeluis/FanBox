import { Router } from 'express'
import { UserController } from '../controllers/userController.js'
import { OrderController } from '../controllers/orderController.js'
import { CartController } from '../controllers/cartController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'
import { authorizationMiddleware } from '../middlewares/authorizationMiddleware.js'


export const createUserRouter = (userModel, orderModel, addressModel, ProductUnitModel, cartModel, ProductModel, ProductoImageModel) => {


  const usersRouter = Router();
  const userController = new UserController(userModel, addressModel);
  const orderController = new OrderController(orderModel);  
  const cartController = new CartController(cartModel, userModel, ProductUnitModel);

  
  usersRouter.post('',authMiddleware, roleMiddleware(['admin']), userController.create.bind(userController));
  usersRouter.get('',authMiddleware, roleMiddleware(['admin']), userController.getAll.bind(userController)); 
  usersRouter.get('/:userID',authMiddleware, authorizationMiddleware, userController.getById.bind(userController));
  usersRouter.put('/:userID', authMiddleware, authorizationMiddleware, userController.update.bind(userController));
  usersRouter.delete('/:userID', authMiddleware, roleMiddleware(['admin']), userController.delete.bind(userController));


  usersRouter.get('/:userID/addresses',authMiddleware, authorizationMiddleware, userController.getUserAddresses.bind(userController));
  usersRouter.post('/:userID/addresses',authMiddleware, authorizationMiddleware, userController.addUserAddress.bind(userController));
  usersRouter.put('/:userID/addresses/:addressID',authMiddleware, authorizationMiddleware, userController.updateUserAddress.bind(userController));
  usersRouter.get('/:userID/addresses/:addressID',authMiddleware, authorizationMiddleware, userController.getUserAddress.bind(userController));
  usersRouter.delete('/:userID/addresses/:addressID',authMiddleware, authorizationMiddleware, userController.deleteUserAddress.bind(userController));
  
  usersRouter.get('/:userID/cart', authMiddleware, authorizationMiddleware, cartController.getCartItems.bind(cartController));
  usersRouter.post('/:userID/cart', authMiddleware, authorizationMiddleware, cartController.addCartItem.bind(cartController));
  usersRouter.put('/:userID/cart/:cartItemID', authMiddleware, authorizationMiddleware, cartController.updateCartItem.bind(cartController));
  usersRouter.delete('/:userID/cart/:cartItemID', authMiddleware, authorizationMiddleware, cartController.deleteCartItem.bind(cartController));
  

  usersRouter.get('/:userID/orders', authMiddleware, authorizationMiddleware, orderController.getUserOrders.bind(orderController));  
  return usersRouter
}
