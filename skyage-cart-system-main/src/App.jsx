import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from "./components/ProtectedRoute"; 
import Login from './pages/Login'
import Register from './pages/Register'

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
import OrderSuccess from './pages/OrderSuccess'

import { CartProvider } from './contexts/CartContext'


function AppContent() {

    const location = useLocation()

    const hideHeaderFooter =
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/forgot-password" ||
        location.pathname === "/reset-password"

    return (
        <div className="min-h-screen flex flex-col bg-light-blue">

            {!hideHeaderFooter && <Header />}

            <Routes>

                {/* HOME PAGE */}
                <Route path="/" element={
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
                <Route path="/register" element={<Register />} />
               
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* CHECKOUT FLOW */}
                <Route path="/checkout/info" element={<CheckoutInfo />} />
                <Route path="/checkout/payment" element={<CheckoutPayment />} />
                <Route path="/checkout/review" element={<CheckoutReview />} />
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