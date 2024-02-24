import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        {/* Dropdown for Features */}
        <div className="dropdown" onClick={toggleDropdown}>
          <button className="dropbtn">Features</button>
          {showDropdown && (
            <div className="dropdown-content">
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/workoutlogs">Workout Logs</NavLink>
              <NavLink to="/progress">Progress Tracking</NavLink>
              <NavLink to="/calories">Calories Tracking</NavLink>
              <NavLink to="/recommendations">Personalized Recommendations</NavLink>
              <NavLink to="/goalsetting">Goal Setting</NavLink>
              <NavLink to="/socialsharing">Social Sharing</NavLink>
              <NavLink to="/blog">Blog</NavLink>
            </div>
          )}
        </div>
      </div>
      <div className="auth-links">
        <NavLink to="/account/login">Login</NavLink>
        <NavLink to="/account/register">Register</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
