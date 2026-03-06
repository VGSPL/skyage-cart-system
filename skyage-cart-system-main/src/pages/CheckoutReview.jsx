import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function CheckoutReview() {
  const navigate = useNavigate();
  const { cart, finalTotal, customerInfo, paymentMethod, setCart } = useCart();

  const handlePlaceOrder = () => {
    setCart([]); // Clear cart after order
    navigate("/order-success", {
      state: { orderId: Date.now() },
    });
  };

  return (
    <div className="min-h-screen bg-[#F3EED9] flex justify-center items-center py-16 px-4">
      {/* MAIN CARD */}
      <div className="w-full max-w-md bg-[#f8f6f0] rounded-3xl shadow-2xl p-6 space-y-5 border border-[#e6dfcf]">

        {/* Title */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">
            Review Your Order
          </h1>
        </div>

        {/* Shipping Info */}
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Shipping Info
          </h2>
          {customerInfo ? (
            <div className="text-sm text-gray-600 space-y-1">
              <p>{customerInfo.name}</p>
              <p>{customerInfo.address}</p>
              <p>
                {customerInfo.city}, {customerInfo.state} - {customerInfo.pincode}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-400">No shipping information available</p>
          )}
        </div>

        {/* Payment */}
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Payment Method
          </h2>
          <p className="text-sm text-gray-600">
            {paymentMethod || "Cash on Delivery"}
          </p>
        </div>

        {/* Order Items */}
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Order Items
          </h2>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="flex justify-between text-sm py-1">
                <span className="w-3/4 truncate">
                  {item.title} x {item.quantity}
                </span>
                <span>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No items in cart</p>
          )}

          Total Amount
          <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
            <span>Total Amount</span>
            <span className="text-red-600">
              ₹{finalTotal ? finalTotal.toFixed(2) : 0}
            </span>
          </div>
        </div>

        

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-[#147E9E] hover:bg-[#126b86] text-white py-3 rounded-xl font-medium transition duration-300"
        >
          Place Order
        </button>

      </div>
    </div>
  );
}