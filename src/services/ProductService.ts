import { Product } from "../interfaces/IProduct";
const API_URL = 'https://fakestoreapi.com';


export const ProductService = {
  async fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
    
  },

  async fetchProductDetails(id: number): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  },

  async fetchCategories(): Promise<string[]> {
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  },

  async createProduct(productData: Omit<Product, 'id' | 'rating'>): Promise<Product> {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  }

};