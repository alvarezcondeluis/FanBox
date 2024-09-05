import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import "./LandingPageComponents.css";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  productID: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  productID,
}) => {
  // Estado para controlar la elevación
  const [elevation, setElevation] = useState(0); // Elevación inicial

  return (
    <Card
      className="card-container"
      elevation={elevation} // Controla la elevación usando el estado
      onMouseEnter={() => setElevation(10)} // Aumenta la elevación al hacer hover
      onMouseLeave={() => setElevation(0)} // Reduce la elevación al dejar de hacer hover
      style={{
        backgroundColor: "#28333E",
        borderRadius: "20px",
        color: "#fff",
        height: "300px",
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        alt={name}
        height="65%"
        image={image}
        style={{ objectFit: "contain", padding: "5px" }}
      />
      <IconButton
        className="icon-button"
        style={{
          position: "absolute",
          top: "2px",
          right: "2px",
          color: "#B6DEFA",
        }}
        aria-label="add to favorites"
      >
        <FavoriteBorderIcon sx={{ fontSize: 30 }} />
      </IconButton>
      <CardContent
        className="card-content"
        style={{ textAlign: "center", width: "100%" }}
      >
        <Typography
          variant="body2"
          component="p"
          style={{ marginBottom: "10px" }}
        >
          {name}
        </Typography>
        <Button
          variant="contained"
          className="button-price"
          href={"/products/" + productID}
          style={{
            backgroundColor: "#B6DEFA",
            color: "#28333E",
            // Color del texto
            borderRadius: "0 0 10px 10px",
            padding: "10px 10px",
            width: "100%",
            // Ocupa todo el ancho
          }}
        >
          {price}€
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
