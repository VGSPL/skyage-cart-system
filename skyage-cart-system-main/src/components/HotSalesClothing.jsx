import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSaleProducts } from '../services/API'   
import { useLanguage } from '../contexts/LanguageProvider'
import { useCart } from "../contexts/CartContext";

export default function HotSalesClothing() {

  const { t } = useLanguage()
  const { addToCart } = useCart()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    getSaleProducts()   
      .then(data => {

        if (!mounted) return

      
        const clothing = (data || []).filter(
          p => (p.category?.name || '').toLowerCase() === 'clothing'
        )

        setItems(clothing)
      })
      .catch(err => setError(err.message))
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const handleAddToCart = (product) => {
    addToCart({
      product_id: product.id,
      quantity: 1
    })
  }

  if (loading)
    return <div className="container mx-auto py-6">{t('loadingProducts')}</div>

  if (error)
    return <div className="container mx-auto py-6 text-red-600">{t('errorPrefix')} {error}</div>

  if (!items.length) return null

  const promoImage = items?.[0]?.profile_image || ''
  const rightItems = items.slice(1, 11)

  return (
    <section className="container mx-auto py-6 bg-white">

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-lg font-semibold">
          Hot Sale Products
        </h2>

        <Link
          to="/products?sale=true"
          className="text-sm text-[#147E9E]"
        >
          {t('viewAll')}
        </Link>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

        {/* PROMO */}
        <div className="md:col-span-2 flex items-center justify-center">

          <Link to="/products?sale=true" className="block">

            <div className="w-full h-[400px] rounded overflow-hidden relative shadow-lg">

              <img
                src={promoImage}
                alt="Hot Sale"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center">

                <div className="bg-white/90 px-4 py-2 rounded">

                  <span className="text-sm font-semibold">
                    View All Sale
                  </span>

                </div>

              </div>

            </div>

          </Link>

        </div>

        {/* PRODUCTS */}
        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-5 gap-4">

          {rightItems.map(p => (

            <article
              key={p.id}
              className="bg-white rounded shadow p-3 flex flex-col"
            >

              <img
                src={p.profile_image || "https://via.placeholder.com/150"}
                alt={p.name}
                className="h-24 object-contain mb-2"
              />

              <h3 className="text-sm font-medium line-clamp-2">
                {p.name}
              </h3>

           
              <p className="mt-auto text-[#147E9E] font-semibold">
                ₹{p.sale_price || p.price}
              </p>

              <Link
                to={`/product/${p.id}`}
                className="text-sm text-[#147E9E] mt-1"
              >
                {t('view')}
              </Link>

              <button
                onClick={() => handleAddToCart(p)}
                className="w-full mt-2 bg-[#147E9E] text-white py-2 rounded"
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