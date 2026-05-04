import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, getReferrals, getWalletBalance } from "../services/API";
import "./UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [showReferrals, setShowReferrals] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData);

        const walletData = await getWalletBalance();
        setWallet(walletData?.balance ?? 0);
      } catch (error) {
        console.error("Profile error:", error);
      }
    };

    fetchData();
  }, []);



  const checkReferrals = async () => {
    try {
      const data = await getReferrals();
      setReferrals(data || []);
      setShowReferrals(true);
    } catch (err) {
      console.error("Referral fetch error:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  if (!profile) return <p>Loading profile...</p>;

  const referralLink = `https://referral-link.com/${profile?.referral_code || ""}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  return (
    <div className="profile-container">
      <h2 className="title">User Profile</h2>

      <div className="profile-box">

        {/* 🔹 TOP SECTION */}
        <div className="profile-top">
          <img
            className="profile-img cursor-pointer"
            src={profile?.image || "/profile.png"}
            alt=""
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/profile.png";
            }}
            onClick={() => navigate("/profile-photo-update")}
          />

          {/* <h3 className="name">
            {profile?.unique_id || "User ID"}
          </h3> */}
          <h3 className="name">
            ID: {profile?.unique_id}
          </h3>

          <p
            className="email cursor-pointer"
            onClick={() => navigate("/update-profile")}
          >
            {/* {profile?.phone ? profile.phone : "Add phone number"} */}
            📞 {profile?.phone || "Add phone number"}
          </p>
        </div>

        {/* 🔹 CARDS */}
        <div className="cards">

          <Link to="/wallet" className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/2331/2331941.png" alt="" />
            <h4>Wallet Balance</h4>
            <p>₹ {Number(wallet).toFixed(2)}</p>
            <span>View transaction history</span>
          </Link>

          <Link to="/update-profile" className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" alt="" />
            <h4>Update Profile</h4>
            <span>Manage your personal information</span>
          </Link>

          <Link to="/billing" className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png" alt="" />
            <h4>Billing Information</h4>
            <span>Update payment details</span>
          </Link>

          <Link to="/shipping" className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png" alt="" />
            <h4>Shipping</h4>
            <span>Manage address</span>
          </Link>

          <Link to="/orders" className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/3081/3081840.png" alt="" />
            <h4>Orders</h4>
            <span>View your orders</span>
          </Link>

        </div>

        {/* 🔹 REFERRAL */}
        <div className="share">
          <h3>Share & Earn</h3>

          <div className="ref-box">
            <input value={referralLink} readOnly />
            <button onClick={copyLink}>Copy</button>
          </div>

          <div className="ref-box">
            <span>My Referrals</span>
            <button onClick={checkReferrals}>View</button>
          </div>

          {showReferrals && (
            <div className="referral-list">
              <h4>My Referrals ({referrals.length})</h4>

              {referrals.length === 0 ? (
                <p>No referrals yet</p>
              ) : (
                <ul>
                  {referrals.map((ref, index) => (
                    <li key={index}>
                      <strong>{ref.full_name}</strong><br />
                      {ref.email}<br />
                      <small>
                        Joined: {new Date(ref.date_joined).toLocaleDateString()}
                      </small>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* 🔹 LOGOUT */}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
};

export default UserProfile;










