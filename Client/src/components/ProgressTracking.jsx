import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ProgressTracking() {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://fithub-kl23.onrender.com/ProgressTracking');
      setProgressData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching progress data. Please try again later.');
      setLoading(false);
      console.error('Error fetching progress data:', error);
    }
  };

  const sortByDate = () => {
    const sortedData = [...filteredData].sort((a, b) => new Date(a.date) - new Date(b.date));
    setFilteredData(sortedData);
  };

  const sortByWeight = () => {
    const sortedData = [...filteredData].sort((a, b) => a.weight - b.weight);
    setFilteredData(sortedData);
  };

  const sortByBodyFat = () => {
    const sortedData = [...filteredData].sort((a, b) => a.body_fat_percentage - b.body_fat_percentage);
    setFilteredData(sortedData);
  };

  const filterData = () => {
    const filtered = progressData.filter(item => {
      const date = new Date(item.date);
      if (startDate && endDate) {
        return date >= new Date(startDate) && date <= new Date(endDate);
      }
      if (startDate) {
        return date >= new Date(startDate);
      }
      if (endDate) {
        return date <= new Date(endDate);
      }
      return true;
    });
    setFilteredData(filtered);
  };

  const handleStartDateChange = e => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = e => {
    setEndDate(e.target.value);
  };

  return (
    <div>
      <h2>Progress Tracking</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <div className="button-group">
            <button onClick={sortByDate}>Sort by Date</button>
            <button onClick={sortByWeight}>Sort by Weight</button>
            <button onClick={sortByBodyFat}>Sort by Body Fat Percentage</button>
          </div>
          <div className="date-filter">
            <label>Start Date: <input type="date" value={startDate} onChange={handleStartDateChange} /></label>
            <label>End Date: <input type="date" value={endDate} onChange={handleEndDateChange} /></label>
            <button onClick={filterData}>Filter</button>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={filteredData}
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
              {filteredData.map(item => (
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
