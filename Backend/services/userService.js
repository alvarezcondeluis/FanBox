
import {validateUser} from '../schemas/user.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { validateAddress } from '../schemas/address.js';
import { validatePartialAddress } from '../schemas/address.js';
import { ServiceError } from '../utils/serviceError.js';
export class UserService {
    constructor(UserModel, AddressModel) {
      this.UserModel = UserModel;
      this.AddressModel = AddressModel;
    }
  
    async getAll() {
      try {
        return await this.UserModel.findAll();
      } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
      }
    }

    async getById(userID) {
      
      try {
        return await this.UserModel.findByPk(userID);
      } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
      }
    }


    async create(user) {
      const { success, error, data } = validateUser(user);

      if (!success) {
          const errorMessages = error.errors.map(err => err.message);
          throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
      }

      data.passwd = await bcrypt.hash(data.passwd, 10);
      data.userID = uuidv4();

      try {
          return await this.UserModel.create(data);
      } catch (error) {
          throw new Error('Error creating user: ' + error.message);
      }
  }


    async update(userID, user) {
      try {

        const { success, error, data } = validateUser(user);

        if (!success) {
          const errorMessages = error.errors.map(err => err.message);
          throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
        }
    
        // Aqui lo hago desestructurando un unico valor porque puede darse el caso en el que no se actualice con ningun valor y de error
        const [rowsUpdated] = await this.UserModel.update(data, {
          where: { userID }
        });
  
        if (rowsUpdated) {
          return data;
        } else {
          return null;
        }
      } catch (error) {
        throw new Error('Error updating user: ' + error.message);
      }
    }

    async delete(userID) {
      try {
        const rowsDeleted =  await this.UserModel.destroy({where: {userID}});
        
        if (rowsDeleted) {
          return true;
        } else { 
          return false;
        }
      } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
      }
    }

    async getUserAddresses(userID) {  
      try {

        const user = await this.UserModel.findByPk(userID);
        if (!user) {
          throw new ServiceError('User not found', 'USER_NOT_FOUND');
        }

        return await this.AddressModel.findAll({where : {userID}});
      } catch (error) {
        throw new Error('Error fetching user addresses: ' + error.message);
      }
    }

    async addUserAddress(userID, address) {
      const { success, error, data } = validateAddress(address);
  

      if (!success) {
        const errorMessages = error.errors.map(err => err.message);
        throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
      }
      
      try {
        const user = await this.UserModel.findByPk(userID);
        if (!user) {
          throw new ServiceError('User not found', 'USER_NOT_FOUND');
        }
        data.userID = userID;
        const newAddress = await this.AddressModel.create(data);
        return newAddress;
      } catch (error) {
        throw error;
      }
    }

    async updateUserAddress(userID, addressID, address) {

      const { success, error, data } = validatePartialAddress(address);

      if (!success) {
        const errorMessages = error.errors.map(err => err.message);
        throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
      }

      try {
        const user = await this.UserModel.findByPk(userID);
        if (!user) {
          throw new ServiceError('User not found', 'USER_NOT_FOUND');
        }

        const address = await this.AddressModel.findByPk(addressID);
        if (!address) {
          throw new ServiceError('Address not found', 'ADDRESS_NOT_FOUND');
        } 

        if (user.userID !== address.userID) {
          throw new ServiceError('Address does not belong to user', 'ADDRESS_MISMATCH');
        }

        const [rowsUpdated] = await this.AddressModel.update(data, {
          where: { addressID }
        }); 

        if (rowsUpdated) {  
          return data;
        }
        return null;

    }catch (error) {
      throw new Error('Error updating address: ' + error.message);
    }
  }

    async getUserAddress(userID, addressID) {
      try {


        const user = await this.UserModel.findByPk(userID);
        if (!user) {
          throw new ServiceError('User not found', 'USER_NOT_FOUND');
        }
        return await this.AddressModel.findByPk(addressID);
        
      } catch (error) {
        throw new Error('Error fetching address: ' + error.message);
      }
    }

    async deleteUserAddress(userID, addressID) {
      try {
        const user = await this.UserModel.findByPk(userID);
        if (!user) {
          throw new ServiceError('User not found', 'USER_NOT_FOUND');
        }

        const address = await this.AddressModel.findByPk(addressID);
        if (!address) {
          throw new ServiceError('Address not found', 'ADDRESS_NOT_FOUND');
        } 

        if (user.userID !== address.userID) {
          throw new ServiceError('Address does not belong to user', 'ADDRESS_MISMATCH');
        }

        const rowsDeleted = await this.AddressModel.destroy({where: {addressID}});
        if (rowsDeleted) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        throw new Error('Error deleting address: ' + error.message);
      }
    }
}
