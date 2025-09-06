import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  images: string[];
  seller: string;
  description?: string;
}

export interface ProductSearchParams {
  search?: string;
  category?: string;
  maxPrice?: number;
  minPrice?: number;
  condition?: string;
  limit?: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Mock data for demo purposes when API is not available
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Vintage Wooden Table',
    price: 2500,
    category: 'Furniture',
    condition: 'Good',
    images: ['https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg'],
    seller: 'GreenSeller123'
  },
  {
    id: '2',
    title: 'iPhone 12 (Refurbished)',
    price: 35000,
    category: 'Electronics',
    condition: 'Excellent',
    images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
    seller: 'TechRecycle'
  },
  {
    id: '3',
    title: 'Sustainable Fashion Jacket',
    price: 1200,
    category: 'Fashion',
    condition: 'Like New',
    images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'],
    seller: 'EcoFashion'
  },
  {
    id: '4',
    title: 'Classic Literature Collection',
    price: 800,
    category: 'Books',
    condition: 'Good',
    images: ['https://images.pexels.com/photos/159866/books-book-pages-read-159866.jpeg'],
    seller: 'BookLover'
  },
  {
    id: '5',
    title: 'Yoga Mat & Equipment Set',
    price: 1500,
    category: 'Sports',
    condition: 'Excellent',
    images: ['https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg'],
    seller: 'FitLife'
  },
  {
    id: '6',
    title: 'Wireless Bluetooth Headphones',
    price: 2200,
    category: 'Electronics',
    condition: 'Good',
    images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'],
    seller: 'AudioHub'
  }
];

export const searchProducts = async (params: ProductSearchParams): Promise<Product[]> => {
  try {
    const response = await API.get<ApiResponse<Product[]>>('/products', { params });
    return response.data.data;
  } catch (error) {
    console.log('API not available, using mock data');
    
    // Filter mock data based on params
    let filteredProducts = [...mockProducts];
    
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
      );
    }
    
    if (params.category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === params.category?.toLowerCase()
      );
    }
    
    if (params.maxPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= params.maxPrice!
      );
    }
    
    if (params.minPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= params.minPrice!
      );
    }
    
    if (params.condition) {
      filteredProducts = filteredProducts.filter(product => 
        product.condition.toLowerCase() === params.condition?.toLowerCase()
      );
    }
    
    return filteredProducts.slice(0, params.limit || 3);
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await API.get<ApiResponse<string[]>>('/categories');
    return response.data.data;
  } catch (error) {
    console.log('API not available, using mock categories');
    return ['Electronics', 'Fashion', 'Furniture', 'Books', 'Sports', 'Home & Garden'];
  }
};