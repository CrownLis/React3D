import { Navigate } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

export const PrivateRoute = ({ component: RouteComponent }) => {
  const [token] = useLocalStorage('access_token', import.meta.env.VITE_ACCESS_TOKEN);

  const isAuthenticated = !!token;

  if (isAuthenticated) {
    return <RouteComponent />;
  }

  return <Navigate to="/auth" />;
};
