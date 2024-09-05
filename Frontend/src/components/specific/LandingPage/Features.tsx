// src/components/Features.tsx
import React from "react";
import { Box, Grid } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SecurityIcon from "@mui/icons-material/Security";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";
import "./LandingPageComponents.css";
import Feature from "./Feature"; // Asegúrate de que la ruta es correcta

const Features: React.FC = () => {
  return (
    <Box
      textAlign="center"
      className="features-container"
      style={{
        padding: "10px 20px",
        backgroundColor: "#28333E",
        color: "#fff",
      }}
    >
      <Grid
        container
        spacing={4}
        className="features-grid"
        alignItems="stretch"
      >
        <Grid item xs={12} md={3}>
          <Feature
            icon={<CreditCardIcon style={{ fontSize: 40 }} />}
            title="Elige cómo pagar"
            description="Pueds pagar con tarjeta, débito, o PayPal"
            style={{ borderColor: "#28333E" }} // Añadiendo el color de fondo aquí
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Feature
            icon={<SecurityIcon style={{ fontSize: 40 }} />}
            title="Transacciones seguras"
            description="Realiza compras y ventas protegidas de principio a fin"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Feature
            icon={<LocalShippingIcon style={{ fontSize: 40 }} />}
            title="Envíos a domicilio"
            description="Recibe tus compras sin tener que salir de tu domicilio"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Feature
            icon={<StorefrontIcon style={{ fontSize: 40 }} />}
            title="Gran variedad de productos"
            description="Encuentra una amplia gama de productos a tu disposición."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Features;
