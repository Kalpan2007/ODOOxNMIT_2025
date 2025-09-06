import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, ShoppingCart, User, Search, Home, Package, Settings } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, logoutUser } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    setIsOpen(false);
  };

  const cartItemsCount = Array.isArray(state.cart) ? state.cart.reduce((total, item) => total + item.quantity, 0) : 0;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <span className="font-bold text-xl text-gray-800">EcoFinds</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {state.user && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/feed" 
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/feed') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                  }`}
                >
                  <Search className="h-4 w-4" />
                  <span>Browse</span>
                </Link>
                <Link 
                  to="/my-listings" 
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/my-listings') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                  }`}
                >
                  <Package className="h-4 w-4" />
                  <span>My Listings</span>
                </Link>
                <Link 
                  to="/cart" 
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    isActive('/cart') ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {state.user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{state.user.username}</p>
                    <p className="text-xs text-green-600">{state.user.ecoPoints} eco-points</p>
                  </div>
                </div>
                <Link 
                  to="/profile" 
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-green-100">
              {state.user ? (
                <>
                  <div className="px-3 py-2 border-b border-green-100 mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{state.user.username}</p>
                        <p className="text-sm text-green-600">{state.user.ecoPoints} eco-points</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/feed"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Browse Products
                  </Link>
                  <Link
                    to="/my-listings"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    My Listings
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Cart</span>
                    {cartItemsCount > 0 && (
                      <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile & Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 text-base font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;