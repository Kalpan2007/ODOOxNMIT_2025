const express = require('express');
const {
  checkout,
  getPurchases,
  getPurchase
} = require('../controllers/purchaseController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Routes
router.post('/', authMiddleware, checkout);
router.get('/', authMiddleware, getPurchases);
router.get('/:id', authMiddleware, getPurchase);

module.exports = router;