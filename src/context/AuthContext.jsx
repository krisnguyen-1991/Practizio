import React, { createContext, useContext } from 'react';
import db from '../config/instantdb';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Use InstantDB's built-in auth hook
  const { isLoading, user, error } = db.useAuth();

  const signOut = () => {
    db.auth.signOut();
  };

  const value = {
    currentUser: user,
    loading: isLoading,
    error,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
