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
      'https://oauth.yandex.ru/authorize?response_type=token&client_id=55d8cfdd366d481fa0fee2b4a917eac7';
  }, [isAuthenticated]);

  return isAuthenticated ? <Navigate to="/" /> : <div />;
};
