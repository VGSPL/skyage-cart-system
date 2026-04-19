import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../services/API";
import "./UpdateProfile.css";

export default function UpdateProfile() {

  const navigate = useNavigate();

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
    country: ""
  });

  useEffect(() => {

    async function loadProfile() {

      const data = await getProfile();

      setUser({
        fullName: data.user?.full_name,
        email: data.user?.email
      });

      setProfile({
        phone: data.phone || "",
        address1: data.address1 || "",
        address2: data.address2 || "",
        city: data.city || "",
        state: data.state || "",
        zip: data.zip || "",
        country: data.country || ""
      });

    }

    loadProfile();

  }, []);

  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateProfile(profile);

      alert("Profile updated successfully");

      navigate("/home");

    } catch (err) {

      console.error(err);
      alert("Update failed");

    }

  };

  return (

    <div className="profile-container">

      <h2 className="title">Update Your Profile Information</h2>

      <div className="profile-card">

        <form onSubmit={handleSubmit}>

          <h3>Your Information</h3>

          <label>Full Name</label>
          <input type="text" value={user.fullName} readOnly />

          <label>Email</label>
          <input type="email" value={user.email} readOnly />

          <h3>Profile Information</h3>

          <label>Phone</label>
          <input type="text" name="phone" value={profile.phone} onChange={handleChange} />

          <label>Address Line 1</label>
          <input type="text" name="address1" value={profile.address1} onChange={handleChange} />

          <label>Address Line 2</label>
          <input type="text" name="address2" value={profile.address2} onChange={handleChange} />

          <div className="row">

            <div>
              <label>City</label>
              <input type="text" name="city" value={profile.city} onChange={handleChange} />
            </div>

            <div>
              <label>State</label>
              <input type="text" name="state" value={profile.state} onChange={handleChange} />
            </div>

          </div>

          <div className="row">

            <div>
              <label>Zip Code</label>
              <input type="text" name="zip" value={profile.zip} onChange={handleChange} />
            </div>

            <div>
              <label>Country</label>
              <input type="text" name="country" value={profile.country} onChange={handleChange} />
            </div>

          </div>

          <button className="update-btn" type="submit">
            Update Profile
          </button>

          <button
            className="cancel-btn"
            type="button"
            onClick={() => navigate("/home")}
          >
            Cancel
          </button>

        </form>

      </div>

    </div>

  );
}







































