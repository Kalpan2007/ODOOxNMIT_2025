import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, ShoppingBag, Leaf, Eye, Star } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import ProductCard from '../components/ProductCard';

const Dashboard: React.FC = () => {
  const { state, loadProducts, loadPurchases } = useApp();
  const dataLoaded = useRef(false);

  useEffect(() => {
    if (state.user && !dataLoaded.current) {
      dataLoaded.current = true;
      loadProducts();
      loadPurchases();
    }
  }, [state.user]);

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your dashboard</h1>
          <Link to="/login" className="text-green-600 hover:text-green-700">Go to Login</Link>
        </div>
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const userListings = Array.isArray(state.products) ? state.products.filter(product => product.userId === state.user?._id) : [];
  const recentProducts = Array.isArray(state.products) ? state.products.slice(0, 3) : [];

  const stats = [
    {
      name: 'Products Listed',
      value: userListings.length,
      icon: TrendingUp,
      color: 'bg-blue-500'
    },
    {
      name: 'Items Purchased',
      value: Array.isArray(state.purchases) ? state.purchases.length : 0,
      icon: ShoppingBag,
      color: 'bg-green-500'
    },
    {
      name: 'Eco Points',
      value: state.user?.ecoPoints || 0,
      icon: Leaf,
      color: 'bg-emerald-500'
    },
    {
      name: 'Profile Views',
      value: 42,
      icon: Eye,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {state.user.username}! 🌱
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your sustainable marketplace activity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/add-product"
              className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors group"
            >
              <Plus className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform" />
              <div className="ml-3">
                <h3 className="font-medium text-green-900">List New Item</h3>
                <p className="text-sm text-green-600">Sell something you no longer need</p>
              </div>
            </Link>

            <Link
              to="/feed"
              className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors group"
            >
              <Eye className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
              <div className="ml-3">
                <h3 className="font-medium text-blue-900">Browse Items</h3>
                <p className="text-sm text-blue-600">Find your next treasure</p>
              </div>
            </Link>

            <Link
              to="/my-listings"
              className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors group"
            >
              <Star className="h-8 w-8 text-purple-600 group-hover:scale-110 transition-transform" />
              <div className="ml-3">
                <h3 className="font-medium text-purple-900">My Listings</h3>
                <p className="text-sm text-purple-600">Manage your products</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Products */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Products</h2>
              <Link to="/feed" className="text-sm text-green-600 hover:text-green-700">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentProducts.length > 0 ? (
                recentProducts.map((product) => (
                  <div key={product._id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{product.title}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <p className="text-lg font-bold text-green-600">${product.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No products available</p>
              )}
            </div>
          </div>

          {/* Eco Impact */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Eco Impact</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-green-900">CO₂ Saved</h3>
                  <p className="text-sm text-green-600">By buying second-hand</p>
                </div>
                <p className="text-2xl font-bold text-green-600">12.5 kg</p>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-blue-900">Items Rescued</h3>
                  <p className="text-sm text-blue-600">Saved from landfill</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">{(Array.isArray(state.purchases) ? state.purchases.length : 0) + userListings.length}</p>
              </div>

              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-yellow-900">Money Saved</h3>
                  <p className="text-sm text-yellow-600">Compared to buying new</p>
                </div>
                <p className="text-2xl font-bold text-yellow-600">$230</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;