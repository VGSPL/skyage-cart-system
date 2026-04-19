import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../services/API";
import "./UserProfile.css";

const UserProfile = () => {

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  
  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const data = await getProfile();

        setProfile(data);

      } catch (error) {

        console.error("Profile fetch error:", error);

      }

    };

    fetchProfile();

  }, []);

  if (!profile) return <p>Loading profile...</p>;

  const referralLink = `https://referral-link.com/${profile.referral_code}`;

  
  const copyLink = () => {

    navigator.clipboard.writeText(referralLink);

    alert("Referral link copied!");

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
            src={profile.image || "/profile.png"}
            alt="profile"
            onClick={() => navigate("/profile-photo-update")}
          />

          <h3 className="name">{profile.unique_id}</h3>

          <p className="email">{profile.phone || "Phone not added"}</p>

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



















































