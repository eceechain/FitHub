import React from 'react';
import './Dashboard.css';

function Dashboard() {
  const handleSubmitWorkoutLog = (event) => {
    event.preventDefault();
    // Handle submission of workout log form
    console.log('Workout log submitted!');
  };

  const handleSubmitCaloriesTracking = (event) => {
    event.preventDefault();
    // Handle submission of calories tracking form
    console.log('Calories tracking submitted!');
  };

  const handleSubmitGoalSetting = (event) => {
    event.preventDefault();
    // Handle submission of goal setting form
    console.log('Goal setting submitted!');
  };

  const handleSubmitPersonalizedRecommendations = (event) => {
    event.preventDefault();
    // Handle submission of personalized recommendations form
    console.log('Personalized recommendations submitted!');
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard!</h1>

      {/* Workout Logs Section */}
      <section className="workout-logs-section">
        <h2>Workout Logs</h2>
        <form onSubmit={handleSubmitWorkoutLog}>
          <label htmlFor="exercise">Exercise:</label>
          <input type="text" id="exercise" name="exercise" placeholder="Enter exercise" required />

          <label htmlFor="duration">Duration (minutes):</label>
          <input type="number" id="duration" name="duration" placeholder="Enter duration" required />

          <label htmlFor="sets">Sets:</label>
          <input type="number" id="sets" name="sets" placeholder="Enter sets" required />

          <label htmlFor="reps">Reps:</label>
          <input type="number" id="reps" name="reps" placeholder="Enter reps" required />

          <button type="submit">Submit Workout Log</button>
        </form>
      </section>

      {/* Calories Tracking Section */}
      <section className="calories-tracking-section">
        <h2>Calories Tracking</h2>
        <form onSubmit={handleSubmitCaloriesTracking}>
          <label htmlFor="calories">Calories consumed:</label>
          <input type="number" id="calories" name="calories" placeholder="Enter calories consumed" required />

          <button type="submit">Submit Calories Tracking</button>
        </form>
      </section>

      {/* Goal Setting Section */}
      <section className="goal-setting-section">
        <h2>Goal Setting</h2>
        <form onSubmit={handleSubmitGoalSetting}>
          <label htmlFor="goal">Enter your fitness goal:</label>
          <input type="text" id="goal" name="goal" placeholder="Enter your fitness goal" required />

          <button type="submit">Set Goal</button>
        </form>
      </section>

      {/* Personalized Recommendations Section */}
      <section className="personalized-recommendations-section">
        <h2>Personalized Recommendations</h2>
        <form onSubmit={handleSubmitPersonalizedRecommendations}>
          <label htmlFor="recommendation">Personalized Recommendation:</label>
          <input type="text" id="recommendation" name="recommendation" placeholder="Enter personalized recommendation" required />

          <button type="submit">Submit Recommendation</button>
        </form>
      </section>
    </div>
  );
}

export default Dashboard;
