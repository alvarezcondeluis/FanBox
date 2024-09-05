import api from "../api/index";
import axios from "axios";
import { AuthService } from "./authService";
import Discount from "../interfaces/Discount";
export const DiscountService = {
  validateCoupon: async (code: string): Promise<Discount> => {
    try {
      const token = AuthService.getToken();
      if (!token) {
        throw new Error("No se ha iniciado sesión");
      }
      
      const response = await api.get(`/discounts/validateCoupon`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          coupon: code,
        },
      });

      return response.data.discount; // Asume que el descuento es un número que indica la cantidad a descontar
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          console.log("404");
          throw new Error("Cupón no válido o no encontrado");
        } else if (error.response?.status === 400) {
          throw new Error("Solicitud inválida");
        } else if (error.response?.status === 500) {
          throw new Error(
            "Error del servidor. Por favor, inténtelo de nuevo más tarde."
          );
        } else {
          throw new Error("Error en la conexión con el servidor");
        }
      }
      throw new Error("Error al validar el cupón: " + error.message);
    }
  },
};
