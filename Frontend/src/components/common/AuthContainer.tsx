// src/components/auth/AuthContainer.tsx
import React from "react";
import { Box, Avatar, Container } from "@mui/material";
import "../../assets/styles/AuthContainer.css";

interface AuthContainerProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  variant?: "login" | "register" | "address";
}

const AuthContainer: React.FC<AuthContainerProps> = ({
  children,
  icon,
  variant,
}) => {
  return (
    <Container className={`auth-container-${variant}`} component="main">
      <Box className={`auth-box-${variant}`}>
        <Avatar className={`auth-avatar-${variant}`}>{icon}</Avatar>
        {children}
      </Box>
    </Container>
  );
};

export default AuthContainer;
