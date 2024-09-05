import { validateOrderData } from '../schemas/orderData.js';
import { validatePartialOrderData } from '../schemas/orderData.js';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database.js'; // Asegúrate de que esta es la ruta correcta
import { ServiceError } from '../utils/serviceError.js';

export class OrderService {
  constructor(OrderModel, OrderProductModel, OrderHistoryModel) {
    this.orderModel = OrderModel;
    this.orderProductModel = OrderProductModel;
    this.orderHistoryModel = OrderHistoryModel;
  }

  async createOrder(orderData) {
    const { success, error, data } = validateOrderData(orderData);

    if (!success) {
      const errorMessages = error.errors.map(err => err.message);
      throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');  
    }

    const transaction = await sequelize.transaction();
    try {
      const { products, ...order } = data;

      const calculatedAmount = products.reduce((total, product) => {
        return total + (product.quantity * product.cost);
      }, 0);

      if (order.amount !== calculatedAmount) {
        throw new ServiceError('Amount does not match the sum of the products', 'AMOUNT_MISMATCH');
      }

      order.orderID = uuidv4();
      order.orderDate = new Date();
      
      const newOrder = await this.orderModel.create(order, { transaction });

      const productOrders = products.map(product => ({
        orderID: newOrder.orderID,
        productNumber: product.productNumber,
        productID: product.productID,
        quantity: product.quantity,
        cost: product.cost
      }));
  
      await this.orderProductModel.bulkCreate(productOrders, { transaction });

      // Crear una entrada inicial en el historial del pedido
      const initialOrderHistory = {
        orderID: newOrder.orderID,
        initialDate: new Date(),
        status: 'Pendiente', // Estado inicial del pedido
        endDate: null
      };

      await this.orderHistoryModel.create(initialOrderHistory, { transaction });

      await transaction.commit();
      return newOrder;
    } catch (error) {
      await transaction.rollback();
      throw new Error('Error creating order: ' + error.message);
    }
  }

  async getAll() {
    try {
      return await this.orderModel.findAll();
    } catch (error) {
      throw new Error('Error fetching Orders: ' + error.message);
    }
  }

  async getById(orderID) {
    try {
      return await this.orderModel.findByPk(orderID);
    } catch (error) {
      throw new Error('Error fetching Order: ' + error.message);
    }
  }

  async update(orderID, order) {
    const { success, error, data } = validatePartialOrderData(order);

    if (!success) {
      const errorMessages = error.errors.map(err => err.message);
      throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');  
    }

    try {
      const [rowsUpdated] = await this.orderModel.update(data, {
        where: { orderID }
      });

      if (rowsUpdated) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('Error updating Order: ' + error.message);
    }
  }

  async delete(orderID) {
    try {
      const rowsDeleted = await this.orderModel.destroy({ where: { orderID } });

      if (rowsDeleted) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error('Error deleting Order: ' + error.message);
    }
  }

  async getOrderProducts(orderID) {
    try {
      const order = await this.orderModel.findByPk(orderID);
      if (!order) {
        throw new ServiceError('Order not found', 'NOT_FOUND'); 
      }

      return await this.orderProductModel.findAll({ where: { orderID } });
    } catch (error) {
      throw new Error('Error fetching Order Products: ' + error.message);
    }
  }


  async getOrderHistory(orderID) {
    try {
      const order = await this.orderModel.findByPk(orderID);
      if (!order) {
        throw new ServiceError('Order not found', 'NOT_FOUND');
      }

      return await this.orderHistoryModel.findAll({ where: { orderID } });
    } catch (error) {
      throw new Error('Error fetching Order History: ' + error.message);
    }
  }

  async getOrderStatus(orderID) {
    try {
      const lastOrderHistory = await this.orderHistoryModel.findOne({
        where: { orderID },
        order: [['initialDate', 'DESC']]
      });

      return lastOrderHistory;
    } catch (error) {
      throw new Error('Error fetching order status: ' + error.message);
    }
  }


  async updateOrderStatus(orderID, newStatus) {
    const transaction = await sequelize.transaction();
    try {

      // Comprobamos que el pedido existe
      const order = await this.orderModel.findByPk(orderID, { transaction });
      if (!order) {
        throw new ServiceError('Order not found', 'NOT_FOUND');
      } 

      // Encontrar la entrada de historial más reciente para este pedido
      const lastOrderHistory = await this.orderHistoryModel.findOne({
        where: { orderID },
        order: [['initialDate', 'DESC']],
        transaction
      });

      // Si existe un historial previo, actualizar la fecha de fin
      if (lastOrderHistory) {
        await this.orderHistoryModel.update(
          { endDate: new Date() },
          { where: { orderHistoryID: lastOrderHistory.orderHistoryID }, transaction }
        );
      }

      // Crear nueva entrada de historial con el nuevo estado
      const newOrderHistory = {
        orderID: orderID,
        initialDate: new Date(),
        status: newStatus, // Asignar el nuevo estado
        endDate: null // La nueva entrada de historial no tiene fecha de fin
      };

      const createdOrderHistory = await this.orderHistoryModel.create(newOrderHistory, { transaction });

      await transaction.commit();
      return createdOrderHistory;
    } catch (error) {
      await transaction.rollback();
      throw new Error('Error updating order status: ' + error.message);
    }
  }

  async getUserOrders(userID) {
    try {
      const user = await this.UserModel.findByPk(userID); 
      if (!user) {
        throw new ServiceError('User not found', 'NOT_FOUND');
      }
      
      return await this.orderModel.findAll({ where: { userID } });
    } catch (error) {
      throw new Error('Error fetching user orders: ' + error.message);
    }
  }
}
