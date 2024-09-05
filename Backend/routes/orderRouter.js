import { Router } from 'express';
import { OrderController } from '../controllers/orderController.js';


export const createOrderRouter = (OrderModel, OrderProductModel, orderHistoryModel) => {
  const orderRouter = Router();
  const orderController = new OrderController(OrderModel, OrderProductModel, orderHistoryModel);
  
  orderRouter.post('', orderController.createOrder.bind(orderController));
  orderRouter.get('', orderController.getAll.bind(orderController)); 
  orderRouter.get('/:orderID', orderController.getById.bind(orderController));
  orderRouter.put('/:orderID', orderController.update.bind(orderController));
  orderRouter.delete('/:orderID', orderController.delete.bind(orderController));

  
  orderRouter.get('/:orderID/products', orderController.getOrderProducts.bind(orderController));
  
  orderRouter.get('/:orderID/currentStatus', orderController.getOrderStatus.bind(orderController));
  orderRouter.post('/:orderID/history', orderController.updateOrderStatus.bind(orderController));
  orderRouter.get('/:orderID/history', orderController.getOrderHistory.bind(orderController));
  
  
  return orderRouter
}
