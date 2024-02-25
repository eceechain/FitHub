import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import '../styles/App.css'

function Home() {
  return (
    <div className="home-content">
      <div className="content">
        {/* Logo */}
        <div className="logo">
          <h1><span>Fit</span>Hub</h1>
        </div>

 {/* Introduction Section */}
<div className="intro-section">
  <h2 className="intro-heading">Your All-in-One Fitness Tracking App</h2>
  <p className="intro-text">Take control of your fitness journey with FitHub. Whether you're aiming to lose weight, build muscle, or simply stay active, FitHub provides you with the tools and support you need to achieve your goals.</p>
  <p className="intro-text">Track your workouts, monitor your calorie intake, set personalized goals, and get expert recommendations tailored to your fitness level and objectives. With FitHub, you can access a vast library of exercises, healthy recipes, and connect with a supportive fitness community.</p>
  <Link to="/WorkoutLogs" className="get-started-button">Get Started</Link>
</div>



        {/* Instructors Section */}
<div className="instructors-section">
  <h3>Our Gym Instructors</h3>
  <div className="instructor-images">
    <figure className="instructor">
      <img src="http://tinyurl.com/bddefsme" alt="Gym Instructor 1" />
      <figcaption>Gym Instructor 1</figcaption>
    </figure>
    <figure className="instructor">
      <img src="http://tinyurl.com/4t5xeb3m" alt="Gym Instructor 2" />
      <figcaption>Gym Instructor 2</figcaption>
    </figure>
    {/* Add more images as needed */}
  </div>
</div>


{/* Types of Workouts Section */}
<div className="section workouts-section">
  <h3>Types of Workouts</h3>
  <div className="workouts-container">
    <div className="workout">
      <img src="http://tinyurl.com/d33jrhyd" alt="Cardio Workout" />
      <div className="workout-info">
        <h4>Cardio</h4>
        <p>Cardiovascular exercises to improve heart health and endurance.</p>
        <ul className="benefits-list">
          <li>Burns calories</li>
          <li>Improves cardiovascular health</li>
          <li>Increases stamina</li>
        </ul>
        <button className="cta-button">Learn More</button>
      </div>
    </div>
    <div className="workout">
      <img src="http://tinyurl.com/bdh6ed7s" alt="Strength Training Workout" />
      <div className="workout-info">
        <h4>Strength Training</h4>
        <p>Resistance exercises to build muscle strength and tone.</p>
        <ul className="benefits-list">
          <li>Increases muscle mass</li>
          <li>Boosts metabolism</li>
          <li>Enhances bone density</li>
        </ul>
        <button className="cta-button">Learn More</button>
      </div>
    </div>
    <div className="workout">
      <img src="http://tinyurl.com/muem74v7" alt="Flexibility Workout" />
      <div className="workout-info">
        <h4>Flexibility</h4>
        <p>Stretching and flexibility exercises to improve range of motion.</p>
        <ul className="benefits-list">
          <li>Reduces risk of injury</li>
          <li>Improves posture</li>
          <li>Relieves muscle tension</li>
        </ul>
        <button className="cta-button">Learn More</button>
      </div>
    </div>
    <div className="workout">
      <img src="http://tinyurl.com/4m5ac84b" alt="HIIT Workout" />
      <div className="workout-info">
        <h4>HIIT</h4>
        <p>High-intensity interval training for maximum calorie burn and fitness gains.</p>
        <ul className="benefits-list">
          <li>Increases metabolism</li>
          <li>Burns fat</li>
          <li>Builds endurance</li>
        </ul>
        <button className="cta-button">Learn More</button>
      </div>
    </div>
  </div>
</div>


     {/* Our Packages Section */}
<div className="section packages-section">
  <h3>Our Packages</h3>
  <ul className="package-list">
    <li className="package">
      <span className="package-name">Basic</span>
      <span className="package-description">Access to essential features</span>
      <span className="package-price">Ksh 3999/month</span>
      <button className="package-button">Subscribe</button>
    </li>
    <li className="package">
      <span className="package-name">Pro</span>
      <span className="package-description">Additional features and advanced analytics</span>
      <span className="package-price">Ksh 5,999/month</span>
      <button className="package-button">Subscribe</button>
    </li>
    <li className="package">
      <span className="package-name">Premium</span>
      <span className="package-description">Full access to all features and personalized coaching</span>
      <span className="package-price">Ksh 8,999/month</span>
      <button className="package-button">Subscribe</button>
    </li>
    <li className="package">
      <span className="package-name">Family</span>
      <span className="package-description">Share with up to 5 family members</span>
      <span className="package-price">Ksh 19,999/month</span>
      <button className="package-button">Subscribe</button>
    </li>
    <li className="package">
      <span className="package-name">Corporate</span>
      <span className="package-description">Ideal for businesses and teams</span>
      <span className="package-price">Contact us for pricing</span>
      <button className="package-button">Contact Us</button>
    </li>
  </ul>
</div>

   {/* Location Section */}
<div className="section location-section">
  <h3>Our Location</h3>
  <div className="map-container">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7904952973627!2d36.7847344!3d-1.3005588000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f109dcb26a413%3A0xca1c503989df391d!2sNgong%20Lane%20Plaza!5e0!3m2!1sen!2ske!4v1708667577391!5m2!1sen!2ske" 
            width="600" 
            height="450" 
            style={{ border: '0' }} 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  </div>
</div>



        {/* Contact Us Section */}
        <div className="section contact-section">
          <h3>Contact Us</h3>
          <ul>
            <li>Email: support@fithub.com</li>
            <li>Phone: 123-456-7890</li>
          </ul>
          <Link to="/contact" className="cta-button">Contact Us</Link>
        </div>
      </div>

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