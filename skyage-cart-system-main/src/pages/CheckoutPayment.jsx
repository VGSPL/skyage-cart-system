import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

export default function CheckoutPayment() {
  const navigate = useNavigate();
  const { cart, setPaymentMethod } = useContext(CartContext);

  const [payment, setPayment] = useState("Cash on Delivery");

  // ---------------- CALCULATIONS ----------------
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const shipping = 0;
  const discount = Math.round(subtotal * 0.1);
  const finalTotal = subtotal - discount + shipping;

  const handleReview = () => {
    setPaymentMethod(payment);
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
          maxWidth: "1100px",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        {/* ================= PAYMENT SECTION ================= */}
        <div
          style={{
            flex: "1 1 450px",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Payment Method</h2>

          {["Cash on Delivery", "UPI", "Card"].map((method) => (
            <label
              key={method}
              style={{
                display: "block",
                marginBottom: "15px",
                padding: "12px",
                border:
                  payment === method
                    ? "2px solid #0b7285"
                    : "1px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                value={method}
                checked={payment === method}
                onChange={(e) => setPayment(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              {method === "Cash on Delivery"
                ? "Cash on Delivery"
                : method === "UPI"
                  ? "UPI Payment"
                  : "Card Payment"}

              {method === "Cash on Delivery" && (
                <p
                  style={{
                    marginLeft: "25px",
                    marginTop: "5px",
                    color: "gray",
                    fontSize: "14px",
                  }}
                >
                  Pay when you receive the order
                </p>
              )}
            </label>
          ))}

          <button
            onClick={handleReview}
            onMouseOver={(e) => (e.target.style.background = "#0b7285")}
            onMouseOut={(e) => (e.target.style.background = "#1098ad")}
            style={{
              marginTop: "20px",
              padding: "14px",
              width: "100%",
              background: "#0b7285",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >

            Review Order →
          </button>

          <p style={{ marginTop: "15px", color: "gray" }}>
            🔒 100% Secure Payment
          </p>
        </div>

        {/* ================= ORDER SUMMARY ================= */}

        <div
          style={{
            flex: "1 1 400px",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>Order Summary</h3>

          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
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
              <strong>
                ₹{item.price * item.quantity}
              </strong>
            </div>
          ))}

          <hr />

          <div style={{ marginTop: "15px" }}>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </p>

            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Shipping</span>
              <span style={{ color: "green" }}>Free</span>
            </p>

            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Discount (10%)</span>
              <span style={{ color: "red" }}>-₹{discount}</span>
            </p>
          </div>

          <hr />

          <h3
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <span>Total Amount</span>
            <span style={{ color: "#d00000" }}>₹{finalTotal}</span>
          </h3>
        </div>
      </div>
    </div>
  );
}












