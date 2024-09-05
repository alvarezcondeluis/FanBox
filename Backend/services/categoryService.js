
import {validateCategory} from '../schemas/category.js';
import { ServiceError } from '../utils/serviceError.js';

export class CategoryService {
    constructor(CategoryModel) {
      this.CategoryModel = CategoryModel;
    }
  
    async getAll() {
      try {
        return await this.CategoryModel.findAll();
      } catch (error) {
        throw new Error('Error fetching categories: ' + error.message);
      }
    }

    async getById(categoryID) {
      
      try {
        return await this.CategoryModel.findByPk(categoryID);
      } catch (error) {
        throw new Error('Error fetching category: ' + error.message);
      }
    }


    async create(category) {
      
      const { success, error, data } = validateCategory(category);

      if (!success) {
        const errorMessages = error.errors.map(err => err.message);
        throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
      }

      try {
        
        return await this.CategoryModel.create(data);
      } catch (error) {
        throw new Error('Error creating category: ' + error.message);
      }
    }


    async update(categoryID, category) {
      try {

        const { success, error, data } = validateCategory(category);

        if (!success) {
          const errorMessages = error.errors.map(err => err.message);
          throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
        }

        // Aqui lo hago desestructurando un unico valor porque puede darse el caso en el que no se actualice con ningun valor y de error
        const [rowsUpdated] = await this.CategoryModel.update(category, {
          where: { categoryID }
        });
  
        if (rowsUpdated) {
          return data;
        }
        return null;
      } catch (error) {
        throw new Error('Error updating category: ' + error.message);
      }
    }

    async delete(categoryID) {
      try {
        const rowsDeleted = await this.CategoryModel.destroy({
          where: { categoryID }
        });
        if (rowsDeleted) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        throw new Error('Error deleting category ' + error.message);
      }
    }

}
