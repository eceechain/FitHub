import {Navigate, Outlet, useLocation} from 'react-router-dom';
import { useAuthContext } from './App';


const AuthRequired = () => {
  const location = useLocation();
  const {isAuthenticated, setIsAuthenticated} = useAuthContext();

  return !isAuthenticated ? (
    <Navigate to="/account/login" state={{from: location}} replace />
  ) : (
    <Outlet />
  );
};

export default AuthRequired;