import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./UpdateProfile.css";

export default function UpdateProfile() {

  const navigate = useNavigate();
  const location = useLocation();

  const [editMode, setEditMode] = useState(false);

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

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const savedProfile = JSON.parse(localStorage.getItem("profileInfo"));

    if (storedUser) {
      setUser(storedUser);
    }

    if (savedProfile) {
      setProfile(savedProfile);
    }

    if (location.state?.fromWelcome) {
      setEditMode(true);
    }

  }, [location]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...user,
      ...profile
    };

    localStorage.setItem("user", JSON.stringify(updatedData));
    localStorage.setItem("profileInfo", JSON.stringify(profile));

    alert("Profile updated successfully");

    setEditMode(false);
  };

  return (

    <div className="profile-container">

      <h2 className="title">Update Your Profile Information</h2>

      <div className="profile-card">

        {!editMode ? (

          <div className="profile-view">

            <h3>Your Information</h3>

            <p><b>Full Name:</b> {user.fullName}</p>
            <p><b>Email:</b> {user.email}</p>

            <h3>Profile Information</h3>

            <p><b>Phone:</b> {profile.phone}</p>
            <p><b>Address 1:</b> {profile.address1}</p>
            <p><b>Address 2:</b> {profile.address2}</p>
            <p><b>City:</b> {profile.city}</p>
            <p><b>State:</b> {profile.state}</p>
            <p><b>Zip:</b> {profile.zip}</p>
            <p><b>Country:</b> {profile.country}</p>

            <button
              className="update-btn"
              onClick={() => setEditMode(true)}
            >
              Update
            </button>

            <button
              className="cancel-btn"
              onClick={() => navigate("/home")}
            >
              ← Back to Profile
            </button>

          </div>

        ) : (

          <form onSubmit={handleSubmit}>

            <h3>Your Information</h3>

            <label>Full Name</label>
            <input type="text" value={user.fullName} readOnly />

            <label>Email</label>
            <input type="email" value={user.email} readOnly />

            <p className="note">
              This information was provided during registration and cannot be changed here.
            </p>

            <h3>Profile Information</h3>

            <label>Phone</label>
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />

            <label>Address Line 1</label>
            <input
              type="text"
              placeholder="Address 1"
              name="address1"
              value={profile.address1}
              onChange={handleChange}
            />

            <label>Address Line 2</label>
            <input
              type="text"
              placeholder="Address 2"
              name="address2"
              value={profile.address2}
              onChange={handleChange}
            />

            <div className="row">

              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>State</label>
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="row">

              <div>
                <label>Zip Code</label>
                <input
                  type="text"
                  placeholder="Zip Code"
                  name="zip"
                  value={profile.zip}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={profile.country}
                  onChange={handleChange}
                />
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

        )}

      </div>

    </div>
  );
}















