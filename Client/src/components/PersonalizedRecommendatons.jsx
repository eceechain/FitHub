import React, { useState, useEffect } from 'react';

const PersonalizedRecommendations = () => {
  const [userGoals, setUserGoals] = useState('');
  const [workoutRecommendations, setWorkoutRecommendations] = useState([]);
  const [nutritionRecommendations, setNutritionRecommendations] = useState([]);

  useEffect(() => {
    // Logic to generate workout and nutrition recommendations based on userGoals
    if (userGoals === 'lose weight') {
      setWorkoutRecommendations(['Cardio intervals', 'Resistance training circuits', 'Plyometric exercises']);
      setNutritionRecommendations(['Grilled chicken breast', 'Steamed vegetables', 'Quinoa']);
    } else if (userGoals === 'muscle gain') {
      setWorkoutRecommendations(['Heavy compound lifts', 'Isolation exercises', 'High volume training']);
    setNutritionRecommendations(['Salmon fillet', 'Sweet potatoes', 'Avocado']);
    } else if (userGoals === 'improve endurance') {
      setWorkoutRecommendations(['Long-distance running', 'Cycling sprints', 'Swimming laps']);
      setNutritionRecommendations(['Oatmeal with berries', 'Bananas', 'Greek yogurt']);
    } else if (userGoals === 'increase flexibility') {
      setWorkoutRecommendations(['Yoga flows', 'Dynamic stretching', 'Foam rolling']);
      setNutritionRecommendations(['Spinach salad', 'Almonds', 'Chia seeds']);
    } else {
      setWorkoutRecommendations([]);
      setNutritionRecommendations([]);
    }
  }, [userGoals]);

  const handleGoalSubmit = () => {
    // Logic to process user goals and generate recommendations
    // This is where you would typically call APIs or perform calculations

    // Example dummy data for demonstration purposes
    setWorkoutRecommendations(['Push-ups', 'Squats', 'Planks']);
    setNutritionRecommendations(['Chicken breast', 'Broccoli', 'Brown rice']);
  };

  return (
    <div style={{ color: 'white' }}>
      <h1>Personalized Recommendations</h1>
      <label htmlFor="goals">Enter Your Fitness Goals:</label>
      <input
        type="text"
        id="goals"
        value={userGoals}
        onChange={(e) => setUserGoals(e.target.value)}
      />
      <button onClick={handleGoalSubmit} style={{ margin: '5px', backgroundColor: 'blue', color: 'white', fontSize: '1.2em' }}>Get Recommendations</button>

      <h2>Workout Recommendations:</h2>
      <ul>
        {workoutRecommendations.map((recommendation, index) => (
          <li key={index}>{recommendation}</li>
        ))}
      </ul>

      <h2>Nutrition Recommendations:</h2>
      <ul>
        {nutritionRecommendations.map((recommendation, index) => (
          <li key={index}>{recommendation}</li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalizedRecommendations;





