import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [calories, setCalories] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');

  const handleWorkoutLogSubmit = (e) => {
    e.preventDefault();
    const newWorkoutLog = {
      exercise: e.target.exercise.value,
      duration: e.target.duration.value,
    };
    setWorkoutLogs([...workoutLogs, newWorkoutLog]);
    e.target.reset();
  };

  const handleCaloriesTrackingSubmit = (e) => {
    e.preventDefault();
    setCalories(e.target.calories.value);
    e.target.reset();
  };

  const handleGoalSettingSubmit = (e) => {
    e.preventDefault();
    setFitnessGoal(e.target.goal.value);
    e.target.reset();
  };

  const getWorkoutLogsList = () => {
    return (
      <ul>
        {workoutLogs.map((log, index) => (
          <li key={index}>
            {log.exercise} - {log.duration} mins
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard!</h1>

      <section className="overview-section">
        <h2>Dashboard Overview</h2>
        <p>Total workouts completed: {workoutLogs.length}</p>
        <p>Total calories burned: {calories}</p>
        <p>Fitness goal: {fitnessGoal}</p>
      </section>

      <section className="workout-logs-section">
        <h2>Workout Logs</h2>
        <form onSubmit={handleWorkoutLogSubmit}>
          <label htmlFor="exercise">Exercise:</label>
          <input type="text" id="exercise" name="exercise" placeholder="Enter exercise" required />
          <label htmlFor="duration">Duration (mins):</label>
          <input type="number" id="duration" name="duration" placeholder="Enter duration" required />
          <button type="submit">Log Workout</button>
        </form>
        {workoutLogs.length > 0 && getWorkoutLogsList()}
      </section>

      <section className="calories-tracking-section">
        <h2>Calories Tracking</h2>
        <form onSubmit={handleCaloriesTrackingSubmit}>
          <label htmlFor="calories">Calories intake:</label>
          <input type="number" id="calories" name="calories" placeholder="Enter calories intake" required />
          <button type="submit">Track Calories</button>
        </form>
      </section>

      <section className="goal-setting-section">
        <h2>Goal Setting</h2>
        <form onSubmit={handleGoalSettingSubmit}>
          <label htmlFor="goal">Set your fitness goal:</label>
          <input type="text" id="goal" name="goal" placeholder="Enter your fitness goal" required />
          <button type="submit">Set Goal</button>
        </form>
      </section>
    </div>
  );
}

export default Dashboard;
