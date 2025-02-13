import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductList } from './components/Shop/ProductList';
import { ProductDetails } from './components/Shop/ProductDetails';
import { ProductCreate } from './components/Shop/ProductCreate';
import { Cart } from './components/Shop/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { Header } from './components/Navbar/Header';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import { Login } from './components/Auth/Login';
import { Signup } from './components/Auth/SignUp';
import { AuthProvider } from './context/AuthContext';



const App: React.FC = () => {
  return (
   <AuthProvider>
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/product/create" 
              element={
                <PrivateRoute>
                  <ProductCreate />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              } 
            />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
        <ToastContainer 
        position="top-center"
        />
      </Router>
    </CartProvider>
   </AuthProvider> 
  );
};

export default App;