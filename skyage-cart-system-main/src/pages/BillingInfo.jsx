import React, { useState, useEffect } from "react";
import "./BillingInfo.css";
import { Link } from "react-router-dom";

const BillingInfo = () => {

    const [showForm, setShowForm] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        account: "",
        ifsc: "",
        email: "",
        phone: "",
        type: "Customer"
    });


    useEffect(() => {

        const savedData = localStorage.getItem("bankDetails");

        if (savedData) {
            setFormData(JSON.parse(savedData));
            setShowForm(false);
        }

    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem("bankDetails", JSON.stringify(formData));

        alert("Bank Details Submitted Successfully");

        setShowForm(false);
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