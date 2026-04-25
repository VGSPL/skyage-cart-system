import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getFeaturedProducts } from '../services/API'
import { useLanguage } from '../contexts/LanguageProvider'
import { useCart } from "../contexts/CartContext";

export default function FeaturedProducts() {
  const { t } = useLanguage()
  const location = useLocation()
  const { addToCart } = useCart()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getFeaturedProducts()
        if (mounted) setItems(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchProducts()

   
    // const interval = setInterval(fetchProducts, 5000)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  if (loading)
    return <div className="container mx-auto px-4 py-6">{t('loadingProducts')}</div>

  if (error)
    return <div className="container mx-auto px-4 py-6 text-red-600">{error}</div>

  const params = new URLSearchParams(location.search)
  const q = (params.get('search') || '').trim().toLowerCase()
  const category = (params.get('category') || '').trim().toLowerCase()

  const filtered = (items || []).filter(p => {
    const name = (p.name || '').toLowerCase()
    const desc = (p.description || '').toLowerCase()
    const cat = (p.category?.name || '').toLowerCase()

    const matchesSearch = q ? (name + ' ' + desc).includes(q) : true
    const matchesCategory = category ? cat.includes(category) : true

    return matchesSearch && matchesCategory
  })

  const title = q
    ? `${t('searchResultsFor')} "${q}"`
    : category
      ? `${t('searchResultsFor')} "${category}"`
      : t('featuredTitle')

  const promoImage = items?.[0]?.profile_image || ''

  const handleAddToCart = (product) => {
    addToCart({
      product_id: product.id,
      quantity: 1
    })
  }

  return (
    <section className="container mx-auto px-4 py-6 bg-white border-t-4 border-[#147E9E]">

      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">{title}</h2>
        <Link to="/products" className="text-[#147E9E]">{t('viewAll')}</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

        <div className="md:col-span-2">
          <img src={promoImage} className="w-full h-full object-cover rounded" />
        </div>

        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {filtered.map(p => (
            <article key={p.id} className="bg-white shadow rounded p-3">

              <img src={p.profile_image} className="h-20 mx-auto object-contain" />

              <h3 className="text-sm mt-2">{p.name}</h3>

              <p className="text-[#147E9E] font-semibold">₹{p.price}</p>

              <Link to={`/product/${p.id}`} className="text-sm text-[#147E9E]">
                {t('view')}
              </Link>

              <button
                onClick={() => handleAddToCart(p)}
                className="w-full mt-2 bg-[#147E9E] text-white py-1 rounded"
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






































