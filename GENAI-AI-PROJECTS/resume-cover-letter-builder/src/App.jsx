import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Navigation from './components/layout/Navigation';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import ResumeBuilder from './components/resume/ResumeBuilder';
import CoverLetterBuilder from './components/coverLetter/CoverLetterBuilder';
import LandingPage from './components/landing/LandingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Dashboard />
                    </ErrorBoundary>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resume"
                element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <ResumeBuilder />
                    </ErrorBoundary>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cover-letter"
                element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <CoverLetterBuilder />
                    </ErrorBoundary>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;