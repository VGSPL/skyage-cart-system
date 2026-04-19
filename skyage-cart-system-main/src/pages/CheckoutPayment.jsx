import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, getCartTotal } from "../services/API";

export default function CheckoutPayment() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {

      const cartRes = await getCart();
      setCartItems(cartRes.data);

      const totalRes = await getCartTotal();
      setCartTotal(totalRes.data.total);

    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };

  const handleReview = () => {
    navigate("/checkout/review");
  };

  return (

    <div
      style={{
        minHeight: "80vh",
        background: "#F3EED9",
        padding: "50px 20px",
      }}
    >

      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
        }}
      >

        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
          }}
        >

          <h2
            style={{
              marginBottom: "30px",
              fontWeight: "600"
            }}
          >
            Order Summary
          </h2>

          {cartItems.map((item, index) => (

            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px"
              }}
            >

              <div style={{ display: "flex", gap: "10px" }}>

                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "55px",
                    height: "55px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    background: "#f5f5f5",
                    padding: "3px"
                  }}
                />

                <div>
                  <p style={{ margin: 0, fontWeight: "500" }}>
                    {item.title}
                  </p>

                  <small style={{ color: "gray" }}>
                    Qty: {item.quantity}
                  </small>
                </div>

              </div>

              <strong style={{ fontSize: "16px" }}>
                ₹{item.total_price}
              </strong>

            </div>

          ))}

          <hr style={{ opacity: "0.3" }} />

          <div style={{ marginTop: "20px", fontSize: "15px" }}>

            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </p>

            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Shipping</span>
              <span style={{ color: "green" }}>Free</span>
            </p>

          </div>

          <hr style={{ opacity: "0.3" }} />

          <h3
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <span>Total Amount</span>

            <span
              style={{
                color: "#d00000",
                fontSize: "20px",
                fontWeight: "700"
              }}
            >
              ₹{cartTotal}
            </span>

          </h3>

          <button
            onClick={handleReview}
            onMouseOver={(e) => (e.target.style.background = "#095c6c")}
            onMouseOut={(e) => (e.target.style.background = "#0b7285")}
            style={{
              marginTop: "25px",
              padding: "14px",
              width: "100%",
              background: "#0b7285",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600"
            }}
          >
            Review Order →
          </button>

        </div>

      </div>

    </div>

  );
}