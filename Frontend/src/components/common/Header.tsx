// src/components/common/Header.tsx
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  TextField,
  Box,
  Link,
  IconButton,
  InputAdornment,
  useScrollTrigger,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import SearchIcon from "@mui/icons-material/Search";
import "../../assets/styles/Header.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { MessageModal } from "./MessageModal";

const Header: React.FC = () => {
  const { isAuthenticated, logout, getUser } = useAuth();
  const [isOpenMessageModal, setIsOpenMessageModal] = useState(false);
  const { toggleCart, getCartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);
  const handleLogout = () => {
    logout();

    setTimeout(() => {
      navigate("/");
    }, 300);
    setIsOpenMessageModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenMessageModal(false);
  };
  const handleCartClick = () => {
    toggleCart();
  };
  return (
    <AppBar position="static" className="header-app-bar">
      <Toolbar className="header-toolbar">
        <Link href="/" className="header-title">
          FanBox
        </Link>

        <TextField
          className="header-search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Busca por marca, equipo, etc."
        />
        {isAuthenticated ? (
          <div className="header-icons-container">
            <IconButton className="header-icons">
              <FavoriteBorderIcon sx={{ height: 32, width: 32 }} />
            </IconButton>
            <IconButton className="header-icons">
              <AccountCircleIcon sx={{ height: 32, width: 32 }} />
            </IconButton>
            <IconButton className="header-icons" onClick={handleCartClick}>
              <ShoppingCartOutlinedIcon sx={{ height: 32, width: 32 }} />
            </IconButton>
            <IconButton className="header-icons" onClick={handleLogout}>
              <LogoutIcon sx={{ height: 32, width: 32 }} />
            </IconButton>
          </div>
        ) : (
          <Button href="/login" className="header-button">
            Iniciar Sesión
          </Button>
        )}
      </Toolbar>
      <Box
        display="flex"
        paddingTop="5px"
        paddingBottom="10px"
        justifyContent="space-between"
        bgcolor="#252b3a"
      >
        <Link href="#" className="header-link">
          Categorías
        </Link>
        <Link href="#" className="header-link">
          Deportes
        </Link>
        <Link href="#" className="header-link">
          Equipos
        </Link>
        <Link href="#" className="header-link">
          Más Vendidos
        </Link>
        <Link href="#" className="header-link">
          Ofertas
        </Link>
        <Link href="#" className="header-link">
          Quiero Vender
        </Link>
      </Box>
      <MessageModal
        open={isOpenMessageModal}
        handleClose={handleCloseModal}
        message="Se cerró sesión con éxito"
        title="Éxito"
      />
    </AppBar>
  );
};

export default Header;
