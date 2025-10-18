import { createContext, useContext, useState, useEffect } from 'react';
import { gun, user, SEA } from '../lib/gun';

const GunAuthContext = createContext();

export const useGunAuth = () => {
  const context = useContext(GunAuthContext);
  if (!context) {
    throw new Error('useGunAuth must be used within GunAuthProvider');
  }
  return context;
};

export const GunAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      // Gun.js automatically restores session from localStorage
      // Try to recall session (this is async but might not callback)
      user.recall({ sessionStorage: false });
      
      // Check immediately if user is already authenticated
      setTimeout(() => {
        const existingUser = user.is;
        if (existingUser) {
          setCurrentUser(existingUser);
          loadUserProfile(existingUser.pub);
        }
        setLoading(false);
      }, 500); // Wait 500ms for Gun to restore session
    };
    checkAuth();
  }, []);

  // Load user profile from Gun
  const loadUserProfile = (publicKey) => {
    gun.get('users').get(publicKey).on((profile) => {
      if (profile) {
        setUserProfile(profile);
      }
    });
  };

  // Register new user (P2P)
  const register = async (username, password, profile) => {
    return new Promise((resolve, reject) => {
      user.create(username, password, (ack) => {
        if (ack.err) {
          reject(new Error(ack.err));
        } else {
          // Login after registration
          user.auth(username, password, async (authAck) => {
            if (authAck.err) {
              reject(new Error(authAck.err));
            } else {
              const userPub = user.is.pub;
              
              // Save user profile to Gun
              const userProfile = {
                ...profile,
                username,
                publicKey: userPub,
                createdAt: Date.now(),
              };
              
              gun.get('users').get(userPub).put(userProfile);
              
              setCurrentUser(user.is);
              setUserProfile(userProfile);
              resolve(userProfile);
            }
          });
        }
      });
    });
  };

  // Login user (P2P)
  const login = async (username, password) => {
    return new Promise((resolve, reject) => {
      user.auth(username, password, (ack) => {
        if (ack.err) {
          reject(new Error(ack.err));
        } else {
          const userPub = user.is.pub;
          setCurrentUser(user.is);
          loadUserProfile(userPub);
          resolve(user.is);
        }
      });
    });
  };

  // Logout
  const logout = () => {
    user.leave();
    setCurrentUser(null);
    setUserProfile(null);
  };

  // Update profile
  const updateProfile = async (updates) => {
    if (!currentUser) throw new Error('Not authenticated');
    
    const userPub = user.is.pub;
    gun.get('users').get(userPub).put(updates);
    
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    register,
    login,
    logout,
    updateProfile,
  };

  return (
    <GunAuthContext.Provider value={value}>
      {children}
    </GunAuthContext.Provider>
  );
};
