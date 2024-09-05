import React, { createContext, useState, useContext, useEffect } from "react";
import CartItem from "../interfaces/CartItem";
import { CartService } from "../services/cartService";
import { useAuth } from "./AuthContext";

interface CartContextProps {
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (item: CartItem, userID: string) => void;
  removeFromCart: (userID: string, cartItemID: number) => void;
  cartItems: CartItem[];
  getCartItems: (userID: string) => void;
  updateCartItem: (cartItemID: number, newQuantity: number) => void;
  commitCartChanges: (userID: string) => void;
  calculateSubtotal: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);
interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [pendingChanges, setPendingChanges] = useState<any[]>([]);
  const { userID } = useAuth();
  const toggleCart = () => {
    setTimeout(() => {
      setIsCartOpen(!isCartOpen);
      console.log(isCartOpen);
    }, 100); // Ajusta el tiempo si es necesario
  };

  const getCartItems = async (userID: string) => {
    try {
      const items = await CartService.getCartItems(userID);

      setCartItems(items);
    } catch (error) {
      console.error("Error al obtener los ítems del carrito: ", error);
    }
  };

  const addToCart = (item: CartItem, userID: string) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem.productID === item.productID &&
        cartItem.productNumber === item.productNumber &&
        cartItem.size === item.size
    );

    if (existingItemIndex !== -1) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += item.quantity;

      setCartItems(updatedCartItems);
      setPendingChanges([
        ...pendingChanges,
        {
          type: "update",
          cartItemID: updatedCartItems[existingItemIndex].cartItemID,
          newQuantity: updatedCartItems[existingItemIndex].quantity,
        },
      ]);
    } else {
      // Si el producto no está en el carrito, añádelo
      setCartItems([...cartItems, item]);
      const transformedItem = {
        productID: item.productID,
        productNumber: item.productNumber,
        quantity: item.quantity,
      };
      setPendingChanges([
        ...pendingChanges,
        { type: "add", transformedItem, userID },
      ]);
      commitCartChanges(userID);
    }
  };

  const removeFromCart = (userID: string, cartItemID: number) => {
    setCartItems(cartItems.filter((item) => item.cartItemID !== cartItemID));

    setPendingChanges([
      ...pendingChanges,
      { type: "remove", userID, cartItemID },
    ]);
  };

  const updateCartItem = (cartItemID: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartItemID === cartItemID
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    setPendingChanges([
      ...pendingChanges,
      { type: "update", cartItemID, newQuantity },
    ]);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const commitCartChanges = async (userID: string) => {
    console.log(pendingChanges);
    if (pendingChanges.length === 0) return; // Si no hay cambios, no hacemos nada

    try {
      for (const change of pendingChanges) {
        if (change.type === "add") {
          await CartService.addCartItem(userID, change.transformedItem);
        } else if (change.type === "remove") {
          await CartService.deleteCartItem(userID, change.cartItemID);
        } else if (change.type === "update") {
          await CartService.updateCartItem(
            userID,
            change.cartItemID,
            change.newQuantity
          );
        }
      }

      // Limpia la cola de cambios una vez enviados con éxito
      setPendingChanges([]);

      // Notificar al usuario que todo fue correcto si lo deseas
      console.log(
        "Todos los cambios del carrito se han aplicado correctamente"
      );
    } catch (error) {
      // Aquí notificamos al usuario que algo falló
      console.error("Error al procesar los cambios del carrito: ", error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (pendingChanges.length > 0) {
        commitCartChanges(userID); // Sincronizar los cambios pendientes
        event.preventDefault(); // Algunos navegadores requieren esto para mostrar un mensaje
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        toggleCart,
        addToCart,
        removeFromCart,
        cartItems,
        getCartItems,
        updateCartItem,
        commitCartChanges,
        calculateSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
