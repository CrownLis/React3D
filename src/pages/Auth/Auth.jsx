import { useLayoutEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

export const Auth = () => {
  const [token] = useLocalStorage('access_token', import.meta.env.VITE_ACCESS_TOKEN);

  const isAuthenticated = !!token;

  useLayoutEffect(() => {
    if (isAuthenticated) {
      return;
    }

    window.location.href =
      'https://oauth.yandex.ru/authorize?response_type=token&client_id=eacca3682f374561b43cfc4991784ea7';
  }, [isAuthenticated]);

  return isAuthenticated ? <Navigate to="/" /> : <div />;
};
