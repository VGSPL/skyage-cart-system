import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  addToCart as apiAddToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
  getCartTotal
} from "../services/API";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [customerInfo, setCustomerInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");


  const fetchCart = async () => {

    try {

      setLoading(true);

      const cartData = await getCart();
      setCart(cartData.items || []);

      const totalData = await getCartTotal();
      setCartTotal(totalData.total || 0);

    } catch (err) {

      console.error("Cart fetch error:", err);


      if (err.message === "401 Unauthorized") {
        localStorage.removeItem("access");
        setCart([]);
        setCartTotal(0);
        return;
      }

      setCart([]);
      setCartTotal(0);

    } finally {
      setLoading(false);
    }

  };


  useEffect(() => {

    const token = localStorage.getItem("access");

    if (!token) {
      setLoading(false);
      return;
    }

    fetchCart();

  }, []);


  const addToCartHandler = async (product) => {

    try {

      await apiAddToCart(product.id, 1);
      await fetchCart();

    } catch (err) {

      console.error("Add to cart error:", err);

    }

  };


  const increaseQty = async (productId) => {

    const item = cart.find(i => i.product.id === productId);
    if (!item) return;

    try {

      await updateCartItem(productId, item.quantity + 1);
      // fetchCart();
      await fetchCart();

    } catch (err) {

      console.error("Increase qty error:", err);

    }

  };


  const decreaseQty = async (productId) => {

    const item = cart.find(i => i.product.id === productId);
    if (!item) return;

    const newQty = item.quantity - 1;

    try {

      if (newQty <= 0) {
        await deleteCartItem(productId);
      } else {
        await updateCartItem(productId, newQty);
      }

      fetchCart();

    } catch (err) {

      console.error("Decrease qty error:", err);

    }

  };


  const removeItem = async (productId) => {

    try {

      await deleteCartItem(productId);
      fetchCart();


    } catch (err) {

      console.error("Remove item error:", err);

    }

  };


  const value = useMemo(() => ({
    cart,
    cartTotal,
    loading,
    addToCart: addToCartHandler,
    increaseQty,
    decreaseQty,
    removeItem,
    customerInfo,
    setCustomerInfo,
    paymentMethod,
    setPaymentMethod,
    refreshCart: fetchCart
  }), [cart, cartTotal, loading, customerInfo, paymentMethod]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );

}

export const useCart = () => useContext(CartContext);
