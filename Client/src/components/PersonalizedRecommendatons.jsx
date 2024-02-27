import React, { useState, useEffect } from 'react';

function PersonalizedRecommendations() {
  const [workoutPlan, setWorkoutPlan] = useState('');
  const [nutritionPlan, setNutritionPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: 123 }) // Replace with actual user ID
      });
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      const data = await response.json();
      setWorkoutPlan(data.workoutPlan);
      setNutritionPlan(data.nutritionPlan);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError('Failed to fetch recommendations');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Personalized Recommendations</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {workoutPlan && (
            <div>
              <h2>Workout Plan:</h2>
              <p>{workoutPlan}</p>
            </div>
          )}
          {nutritionPlan && (
            <div>
              <h2>Nutrition Plan:</h2>
              <p>{nutritionPlan}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PersonalizedRecommendations;
