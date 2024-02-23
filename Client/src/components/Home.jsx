import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-content">
      <div className="content">
        {/* Logo */}
        <div className="logo">
          <h1><span>Fit</span>Hub</h1>
        </div>

        <h2>Welcome to FitHub!</h2>
        <p>Start your fitness journey with FitHub - your all-in-one fitness tracking app.</p>

        {/* Our Services Section */}
        <div className="section">
          <h3>Our Services</h3>
          <p>With FitHub, you get access to a wide range of fitness services to help you achieve your goals:</p>
          <ul>
            <li>Workout tracking</li>
            <li>Calorie tracking</li>
            <li>Goal setting</li>
            <li>Personalized recommendations</li>
            <li>Progress tracking</li>
            <li>Custom workout plans</li> {/* New service */}
            <li>Healthy recipes</li> {/* New service */}
          </ul>
        </div>

        {/* Our Packages Section */}
        <div className="section">
          <h3>Our Packages</h3>
          <p>Choose from our variety of subscription packages tailored to your needs:</p>
          <ul>
            <li>Basic - Access to essential features</li>
            <li>Pro - Additional features and advanced analytics</li>
            <li>Premium - Full access to all features and personalized coaching</li>
            <li>Family - Share with up to 5 family members</li> {/* New package */}
            <li>Corporate - Ideal for businesses and teams</li> {/* New package */}
          </ul>
          <Link to="/packages" className="cta-button">View Packages</Link>
        </div>

        {/* Contact Us Section */}
        <div className="section">
          <h3>Contact Us</h3>
          <p>Have questions or need assistance? Reach out to our support team:</p>
          <ul>
            <li>Email: support@fithub.com</li>
            <li>Phone: 123-456-7890</li>
          </ul>
          <Link to="/contact" className="cta-button">Contact Us</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container flex">
          <div className="footer-section">
            <h4>About FitHub</h4>
            <p>FitHub is your go-to platform for all your fitness needs. Whether you're a beginner or a seasoned athlete, we've got you covered.</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="https://www.facebook.com/fithub">Facebook</a></li>
              <li><a href="https://www.twitter.com/fithub">Twitter</a></li>
              <li><a href="https://www.instagram.com/fithub">Instagram</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="bottom-footer">
          <p>&copy; {new Date().getFullYear()} FitHub. All rights reserved.</p>
        </div>
      </footer>
      {/* End Footer */}
    </div>
  );
}

export default Home;
