import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthStatus = () => {
    const accessToken = localStorage.getItem('accessToken');
    const tokenExpire = localStorage.getItem('tokenExpire');
    const now = new Date();

    console.log("Текущее время:", now.toString());
    if (tokenExpire) {
      console.log("Срок действия токена истекает:", new Date(tokenExpire).toString());
    }

    if (!accessToken || !tokenExpire || new Date(tokenExpire) <= now) {
      console.log("Срок действия токена истек или токен не найден.");
      localStorage.removeItem('accessToken');
      localStorage.removeItem('tokenExpire');
      setIsLoggedIn(false);
    } else {
      console.log("Токен действителен.");
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};