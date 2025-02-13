import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import { CartContext } from '../../context/CartContext';
import { Product } from '../../interfaces/IProduct';
import { toast } from 'react-toastify';
export const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useContext(CartContext);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (!id) throw new Error('Product ID is required');
        const data = await ProductService.fetchProductDetails(Number(id));
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ id: String(product.id), price: product.price, image: product.image, title: product.title });
      toast.success(`${product.title.slice(0, 20)}... added to cart`);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  return (
    <div className="product-details">
      <img 
        src={product.image} 
        alt={product.title} 
        className="product-image"
      />
      <div className="details">
        <h1 className="title">{product.title}</h1>
        <p className="category">{product.category}</p>
        <p className="description">{product.description}</p>
        <div className="price-rating">
          <span className="price">${product.price.toFixed(2)}</span>
          <span className="rating">
            Rating: {product.rating.rate}/5 ({product.rating.count} reviews)
          </span>
        </div>
        <button 
          onClick={handleAddToCart}
          className="add-to-cart-button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
