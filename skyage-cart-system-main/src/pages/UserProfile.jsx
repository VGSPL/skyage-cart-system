import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Full Name",
    email: "abc@gmail.com"
  };

  const referralLink = "https://referral-link.com/user123";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  const checkReferrals = () => {
    alert("Showing your referrals");
  };

  const goToMarketplace = () => {
    navigate("/products");
  };

  return (

    <div className="profile-container">

      <h2 className="title">User Profile</h2>

      <div className="profile-box">

        <div className="profile-top">
          <img
            className="profile-img cursor-pointer"
            src={user.profileImage || "/profile.png"}
            alt="profile"
            onClick={() => navigate("/update-profile")}
          />
          <h3 className="name">{user.fullName}</h3>
          <p className="email">{user.email}</p>

        </div>

        <div className="cards">

          <Link to="/wallet" className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/2331/2331941.png" alt="wallet" />
            <h4>Wallet Balance</h4>
            <p>80.00</p>
            <span>View transaction history</span>
          </Link>

          <Link to="/update-profile" className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" alt="update" />
            <h4>Update Profile</h4>
            <span>Manage your personal information</span>
          </Link>

          <Link to="/billing" className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png" alt="billing" />
            <h4>Billing Information</h4>
            <span>Update payment details</span>
          </Link>

          <Link to="/shipping" className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png" alt="shipping" />
            <h4>Shipping Information</h4>
            <span>Manage delivery address</span>
          </Link>

          <Link to="/orders" className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/3081/3081840.png" alt="orders" />
            <h4>Order History</h4>
            <span>View your past orders</span>
          </Link>

        </div>

        <div className="share">

          <h3>Share & Earn</h3>

          <p>Invite friends with your referral link</p>

          <div className="ref-box">

            <input value={referralLink} readOnly />

            <button onClick={copyLink}>Copy</button>

          </div>

          <div className="ref-box">

            <span>🎉 View My Referrals (Track your referral preference)</span>

            <button onClick={checkReferrals}>Check</button>

          </div>

        </div>

      </div>

      <div className="bottom">

        <p>FIND THE NEXT SUPPLIER/BUYER</p>

        <button onClick={goToMarketplace}>GET STARTED NOW</button>

      </div>

    </div>

  );

};

export default UserProfile;







