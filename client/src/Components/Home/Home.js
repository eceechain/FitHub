// Home.js

import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="header-section">
        <div className="logo">
          <h1>FitHub</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#activities">Activities</a></li>
            <li><a href="#profile">Profile</a></li>
            {/* Add more links as needed */}
          </ul>
        </nav>
        <div className="search-bar">
          {/* Add your search bar component */}
        </div>
        <div className="authentication">
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      </header>

      {/* Other sections remain the same */}
    </div>
  );
}

export default Home;
