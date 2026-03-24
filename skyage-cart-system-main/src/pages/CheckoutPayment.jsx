import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

export default function CheckoutPayment() {

  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const shipping = 0;
  const finalTotal = subtotal + shipping;

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

          {cart.map((item, index) => (
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
                  alt={item.name}
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
                ₹{item.price * item.quantity}
              </strong>

            </div>
          ))}

          <hr style={{ opacity: "0.3" }} />

          <div style={{ marginTop: "20px", fontSize: "15px" }}>

            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
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
              ₹{finalTotal}
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









