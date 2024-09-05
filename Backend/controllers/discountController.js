
import { DiscountService } from '../services/discountService.js'

export class DiscountController {
  
  constructor(DiscountModel) {
    this.DiscountService = new DiscountService(DiscountModel);
    this.create = this.create.bind(this);
    this.getAllOrValidate = this.getAllOrValidate.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    
  }


  async getAllOrValidate(req, res, next) {
    try {
      const { code } = req.query;

      if (code) {
        // Si se proporciona un código, valida el cupón
        const discount = await this.DiscountService.getByCode(code);

        if (discount) {
          res.status(200).json(discount);
        } else {
          res.status(404).json({ error: 'Cupón no válido o no encontrado', code: 'NOT_FOUND' });
        }
      } else {
        // Si no hay código, devuelve todos los descuentos
        const discounts = await this.DiscountService.getAll();
        res.status(200).json(discounts);
      }
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const discount = req.body;
      
      const newdiscount = await this.DiscountService.create(discount);
      res.status(201).json(newdiscount);
    } catch (error) {
      next(error);
    }
  
  }

  async getById(req, res) {
    try {
      const { discountID } = req.params;
      const discount = await this.DiscountService.getById(discountID);
      if (discount) {
        res.status(200).json(discount);
      } else {
        res.status(404).json({ error: 'Discount not found', code: 'NOT_FOUND' });
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req, res) {
    try {
      const { discountID } = req.params;
      
      const updateddiscount = await this.DiscountService.update(discountID, req.body);
      if (updateddiscount) {
        res.status(200).json(updateddiscount);
      } else {
        res.status(404).json({ error: 'Discount not found', code: 'NOT_FOUND' });
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res) {
    try {
      const { discountID } = req.params;
      const deleted = await this.DiscountService.delete(discountID);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Discount not found', code: 'NOT_FOUND' });
      }
    } catch (error) {
      next(error);
    }
  }

  

}
