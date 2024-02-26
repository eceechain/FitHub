import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CaloriesTracking() {
  const [caloriesData, setCaloriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://fithub-kl23.onrender.com/Calories');
      setCaloriesData(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching calories data. Please try again later.');
      setLoading(false);
      console.error('Error fetching calories data:', error);
    }
  };

  return (
    <div className="calories-tracking">
      <h2>Calories Tracking</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Meal Type</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {caloriesData.map(item => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.meal_type}</td>
                <td>{item.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CaloriesTracking;
