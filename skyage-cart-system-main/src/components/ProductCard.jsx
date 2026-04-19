function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      <button>View</button>

      <button onClick={() => addToCart(product)} style={{ marginTop: "10px" }}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;












