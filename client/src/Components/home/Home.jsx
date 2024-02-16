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
            <li className="dropdown">
              <a href="#">Dashboard</a>
              <div className="dropdown-content">
                <a href="#">Overview</a>
                <a href="#">Analytics</a>
                <a href="#">Settings</a>
              </div>
            </li>
            <li><a href="#">Activities</a></li>
            <li><a href="#">Profile</a></li>
          </ul>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit"><i className="fas fa-search"></i></button>
        </div>
        <div className="user-profile">
          <a href="#"><i className="fas fa-user"></i></a>
        </div>
      </header>


      {/* Hero Section */}
      <section className="hero">
        <h1>Track Your Fitness Journey</h1>
        <p>Start achieving your fitness goals today with our app!</p>
        <button className="btn btn-primary">Get Started</button>
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
        <button className="btn btn-primary">Sign Up Now</button>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <h2>Choose Your Plan</h2>
        <div className="plan">
          <h3>Basic Plan</h3>
          <p>Access to basic features</p>
          <button className="btn btn-secondary">Get Started</button>
        </div>
        <div className="plan">
          <h3>Premium Plan</h3>
          <p>Access to advanced features</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="question">
          <h3>How do I track my activities?</h3>
          <p>Our app provides easy-to-use activity tracking tools.</p>
        </div>
        <div className="question">
          <h3>Can I sync my data with other fitness apps?</h3>
          <p>Yes, our app supports data synchronization with popular fitness platforms.</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="contact-info">
          <p>Contact Us: FitHub.ke@gmail.com</p>
          <p>Phone: +254798491946</p>
        </div>
        <div className="social-media">
          <a href="#" className="icon-link"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="icon-link"><i className="fab fa-twitter"></i></a>
          <a href="#" className="icon-link"><i className="fab fa-instagram"></i></a>
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
