import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const tokenCookie = cookies.find(cookie => cookie.startsWith('jwtToken='));

    console.log('cookies', cookies)

    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      setIsAuthenticated(true);
    } else {
      // Redirect to the login page if the token cookie is not found
      navigate('/login');
    }
  }, [navigate]);

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthWrapper;

