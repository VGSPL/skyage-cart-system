import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile, getUser } from "../services/API";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
  });

  const [profile, setProfile] = useState({
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const profileData = await getProfile();
         
        const userData = await getUser();

        setUser({
          fullName: `${userData.first_name || ""} ${userData.last_name || ""}`,
          email: userData.email || "",
        });

        setProfile({
          phone: profileData.phone || "",
          address1: profileData.address1 || "",
          address2: profileData.address2 || "",
          city: profileData.city || "",
          state: profileData.state || "",
          zip: profileData.zipcode || "",
          country: profileData.country || "",
        });

      } catch (err) {
        console.error("Profile load error:", err);
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile.phone) {
      alert("Phone is required");
      return;
    }

    try {
      await updateProfile({
        phone: profile.phone,
        address1: profile.address1,
        address2: profile.address2,
        city: profile.city,
        state: profile.state,
        zipcode: profile.zip,
        country: profile.country,
      });

      alert("Profile updated successfully");
      navigate("/profile");

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2 className="title">Update Profile</h2>

      <div className="profile-card">
        <form onSubmit={handleSubmit}>

          <h3>User Info</h3>

          <label>Full Name</label>
          <input type="text" value={user.fullName} readOnly />

          <label>Email</label>
          <input type="email" value={user.email} readOnly />

          <h3>Profile Info</h3>

          <label>Phone</label>
          <input name="phone" value={profile.phone} onChange={handleChange} />

          <label>Address 1</label>
          <input name="address1" value={profile.address1} onChange={handleChange} />

          <label>Address 2</label>
          <input name="address2" value={profile.address2} onChange={handleChange} />

          <div className="row">
            <input name="city" placeholder="City" value={profile.city} onChange={handleChange} />
            <input name="state" placeholder="State" value={profile.state} onChange={handleChange} />
          </div>

          <div className="row">
            <input name="zip" placeholder="Zip Code" value={profile.zip} onChange={handleChange} />
            <input name="country" placeholder="Country" value={profile.country} onChange={handleChange} />
          </div>

          <button className="update-btn">Update</button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>

        </form>
      </div>
    </div>
  );
}






































