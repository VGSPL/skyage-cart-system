import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeItem, finalTotal } = useCart();
  const navigate = useNavigate();

  

if (cart.length === 0) {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-md text-center max-w-md w-full">
        <h2 className="text-2xl font-semibold">
          Your Cart is Empty!
        </h2>

        <p className="text-lg mt-2">
          You must add items to the cart before processed to checkout.
        </p>
      </div>
    </div>
  );
}
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">My Cart</h1>

      <div className="space-y-6">
        {cart.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-6 bg-white p-4 rounded shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-contain"
            />

            <div className="flex-1">
              <h2 className="font-medium">{item.title}</h2>
              <p className="text-[#147E9E] font-semibold mt-1">
                ₹{item.price}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => increaseQty(item.id)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        
       <h2 className="text-xl font-semibold">
    Total: ₹{finalTotal.toFixed(2)}
  </h2>

        <button
          onClick={() => navigate("/checkout/info")}
          className="mt-4 bg-[#147E9E] text-white px-6 py-2 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}