import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    const closeSidebarOnOutsideClick = (event) => {
      if (showSidebar && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    const closeSidebarOnEscape = (event) => {
      if (showSidebar && event.key === 'Escape') {
        setShowSidebar(false);
      }
    };

    document.addEventListener('mousedown', closeSidebarOnOutsideClick);
    document.addEventListener('keydown', closeSidebarOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeSidebarOnOutsideClick);
      document.removeEventListener('keydown', closeSidebarOnEscape);
    };
  }, [showSidebar]);

  return (
    <div className="navbar-container">
      <button className={`sidebar-handle ${showSidebar ? 'hide' : ''}`} onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`sidebar ${showSidebar ? 'show' : ''}`} ref={sidebarRef}>
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
        <div className="sidebar-links">
          <NavLink to="/" onClick={closeSidebar}>Home</NavLink>
          <NavLink to="/dashboard" onClick={closeSidebar}>Dashboard</NavLink>
          <NavLink to="/workoutlogs" onClick={closeSidebar}>Workout Logs</NavLink>
          <NavLink to="/progress" onClick={closeSidebar}>Progress Tracking</NavLink>
          <NavLink to="/calories" onClick={closeSidebar}>Calories Tracking</NavLink>
          <NavLink to="/PersonalizedRecommendations" onClick={closeSidebar}>Personalized Recommendations</NavLink>
          <NavLink to="/goalsetting" onClick={closeSidebar}>Goal Setting</NavLink>
          <NavLink to="/socialsharing" onClick={closeSidebar}>Social Sharing</NavLink>
          <NavLink to="/blog" onClick={closeSidebar}>Blog</NavLink>
          <NavLink to="/nutrition" onClick={closeSidebar}>Nutrition</NavLink>
          <div className="auth-links">
            <NavLink to="/account/login" onClick={closeSidebar}>Login</NavLink>
            <NavLink to="/account/register" onClick={closeSidebar}>Register</NavLink>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="nav-links">
          <NavLink to="/" className="logo">
            FitnessHub
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;