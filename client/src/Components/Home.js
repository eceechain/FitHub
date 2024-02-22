import React from 'react';
import './Home.css'; 
const Home = () => {
    return (
        <div className="home">
            {/* Sign-up and Log-in Buttons */}
            <div className="auth-buttons">
                <button className="auth-button">Sign Up</button>
                <button className="auth-button">Log In</button>
            </div>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to FitHub</h1>
                    <p>Start your fitness journey today!</p>
                    <button className="cta-button">Get Started</button>
                </div>
            </section>

            {/* Basic Workouts Section */}
            <section className="basic-workouts">
                <h2>Basic Workouts</h2>
                {/* Display basic workout content here */}
            </section>

            {/* Services Section */}
            <section className="services">
                <h2>Our Services</h2>
                {/* Display service offerings here */}
            </section>

            {/* Featured Workouts Section */}
            <section className="featured-workouts">
                <h2>Featured Workouts</h2>
                {/* Display featured workouts here */}
            </section>

            {/* About FitHub Section */}
            <section className="about">
                <h2>About FitHub</h2>
                {/* Display information about FitHub here */}
            </section>

            {/* Subscription Plans Section */}
            <section className="subscription-plans">
                <h2>Subscription Plans</h2>
                {/* Display subscription plans and pricing here */}
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <h2>Testimonials</h2>
                {/* Display testimonials from users here */}
            </section>

            {/* Contact Us Section */}
            <section className="contact">
                <h2>Contact Us</h2>
                {/* Display contact information and form here */}
            </section>
        </div>
    );
}

export default Home;
