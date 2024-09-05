import axios from 'axios';
import api from './../api/index';
import Address, { AddressForm } from '../interfaces/Address';
import { AuthService } from './authService';
export const UserService = {
  

  async getUserAddresses(userID: string) {
    try {
      const token = AuthService.getToken();
      if (token?.length === 0) {
        throw new Error('No se ha iniciado sesión');  
      }
  
      console.log(token);

      const response = await api.get(`/users/${userID}/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },  
      });
      console.log(response)
      return response.data;
    } catch (error: any) {
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Usuario no encontrado o no tiene direcciones registradas');
        } else if (error.response?.status === 403) {
          throw new Error('Acceso no autorizado');
        } else {
          throw new Error('Error en la conexión con el servidor');
        }
      }
      throw new Error('Error al obtener las direcciones del usuario: ' + error.message);
    }
  },

  // Obtener una dirección específica de un usuario
  async getUserAddress(userID: string, addressID: number) {
    try {
      const token = AuthService.getToken();
      if (token?.length === 0) {
        throw new Error('No se ha iniciado sesión');
      }
      
      const response = await api.get(`/users/${userID}/addresses/${addressID}`, {
        headers: {
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Dirección no encontrada');
        } else if (error.response?.status === 403) {
          throw new Error('Acceso no autorizado');
        } else {
          throw new Error('Error en la conexión con el servidor');
        }
      }
      throw new Error('Error al obtener la dirección: ' + error.message);
    }
  },

  // Añadir una nueva dirección para un usuario
  async addUserAddress(userID: string, address: AddressForm) {
    const token = AuthService.getToken();
    if (token?.length === 0) {
      throw new Error('No se ha iniciado sesión');
    }
    try {
      const response = await api.post(`/users/${userID}/addresses`, address, {headers: {
        Authorization: `Bearer ${token}`,
      }},    );
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('Error de validación en los datos de la dirección');
        } else if (error.response?.status === 403) {
          throw new Error('Acceso no autorizado');
        } else if (error.response?.status === 500) {
          throw new Error('Error del servidor. Por favor, inténtelo de nuevo más tarde.');
        } else {
          throw new Error('Error en la conexión con el servidor');
        }
      }
      throw new Error('Error al añadir la dirección del usuario: ' + error.message);
    }
  },

  // Actualizar una dirección específica de un usuario
  async updateUserAddress(userID: string, addressID: number, address: AddressForm) {
    try {
      const response = await api.put(`/users/${userID}/addresses/${addressID}`, address , {
        headers: {
          Authorization: `Bearer ${AuthService.getToken()}`,
          },
          });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Dirección no encontrada');
        } else if (error.response?.status === 400) {
          throw new Error('Error de validación en los datos de la dirección');
        } else if (error.response?.status === 403) {
          throw new Error('Acceso no autorizado');
        } else {
          throw new Error('Error en la conexión con el servidor');
        }
      }
      throw new Error('Error al actualizar la dirección: ' + error.message);
    }
  },

  // Eliminar una dirección específica de un usuario
  async deleteUserAddress(userID: string, addressID: number) {
    try {
      const token = AuthService.getToken();
      if (token?.length === 0) {
        throw new Error('No se ha iniciado sesión');
      }
      const response = await api.delete(`/users/${userID}/addresses/${addressID}`, {headers: {
        Authorization: `Bearer ${token}`,
      }},    );
      return response.status === 204; // Devuelve true si fue exitoso
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Dirección no encontrada');
        } else if (error.response?.status === 403) {
          throw new Error('Acceso no autorizado');
        } else {
          throw new Error('Error en la conexión con el servidor');
        }
      }
      throw new Error('Error al eliminar la dirección: ' + error.message);
    }
  }
};
