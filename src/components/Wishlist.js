import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlistItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item) => {
    const exists = wishlist.find((w) => w.id === item.id);
    if (!exists) {
      setWishlist([...wishlist, item]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
