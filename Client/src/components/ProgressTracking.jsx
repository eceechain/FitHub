import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProgressTracking() {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    axios.get('https://api.npoint.io/aa19134a2926e78bacbd')
      .then(response => {
        setProgressData(response.data.progress);
      })
      .catch(error => {
        console.error('Error fetching progress tracking data:', error);
      });
  }, []);

  return (
    <div className="progress-tracking-container">
      <h2>Progress Tracking</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight (lbs)</th>
            <th>Body Fat (%)</th>
            <th>Muscle Mass (lbs)</th>
            <th>Calories Burned</th>
            <th>Workouts Completed</th>
            <th>Water Intake (cups)</th>
          </tr>
        </thead>
        <tbody>
          {progressData.map(progress => (
            <tr key={progress.id}>
              <td>{progress.date}</td>
              <td>{progress.weight}</td>
              <td>{progress.bodyFatPercentage}</td>
              <td>{progress.muscleMass}</td>
              <td>{progress.caloriesBurned}</td>
              <td>{progress.workoutsCompleted}</td>
              <td>{progress.waterIntake}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProgressTracking;
