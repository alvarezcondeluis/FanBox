// src/components/Feature.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
// Usa el ícono que necesites
import './LandingPageComponents.css';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  style?: React.CSSProperties;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, style }) => {
  return (
    <Box className="feature-box" style={{ ...style, borderColor: ` ${style?.borderColor || '#B6DEFA'}` }}>
      <Box className="feature-icon">{icon}</Box>
      <Typography variant="h6" className="feature-title">{title}</Typography>
      <Typography variant="body1" className="feature-description">{description}</Typography>
    </Box>
  );
};

export default Feature;
