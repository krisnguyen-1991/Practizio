import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BrowsePage = () => {
  const { currentUser, signOut } = useAuth();
  const [practices, setPractices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Single practice about "Tell me about"
  useEffect(() => {
    const loadPractices = async () => {
      setLoading(true);
      try {
        // Only one practice for now
        const practice = [
          {
            id: 'tell-me-about',
            title: 'Tell Me About',
            description: 'Learn how to transform closed questions into open-ended "Tell me about..." statements',
            category: 'conversation',
            estimatedTime: '10 min',
            question: 'Tell me about your family'
          }
        ];
        
        setPractices(practice);
      } catch (err) {
        setError('Failed to load practices. Please try again.');
        console.error('Error loading practices:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPractices();
  }, []);

  // No filtering needed for single practice
  const filteredPractices = practices;

  const handleStartPractice = (practiceId) => {
    // Navigate to lesson page with practice ID
    window.location.href = `/lesson/${practiceId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-practizio-beige to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-practizio-navy hover:text-practizio-coral transition">
            Practizio
          </Link>
          <nav className="flex items-center space-x-8">
            {currentUser ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-practizio-navy transition"
                >
                  <div className="w-8 h-8 bg-practizio-coral rounded-full flex items-center justify-center text-white font-semibold">
                    {currentUser?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="font-medium hidden md:inline">{currentUser?.email?.split('@')[0] || 'User'}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{currentUser?.email || 'User'}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-practizio-coral text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition font-medium">
                  Login
                </button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-practizio-navy mb-3">
            Practice
          </h1>
          <p className="text-lg text-gray-600">
            Learn how to transform questions into engaging conversations
          </p>
        </div>


        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-practizio-coral border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading practices...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Practices Grid */}
        {!loading && !error && (
          <>
            {filteredPractices.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 mb-2">No practices found</p>
                <p className="text-gray-500">Try adjusting your search or filter</p>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                {filteredPractices.map((practice) => (
                  <div
                    key={practice.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
                  >
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-practizio-coral bg-opacity-10 text-practizio-coral rounded-full text-xs font-semibold">
                        Conversation Skills
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-practizio-navy mb-2">
                      {practice.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 text-sm">
                      {practice.description}
                    </p>

                    {/* Example Question */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Example:</p>
                      <p className="text-sm font-medium text-practizio-navy">
                        {practice.question}
                      </p>
                    </div>


                    {/* Start Button */}
                    <button
                      onClick={() => handleStartPractice(practice.id)}
                      className="w-full bg-practizio-coral text-white px-6 py-3 rounded-full hover:bg-practizio-orange transition font-semibold"
                    >
                      Start Practice
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
};

export default BrowsePage;
