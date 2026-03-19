import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './ShippingInfo.css';

export default function ShippingInfo() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ label: "", fullAddress: "", phone: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const handleAddAddress = () => {
    const newErrors = {};

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setAddresses([...addresses, { id: Date.now(), ...newAddress }]);
    setNewAddress({ label: "", fullAddress: "", phone: "" });
    setErrors({});
  };

  return (
    <div className="shipping-page">
      <div className="shipping-container">
        <h2>Shipping Addresses</h2>
        <p>Add and manage your delivery addresses</p>

        <div className="form-card">
          {/* Label input */}
          <input
            type="text"
            placeholder="Label (Home, Work…)"
            value={newAddress.label}
            onChange={e => setNewAddress({ ...newAddress, label: e.target.value })}
          />


          {/* Address input */}
          <input
            type="text"
            placeholder="Full Address"
            value={newAddress.fullAddress}
            onChange={e => setNewAddress({ ...newAddress, fullAddress: e.target.value })}
          />
          {errors.fullAddress && <div className="input-error">{errors.fullAddress}</div>}

          {/* Phone input */}
          <input
            type="text"
            placeholder="Phone Number"
            value={newAddress.phone}
            onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
          />
          {errors.phone && <div className="input-error">{errors.phone}</div>}

          <div className="form-buttons">
            <button className="btn add" onClick={handleAddAddress}>Add Address</button>
            <button className="btn cancel" onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>

      </div>
    </div>
  );
}











