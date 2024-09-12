
import { ProductService } from '../services/productService.js'
import { ProductUnitService } from '../services/productUnitService.js'
import { ProductImageService } from '../services/productImageService.js'
import { Code } from 'mongodb';

export class ProductController {
  
  constructor(ProductModel, ProductUnitModel, ProductImageModel, CategoryModel) {
    this.productService = new ProductService(ProductModel, CategoryModel, ProductImageModel, ProductUnitModel);
    this.productUnitService = new ProductUnitService(ProductUnitModel, ProductModel);
    this.productImageService = new ProductImageService(ProductImageModel);
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getUnits = this.getUnits.bind(this);
    this.addUnit = this.addUnit.bind(this);
    this.getUnit = this.getUnit.bind(this);
    this.deleteUnit = this.deleteUnit.bind(this);
    this.updateUnit = this.updateUnit.bind(this);
    this.getImages = this.getImages.bind(this);
    this.addImage = this.addImage.bind(this);
    this.getImage = this.getImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.getProductDetails = this.getProductDetails.bind(this);
    this.getMainImage = this.getMainImage.bind(this);
  }


  async getAll(req, res, next) {
    try {
      const filters = req.query;
      const products = await this.productService.getAll(filters);
      res.status(200).json(products);
    } catch (error) {
      next(error);  
    }
  }

  async getUnits(req, res, next) {
    try {
      const productID = req.params.productID;
      const productUnits = await this.productUnitService.getUnits(productID);
      if (productUnits.length === 0) {
        res.status(204).send(); 
      }
      res.status(200).json(productUnits);
    } catch (error) {
      next(error);
    }
  }

  async getUnit(req, res, next) {
    try {
      const productID = req.params.productID;
      const productNumber = req.params.productNumber;
      const productUnit = await this.productUnitService.getUnit(productID, productNumber);
      if (!productUnit) {
        res.status(404).send({error: 'Product not found', code: 'NOT_FOUND'});
      }
      res.status(200).json(productUnit);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const product = req.body;
      const newProduct = await this.productService.create(product);
      res.status(201).json(newProduct);
    } catch (error) {
      
      next(error);
    }
  }

  async addUnit(req, res, next) {
    try {
      const productUnit = req.body;
      const { productID } = req.params;
      const newProductUnit = await this.productUnitService.addUnit(productID, productUnit);
      res.status(201).json(newProductUnit);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { productID } = req.params;
      const product = await this.productService.getById(productID);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'Product not found', code: 'NOT_FOUND' });  
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { productID } = req.params;
      const updatedProduct = await this.productService.update(productID, req.body);
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ error: 'Product not found', code: 'NOT_FOUND' });  
      }
    } catch (error) {
      next(error);
    }
  }

  async updateUnit(req, res, next) {
    try {
      const { productID, productNumber } = req.params;
      const updatedProduct = await this.productUnitService.updateUnit(productID, productNumber, req.body);
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ error: 'Product not found', code: 'NOT_FOUND' });  
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { productID } = req.params;
      const deleted = await this.productService.delete(productID);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Product not found', code: 'NOT_FOUND' });  
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteUnit(req, res, next) {
    try {
      const productID = req.params.productID;
      console.log(req.params);
      const productNumber = req.params.productNumber; 
      const deleted = await this.productUnitService.deleteUnit(productID, productNumber);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Product not found', code: 'NOT_FOUND' });  
      }
    } catch (error) {
      next(error);
    }
  }


  async getImages(req, res, next) {
    try {
      const { productID } = req.params;
      const images = await this.productImageService.getImages(productID);
      res.status(200).json(images);
    } catch (error) {
      next(error);
    }
  }

  async addImage(req, res, next) {
    try {
      const { productID } = req.params;
      const image = req.body;
      const newImage = await this.productImageService.addImage(productID, image);
      res.status(201).json(newImage);
    } catch (error) {
      next(error);
    }
  }

  async getImage(req, res, next) {  
    try {
      
      const { imageID } = req.params;
      const image = await this.productImageService.getImage(imageID);
      res.status(200).json(image);
    } catch (error) {
      next(error);
    }
  }

  async updateImage(req, res, next) {
      try {
        const { imageID, productID } = req.params;
      const updatedImage = await this.productImageService.updateImage(imageID, productID, req.body);
      if (updatedImage) {
        res.status(200).json(updatedImage);
      } else {
        res.status(404).json({ error: 'Image not found', code: 'NOT_FOUND' });  
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteImage(req, res, next) {
    try {
      const { imageID } = req.params;
      const deleted = await this.productImageService.deleteImage(imageID);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Image not found', code: 'NOT_FOUND' });  
      }
    } catch (error) {
      next(error);
    }
  }

  async getMainImage(req, res, next) {
    try {
      const { productID } = req.params;
      const image = await this.productImageService.getMainImage(productID);
      res.status(200).json(image);
    } catch (error) {
      next(error);
  }
  }

  async getProductDetails(req, res, next) {
    try {
      const { productID } = req.params;
      // Ejecutar las llamadas a los servicios en paralelo
    const [product, productUnits, productImages] = await Promise.all([
      this.productService.getById(productID),
      this.productUnitService.getUnits(productID),
      this.productImageService.getImages(productID)
    ]);


    if (!product) {
      return res.status(404).json({ error: 'Product not found', code: 'NOT_FOUND' }); 
    }

    // Combinar todos los datos en una sola respuesta
    const productDetails = {
      ...product,
      units: productUnits,
      images: productImages
    };

    res.status(200).json(productDetails);
  } catch (error) {
    next(error);
  }
  }

}
