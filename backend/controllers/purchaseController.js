const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Checkout cart and create purchase
// @route   POST /api/purchases
// @access  Private
const checkout = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get user's cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Validate all products are still available
    const unavailableProducts = cart.items.filter(item => 
      !item.productId || !item.productId.isAvailable
    );

    if (unavailableProducts.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Some products in your cart are no longer available'
      });
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce((total, item) => {
      return total + (item.productId.price * item.quantity);
    }, 0);

    // Calculate eco points gained (1 point per $10 spent)
    const ecoPointsGained = Math.floor(totalAmount / 10);

    // Prepare purchase items
    const purchaseItems = cart.items.map(item => ({
      productId: item.productId._id,
      title: item.productId.title,
      description: item.productId.description,
      price: item.productId.price,
      category: item.productId.category,
      image: item.productId.image,
      sellerName: item.productId.sellerName,
      quantity: item.quantity
    }));

    // Create purchase
    const purchase = await Purchase.create({
      userId,
      items: purchaseItems,
      totalAmount,
      ecoPointsGained
    });

    // Update user's eco points
    await User.findByIdAndUpdate(userId, {
      $inc: { ecoPoints: ecoPointsGained }
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: 'Purchase completed successfully',
      data: { purchase }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's purchases
// @route   GET /api/purchases
// @access  Private
const getPurchases = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const purchases = await Purchase.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Purchase.countDocuments({ userId: req.user._id });

    // Calculate total statistics
    const stats = await Purchase.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: '$totalAmount' },
          totalEcoPoints: { $sum: '$ecoPointsGained' },
          totalOrders: { $sum: 1 },
          totalItems: { $sum: '$totalItems' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        purchases,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalPurchases: total,
          hasNextPage: skip + purchases.length < total,
          hasPrevPage: parseInt(page) > 1
        },
        stats: stats[0] || {
          totalSpent: 0,
          totalEcoPoints: 0,
          totalOrders: 0,
          totalItems: 0
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single purchase
// @route   GET /api/purchases/:id
// @access  Private
const getPurchase = async (req, res, next) => {
  try {
    const purchase = await Purchase.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: 'Purchase not found'
      });
    }

    res.json({
      success: true,
      data: { purchase }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkout,
  getPurchases,
  getPurchase
};