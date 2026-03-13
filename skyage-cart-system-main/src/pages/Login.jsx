import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import './Login.css';
import loginIllustration from '../assets/2152026891.jpg';
import logo from '../assets/Logo 2.png';

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckbox = () => {
    setRemember(!remember);
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    setError('');
    setLoading(true);

    // Check empty fields
    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please fill out all fields");
      setLoading(false);
      return;
    }

    // Get stored user
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("User not found. Please register first.");
      setLoading(false);
      return;
    }

    // Validate credentials
    if (
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {

      login();
      navigate("/home");

    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-illustration">
        <div className="illustration-content">
          <img
            src={loginIllustration}
            alt="Shopping Illustration"
            className="illustration-image"
          />
        </div>
      </div>
      <div className="auth-form-container">
        <div className="auth-form-content">

          <div className="auth-header">
            <img src={logo} alt="Logo" className="auth-logo" />
            <h2>Welcome back</h2>
            <p className="auth-subtitle">
              Welcome back! Please enter your details.
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form
            onSubmit={handleSubmit}
            className="auth-form"
            autoComplete="off"
          >
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="off"
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
                autoComplete="new-password"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={handleCheckbox}
                />
                <span>Remember for 30 days</span>
              </label>


              <Link className="forgot-link" to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign in now"} →
            </button>

            <div className="social-login">
              <button type="button" className="social-btn">
                <span className="icon">G</span> Sign in with Google
              </button>

              <button type="button" className="social-btn">
                <span className="icon"></span> Sign in with Apple
              </button>
            </div>

          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;