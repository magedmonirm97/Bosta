export interface CartItem {
    id: string;
    price: number;
    quantity: number;
    image: string;
    title: string;
  }
  
export interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    totalPrice: number;
  }