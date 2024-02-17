import React from 'react';
import './Activities.css';

function Activities() {
  return (
    <div className="activities-container">
      <h1>Explore Workout Activities</h1>
      <div className="activity">
        <img src="http://tinyurl.com/2v9bxc5m" alt="Weightlifting" className="activity-image" />
        <div className="activity-details">
          <h2>Weightlifting</h2>
          <p>Description of Weightlifting: Build strength and muscle with heavy lifting and resistance training.</p>
          <a href="/weightlifting">Learn more</a>
        </div>
      </div>
      <div className="activity">
        <img src="http://tinyurl.com/yck9akk9" alt="Boxing" className="activity-image" />
        <div className="activity-details">
          <h2>Boxing</h2>
          <p>Description of Boxing: Train your body and mind while learning the art of self-defense.</p>
          <a href="/boxing">Learn more</a>
        </div>
      </div>
      <div className="activity">
        <img src="https://via.placeholder.com/300" alt="Cardio" className="activity-image" />
        <div className="activity-details">
          <h2>Cardio</h2>
          <p>Description of Running: Conquer the roads and challenge yourself with this thrilling pace.</p>
          <a href="/rock-climbing">Learn more</a>
        </div>
      </div>
      {/* Add more activities here */}
    </div>
  );
}

export default Activities;
