// Pricing.js
import React from 'react';
import './Pricing.css';

const Pricing = () => {
  return (
    <div className="Pricing">
      <h2>Subscription Plans</h2>
      <p>Choose the subscription plan that works best for you:</p>
      <ul>
        <li>Basic Plan - $9.99/month</li>
        <li>Standard Plan - $19.99/month</li>
        <li>Premium Plan - $29.99/month</li>
      </ul>
      <p>All plans include access to personalized workout plans, nutrition tracking, community support, and progress monitoring.</p>
      <p>Start your free trial today!</p>
    </div>
  );
}

export default Pricing;
