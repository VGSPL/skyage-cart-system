import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../services/API'
import { useLanguage } from '../contexts/LanguageProvider'
import { useCart } from "../contexts/CartContext";

export default function HotSalesElectronics(){

  const { t } = useLanguage()
  const { addToCart } = useCart()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    getAllProducts()
      .then(data => {
        if (mounted) {

          const electronics = (data || []).filter(
            p => (p.category?.name || '').toLowerCase() === 'electronics'
          )

          setItems(electronics)
        }
      })
      .catch(err => setError(err.message))
      .finally(() => mounted && setLoading(false))

    return () => mounted = false
  }, [])

  if (loading)
    return <div className="container mx-auto py-6">{t('loadingProducts')}</div>

  if (error)
    return <div className="container mx-auto py-6 text-red-600">{t('errorPrefix')} {error}</div>

  if (items.length === 0) return null

  const handleAddToCart = (product) => {
    addToCart({
      product_id: product.id,
      quantity: 1
    })
  }

  return (
    <section className="container mx-auto py-6 bg-[#F3EED9]">

      <h2 className="text-lg font-semibold mb-4">
        Hot Sales on Electronics
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        {items.slice(0, 10).map(p => (

          <article key={p.id} className="bg-white rounded shadow p-3 flex flex-col">

            <img
              src={p.profile_image}
              alt={p.name}
              className="h-24 object-contain mb-2"
            />

            <h3 className="text-sm font-medium">
              {p.name}
            </h3>

            <div className="mt-auto">

              <p className="text-[#147E9E] font-semibold">
                ₹{p.price}
              </p>

              <Link
                to={`/product/${p.id}`}
                className="block mt-2 text-sm text-[#147E9E]"
              >
                {t('view')}
              </Link>

              <button
                onClick={() => handleAddToCart(p)}
                className="w-full mt-2 bg-[#147E9E] text-white py-2 rounded hover:bg-[#10657d] active:scale-95 transition"
              >
                Add To Cart
              </button>

            </div>

          </article>

        ))}

      </div>

    </section>
  )
}