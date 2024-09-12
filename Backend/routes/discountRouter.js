import { Router } from 'express';
import { DiscountController } from '../controllers/discountController.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const createDiscountRouter = (discountModel) => {
  const discountRouter = Router();
  const discountController = new DiscountController(discountModel);
  discountRouter.get('/all', authMiddleware, roleMiddleware(['admin']), discountController.getAll.bind(discountController));
  

  discountRouter.post('/', authMiddleware, roleMiddleware(['admin']), discountController.create.bind(discountController));
  discountRouter.get('/', authMiddleware, roleMiddleware(['admin']), discountController.getByCode.bind(discountController)); 
  discountRouter.get('/:discountID', discountController.getById.bind(discountController));
  discountRouter.put('/:discountID', discountController.update.bind(discountController));
  discountRouter.delete('/:discountID', discountController.delete.bind(discountController));
 
  return discountRouter;
};
