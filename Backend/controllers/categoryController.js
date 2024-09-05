
import { CategoryService } from '../services/categoryService.js'

export class CategoryController {
  
  constructor(CategoryModel) {
    this.categoryService = new CategoryService(CategoryModel);
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }


  async getAll(req, res) {
    try {
      const categories = await this.categoryService.getAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);  
    }
  }

  async create(req, res) {
    try {
      const category = req.body;
      
      const newCategory = await this.categoryService.create(category);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  
  }

  async getById(req, res) {
    try {
      const { categoryID } = req.params;
      const category = await this.categoryService.getById(categoryID);
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ error: 'Category not found', code: 'NOT_FOUND' });
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req, res) {
    try {
      const { categoryID } = req.params;
      
      const updatedCategory = await this.categoryService.update(categoryID, req.body);
      if (updatedCategory) {
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ error: 'Category not found', code: 'NOT_FOUND' });
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res) {
    try {
      const { categoryID } = req.params;
      const deleted = await this.categoryService.delete(categoryID);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Category not found', code: 'NOT_FOUND' });
      }
    } catch (error) {
      next(error);
    }
  }

}
