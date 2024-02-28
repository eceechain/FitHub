import React from 'react';
import '../styles/Dashboard.css'

function DashboardOverview() {
  // Fictional fitness progress data
  const totalWorkoutsCompleted = 35;
  const totalCaloriesBurned = 15000;
  const weightChanges = [
    { date: '2023-01-01', weight: 160 },
    { date: '2023-02-01', weight: 158 },
    { date: '2023-03-01', weight: 157 },
    { date: '2023-04-01', weight: 155 },
    { date: '2023-05-01', weight: 153 },
    { date: '2023-06-01', weight: 152 },
  ];

  // Calculate weight change trend
  const initialWeight = weightChanges[0].weight;
  const finalWeight = weightChanges[weightChanges.length - 1].weight;
  const weightChange = initialWeight - finalWeight;
  const weightChangeDirection = weightChange > 0 ? 'down' : 'up';

  // Function to format weight changes data for display
  const formatWeightChanges = () => {
    return weightChanges.map((entry, index) => (
      <tr key={index}>
        <td>{entry.date}</td>
        <td>{entry.weight} lbs</td>
      </tr>
    ));
  };

  return (
    <div className="dashboard-overview">
      <h2>Dashboard Overview</h2>
      <div className="overview-card">
        <h3>Total Workouts Completed</h3>
        <p>{totalWorkoutsCompleted}</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(totalWorkoutsCompleted / 50) * 100}%` }}></div>
        </div>
      </div>
      <div className="overview-card">
        <h3>Total Calories Burned</h3>
        <p>{totalCaloriesBurned} kcal</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(totalCaloriesBurned / 25000) * 100}%` }}></div>
        </div>
      </div>
      <div className="overview-card">
        <h3>Weight Changes</h3>
        <p>Initial Weight: {initialWeight} lbs</p>
        <p>Final Weight: {finalWeight} lbs</p>
        <p>Weight Change: {Math.abs(weightChange)} lbs {weightChangeDirection}</p>
        <div className="trend-indicator">
          <i className={`fas fa-arrow-${weightChangeDirection}`}></i>
        </div>
      </div>
      <div className="overview-chart">
        <h3>Weight Changes Over Time</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {formatWeightChanges()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardOverview;
