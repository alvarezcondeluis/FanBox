// src/services/productService.ts
import api from './../api/index';
import Cookies from 'js-cookie';
import axios from 'axios';

export const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post(`/auth/login`, { email, passwd: password });
      const { token, user } = response.data;
      const date = new Date();
      date.setTime(date.getTime() + (60 * 60 * 1000)); // 2 horas en milisegundos

      Cookies.set('token', token, { expires: date });
      Cookies.set('user', user.userID, { expires: date });
      return { token, user};
    } catch (error: any) {
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('No existe el usuario introducido');
        } else if (error.response?.status === 403) {
          throw new Error('Contraseña incorrecta');
        } else {
          throw new Error('Error en la conexión con el servidor');
        }
      }
      
      throw new Error('Error en el inicio de sesión' + error.message);
    }
  }, 

  logout: () => {
    // Eliminar el token del almacenamiento local
    Cookies.remove('token');
    Cookies.remove('user');
  },

  register: async (userData: {name: string, firstName: string; lastName: string; email: string; dateOfBirth: Date | null,  phone: string; passwd: string;  }) => {
    try {
      const response = await api.post(`/auth/register`, userData);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('Error de validación en los datos proporcionados');
        } else if (error.response?.status === 403) {
          throw new Error('Acceso no autorizado');
        } else if (error.response?.status === 409) {
          throw new Error('Entrada duplicada:' + error.message);
        } else if (error.response?.status === 500) {
          throw new Error('Error del servidor. Por favor, inténtelo de nuevo más tarde.');
        } else {
          throw new Error('Error en la conexión con el servidor');
        }
      }

      throw new Error('Error en el registro: ' + error.message);
    }
  },

  getToken: () => {
    return Cookies.get('token');
  },

  isAuthenticated: () => {
    const token = AuthService.getToken();
    return !!token; // Retorna true si el token existe, false si no
  },

  getUser: () => {
    const userID = Cookies.get('user');
    if (!userID) {
      return '';
    }
    return userID;
  },
};

