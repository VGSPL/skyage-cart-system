function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">

      <h3>{product.name}</h3>

      <p>₹{product.price}</p>

      <button>
        View
      </button>

      <button
        onClick={() =>
          addToCart({
            product_id: product.id,
            quantity: 1
          })
        }
        style={{ marginTop: "10px" }}
      >
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;










