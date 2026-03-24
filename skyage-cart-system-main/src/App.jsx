import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from "./components/ProtectedRoute";
import Login from './pages/Login'
import UserProfile from "./pages/UserProfile";
import Wallet from "./pages/Wallet";
import BillingInfo from "./pages/BillingInfo";
import Orders from "./pages/OrderHistory";
import Shipping from "./pages/ShippingInfo";
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'
import WelcomeLetter from "./pages/WelcomeLetter";
import UpdateProfile from "./pages/UpdateProfile";
import ProfilePhotoUpdate from "./pages/ProfilePhotoUpdate";

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import FeaturedProducts from './components/FeaturedProducts'
import HotSalesElectronics from './components/HotSalesElectronics'
import HotSalesClothing from './components/HotSalesClothing'
import AllProducts from './pages/AllProducts'
import Product from './pages/Product'
import Consultant from './pages/Consultant'
import About from './pages/About'
import Cart from './components/Cart'
import CheckoutInfo from './pages/CheckoutInfo'
import CheckoutPayment from './pages/CheckoutPayment'
import CheckoutReview from './pages/CheckoutReview'
import PaymentMethod from "./pages/PaymentMethod";

import OrderSuccess from './pages/OrderSuccess'

import { CartProvider } from './contexts/CartContext'


function AppContent() {

    const location = useLocation()


    const hideHeaderFooter =
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/forgot-password" ||
        location.pathname === "/reset-password" ||
        location.pathname === "/welcome-letter"


    return (
        <div className="min-h-screen flex flex-col bg-light-blue">

            {!hideHeaderFooter && <Header />}

            <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* HOME PAGE */}
                <Route path="/home" element={
                    <ProtectedRoute>
                        <>
                            <section className="bg-[#e6dfb8] py-10 px-6">

                                <h1 className="text-2xl font-semibold">
                                    Welcome
                                </h1>
                                <p className="mt-2 text-gray-700">
                                    Use the navigation to browse products or request consultant services.
                                </p>
                            </section>

                            <FeaturedProducts />
                            <Consultant />
                            <HotSalesElectronics />
                            <HotSalesClothing />
                        </>
                    </ProtectedRoute>
                } />

                {/* OTHER PAGES */}
                <Route path="/products" element={<AllProducts />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/consultant" element={<Consultant />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />

                <Route path="/login" element={<Login />} />

                <Route path="/profile" element={
                    <ProtectedRoute>
                        <UserProfile />
                    </ProtectedRoute>
                } />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/update-profile" element={<UpdateProfile />} />

                <Route
                    path="/profile-photo-update"
                    element={
                        <ProtectedRoute>
                            <ProfilePhotoUpdate />
                        </ProtectedRoute>
                    }
                />
                <Route path="/billing" element={<BillingInfo />} />

                <Route path="/shipping" element={<Shipping />} />

                <Route path="/orders" element={<Orders />} />
                <Route path="/register" element={<Register />} />
                <Route path="/welcome-letter" element={<WelcomeLetter />} />

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* CHECKOUT FLOW */}
                <Route path="/checkout/info" element={<CheckoutInfo />} />
                <Route path="/checkout/payment" element={<CheckoutPayment />} />
                <Route path="/checkout/review" element={<CheckoutReview />} />
                <Route path="/payment-method" element={<PaymentMethod />} />
                <Route path="/order-success" element={<OrderSuccess />} />

            </Routes>

            {!hideHeaderFooter && <Footer />}

        </div>
    )
}
export default function App() {
    return (
        <CartProvider>
            <AuthProvider>

                <BrowserRouter>
                    <AppContent />
                </BrowserRouter>
            </AuthProvider>
        </CartProvider>
    )
}







