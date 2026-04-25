import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getShippingAddress,
  createShippingAddress,
  updateShippingAddress
} from "../services/API";
import "./ShippingInfo.css";

export default function ShippingInfo() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    label: "",
    fullAddress: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const data = await getShippingAddress();
      if (data) {
        setAddress(data);
      }
    } catch (err) {
      console.log("No existing address or error:", err.message);
    }
  };

  
  const validate = () => {
    const newErrors = {};

    if (!address.label) newErrors.label = "Label required";
    if (!address.fullAddress) newErrors.fullAddress = "Address required";
    if (!address.phone) newErrors.phone = "Phone required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSave = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const existing = await getShippingAddress();

      if (existing) {
        await updateShippingAddress(address);
      } else {
        await createShippingAddress(address);
      }

      alert("Address saved successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to save address");
    }

    setLoading(false);
  };

  return (
    <div className="shipping-page">
      <div className="shipping-container">
        <h2>Shipping Address</h2>
        <p>Add or update your delivery address</p>

        <div className="form-card">

          {/* Label */}
          <input
            type="text"
            placeholder="Label (Home, Work...)"
            value={address.label}
            onChange={(e) =>
              setAddress({ ...address, label: e.target.value })
            }
          />
          {errors.label && <div className="input-error">{errors.label}</div>}

          {/* Full Address */}
          <input
            type="text"
            placeholder="Full Address"
            value={address.fullAddress}
            onChange={(e) =>
              setAddress({ ...address, fullAddress: e.target.value })
            }
          />
          {errors.fullAddress && (
            <div className="input-error">{errors.fullAddress}</div>
          )}

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone Number"
            value={address.phone}
            onChange={(e) =>
              setAddress({ ...address, phone: e.target.value })
            }
          />
          {errors.phone && <div className="input-error">{errors.phone}</div>}

          <div className="form-buttons">
            <button
              className="btn add"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Address"}
            </button>

            <button className="btn cancel" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}





