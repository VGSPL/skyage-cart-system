import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/api'
import { useLanguage } from '../contexts/LanguageProvider'
import { useCart } from '../contexts/CartContext'

export default function Product(){
  const { t } = useLanguage()
  const { addToCart } = useCart() 
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    getProduct(id)
      .then(data => mounted && setProduct(data))
      .catch(err => setError(err.message))
      .finally(()=> mounted && setLoading(false))
    return ()=> mounted = false
  },[id])

  if(loading) return <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 text-xs sm:text-sm">{t('loadingProduct')}</div>
  if(error) return <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 text-xs sm:text-sm">{t('errorPrefix')} {error}</div>
  if(!product) return <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 text-xs sm:text-sm">{t('noProductFound')}</div>

  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-white rounded shadow p-2 sm:p-4 flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-48 sm:max-h-56 md:max-h-72 object-contain" />
        </div>
        <div className="md:col-span-2 bg-white rounded shadow p-3 sm:p-6">
          <h1 className="text-xs sm:text-lg md:text-2xl font-semibold">{product.title}</h1>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-600">{product.description}</p>
          <p className="mt-3 sm:mt-4 text-[#147E9E] font-bold text-sm sm:text-lg md:text-xl">₹{product.price}</p>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">{t('category')}: {product.category}</p>
          <button
            onClick={() => addToCart(product)}
             className="mt-4 bg-[#147E9E] text-white px-4 py-2 rounded hover:bg-[#10657d] active:scale-95 transition"
     >
            Add to Cart
         </button>
        </div>
      </div>
    </main>
  )
}
