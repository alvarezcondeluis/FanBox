import React, { useState } from "react";
import { Box, InputBase, Button } from "@mui/material";
import { MessageModal } from "./MessageModal";

interface CouponMenuProps {
  setCoupon: (coupon: string) => void;
  handleApplyCoupon: () => void;
  error: string;
  coupon: string;
  message: string;
  open: boolean;
}

const CouponMenu: React.FC<CouponMenuProps> = ({
  setCoupon,
  handleApplyCoupon,
  error,
  coupon,
  message,
  open,
}) => {
  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value); // Actualizamos el estado del cupón
  };

  return (
    <Box className="coupon-container">
      <label className="coupon-title">Ingresar cupón de descuento</label>
      <InputBase
        fullWidth
        className="coupon-input"
        value={coupon} // Vinculamos el input al estado del cupón
        onChange={handleCouponChange}
        // Añadir un placeholder si lo deseas
        sx={{
          padding: "2px 12px",
          fontSize: "10px",
          borderRadius: "15px",
        }}
      />
      {error ? <p className="coupon-error">{error}</p> : null}
      {open ? <p className="coupon-message">{message}</p> : null}
      <Button
        onClick={handleApplyCoupon}
        variant="contained"
        className="coupon-button"
        fullWidth
      >
        Aplicar Cupón
      </Button>
    </Box>
  );
};

export default CouponMenu;
