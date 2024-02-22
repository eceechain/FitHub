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
                    <p>Transform your body and mind with our personalized fitness solutions.</p>
                    <button className="cta-button">Get Started</button>
                </div>
            </section>

            {/* Basic Workouts Section */}
            <section className="basic-workouts">
                <h2>Basic Workouts</h2>
                <div className="workout-list">
                    <div className="workout-item">
                        <h3>Push-ups</h3>
                        <p>A classic exercise for building upper body strength.</p>
                    </div>
                    <div className="workout-item">
                        <h3>Squats</h3>
                        <p>Great for strengthening your lower body muscles.</p>
                    </div>
                    {/* Add more basic workouts */}
                </div>
            </section>

            {/* Services Section */}
            <section className="services">
                <h2>Our Services</h2>
                <div className="service-list">
                    <div className="service-item">
                        <h3>Personal Training</h3>
                        <p>One-on-one coaching tailored to your goals.</p>
                    </div>
                    <div className="service-item">
                        <h3>Nutritional Guidance</h3>
                        <p>Customized meal plans and dietary advice.</p>
                    </div>
                    {/* Add more services */}
                </div>
            </section>

            {/* Featured Workouts Section */}
            <section className="featured-workouts">
                <h2>Featured Workouts</h2>
                <div className="featured-workout">
                    <h3>HIIT Workouts</h3>
                    <p>High-intensity interval training for maximum results.</p>
                </div>
                <div className="featured-workout">
                    <h3>Yoga Sessions</h3>
                    <p>Relaxing yet effective yoga routines for flexibility and peace of mind.</p>
                </div>
                {/* Add more featured workouts */}
            </section>

            {/* About FitHub Section */}
            <section className="about">
                <h2>About FitHub</h2>
                <p>FitHub is your ultimate fitness companion, offering a range of tools and resources to help you achieve your health and wellness goals. From personalized workout plans to expert guidance, we're here to support you every step of the way.</p>
            </section>

            {/* Subscription Plans Section */}
            <section className="subscription-plans">
                <h2>Subscription Plans</h2>
                <div className="plan-list">
                    <div className="plan-item">
                        <h3>Basic Plan</h3>
                        <p>$9.99/month</p>
                        <p>Access to basic features</p>
                    </div>
                    <div className="plan-item">
                        <h3>Premium Plan</h3>
                        <p>$29.99/month</p>
                        <p>Full access to all features</p>
                    </div>
                    {/* Add more subscription plans */}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <h2>Testimonials</h2>
                <div className="testimonial-list">
                    <div className="testimonial-item">
                        <p>"FitHub helped me lose 20 pounds in just three months! Highly recommended."</p>
                        <p>- John Doe</p>
                    </div>
                    <div className="testimonial-item">
                        <p>"I love the variety of workouts and the convenience of tracking my progress. Thank you, FitHub!"</p>
                        <p>- Jane Smith</p>
                    </div>
                    {/* Add more testimonials */}
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="contact">
                <h2>Contact Us</h2>
                <div className="contact-info">
                    <p>Email: info@fithub.com</p>
                    <p>Phone: +254 123 456 789</p>
                </div>
                {/* Add contact form */}
            </section>
        </div>
    );
}

export default Home;
