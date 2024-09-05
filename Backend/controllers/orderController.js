import { OrderService } from '../services/orderService.js';

export class OrderController {
  constructor(OrderModel, OrderProductModel, OrderHistoryModel) {
    this.orderService = new OrderService(OrderModel, OrderProductModel, OrderHistoryModel);
    this.getAll = this.getAll.bind(this);
    this.create = this.createOrder.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getOrderProducts = this.getOrderProducts.bind(this);
    this.getOrderStatus = this.getOrderStatus.bind(this);
    this.updateOrderStatus = this.updateOrderStatus.bind(this);
    this.getOrderHistory = this.getOrderHistory.bind(this);
    this.getUserOrders = this.getUserOrders.bind(this);
  }

  async createOrder(req, res) {
    try {
      
      const orderData = req.body;
      const newOrder = await this.orderService.createOrder(orderData);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);  
    }
  }

  async getAll(req, res) {
    try {
      const orders = await this.orderService.getAll();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res) {
    try {
      const { orderID } = req.params;
      const order = await this.orderService.getById(orderID);
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ error: 'Order not found', code: 'NOT_FOUND' });
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req, res) {
    try {
      const { orderID } = req.params;
      const updatedOrder = await this.orderService.update(orderID, req.body);
      if (updatedOrder) {
        res.status(200).json(updatedOrder);
      } else {
        res.status(404).json({ error: 'Order not found', code: 'NOT FOUND' });
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res) {
    try {
      const { orderID } = req.params;
      const success = await this.orderService.delete(orderID);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Order not found', code: 'NOT_FOUND' });
      }
    } catch (error) {
      next(error);  
    }
  }

  async getOrderProducts(req, res) {
    try {
      const { orderID } = req.params;
      const products = await this.orderService.getOrderProducts(orderID);
      res.status(200).json(products);
    } catch (error) {
      if (error.message === 'Order not found') {
        res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async getOrderStatus(req,res) {
    try {
      const { orderID } = req.params;
      const status = await this.orderService.getOrderStatus(orderID);
      res.status(200).json(status);
    } catch (error) {
      if (error.message === 'Order not found') {
        res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { orderID } = req.params;
      const { status } = req.body;
      const updatedStatus = await this.orderService.updateOrderStatus(orderID, status);
      res.status(200).json(updatedStatus);
    } catch (error) {
      if (error.message === 'Order not found') {
        res.status(404).json({ error: error.message });
      } 
      res.status(500).json({ error: error.message });
    }
  }

  async getOrderHistory(req, res) {
    try {
      const { orderID } = req.params;
      const history = await this.orderService.getOrderHistory(orderID);
      if (history) {
        res.status(200).json(history);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserOrders(req, res) { 
    try {
      const { userID } = req.params;
      const orders = await this.orderService.getUserOrders(userID);
      res.status(200).json(orders);
    } catch (error) {
      if (error.message === 'User not found') {
        res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
}
