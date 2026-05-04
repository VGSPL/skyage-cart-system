import React, { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/API";
import "./Login.css";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await resetPassword(email);

      const successMsg = `Password reset link sent to ${email}. Please check your email and click the reset link to set a new password.`;
      alert(successMsg);
      setMessage(successMsg);


    } catch (err) {

      const errorMsg = err?.message || "Email not found";

      alert(errorMsg);
      setMessage(errorMsg);

    } finally {
      setLoading(false);
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
        <div style={{ padding: "2rem", borderRadius: "10px" }}>

          <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
            Forgot Password
          </h2>

          <p style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
            color: "#555"
          }}>
            Enter your email to reset your password.
          </p>

          {message && (
            <div style={{
              marginBottom: "1rem",
              textAlign: "center",
              color: message.includes("sent") ? "green" : "red"
            }}>
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
              disabled={loading}
              className="auth-btn"
              style={{
                width: "100%",
                padding: "0.7rem",
                borderRadius: "5px",
                backgroundColor: "#147E9E",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Sending..." : "Send Reset Link"}
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