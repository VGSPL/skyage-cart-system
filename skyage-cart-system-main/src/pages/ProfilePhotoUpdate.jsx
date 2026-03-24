import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePhotoUpdate.css";

export default function ProfilePhotoUpdate() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [firstName, setFirstName] = useState(storedUser.firstName || "");
  const [lastName, setLastName] = useState(storedUser.lastName || "");
  const [email] = useState(storedUser.email || "");
  const [uniqueid] = useState(storedUser.uniqueid || "");
  const [image, setImage] = useState(storedUser.image || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { firstName, lastName, email, uniqueid, image };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile Updated Successfully");
  };

  return (
    <div className="profile-update-page">

      <div className="profile-right-side">


        <h2 className="form-heading">
          Profile Picture / Name Update
        </h2>
        <div className="profile-form-card">


          <form onSubmit={handleSubmit}>

            <div className="image-preview">
              <img
                src={image || "/profile.png"}
                alt="profile"
              />
            </div>

            <label>First name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label>Last name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label>Email:</label>
            <input type="email" value={email} disabled />

            <label>Uniqueid:</label>
            <input type="text" value={uniqueid} disabled />

            <label>Profile Picture:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />

            <button className="update-btn">Update Details</button>
            <button type="button" className="password-btn">Update Password</button>

            <button
              className="cancel-btn"
              type="button"
              onClick={() => navigate("/update-profile")}
            >
              Cancel
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}























