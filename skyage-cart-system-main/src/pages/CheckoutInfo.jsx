import { useNavigate } from "react-router-dom";
export default function CheckoutInfo() {
   const navigate = useNavigate(); 
  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-6">

        <h2 className="text-2xl font-semibold text-gray-800">
          Customer Information
        </h2>
        <p className="text-gray-500 mb-8">
          Enter your delivery details
        </p>

        {/* Row 1 */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input type="text" placeholder="Enter full name" className="input" />
          </div>

          <div>
            <label className="label">Mobile Number</label>
            <input type="text" placeholder="+91 " className="input" />
          </div>

          <div>
            <label className="label">Email Address</label>
            <input type="email" placeholder="Enter email address" className="input" />
          </div>
        </div>

        {/* Address */}
        <div className="mt-8 flex justify-center">
          <label className="label">Address</label>
          <input
            type="text"
            placeholder="Apartment, Street, Landmark (optional)"
            className="input"
          />
        </div>

        {/* City State Pincode */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <input type="text" placeholder="Enter city" className="input" />
          
          <select className="input">
            <option>Select state</option>
            <option>Maharashtra</option>
            <option>Gujarat</option>
            <option>Karnataka</option>
          </select>

          <input type="text" placeholder="Enter pincode" className="input" />
        </div>

        {/* Checkbox */}
        <div className="mt-6 flex items-center gap-2">
          <input type="checkbox" />
          <label className="text-gray-600 text-sm">
            Save this information for future orders
          </label>
        </div>

        {/* Button */}
        <div className="mt-8">
          <button
  onClick={() => navigate("/checkout/payment")}
  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg shadow-md transition"
>
  Continue to Payment →
</button>
        </div>

      </div>
    </div>
  );
}