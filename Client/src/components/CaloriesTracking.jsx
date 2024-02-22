import React, { useState, useEffect } from 'react';

function CalorieTracking({ userId }) {
  const [calories, setCalories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalories = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/Calories`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCalories(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCalories();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Calorie Tracking</h1>
      <ul>
        {calories.map(calorie => (
          <li key={calorie.id}>
            <strong>Calories:</strong> {calorie.calories}<br />
            <strong>Date:</strong> {calorie.date}<br />
            <strong>ID:</strong> {calorie.id}<br />
            <strong>Meal Type:</strong> {calorie.meal_type}<br />
            <strong>User ID:</strong> {calorie.user_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalorieTracking;
