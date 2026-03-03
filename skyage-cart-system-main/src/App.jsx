import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
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

export default function App() {

    return (
        <CartProvider>
            <BrowserRouter>
                <div className="min-h-screen flex flex-col bg-light-blue">
                    <Header />

                    <Routes>

                        {/* HOME PAGE */}
                        <Route path="/" element={
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
                        } />

                        {/* OTHER PAGES */}
                        <Route path="/products" element={<AllProducts />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/consultant" element={<Consultant />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/cart" element={<Cart />} />

                        {/*  CHECKOUT FLOW */}
                        <Route path="/checkout/info" element={<CheckoutInfo />} />
                        <Route path="/checkout/payment" element={<CheckoutPayment />} />
                        <Route path="/checkout/review" element={<CheckoutReview />} />
                        <Route path="/order-success" element={<OrderSuccess />} />

                    </Routes>

                    <Footer />
                </div>
            </BrowserRouter>
        </CartProvider>
    )
}