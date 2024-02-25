import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" className="logo">
          FitnessHub
        </NavLink>
      </div>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {showSidebar ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`sidebar ${showSidebar ? 'active' : ''}`}>
        <div className="sidebar-links">
          <NavLink to="/dashboard" onClick={toggleSidebar}>Dashboard</NavLink>
          <NavLink to="/workoutlogs" onClick={toggleSidebar}>Workout Logs</NavLink>
          <NavLink to="/progress" onClick={toggleSidebar}>Progress Tracking</NavLink>
          <NavLink to="/calories" onClick={toggleSidebar}>Calories Tracking</NavLink>
          <NavLink to="/recommendations" onClick={toggleSidebar}>Personalized Recommendations</NavLink>
          <NavLink to="/goalsetting" onClick={toggleSidebar}>Goal Setting</NavLink>
          <NavLink to="/socialsharing" onClick={toggleSidebar}>Social Sharing</NavLink>
          <NavLink to="/blog" onClick={toggleSidebar}>Blog</NavLink>
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
