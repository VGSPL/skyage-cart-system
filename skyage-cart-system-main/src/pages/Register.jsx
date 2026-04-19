import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from "../services/API";
import './Register.css';
import registerIllustration from '../assets/13916413_2009.i211.040..bag with cosmetics realistic.jpg';
import logo from '../assets/Logo 1.png';

const Register = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirm_password: '',
    pan_number: '',
    referral_code: ''   
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError('');
    setLoading(true);

    const nameParts = formData.fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'User';

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

    try {

      await registerUser({
        email: formData.email,
        first_name: firstName,
        last_name: lastName,
        password: formData.password,
        confirm_password: formData.confirm_password,
        unique_id: formData.pan_number,
        referral_code: formData.referral_code  
      });

      setLoading(false);

      navigate("/login");

    } catch (err) {

      setError(err.message || "Registration failed");
      setLoading(false);

    }

  };

  return (
    <div className="auth-wrapper">

      <div className="auth-illustration">
        <div className="illustration-content">
          <img
            src={registerIllustration}
            alt="Register Visual"
            className="illustration-image"
          />
        </div>
      </div>

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
                name="fullName"
                value={formData.fullName}
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
              <label>Referral Code (Optional)</label>
              <input
                type="text"
                name="referral_code"
                value={formData.referral_code}
                onChange={handleChange}
                placeholder="Enter referral code (optional)"
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
              {loading ? 'Creating...' : 'Create an account'} →
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







