import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/Dashboard.css';

function DashboardOverview() {
  // Fictional fitness progress data
  const totalWorkoutsCompleted = 35;
  const totalCaloriesBurned = 15000;
  const weightChanges = [
    { date: '2023-01-12', weight: 170 },
    { date: '2023-02-12', weight: 168 },
    { date: '2023-03-12', weight: 167 },
    { date: '2023-04-12', weight: 165 },
    { date: '2023-05-12', weight: 163 },
    { date: '2023-06-12', weight: 162 },
    { date: '2024-01-01', weight: 160 },
    { date: '2024-02-01', weight: 158 },
    { date: '2024-03-01', weight: 157 },
    { date: '2024-04-01', weight: 155 },
    { date: '2024-05-01', weight: 153 },
    { date: '2024-06-01', weight: 152 },
  ];

  // Calculate weight change trend
  const initialWeight = weightChanges[0].weight;
  const finalWeight = weightChanges[weightChanges.length - 1].weight;
  const weightChange = initialWeight - finalWeight;
  const weightChangeDirection = weightChange > 0 ? 'down' : 'up';

  // Goal progress data
  const goal = {
    targetWorkouts: 50,
    targetCaloriesBurned: 25000,
    targetWeight: 150,
  };

  // Workout statistics
  const workoutStatistics = [
    { type: 'Cardio', count: 20 },
    { type: 'Strength Training', count: 15 },
    { type: 'Yoga', count: 10 },
  ];

  // Function to format workout statistics
  const formatWorkoutStatistics = () => {
    return workoutStatistics.map((stat, index) => (
      <li key={index}>{stat.type}: {stat.count}</li>
    ));
  };

  // Upcoming workouts
  const upcomingWorkouts = [
    { date: '2023-07-15', type: 'Cardio' },
    { date: '2023-07-18', type: 'Strength Training' },
    { date: '2023-07-20', type: 'Yoga' },
  ];

  // Recent achievements
  const recentAchievements = [
    'Completed 5 consecutive days of workouts!',
    'Reached a new personal record in bench press!',
  ];

  // Motivational quotes
  const motivationalQuotes = [
    "The only bad workout is the one that didn't happen.",
    "Strive for progress, not perfection.",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "Your body can stand almost anything. It's your mind that you have to convince.",
  ];

  // Randomly select a quote
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="dashboard-overview">
      <h2>Dashboard Overview</h2>
      <div className="overview-card">
        <h3>Total Workouts Completed</h3>
        <p>{totalWorkoutsCompleted}</p>
      </div>
      <div className="overview-card">
        <h3>Total Calories Burned</h3>
        <p>{totalCaloriesBurned} kcal</p>
      </div>
      <div className="overview-card">
        <h3>Weight Changes</h3>
        <p>Initial Weight: {initialWeight} lbs</p>
        <p>Final Weight: {finalWeight} lbs</p>
        <p>Weight Change: {Math.abs(weightChange)} lbs {weightChangeDirection}</p>
      </div>
      <div className="overview-card">
        <h3>Goal Progress</h3>
        <p>Workouts: {totalWorkoutsCompleted}/{goal.targetWorkouts}</p>
        <p>Calories Burned: {totalCaloriesBurned}/{goal.targetCaloriesBurned} kcal</p>
        <p>Target Weight: {finalWeight}/{goal.targetWeight} lbs</p>
      </div>
      <div className="overview-card">
        <h3>Workout Statistics</h3>
        <ul>{formatWorkoutStatistics()}</ul>
      </div>
      <div className="overview-card">
        <h3>Upcoming Workouts</h3>
        <ul>
          {upcomingWorkouts.map((workout, index) => (
            <li key={index}>{workout.date} - {workout.type}</li>
          ))}
        </ul>
      </div>
      <div className="overview-card">
        <h3>Recent Achievements</h3>
        <ul>
          {recentAchievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>
      <div className="motivational-quote">
        <h3>Motivational Quote</h3>
        <p>"{randomQuote}"</p>
      </div>
      <div className="overview-chart">
        <h3>Weight Changes Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weightChanges}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardOverview;
