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
                <p>FitHub is a Kenyan fitness tracking app located in Nairobi at Ngong Lane Plaza. We are dedicated to helping individuals achieve their fitness goals with personalized workout plans, nutritional guidance, and expert coaching.</p>
            </section>

            {/* Location Section */}
            <section className="location">
                <h2>Location</h2>
                <div className="map-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7905037758346!2d36.782159474045685!3d-1.3005534356399324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f109dcb26a413%3A0xca1c503989df391d!2sNgong%20Lane%20Plaza!5e0!3m2!1sen!2ske!4v1708572130851!5m2!1sen!2ske" width="600" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
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
