import React from "react";
import { Box } from "@mui/material";
import "./LandingPageComponents.css";

const Banner: React.FC = () => {
  return (
    <Box
      textAlign="center"
      className="banner"
      style={{
        padding: "130px 20px",
        backgroundColor: "#f5f5f5",
        color: "#000",
      }}
    ></Box>
  );
};

export default Banner;
