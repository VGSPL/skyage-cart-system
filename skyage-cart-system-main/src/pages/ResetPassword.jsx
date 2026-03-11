import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const ResetPassword = () => {

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password.trim()) {
      alert("Please enter new password");
      return;
    }
        const user = JSON.parse(localStorage.getItem("user"));
const resetEmail = localStorage.getItem("resetEmail");

if (user && user.email === resetEmail) {

  user.password = password;

   localStorage.setItem("user", JSON.stringify(user));

  localStorage.removeItem("resetEmail");

  alert("Password updated successfully");

  navigate("/login");

} else {

  alert("User not found");

}
  };

  return (
    <div
      className="auth-wrapper"
      
    >

        <div
         className="auth-form-container"
        >  

          <div 
           className="auth-form-content"
          > 

          <h2
            style={{
              textAlign: "center",
              marginBottom: "0.5rem"
            }}
          >
            Reset Password
          </h2>

          <p
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
              color: "#555"
            }}
          >
            Enter your new password
          </p>

          <form onSubmit={handleSubmit}>

            <div
              className="form-group"
              style={{
                marginBottom: "1rem"
              }}
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

        </div>
      </div>

    </div>
  );
};

export default ResetPassword;
