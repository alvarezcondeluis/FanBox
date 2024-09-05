import { CartService } from '../services/cartService';
import  sequelize  from '../config/database';
import UserModel from '../models/user';
import CartModel from '../models/cartitem';
import ProductUnitModel from '../models/productunit';
import { where } from 'sequelize';

jest.mock('../models/user.js');
jest.mock('../models/cartitem.js');
jest.mock('../models/productunit.js');


// Simula el método findByPk en el modelo UserModel
UserModel.findByPk = jest.fn();
CartModel.findAll = jest.fn();
ProductUnitModel.findOne = jest.fn();
CartModel.create = jest.fn();
CartModel.update = jest.fn();
CartModel.destroy = jest.fn();
CartModel.findByPk = jest.fn();


describe('CartService', () => {
  let cartService;

  beforeAll(() => {
    cartService = new CartService(CartModel, UserModel, ProductUnitModel);
  });

  describe('getCartItems', () => {
    it('should return cart items for a valid user', async () => {
      const mockUser = { userID: '12345' };
      const mockCartItems = [{ cartItemID: 'item1' }, { cartItemID: 'item2' }];
      
      UserModel.findByPk.mockResolvedValue(mockUser);
      sequelize.query = jest.fn().mockResolvedValue(mockCartItems);

      const result = await cartService.getCartItems('12345');
      expect(result).toEqual(mockCartItems);
    });

    it('should throw error if user not found', async () => {
      UserModel.findByPk.mockResolvedValue(null);

      await expect(cartService.getCartItems('12345')).rejects.toThrow('User not found');
    });
  });

  describe('addCartItem', () => {
    it('should add a cart item for a valid user and product unit', async () => {
      const mockUser = { userID: '12345' };
      const mockProductUnit = { productID: 'b2bee178-7cfc-4768-857c-c6e1cc893a4a', productNumber: 1, stock: 10 };
      const mockCartItem = { userID: '12345', productID: 'b2bee178-7cfc-4768-857c-c6e1cc893a4a', productNumber: 1, quantity: 2 };
      const mockNewCartItem = { cartItemID: 'item1', ...mockCartItem };

      UserModel.findByPk.mockResolvedValue(mockUser);
      ProductUnitModel.findOne.mockResolvedValue(mockProductUnit);
      CartModel.create.mockResolvedValue(mockNewCartItem);
      const result = await cartService.addCartItem('12345', mockCartItem);
      expect(result).toEqual(mockNewCartItem);
    });

    it('should throw validation error if cart item data is invalid', async () => {
      const mockCartItem = { productID: '', productNumber: '', quantity: 0 };

      await expect(cartService.addCartItem('12345', mockCartItem)).rejects.toThrow('Validation error');
    });

    it('should throw error if user not found', async () => {
      UserModel.findByPk.mockResolvedValue(null);

      const mockCartItem = { productID: 'b2bee178-7cfc-4768-857c-c6e1cc893a4a', productNumber: 1, quantity: 2 };

      await expect(cartService.addCartItem('12345', mockCartItem)).rejects.toThrow('User not found');
    });

    it('should throw error if product unit not found', async () => {
      const mockUser = { userID: '12345' };
      UserModel.findByPk.mockResolvedValue(mockUser);
      ProductUnitModel.findOne.mockResolvedValue(null);

      const mockCartItem = { productID: 'b2bee178-7cfc-4768-857c-c6e1cc893a4a', productNumber: 1, quantity: 2 };

      await expect(cartService.addCartItem('12345', mockCartItem)).rejects.toThrow('Product unit not found');
    });

    it('should throw error if insufficient stock', async () => {
      const mockUser = { userID: '12345' };
      const mockProductUnit = { productID: 'b2bee178-7cfc-4768-857c-c6e1cc893a4a', productNumber: 1, stock: 1 };

      UserModel.findByPk.mockResolvedValue(mockUser);
      ProductUnitModel.findOne.mockResolvedValue(mockProductUnit);

      const mockCartItem = { productID: 'b2bee178-7cfc-4768-857c-c6e1cc893a4a', productNumber: 1, quantity: 2 };

      await expect(cartService.addCartItem('12345', mockCartItem)).rejects.toThrow('Insufficient stock');
    });
  });

  describe('updateCartItem', () => {
    it('should update the quantity of a cart item', async () => {
      const mockUser = { userID: '12345' };
      const mockCartItem = { cartItemID: 'item1', quantity: 2 };

      UserModel.findByPk.mockResolvedValue(mockUser);
      CartModel.findByPk.mockResolvedValue(mockCartItem);
      CartModel.update.mockResolvedValue([1]);
      CartModel.findByPk.mockResolvedValue({ ...mockCartItem, quantity: 3 });

      const result = await cartService.updateCartItem('12345', 'item1', 3);
      expect(result).toEqual({ ...mockCartItem, quantity: 3 });
    });

    it('should delete the cart item if quantity is 0', async () => {
      const mockUser = { userID: '12345' };
      const mockCartItem = { cartItemID: 'item1', quantity: 2 };

      UserModel.findByPk.mockResolvedValue(mockUser);
      CartModel.findByPk.mockResolvedValue(mockCartItem);
      CartModel.destroy.mockResolvedValue(1);

      const result = await cartService.updateCartItem('12345', 'item1', 0);
      expect(result).toBe(true);
    });

    it('should throw error if user not found', async () => {
      UserModel.findByPk.mockResolvedValue(null);

      await expect(cartService.updateCartItem('12345', 'item1', 3)).rejects.toThrow('User not found');
    });

    it('should throw error if cart item not found', async () => {
      const mockUser = { userID: '12345' };
      UserModel.findByPk.mockResolvedValue(mockUser);
      CartModel.findByPk.mockResolvedValue(null);

      await expect(cartService.updateCartItem('12345', 'item1', 3)).rejects.toThrow('Cart item not found');
    });
  });

  describe('deleteCartItem', () => {
    it('should delete a cart item for a valid user', async () => {
      const mockUser = { userID: '12345' };

      UserModel.findByPk.mockResolvedValue(mockUser);
      CartModel.destroy.mockResolvedValue(1);

      const result = await cartService.deleteCartItem('12345', 'item1');
      expect(result).toBe(true);
    });

    it('should throw error if user not found', async () => {
      UserModel.findByPk.mockResolvedValue(null);

      await expect(cartService.deleteCartItem('12345', 'item1')).rejects.toThrow('User not found');
    });

    it('should return false if cart item not found', async () => {
      const mockUser = { userID: '12345' };

      UserModel.findByPk.mockResolvedValue(mockUser);
      CartModel.destroy.mockResolvedValue(0);

      const result = await cartService.deleteCartItem('12345', 'item1');
      expect(result).toBe(false);
    });
  });
});
