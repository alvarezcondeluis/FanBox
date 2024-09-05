

import {validateCartItem} from '../schemas/cartItem.js';
import { ServiceError } from '../utils/serviceError.js';
import sequelize from '../config/database.js';
import { QueryTypes } from 'sequelize';
export class CartService {
  constructor(CartModel, UserModel, ProductUnitModel, ProductModel, ProductImageModel) {
    this.CartModel = CartModel;
    this.UserModel = UserModel;
    this.ProductUnitModel = ProductUnitModel;
    this.ProductModel = ProductModel;
    this.ProductImageModel = ProductImageModel;
  }

  async getCartItems(userID) {
    try {
      
      const user = await this.UserModel.findByPk(userID);
      if (!user) {
        throw new ServiceError('User not found', 'NOT_FOUND');
      }

      
      const cartItems = await sequelize.query(`
        SELECT ci.*, pu.size, pu.price, p.name, pi.url as imageUrl
        FROM CartItem AS ci
        JOIN ProductUnit AS pu
        ON ci.productID = pu.productID AND ci.productNumber = pu.productNumber
        JOIN Product AS p
        ON pu.productID = p.productID
        LEFT JOIN ProductImage AS pi
        ON p.productID = pi.productID AND pi.isMain = 1
        WHERE ci.userID = :userID
      `, {
        replacements: { userID },  
        type: QueryTypes.SELECT    
      });
      return cartItems;
    } catch (error) {
      throw error;
    }
  }
    async addCartItem(userID, cartItem) {
      const { success, error, data } = validateCartItem(cartItem);
    
      if (!success) {
        const errorMessages = error.errors.map(err => err.message);
        throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
      }
    
      // Inicia una transacción
      const transaction = await sequelize.transaction();
    
      try {
        // Verificar existencia del usuario
        const user = await this.UserModel.findByPk(userID, { transaction });
        if (!user) {
          throw new ServiceError('User not found', 'NOT_FOUND');
        }
    
        // Verificar existencia de la unidad de producto
        const productUnit = await this.ProductUnitModel.findOne({
          where: {
            productID: data.productID,
            productNumber: data.productNumber
          },
          transaction
        });
        if (!productUnit) {
          throw new ServiceError('Product unit not found', 'NOT_FOUND');
        }
    
        // Verificar stock disponible
        if (data.quantity > productUnit.stock) {
          throw new ServiceError('Insufficient stock', 'INSUFFICIENT_STOCK');
        }
    
        // Verificar cantidad mínima
        if (data.quantity < 1) {
          throw new ServiceError('Quantity must be greater than 0', 'INVALID_QUANTITY');
        }
    
        // Crear el ítem en el carrito
        data.userID = userID;
        const newCartItem = await this.CartModel.create(data, { transaction });
    
        // Confirmar la transacción
        await transaction.commit();
    
        return newCartItem;
      } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        throw new Error('Error creating cart item: ' + error.message);
      }
    }
    

    async updateCartItem(userID, cartItemID, newQuantity) {
      try {
        console.log(userID, cartItemID, newQuantity);
        // Verificar existencia del usuario
        const user = await this.UserModel.findByPk(userID);
        if (!user) {
          throw new ServiceError('User not found', 'NOT_FOUND');
        }
    
        // Verificar existencia del ítem en el carrito
        const cartItem = await this.CartModel.findByPk(cartItemID);
        if (!cartItem) {
          throw new ServiceError('Cart item not found', 'NOT_FOUND');
        }
    
        // Eliminar el ítem si la nueva cantidad es 0
        if (newQuantity === 0) {
          await this.CartModel.destroy({
            where: { cartItemID }
          });
          return true;
        }
    
        // Actualizar la cantidad del ítem en el carrito
        const [rowsUpdated] = await this.CartModel.update(
          { quantity: newQuantity }, // Solo actualiza el campo quantity
          { where: { cartItemID } }
        );
    
        if (rowsUpdated > 0) {
          const updatedCartItem = await this.CartModel.findByPk(cartItemID);
          return updatedCartItem;
        } else {
          throw new Error('Failed to update cart item');
        }
      } catch (error) {
        throw new Error('Error updating cart item: ' + error.message);
      }
    }

    async deleteCartItem(userID, cartItemID) {

      try {
        // Verificar existencia del usuario
        const user = await this.UserModel.findByPk(userID);
        if (!user) {
          throw new ServiceError('User not found', 'NOT_FOUND');
        }
        // Eliminar el ítem del carrito
        const rowsDeleted = await this.CartModel.destroy({
          where: { cartItemID }
        });

        if (rowsDeleted) {
          return true;
        }

        return false;
      } catch (error) {
        throw new Error('Error deleting cart item: ' + error.message);
      }
    }
  
}
