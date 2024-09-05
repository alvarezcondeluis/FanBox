import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";

import "./ProductDetails.css";
import { Product } from "./../../../interfaces/Product";
import { Remove, Add } from "@mui/icons-material";
import { useCart } from "../../../contexts/CartContext";
import { useAuth } from "../../../contexts/AuthContext";
import CartItem from "../../../interfaces/CartItem";
import { ErrorModal } from "../../common/ErrorModal";
import { MessageModal } from "./../../common/MessageModal";
interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState<number>(0);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const { addToCart } = useCart();
  const [isOpenMessageModal, setIsOpenMessageModal] = useState(false);
  const { getUser } = useAuth();
  const [isErrorModal, setIsErrorModal] = useState(false);
  const handleSizeChange = (event: SelectChangeEvent<string>) => {
    const target = event.target as HTMLSelectElement;
    const newSize = target.value;
    setSize(event.target.value as string);

    // Encuentra el stock correspondiente a la talla seleccionada
    const selectedUnit = product.units.find((unit) => unit.size === newSize);

    if (selectedUnit) {
      setStock(selectedUnit.stock);
      setQuantity(1); // Restablece la cantidad a 1 cuando se selecciona una nueva talla
    }
  };

  const handleAddToCart = () => {
    try {
      if (size && quantity > 0) {
        const item: CartItem = {
          cartItemID: 0,
          productNumber: product.units[0].productNumber,
          productID: product.productID,
          name: product.name,
          size: size,
          quantity: quantity,
          price: product.units[0].price,
          imageUrl: product.images[0].url,
        };
        addToCart(item, getUser());
        setIsOpenMessageModal(true);

        return;
      }
      setIsErrorModal(true);
    } catch (error) {}
  };

  const handleQuantityIncrease = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box className="product-details-container">
      {/* Título del Producto */}
      <Typography variant="h4" className="product-details-title">
        {product.name}
      </Typography>

      {/* Precios */}
      <Box className="product-price-container">
        {product.units && product.units.length > 0 && (
          <Typography variant="body1" className="product-price">
            {product.units[0].price}€
          </Typography>
        )}
      </Box>

      {/* Selector de Tallas */}
      <Box className="product-size-selector">
        <Typography variant="body1" className="product-input-title">
          Talla:
        </Typography>

        <Select
          value={size}
          required
          onChange={handleSizeChange}
          className="product-size-select"
        >
          {sizes.map((sizeOption, index) => {
            const unit = product.units.find((unit) => unit.size === sizeOption);
            return (
              <MenuItem
                key={index}
                value={sizeOption}
                disabled={!unit || unit.stock === 0}
              >
                {sizeOption} {(!unit || unit.stock === 0) && "(Agotado)"}
              </MenuItem>
            );
          })}
        </Select>
      </Box>

      {/* Selector de Cantidad */}
      <Box className="product-quantity-selector">
        <Typography variant="body1" className="product-input-title">
          Cantidad:
        </Typography>
        <Box className="quantity-input-container">
          <IconButton
            onClick={handleQuantityDecrease}
            disabled={quantity === 1}
            className="quantity-button"
          >
            <Remove />
          </IconButton>
          <Box className="quantity-display">{quantity}</Box>
          <IconButton
            onClick={handleQuantityIncrease}
            disabled={quantity === stock}
            className="quantity-button-plus"
          >
            <Add />
          </IconButton>
        </Box>
      </Box>

      {/* Botones de Acción */}
      <Box className="product-action-buttons">
        <Button variant="contained" color="primary" className="buy-now-button">
          Comprar ahora
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="add-to-cart-button"
          onClick={handleAddToCart}
        >
          Agregar a mi carrito
        </Button>
      </Box>
      <MessageModal
        open={isOpenMessageModal}
        handleClose={() => {
          setIsOpenMessageModal(false);
        }}
        message="Producto añadido correctamente al carrito"
        title="Éxito"
      />
      <ErrorModal
        open={isErrorModal}
        handleClose={() => {
          setIsErrorModal(false);
        }}
        errorMessage="Debe de elegir una talla"
      />
    </Box>
  );
};

export default ProductDetails;
