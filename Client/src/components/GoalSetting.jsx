import React, { useState, useEffect } from 'react';

const GoalSettingComponent = () => {
  const API_URL = 'https://fithub-kl23.onrender.com/GoalSetting';

  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    user_id: '',
    goal_type: '',
    target: '',
    deadline: ''
  });
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setGoals(data);
      } else {
        console.error('Failed to fetch goals');
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const fetchGoalById = async (goalId) => {
    try {
      const response = await fetch(`${API_URL}/${goalId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedGoal(data.goal);
      } else {
        console.error('Failed to fetch goal');
      }
    } catch (error) {
      console.error('Error fetching goal:', error);
    }
  };
  const addGoal = async (newGoalData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoalData),
      });
      if (response.ok) {
        fetchGoals();
        return response;
      } else {
        throw new Error('Failed to add goal');
      }
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const updateGoal = async (goalId, updatedGoalData) => {
    try {
      const response = await fetch(`${API_URL}/${goalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGoalData),
      });
      if (response.ok) {
        fetchGoals();
        return response;
      } else {
        throw new Error('Failed to update goal');
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      const response = await fetch(`${API_URL}/${goalId}`, { method: 'DELETE' });
      if (response.ok) {
        fetchGoals();
      } else {
        console.error('Failed to delete goal');
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prevGoal) => ({
      ...prevGoal,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addGoal(newGoal);
      if (response && response.ok) { // Check if response exists and is successful
        setNewGoal({
          user_id: '',
          goal_type: '',
          target: '',
          deadline: ''
        });
        alert('Goal added successfully!');
      } else {
        console.error('Failed to add goal');
      }
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
     <h1>Goal Setting</h1>
     <form onSubmit={handleSubmit}>
       <input
         type="text"
         name="user_id"
         value={newGoal.user_id}
         placeholder="User ID"
         onChange={handleInputChange}
       />
       <input
         type="text"
         name="goal_type"
         value={newGoal.goal_type}
         placeholder="Goal Type"
         onChange={handleInputChange}
       />
       <input
         type="text"
         name="target"
         value={newGoal.target}
         placeholder="Target"
         onChange={handleInputChange}
       />
       <input
         type="datetime-local"
         name="deadline"
         value={newGoal.deadline}
         onChange={handleInputChange}
       />
       <button style={{ backgroundColor: 'blue', color: 'white' }} type="submit">Add Goal</button>
     </form>
     <ul>
       {goals.map((goal) => (
         <li key={goal.id} onClick={() => fetchGoalById(goal.id)}>
           User ID: {goal.user_id}, Goal Type: {goal.goal_type}, Target: {goal.target}, Deadline: {new Date(goal.deadline).toLocaleString()}
           <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => deleteGoal(goal.id)}>Delete</button>
           <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => updateGoal(goal.id, { ...goal, target: 'Updated target' })}>Update</button>
         </li>
       ))}
     </ul>
     {selectedGoal && (
       <div>
         <h2>Selected Goal</h2>
         <p>User ID: {selectedGoal.user_id}</p>
         <p>Goal Type: {selectedGoal.goal_type}</p>
         <p>Target: {selectedGoal.target}</p>
         <p>Deadline: {new Date(selectedGoal.deadline).toLocaleString()}</p>
       </div>
     )}
   </div>
 );
};

export default GoalSettingComponent;
