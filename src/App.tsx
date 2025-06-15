import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { Jokes } from './components/Jokes';
import { AuthCallback } from './components/AuthCallback';
import { ProtectedRoute } from './components/ProtectedRoute';

// Component to handle potential OAuth callbacks on root URL
const RootHandler: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuthStore();
  
  // Check if this is an OAuth callback with code or token
  const hasOAuthParams = searchParams.get('code') || searchParams.get('token') || searchParams.get('error');
  
  if (hasOAuthParams) {
    // Redirect to proper callback handler
    const queryString = searchParams.toString();
    return <Navigate to={`/auth/callback?${queryString}`} replace />;
  }
  
  // Normal root behavior
  return isAuthenticated ? 
    <Navigate to="/jokes" replace /> : 
    <Navigate to="/login" replace />;
};

function App() {
  const { checkAuthStatus, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/jokes" replace /> : <LoginForm />
          } 
        />
        
        <Route 
          path="/auth/callback" 
          element={<AuthCallback />} 
        />
        
        <Route 
          path="/jokes" 
          element={
            <ProtectedRoute>
              <Jokes />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Panel</h1>
                  <p className="text-gray-600">Welcome to the admin-only area!</p>
                </div>
              </div>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/" 
          element={<RootHandler />}
        />
        
        <Route 
          path="*" 
          element={
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">404 - Not Found</h1>
                <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                <button
                  onClick={() => window.location.href = '/jokes'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Go to Jokes
                </button>
              </div>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;