import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WorkoutLog.css';

function WorkoutLogs() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://fithub-kl23.onrender.com/Workouts');
      setWorkouts(response.data.workouts);
      setLoading(false);
    } catch (error) {
      setError('Error fetching workout data. Please try again later.');
      setLoading(false);
      console.error('Error fetching workout data:', error);
    }
  };

  const startWorkout = (id) => {
    console.log(`Workout with ID ${id} started`);
    setTimer(Date.now());
  };

  const finishWorkout = (id) => {
    console.log(`Workout with ID ${id} finished`);
    const workout = workouts.find(workout => workout.id === id);
    const duration = ((Date.now() - timer) / 1000) / 60; // Calculate duration in minutes
    alert(`Workout "${workout.workout_type}" finished! Duration: ${duration.toFixed(2)} minutes`);
    setTimer(null);
  };

  return (
    <div className="workout-logs-container">
      <h2>Workout Logs</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="workout-list">
          {workouts.map(workout => (
            <div key={workout.id} className="workout-item">
              <img src={workout.image} alt={workout.description} className="workout-image" />
              <div className="workout-details">
                <h3>{workout.workout_type}</h3>
                <p>{workout.description}</p>
                <p>Date: {workout.date}</p>
                <p>Duration: {workout.duration} minutes</p>
                <p>Sets: {workout.sets}</p>
                <p>Reps: {workout.reps}</p>
                <p>Calories Burned: {workout.calories_burned}</p>
                <button onClick={() => startWorkout(workout.id)}>Start Workout</button>
                <button onClick={() => finishWorkout(workout.id)}>Finish Workout</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutLogs;
