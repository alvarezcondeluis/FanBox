// src/routes/AppRoutes.tsx
import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DetailsPage from "../pages/DetailsPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderAddressPage from "../pages/OrderAddress";
import AddAddressPage from "../pages/AddAddressPage";
import EditAddressPage from "../pages/EditAddressPage";
const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="products/:productID" element={<DetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/address" element={<OrderAddressPage />} />
        <Route path="/checkout/address/new" element={<AddAddressPage />} />
        <Route path="/address/edit/:addressID" element={<EditAddressPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
