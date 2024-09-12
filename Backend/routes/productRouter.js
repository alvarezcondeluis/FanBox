import { Router } from 'express'
import { ProductController } from '../controllers/productController.js'

export const createProductRouter = (ProductModel, ProductUnitModel, ProductImageModel, CategoryModel) => {


  const productsRouter = Router()
  const productController = new ProductController(ProductModel, ProductUnitModel, ProductImageModel, CategoryModel);
  

  // Product
  productsRouter.post('', productController.create);
  productsRouter.get('', productController.getAll);
  productsRouter.get('/:productID', productController.getById);
  productsRouter.put('/:productID', productController.update);
  productsRouter.delete('/:productID', productController.delete);

  // Ruta para obtener detalles completos del producto
  productsRouter.get('/:productID/details', productController.getProductDetails);

  // Product Images

  productsRouter.post('/:productID/images', productController.addImage.bind(productController));
  productsRouter.get('/:productID/images', productController.getImages.bind(productController));
  productsRouter.get('/:productID/images/:imageID', productController.getImage.bind(productController));
  productsRouter.put('/:productID/images/:imageID', productController.updateImage.bind(productController));
  productsRouter.delete('/:productID/images/:imageID', productController.deleteImage.bind(productController));
  productsRouter.get('/:productID/main-image', productController.getMainImage.bind(productController));


  // Product Units
  productsRouter.get('/:productID/units', productController.getUnits);
  productsRouter.post('/:productID/units', productController.addUnit);
  productsRouter.get('/:productID/units/:productNumber', productController.getUnit);
  productsRouter.put('/:productID/units/:productNumber', productController.updateUnit);
  productsRouter.delete('/:productID/units/:productNumber', productController.deleteUnit);

  return productsRouter
}
