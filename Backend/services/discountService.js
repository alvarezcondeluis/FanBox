
import {validateDiscount} from '../schemas/discount.js';
import { ServiceError } from '../utils/serviceError.js';
import { v4 as uuidv4 } from 'uuid';

export class DiscountService {
    constructor(DiscountModel) {
      this.DiscountModel = DiscountModel;
    }
  
    async getAll() {
      try {
        return await this.DiscountModel.findAll();
      } catch (error) {
        throw new Error('Error fetching discounts: ' + error.message);
      }
    }

    async getById(discountID) {
      
      try {
        
        const discount = await this.DiscountModel.findByPk(discountID);
        return discount;
      } catch (error) {
        throw new ServiceError('Discount not found', 'NOT_FOUND');
      }
    }


    async create(discount) {
      
      const { success, error, data } = validateDiscount(discount);

      if (!success) {
        const errorMessages = error.errors.map(err => err.message);
        throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
      }

      try {
        data.discountID = uuidv4();
        return await this.DiscountModel.create(data);
      } catch (error) {
        throw new Error('Error creating Discount: ' + error.message);
      }
    }


    async update(discountID, discount) {
      try {

        const { success, error, data } = validateDiscount(discount);

        if (!success) {
          const errorMessages = error.errors.map(err => err.message);
          throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
        }

        // Aqui lo hago desestructurando un unico valor porque puede darse el caso en el que no se actualice con ningun valor y de error
        const [rowsUpdated] = await this.DiscountModel.update(discount, {
          where: { discountID }
        });
  
        if (rowsUpdated) {
          return data;
        }
        return null;
      } catch (error) {
        throw new Error('Error updating discount: ' + error.message);
      }
    }

    async delete(discountID) {
      try {
        const rowsDeleted = await this.DiscountModel.destroy({
          where: { discountID }
        });
        if (rowsDeleted) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        throw new Error('Error deleting discount ' + error.message);
      }
    }

    async getByCode(code) {
      try {
        const discount = await this.DiscountModel.findOne({
          where: { code }
        });
        return discount;
      } catch (error) {
        throw new ServiceError('Discount not found', 'NOT_FOUND');
      }
    }


}
