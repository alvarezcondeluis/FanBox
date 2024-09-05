import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"; // Icono de fútbol
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined"; // Icono de pin
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import "./ProductInfo.css";
const ProductInfo: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#28333E", paddingTop: "20px" }}>
      <Typography variant="h6" className="product-info-title product-info-font">
        Descripción del producto
      </Typography>

      <Grid
        container
        spacing={13}
        sx={{ marginTop: "25px" }}
        justifyContent="center"
      >
        <Grid item xs={12} md={4} textAlign="center" justifyContent="center">
          <SportsSoccerIcon sx={{ fontSize: 100, color: "#fff" }} />
          <Typography
            sx={{ color: "#fff", marginTop: "8px" }}
            className="product-info-font"
          >
            Fútbol
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} textAlign="center" className="pin-container">
          <PushPinOutlinedIcon sx={{ fontSize: 90, color: "#fff" }} />
          <Typography
            sx={{ color: "#fff", marginTop: "8px" }}
            className="product-info-font"
          >
            Camiseta del Real Madrid del año 1999
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} textAlign="center">
          <LocalMallOutlinedIcon sx={{ fontSize: 100, color: "#fff" }} />
          <Typography
            sx={{ color: "#fff", marginTop: "8px" }}
            className="product-info-font"
          >
            Adidas
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductInfo;
