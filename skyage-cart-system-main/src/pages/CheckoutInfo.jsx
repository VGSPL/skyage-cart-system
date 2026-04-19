import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getShippingAddress, createShippingAddress } from "../services/API";

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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadAddress();
  }, []);

  const loadAddress = async () => {
    try {
      const res = await getShippingAddress();
      if (res?.data) {
        setFormData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

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

    if (!formData.phone) newErrors.phone = "Phone number is required";

    if (!formData.email) newErrors.email = "Email is required";

    if (!formData.address) newErrors.address = "Address is required";

    if (!formData.city) newErrors.city = "City is required";

    if (!formData.state) newErrors.state = "State is required";

    if (!formData.pincode) newErrors.pincode = "Pincode is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {

    if (!validateForm()) return;

    try {

      await createShippingAddress(formData);

      navigate("/checkout/payment");

    } catch (err) {

      console.log(err);

    }
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

          <input name="fullName" placeholder="Full Name" className="input" value={formData.fullName} onChange={handleChange} />

          <input name="phone" placeholder="Phone" className="input" value={formData.phone} onChange={handleChange} />

          <input name="email" placeholder="Email" className="input" value={formData.email} onChange={handleChange} />

        </div>

        <div className="mt-4">

          <input name="address" placeholder="Address" className="input" value={formData.address} onChange={handleChange} />

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">

          <input name="city" placeholder="City" className="input" value={formData.city} onChange={handleChange} />

          <input name="state" placeholder="State" className="input" value={formData.state} onChange={handleChange} />

          <input name="pincode" placeholder="Pincode" className="input" value={formData.pincode} onChange={handleChange} />

        </div>

        <button
          onClick={handleContinue}
          className="mt-6 bg-[#147E9E] text-white px-4 py-2 rounded"
        >
          Continue to Payment →
        </button>

      </div>
    </div>
  );
}