import React, { useState, useEffect } from 'react';

// function PersonalizedRecommendations() {
//   const [workoutPlan, setWorkoutPlan] = useState('');
//   const [nutritionPlan, setNutritionPlan] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchRecommendations();
//   }, []);

//   const fetchRecommendations = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5001/recommendations', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ userId: 123 }) // Replace with actual user ID
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch recommendations');
//       }
//       const data = await response.json();
//       setWorkoutPlan(data.workoutPlan);
//       setNutritionPlan(data.nutritionPlan);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching recommendations:', error);
//       setError('Failed to fetch recommendations');
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Personalized Recommendations</h1>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           {workoutPlan && (
//             <div>
//               <h2>Workout Plan:</h2>
//               <p>{workoutPlan}</p>
//             </div>
//           )}
//           {nutritionPlan && (
//             <div>
//               <h2>Nutrition Plan:</h2>
//               <p>{nutritionPlan}</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default PersonalizedRecommendations;

//code from the latest merge from leroy/craig
const PersonalizedRecommendations = () => {
  const [userGoals, setUserGoals] = useState('');
  const [workoutRecommendations, setWorkoutRecommendations] = useState([]);
  const [nutritionRecommendations, setNutritionRecommendations] = useState([]);

  useEffect(() => {
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





