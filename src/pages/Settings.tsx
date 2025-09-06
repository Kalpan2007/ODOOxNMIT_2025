import React, { useState } from 'react';
import { ArrowLeft, Moon, Sun, Globe, Bell, Shield, Trash2, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [settings, setSettings] = useState({
    darkMode: false,
    language: 'en',
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    sustainabilityTips: true,
    twoFactorAuth: false,
    publicProfile: true,
    showEcoPoints: true,
    autoSave: true
  });

  const handleToggle = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleLanguageChange = (language: string) => {
    setSettings(prev => ({
      ...prev,
      language
    }));
  };

  const handleExportData = () => {
    // In a real app, this would trigger a data export
    alert('Your data export will be sent to your email within 24 hours.');
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data, listings, and purchase history.'
    );
    
    if (confirmed) {
      const doubleConfirm = window.confirm(
        'This is your final warning. Deleting your account will:\n\n' +
        '• Remove all your listings permanently\n' +
        '• Delete your purchase history\n' +
        '• Cancel any pending transactions\n' +
        '• Remove your eco-points and achievements\n\n' +
        'Type "DELETE" in the next prompt if you really want to proceed.'
      );
      
      if (doubleConfirm) {
        const deleteConfirmation = prompt('Type DELETE to confirm account deletion:');
        if (deleteConfirmation === 'DELETE') {
          dispatch({ type: 'SET_USER', payload: null });
          navigate('/');
        }
      }
    }
  };

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access settings</h1>
          <button
            onClick={() => navigate('/login')}
            className="text-green-600 hover:text-green-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Customize your EcoFinds experience and manage your account preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                {settings.darkMode ? <Moon className="h-5 w-5 text-purple-600" /> : <Sun className="h-5 w-5 text-purple-600" />}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Appearance</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Dark Mode</h3>
                  <p className="text-sm text-gray-500">Switch to dark theme for better night viewing</p>
                </div>
                <button
                  onClick={() => handleToggle('darkMode')}
                  className="relative focus:outline-none"
                >
                  <div className={`w-11 h-6 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
                    settings.darkMode ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out mt-1 ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Language</h3>
                  <p className="text-sm text-gray-500">Choose your preferred language</p>
                </div>
                <select
                  value={settings.language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="it">Italiano</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive important updates via email</p>
                </div>
                <button
                  onClick={() => handleToggle('emailNotifications')}
                  className="relative focus:outline-none"
                >
                  <div className={`w-11 h-6 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
                    settings.emailNotifications ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out mt-1 ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Push Notifications</h3>
                  <p className="text-sm text-gray-500">Get instant notifications on your device</p>
                </div>
                <button
                  onClick={() => handleToggle('pushNotifications')}
                  className="relative focus:outline-none"
                >
                  <div className={`w-11 h-6 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
                    settings.pushNotifications ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out mt-1 ${
                      settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                  <p className="text-sm text-gray-500">Receive promotional content and updates</p>
                </div>
                <button
                  onClick={() => handleToggle('marketingEmails')}
                  className="relative focus:outline-none"
                >
                  <div className={`w-11 h-6 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
                    settings.marketingEmails ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out mt-1 ${
                      settings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Sustainability Tips</h3>
                  <p className="text-sm text-gray-500">Weekly tips for eco-friendly living</p>
                </div>
                <button
                  onClick={() => handleToggle('sustainabilityTips')}
                  className="relative focus:outline-none"
                >
                  <div className={`w-11 h-6 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
                    settings.sustainabilityTips ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out mt-1 ${
                      settings.sustainabilityTips ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Privacy</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <button
                  onClick={() => handleToggle('twoFactorAuth')}
                  className="relative focus:outline-none"
                >
                  <div className={`w-11 h-6 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
                    settings.twoFactorAuth ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out mt-1 ${
                      settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Public Profile</h3>
                  <p className="text-sm text-gray-500">Allow other users to view your profile</p>
                </div>
                <button
                  onClick={() => handleToggle('publicProfile')}
                  className="relative focus:outline-none"
                >
                  <div className={`w-11 h-6 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
                    settings.publicProfile ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out mt-1 ${
                      settings.publicProfile ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Show Eco-Points</h3>
                  <p className="text-sm text-gray-500">Display your eco-points on your profile</p>
                </div>
                <button
                  onClick={() => handleToggle('showEcoPoints')}
                  className="relative focus:outline-none"
                >
                  <div className={`w-11 h-6 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
                    settings.showEcoPoints ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out mt-1 ${
                      settings.showEcoPoints ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Globe className="h-5 w-5 text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Account</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Auto-save Drafts</h3>
                  <p className="text-sm text-gray-500">Automatically save your listing drafts</p>
                </div>
                <button
                  onClick={() => handleToggle('autoSave')}
                  className="relative focus:outline-none"
                >
                  <div className={`w-11 h-6 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
                    settings.autoSave ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out mt-1 ${
                      settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </div>
                </button>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Data Export</h3>
                    <p className="text-sm text-gray-500">Download all your account data</p>
                  </div>
                  <button
                    onClick={handleExportData}
                    className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export Data</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-red-900">Danger Zone</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-medium text-red-900 mb-2">Delete Account</h3>
                <p className="text-sm text-red-700 mb-4">
                  Once you delete your account, there is no going back. This will permanently delete 
                  your profile, listings, purchase history, and all associated data.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>

          {/* Save Settings Button */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Save Settings</h3>
                <p className="text-sm text-gray-500">Your preferences are saved automatically</p>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">All changes saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;