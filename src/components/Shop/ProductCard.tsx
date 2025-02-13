import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../interfaces/IProduct';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart({ id: String(product.id), price: product.price, image: product.image, title: product.title });
        toast.success(`${product.title.slice(0, 20)}... added to cart`);
    };

    const handleViewDetails = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="product-card">
            <img 
                src={product.image} 
                alt={product.title} 
                className="product-image"
            />
            <h3 className="product-title">{product.title}</h3>
            <h4>{product.category}</h4>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <div className="product-buttons">
                <button 
                    onClick={handleViewDetails}
                    className="view-details-button"
                >
                    View Details
                </button>
                {user ? (
                 <button 
                   onClick={handleAddToCart}
                   className="add-to-cart-button"
                 >
                   Add to Cart
                 </button>
               ) : (
                 <button 
                   className="add-to-cart-button disabled"
                   disabled
                   title="Login to use cart"
                 >
                   Login to use cart
                 </button>
               )}
                     </div>
                 </div>
             );
};
