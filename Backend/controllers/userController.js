
import {UserService} from '../services/userService.js';

export class UserController {
  
  constructor(UserModel, AddressModel) {
    this.userService = new UserService(UserModel, AddressModel);
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getUserAddresses = this.getUserAddresses.bind(this);
    this.addUserAddress = this.addUserAddress.bind(this);
    this.updateUserAddress = this.updateUserAddress.bind(this);
    this.getUserAddress = this.getUserAddress.bind(this);
    this.deleteUserAddress = this.deleteUserAddress.bind(this);

  }


  async getAll(req, res) {
    try {
      const filters = req.query;
      const users = await this.userService.getAll(filters);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res) {
    try {
        const newUser = await this.userService.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

  async getById(req, res) {
    try {
      const { userID } = req.params;
      const user = await this.userService.getById(userID);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found', code: 'USER_NOT_FOUND' });
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req, res) {
    try {
      const { userID } = req.params;
      
      const updateduser = await this.userService.update(userID, req.body);
      if (updateduser) {
        res.status(200).json(updateduser);
      } else {
        res.status(404).json({ error: 'User not found', code: 'USER_NOT_FOUND' });
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res) {
    try {
      const { userID } = req.params;
      const success = await this.userService.delete(userID);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'user not found', code: 'USER_NOT_FOUND' });  
      }
    } catch (error) {
      next(error);
    }
  }

  async getUserAddresses(req, res) {
    try {
      const { userID } = req.params;
      const addresses = await this.userService.getUserAddresses(userID);
      res.status(200).json(addresses);
    } catch (error) {
      next(error);
    }
  }

  async addUserAddress(req, res, next) {
    try {
      const { userID } = req.params;
      const address = req.body;
      const newAddress = await this.userService.addUserAddress(userID, address);
      res.status(201).json(newAddress);
    } catch (error) {
      next(error);
    }
  }

  async updateUserAddress(req, res) {
    try {
      const { userID, addressID } = req.params;
      const updatedAddress = await this.userService.updateUserAddress(userID, addressID, req.body);
      res.status(200).json(updatedAddress);
    } catch (error) {
      next(error);
    }
  }
  
  

  async getUserAddress(req, res) {  
    try {
      const { userID, addressID } = req.params;
      const address = await this.userService.getUserAddress(userID, addressID);
      if (address) {
        res.status(200).json(address);
      } else {
        res.status(404).json({ error: 'Address not found', code: 'ADDRESS_NOT_FOUND' });  
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteUserAddress(req, res, next) {
    try {
      const { userID, addressID } = req.params;
      const success = await this.userService.deleteUserAddress(userID, addressID);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Address not found', code: 'ADDRESS_NOT_FOUND' });  
      }
    } catch (error) {
      next(error);
    }
  }
  
}
