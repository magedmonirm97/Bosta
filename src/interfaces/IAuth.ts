export enum AuthErrorType {
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    NETWORK_ERROR = 'NETWORK_ERROR',
  }
  
export interface LoginCredentials {
    username: string;
    password: string;
  }
  
export interface User {
    id: number;
    username: string;
    token: string;
  }
  
export interface ValidationError {
    field: string;
    message: string;
  }
  
export interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
  }