import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Compass } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-9xl font-bold text-green-200 select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-4 bg-green-100 rounded-full">
                <Compass className="h-12 w-12 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The page you're looking for seems to have wandered off into the sustainable wilderness. 
            Don't worry, we'll help you find your way back!
          </p>
        </div>

        {/* Suggestions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Here's what you can do:</h2>
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Check if the URL is typed correctly</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Go back to the previous page</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Browse our sustainable marketplace</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Search for eco-friendly products</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>

          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>

          <Link
            to="/feed"
            className="inline-flex items-center space-x-2 px-6 py-3 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
          >
            <Search className="h-4 w-4" />
            <span>Browse Products</span>
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-12 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-700">
            Still can't find what you're looking for?{' '}
            <Link to="/support" className="font-medium text-green-800 hover:text-green-900 underline">
              Contact our support team
            </Link>{' '}
            and we'll help you out! 🌱
          </p>
        </div>

        {/* Fun Fact */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            💡 <strong>Did you know?</strong> While you're here, over 2.12 billion tons of waste 
            are produced globally each year. By shopping second-hand on EcoFinds, you're helping 
            reduce that number!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;