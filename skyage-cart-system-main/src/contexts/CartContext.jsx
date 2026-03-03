import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  //  NEW STATES ADD KARA
  const [customerInfo, setCustomerInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
// const discount = subtotal * 0.1;
// const finalTotal = subtotal - discount;
const finalTotal = cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
  setCart,
  addToCart,
  increaseQty,
  decreaseQty,
  removeItem,
  // subtotal,
  // discount,
  finalTotal,
  customerInfo,
  setCustomerInfo,
  paymentMethod,
  setPaymentMethod
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);










