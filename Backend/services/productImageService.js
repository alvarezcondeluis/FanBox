
import {validateProductImage} from '../schemas/productImage.js';
import { ServiceError } from '../utils/serviceError.js';


export class ProductImageService {
    constructor(ProductImageModel) {    
      this.ProductImageModel = ProductImageModel;
    }

  async getImages(productID) {
    try {

      const images = await this.ProductImageModel.findAll({where: {productID}});
    
      return images;
    } catch (error) {
      throw new Error('Error fetching Images: ' + error.message);
    }
  }
  async getMainImage(productID) {
    try {
      const mainImage = await this.ProductImageModel.findOne({where: {productID, isMain: true}});
      return mainImage;
    } catch (error) {
      throw new Error('Error fetching main Image: ' + error.message);
    }
  }

  async addImage(productID, productImage) {
    
    const { success, error, data } = validateProductImage(productImage);
    if (!success) {
      const errorMessages = error.errors.map(err => err.message);
      throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');  
    }
    
    try {
      data.productID = productID;
      return await this.ProductImageModel.create(data);
    } catch (error) {
      throw new Error('Error creating product: ' + error.message);
    }
  }

  async updateImage(imageID, productID, productImage) {
    
    const { success, error, data } = validateProductImage(productImage);
    if (!success) {
      const errorMessages = error.errors.map(err => err.message);
      throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
    }

    try {
      data.productID = productID;
      const [rowsUpdated] = await this.ProductImageModel.update(data, {
        where: { imageID }
      });
      if (rowsUpdated) {
        return data;
      }
      return null;
    } catch (error) {
      throw new Error('Error updating image: ' + error.message);
    }
    
  }

  async deleteImage(imageID) {
    try {
      const rowsDeleted = await this.ProductImageModel.destroy({
        where: { imageID }
      });
      if (rowsDeleted) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error('Error deleting image: ' + error.message);
    }
  }

  async getImage(imageID) {
    try {
      return await this.ProductImageModel.findByPk(imageID);
    } catch (error) {
      throw new Error('Error fetching image: ' + error.message);
    }
  }


}
