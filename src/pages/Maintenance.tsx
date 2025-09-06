import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Clock, Mail, ArrowLeft } from 'lucide-react';

const Maintenance: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* Maintenance Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="h-16 w-16 text-green-600 animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-yellow-600 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Under Maintenance
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            We're making some eco-friendly improvements to serve you better!
          </p>
          <p className="text-gray-500">
            Our sustainable marketplace is temporarily offline while we plant some new features 
            and nurture our platform's growth. We'll be back shortly!
          </p>
        </div>

        {/* Status Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Estimated Downtime</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 mb-2">2-4 hours</p>
          <p className="text-sm text-gray-500">We're working around the clock to get back online</p>
        </div>

        {/* What's Being Improved */}
        <div className="bg-green-50 rounded-lg border border-green-200 p-6 mb-8">
          <h2 className="font-semibold text-green-900 mb-4">What We're Improving</h2>
          <div className="space-y-2 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-700 text-sm">Enhanced search functionality</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-700 text-sm">Better mobile experience</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-700 text-sm">Faster loading times</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-700 text-sm">New eco-impact tracking</span>
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-3">Planting seeds of innovation...</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Check Again
          </button>

          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Mail className="h-5 w-5 text-gray-600" />
            <span className="font-semibold text-gray-900">Need Immediate Help?</span>
          </div>
          <p className="text-gray-600 mb-4">
            Our support team is still available during maintenance
          </p>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">Email: support@ecofinds.com</p>
            <p className="text-gray-600">Phone: 1-800-ECO-FIND</p>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            🌍 <strong>Eco Fact:</strong> While we're offline, the fashion industry produces 
            20% of global wastewater. Every second-hand purchase helps reduce this impact!
          </p>
        </div>

        {/* Social Media */}
        <div className="mt-6">
          <p className="text-xs text-gray-500">
            Follow us for updates:{' '}
            <a href="#" className="text-green-600 hover:text-green-700">@EcoFinds</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;