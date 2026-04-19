import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentMethod.css";
import upiQR from "../assets/upi-qr.png";

export default function PaymentMethod() {

  const navigate = useNavigate();

  const handlePaymentDone = () => {

    const confirmPayment = window.confirm(
      "Have you completed the UPI payment?"
    );

    if (confirmPayment) {
      navigate("/order-success");
    }

  };

  return (

    <div className="payment-page">

      <div className="payment-card">

        <h2 className="payment-title">
          Payment Method
        </h2>

        <div className="upi-box">

          <h3 className="upi-heading">
            Scan & Pay using UPI
          </h3>

          <img
            src={upiQR}
            alt="UPI QR"
            className="upi-qr"
          />

          <p className="upi-text">
            Scan this QR code using any UPI app to complete payment
          </p>

        </div>

        <button
          className="review-btn"
          onClick={handlePaymentDone}
        >
          Payment Done →
        </button>

        <p className="secure-text">
          🔒 100% Secure Payment
        </p>

      </div>

    </div>
  );
}