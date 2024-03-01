import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PersonalizedRecommendations = () => {
  const [userGoals, setUserGoals] = useState('');
  const [workoutRecommendations, setWorkoutRecommendations] = useState([]);
  const [nutritionRecommendations, setNutritionRecommendations] = useState([]);
  
  const allNutritionRecommendations = [
    "Try to incorporate more fruits and vegetables into your meals for added fiber and nutrients.",
    "Consider adding lean protein sources like chicken, fish, or tofu to your meals to support muscle growth.",
    "Drink plenty of water throughout the day to stay hydrated, especially during workouts.",
    "Include healthy fats like avocado, nuts, and olive oil in your diet for energy and satiety.",
    "Limit processed foods and sugary drinks to support overall health and fitness goals.",
    

 
"Make sure to get enough sleep each night to support recovery and overall well-being.",
"Incorporate a variety of colorful vegetables into your meals for a range of vitamins and minerals.",
"Choose whole, unprocessed foods whenever possible to maximize nutrient intake.",
"Include sources of healthy fats like nuts, seeds, and fatty fish in your diet for heart health.",
"Stay mindful of portion sizes to avoid overeating and support weight management goals.",
"Consider trying new recipes and cooking methods to keep meals interesting and enjoyable.",
"Stay hydrated throughout the day by drinking water and other hydrating beverages.",
"Limit added sugars in your diet by choosing whole foods over processed snacks and desserts.",
"Practice mindful eating by paying attention to hunger and fullness cues.",
"Engage in regular physical activity to support overall health and well-being.",
"Set realistic and achievable goals for yourself to maintain motivation and progress.",
"Incorporate sources of probiotics like yogurt and fermented foods for gut health.",
"Stay consistent with your nutrition and exercise habits to see long-term results.",
"Practice moderation rather than restriction when it comes to indulgent foods.",
"Make time for relaxation and stress management to support overall health.",
"Listen to your body's hunger and fullness signals to guide your eating habits.",
"Focus on progress, not perfection, when it comes to your health and fitness journey.",
"Plan and prepare meals ahead of time to make healthy choices easier throughout the week.",
"Include sources of protein at each meal to support muscle repair and growth.",
"Experiment with different cooking techniques to enhance the flavor of your meals.",
"Stay mindful of portion sizes when enjoying foods that are higher in calories.",
"Incorporate a variety of whole grains into your diet for fiber and sustained energy.",
"Stay informed about nutrition trends and research to make informed choices about your diet.",
"Make time for regular physical activity that you enjoy to support your overall well-being.",
"Include sources of omega-3 fatty acids like salmon, flaxseeds, and walnuts in your diet for brain health.",
"Practice gratitude and mindfulness to foster a positive relationship with food and body image.",
"Stay hydrated by drinking water throughout the day, especially during workouts and hot weather.",
"Listen to your body's hunger and fullness cues to guide your eating habits.",
"Incorporate a variety of fruits and vegetables into your meals for a range of nutrients and antioxidants.",
"Limit processed foods and snacks high in added sugars to support overall health and well-being.",
"Include sources of healthy fats like avocados, nuts, and olive oil in your diet for heart health.",
"Prioritize quality sleep to support recovery and overall well-being.",
"Stay consistent with your nutrition and exercise habits to see long-term results.",
"Focus on balance and moderation rather than strict rules when it comes to your diet.",
"Find enjoyable forms of physical activity to stay active and motivated.",
"Incorporate sources of fiber like whole grains, fruits, and vegetables into your diet for digestive health.",
"Practice mindful eating by savoring each bite and paying attention to hunger and fullness cues.",
"Include sources of lean protein like chicken, turkey, and tofu in your meals for muscle repair and growth.",
"Stay hydrated by drinking water throughout the day, especially before and after exercise.",
"Plan and prepare meals ahead of time to make healthy choices easier throughout the week.",
"Include a variety of colors on your plate to ensure you're getting a range of nutrients in your diet.",
"Stay mindful of portion sizes to avoid overeating and support weight management goals.",
"Incorporate sources of antioxidants like berries, leafy greens, and nuts into your diet for overall health.",
  ];

  useEffect(() => {
    // Set initial nutrition recommendations to the first five from the allNutritionRecommendations array
    setNutritionRecommendations(allNutritionRecommendations.slice(0, 5));
    fetchWorkouts();
  }, [userGoals]);

  const fetchWorkouts = async () => {
    console.log('Fetching workouts...');
    try {
      const response = await axios.get('https://fithub-kl23.onrender.com/Workouts');
      const { workouts } = response.data;
      if (Array.isArray(workouts)) {
        const shuffledWorkouts = workouts.sort(() => 0.5 - Math.random());
        const selectedWorkouts = shuffledWorkouts.slice(0, 5);
        console.log('Workout Recommendations:', selectedWorkouts);
        setWorkoutRecommendations(selectedWorkouts);
      } else {
        console.error('Invalid response format for workouts:', response.data);
      }
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const fetchRandomNutrition = () => {
    // Shuffle the entire array of nutrition recommendations
    const shuffledNutrition = [...allNutritionRecommendations].sort(() => 0.5 - Math.random());
    // Select the first five from the shuffled array
    const selectedNutrition = shuffledNutrition.slice(0, 5);
    console.log('Nutrition Recommendations:', selectedNutrition);
    setNutritionRecommendations(selectedNutrition);
  };

  return (
    <div className="workout-logs-container">
      <h2>Personalized Recommendations</h2>
      <label htmlFor="goals" style={{ color: 'white' }}>Enter Your Fitness Goals:</label>
      <select id="goals" value={userGoals} onChange={(e) => setUserGoals(e.target.value)}>
        <option value="">Select a goal</option>
        <option value="lose weight">Lose Weight</option>
        <option value="muscle gain">Muscle Gain</option>
        <option value="improve endurance">Improve Endurance</option>
        <option value="increase flexibility">Increase Flexibility</option>
      </select>
      <button onClick={fetchWorkouts} style={{ backgroundColor: 'green', color: 'white' }}>Get Recommendations</button>

      <h2>Workout Recommendations:</h2>
      <div className="workout-list">
        {workoutRecommendations.map((workout, index) => (
          <div className="workout-item" key={index}>
            <img className="workout-image" src={workout.image} alt={workout.description} />
            <div className="workout-details">
              <h3>{workout.description}</h3>
              <p>Duration: {workout.duration} minutes</p>
              <p>Sets: {workout.sets}</p>
              <p>Reps: {workout.reps}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: nutritionRecommendations.length > 0 ? 'block' : 'none' }}>
        <h2>Nutrition Recommendations:</h2>
        <div className="workout-list">
          {nutritionRecommendations.map((recommendation, index) => (
            <div className="workout-item" key={index}>
              <div className="workout-details">
                <p>{recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button onClick={fetchRandomNutrition} style={{ backgroundColor: 'green', color: 'white' }}>Get Nutrition Recommendations</button>
    </div>
  );
};

export default PersonalizedRecommendations;