import React from 'react';
import { Box, Typography, Link, TextField, Button } from '@mui/material';
import '../../assets/styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <>
    <Box className="footer-divider-container">
        <Box className="footer-divider" />
    </Box>
     
    <Box component="footer" className="footer">
      <Box className="footer-container">
        <Box className="footer-column">
          <Typography variant="h6" className="footer-title">CATEGORÍAS</Typography>
          <Link href="#" className="footer-link">Camisetas</Link>
          <Link href="#" className="footer-link">Equipos</Link>
          <Link href="#" className="footer-link">Más Vendidos</Link>
          <Link href="#" className="footer-link">Ofertas</Link>
        </Box>
        <Box className="footer-column">
          <Typography variant="h6" className="footer-title">DESCUBRE FANBOX</Typography>
          <Link href="#" className="footer-link">Envíos y Devoluciones</Link>
          <Link href="#" className="footer-link">¿Cómo comprar?</Link>
          <Link href="#" className="footer-link">¿Cómo vender?</Link>
          <Link href="#" className="footer-link">Envío a domicilio</Link>
          <Link href="#" className="footer-link">Privacidad</Link>
          <Link href="#" className="footer-link">Términos de uso</Link>
        </Box>
        <Box className="footer-column">
          <Typography variant="h6" className="footer-title">TU CUENTA</Typography>
          <Link href="#" className="footer-link">Información personal</Link>
          <Link href="#" className="footer-link">Mis pedidos</Link>
          <Link href="#" className="footer-link">Mis ventas</Link>
          <Link href="#" className="footer-link">Mis direcciones</Link>
        </Box>
        <Box className="footer-column newsletter">
          <Typography variant="h6" className="footer-title">SUSCRIPCIÓN NEWSLETTER</Typography>
          <Typography variant="body2" className="footer-newsletter-description">Recibe las mejores ofertas!</Typography>
          <TextField
            placeholder="Ingresá tu correo electrónico"
            variant="outlined"
            fullWidth
            className="footer-newsletter-input"
          />
          <Button
            variant="contained"
            className="footer-newsletter-button"
          >
            Suscribirme
          </Button>
          <Button
            variant="outlined"
            className="footer-newsletter-outline-button"
          >
            Botón de arrepentimiento
          </Button>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default Footer;
