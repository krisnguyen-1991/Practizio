import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import db from '../config/instantdb';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await db.auth.sendMagicCode({ email });
      setCodeSent(true);
      setError('');
    } catch (error) {
      console.error('Error sending magic code:', error);
      setError(getErrorMessage(error.message || error.body?.message));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await db.auth.signInWithMagicCode({ email, code });
      // Profile will be auto-created by useUserProfile hook
      navigate('/');
    } catch (error) {
      console.error('Error verifying code:', error);
      setError(getErrorMessage(error.message || error.body?.message));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorMessage) => {
    if (!errorMessage) return 'An error occurred. Please try again.';
    
    const message = errorMessage.toLowerCase();
    
    if (message.includes('invalid') && message.includes('email')) {
      return 'Invalid email address.';
    }
    if (message.includes('code') && (message.includes('invalid') || message.includes('incorrect'))) {
      return 'Invalid code. Please try again or request a new code.';
    }
    if (message.includes('expired')) {
      return 'Code has expired. Please request a new code.';
    }
    
    return errorMessage;
  };

  const handleBackToEmail = () => {
    setCodeSent(false);
    setCode('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-practizio-beige to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-3xl font-bold text-practizio-navy mb-2">Practizio</h1>
          </Link>
          <p className="text-gray-600">
            {codeSent ? 'Check your email' : 'Sign in to your account'}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {!codeSent ? (
            /* Email Form */
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800">
                  🔐 <strong>Passwordless Login</strong>
                  <br />
                  <span className="text-xs">Enter your email and we'll send you a magic code to sign in.</span>
                </p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-practizio-coral focus:border-transparent"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-practizio-coral text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Magic Code'}
              </button>
            </form>
          ) : (
            /* Verification Code Form */
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm text-green-800">
                  ✉️ <strong>Check your email!</strong>
                  <br />
                  <span className="text-xs">We sent a code to <strong>{email}</strong></span>
                </p>
              </div>

              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-practizio-coral focus:border-transparent text-center text-2xl tracking-widest font-mono"
                  placeholder="000000"
                  maxLength={6}
                  disabled={loading}
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || code.length < 6}
                className="w-full bg-practizio-coral text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify & Sign In'}
              </button>

              <button
                type="button"
                onClick={handleBackToEmail}
                className="w-full text-gray-600 hover:text-practizio-navy text-sm"
              >
                ← Use a different email
              </button>
            </form>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-practizio-navy text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
