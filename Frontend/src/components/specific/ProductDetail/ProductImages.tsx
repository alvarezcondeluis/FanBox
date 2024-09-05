import React, { useState } from "react";
import { Box, CardMedia } from "@mui/material";
import { ProductImage } from "./../../../interfaces/Product";
import "./ProductImages.css";
interface ProductImagesProps {
  images: ProductImage[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<ProductImage>(images[0]);

  return (
    <Box display="flex">
      <Box className="product-image-thumbnails">
        {images.map((image, index) => (
          <Box
            key={index}
            className="product-image-thumbnail"
            onClick={() => setSelectedImage(image)}
          >
            <img src={image.url} alt={`product image ${index + 1}`} />
          </Box>
        ))}
      </Box>
      <CardMedia
        component="img"
        height="400"
        image={selectedImage.url}
        alt="Selected product image"
        sx={{ marginLeft: "20px" }}
      />
    </Box>
  );
};

export default ProductImages;
