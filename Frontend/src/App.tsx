// src/App.tsx
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "./assets/styles/global.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
