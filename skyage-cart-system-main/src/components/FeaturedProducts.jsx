import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getAllProducts } from '../services/api'
import { useLanguage } from '../contexts/LanguageProvider'
import { useCart } from "../contexts/CartContext";

export default function FeaturedProducts() {
  const { t } = useLanguage()
  const location = useLocation()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart();

  useEffect(() => {
    let mounted = true
    getAllProducts()
      .then(data => { if (mounted) { setItems((data || [])) } })
      .catch(err => setError(err.message))
      .finally(() => mounted && setLoading(false))
    return () => mounted = false
  }, [])

  if (loading) return <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6 text-xs sm:text-sm">{t('loadingProducts')}</div>
  if (error) return <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6 text-xs sm:text-sm">{t('errorPrefix')} {error}</div>

  const params = new URLSearchParams(location.search)
  const q = (params.get('search') || '').trim().toLowerCase()
  const category = (params.get('category') || '').trim().toLowerCase()

  // if searching or filtering by category, show filtered results
  if (q || category) {
    const filtered = (items || []).filter(p => {
      const title = (p.title || '').toLowerCase()
      const desc = (p.description || '').toLowerCase()
      const cat = (p.category || '').toLowerCase()
      const matchesSearch = q ? (title + ' ' + desc).includes(q) : true
      const matchesCategory = category ? cat.includes(category) : true
      return matchesSearch && matchesCategory
    })

    const title = q ? `${t('searchResultsFor')} "${q}"` : `${t('searchResultsFor')} "${t(`category_${category}`) || category}"`

    return (
      <section className="container mx-auto px-2 sm:px-4 py-3 sm:py-6 bg-white" style={{ borderTop: '3px solid #147E9E' }}>
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <h2 className="text-xs sm:text-base md:text-lg lg:text-xl font-semibold">{title}</h2>
          <Link to="/products" className="text-[10px] sm:text-sm text-[#147E9E]">{t('viewAll')}</Link>
        </div>

        {filtered.length === 0 ? (
          <div className="text-gray-600 text-xs sm:text-sm">{t('noProductFound')}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {filtered.map(p => (
              <article key={p.id} className="bg-white rounded shadow p-2 sm:p-3 md:p-4">
                <img src={p.image} alt={p.title} className="h-20 sm:h-28 md:h-40 mx-auto object-contain" />
                <h3 className="mt-2 sm:mt-3 font-medium text-xs sm:text-sm line-clamp-2">{p.title}</h3>
                <p className="mt-1 sm:mt-2 text-[#147E9E] font-semibold text-xs sm:text-sm">₹{p.price}</p>
                <Link to={`/product/${p.id}`} className="inline-block mt-1 sm:mt-3 text-[10px] sm:text-sm text-[#147E9E]">{t('view')}</Link>

              </article>
            ))}
          </div>
        )}
      </section>
    )
  }

  // pick a promo image (fallback to first product)
  const promoImage = ((items && items[0]) && items[0].image) || ''
  const rightItems = (items || []).slice(1, 11)

  return (
    <section className="container mx-auto px-2 sm:px-4 py-3 sm:py-6 bg-white" style={{ borderTop: '3px solid #147E9E' }}>
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <h2 className="text-xs sm:text-base md:text-lg lg:text-xl font-semibold">{t('featuredTitle')}</h2>
        <Link to="/products" className="text-[10px] sm:text-sm text-[#147E9E]">{t('viewAll')}</Link>
      </div>

      {/* Desktop: left promo spanning 2 rows, right grid 5 cols x 2 rows */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4 items-stretch">
        <div className="md:col-span-2 md:row-span-2 flex items-center justify-center">
          <Link to="/products" aria-label={t('seeAllProducts')} className="block">
            <div className="w-full h-32 sm:h-48 md:h-[432px] rounded overflow-hidden relative shadow-lg">
              <img src={promoImage} alt="Featured" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 text-center px-2 sm:px-4 py-1 sm:py-2 rounded">
                  <span className="text-[10px] sm:text-sm font-semibold">{t('seeAllProducts')}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
          {rightItems.map(p => (
            <article key={p.id} className="bg-white rounded shadow p-2 sm:p-3 flex flex-col h-full">
              <img src={p.image} alt={p.title} className="h-16 sm:h-20 md:h-24 object-contain mb-1 sm:mb-2" />
              <h3 className="text-xs sm:text-sm font-medium line-clamp-2">{p.title}</h3>
              <p className="mt-auto text-[#147E9E] font-semibold text-xs sm:text-sm">₹{p.price}</p>
              <Link to={`/product/${p.id}`} className="inline-block mt-1 sm:mt-2 text-[10px] sm:text-sm text-[#147E9E]">{t('view')}</Link>
              <button
                onClick={() => addToCart(p)}
                className="w-full mt-2 bg-[#147E9E] text-white py-1 rounded text-sm hover:bg-[#10657d] active:scale-95 transition"
              >
                Add To Cart
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
