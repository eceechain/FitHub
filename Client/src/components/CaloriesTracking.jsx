import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CaloriesTracking.css';

function CaloriesTracking() {
  const [caloriesData, setCaloriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newCalorie, setNewCalorie] = useState({
    date: '',
    meal_type: '',
    calories: ''
  });

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

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`https://fithub-kl23.onrender.com/Calories/${id}`);
      setCaloriesData(caloriesData.filter(item => item.id !== id));
      setLoading(false);
    } catch (error) {
      setError('Error deleting calories data. Please try again later.');
      setLoading(false);
      console.error('Error deleting calories data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCalorie(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCaloriesData(prevData => [
      ...prevData,
      {
        id: Math.random().toString(36).substr(2, 9), // Generate random ID for temporary entry
        ...newCalorie
      }
    ]);
    setNewCalorie({
      date: '',
      meal_type: '',
      calories: ''
    });
  };

  return (
    <div className="calories-tracking">
      <h2>Calories Tracking</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              Date:
              <input type="text" name="date" value={newCalorie.date} onChange={handleChange} />
            </label>
            <label>
              Meal Type:
              <input type="text" name="meal_type" value={newCalorie.meal_type} onChange={handleChange} />
            </label>
            <label>
              Calories:
              <input type="number" name="calories" value={newCalorie.calories} onChange={handleChange} />
            </label>
            <button type="submit">Add Calorie</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Meal Type</th>
                <th>Calories</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {caloriesData.map(item => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.meal_type}</td>
                  <td>{item.calories}</td>
                  <td>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default CaloriesTracking;
