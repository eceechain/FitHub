import {Navigate, Outlet, useLocation} from 'react-router-dom';
import { useAuthContext } from './App';


const AuthRequired = () => {
  const location = useLocation();
  const {isAuthenticated} = useAuthContext();

  return !isAuthenticated ? (
    <Navigate to="/account/login" state={{from: location}} replace />
  ) : (
    <Outlet />
  );
};

<<<<<<< HEAD
export default AuthRequired;
=======
export default AuthRequired;
>>>>>>> 1b176b92d18bdca31ac2c65743d52f5e83ebfdec
