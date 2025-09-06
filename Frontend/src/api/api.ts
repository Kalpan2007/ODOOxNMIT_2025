import axios from "axios";

const API = axios.create({ 
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://odooxnmit-2025.onrender.com/api",
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const register = (data: any) => API.post("/auth/register", data);
export const login = (data: any) => API.post("/auth/login", data);
export const getProfile = () => API.get("/auth/profile");
export const updateProfile = (data: any) => API.put("/auth/profile", data);

// Product APIs
export const fetchProducts = (params?: any) => API.get("/products", { params });
export const fetchProduct = (id: string) => API.get(`/products/${id}`);
export const createProduct = (data: any) => API.post("/products", data);
export const updateProduct = (id: string, data: any) => API.put(`/products/${id}`, data);
export const deleteProduct = (id: string) => API.delete(`/products/${id}`);
export const getUserProducts = () => API.get("/products/user/my-products");

// Cart APIs
export const getCart = () => API.get("/cart");
export const addToCart = (data: any) => API.post("/cart", data);
export const updateCartItem = (productId: string, data: any) => API.put(`/cart/${productId}`, data);
export const removeFromCart = (productId: string) => API.delete(`/cart/${productId}`);
export const clearCart = () => API.delete("/cart");

// Purchase APIs
export const checkout = () => API.post("/purchases");
export const getPurchases = (params?: any) => API.get("/purchases", { params });
export const getPurchase = (id: string) => API.get(`/purchases/${id}`);

export default API;