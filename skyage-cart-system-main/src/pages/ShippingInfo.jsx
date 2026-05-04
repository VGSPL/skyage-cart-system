import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getShippingAddress,
  createShippingAddress,
  updateShippingAddress
} from "../services/API";
import './ShippingInfo.css';

export default function ShippingInfo() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [existingAddress, setExistingAddress] = useState(null);

  const [newAddress, setNewAddress] = useState({
    label: "",
    fullAddress: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const data = await getShippingAddress();

      if (data) {
        setExistingAddress(data);

       
        setAddresses([
          {
            id: data.id,
            label: data.full_name,
            fullAddress: data.address1,
            phone: data.phone
          }
        ]);
      }
    } catch (err) {
      console.log("No address:", err.message);
    }
  };

  
  const handleAddAddress = async () => {
    const newErrors = {};

    if (!newAddress.fullAddress) newErrors.fullAddress = "Address required";
    if (!newAddress.phone) newErrors.phone = "Phone required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      
      const payload = {
        full_name: newAddress.label || "User",
        email: "test@gmail.com",
        phone: newAddress.phone,

        address1: newAddress.fullAddress,
        address2: "",

        city: "Pune",
        state: "MH",
        zipcode: "411001",
        country: "India"
      };

      if (existingAddress) {
        await updateShippingAddress(payload);
      } else {
        await createShippingAddress(payload);
      }

      alert(" Address saved!");

     
      fetchAddress();

      
      setNewAddress({ label: "", fullAddress: "", phone: "" });
      setErrors({});

    } catch (err) {
      console.error("Save error:", err);
      alert(" Failed to save address");
    }
  };

  return (
    <div className="shipping-page">
      <div className="shipping-container">
        <h2>Shipping Addresses</h2>
        <p>Add and manage your delivery addresses</p>

        <div className="form-card">

          {/* Label */}
          <input
            type="text"
            placeholder="Label (Home, Work…)"
            value={newAddress.label}
            onChange={e => setNewAddress({ ...newAddress, label: e.target.value })}
          />

          {/* Address */}
          <input
            type="text"
            placeholder="Full Address"
            value={newAddress.fullAddress}
            onChange={e => setNewAddress({ ...newAddress, fullAddress: e.target.value })}
          />
          {errors.fullAddress && <div className="input-error">{errors.fullAddress}</div>}

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone Number"
            value={newAddress.phone}
            onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
          />
          {errors.phone && <div className="input-error">{errors.phone}</div>}

          <div className="form-buttons">
            <button className="btn add" onClick={handleAddAddress}>
              Add Address
            </button>

            <button className="btn cancel" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>

        </div>

       
        {addresses.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>Saved Address</h3>

            {addresses.map(addr => (
              <div key={addr.id} className="form-card">
                <p><b>{addr.label}</b></p>
                <p>{addr.fullAddress}</p>
                <p>{addr.phone}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}