import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createShippingAddress,
  updateShippingAddress,
  getShippingAddress
} from "../services/API";

export default function CheckoutInfo() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    address1: "",
    city: "",
    state: "",
    zipcode: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

 
  const validate = () => {
    if (!form.full_name) return "Enter name";
    if (!form.phone) return "Enter phone";
    if (!form.email || !form.email.includes("@")) return "Valid email required";
    if (!form.address1) return "Enter address";
    if (!form.city) return "Enter city";
    if (!form.state) return "Enter state";
    if (!form.zipcode) return "Enter pincode";
    return null;
  };

  
  const handleContinue = async () => {

    const errMsg = validate();
    if (errMsg) {
      setError(errMsg);
      return;
    }

    setLoading(true);
    setError("");

    try {

      const payload = {
        full_name: form.full_name,
        phone: form.phone,
        email: form.email,
        address1: form.address1,
        address2: "",
        city: form.city,
        state: form.state,
        zipcode: form.zipcode,
        country: "India"
      };

      console.log(" FINAL SHIPPING PAYLOAD:", payload);

      const existing = await getShippingAddress();

      if (existing) {
        await updateShippingAddress(payload);
      } else {
        await createShippingAddress(payload);
      }

     
      navigate("/checkout/payment");

    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save shipping address");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F3EED9] py-16 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-6">

        <h2 className="text-2xl font-semibold text-gray-800">
          Customer Information
        </h2>

        <p className="text-gray-500 mb-8">
          Enter your delivery details
        </p>

        {error && (
          <div className="bg-red-200 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Name + Phone + Email */}
        <div className="grid md:grid-cols-3 gap-6">

          <input
            name="full_name"
            type="text"
            placeholder="Enter name"
            className="input"
            value={form.full_name}
            onChange={handleChange}
          />

          <input
            name="phone"
            type="text"
            placeholder="Enter phone"
            className="input"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            name="email"
            type="text"
            placeholder="Enter email"
            className="input"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div className="mt-8">
          <input
            name="address1"
            type="text"
            placeholder="Enter address"
            className="input w-full"
            value={form.address1}
            onChange={handleChange}
          />
        </div>

        {/* City State Pincode */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">

          <input
            name="city"
            type="text"
            placeholder="Enter city"
            className="input"
            value={form.city}
            onChange={handleChange}
          />

          <select
            name="state"
            className="input"
            value={form.state}
            onChange={handleChange}
          >
            <option value="">Select state</option>
            <option value="Maharashtra">Maharashtra</option>
          </select>

          <input
            name="zipcode"
            type="text"
            placeholder="Enter pincode"
            className="input"
            value={form.zipcode}
            onChange={handleChange}
          />
        </div>

        {/* Button */}
        <div className="mt-8">
          <button
            onClick={handleContinue}
            disabled={loading}
            className="bg-[#147E9E] text-white px-4 py-2 rounded hover:bg-[#10657d] transition duration-300"
          >
            {loading ? "Saving..." : "Continue to Payment →"}
          </button>
        </div>

      </div>
    </div>
  );
}


