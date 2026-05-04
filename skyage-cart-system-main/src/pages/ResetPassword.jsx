import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPasswordConfirm } from "../services/API";
import "./Login.css";

const ResetPassword = () => {

  const { uid, token } = useParams();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("UID:", uid);
    console.log("TOKEN:", token);

    if (!uid || !token) {
      const msg = "Invalid reset link. Please check your email link again.";
      alert(msg);
      setMessage(msg);
      return;
    }

    if (!password || password.length < 8) {
      const msg = "Password must be at least 8 characters.";
      alert(msg);
      setMessage(msg);
      return;
    }

    try {
      await resetPasswordConfirm(uid, token, password);

      const successMsg =
        "Password updated successfully. You can now login with your new password.";

      alert(successMsg);
      setMessage(successMsg);

     
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      console.log(err);

      const errorMsg =
        err?.message ||
        "Password reset failed. Please try again.";

      alert(errorMsg);
      setMessage(errorMsg);
    }
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-form-container">

        <div className="auth-form-content">

          <h2 style={{
            textAlign: "center",
            marginBottom: "0.5rem"
          }}>
            Reset Password
          </h2>

          <p style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
            color: "#555"
          }}>
            Enter your new password
          </p>

          {message && (
            <div style={{
              marginBottom: "1rem",
              textAlign: "center",
              color: message.includes("successfully") ? "green" : "red"
            }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div
              className="form-group"
              style={{ marginBottom: "1rem" }}
            >
              <label>New Password</label>

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.6rem",
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
              Update Password
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

export default ResetPassword;





