// src/components/common/Layout.tsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ShoppingCart } from "./ShoppingCart";
const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return ( 
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      <ShoppingCart />
    </div>
  );
};

export default Layout;
