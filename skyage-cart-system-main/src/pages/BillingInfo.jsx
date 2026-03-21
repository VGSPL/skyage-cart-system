import React, { useState } from "react";
import "./BillingInfo.css";
import { Link } from "react-router-dom";

const BillingInfo = () => {

    const [formData, setFormData] = useState({
        name: "",
        account: "",
        ifsc: "",
        email: "",
        phone: "",
        type: "Customer"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Bank Details Submitted Successfully");
    };

    return (

        <div className="bank-page">

            <h2 className="title">Bank Details</h2>

            <div className="form-box">

                <h3>Enter Your Bank Details</h3>

                <form onSubmit={handleSubmit}>

                    <label>Account Holder Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter account holder name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <label>Account Number:</label>
                    <input
                        type="text"
                        name="account"
                        placeholder="Enter account number"
                        value={formData.account}
                        onChange={handleChange}
                    />

                    <label>IFSC Code:</label>
                    <input
                        type="text"
                        name="ifsc"
                        placeholder="Enter IFSC code"
                        value={formData.ifsc}
                        onChange={handleChange}
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <label>Contact Type:</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option>Customer</option>
                        <option>Vendor</option>
                        <option>Supplier</option>
                    </select>

                    <button type="submit" className="submit-btn">
                        Submit Bank Details
                    </button>

                </form>

            </div>

            <Link to="/profile" className="back-link">
                ← Back to Profile
            </Link>

        </div>

    );
};

export default BillingInfo;