# EcoFinds Backend API

A sustainable second-hand marketplace backend built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone and navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the backend root:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecofinds
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=development
```

4. **Start the server**
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

5. **Verify installation**
Visit: `http://localhost:5000/api/health`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Routes

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "ecouser",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "username": "ecouser",
      "email": "user@example.com",
      "ecoPoints": 50,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "newusername",
  "email": "newemail@example.com",
  "avatar": "https://example.com/avatar.jpg"
}
```

---

## 📦 Product Routes

### Create Product
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Vintage Denim Jacket",
  "description": "Classic vintage denim jacket in excellent condition",
  "price": 35.99,
  "category": "Clothes",
  "image": "https://example.com/image.jpg"
}
```

### Get All Products
```http
GET /api/products?search=jacket&category=Clothes&page=1&limit=10&sortBy=price&sortOrder=asc
```

**Query Parameters:**
- `search` - Search in title and description
- `category` - Filter by category
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - asc or desc (default: desc)

### Get Single Product
```http
GET /api/products/:id
```

### Update Product
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 29.99
}
```

### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Get User's Products
```http
GET /api/products/user/my-products
Authorization: Bearer <token>
```

---

## 🛒 Cart Routes

### Add to Cart
```http
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 2
}
```

### Get Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

### Update Cart Item
```http
PUT /api/cart/:productId
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}
```

### Remove from Cart
```http
DELETE /api/cart/:productId
Authorization: Bearer <token>
```

### Clear Cart
```http
DELETE /api/cart
Authorization: Bearer <token>
```

---

## 💳 Purchase Routes

### Checkout
```http
POST /api/purchases
Authorization: Bearer <token>
```

### Get Purchases
```http
GET /api/purchases?page=1&limit=10
Authorization: Bearer <token>
```

### Get Single Purchase
```http
GET /api/purchases/:id
Authorization: Bearer <token>
```

---

## 🗂️ Data Models

### User
```javascript
{
  username: String (required, unique, 3-30 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  avatar: String (URL),
  ecoPoints: Number (default: 50),
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  userId: ObjectId (ref: User),
  title: String (required, 3-100 chars),
  description: String (required, 10-1000 chars),
  price: Number (required, min: 0.01),
  category: String (enum: categories),
  image: String (required, URL),
  sellerName: String (required),
  isAvailable: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Cart
```javascript
{
  userId: ObjectId (ref: User, unique),
  items: [{
    productId: ObjectId (ref: Product),
    quantity: Number (min: 1)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Purchase
```javascript
{
  userId: ObjectId (ref: User),
  items: [PurchaseItem],
  totalAmount: Number (required),
  ecoPointsGained: Number (default: 0),
  status: String (enum: ['completed', 'processing', 'cancelled']),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 Frontend Integration

### API Client Setup
Create `src/api/api.ts` in your frontend:

```typescript
import axios from "axios";

const API = axios.create({ 
  baseURL: "http://localhost:5000/api",
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
```

---

## 🛡️ Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: express-validator for all inputs
- **CORS Protection**: Configured for specific origins
- **Error Handling**: Comprehensive error middleware
- **Rate Limiting**: Ready for production rate limiting
- **Data Sanitization**: Mongoose built-in sanitization

---

## 🚀 Deployment

### Environment Variables for Production
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecofinds
JWT_SECRET=super_secure_random_string_for_production
NODE_ENV=production
```

### PM2 Deployment
```bash
npm install -g pm2
pm2 start server.js --name "ecofinds-api"
pm2 startup
pm2 save
```

---

## 🧪 Testing

### Manual Testing with curl

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Create Product:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Product","description":"Test description","price":25.99,"category":"Other","image":"https://example.com/image.jpg"}'
```

---

## 📝 Error Handling

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ] // For validation errors
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Email: support@ecofinds.com

---

**Happy Coding! 🌱**