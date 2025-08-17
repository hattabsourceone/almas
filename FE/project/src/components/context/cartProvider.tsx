import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface CartItem {
  id: string;
  total_sales_price: number;
  price: number;
  final_price: number;
}

interface CartContextType {
  cart: CartItem[];
  total: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  toggleCart: () => {},
  clearCart: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart);
      setCart(parsedCart);
      calculateTotal(parsedCart);
    }
  }, []);

  const calculateTotal = (cartItems: CartItem[]) => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + (item.final_price || item.total_sales_price || item.price),
      0
    );
    setTotal(totalPrice);
  };

  const addToCart = (item: CartItem) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    toggleCart();
  }

  const toggleCart = () => {
    const savedCart = localStorage.getItem('cart');
    const parsedCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
    setCart(parsedCart);
    calculateTotal(parsedCart);
    calculateTotal(parsedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addToCart,
        removeFromCart,
        toggleCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
