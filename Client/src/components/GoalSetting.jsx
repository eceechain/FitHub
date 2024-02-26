import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GoalSetting() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    goal_type: '',
    deadline: '',
    target: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://fithub-kl23.onrender.com/GoalSetting');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewGoal({ ...newGoal, [e.target.name]: e.target.value });
  };

  const addGoal = async () => {
    try {
      await axios.post('https://fithub-kl23.onrender.com/GoalSetting', newGoal);
      setNewGoal({ goal_type: '', deadline: '', target: '' });
      fetchData();
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await axios.delete(`https://fithub-kl23.onrender.com/GoalSetting/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  return (
    <div>
      <h2>Goal Setting</h2>
      <p>Allow users to set specific fitness goals, such as weight loss, muscle gain, or improving endurance, and track their progress towards these goals.</p>

      <div>
        <h3>Add New Goal</h3>
        <input type="text" name="goal_type" placeholder="Goal Type" value={newGoal.goal_type} onChange={handleInputChange} />
        <input type="text" name="deadline" placeholder="Deadline" value={newGoal.deadline} onChange={handleInputChange} />
        <input type="text" name="target" placeholder="Target" value={newGoal.target} onChange={handleInputChange} />
        <button onClick={addGoal}>Add Goal</button>
      </div>

      <div>
        <h3>Current Goals</h3>
        {goals.map(goal => (
          <div key={goal.id}>
            <h4>Goal Type: {goal.goal_type}</h4>
            <p>Deadline: {goal.deadline}</p>
            <p>Target: {goal.target}</p>
            <button onClick={() => deleteGoal(goal.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoalSetting;
