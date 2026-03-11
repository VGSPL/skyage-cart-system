import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    pan_number: "",
    referral_code: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");

    if (isAuth) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {

    let { name, value } = e.target;

    // PAN auto uppercase
    if (name === "pan_number") {
      value = value.toUpperCase();
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    setError("");
    setLoading(true);

    // Name validation
    if (!formData.name.trim()) {
      setError("Name is required");
      setLoading(false);
      return;
    }

    // Email duplicate check
    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (existingUser && existingUser.email === formData.email) {
      setError("User already exists with this email");
      setLoading(false);
      return;
    }

    // PAN validation
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!panRegex.test(formData.pan_number)) {
      setError("Invalid PAN number format (Example: ABCDE1234F)");
      setLoading(false);
      return;
    }

    // Password length check
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    // Password match check
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Split name
    const nameParts = formData.name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "User";

    const userData = {
      email: formData.email,
      first_name: firstName,
      last_name: lastName,
      password: formData.password,
      pan_number: formData.pan_number,
      referral_code: formData.referral_code
    };

    // Save user
    localStorage.setItem("user", JSON.stringify(userData));

    setLoading(false);

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-form-container">
        <div className="auth-form-content">

          <div className="auth-header">
            <h2>Create your account</h2>
            <p className="auth-subtitle">
              Please enter your details to start your journey
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex. John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex. yourname@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>PAN Number</label>
              <input
                type="text"
                name="pan_number"
                value={formData.pan_number}
                onChange={handleChange}
                placeholder="Ex. ABCDE1234F"
                maxLength="10"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Creating..." : "Create an account"} →
            </button>

          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Register;