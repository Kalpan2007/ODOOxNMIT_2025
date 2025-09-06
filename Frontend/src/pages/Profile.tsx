import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Star, Edit, Settings, Award, RefreshCw } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Profile: React.FC = () => {
  const { state, loadUserProfile, loadUserProducts, loadPurchases } = useApp();
  const dataLoaded = useRef(false);

  const handleRefresh = () => {
    dataLoaded.current = false;
    loadUserProducts();
    loadPurchases();
  };

  useEffect(() => {
    if (state.user && !state.loading && !dataLoaded.current) {
      dataLoaded.current = true;
      loadUserProducts();
      loadPurchases();
    }
  }, [state.user]); // Remove the function dependencies to prevent infinite loop

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h1>
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
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const userStats = {
    itemsListed: Array.isArray(state.products) ? state.products.filter(p => p.userId === state.user?._id).length : 0,
    itemsPurchased: Array.isArray(state.purchases) ? state.purchases.length : 0,
    totalSpent: Array.isArray(state.purchases) ? state.purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0) : 0,
    totalEarned: Array.isArray(state.products) 
      ? state.products
          .filter(p => p.userId === state.user?._id)
          .reduce((sum, product) => sum + product.price, 0) * 0.1 // Assume 10% are sold
      : 0
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                {state.user.avatar ? (
                  <img
                    src={state.user.avatar}
                    alt={state.user.username}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-green-600" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {state.user.username}
                </h1>
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <Mail className="h-4 w-4" />
                  <span>{state.user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-600">
                    {state.user.ecoPoints} Eco-Points
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleRefresh}
                disabled={state.loading}
                className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${state.loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <Link
                to="/edit-profile"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </Link>
              <Link
                to="/settings"
                className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{userStats.itemsListed}</p>
              <p className="text-sm text-gray-500">Items Listed</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{userStats.itemsPurchased}</p>
              <p className="text-sm text-gray-500">Items Purchased</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${userStats.totalSpent.toFixed(0)}</p>
              <p className="text-sm text-gray-500">Total Spent</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">${userStats.totalEarned.toFixed(0)}</p>
              <p className="text-sm text-gray-500">Estimated Earned</p>
            </div>
          </div>
        </div>

        {/* Eco Impact */}
        <div className="bg-green-50 rounded-lg border border-green-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-green-900 mb-4">Your Eco Impact 🌱</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {((userStats.itemsPurchased + userStats.itemsListed) * 2.5).toFixed(1)}kg
              </p>
              <p className="text-sm text-green-700">CO₂ Saved</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {userStats.itemsPurchased + userStats.itemsListed}
              </p>
              <p className="text-sm text-green-700">Items Rescued from Landfill</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {Math.floor((userStats.totalSpent + userStats.totalEarned) / 20)}
              </p>
              <p className="text-sm text-green-700">Trees Equivalent Saved</p>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievement Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-xl">🌱</span>
              </div>
              <p className="font-medium text-yellow-900">Eco Newbie</p>
              <p className="text-xs text-yellow-700">First purchase made</p>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-xl">♻️</span>
              </div>
              <p className="font-medium text-green-900">Recycler</p>
              <p className="text-xs text-green-700">5+ items purchased</p>
            </div>

            <div className={`text-center p-4 rounded-lg border ${
              userStats.itemsListed > 0 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                userStats.itemsListed > 0 ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <span className="text-xl">🏪</span>
              </div>
              <p className={`font-medium ${userStats.itemsListed > 0 ? 'text-blue-900' : 'text-gray-500'}`}>
                Seller
              </p>
              <p className={`text-xs ${userStats.itemsListed > 0 ? 'text-blue-700' : 'text-gray-500'}`}>
                {userStats.itemsListed > 0 ? 'First item listed' : 'List your first item'}
              </p>
            </div>

            <div className={`text-center p-4 rounded-lg border ${
              state.user.ecoPoints >= 100 ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                state.user.ecoPoints >= 100 ? 'bg-purple-100' : 'bg-gray-100'
              }`}>
                <span className="text-xl">⭐</span>
              </div>
              <p className={`font-medium ${state.user.ecoPoints >= 100 ? 'text-purple-900' : 'text-gray-500'}`}>
                Point Collector
              </p>
              <p className={`text-xs ${state.user.ecoPoints >= 100 ? 'text-purple-700' : 'text-gray-500'}`}>
                {state.user.ecoPoints >= 100 ? '100+ eco-points' : `${100 - state.user.ecoPoints} more to go`}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/my-listings"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-gray-900 mb-2">Manage Listings</h3>
              <p className="text-sm text-gray-600">View and edit your products</p>
            </Link>

            <Link
              to="/purchases"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-gray-900 mb-2">Purchase History</h3>
              <p className="text-sm text-gray-600">View all your orders</p>
            </Link>

            <Link
              to="/add-product"
              className="p-4 border border-green-200 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <h3 className="font-medium text-green-900 mb-2">List New Item</h3>
              <p className="text-sm text-green-700">Start selling today</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;