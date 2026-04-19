import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/API";
import "./ProfilePhotoUpdate.css";

export default function ProfilePhotoUpdate() {

  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setImage(file);
      setPreview(URL.createObjectURL(file));

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateProfile({
        image: image
      });

      alert("Profile photo updated");

      navigate("/home");

    } catch (err) {

      console.error(err);
      alert("Upload failed");

    }

  };

  return (

    <div className="profile-update-page">

      <div className="profile-right-side">

        <h2 className="form-heading">
          Profile Picture Update
        </h2>

        <div className="profile-form-card">

          <form onSubmit={handleSubmit}>

            <div className="image-preview">

              <img
                src={preview || "/profile.png"}
                alt="profile"
              />

            </div>

            <label>Profile Picture:</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            <button className="update-btn">
              Update Photo
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

    </div>

  );

}


























