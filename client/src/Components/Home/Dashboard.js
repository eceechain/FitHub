import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard!</h1>
      <section className="workout-logs-section">
        <h2>Workout Logs</h2>
        <p>Record your daily workouts:</p>
        <form>
          <label htmlFor="exercise">Exercise:</label>
          <input type="text" id="exercise" name="exercise" />

          <label htmlFor="duration">Duration (mins):</label>
          <input type="number" id="duration" name="duration" />

          <label htmlFor="sets">Sets:</label>
          <input type="number" id="sets" name="sets" />

          <label htmlFor="reps">Reps:</label>
          <input type="number" id="reps" name="reps" />

          <button type="submit">Log Workout</button>
        </form>
      </section>

      <section className="calories-tracking-section">
        <h2>Calories Tracking</h2>
        <p>Log your daily caloric intake:</p>
        <form>
          <label htmlFor="calories">Calories consumed:</label>
          <input type="number" id="calories" name="calories" />

          <label htmlFor="food">Food consumed:</label>
          <input type="text" id="food" name="food" />

          <button type="submit">Log Calories</button>
        </form>
      </section>

      <section className="progress-tracking-section">
        <h2>Progress Tracking</h2>
        <p>Visualize your fitness progress:</p>
        {/* Add charts and graphs here */}
      </section>

      <section className="goal-setting-section">
        <h2>Goal Setting</h2>
        <p>Set and track your fitness goals:</p>
        <form>
          <label htmlFor="goal">Fitness Goal:</label>
          <input type="text" id="goal" name="goal" />

          <label htmlFor="target">Target:</label>
          <input type="number" id="target" name="target" />

          <button type="submit">Set Goal</button>
        </form>
      </section>

      <section className="personalized-recommendations-section">
        <h2>Personalized Recommendations</h2>
        <p>Get personalized workout and nutrition recommendations:</p>
        {/* Add personalized recommendations based on user's goals and progress */}
      </section>
    </div>
  );
}

export default Dashboard;
