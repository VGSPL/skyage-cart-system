import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeItem, cartTotal } = useCart();
  const navigate = useNavigate();

  // const items = cart?.items || [];
     const items = cart || [];

  if (!items || items.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-[#F3EED9]">
        <div className="bg-gray-100 p-8 rounded-2xl shadow-md text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold">Your Cart is Empty!</h2>
          <p className="text-lg mt-2">
            You must add items to the cart before proceeding to checkout.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">My Cart</h1>

      <div className="space-y-6">
        {items.map((item) => {
          const product = item.product;

          return (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-white p-4 rounded shadow"
            >
              <img
                src={
                  product?.product_images?.[0]?.product_images ||
                  "https://via.placeholder.com/100"
                }
                alt={product?.name}
                className="w-20 h-20 object-contain"
              />

              <div className="flex-1">
                <h2 className="font-medium">{product?.name}</h2>

                <p className="text-[#147E9E] font-semibold mt-1">
                  ₹{Number(product?.price).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(product?.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(product?.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(product?.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-right">
        <h2 className="text-xl font-semibold">
          Total: ₹{Number(cartTotal).toFixed(2)}
        </h2>

        <button
          onClick={() => navigate("/checkout/info")}
          className="mt-4 bg-[#147E9E] text-white px-6 py-2 rounded hover:bg-[#10657d]"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}