import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/GoalSetting.css';

function GoalSetting() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    goal_type: '',
    deadline: '',
    target: ''
  });
  const [error, setError] = useState('');
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editedGoal, setEditedGoal] = useState({
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
    const { name, value } = e.target;
    if (editingGoalId !== null) {
      setEditedGoal(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setNewGoal(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const addGoal = async () => {
    try {
      if (!newGoal.goal_type || !newGoal.deadline || !newGoal.target) {
        setError('Please fill out all fields');
        return;
      }
      await axios.post('https://fithub-kl23.onrender.com/GoalSetting', newGoal);
      setNewGoal({ goal_type: '', deadline: '', target: '' });
      setError('');
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

  const handleEdit = (goalId) => {
    const goalToEdit = goals.find(goal => goal.id === goalId);
    setEditingGoalId(goalId);
    setEditedGoal({ ...goalToEdit });
  };

  const saveEditedGoal = async () => {
    try {
      await axios.put(`https://fithub-kl23.onrender.com/GoalSetting/${editingGoalId}`, editedGoal);
      setEditingGoalId(null);
      fetchData();
    } catch (error) {
      console.error('Error editing goal:', error);
    }
  };

  const cancelEdit = () => {
    setEditingGoalId(null);
    setEditedGoal({
      goal_type: '',
      deadline: '',
      target: ''
    });
  };

  return (
    <div className="goal-setting-container">
      <h2>Goal Setting</h2>
      <p className="description">Allow users to set specific fitness goals, such as weight loss, muscle gain, or improving endurance, and track their progress towards these goals.</p>

      <div className="add-goal">
        <h3>Add New Goal</h3>
        <input type="text" name="goal_type" placeholder="Goal Type" value={newGoal.goal_type} onChange={handleInputChange} />
        <input type="text" name="deadline" placeholder="Deadline" value={newGoal.deadline} onChange={handleInputChange} />
        <input type="number" name="target" placeholder="Target" value={newGoal.target} onChange={handleInputChange} />
        <button onClick={addGoal}>Add Goal</button>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="current-goals">
        <h3>Current Goals</h3>
        {goals.map(goal => (
          <div key={goal.id} className="goal-item">
            {editingGoalId === goal.id ? (
              <>
                <input type="text" name="goal_type" value={editedGoal.goal_type} onChange={handleInputChange} />
                <input type="text" name="deadline" value={editedGoal.deadline} onChange={handleInputChange} />
                <input type="number" name="target" value={editedGoal.target} onChange={handleInputChange} />
                <div>
                  <button className="save-button" onClick={saveEditedGoal}>Save</button>
                  <button className="cancel-button" onClick={cancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h4>Goal Type: {goal.goal_type}</h4>
                <p>Deadline: {goal.deadline}</p>
                <p>Target: {goal.target}</p>
                <div>
                  <button className="edit-button" onClick={() => handleEdit(goal.id)}>Edit</button>
                  <button className="delete-button" onClick={() => deleteGoal(goal.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoalSetting;
