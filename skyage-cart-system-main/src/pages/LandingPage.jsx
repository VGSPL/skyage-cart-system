import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const logo = '/Trustora.png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <div className="landing-content">

        <div className="landing-hero">
          <div className="hero-image-container">

            <img src="/collection-small-perfume-bottles.jpg" alt="Products Collection" className="hero-image" />

          </div>

          <div className="hero-overlay-shape"></div>
        </div>

        {/* Right Side - Content */}
        <div className="landing-info">
          <div className="brand-header">
            <img src={logo} alt="Trustora Logo" className="brand-logo" />
            <span className="brand-name">Trustora</span>
          </div>

          <div className="hero-text">
            <h1 className="main-title">
              Committed<br />
              to Sales.<br />
              Dedicated to<br />
              Service.
            </h1>
          </div>

          <div className="cta-group">
            <div className="slider-indicator">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate('/register')}
            >
              Create an account
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate('/login')}
            >
              Existing user <span className="arrow">→</span>
            </button>

            <p className="terms-text">T&C Apply*</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
