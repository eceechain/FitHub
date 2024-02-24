import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import { useAuthContext } from './App';

function Navbar() {
  const {isAuthenticated, setIsAuthenticated} = useAuthContext();
  console.log(isAuthenticated);
  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/workoutlogs">Workout Logs</NavLink>
        <NavLink to="/progress">Progress Tracking</NavLink>
        <NavLink to="/calories">Calories Tracking</NavLink>
        <NavLink to="/recommendations">Personalized Recommendations</NavLink>
        <NavLink to="/goalsetting">Goal Setting</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact">Contact us</NavLink>
        <NavLink to="/blog">Blog</NavLink>
      </div>
      <div className="auth-links">
        {isAuthenticated ? <button onClick={() => setIsAuthenticated(false)}>logout</button> : <>
        <NavLink to="/socialsharing">Social Sharing</NavLink>
        <NavLink to="/account/login">Login</NavLink>
        <NavLink to="/account/register">Register</NavLink>
        </>}
      </div>
    </nav>
  );
}

export default Navbar;
