import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageProvider'
import { useCart } from '../contexts/CartContext'
import CTAIcon from '../config/ctaIcon'
import { useAuth } from "../contexts/AuthContext"
import { getUser } from "../services/API"

export default function Header() {

  const [id, setId] = useState('1')
  const navigate = useNavigate()
  const { t, lang, setLang } = useLanguage()
  const { cart } = useCart()
  const { isAuth, logout } = useAuth()

  const [userName, setUserName] = useState("Loading...")

 
  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getUser()
        const name = `${data.first_name || ""} ${data.last_name || ""}`.trim()
        setUserName(name || "User")
      } catch (err) {
        console.error("Header user fetch error:", err)
        setUserName("User")
      }
    }

    if (isAuth) {
      loadUser()
    }
  }, [isAuth])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const headerRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const cat = (params.get('category') || '').toLowerCase()
    setSelectedCategory(cat)
  }, [location.search])

  function goToProduct(e) {
    e.preventDefault()
    if (!id) return
    navigate(`/product/${id}`)
  }

  return (

    <header ref={headerRef} className="bg-white shadow-sm relative z-50">

      {/* Top Bar */}
      <div className="border-b">
        <div className="container mx-auto flex items-center justify-end gap-6 h-14">

          <nav className="flex items-center gap-6 text-xs">

            <div className="flex flex-col items-center text-gray-700 hover:text-[#147E9E] cursor-pointer">
              <span>Get App</span>
            </div>

            <div className="flex flex-col items-center text-gray-700 hover:text-[#147E9E] cursor-pointer">
              <span>Notifications</span>
            </div>

            <Link
              to="/cart"
              className="relative flex flex-col items-center text-gray-700 hover:text-[#147E9E]"
            >
              <span>{t('cart')}</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <select
              value={lang}
              onChange={e => setLang(e.target.value)}
              className="text-xs border rounded px-1"
            >
              <option value="en">English</option>
              <option value="mr">मराठी</option>
              <option value="hi">हिंदी</option>
            </select>

            {isAuth ? (
              <>
                <div
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#147E9E]"
                >
                  <img
                    src="/profile.png"
                    alt="profile"
                    className="w-7 h-7 rounded-full border"
                  />

                  <span className="text-xs font-medium">
                    {userName}
                  </span>
                </div>

                <button
                  onClick={() => {
                    logout()
                    navigate("/login")
                  }}
                  className="text-xs hover:text-[#147E9E]"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-xs hover:text-[#147E9E]">
                Sign In
              </Link>
            )}

          </nav>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto flex items-center justify-between h-16 px-4">

        <div className="flex items-center gap-4">
          <Link to={isAuth ? "/home" : "/"} className="text-xl font-semibold text-[#147E9E]">
            {t('brand')}
          </Link>

          <div className="hidden md:flex gap-4">
            <Link to="/products" className="hover:text-[#147E9E]">
              {t('allProducts')}
            </Link>
            <Link to="/consultant" className="hover:text-[#147E9E]">
              {t('consultant')}
            </Link>
            <Link to="/about" className="hover:text-[#147E9E]">
              {t('aboutUs')}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/consultant"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-sm flex items-center gap-2"
          >
            <CTAIcon className="h-4 w-4" />
            {t('tellUsRequirement')}
          </Link>

          <form onSubmit={goToProduct} className="flex items-center gap-2">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="border rounded px-2 py-1 w-20 text-sm"
            />
            <button className="bg-[#147E9E] text-white px-3 py-1 rounded text-sm">
              {t('go')}
            </button>
          </form>
        </div>

      </div>

      
      <div
        className="w-full"
        style={{
          backgroundImage: "url('/pesticides-perfumes.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="p-6 bg-black/40">
          <div className="flex flex-col items-center gap-4 text-center text-white">

            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                {t('searchBannerTitle')}
              </h3>

              
              <p className="text-sm opacity-90 mt-1">
                {t('searchPlaceholder')}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const params = new URLSearchParams()
                if (searchQuery) params.set('search', searchQuery)
                if (selectedCategory) params.set('category', selectedCategory)
                navigate('/products?' + params.toString())
              }}
              className="w-full max-w-3xl"
            >
              <div className="flex bg-white rounded overflow-hidden text-sm text-black">

                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="px-3"
                >
                  <option value="">{t('all')}</option>
                  <option value="electronics">{t('category_electronics')}</option>
                  <option value="clothing">{t('category_clothing')}</option>
                  <option value="home">{t('category_home')}</option>
                </select>

                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="flex-1 px-3 py-2 outline-none"
                />

                <button className="bg-[#147E9E] text-white px-4">
                  {t('search')}
                </button>

              </div>
            </form>

           
            <div className="flex gap-3 justify-center flex-wrap">
              {['electronics', 'clothing', 'home'].map(cat => (
                <button
                  key={cat}
                  onClick={() => navigate(`/products?category=${cat}`)}
                  className="bg-white/20 hover:bg-white text-white hover:text-[#147E9E] px-4 py-1 rounded text-sm"
                >
                  {t(`category_${cat}`)}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

    </header>
  )
}










