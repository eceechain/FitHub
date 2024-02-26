import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProgressTracking.css'

function ProgressTracking() {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://fithub-kl23.onrender.com/ProgressTracking');
      setProgressData(response.data);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };

  return (
    <div>
      <h2>Progress Tracking</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight</th>
            <th>Body Fat Percentage</th>
          </tr>
        </thead>
        <tbody>
          {progressData.map(item => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.weight}</td>
              <td>{item.body_fat_percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProgressTracking;
