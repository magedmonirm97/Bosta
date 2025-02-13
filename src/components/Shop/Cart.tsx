import React, { useContext} from 'react';
import { CartContext } from '../../context/CartContext';
import emptyCartImage from '../../assets/empty-cart.png';
export const Cart: React.FC = () => {
  const { cart, removeFromCart,updateQuantity, totalPrice } = useContext(CartContext);

  const handleCheckout = () => {
    // simulate checkout process
    console.log('Processing checkout for items:', cart);
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <div className="cart-empty">
          <img 
            src={emptyCartImage}
            alt="Empty Cart" 
            className="empty-cart-image"
          />
          <div className="empty-cart-message">
            <span className="message-highlight">Oops!</span>
            <h3 className="empty-cart-text">Looks like your cart is floating in emptiness</h3>
            <p className="empty-cart-subtext">Time to fill it with amazing discoveries!</p>
          </div>
        </div>
      ) : (
        <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img 
                src={item.image} 
                alt={item.title} 
                className="item-image"
              />
              <div className="item-details">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-quantity">Quantity: {item.quantity}</p>
                <div className="quantity-controls">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
                <p className="item-price">
                  Price: ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          </div>
          <div className="cart-summary">
            <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
            <button 
              onClick={handleCheckout}
              className="checkout-button"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
