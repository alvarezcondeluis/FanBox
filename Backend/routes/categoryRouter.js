import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController.js';

export function createCategoryRouter(CategoryModel) {
  const categoryRouter = Router();
  const categoryController = new CategoryController(CategoryModel);

  
  categoryRouter.post('', categoryController.create);
  categoryRouter.get('', categoryController.getAll);
  categoryRouter.get('/:categoryID', categoryController.getById);
  categoryRouter.put('/:categoryID', categoryController.update);
  categoryRouter.delete('/:categoryID', categoryController.delete);

  return categoryRouter;
}

