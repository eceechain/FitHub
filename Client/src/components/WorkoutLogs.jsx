import React, { useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import '../styles/WorkoutLog.css';

function WorkoutLogs() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://fithub-kl23.onrender.com/Workouts');
      // Initialize timer state for each workout
      const updatedWorkouts = response.data.workouts.map(workout => ({
        ...workout,
        timer: null
      }));
      setWorkouts(updatedWorkouts);
      setLoading(false);
    } catch (error) {
      setError('Error fetching workout data. Please try again later.');
      setLoading(false);
      console.error('Error fetching workout data:', error);
    }
  };

  // Function to handle starting the timer for a specific workout
  const startTimer = (id) => {
    setWorkouts(prevWorkouts => prevWorkouts.map(workout => {
      if (workout.id === id && !workout.timer) {
        const startTime = Date.now();
        const newTimer = setInterval(() => {
          const elapsedTime = Date.now() - startTime;
          setWorkouts(prevWorkouts => prevWorkouts.map(w => w.id === id ? { ...w, timer: elapsedTime } : w));
        }, 1000);
        return { ...workout, timer: newTimer };
      }
      return workout;
    }));
  };

  // Function to handle finishing the timer for a specific workout
  const finishTimer = (id) => {
    setWorkouts(prevWorkouts => prevWorkouts.map(workout => {
      if (workout.id === id && workout.timer) {
        clearInterval(workout.timer);
        const finishedWorkout = workouts.find(w => w.id === id);
        // Show personalized notification message for the finished workout
        alert(`Congratulations! You have finished the ${finishedWorkout.workout_type} workout.`);
        return { ...workout, timer: null };
      }
      return workout;
    }));
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
                {/* Show timer only if it's running */}
                {workout.timer && <p>Timer: {Math.floor(workout.timer / 1000)} seconds</p>}
                {/* Button to start timer */}
                <button onClick={() => startTimer(workout.id)}>Start</button>
                {/* Button to finish timer */}
                <button onClick={() => finishTimer(workout.id)}>Finish</button>
              </div>
            </div>
          ))}
        </div>
      )}
=======
import '../styles/WorkoutLog.css'

function WorkoutLogs() {
  const [workoutLogs, setWorkoutLogs] = useState([]);

  useEffect(() => {
    axios.get('https://api.npoint.io/74b3e41d7d5439546e8c')
      .then(response => {
        setWorkoutLogs(response.data.workoutLogs);
      })
      .catch(error => {
        console.error('Error fetching workout logs:', error);
      });
  }, []);

  return (
    <div className="workout-logs-container">
      <h2>Workout Logs</h2>
      <ul>
        {workoutLogs.map(log => (
          <li key={log.id} className="workout-log">
            <div className="exercise">
              <strong>{log.exercise}</strong>
            </div>
            <div className="details">
              {log.duration && <p>Duration: {log.duration}</p>}
              {log.sets && <p>Sets: {log.sets}</p>}
              {log.reps && <p>Reps: {log.reps}</p>}
              {log.distance && <p>Distance: {log.distance}</p>}
              <p>Date: {log.date}</p>
            </div>
            {log.image && <img src={log.image} alt={log.exercise} className="exercise-image" />}
          </li>
        ))}
      </ul>
>>>>>>> 1b176b92d18bdca31ac2c65743d52f5e83ebfdec
    </div>
  );
}

<<<<<<< HEAD
export default WorkoutLogs;
=======
export default WorkoutLogs;
>>>>>>> 1b176b92d18bdca31ac2c65743d52f5e83ebfdec
