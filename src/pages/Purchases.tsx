import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, Star, Eye } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Purchases: React.FC = () => {
  const { state } = useApp();

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your purchases</h1>
          <Link to="/login" className="text-green-600 hover:text-green-700">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Purchase History</h1>
          <p className="text-gray-600">
            Track all your sustainable shopping adventures
          </p>
        </div>

        {/* Stats */}
        {state.purchases.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{state.purchases.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${state.purchases.reduce((sum, purchase) => sum + purchase.total, 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Eye className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Items Purchased</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {state.purchases.reduce((sum, purchase) => 
                      sum + purchase.products.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Eco Points Earned</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {state.purchases.reduce((sum, purchase) => sum + purchase.ecoPointsGained, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Purchase History */}
        {state.purchases.length > 0 ? (
          <div className="space-y-6">
            {state.purchases
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((purchase) => (
                <div key={purchase.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #ECO-{purchase.id}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(purchase.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Package className="h-4 w-4" />
                          <span>{purchase.products.reduce((total, item) => total + item.quantity, 0)} items</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4" />
                          <span>+{purchase.ecoPointsGained} eco-points</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 text-right">
                      <p className="text-2xl font-bold text-gray-900">${purchase.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">Total paid</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {purchase.products.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
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
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-green-600">
                          🌱 Saved {(purchase.total * 0.3).toFixed(1)}kg CO₂
                        </span>
                        <span className="text-sm text-blue-600">
                          💰 Saved ${(purchase.total * 0.4).toFixed(0)} vs buying new
                        </span>
                      </div>
                      <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                        View Receipt
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h3>
              <p className="text-gray-500 mb-6">
                Start your sustainable shopping journey by browsing our marketplace.
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

export default Purchases;