import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { config } from '../config/environment';
import { Chrome, Shield, Facebook, Loader2 } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const { error } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSocialLogin = async (provider: 'google' | 'microsoft' | 'facebook') => {
    try {
      setIsLoading(true);
      setLoadingProvider(provider);
      
      // Fetch the OAuth URL from the backend
      const response = await fetch(`${config.apiBaseUrl}/api/v1/auth/${provider}/login`);
      const { authUrl } = await response.json();
      
      // Redirect to the OAuth URL
      window.location.href = authUrl;
    } catch (error) {
      console.error('OAuth login error:', error);
      setIsLoading(false);
      setLoadingProvider(null);
      // You could also show an error message to the user here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>

        {/* Main Form */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Sign in with OAuth providers */}
          <div className="text-center mb-6">
            <p className="text-gray-600">Choose your preferred sign-in method</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-white/70 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingProvider === 'google' ? (
                <Loader2 className="w-5 h-5 animate-spin text-red-500" />
              ) : (
                <Chrome className="w-5 h-5 text-red-500" />
              )}
              <span>{loadingProvider === 'google' ? 'Connecting...' : 'Continue with Google'}</span>
            </button>

            <button
              onClick={() => handleSocialLogin('microsoft')}
              disabled={isLoading}
              className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-white/70 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingProvider === 'microsoft' ? (
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              ) : (
                <div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
              )}
              <span>{loadingProvider === 'microsoft' ? 'Connecting...' : 'Continue with Microsoft'}</span>
            </button>

            <button
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading}
              className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-white/70 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingProvider === 'facebook' ? (
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              ) : (
                <Facebook className="w-5 h-5 text-blue-600" />
              )}
              <span>{loadingProvider === 'facebook' ? 'Connecting...' : 'Continue with Facebook'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Protected by WhateverAPI Authentication System
          </p>
        </div>
      </div>
    </div>
  );
};