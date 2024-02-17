import React, { useState } from 'react';
import './Home.css';
import Dashboard from './Dashboard';
import Blog from './Blog';
import Activities from './Activities'

function Home() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showBlog, setShowBlog] = useState(false);

  const handleDashboardClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    setShowDashboard(true);
    scrollToDashboard(); // Scroll to the Dashboard section
  };
   
  const handleActivitiesClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    setShowActivities(true);
    scrollToActivities(); // Scroll to the Activities section
  };

  const handleBlogClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    setShowBlog(true);
    scrollToBlog(); // Scroll to the Blog section
  };
   

  const scrollToDashboard = () => {
    const dashboardSection = document.getElementById('dashboard-section');
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the Dashboard section
    }
  };

  const scrollToActivities = () => {
    const activitiesSection = document.getElementById('activities-section');
    if (activitiesSection) {
      activitiesSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the Activities section
    }
  };

  const scrollToBlog = () => {
    const blogSection = document.getElementById('blog-section');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the Blog section
    }
  };

  return (
    <div className="home-container">
      <header className="header-section">
        <nav className="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#dashboard" onClick={handleDashboardClick}>Dashboard</a></li>
            <li><a href="#activities" onClick={handleActivitiesClick}>Activities</a></li>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#blog" onClick={handleBlogClick}>Blog</a></li>
            {/* Add more links as needed */}
          </ul>
        </nav>
        <div className="search-bar">
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
          <li>Generate workout plans tailored to your goals</li>
          <li>View detailed analytics and insights</li>
          <li>Attend live workout sessions and classes</li>
          <li>Track your water intake and sleep patterns</li>
          <li>Set reminders and notifications for workouts</li>
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

      <section id="dashboard-section" className="dashboard-section">
        {showDashboard && <Dashboard />}
      </section>

      <section id="activities-section" className="activities-section">
        {showActivities && <Activities />}
      </section>

      <section id="blog-section" className="blog-section">
        {showBlog && <Blog />}
      </section>

      <footer className="footer-section">
        <h3>Contact Us</h3>
        <p>Email: info@fithub.com</p>
        <p>Phone: 123-456-7890</p>
        <div className="social-media">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
        <div className="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Accessibility</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
