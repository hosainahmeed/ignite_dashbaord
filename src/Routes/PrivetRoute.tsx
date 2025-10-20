import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode(token || '');
        if ('role' in decoded && decoded.role === 'superAdmin') {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <span className="loader-black"></span>
      </div>
    );
  }
  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
