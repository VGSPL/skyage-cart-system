export const API_BASE = 'https://fakestoreapi.com';

// Module-level cache so products are fetched only once per app lifecycle
let productsCache = null
let productsPromise = null

export async function getAllProducts() {
  // Return cached data if available
  if (productsCache) return productsCache

  // If a fetch is already in progress, reuse its promise
  if (productsPromise) return productsPromise

  productsPromise = fetch(`${API_BASE}/products`)
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch products')
      return res.json()
    })
    .then(data => {
      productsCache = data
      productsPromise = null
      return productsCache
    })
    .catch(err => {
      productsPromise = null
      throw err
    })

  return productsPromise
}

export async function getProduct(id) {
  // Ensure all products are loaded (this will only trigger one network call)
  try {
    const all = await getAllProducts()
    const found = (all || []).find(p => String(p.id) === String(id))
    if (found) return found
  } catch (err) {
    // If loading all products failed, we'll fall back to fetching the single product
  }

  // Fallback: fetch single product if not present in cached list
  const res = await fetch(`${API_BASE}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

export function clearProductsCache() {
  productsCache = null
}

export async function submitConsultantRequest(data) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to submit request')
  return res.json()
}
