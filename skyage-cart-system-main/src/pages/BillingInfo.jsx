import React, { useState, useEffect } from "react";
import "./BillingInfo.css";
import { Link } from "react-router-dom";
import { createBankDetails, getBankDetails } from "../services/API";

const BillingInfo = () => {
  const [showForm, setShowForm] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    account: "",
    ifsc: "",
    email: "",
    phone: "",
    type: "Customer",
  });

  
  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const data = await getBankDetails();

        if (data) {
          setFormData({
            name: data.account_holder_name || "",
            account: data.account_number || "",
            ifsc: data.ifsc_code || "",
            email: data.email || "",
            phone: data.phone_number || "",
            type: data.contact_type || "Customer",
          });

          setShowForm(false);
        }
      } catch (err) {
        console.log("No bank details found");
        setShowForm(true);
      }
    };

    fetchBankDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      account_holder_name: formData.name,
      account_number: formData.account,
      ifsc_code: formData.ifsc,
      email: formData.email,
      phone_number: formData.phone,
      contact_type: formData.type,
    };

    try {
      await createBankDetails(payload);

      alert("Bank Details Saved Successfully");

      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save bank details");
    }
  };

  return (
    <div className="bank-page">
      <h2 className="title">Bank Details</h2>

      <div className="form-box">
        {showForm ? (
          <>
            <h3>Enter Your Bank Details</h3>

            <form onSubmit={handleSubmit}>
              <label>Account Holder Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <label>Account Number:</label>
              <input
                type="text"
                name="account"
                value={formData.account}
                onChange={handleChange}
              />

              <label>IFSC Code:</label>
              <input
                type="text"
                name="ifsc"
                value={formData.ifsc}
                onChange={handleChange}
              />

              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <label>Phone Number:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <label>Contact Type:</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Customer">Customer</option>
                <option value="Vendor">Vendor</option>
                <option value="Supplier">Supplier</option>
              </select>

              <button type="submit" className="submit-btn">
                Submit Bank Details
              </button>
            </form>
          </>
        ) : (
          <div className="saved-info">
            <h3>Your Bank Details</h3>

            <p><b>Name:</b> {formData.name}</p>
            <p><b>Account Number:</b> {formData.account}</p>
            <p><b>IFSC Code:</b> {formData.ifsc}</p>
            <p><b>Email:</b> {formData.email}</p>
            <p><b>Phone:</b> {formData.phone}</p>
            <p><b>Contact Type:</b> {formData.type}</p>

            <button
              className="submit-btn"
              onClick={() => setShowForm(true)}
            >
              Update
            </button>
          </div>
        )}
      </div>

      <Link to="/profile" className="back-link">
        ← Back to Profile
      </Link>
    </div>
  );
};

export default BillingInfo;