import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { walletPayment, getCart, getCartTotal } from "../services/API";
import qrImage from "../assets/upi-qr.png";

export default function CheckoutReview() {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const [paymentMethod, setPaymentMethod] = useState("wallet");

    const [transactionId, setTransactionId] = useState("");
    const [paymentScreenshot, setPaymentScreenshot] = useState(null);

    const customerInfo = JSON.parse(localStorage.getItem("customerInfo"));

    useEffect(() => {

        fetchCart();

    }, []);

    const fetchCart = async () => {

        try {

            const cart = await getCart();
            setCartItems(cart.items || []);

            const total = await getCartTotal();
            setCartTotal(total.total || 0);

        } catch (error) {

            console.log(error);

        }

    };

    const handlePlaceOrder = async () => {

        if (paymentMethod === "wallet") {

            try {

                await walletPayment();

                navigate("/order-success");

            } catch {

                alert("Wallet payment failed");

            }

        }

        else if (paymentMethod === "qr") {

            if (!transactionId) {
                alert("Enter Transaction ID");
                return;
            }

            if (!paymentScreenshot) {
                alert("Upload Screenshot");
                return;
            }

            try {

                const formData = new FormData();

                formData.append("transaction_id", transactionId);
                formData.append("screenshot", paymentScreenshot);

                const token = localStorage.getItem("access");

                await fetch(
                    "http://127.0.0.1:8000/api/payment/wallet_payment/",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        body: formData
                    }
                );

                navigate("/order-success");

            } catch (error) {

                console.log(error);

            }

        }

    };

    return (

        <div className="min-h-screen bg-[#F3EED9] flex justify-center items-center py-16 px-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 space-y-5">

                <h2 className="text-xl font-semibold">
                    Review Your Order
                </h2>

                <div>

                    <h3 className="font-semibold mb-2">
                        Shipping Info
                    </h3>

                    {customerInfo && (

                        <div className="text-sm">

                            <p>{customerInfo.fullName}</p>
                            <p>{customerInfo.address}</p>
                            <p>{customerInfo.city}</p>
                            <p>{customerInfo.phone}</p>

                        </div>

                    )}

                </div>

                <div>

                    <h3 className="font-semibold mb-3">
                        Payment Method
                    </h3>

                    <label className="flex gap-2 mb-2">

                        <input
                            type="radio"
                            value="wallet"
                            checked={paymentMethod === "wallet"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />

                        Wallet

                    </label>

                    <label className="flex gap-2">

                        <input
                            type="radio"
                            value="qr"
                            checked={paymentMethod === "qr"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />

                        QR Payment

                    </label>

                </div>

                {paymentMethod === "qr" && (

                    <div className="text-center">

                        <img src={qrImage} alt="QR" className="w-40 mx-auto" />

                        <input
                            type="text"
                            placeholder="Transaction ID"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            className="border p-2 w-full mt-3"
                        />

                        <input
                            type="file"
                            onChange={(e) => setPaymentScreenshot(e.target.files[0])}
                            className="mt-3"
                        />

                    </div>

                )}

                <div>

                    <h3 className="font-semibold mb-2">
                        Order Items
                    </h3>

                    {cartItems.map((item, index) => (

                        <div
                            key={index}
                            className="flex justify-between text-sm"
                        >

                            <span>
                                {item.product?.name} x {item.quantity}
                            </span>

                            <span>
                                ₹{item.total_price}
                            </span>

                        </div>

                    ))}

                    <div className="flex justify-between font-semibold mt-3">

                        <span>Total</span>

                        <span>₹{cartTotal}</span>

                    </div>

                </div>

                <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-[#147E9E] text-white py-3 rounded"
                >

                    Place Order

                </button>

            </div>

        </div>

    );

}