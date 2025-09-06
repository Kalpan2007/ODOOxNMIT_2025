import React, { useState } from 'react';
import { Calendar, Cookie, ArrowLeft, Settings, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cookies: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    personalization: true
  });

  const handlePreferenceChange = (type: string) => {
    if (type === 'essential') return; // Essential cookies can't be disabled
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  const savePreferences = () => {
    // In a real app, this would save to localStorage or send to server
    alert('Cookie preferences saved!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-amber-100 rounded-full">
              <Cookie className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Last updated: January 1, 2024</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              
              {/* Introduction */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Understanding Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  This Cookie Policy explains what cookies are, how EcoFinds uses them, and how you can 
                  control cookie preferences. By using our website, you agree to the use of cookies as 
                  described in this policy.
                </p>
              </div>

              {/* What are cookies */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What Are Cookies?</h3>
                <p className="text-gray-600 mb-4">
                  Cookies are small text files that are stored on your device when you visit a website. 
                  They help websites remember your preferences, login status, and other information to 
                  improve your browsing experience.
                </p>
                <p className="text-gray-600">
                  Cookies cannot harm your device and don't contain personal information like your name 
                  or address unless you specifically provide that information.
                </p>
              </section>

              {/* Types of cookies */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h3>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-red-400 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies (Required)</h4>
                    <p className="text-gray-600 mb-2">
                      These cookies are necessary for the website to function properly. They enable core 
                      functionality like security, network management, and accessibility.
                    </p>
                    <p className="text-sm text-gray-500">Examples: Login sessions, security tokens, load balancing</p>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
                    <p className="text-gray-600 mb-2">
                      These cookies help us understand how visitors interact with our website by collecting 
                      and reporting information anonymously.
                    </p>
                    <p className="text-sm text-gray-500">Examples: Google Analytics, page views, user behavior</p>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Personalization Cookies</h4>
                    <p className="text-gray-600 mb-2">
                      These cookies remember your preferences and choices to provide a more personalized 
                      experience when you return to our website.
                    </p>
                    <p className="text-sm text-gray-500">Examples: Language preferences, theme settings, saved filters</p>
                  </div>

                  <div className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Marketing Cookies</h4>
                    <p className="text-gray-600 mb-2">
                      These cookies track visitors across websites to build a profile of interests and 
                      show relevant advertisements.
                    </p>
                    <p className="text-sm text-gray-500">Examples: Social media pixels, advertising networks</p>
                  </div>
                </div>
              </section>

              {/* Third-party cookies */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Third-Party Cookies</h3>
                <p className="text-gray-600 mb-4">
                  Some cookies are placed by third-party services that appear on our website:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                  <li><strong>Google Analytics:</strong> Website usage analytics</li>
                  <li><strong>Payment Processors:</strong> Secure payment handling</li>
                  <li><strong>Social Media:</strong> Social sharing and login features</li>
                  <li><strong>Customer Support:</strong> Live chat and help desk tools</li>
                </ul>
              </section>

              {/* Managing cookies */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Managing Your Cookies</h3>
                <div className="space-y-4 text-gray-600">
                  <p>You can control cookies in several ways:</p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Browser Settings</h4>
                    <p className="mb-2">Most browsers allow you to:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>View and delete cookies</li>
                      <li>Block cookies from specific websites</li>
                      <li>Block third-party cookies</li>
                      <li>Clear all cookies when you close the browser</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Our Cookie Preferences</h4>
                    <p>Use the cookie preference panel on the right to customize your settings for this website.</p>
                  </div>
                </div>
              </section>

              {/* Impact of disabling */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Impact of Disabling Cookies</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 mb-2">
                    <strong>Please note:</strong> Disabling certain cookies may affect website functionality:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-amber-700 text-sm">
                    <li>You may need to log in repeatedly</li>
                    <li>Your preferences won't be remembered</li>
                    <li>Some features may not work properly</li>
                    <li>You may see less relevant content</li>
                  </ul>
                </div>
              </section>

              {/* Updates */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Updates to This Policy</h3>
                <p className="text-gray-600">
                  We may update this Cookie Policy from time to time. Any changes will be posted on this page 
                  with an updated revision date. We encourage you to review this policy periodically.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions About Cookies?</h3>
                <p className="text-gray-600 mb-4">
                  If you have questions about our use of cookies, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">Email: privacy@ecofinds.com</p>
                  <p className="text-gray-600">Phone: 1-800-ECO-FIND</p>
                </div>
              </section>
            </div>
          </div>

          {/* Cookie Preferences Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Cookie Preferences</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Essential</span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={preferences.essential}
                        disabled
                        className="sr-only"
                      />
                      <div className="w-11 h-6 bg-green-600 rounded-full shadow-inner">
                        <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-6 transition-transform duration-200 ease-in-out mt-1"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Required for basic website functionality</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Analytics</span>
                    <button
                      onClick={() => handlePreferenceChange('analytics')}
                      className="relative focus:outline-none"
                    >
                      <div className={`w-11 h-6 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
                        preferences.analytics ? 'bg-green-600' : 'bg-gray-300'
                      }`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out mt-1 ${
                          preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                        }`}></div>
                      </div>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">Help us improve the website</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Personalization</span>
                    <button
                      onClick={() => handlePreferenceChange('personalization')}
                      className="relative focus:outline-none"
                    >
                      <div className={`w-11 h-6 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
                        preferences.personalization ? 'bg-green-600' : 'bg-gray-300'
                      }`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out mt-1 ${
                          preferences.personalization ? 'translate-x-6' : 'translate-x-1'
                        }`}></div>
                      </div>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">Remember your preferences</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Marketing</span>
                    <button
                      onClick={() => handlePreferenceChange('marketing')}
                      className="relative focus:outline-none"
                    >
                      <div className={`w-11 h-6 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
                        preferences.marketing ? 'bg-green-600' : 'bg-gray-300'
                      }`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out mt-1 ${
                          preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                        }`}></div>
                      </div>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">Personalized ads and content</p>
                </div>
              </div>

              <button
                onClick={savePreferences}
                className="w-full mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Preferences
              </button>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Changes will take effect on your next visit. Clear your browser 
                  cache to apply changes immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;