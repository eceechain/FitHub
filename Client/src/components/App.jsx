import React, {createContext, useContext} from 'react'
import { useState } from 'react';
import Dashboard from './Dashboard'

const AuthContext = createContext({
  isAuthenticated: false,
});

export const useAuthContext = () => useContext(AuthContext);

function App() {
  const  [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
    }}>
      <Dashboard />
    </AuthContext.Provider>
  )
}

export default App