import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>

      <div className="nav-link dropdown">
        <span>Workouts</span>
        <div className="dropdown-content">
          <NavLink to="/workoutlogs">Workout Logs</NavLink>
          <NavLink to="/progress">Progress Tracking</NavLink>
          <NavLink to="/calories">Calories Tracking</NavLink>
          <NavLink to="/recommendations">Personalized Recommendations</NavLink>
          <NavLink to="/goalsetting">Goal Setting</NavLink>
        </div>
      </div>

      <div className="nav-link dropdown">
        <span>About</span>
        <div className="dropdown-content">
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact us</NavLink>
          <NavLink to="/blog">Blog</NavLink>
        </div>
      </div>

      <NavLink to="/socialsharing">Social Sharing</NavLink>

      <div className="nav-link dropdown">
        <span>Account</span>
        <div className="dropdown-content">
          <NavLink to="/account/login">Login</NavLink>
          <NavLink to="/account/register">Register</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
