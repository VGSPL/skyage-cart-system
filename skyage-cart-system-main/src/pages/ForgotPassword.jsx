import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }
    if (user && user.email === email) {


      localStorage.setItem("resetEmail", email);

      alert(`Password reset link sent to ${email}`);

      navigate("/reset-password");

    } else {

      alert("Email not found");

    }
  };

  return (
    <div
      className="auth-wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}
    >
      <div
        className="auth-form-container forgot-card"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div
          style={{
            padding: "2rem",
            borderRadius: "10px",

          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
            Forgot Password
          </h2>

          <p
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
              color: "#555"
            }}
          >
            Enter your email to reset your password.
          </p>

          {message && (
            <div
              style={{
                marginBottom: "1rem",
                textAlign: "center",
                color: message.includes("sent") ? "green" : "red"
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: "1rem" }}>
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc"
                }}
              />
            </div>

            <button
              type="submit"
              className="auth-btn"
              style={{
                width: "100%",
                padding: "0.7rem",
                borderRadius: "5px",
                backgroundColor: "#147E9E",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Send Reset Link
            </button>
          </form>

          <div
            className="auth-footer"
            style={{
              marginTop: "1rem",
              textAlign: "center",
              fontSize: "0.85rem"
            }}
          >
            Remembered your password?{" "}
            <Link to="/login" style={{ color: "#147E9E" }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;







