import React, { useState } from "react";
import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import { useCart } from "../../../contexts/CartContext";
import "./PriceSummary.css";
import CouponMenu from "../../common/CouponMenu";
import { useAuth } from "../../../contexts/AuthContext";
import { DiscountService } from "../../../services/discountService";
import Discount from "../../../interfaces/Discount";

interface PriceSummaryProps {
  isAddress: boolean;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ isAddress }) => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState<Discount | null>(null);
  const { getUser } = useAuth();
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { calculateSubtotal, commitCartChanges } = useCart();
  const [error, setError] = useState<string>("");

  const handleApplyCoupon = async () => {
    try {
      setMessage("");
      setOpen(false);
      setError("");
      const result = await DiscountService.validateCoupon(coupon);
      if (!result) {
        setError("Cupón inválido");
        return;
      }

      setDiscount(result);
      setCoupon("");
      setMessage("Cupón aplicado correctamente");
      setOpen(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = discount ? discount.discount : 0;
    return (subtotal - discountAmount).toFixed(2);
  };

  return (
    <div className={`price-summary-container ${isAddress ? "address" : ""}`}>
      <Typography variant="h5" color={"black"} className="price-summary-title">
        Resumen de la compra
      </Typography>
      {isAddress ? (
        <></>
      ) : (
        <CouponMenu
          setCoupon={setCoupon}
          handleApplyCoupon={handleApplyCoupon}
          error={error}
          coupon={coupon}
          message={message}
          open={open}
        />
      )}
      <Box flex={1} />

      <Box mt={2} display={"flex"} flexDirection={"column"}>
        <Grid
          container
          className="price-summary-text"
          justifyContent="space-between"
        >
          <Typography>Subtotal</Typography>
          <Typography>{calculateSubtotal().toFixed(2)}€</Typography>
        </Grid>
        <Grid
          className="price-summary-text"
          container
          justifyContent="space-between"
        >
          <Typography>Costo de envío</Typography>
          <Typography>{3}€</Typography>
        </Grid>
        <Grid
          className="price-summary-text"
          container
          justifyContent="space-between"
        >
          <Typography>Descuento</Typography>
          <Typography>{discount ? `-${discount.discount}€` : "0€"}</Typography>
        </Grid>
        <Grid
          className="price-summary-text"
          container
          justifyContent="space-between"
        >
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">{calculateTotal()}€</Typography>
        </Grid>
      </Box>
      <Divider variant="middle" sx={{ borderColor: "black" }} />

      {!isAddress ? (
        <Button
          variant="contained"
          sx={{ alignSelf: "center", marginBlock: "20px" }}
          className="shopping-cart-buy-button font-family bold"
          onClick={() => commitCartChanges(getUser())}
        >
          Comprar Ahora
        </Button>
      ) : (
        <Box display={"flex"} justifyContent={"space-evenly"} p={2}>
          <Button className="return-button" href="/checkout">
            Volver
          </Button>
          <Button
            href="/checkout/"
            className="shopping-cart-buy-button font-family bold"
          >
            Siguiente
          </Button>
        </Box>
      )}
    </div>
  );
};

export default PriceSummary;
