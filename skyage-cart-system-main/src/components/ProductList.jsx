import ProductCard from "./ProductCard";
import { useCart } from "../contexts/CartContext";

function ProductList({ products }) {
  const { addToCart } = useCart(); 

  return (
    <div className="products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart} 
        />
      ))}
    </div>
  );
}

export default ProductList;