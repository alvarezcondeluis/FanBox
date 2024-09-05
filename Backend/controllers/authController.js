import { AuthService } from '../services/authService.js'

export class AuthController {
  constructor (UserModel) {
    this.authService = new AuthService(UserModel)
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
  }

  async register (req, res, next) { // Asegúrate de incluir next como parámetro
    try {
      const newUser = await this.authService.register(req.body)
      res.status(201).json(newUser)
    } catch (error) {
      next(error) // Pasa el error a next para el manejo de errores
    }
  }

  async login (req, res, next) {
    try {
      const { email, passwd } = req.body
      const { token, user } = await this.authService.login(email, passwd)
      res.status(200).json({ token, user })
    } catch (error) {
      next(error)
    }
  }
}
