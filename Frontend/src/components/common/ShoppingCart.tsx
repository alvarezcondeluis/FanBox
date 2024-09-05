import React, { useEffect } from "react";
import "../../assets/styles/ShoppingCart.css";
import { useCart } from "../../contexts/CartContext";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAuth } from "../../contexts/AuthContext";

export const ShoppingCart: React.FC = () => {
  const {
    toggleCart,
    isCartOpen,
    getCartItems,
    cartItems,
    removeFromCart,
    updateCartItem,
    commitCartChanges,
    calculateSubtotal,
  } = useCart();
  const { getUser } = useAuth();

  const calculateDiscount = () => {
    // Asume un descuento de ejemplo, podrías tener lógica personalizada
    return -3; // ejemplo
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDiscount();
  };

  useEffect(() => {
    getCartItems(getUser());
    console.log(cartItems);
  }, []);

  useEffect(() => {
    commitCartChanges(getUser());
  }, [isCartOpen]);
  return (
    <>
      <div className={`shopping-cart ${isCartOpen ? "open" : ""}`}>
        <div className="shopping-cart-header">
          <h2 className="shopping-cart-title">Mi Carrito</h2>
          <button className="close-button" onClick={toggleCart}>
            ✖
          </button>
        </div>
        <div className="shopping-cart-content">
          {cartItems.length === 0 ? (
            <>
              {" "}
              <ShoppingCartOutlinedIcon className="empty-cart-icon" />
              <p>Aún no tienes artículos en tu carrito de compras</p>
            </>
          ) : (
            <>
              <div className="shopping-cart-items-container">
                {cartItems.map((item, index) => (
                  <Box key={index} mb={2}>
                    <Grid
                      container
                      display="flex"
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid item xs={2}>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          style={{ width: "100%" }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body1">{item.name}</Typography>
                        <Typography variant="body2">
                          Tamaño: {item.size}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Grid
                          container
                          alignItems="center"
                          className="cart-item-quantity-container"
                        >
                          <Grid
                            item
                            xs={4}
                            display="flex"
                            className="cart-item-minus-bottom"
                            justifyContent="flex-start"
                          >
                            <IconButton
                              className="full-size-button"
                              onClick={() => {
                                updateCartItem(
                                  item.cartItemID,
                                  item.quantity - 1
                                );
                              }}
                              disabled={item.quantity <= 1}
                            >
                              <RemoveIcon className="cart-item-minus-button-icon" />
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            className="cart-item-quantity"
                            xs={4}
                            display="flex"
                            justifyContent="center"
                          >
                            <Typography sx={{ fontSize: "14px" }}>
                              {item.quantity}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            display="flex"
                            className="cart-item-plus-button"
                            justifyContent="flex-end"
                          >
                            <IconButton
                              className="full-size-button"
                              onClick={() => {
                                updateCartItem(
                                  item.cartItemID,
                                  item.quantity + 1
                                );
                              }}
                            >
                              <AddIcon className="cart-item-minus-button-icon" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography>
                          {(item.price * item.quantity).toFixed(2)}€
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={() =>
                            removeFromCart(getUser(), item.cartItemID)
                          }
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Box>
                ))}
              </div>

              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="column"
              >
                <Box mt={2} mb={0} pt={0} pb={2} borderTop="1px solid white">
                  <Grid
                    container
                    justifyContent="space-between"
                    borderBottom="1px solid white"
                    paddingTop="2px"
                    paddingBottom="2px"
                  >
                    <Typography pl={2} className="font-family">
                      Subtotal
                    </Typography>
                    <Typography pr={2} className="font-family">
                      {calculateSubtotal().toFixed(2)} €
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    justifyContent="space-between"
                    borderBottom="1px solid white"
                    paddingTop="2px"
                    paddingBottom="2px"
                  >
                    <Typography pl={2} className="font-family">
                      Descuentos
                    </Typography>
                    <Typography pr={2} className="font-family">
                      {calculateDiscount().toFixed(2)} €
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      pl={2}
                      pr={2}
                      className="font-family"
                      variant="h6"
                    >
                      Total
                    </Typography>
                    <Typography pr={2} className="font-family" variant="h6">
                      {calculateTotal().toFixed(2)} €
                    </Typography>
                  </Grid>
                  <Button
                    variant="contained"
                    className="shopping-cart-buy-button font-family bold"
                    href="/checkout/address"
                  >
                    Comprar Ahora
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </div>
      </div>
      <div
        className={`cart-overlay ${isCartOpen ? "visible" : ""}`}
        onClick={toggleCart}
      ></div>
    </>
  );
};
