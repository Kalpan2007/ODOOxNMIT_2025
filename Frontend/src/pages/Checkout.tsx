import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, Truck } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Checkout: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const totalItems = state.cart.reduce((total, item) => total + item.quantity, 0);
  const ecoPointsToGain = Math.floor(totalAmount / 10);

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const purchase = {
        id: Date.now().toString(),
        products: [...state.cart],
        total: totalAmount,
        date: new Date().toISOString(),
        ecoPointsGained: ecoPointsToGain
      };

      dispatch({ type: 'ADD_PURCHASE', payload: purchase });
      dispatch({ type: 'CLEAR_CART' });
      
      navigate('/purchase-success');
      setIsProcessing(false);
    }, 2000);
  };

  if (!state.user || state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <button
            onClick={() => navigate('/feed')}
            className="text-green-600 hover:text-green-700"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {state.cart.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{item.product.title}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t mt-6 pt-6 space-y-2">
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
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Eco Benefits */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">🌱 Your Eco Impact</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">{ecoPointsToGain}</p>
                  <p className="text-sm text-green-700">Eco-points earned</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{(totalAmount * 0.3).toFixed(0)}kg</p>
                  <p className="text-sm text-green-700">CO₂ saved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
              
              {/* Mock Payment Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      defaultValue="4242 4242 4242 4242"
                      disabled
                    />
                    <CreditCard className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      defaultValue="12/25"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      defaultValue="123"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    defaultValue={state.user.username}
                    disabled
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-gray-600">
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="h-5 w-5 text-green-600" />
                  <h3 className="font-medium text-gray-900">Free Shipping</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Estimated delivery: 3-5 business days
                </p>
              </div>

              {/* Confirm Purchase Button */}
              <button
                onClick={handleConfirmPurchase}
                disabled={isProcessing}
                className="w-full mt-6 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Purchase...
                  </div>
                ) : (
                  `Confirm Purchase - $${totalAmount.toFixed(2)}`
                )}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By confirming this purchase, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;