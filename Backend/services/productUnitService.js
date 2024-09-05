


import { validateProductUnit } from '../schemas/productUnit.js';
import { ServiceError } from '../utils/serviceError.js';
import { validatePartialProductUnit } from '../schemas/productUnit.js';

export class ProductUnitService {
    constructor(ProductUnitModel, ProductModel) {    
      this.ProductUnitModel = ProductUnitModel;
      this.ProductModel = ProductModel;
    }
  

    async getUnits(productID) {
      try {

        const where = {};
        const product = await this.ProductUnitModel.findByPk(productID);
        if (!product) {
          throw new ServiceError('Product not found', 'NOT_FOUND');
        }

        // Aquí podríamos hacer un filtrado de los productos en base a los filtros que nos llegan en el parámetro filters
        where.productID = productID;
        return await this.ProductUnitModel.findAll({where});
      } catch (error) {
        throw new Error('Error fetching products: ' + error.message);
      }
    }

    async getUnit(productID, productNumber) {
      try {

        const product = await this.ProductUnitModel.findByPk(productID);
        if (!product) {
          throw new ServiceError('Product not found', 'NOT_FOUND');
        }

        return await this.ProductUnitModel.findOne({
          where: { productID, productNumber }
        });
      } catch (error) {
        throw new Error('Error fetching product unit: ' + error.message);
      }
    }

    async addUnit(productID, productUnit) {

      const { success, error, data } = validatePartialProductUnit(productUnit);
      
      if (!success) {
        const errorMessages = error.errors.map(err => err.message);
        throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
      }
      
      try {
        
        const product = await this.ProductModel.findByPk(productID);
        if (!product) {
          throw new ServiceError('Product not found', 'NOT_FOUND');
        } 

        const maxProductNumber = await this.ProductUnitModel.max('productNumber', {
          where: { productID }
        });
        
        const newProductNumber = maxProductNumber !== null ? maxProductNumber + 1 : 1;
        data.productID = productID;
                data.productNumber = newProductNumber;

      
        return await this.ProductUnitModel.create(
          data
        );
      } catch (error) {
        
        throw error;
      }
    }


    async updateUnit(productID, productNumber, productUnit) {
      
      
      const { success, error, data } = validateProductUnit(productUnit);
  
      if (!success) {
        const errorMessages = error.errors.map(err => err.message);
        throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
      }
      try {

        const product = await this.ProductModel.findByPk(productID);
        if (!product) {
          throw new ServiceError('Product not found', 'NOT_FOUND');
        }
        const productUnit = await this.ProductUnitModel.findOne({ where: { productID, productNumber } });
        if (!productUnit) {
          throw new ServiceError('Product unit not found', 'NOT_FOUND');
        }

        const [rowsUpdated] = await this.ProductUnitModel.update(productUnit, {
          where: { productID, productNumber }
        });
         
        if (rowsUpdated) {
          return data;
        }
        return null
      } catch (error) {
        
        throw new Error('Error updating product unit: ' + error.message);
      }
    }

   
    async deleteUnit(productID, productNumber) {
      try {
        
        const rowsDeleted = await this.ProductUnitModel.destroy({
          where: { productID, productNumber }
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
