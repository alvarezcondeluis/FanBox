// src/interfaces/Product.ts
export interface Product {
    productID: string; // o number dependiendo del tipo de ID en tu base de datos
    name: string;
    description?: string; // El campo "description" podría ser opcional
    price: number;
    image: string; // Ruta o URL de la imagen
    category?: string;
    units: ProductUnit[]; // Si los productos tienen unidades asociadas
    images: ProductImage[]; // Si los productos tienen múltiples imágenes
    // Agrega otros campos según lo que tu producto necesita
  }
  
  export interface ProductUnit {
    id: string;
    stock: number;
    size: string; 
    price: number;
    productNumber: number
  }
  
  export interface ProductImage {
    id: string;
    url: string; // URL de la imagen
    alt?: string; // Texto alternativo para la imagen
    // Otros campos que describen la imagen
  }
  