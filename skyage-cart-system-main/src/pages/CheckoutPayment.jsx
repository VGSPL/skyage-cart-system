import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, getCartTotal } from "../services/API";

export default function CheckoutPayment() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const cart = await getCart();
      setCartItems(cart?.items || []);

      const total = await getCartTotal();
      setCartTotal(total?.total || 0);

    } catch (error) {
      console.log("Cart error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3EED9] py-16 px-4">

      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Order Summary
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id || item.product?.id}
              className="flex justify-between mb-3 border-b pb-2"
            >
              <span>
                {item.product?.name} x {item.quantity}
              </span>

              <span>
                ₹{item.total_price || 0}
              </span>
            </div>
          ))
        )}

        <div className="flex justify-between font-semibold mt-4">
          <span>Total</span>
          <span>₹{cartTotal}</span>
        </div>

        <button
          onClick={() => navigate("/checkout/review")}
          className="mt-6 w-full bg-[#0b7285] text-white py-3 rounded"
        >
          Review Order →
        </button>

      </div>

    </div>
  );
}