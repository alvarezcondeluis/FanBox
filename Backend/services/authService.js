
import {validateUser} from '../schemas/user.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { ServiceError } from '../utils/serviceError.js';
import jwt from 'jsonwebtoken';


const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in the environment variables.');
}

export class AuthService {
    constructor(UserModel) {
      this.UserModel = UserModel;
    }
    

    async register(user) {
      const { success, error, data } = validateUser(user);
  
      if (!success) {
        const errorMessages = error.errors.map(err => err.message);
        throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
      }
  
      data.passwd = await bcrypt.hash(data.passwd, 10);
      data.userID = uuidv4();
      data.userRole = 'user';
  
      try {
        const newUser = await this.UserModel.create(data);

        // Generar token JWT
        const token = jwt.sign({ userId: newUser.userID, role: newUser.role }, SECRET_KEY, { expiresIn: '1h' });
        // Devolvemos el usuario sin la contraseña para evitar problemas de seguridad
        const {passwd, ...userWithoutPasswd} = newUser.dataValues;
        return { token, user: userWithoutPasswd };;
      } catch (error) {
        
        throw error;
      }
    }
  
    async login(email, passwd) {
      const user = await this.UserModel.findOne({ where: { email } });
      if (!user) {
        throw new ServiceError('User not found', 'NOT_FOUND');
      }
      
      const isPasswordValid = await bcrypt.compare(passwd, user.passwd);
      if (!isPasswordValid) {
        throw new ServiceError('Invalid password', 'INVALID_PASSWORD');
      }
      const userPlain = user.get({ plain: true });
      // No le enviamos la contraseña al cliente para evitar problemas de seguridad
      const {passwd: password, ...userWithoutPasswd} = userPlain;
      console.log(user);
      const token = jwt.sign({ userId: user.userID, userRole: user.userRole }, SECRET_KEY, { expiresIn: '3h' });
      return { token, user:  userWithoutPasswd };
    }
  
    verifyToken(token) {
      try {
        return jwt.verify(token, SECRET_KEY);
      } catch (error) {
        throw new ServiceError('Invalid token', 'INVALID_TOKEN');
      }
    }
  }


