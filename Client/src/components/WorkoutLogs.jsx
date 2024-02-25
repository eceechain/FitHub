import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WorkoutLog.css'

function WorkoutLogs() {
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.npoint.io/74b3e41d7d5439546e8c')
      .then(response => {
        console.log('Response data:', response.data);
        setWorkoutLogs(response.data.workoutLogs);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workout logs:', error);
        setError('Error fetching workout logs. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Workout Logs</h2>
      <ul>
        {workoutLogs.map(log => (
          <li key={log.id}>
            <strong>{log.exercise}</strong>
            <p>Date: {log.date}</p>
            <p>Duration: {log.duration}</p>
            {log.sets && <p>Sets: {log.sets}</p>}
            {log.reps && <p>Reps: {log.reps}</p>}
            {log.distance && <p>Distance: {log.distance}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutLogs;
