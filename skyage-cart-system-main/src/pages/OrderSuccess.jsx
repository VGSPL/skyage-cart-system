import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../contexts/CartContext";

export default function OrderSuccess() {

  const location = useLocation();
  const navigate = useNavigate();
  const { setCart } = useCart();

  useEffect(() => {
    setCart([]);
  }, []);

  const orderId = location.state?.orderId || "N/A";

  return (
    <div className="min-h-screen bg-[#F3EED9] flex justify-center items-center px-4">

      <div className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl text-center space-y-5 border border-[#e6dfcf]">

        {/* Success Icon */}
        <div className="text-green-600 text-5xl">✔</div>

        <h2 className="text-2xl font-semibold text-gray-800">
          Order Placed Successfully!
        </h2>

        <p className="text-gray-600 text-sm">
          Thank you for your purchase.
        </p>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600">Order ID</p>
          <p className="font-semibold text-gray-800">
            #{orderId}
          </p>
        </div>

        <p className="text-sm text-gray-500">
          Expected Delivery: 3-5 days
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-[#147E9E] hover:bg-[#126b86] text-white py-3 rounded-xl font-medium transition duration-300"
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
}