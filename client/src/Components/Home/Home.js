import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="header-section">
        <div className="logo">
          <h1>FitHub</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#activities">Activities</a></li>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#blog">Blog</a></li>
            {/* Add more links as needed */}
          </ul>
        </nav>
        <div className="search-bar">
          {/* Add your search bar component */}
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
        <div className="authentication">
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      </header>

      <section className="hero-section">
        <h2>Welcome to FitHub</h2>
        <p>Your ultimate fitness companion</p>
        {/* Add a button to navigate to the signup page */}
        <button>Get Started</button>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <ul>
          <li>Track workouts, nutrition, and progress</li>
          <li>Set personalized fitness goals</li>
          <li>Access a vast library of exercises and recipes</li>
          <li>Connect with a supportive fitness community</li>
          <li>Get expert advice from certified trainers</li>
          <li>Participate in challenges and competitions</li>
          <li>Sync with wearable devices for seamless tracking</li>
          {/* Add more features */}
        </ul>
      </section>

      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <ol>
          <li>Sign up for a free account</li>
          <li>Set your fitness goals</li>
          <li>Start tracking your activities and nutrition</li>
          <li>Join challenges and earn rewards</li>
          <li>Engage with the FitHub community</li>
          {/* Add more steps */}
        </ol>
      </section>

      <section className="testimonials-section">
        <h2>Testimonials</h2>
        <blockquote>
          "FitHub has transformed my fitness journey. I've never felt more motivated and supported."
        </blockquote>
        {/* Add more testimonials */}
      </section>

      <section className="call-to-action-section">
        <h2>Join FitHub Today!</h2>
        <p>Start your fitness journey now by signing up for an account.</p>
        {/* Add a button to navigate to the signup page */}
        <button>Sign Up</button>
      </section>

      <section className="pricing-section">
        <h2>Pricing</h2>
        <p>Choose from our affordable plans with basic and premium features.</p>
        <ul>
          <li>Basic Plan - $9.99/month</li>
          <li>Premium Plan - $19.99/month</li>
          <li>Corporate Plan - Contact us for pricing</li>
          {/* Add more plan options */}
        </ul>
      </section>

      <section className="faq-section">
        <h2>FAQ</h2>
        <h3>How can I track my activities?</h3>
        <p>You can track your activities using our intuitive activity tracker.</p>
        <h3>Is there a mobile app available?</h3>
        <p>Yes, FitHub is available on iOS and Android platforms.</p>
        {/* Add more FAQ entries */}
      </section>

      <footer className="footer-section">
        <h3>Contact Us</h3>
        <p>Email: info@fithub.com</p>
        <p>Phone: 123-456-7890</p>
        {/* Add links to social media profiles */}
        <div className="social-media">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          {/* Add more social media links */}
        </div>
        {/* Add legal links */}
        <div className="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Accessibility</a>
          {/* Add more legal links */}
        </div>
      </footer>
    </div>
  );
}

export default Home;
