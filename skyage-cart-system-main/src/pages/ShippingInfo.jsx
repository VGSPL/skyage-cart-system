import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getShippingAddress,
  createShippingAddress,
  updateShippingAddress
} from "../services/API";
import "./ShippingInfo.css";

const emptyForm = {
  full_name: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipcode: "",
  country: ""
};

export default function ShippingInfo() {
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const loadAddress = async () => {
    try {
      setLoading(true);

      const data = await getShippingAddress();

      if (data) {
        setForm({
          full_name: data.full_name || "",
          phone: data.phone || "",
          address1: data.address1 || "",
          address2: data.address2 || "",
          city: data.city || "",
          state: data.state || "",
          zipcode: data.zipcode || "",
          country: data.country || ""
        });

        setIsEdit(true);
      }

    } catch (err) {
    
      setForm(emptyForm);
      setIsEdit(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddress();
  }, []);

 
  const handleSave = async () => {
    try {
      if (isEdit) {
        await updateShippingAddress(form);
      } else {
        await createShippingAddress(form);
        setIsEdit(true);
      }

      alert("Address saved successfully");
      loadAddress();

    } catch (err) {
      console.error(err);
      alert("Failed to save address");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="shipping-page">
      <h2>Shipping Address</h2>

      <input
        placeholder="Full Name"
        value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        placeholder="Address 1"
        value={form.address1}
        onChange={(e) => setForm({ ...form, address1: e.target.value })}
      />

      <input
        placeholder="Address 2"
        value={form.address2}
        onChange={(e) => setForm({ ...form, address2: e.target.value })}
      />

      <input
        placeholder="City"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
      />

      <input
        placeholder="State"
        value={form.state}
        onChange={(e) => setForm({ ...form, state: e.target.value })}
      />

      <input
        placeholder="Zipcode"
        value={form.zipcode}
        onChange={(e) => setForm({ ...form, zipcode: e.target.value })}
      />

      <input
        placeholder="Country"
        value={form.country}
        onChange={(e) => setForm({ ...form, country: e.target.value })}
      />

      <button onClick={handleSave}>
        {isEdit ? "Update Address" : "Save Address"}
      </button>

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}










