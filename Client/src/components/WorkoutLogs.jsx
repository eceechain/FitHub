import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    </div>
  );
}

export default WorkoutLogs;
