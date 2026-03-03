import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../services/api'
import { useLanguage } from '../contexts/LanguageProvider'
import { useCart } from "../contexts/CartContext";
export default function HotSalesElectronics(){

  const { t } = useLanguage()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  
  // const addToCart = (product) => {
  //   alert(product.title + " added to cart")
  // }

  const { addToCart } = useCart();
  <button
  onClick={() => addToCart(p)}
  className="w-full mt-2 bg-blue-600 text-white py-2 rounded"
>
  Add To Cart
</button>
  useEffect(()=>{
    let mounted = true
    getAllProducts()
      .then(data => { 
        if(mounted){
          const electronics = (data || []).filter(
            p => (p.category || '').toLowerCase() === 'electronics'
          )
          setItems(electronics)
        } 
      })
      .catch(err => setError(err.message))
      .finally(()=> mounted && setLoading(false))

    return ()=> mounted = false
  },[])

  if(loading)
    return <div className="container mx-auto py-6">{t('loadingProducts')}</div>

  if(error)
    return <div className="container mx-auto py-6">{t('errorPrefix')} {error}</div>

  if(items.length === 0) return null

  const rightItems = items.slice(0, 10)

  return (
    <section className="container mx-auto py-6 bg-[#F3EED9]">

      <h2 className="text-lg font-semibold mb-4">
        Hot Sales on Electronics
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {rightItems.map(p => (
          <article
            key={p.id}
            className="bg-white rounded shadow p-3 flex flex-col"
          >

            <img
              src={p.image}
              alt={p.title}
              className="h-24 object-contain mb-2"
            />

            <h3 className="text-sm font-medium">
              {p.title}
            </h3>

            <div className="mt-auto">

              <p className="text-[#147E9E] font-semibold">
                ₹{p.price}
              </p>

              <Link
                to={`/product/${p.id}`}
                className="block mt-2 text-sm text-[#147E9E]"
              >
                View
              </Link>

              
              <button
                onClick={() => addToCart(p)}
                className="w-full mt-2 bg-blue-600 text-white py-2 rounded"
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
