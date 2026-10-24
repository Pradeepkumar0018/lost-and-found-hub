import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

const AuthContext = createContext();

const DEMO_USER = {
  id: 'usr-101',
  name: 'Rohan Sharma',
  email: 'rohan.sharma@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  isAdmin: true,
  reputation: {
    sightingsSubmitted: 4,
    itemsReturned: 2,
    badgeTier: 'Sharp Eye'
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => getStorageItem('laf_user', DEMO_USER));

  useEffect(() => {
    setStorageItem('laf_user', currentUser);
  }, [currentUser]);

  const login = (email, password) => {
    // Simulated instant login
    const user = {
      id: 'usr-' + Math.floor(100 + Math.random() * 900),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      phone: '+91 98765 12345',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      isAdmin: email.includes('admin'),
      reputation: {
        sightingsSubmitted: 1,
        itemsReturned: 0,
        badgeTier: 'First Helper'
      }
    };
    setCurrentUser(user);
    return user;
  };

  const register = (userData) => {
    const newUser = {
      id: 'usr-' + Math.floor(100 + Math.random() * 900),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
      isAdmin: false,
      reputation: {
        sightingsSubmitted: 0,
        itemsReturned: 0,
        badgeTier: 'First Helper'
      }
    };
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUserReputation = (type) => {
    if (!currentUser) return;
    setCurrentUser((prev) => {
      if (!prev) return null;
      const currentRep = prev.reputation || { sightingsSubmitted: 0, itemsReturned: 0, badgeTier: 'First Helper' };
      const newSightings = type === 'sighting' ? currentRep.sightingsSubmitted + 1 : currentRep.sightingsSubmitted;
      const newReturns = type === 'return' ? currentRep.itemsReturned + 1 : currentRep.itemsReturned;
      
      let badge = 'First Helper';
      if (newReturns >= 5) badge = '5 Items Returned';
      else if (newReturns >= 1) badge = 'Trusted Finder';
      else if (newSightings >= 3) badge = 'Sharp Eye';

      return {
        ...prev,
        reputation: {
          sightingsSubmitted: newSightings,
          itemsReturned: newReturns,
          badgeTier: badge
        }
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        updateUserReputation,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.isAdmin || false
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
