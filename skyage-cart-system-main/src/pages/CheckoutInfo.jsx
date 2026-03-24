import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CheckoutInfo() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [saveInfo, setSaveInfo] = useState(false);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const savedData = localStorage.getItem("customerInfo");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const validateForm = () => {

    let newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.email) newErrors.email = "Email is required";

    if (!formData.address) newErrors.address = "Address is required";

    if (!formData.city) newErrors.city = "City is required";

    if (!formData.state) newErrors.state = "State is required";

    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleContinue = () => {

    if (!validateForm()) return;


    localStorage.setItem("customerInfo", JSON.stringify(formData));

    navigate("/checkout/payment");
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

        <div className="grid md:grid-cols-3 gap-4">

          <div>
            <label className="label">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              className="input "
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="label">Mobile Number</label>
            <input
              type="text"
              name="phone"
              placeholder="+91"
              className="input"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="label">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              className="input"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.email}</p>
            )}
          </div>

        </div>

        <div className="mt-8">
          <label className="label">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Apartment, Street, Landmark (optional)"
            className="input"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <p style={{ color: "red", fontSize: "12px" }}>{errors.address}</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">

          <div>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              className="input"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.city}</p>
            )}
          </div>

          <div>
            <select
              name="state"
              className="input"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select state</option>
              <option>Maharashtra</option>
              <option>Gujarat</option>
              <option>Karnataka</option>
            </select>
            {errors.state && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.state}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="pincode"
              placeholder="Enter pincode"
              className="input "
              value={formData.pincode}
              onChange={handleChange}
            />
            {errors.pincode && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.pincode}</p>
            )}
          </div>

        </div>

        <div className="mt-6 flex items-center gap-2">
          <input
            type="checkbox"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
          />
          <label className="text-gray-600 text-sm">
            Save this information for future orders
          </label>
        </div>

        <div className="mt-8">
          <button
            onClick={handleContinue}
            className="bg-[#147E9E] text-white px-4 py-2 rounded hover:bg-[#10657d] transition duration-300"
          >
            Continue to Payment →
          </button>
        </div>

      </div>
    </div>
  );
}


