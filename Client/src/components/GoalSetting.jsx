import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GoalSetting() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fithub-kl23.onrender.com/GoalSetting');
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Goal Setting</h2>
      <p>Allow users to set specific fitness goals, such as weight loss, muscle gain, or improving endurance, and track their progress towards these goals.</p>
      <div>
        {goals.map(goal => (
          <div key={goal.id}>
            <h3>Goal Type: {goal.goal_type}</h3>
            <p>Deadline: {goal.deadline}</p>
            <p>Target: {goal.target}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoalSetting;
