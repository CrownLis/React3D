import { useLayoutEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

export const AuthRedirect = () => {
  const [, setToken] = useLocalStorage('access_token', import.meta.env.VITE_ACCESS_TOKEN);

  const parsedHash = new URLSearchParams(window.location.hash.slice(1));
  const token = parsedHash.get('access_token');

  useLayoutEffect(() => {
    if (!token) {
      return;
    }

    setToken(token);
  }, [token]);

  return <Navigate to="/" />;
};
