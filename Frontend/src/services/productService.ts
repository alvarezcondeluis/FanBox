// src/services/productService.ts
import api from './../api/index';
import { Product, ProductImage, ProductUnit } from '../interfaces/Product';


export const ProductService = {
  getAllProducts: async (filters = {}): Promise<Product[]> => {
    try {
      const response = await api.get('/products', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProductById: async (productID: string): Promise<Product> => {
    try {
      
      const response = await api.get(`/products/${productID}`);
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${productID}:`, error);
      throw error;
    }
  },

  createProduct: async (productData: Product): Promise<Product> => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  updateProduct: async (productID: string, productData: Product): Promise<Product> => {
    try {
      const response = await api.put(`/products/${productID}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with ID ${productID}:`, error);
      throw error;
    }
  },

  deleteProduct: async (productID: string): Promise<void> => {
    try {
      await api.delete(`/products/${productID}`);
    } catch (error) {
      console.error(`Error deleting product with ID ${productID}:`, error);
      throw error;
    }
  },

  getProductDetails: async (productID: string): Promise<Product> => {
    try {
      const response = await api.get(`/products/${productID}/details`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product details for ID ${productID}:`, error);
      throw error;
    }
  },

  getProductUnits: async (productID: string): Promise<ProductUnit[]> => {
    try {
      const response = await api.get(`/products/${productID}/units`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching units for product ID ${productID}:`, error);
      throw error;
    }
  },

  getProductImages: async (productID: string): Promise<ProductImage[]> => {
    try {
      const response = await api.get(`/products/${productID}/images`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching images for product ID ${productID}:`, error);
      throw error;
    }
  },

  getMainImage: async (productID: string): Promise<ProductImage> => {
    try {
      const response = await api.get(`/products/${productID}/images/main-image`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching main image for product ID ${productID}:`, error);
      throw error;
    }
  }
};
