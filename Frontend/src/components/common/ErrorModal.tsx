import React from "react";
import { Modal, Box, Typography, Button, Backdrop, Fade } from "@mui/material";
import "../../assets/styles/ErrorModal.css";
import CancelIcon from "@mui/icons-material/Cancel";
interface ErrorModalProps {
  open: boolean;
  handleClose: () => void;
  errorMessage: string;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  handleClose,
  errorMessage,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open} timeout={500}>
        <Box className="modal-box">
          <CancelIcon
            sx={{ fontSize: 50, color: "#FF000", alignSelf: "center" }}
          />

          <Typography
            variant="h6"
            component="h2"
            sx={{
              alignSelf: "center",
              fontSize: "24px",
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            Ha ocurrido un error
          </Typography>
          <Typography sx={{ mt: 4, fontSize: "20px", ml: 3 }}>
            {errorMessage}
          </Typography>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "#B6DEFA",
              color: "#28333E",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "20px",
              fontSize: "16px",
              ml: 3,
              textTransform: "initial",
              "&:hover": {
                backgroundColor: "#6b8caf",
                color: "#B6DEFA",
              },
            }}
          >
            Cerrar
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};
