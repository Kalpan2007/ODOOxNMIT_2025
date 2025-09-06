import React from 'react';
import { Leaf, Users, Target, Heart, Recycle, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white bg-opacity-20 rounded-full">
                <Leaf className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About EcoFinds</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Connecting conscious consumers with sustainable treasures, one second-hand find at a time.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            To create a world where every item gets a second chance, where sustainable shopping is the norm, 
            and where communities come together to reduce waste while discovering amazing treasures.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Recycle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability First</h3>
            <p className="text-gray-600">
              Every purchase on EcoFinds contributes to reducing waste and minimizing environmental impact. 
              We believe in the power of circular economy.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Driven</h3>
            <p className="text-gray-600">
              Our marketplace thrives on the connections between buyers and sellers who share a common goal: 
              making the world more sustainable.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality & Trust</h3>
            <p className="text-gray-600">
              We ensure every transaction is safe, secure, and satisfying. Quality pre-loved items deserve 
              quality service and trust.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                EcoFinds was born from a simple observation: too many perfectly good items end up in landfills 
                while people continue buying new. We saw an opportunity to bridge this gap.
              </p>
              <p className="text-gray-600 mb-4">
                Founded in 2024, we started as a small team of environmental enthusiasts and tech innovators 
                who believed that technology could make sustainable living more accessible and rewarding.
              </p>
              <p className="text-gray-600">
                Today, we're proud to be part of a growing movement that's changing how people think about 
                consumption, ownership, and community impact.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Sustainable shopping"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-green-50 rounded-lg p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-900 mb-4">Our Impact So Far</h2>
            <p className="text-green-700">
              Together with our community, we're making a real difference for our planet.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <p className="text-4xl font-bold text-green-600 mb-2">15,000+</p>
              <p className="text-green-700">Items Rescued</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-white" />
              </div>
              <p className="text-4xl font-bold text-blue-600 mb-2">8,500+</p>
              <p className="text-blue-700">Happy Users</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Recycle className="h-8 w-8 text-white" />
              </div>
              <p className="text-4xl font-bold text-emerald-600 mb-2">12.5T</p>
              <p className="text-emerald-700">CO₂ Prevented</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-8 w-8 text-white" />
              </div>
              <p className="text-4xl font-bold text-yellow-600 mb-2">$2.3M</p>
              <p className="text-yellow-700">Money Saved</p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="text-center bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision for the Future</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            We envision a world where sustainable consumption is the default choice, where communities are connected 
            through shared values of environmental responsibility, and where every person has the power to make a 
            positive impact through their everyday choices.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600">
                Expanding our platform to connect conscious consumers worldwide.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Continuously improving our technology to make sustainable shopping easier.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
              <p className="text-gray-600">
                Empowering communities with knowledge about sustainable living practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;