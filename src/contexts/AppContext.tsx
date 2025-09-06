import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sellerId: string;
  sellerName: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  ecoPoints: number;
  avatar: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Purchase {
  id: string;
  products: CartItem[];
  total: number;
  date: string;
  ecoPointsGained: number;
}

interface AppState {
  user: User | null;
  products: Product[];
  cart: CartItem[];
  purchases: Purchase[];
  categories: string[];
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_PURCHASE'; payload: Purchase }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AppState = {
  user: null,
  products: [],
  cart: [],
  purchases: [],
  categories: ['Clothes', 'Electronics', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Other']
};

// Sample data
const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic vintage denim jacket in excellent condition. Perfect for sustainable fashion lovers.',
    price: 35,
    category: 'Clothes',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    sellerId: '2',
    sellerName: 'Sarah Green',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'iPhone 12 - Good Condition',
    description: 'Well-maintained iPhone 12 with minimal wear. Includes charger and case.',
    price: 450,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
    sellerId: '3',
    sellerName: 'Mike Earth',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'The Great Gatsby - First Edition',
    description: 'Rare first edition of The Great Gatsby in good condition. A must-have for book collectors.',
    price: 85,
    category: 'Books',
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    sellerId: '4',
    sellerName: 'Emma Leaf',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Wooden Plant Pot Set',
    description: 'Beautiful handcrafted wooden plant pots. Perfect for your indoor garden.',
    price: 25,
    category: 'Home & Garden',
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400',
    sellerId: '5',
    sellerName: 'Green Thumb Co.',
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Mountain Bike - Excellent Condition',
    description: 'Well-maintained mountain bike. Great for outdoor adventures and eco-friendly commuting.',
    price: 320,
    category: 'Sports',
    image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400',
    sellerId: '6',
    sellerName: 'Adventure Sports',
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Wooden Educational Toys Set',
    description: 'Eco-friendly wooden toys for children. Safe, durable, and educational.',
    price: 42,
    category: 'Toys',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    sellerId: '7',
    sellerName: 'EcoToys',
    createdAt: new Date().toISOString()
  }
];

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => p.id === action.payload.id ? action.payload : p)
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload)
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_PURCHASE':
      return {
        ...state,
        purchases: [...state.purchases, action.payload],
        user: state.user ? {
          ...state.user,
          ecoPoints: state.user.ecoPoints + action.payload.ecoPointsGained
        } : null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load sample data on first load
    if (state.products.length === 0) {
      sampleProducts.forEach(product => {
        dispatch({ type: 'ADD_PRODUCT', payload: product });
      });
    }
  }, [state.products.length]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};