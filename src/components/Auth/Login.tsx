import React, { useState } from 'react';
import { AuthService } from '../../services/AuthService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AuthErrorType } from '../../interfaces/IAuth';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const validationErrors = AuthService.validateCredentials({ username, password });
    if (validationErrors.length > 0) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const user = await AuthService.login({ username, password });
      login(user);
      navigate('/');
    } catch (error: any) {
      if (error.type === AuthErrorType.INVALID_CREDENTIALS) {
        setError('Invalid username or password');
      } else {
        setError('Network error. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>

          {error && <span className="error-message">{error}</span>}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};
