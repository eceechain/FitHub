import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CaloriesTracking.css';

function CaloriesTracking() {
  const [caloriesData, setCaloriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

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

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedData = () => {
    if (sortBy) {
      return caloriesData.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      });
    }
    return caloriesData;
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
              <th onClick={() => handleSort('date')}>Date</th>
              <th onClick={() => handleSort('meal_type')}>Meal Type</th>
              <th onClick={() => handleSort('calories')}>Calories</th>
            </tr>
          </thead>
          <tbody>
            {sortedData().map(item => (
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
