import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingFlow from './pages/OnboardingFlow';
import Dashboard from './pages/Dashboard';
import ChatInterface from './pages/ChatInterface';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/onboarding" element={<OnboardingFlow />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<ChatInterface />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;