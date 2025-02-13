import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../interfaces/IProduct';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart } = useContext(CartContext);
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
