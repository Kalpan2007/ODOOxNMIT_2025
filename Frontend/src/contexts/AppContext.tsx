import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { 
  register, 
  login, 
  getProfile, 
  updateProfile, 
  fetchProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  getUserProducts,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  checkout,
  getPurchases
} from '../api/api';

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  userId: string;
  sellerName: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  ecoPoints: number;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

export interface Purchase {
  _id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    product?: Product;
  }>;
  totalAmount: number;
  ecoPointsGained: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface AppState {
  user: User | null;
  products: Product[];
  cart: CartItem[];
  purchases: Purchase[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'UPDATE_CART_ITEM'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_PURCHASES'; payload: Purchase[] }
  | { type: 'ADD_PURCHASE'; payload: Purchase }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AppState = {
  user: null,
  products: [],
  cart: [],
  purchases: [],
  categories: ['Clothes', 'Electronics', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Other'],
  loading: false,
  error: null
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...(Array.isArray(state.products) ? state.products : []), action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: Array.isArray(state.products) ? state.products.map(p => p._id === action.payload._id ? action.payload : p) : []
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: Array.isArray(state.products) ? state.products.filter(p => p._id !== action.payload) : []
      };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'ADD_TO_CART':
      const existingItem = Array.isArray(state.cart) ? state.cart.find(item => item.productId === action.payload.productId) : null;
      if (existingItem) {
        return {
          ...state,
          cart: Array.isArray(state.cart) ? state.cart.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ) : []
        };
      }
      return {
        ...state,
        cart: [...(Array.isArray(state.cart) ? state.cart : []), action.payload]
      };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        cart: Array.isArray(state.cart) ? state.cart.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ) : []
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: Array.isArray(state.cart) ? state.cart.filter(item => item.productId !== action.payload) : []
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_PURCHASES':
      return { ...state, purchases: action.payload };
    case 'ADD_PURCHASE':
      return {
        ...state,
        purchases: [...(Array.isArray(state.purchases) ? state.purchases : []), action.payload],
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
  // API functions
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (username: string, email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  loadUserProfile: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  loadProducts: (params?: any) => Promise<void>;
  loadUserProducts: () => Promise<void>;
  createNewProduct: (data: any) => Promise<void>;
  updateExistingProduct: (id: string, data: any) => Promise<void>;
  deleteExistingProduct: (id: string) => Promise<void>;
  loadCart: () => Promise<void>;
  addProductToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItemQuantity: (productId: string, quantity: number) => Promise<void>;
  removeProductFromCart: (productId: string) => Promise<void>;
  clearUserCart: () => Promise<void>;
  loadPurchases: () => Promise<void>;
  processCheckout: () => Promise<void>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUserProfile();
    }
  }, []);

  useEffect(() => {
    // Load user profile and products on app start if user is logged in
    const loadInitialData = async () => {
      if (!state.user) {
        try {
          const profileResponse = await getProfile();
          if (profileResponse.data.success) {
            dispatch({ type: 'SET_USER', payload: profileResponse.data.data });
          }
          const productsResponse = await fetchProducts();
          if (productsResponse.data.success) {
            dispatch({ type: 'SET_PRODUCTS', payload: productsResponse.data.data });
          }
          await loadCart();
        } catch (error) {
          console.error('Failed to load initial data:', error);
        }
      }
    };
    loadInitialData();
  }, []);

  // API Functions
  const loginUser = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const response = await login({ email, password });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        dispatch({ type: 'SET_USER', payload: response.data.data.user });
        await loadProducts();
        await loadCart();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const registerUser = async (username: string, email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const response = await register({ username, email, password });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        dispatch({ type: 'SET_USER', payload: response.data.data.user });
        await loadProducts();
        await loadCart();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_PRODUCTS', payload: [] });
    dispatch({ type: 'SET_CART', payload: [] });
    dispatch({ type: 'SET_PURCHASES', payload: [] });
  };

  const loadUserProfile = async () => {
    try {
      const response = await getProfile();
      if (response.data.success) {
        dispatch({ type: 'SET_USER', payload: response.data.data });
        // Load user's data after successful profile load
        await loadProducts();
        await loadCart();
        await loadPurchases();
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
      logoutUser();
    }
  };

  const updateUserProfile = async (data: Partial<User>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await updateProfile(data);
      if (response.data.success) {
        dispatch({ type: 'UPDATE_USER', payload: response.data.data });
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Update failed' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadProducts = useCallback(async (params?: any) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetchProducts(params);
      if (response.data.success) {
        dispatch({ type: 'SET_PRODUCTS', payload: response.data.data.products || response.data.data || [] });
      }
    } catch (error: any) {
      console.error('Failed to load products:', error);
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to load products' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const loadUserProducts = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await getUserProducts();
      if (response.data.success) {
        // Backend returns { data: { products: [...] } }
        dispatch({ type: 'SET_PRODUCTS', payload: response.data.data.products || [] });
      }
    } catch (error: any) {
      console.error('Failed to load user products:', error);
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to load user products' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const createNewProduct = async (data: any) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await createProduct(data);
      if (response.data.success) {
        dispatch({ type: 'ADD_PRODUCT', payload: response.data.data });
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to create product' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateExistingProduct = async (id: string, data: any) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await updateProduct(id, data);
      if (response.data.success) {
        dispatch({ type: 'UPDATE_PRODUCT', payload: response.data.data });
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to update product' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteExistingProduct = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await deleteProduct(id);
      if (response.data.success) {
        dispatch({ type: 'DELETE_PRODUCT', payload: id });
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to delete product' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadCart = async () => {
    try {
      const response = await getCart();
      if (response.data.success) {
        dispatch({ type: 'SET_CART', payload: response.data.data.items || [] });
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  const addProductToCart = async (productId: string, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // Fix: use _id for productId
      const response = await addToCart({ _id: productId, quantity });
      if (response.data.success) {
        dispatch({ type: 'ADD_TO_CART', payload: { productId, quantity } });
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to add to cart' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateCartItemQuantity = async (productId: string, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await updateCartItem(productId, { quantity });
      if (response.data.success) {
        dispatch({ type: 'UPDATE_CART_ITEM', payload: { productId, quantity } });
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to update cart' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeProductFromCart = async (productId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await removeFromCart(productId);
      if (response.data.success) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to remove from cart' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearUserCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await clearCart();
      if (response.data.success) {
        dispatch({ type: 'CLEAR_CART' });
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to clear cart' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadPurchases = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await getPurchases();
      if (response.data.success) {
        dispatch({ type: 'SET_PURCHASES', payload: response.data.data || [] });
      }
    } catch (error: any) {
      console.error('Failed to load purchases:', error);
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to load purchases' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const processCheckout = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await checkout();
      if (response.data.success) {
        dispatch({ type: 'ADD_PURCHASE', payload: response.data.data });
        dispatch({ type: 'CLEAR_CART' });
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Checkout failed' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <AppContext.Provider value={{ 
      state, 
      dispatch,
      loginUser,
      registerUser,
      logoutUser,
      loadUserProfile,
      updateUserProfile,
      loadProducts,
      loadUserProducts,
      createNewProduct,
      updateExistingProduct,
      deleteExistingProduct,
      loadCart,
      addProductToCart,
      updateCartItemQuantity,
      removeProductFromCart,
      clearUserCart,
      loadPurchases,
      processCheckout
    }}>
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