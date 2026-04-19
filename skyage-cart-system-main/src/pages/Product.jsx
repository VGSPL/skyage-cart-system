import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/API'
import { useLanguage } from '../contexts/LanguageProvider'
import { useCart } from '../contexts/CartContext'

export default function Product() {
  const { t } = useLanguage()
  const { addToCart } = useCart()
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setError("Product ID missing in URL")
      setLoading(false)
      return
    }

    getProduct(id)
      .then((data) => {
        console.log("Product API Response:", data)
        setProduct(data)
      })
      .catch((err) => {
        console.log("API Error:", err)
        setError(err.message)
      })
      .finally(() => setLoading(false))

  }, [id])

  const handleAddToCart = () => {
    if (!product) return

    addToCart({
      product_id: product.id,
      quantity: 1
    })
  }

  if (loading) return <div>{t('loadingProduct')}</div>

  if (error) return <div className="text-red-600">{error}</div>

  if (!product) return <div>{t('noProductFound')}</div>

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* IMAGE FIX */}
        <div className="bg-white rounded shadow p-4 flex justify-center">
          <img
            src={product.profile_image || product.image}
            alt={product.name}
            className="max-h-72 object-contain"
          />
        </div>

        {/* DETAILS FIX */}
        <div className="md:col-span-2 bg-white rounded shadow p-6">

          <h1 className="text-2xl font-semibold">
            {product.name}
          </h1>

          <p className="mt-3 text-gray-600">
            {product.description}
          </p>

          <p className="mt-4 text-[#147E9E] font-bold text-xl">
            ₹{product.price}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {t('category')}: {product.category?.name}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-5 bg-[#147E9E] text-white px-5 py-2 rounded"
          >
            Add to Cart
          </button>

        </div>
      </div>
    </main>
  )
}