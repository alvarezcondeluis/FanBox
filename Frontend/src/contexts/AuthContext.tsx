// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "../services/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  userID: string;
  getUser: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    const token = AuthService.getToken();
    setIsAuthenticated(!!token);

    const storedUserID = AuthService.getUser();
    if (storedUserID) {
      setUserID(storedUserID);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await AuthService.login(email, password);
      setIsAuthenticated(true);
      const userID = AuthService.getUser();

      if (userID) {
        setUserID(userID);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };
  const getUser = () => {
    return userID;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, getUser, userID }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
