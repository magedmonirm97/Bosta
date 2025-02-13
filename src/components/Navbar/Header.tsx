import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {user ? (
        <>
          <div className="nav-row">
            <Link to="/">Products</Link>
            <div className="user-menu">
              <span 
                className="username" 
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Welcome, {user.username}
                <span className={`dropdown-arrow ${showDropdown ? "open" : ""}`}>▼</span>
              </span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="nav-row">
            <Link to="/product/create">Create Product</Link>
            <Link to="/cart" className="cart-link">Cart ({cartItemCount})</Link>
          </div>
        </>
      ) : (
        <div className="nav-row">
          <Link to="/">Products</Link>
          <Link to="/login" className="login-link">Login</Link>
        </div>
      )}
    </nav>
  );
};
