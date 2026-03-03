import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageProvider'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white mt-8 sm:mt-12">
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          {/* Navigations */}
          <div>
            <h3 className="text-xs sm:text-lg font-semibold mb-2 sm:mb-4">Navigations</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link to="/" className="text-[10px] sm:text-sm hover:text-[#147E9E] transition">{t('home') || 'Home'}</Link></li>
              <li><Link to="/products" className="text-[10px] sm:text-sm hover:text-[#147E9E] transition">{t('allProducts') || 'All Products'}</Link></li>
              <li><Link to="/consultant" className="text-[10px] sm:text-sm hover:text-[#147E9E] transition">{t('consultant') || 'Consultant'}</Link></li>
              <li><Link to="/about" className="text-[10px] sm:text-sm hover:text-[#147E9E] transition">{t('aboutUs') || 'About Us'}</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs sm:text-lg font-semibold mb-2 sm:mb-4">Categories</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link to="/products?category=electronics" className="text-[10px] sm:text-sm hover:text-[#147E9E] transition">Electronics</Link></li>
              <li><Link to="/products?category=clothing" className="text-[10px] sm:text-sm hover:text-[#147E9E] transition">Clothing</Link></li>
              <li><Link to="/products?category=home" className="text-[10px] sm:text-sm hover:text-[#147E9E] transition">Home & Garden</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xs sm:text-lg font-semibold mb-2 sm:mb-4">Contact Us</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-300 text-[10px] sm:text-sm">
              <li className="flex items-start gap-1 sm:gap-2">
                <span className="text-[#147E9E] mt-0.5 flex-shrink-0">📧</span>
                <span>support@skyage.com</span>
              </li>
              <li className="flex items-start gap-1 sm:gap-2">
                <span className="text-[#147E9E] mt-0.5 flex-shrink-0">📞</span>
                <span>+91-800-1-Skyage</span>
              </li>
              <li className="flex items-start gap-1 sm:gap-2">
                <span className="text-[#147E9E] mt-0.5 flex-shrink-0">📍</span>
                <span>123 Business Ave, India</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xs sm:text-lg font-semibold mb-2 sm:mb-4">Follow Us</h3>
            <div className="flex gap-2 sm:gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#147E9E] transition text-lg sm:text-2xl">f</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#147E9E] transition text-lg sm:text-2xl">𝕏</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#147E9E] transition text-lg sm:text-2xl">📷</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#147E9E] transition text-lg sm:text-2xl">in</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-4 sm:my-8" />

        {/* Bottom Section with Privacy Policy */}
        <div className="flex flex-col md:flex-row items-center justify-between text-[10px] sm:text-sm text-gray-400">
          <p>&copy; 2026 Skyage. All rights reserved.</p>
          <div className="flex gap-3 sm:gap-6 mt-3 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-[#147E9E] transition">Privacy Policy</Link>
            <a href="#terms" className="hover:text-[#147E9E] transition">Terms of Service</a>
            <a href="#cookies" className="hover:text-[#147E9E] transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
