import React, { useState } from 'react';
import '../styles/CalorieTracking.css'
const CalorieTracker = () => {
    const [calories, setCalories] = useState({});
    const [date, setDate] = useState('');
    const [totalCalories, setTotalCalories] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (!date || !totalCalories) return;
      
      setCalories(prevCalories => {
        const newCalories = { ...prevCalories };
        if (date in newCalories) {
          newCalories[date] += parseInt(totalCalories);
        } else {
          newCalories[date] = parseInt(totalCalories);
        }
        return newCalories;
      });
  
      setDate('');
      setTotalCalories('');
    };
  
    const getCalories = (date) => {
      return calories[date] || 0;
    };
  
    const updateResult = () => {
      let total = 0;
      for (const key in calories) {
        total += calories[key];
      }
      return `Total calories consumed: ${total}`;
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black', color: 'white', padding: '20px', margin: 0 }}>
        <h1 style={{ fontSize: '2em' }}>Calorie Tracker</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="date" style={{ fontSize: '1.2em' }}>Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ margin: '5px', fontSize: '1.2em' }}
          /><br />
          <label htmlFor="calories" style={{ fontSize: '1.2em' }}>Calories:</label>
          <input
            type="number"
            id="calories"
            value={totalCalories}
            onChange={(e) => setTotalCalories(e.target.value)}
            required
            style={{ margin: '5px', fontSize: '1.2em' }}
          /><br />
          <button type="submit" style={{ margin: '5px', backgroundColor: 'blue', color: 'white', fontSize: '1.2em' }}>Log Calories</button>
        </form>
        <div id="result" style={{ marginBottom: '20px', fontSize: '1.5em' }}>{updateResult()}</div>
      </div>
    );
};

export default CalorieTracker;



