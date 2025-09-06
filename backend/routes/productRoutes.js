const express = require('express');
const { body } = require('express-validator');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getUserProducts
} = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Validation rules
const productValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('price')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be greater than 0'),
  body('category')
    .isIn(['Clothes', 'Electronics', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Other'])
    .withMessage('Please select a valid category'),
  body('image')
    .isURL()
    .withMessage('Please provide a valid image URL')
];

// Routes
router.post('/', authMiddleware, productValidation, createProduct);
router.get('/', getProducts);
router.get('/user/my-products', authMiddleware, getUserProducts);
router.get('/:id', getProduct);
router.put('/:id', authMiddleware, productValidation, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;