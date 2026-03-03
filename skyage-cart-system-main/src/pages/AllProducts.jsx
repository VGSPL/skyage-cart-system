import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getAllProducts } from '../services/api'
import { useLanguage } from '../contexts/LanguageProvider'
import { useCart } from '../contexts/CartContext'

export default function AllProducts() {
  const { t } = useLanguage()
  const { addToCart } = useCart()
  const location = useLocation()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    getAllProducts()
      .then(data => {
        if (mounted) setProducts(data)
      })
      .catch(err => setError(err.message))
      .finally(() => mounted && setLoading(false))

    return () => (mounted = false)
  }, [])

  if (loading)
    return (
      <div className="container mx-auto px-4 py-8">
        {t('loadingProducts')}
      </div>
    )

  if (error)
    return (
      <div className="container mx-auto px-4 py-8">
        {t('errorPrefix')} {error}
      </div>
    )

  const params = new URLSearchParams(location.search)
  const q = (params.get('search') || '').trim().toLowerCase()
  const category = (params.get('category') || '').trim().toLowerCase()

  const filtered = (products || []).filter(p => {
    const title = (p.title || '').toLowerCase()
    const desc = (p.description || '').toLowerCase()
    const cat = (p.category || '').toLowerCase()

    // Search filter
    const matchesSearch = q
      ? title.includes(q) || desc.includes(q)
      : true

    // Category mapping (IMPORTANT FIX)
    const categoryMap = {
      electronics: "electronics",
      clothing: "men's clothing",
      womens: "women's clothing",
      jewelery: "jewelery"
    }

    const realCategory = categoryMap[category]

    const matchesCategory = realCategory
      ? cat === realCategory
      : true

    return matchesSearch && matchesCategory
  })

  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-xs sm:text-lg md:text-2xl font-semibold mb-4">
        {t('allProductsHeader')}
      </h1>

      {filtered.length === 0 ? (
        <div className="text-gray-600 text-sm">
          {t('noProductFound')}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => (
            <article
              key={p.id}
              className="bg-white rounded shadow p-3 flex flex-col h-full"
            >
              <img
                src={p.image}
                alt={p.title}
                className="h-28 md:h-40 mx-auto object-contain"
              />

              <h2 className="mt-3 font-medium text-sm line-clamp-2">
                {p.title}
              </h2>

              <div className="mt-auto">
                <p className="mt-2 text-[#147E9E] font-semibold text-sm">
                  ₹{p.price}
                </p>

                <Link
                  to={`/product/${p.id}`}
                  className="block mt-2 text-sm text-[#147E9E]"
                >
                  {t('view')}
                </Link>

                <button
                  onClick={() => addToCart(p)}
                  className="w-full mt-2 bg-[#147E9E] text-white py-2 rounded hover:bg-[#106b85] transition"
                >
                  Add To Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}