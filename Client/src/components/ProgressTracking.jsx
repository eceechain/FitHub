import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ProgressTracking() {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://fithub-kl23.onrender.com/ProgressTracking');
      setProgressData(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching progress data. Please try again later.');
      setLoading(false);
      console.error('Error fetching progress data:', error);
    }
  };

  const sortByDate = () => {
    setProgressData([...progressData].sort((a, b) => new Date(a.date) - new Date(b.date)));
  };

  const sortByWeight = () => {
    setProgressData([...progressData].sort((a, b) => a.weight - b.weight));
  };

  const sortByBodyFat = () => {
    setProgressData([...progressData].sort((a, b) => a.body_fat_percentage - b.body_fat_percentage));
  };

  return (
    <div>
      <h2>Progress Tracking</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <div>
            <button onClick={sortByDate}>Sort by Date</button>
            <button onClick={sortByWeight}>Sort by Weight</button>
            <button onClick={sortByBodyFat}>Sort by Body Fat Percentage</button>
          </div>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <LineChart
                data={progressData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                <Line type="monotone" dataKey="body_fat_percentage" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
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
        </>
      )}
    </div>
  );
}

export default ProgressTracking;
