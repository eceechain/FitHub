import React, {createContext, useContext, useState, useEffect} from 'react'
import Dashboard from './Dashboard'

const AuthContext = createContext({
  isAuthenticated: false,
});

export const useAuthContext = () => useContext(AuthContext);

function App() {
  const  [isAuthenticated, setIsAuthenticated] = useState(false);
  const  [accessToken, setAccessToken] = useState(localStorage.getItem('acess_token'));

  const saveAcessToken = (token) => {
    setAccessToken(token);
    localStorage.setItem('acess_token', token);
    setIsAuthenticated(true);
  };

  const removeAcessToken = () => {
    setAccessToken(null);
    localStorage.removeItem('acess_token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (accessToken) setIsAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      accessToken,
      setAccessToken,
      saveAcessToken,
      removeAcessToken
    }}>
      <Dashboard />
    </AuthContext.Provider>
  )
}

export default App