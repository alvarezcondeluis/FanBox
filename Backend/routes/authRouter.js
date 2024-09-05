import { Router } from 'express'
import { AuthController } from '../controllers/authController.js'



export const createAuthRouter = (userModel) => {


  const authRouter = Router();
  const authController = new AuthController(userModel);

  authRouter.post('/register', authController.register.bind(authController));
  authRouter.post('/login', authController.login.bind(authController));

  return authRouter 
}
