import React from "react";
import { Modal, Box, CircularProgress, Typography } from "@mui/material";

interface LoadingModalProps {
  open: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ open }) => {
  return (
    <Modal
      open={open}
      aria-labelledby="loading-modal-title"
      aria-describedby="loading-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(2px)",
        background: "transparent",
        // Oscurece el fondo cuando el modal está abierto
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          bgcolor: "#28333E", // Fondo del modal, consistente con tu aplicación
          borderRadius: "10px",
          boxShadow: 24,
        }}
      >
        <CircularProgress sx={{ color: "#B6DEFA" }} />
        <Typography
          id="loading-modal-title"
          variant="h6"
          mt={2}
          sx={{ color: "#B6DEFA", fontFamily: "Inter, sans-serif" }}
        >
          Cargando...
        </Typography>
      </Box>
    </Modal>
  );
};

export default LoadingModal;
