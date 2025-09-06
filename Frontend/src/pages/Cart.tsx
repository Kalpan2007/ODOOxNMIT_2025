import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your cart</h1>
          <Link to="/login" className="text-green-600 hover:text-green-700">Go to Login</Link>
        </div>
      </div>
    );
  }

  const handleRemoveFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(productId);
    } else {
      // For simplicity, we'll remove and re-add with new quantity
      const item = state.cart.find(item => item.product.id === productId);
      if (item) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
        for (let i = 0; i < newQuantity; i++) {
          dispatch({ type: 'ADD_TO_CART', payload: item.product });
        }
      }
    }
  };

  const totalAmount = state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const totalItems = state.cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {state.cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="space-y-6">
                    {state.cart.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="font-medium text-gray-900 hover:text-green-600 transition-colors"
                          >
                            {item.product.title}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                          <p className="text-sm text-gray-500">Sold by {item.product.sellerName}</p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-300">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-2 text-gray-900 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${item.product.price} each
                            </p>
                          </div>

                          <button
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-4 text-center">
                  <Link
                    to="/feed"
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Eco Benefits */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">🌱 Your Eco Impact</h3>
                  <div className="space-y-1 text-sm text-green-700">
                    <p>• Reducing waste by buying second-hand</p>
                    <p>• Saving ~{(totalAmount * 0.3).toFixed(0)}kg CO₂</p>
                    <p>• Earning {Math.floor(totalAmount / 10)} eco-points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">
                Discover amazing second-hand treasures and add them to your cart.
              </p>
              <Link
                to="/feed"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;