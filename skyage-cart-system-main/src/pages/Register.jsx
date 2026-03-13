import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import registerIllustration from '../assets/13916413_2009.i211.040..bag with cosmetics realistic.jpg';
import logo from '../assets/Logo 1.png';

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    pan_number: '',
    referral_code: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {

    const isAuth = localStorage.getItem("isLoggedIn");

    if (isAuth) {
      navigate("/dashboard");
    }

  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    setError('');
    setLoading(true);

    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    if (!formData.pan_number) {
      setError('PAN Number is required');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const userData = {
      email: formData.email,
      first_name: firstName,
      last_name: lastName || 'User',
      password: formData.password,
      pan_number: formData.pan_number,
      referral_code: formData.referral_code
    };


    localStorage.setItem("user", JSON.stringify(userData));

    setLoading(false);


    navigate('/login');
  };

  return (
    <div className="auth-wrapper">

      {/* Left Side Illustration */}
      <div className="auth-illustration">
        <div className="illustration-content">
          <img
            src={registerIllustration}
            alt="Register Visual"
            className="illustration-image"
          />
        </div>
      </div>

      {/* Right Side Form */}
      <div className="auth-form-container">
        <div className="auth-form-content">

          <div className="auth-header">
            <img src={logo} alt="Logo" className="auth-logo" />
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
              {loading ? 'Creating...' : 'Create an account'} <span className="arrow">→</span>
            </button>

          </form>

          <div className="auth-footer">
            Already have an account? <a href="/login">Sign in</a>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Register;


















