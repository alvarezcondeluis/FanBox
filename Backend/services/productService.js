

import {validateProduct} from '../schemas/product.js';
import { v4 as uuidv4 } from 'uuid';
import { validatePartialProduct } from '../schemas/product.js';
import { ServiceError } from '../utils/serviceError.js';
import { where } from 'sequelize';


export class ProductService {
    constructor(ProductModel, CategoryModel, ProductImageModel, ProductUnitModel) {
      this.ProductModel = ProductModel;
      this.CategoryModel = CategoryModel;
      this.ProductImageModel = ProductImageModel;
      this.ProductUnitModel = ProductUnitModel;
    }
  
    async getAll(filters) {
      try {
        const where = {};
        // Incluir la tabla ProductUnit en la consulta y filtrar por precio si es necesario
        const products = await this.ProductModel.findAll({
          where,
          include: [
            {
              association: 'images',  // Uso directo de la asociación 'images'
              where: { isMain: true },  
              required: false           
            },
            {
              association: 'units',   // Uso directo de la asociación 'units'
              attributes: ['price'],        
              limit: 1,                    
              required: false              
            }
          ]
        });
        return products;
      } catch (error) {
        throw new Error('Error fetching products: ' + error.message);
      }
    }
  

    async create(product) {
      
      const { success, error, data } = validatePartialProduct(product);

      if (!success) {
        const errorMessages = error.errors.map(err => err.message);
        
        throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');  
      }
      
      try {
        data.productID = uuidv4();
        data.releaseDate = new Date();
        return await this.ProductModel.create(data);
      } catch (error) {
        throw error;
      }
    }
  
    async getById(productID) {
      
      try {
        return await this.ProductModel.findByPk(productID, );
      } catch (error) {
        throw error;;
      }
    }

    async update(productID, product) {

      const { success, error, data } = validatePartialProduct(product);
      if (!success) {
        const errorMessages = error.errors.map(err => err.message);
        throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');  
      }
      
      try {
        const [rowsUpdated] = await this.ProductModel.update(data, {
          where: { productID }
        });
        if (rowsUpdated) {
          return data;
        }
        return null;
      } catch (error) {
        throw error;
      }
    }

    async delete(productID) {
      try {
        const rowsDeleted = await this.ProductModel.destroy({
          where: { productID }
        });
        if (rowsDeleted) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        throw new Error('Error deleting product unit: ' + error.message);
      }
    }


}
