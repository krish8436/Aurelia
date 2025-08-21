import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
  
      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += 1;
        return updatedItems;
      } else {
        const cleanedPrice = parseFloat(
          product.price?.toString().replace(/[^\d.]/g, "")
        );
        
        return [
          ...prevItems,
          {
            ...product,
            price: isNaN(cleanedPrice) ? 0 : cleanedPrice,
            quantity: 1,
          },
        ];
        
      }
    });
  };
  

  const updateQuantity = (productId, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
