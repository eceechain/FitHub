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
                <p>Explore a variety of basic workouts designed for all fitness levels. Whether you're just starting out or looking to maintain your fitness routine, our basic workouts are perfect for you.</p>
                {/* Display basic workout content here */}
            </section>

            {/* Services Section */}
            <section className="services">
                <h2>Our Services</h2>
                <p>Discover the range of services we offer to help you achieve your fitness goals. From personalized workout plans to nutrition tracking and community support, we've got everything you need to succeed.</p>
                {/* Display service offerings here */}
            </section>

            {/* Featured Workouts Section */}
            <section className="featured-workouts">
                <h2>Featured Workouts</h2>
                <p>Check out our featured workouts curated by fitness experts. These workouts are designed to challenge you and keep your fitness routine exciting and engaging.</p>
                {/* Display featured workouts here */}
            </section>

            {/* About FitHub Section */}
            <section className="about">
                <h2>About FitHub</h2>
                <p>FitHub is a leading fitness tracking app dedicated to helping individuals live healthier lives. Our mission is to empower you with the tools and support you need to reach your fitness goals.</p>
                {/* Display information about FitHub here */}
            </section>

            {/* Subscription Plans Section */}
            <section className="subscription-plans">
                <h2>Subscription Plans</h2>
                <p>Choose from our flexible subscription plans to access premium features and take your fitness journey to the next level. With affordable pricing options, there's a plan that's right for you.</p>
                {/* Display subscription plans and pricing here */}
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <h2>Testimonials</h2>
                <p>Hear what our users have to say about their experience with FitHub. From success stories to motivational journeys, our community members share their inspiring testimonials.</p>
                {/* Display testimonials from users here */}
            </section>

            {/* Contact Us Section */}
            <section className="contact">
                <h2>Contact Us</h2>
                <p>If you have any questions, feedback, or inquiries, don't hesitate to reach out to us. Our dedicated support team is here to assist you.</p>
                {/* Display contact information and form here */}
            </section>
        </div>
    );
}

export default Home;
