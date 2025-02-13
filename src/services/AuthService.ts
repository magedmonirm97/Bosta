import { LoginCredentials, User, AuthErrorType, ValidationError } from '../interfaces/IAuth';

class AuthenticationError extends Error {
  constructor(public type: AuthErrorType) {
    super();
    this.name = 'AuthenticationError';
  }
}

const API_URL = 'https://fakestoreapi.com';

export const AuthService = {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new AuthenticationError(AuthErrorType.INVALID_CREDENTIALS);
      }

      const tokenData = await response.json();
      const usersResponse = await fetch(`${API_URL}/users`);
      const users = await usersResponse.json();
      const userData = users.find((user: any) => user.username === credentials.username);

      return {
        id: userData.id,
        username: userData.name.firstname,
        token: tokenData.token
      };
    } catch (error) {
      if (error instanceof AuthenticationError) throw error;
      throw new AuthenticationError(AuthErrorType.NETWORK_ERROR);
    }
  },

  async register(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: `${credentials.username}@example.com`,
          username: credentials.username,
          password: credentials.password,
          name: {
            firstname: credentials.username,
            lastname: 'User'
          }
        }),
      });

      if (!response.ok) {
        throw new AuthenticationError(AuthErrorType.INVALID_CREDENTIALS);
      }

      // After successful registration, log the user in
      return this.login(credentials);
    } catch (error) {
      if (error instanceof AuthenticationError) throw error;
      throw new AuthenticationError(AuthErrorType.NETWORK_ERROR);
    }
  },


  validateCredentials(credentials: LoginCredentials): ValidationError[] {
    const errors: ValidationError[] = [];
    
    if (!credentials.username) {
      errors.push({ field: 'username', message: 'Username is required' });
    }
    
    if (!credentials.password) {
      errors.push({ field: 'password', message: 'Password is required' });
    }

    return errors;
  }
};
