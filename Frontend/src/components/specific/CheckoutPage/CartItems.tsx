import React from "react";
import { Box, Grid, Typography, IconButton, Divider } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./CartItems.css";
import { useCart } from "../../../contexts/CartContext";
import { useAuth } from "../../../contexts/AuthContext";
const CartItems: React.FC = () => {
  const { cartItems, removeFromCart, updateCartItem, commitCartChanges } =
    useCart();
  const { getUser } = useAuth();

  return (
    <Box width="70%" paddingRight="20px">
      <Typography variant="h4" className="cart-items-title">
        Carrito de la compra
      </Typography>
      <Box className="cart-items-container">
        <Grid
          container
          alignItems="center"
          spacing={2}
          className="cart-items-header"
        >
          <Grid item xs={4}>
            <Typography
              variant="h5"
              textAlign="left"
              className="cart-items-hedader-text"
            >
              Producto
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography variant="h5" className="cart-items-hedader-text">
              Precio
            </Typography>
          </Grid>

          <Grid item xs={2} pr={5}>
            <Typography variant="h5" className="cart-items-hedader-text">
              Cantidad
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="h5" className="cart-items-hedader-text">
              Total
            </Typography>
          </Grid>
        </Grid>
        <Divider
          variant="middle"
          sx={{ borderColor: "black", marginBottom: "3px" }}
        />

        {cartItems.map((item, index) => (
          <Box className="cart-item-container" key={index} mb={0}>
            <Grid container display="flex" spacing={0} alignItems="center">
              <Grid item xs={2}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: "70%" }}
                />
              </Grid>
              <Grid item xs={2.5}>
                <Typography
                  variant="body1"
                  color={"black"}
                  className="cart-item-text"
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  className="cart-item-text s"
                  color={"black"}
                >
                  Tamaño: {item.size}
                </Typography>
              </Grid>

              <Grid item xs={2} pl={2}>
                <Typography className="cart-item-text" color={"black"}>
                  {item.price}€
                </Typography>
              </Grid>
              <Grid item xs={2.5} justifyContent={"right"} padding={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  padding={0}
                  className="cart-item-quantity-container"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    className="cart-item-minus-bottom"
                    flex="1" // Espacio reducido para el botón de menos
                  >
                    <IconButton
                      className="full-size-button"
                      onClick={() => {
                        updateCartItem(item.cartItemID, item.quantity - 1);
                      }}
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon className="cart-item-minus-button-icon" />
                    </IconButton>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    className="cart-item-quantity"
                    flex="1.5" // Aumenta el espacio para el campo de cantidad
                  >
                    <Typography sx={{ fontSize: "14px" }}>
                      {item.quantity}
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    className="cart-item-plus-button"
                    flex="1" // Espacio reducido para el botón de más
                  >
                    <IconButton
                      className="full-size-button"
                      onClick={() => {
                        updateCartItem(item.cartItemID, item.quantity + 1);
                      }}
                    >
                      <AddIcon className="cart-item-minus-button-icon" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={1.5}>
                <Typography textAlign={"right"} color={"black"}>
                  {item.price * item.quantity}€
                </Typography>
              </Grid>
              <Grid item xs={1.5}>
                <IconButton
                  sx={{ color: "black" }}
                  onClick={() => {
                    removeFromCart(getUser(), item.cartItemID);
                  }}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CartItems;
