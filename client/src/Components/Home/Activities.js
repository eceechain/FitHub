import React from 'react';
import './Activities.css';

function Activities() {
  return (
    <div className="activities-container">
      <h1>Explore Exciting Activities</h1>
      <div className="activity">
        <img src="image_url_here" alt="Activity 1" className="activity-image" />
        <div className="activity-details">
          <h2>Activity 1</h2>
          <p>Description of Activity 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <a href="/activity1">Learn more</a>
        </div>
      </div>
      <div className="activity">
        <img src="image_url_here" alt="Activity 2" className="activity-image" />
        <div className="activity-details">
          <h2>Activity 2</h2>
          <p>Description of Activity 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <a href="/activity2">Learn more</a>
        </div>
      </div>
      {/* Add more activities here */}
    </div>
  );
}

export default Activities;
