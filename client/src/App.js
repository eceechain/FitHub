// App.js

import React from 'react';
import './App.css';
import Home from './Components/Home/Home'; // Import your Home component

function App() {
  return (
    <div className="app">
      {/* Include your navigation bar, header, or any global components here */}
      <Home />
      {/* Include your footer or any global components here */}
    </div>
  );
}

export default App;
