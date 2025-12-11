import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useUserProfile } from './hooks/useUserProfile';
import ConversationPage from './components/ConversationPage';
import BrowsePage from './components/BrowsePage';
import LessonPage from './components/LessonPage';
import PracticePage from './components/PracticePage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  // Automatically create user profile when user logs in
  useUserProfile();

  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <BrowsePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lesson/:practiceId" 
            element={
              <ProtectedRoute>
                <LessonPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/practice-session" 
            element={
              <ProtectedRoute>
                <PracticePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/about" element={<ConversationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

