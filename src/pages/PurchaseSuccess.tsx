import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Package, Star, Leaf } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const PurchaseSuccess: React.FC = () => {
  const { state } = useApp();
  const navigate = useNavigate();

  const latestPurchase = state.purchases[state.purchases.length - 1];

  if (!latestPurchase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No recent purchases found</h1>
          <Link to="/feed" className="text-green-600 hover:text-green-700">Start Shopping</Link>
        </div>
      </div>
    );
  }

  const totalItems = latestPurchase.products.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Purchase Successful! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your sustainable shopping choice!
          </p>

          {/* Purchase Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8 text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Order Total</h3>
                <p className="text-2xl font-bold text-gray-900">${latestPurchase.total.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{totalItems} items</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Eco-Points Earned</h3>
                <p className="text-2xl font-bold text-green-600">+{latestPurchase.ecoPointsGained}</p>
                <p className="text-sm text-gray-500">Added to your account</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Leaf className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">CO₂ Saved</h3>
                <p className="text-2xl font-bold text-emerald-600">{(latestPurchase.total * 0.3).toFixed(1)}kg</p>
                <p className="text-sm text-gray-500">vs buying new</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Items Purchased</h3>
              <div className="space-y-4">
                {latestPurchase.products.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900">{item.product.title}</h4>
                      <p className="text-sm text-gray-500">{item.product.category}</p>
                      <p className="text-sm text-gray-500">Sold by {item.product.sellerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Eco Impact Message */}
          <div className="bg-green-50 rounded-lg p-8 mb-8 border border-green-200">
            <h2 className="text-2xl font-bold text-green-900 mb-4">
              You Made a Difference! 🌱
            </h2>
            <p className="text-green-700 text-lg mb-4">
              By choosing second-hand, you've helped reduce waste and carbon emissions. 
              Your sustainable choice contributes to a better planet for everyone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-4">
                <p className="text-3xl font-bold text-green-600">{totalItems}</p>
                <p className="text-sm text-green-700">Items saved from landfill</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-3xl font-bold text-green-600">${(latestPurchase.total * 0.4).toFixed(0)}</p>
                <p className="text-sm text-green-700">Money saved vs new</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-3xl font-bold text-green-600">{Math.floor(latestPurchase.total / 5)}</p>
                <p className="text-sm text-green-700">Trees equivalent saved</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Go to Dashboard</span>
            </Link>
            
            <Link
              to="/purchases"
              className="inline-flex items-center space-x-2 px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Package className="w-5 h-5" />
              <span>View All Purchases</span>
            </Link>
            
            <Link
              to="/feed"
              className="inline-flex items-center space-x-2 px-8 py-3 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Order Number */}
          <div className="mt-8 text-sm text-gray-500">
            Order #ECO-{latestPurchase.id} • {new Date(latestPurchase.date).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;