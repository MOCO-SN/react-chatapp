import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('chatapp_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('chatapp_user', JSON.stringify(userData));
  };

  const logout = async () => {
    if (user) {
      try {
        await api.logout(user.unique_id);
      } catch (e) {
        console.error('Logout error', e);
      }
    }
    setUser(null);
    localStorage.removeItem('chatapp_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
