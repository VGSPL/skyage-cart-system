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

  useEffect(() => {
    loadAddress();
  }, []);

  const loadAddress = async () => {
    try {

      const res = await getShippingAddress();

      if (res?.data) {
        setFormData(res.data);
        localStorage.setItem("customerInfo", JSON.stringify(res.data));
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

  };

  const handleContinue = async () => {

    try {

      await createShippingAddress(formData);

      localStorage.setItem(
        "customerInfo",
        JSON.stringify(formData)
      );

      navigate("/checkout/payment");

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="min-h-screen bg-[#F3EED9] py-16 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Customer Information
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input name="fullName" placeholder="Full Name" className="border p-2" value={formData.fullName} onChange={handleChange} />

          <input name="phone" placeholder="Phone" className="border p-2" value={formData.phone} onChange={handleChange} />

          <input name="email" placeholder="Email" className="border p-2" value={formData.email} onChange={handleChange} />

        </div>

        <input name="address" placeholder="Address" className="border p-2 mt-4 w-full" value={formData.address} onChange={handleChange} />

        <div className="grid md:grid-cols-3 gap-4 mt-4">

          <input name="city" placeholder="City" className="border p-2" value={formData.city} onChange={handleChange} />

          <input name="state" placeholder="State" className="border p-2" value={formData.state} onChange={handleChange} />

          <input name="pincode" placeholder="Pincode" className="border p-2" value={formData.pincode} onChange={handleChange} />

        </div>

        <button
          onClick={handleContinue}
          className="mt-6 bg-[#147E9E] text-white px-6 py-2 rounded"
        >

          Continue to Payment →

        </button>

      </div>

    </div>

  );

}