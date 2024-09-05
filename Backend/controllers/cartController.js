
import {CartService} from '../services/cartService.js';

export class CartController {
  
  constructor(CartModel, UserModel, ProductUnitModel, Product, ProductImageModel ) {
    this.CartService = new CartService(CartModel, UserModel, ProductUnitModel, Product, ProductImageModel);
    this.getCartItems = this.getCartItems.bind(this);
    this.addCartItem = this.addCartItem.bind(this); 
    this.updateCartItem = this.updateCartItem.bind(this);
    this.deleteCartItem = this.deleteCartItem.bind(this);
  }

  async getCartItems(req, res, next) {
    try {
      const userID = req.params.userID;
      const cartItems = await this.CartService.getCartItems(userID);
      if (cartItems.length === 0) {
        res.status(204).send('No cart items found');
      }
      res.status(200).json(cartItems);
    } catch (error) {
      next(error);
    }
  }

  async addCartItem(req, res, next) {
    try {
      const cartItem = req.body;
      const { userID } = req.params;
      console.log("llega");
      const newCartItem = await this.CartService.addCartItem(userID, cartItem);
      res.status(201).json(newCartItem);
    } catch (error) {
      next(error);
    }
  }

  async updateCartItem(req, res, next) {
    try {
      const userID = req.params.userID; 
      const cartItemID = req.params.cartItemID; 
      const { quantity } = req.body; 
  
      const updatedCartItem = await this.CartService.updateCartItem(userID, cartItemID, quantity);
  
      res.status(200).json(updatedCartItem);
    } catch (error) {
      next(error);
    }
  }

  async deleteCartItem(req, res, next) {
    try {
      const userID = req.params.userID; 
      const cartItemID = req.params.cartItemID; 
  
      const success = await this.CartService.deleteCartItem(userID, cartItemID);
  
      if (success) {
        return res.status(204).send();
      }
      res.status(404).json({ error: 'Cart item not found', code: 'CART_ITEM_NOT_FOUND' });  
    } catch (error) {
      next(error);
  }
}

}
