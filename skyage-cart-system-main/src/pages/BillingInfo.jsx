// import React, { useState, useEffect } from "react";
// import "./BillingInfo.css";
// import { useNavigate } from "react-router-dom";

// export default function BillingInfo() {
//   const navigate = useNavigate();

//   const [billing, setBilling] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address1: "",
//     address2: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     paymentMethod: "",
//   });

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("user")) || {};
//     setBilling({
//       ...billing,
//       fullName: stored.fullName || "",
//       email: stored.email || "",
//       phone: stored.phone || "",
//       address1: stored.address1 || "",
//       address2: stored.address2 || "",
//       city: stored.city || "",
//       state: stored.state || "",
//       zip: stored.zip || "",
//       country: stored.country || "",
//       paymentMethod: stored.paymentMethod || "",
//     });
//   }, []);

//   const handleChange = (e) => {
//     setBilling({ ...billing, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     localStorage.setItem("user", JSON.stringify(billing));
//     alert("Billing Information Updated Successfully!");
//     navigate("/checkout/info");
//   };

//   return (
//     <div className="billing-container">
//       <h2>Billing Information</h2>
//       <form onSubmit={handleSubmit} className="billing-form">
//         <div className="row">
//           <div className="input-group">
//             <label>Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               value={billing.fullName}
//               readOnly
//             />
//           </div>
//           <div className="input-group">
//             <label>Email</label>
//             <input type="email" name="email" value={billing.email} readOnly />
//           </div>
//         </div>

//         <div className="input-group">
//           <label>Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={billing.phone}
//             onChange={handleChange}
//             placeholder="Enter your phone number"
//           />
//         </div>

//         <div className="input-group">
//           <label>Address Line 1</label>
//           <input
//             type="text"
//             name="address1"
//             value={billing.address1}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="input-group">
//           <label>Address Line 2</label>
//           <input
//             type="text"
//             name="address2"
//             value={billing.address2}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="row">
//           <div className="input-group">
//             <label>City</label>
//             <input type="text" name="city" value={billing.city} onChange={handleChange} />
//           </div>
//           <div className="input-group">
//             <label>State</label>
//             <input type="text" name="state" value={billing.state} onChange={handleChange} />
//           </div>
//         </div>

//         <div className="row">
//           <div className="input-group">
//             <label>Zip Code</label>
//             <input type="text" name="zip" value={billing.zip} onChange={handleChange} />
//           </div>
//           <div className="input-group">
//             <label>Country</label>
//             <input type="text" name="country" value={billing.country} onChange={handleChange} />
//           </div>
//         </div>

//         <div className="input-group">
//           <label>Payment Method</label>
//           <select name="paymentMethod" value={billing.paymentMethod} onChange={handleChange}>
//             <option value="">Select Payment Method</option>
//             <option value="card">Credit/Debit Card</option>
//             <option value="upi">UPI</option>
//             <option value="cod">Cash on Delivery</option>
//           </select>
//         </div>

//         <div className="button-row">
//           <button type="submit" className="btn update">Update Billing Info</button>
//           <button type="button" className="btn cancel" onClick={() => navigate("/home")}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }











// import React, { useState } from "react";
// import "./BillingInfo.css";
// import { Link } from "react-router-dom";

// const BillingInfo = () => {

// const [formData, setFormData] = useState({
// name: "",
// account: "",
// ifsc: "",
// email: "",
// phone: "",
// type: "Customer"
// });

// const handleChange = (e) => {
// setFormData({
// ...formData,
// [e.target.name]: e.target.value
// });
// };

// const handleSubmit = (e) => {
// e.preventDefault();
// console.log(formData);
// alert("Bank Details Submitted");
// };

// return (

// <div className="bank-page">

// <h2 className="title">Bank Details</h2>

// <div className="form-box">

// <h3>Enter Your Bank Details</h3>

// <form onSubmit={handleSubmit}>

// <label>Account Holder Name:</label>
// <input
// type="text"
// name="name"
// placeholder="Enter account holder name"
// value={formData.name}
// onChange={handleChange}
// />

// <label>Account Number:</label>
// <input
// type="text"
// name="account"
// placeholder="Enter account number"
// value={formData.account}
// onChange={handleChange}
// />

// <label>IFSC Code:</label>
// <input
// type="text"
// name="ifsc"
// placeholder="Enter IFSC code"
// value={formData.ifsc}
// onChange={handleChange}
// />

// <label>Email:</label>
// <input
// type="email"
// name="email"
// placeholder="Enter email address"
// value={formData.email}
// onChange={handleChange}
// />

// <label>Phone Number:</label>
// <input
// type="text"
// name="phone"
// placeholder="Enter phone number"
// value={formData.phone}
// onChange={handleChange}
// />

// <label>Contact Type:</label>
// <select
// name="type"
// value={formData.type}
// onChange={handleChange}
// >
// <option>Customer</option>
// <option>Vendor</option>
// <option>Supplier</option>
// </select>

// <button type="submit" className="submit-btn">
// Submit Bank Details
// </button>

// </form>

// </div>

// <Link to="/profile" className="back-link">
// ← Back to Profile
// </Link>

// </div>

// );
// };

// export default BillingInfo;


















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