// Home.jsx

import React from 'react';


const Home = () => {
  return (
    <div className="home">
      {/* Header Section */}
      <header className="header">
        <div className="logo">FitHub</div>
        <nav className="navigation">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Activities</a></li>
            <li><a href="#">Profile</a></li>
          </ul>
        </nav>
        <div className="authentication">
          <button>Log In</button>
          <button>Sign Up</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Track Your Fitness Journey</h1>
        <p>Start achieving your fitness goals today with our app!</p>
        <button>Get Started</button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature">
          <span className="icon">🏋️‍♂️</span>
          <p>Activity Tracking</p>
        </div>
        <div className="feature">
          <span className="icon">🎯</span>
          <p>Goal Setting</p>
        </div>
        <div className="feature">
          <span className="icon">📅</span>
          <p>Personalized Plans</p>
        </div>
        <div className="feature">
          <span className="icon">👥</span>
          <p>Community Support</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Sign up for an account.</li>
          <li>Set your fitness goals.</li>
          <li>Track your activities and progress.</li>
          <li>Connect with the fitness community.</li>
        </ol>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>Testimonials</h2>
        <div className="testimonial">
          <blockquote>"I've never felt better since I started using FitHub. Highly recommend!"</blockquote>
          <cite>- Abdullahi Abass</cite>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta">
        <h2>Start Your Fitness Journey Today!</h2>
        <button>Sign Up Now</button>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="contact-info">
          <p>Contact Us: abass@gmail.com</p>
          <p>Phone: +254798491946</p>
        </div>
        <div className="social-media">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
        <div className="legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
