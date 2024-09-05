import api from './../api/index';
import axios from 'axios';
import  CartItem  from '../interfaces/CartItem';
import { AuthService } from './authService';



export const CartService = {

    getCartItems: async (userID: string): Promise<CartItem[]> => {
        try {
          const response = await api.get(`/users/${userID}/cart`, {
            headers: {Authorization: `Bearer ${AuthService.getToken()}`,}
          });
          return response.data; // Devuelve directamente la lista de ítems formateados desde el backend
        } catch (error: any) {
          
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
              throw new Error('No se encontró el usuario o el carrito está vacío');
            } else {
              throw new Error('Error en la conexión con el servidor');
            }
          }
          throw new Error('Error al obtener los ítems del carrito: ' + error.message);
        }
      },

  addCartItem: async (userID: string, cartItem: { productID: string; productNumber: number; quantity: number }) => {
    try {
      
      const token = AuthService.getToken();
      if (token?.length === 0) {
        throw new Error('No se ha iniciado sesión');  
      }
      console.log(cartItem);
      const response = await api.post(`/users/${userID}/cart`, cartItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },  
      });
      return response.data; // Retorna el ítem del carrito añadido
    } catch (error: any) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('Error de validación en los datos proporcionados');
        } else if (error.response?.status === 404) {
          throw new Error('Usuario o unidad de producto no encontrado');
        } else if (error.response?.status === 409) {
          throw new Error('Stock insuficiente para este producto');
        } else if (error.response?.status === 500) {
          throw new Error('Error del servidor. Por favor, inténtelo de nuevo más tarde.');
        } else {
          throw new Error('Error en la conexión con el servidor');
        }
      }
      throw new Error('Error al agregar el ítem al carrito: ' + error.message);
    }
  },

  updateCartItem: async (userID: string, cartItemID: number, newQuantity: number) => {
    
    const token = AuthService.getToken();
      if (token?.length === 0) {
        throw new Error('No se ha iniciado sesión');  
      }
    try {
      const response = await api.put(`/users/${userID}/cart/${cartItemID}`, { quantity: newQuantity },{headers: {
        Authorization: `Bearer ${token}`,
      },  
    });
      return response.data; // Retorna el ítem del carrito actualizado
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Usuario o ítem del carrito no encontrado');
        } else if (error.response?.status === 400) {
          throw new Error('Cantidad inválida');
        } else {
          throw new Error('Error en la conexión con el servidor');
        }
      }
      throw new Error('Error al actualizar la cantidad del ítem: ' + error.message);
    }
  },

  deleteCartItem: async (userID: string, cartItemID: string) => {
    console.log(userID,cartItemID);
    const token = AuthService.getToken();
      if (token?.length === 0) {
        throw new Error('No se ha iniciado sesión');  
      }
    try {
      const response = await api.delete(`users/${userID}/cart/${cartItemID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },  
      });
      return response.data; // Retorna true si el ítem fue eliminado
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Usuario o ítem del carrito no encontrado');
        } else {
          throw new Error('Error en la conexión con el servidor');
        }
      }
      throw new Error('Error al eliminar el ítem del carrito: ' + error.message);
    }
  },
};
