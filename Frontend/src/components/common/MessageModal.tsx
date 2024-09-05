import React from "react";
import { Modal, Box, Typography, Button, Backdrop, Fade } from "@mui/material";
import "../../assets/styles/ErrorModal.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
interface MessageModalProps {
  open: boolean;
  handleClose: () => void;
  message: string;
  title: string;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  open,
  handleClose,
  message,
  title,
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
          <CheckCircleIcon
            sx={{ fontSize: 50, color: "#FF000", alignSelf: "center" }}
          />

          <Typography
            variant="h6"
            component="h2"
            sx={{
              alignSelf: "center",
              fontSize: "20px",
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ mt: 4, fontSize: "18px", ml: 3 }}>
            {message}
          </Typography>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "#B6DEFA",
              color: "#28333E",
              padding: "5px",
              width: "50%",
              borderRadius: "5px",
              mt: 1,
              alignSelf: "center",
              fontSize: "16px",

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
