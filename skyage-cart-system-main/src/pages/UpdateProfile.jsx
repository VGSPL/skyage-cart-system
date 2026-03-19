import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

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
    localStorage.setItem("isLoggedIn", "true");
    // alert("Profile Updated Successfully");
    // navigate("/home");
    navigate("/home", { replace: true });

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

          <p className="note">
            This information was provided during registration and cannot be changed here.
          </p>

          <h3>Profile Information</h3>

          <label>Phone</label>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            onChange={handleChange}
          />

          <label>Address Line 1</label>
          <input
            type="text"
            placeholder="Address 1"
            name="address1"
            onChange={handleChange}
          />

          <label>Address Line 2</label>
          <input
            type="text"
            placeholder="Address 2"
            name="address2"
            onChange={handleChange}
          />

          <div className="row">

            <div>
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                name="city"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>State</label>
              <input
                type="text"
                placeholder="State"
                name="state"
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
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Country</label>
              <input
                type="text"
                placeholder="Country"
                name="country"
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

      </div>
    </div>
  );
}











