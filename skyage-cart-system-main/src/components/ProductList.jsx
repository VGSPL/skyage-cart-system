import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts, addToCart } from "../services/API";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddToCart = async (id) => {
    try {
      await addToCart(id, 1);
      alert("Product added to cart");
    } catch (error) {
      console.error(error);
      alert("Please login first");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();

        // ✅ FIX: ALWAYS use results
        setProducts(data?.results || []);

      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={() => handleAddToCart(product.id)}
        />
      ))}
    </div>
  );
}