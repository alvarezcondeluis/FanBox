import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductCard from "./ProductCard"; // Asegúrate de que la ruta sea correcta
import "./LandingPageComponents.css";
import { Product } from "../../../interfaces/Product";
import imageShirt from "../../../../public/madrid-removebg-preview.png";

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 5;

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - visibleCards, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + visibleCards, products.length - visibleCards)
    );
  };

  return (
    <Box className="product-section">
      <Typography
        className="product-section-title"
        alignSelf="start"
        gutterBottom
      >
        {title}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
          sx={{
            position: "absolute",
            left: "1.1rem",
            zIndex: 1,
            opacity: 0.9,
            backgroundColor: "#B6DEFA",
            "&:hover": {
              backgroundColor: "#263a50",
              color: "#B6DEFA",
            },
          }}
        >
          <ArrowBackIosIcon sx={{ fontSize: 17 }} />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            overflowX: "hidden",
            width: "100%",
            padding: "14px 50px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              marginRight: "35px",
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              transition: "transform 0.3s ease-in-out",
              gap: "3vw",
            }}
          >
            {products.map((product) => {
              const mainImageUrl =
                product.images && product.images.length > 0
                  ? product.images[0].url
                  : "";

              const priceProd: number =
                product.units &&
                product.units.length > 0 &&
                product.units[0].price
                  ? product.units[0].price
                  : 0;

              return (
                <Box
                  key={product.productID}
                  sx={{ flex: "0 0 calc(20% - 2vh)" }}
                >
                  <ProductCard
                    name={product.name}
                    price={priceProd}
                    image={mainImageUrl}
                    productID={product.productID}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>

        <IconButton
          onClick={handleNextClick}
          disabled={currentIndex >= products.length - visibleCards}
          sx={{
            position: "absolute",
            right: "0.5rem",
            zIndex: 1,
            opacity: 0.9,
            backgroundColor: "#B6DEFA",
            "&:hover": {
              backgroundColor: "#263a50",
              color: "#B6DEFA",
            },
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: 17 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ProductSection;
