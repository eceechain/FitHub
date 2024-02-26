// import React, { useState } from 'react';

// function CalorieTracking() {
//   const [foodQuery, setFoodQuery] = useState('');
//   const [nutritionData, setNutritionData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${foodQuery}&X-Api-Key=Db4/NYLkJ3xof9RojTrPPg==qvS0gzCNB7CEamM5`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch nutrition data');
//       }
//       const data = await response.json();
//       setNutritionData(data);
//       setLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
//       <h1>Calorie Tracking</h1>
//       <form onSubmit={handleSubmit}>
//         <label style={{ marginRight: '10px' }}>
//           Food Query:
//           <input
//             type="text"
//             value={foodQuery}
//             onChange={(e) => setFoodQuery(e.target.value)}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//         <button type="submit" style={{ backgroundColor: 'blue', color: 'white' }}>Search</button>
//       </form>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       {nutritionData && (
//         <div>
//           {nutritionData.map((food, index) => (
//             <div key={index} style={{ marginTop: '20px' }}>
//               <h2>{food.name}</h2>
//               <p><strong>Calories:</strong> {food.calories}</p>
//               <p><strong>Serving Size:</strong> {food.serving_size_g} g</p>
//               <p><strong>Total Fat:</strong> {food.fat_total_g} g</p>
//               <p><strong>Saturated Fat:</strong> {food.fat_saturated_g} g</p>
//               <p><strong>Protein:</strong> {food.protein_g} g</p>
//               <p><strong>Sodium:</strong> {food.sodium_mg} mg</p>
//               <p><strong>Potassium:</strong> {food.potassium_mg} mg</p>
//               <p><strong>Cholesterol:</strong> {food.cholesterol_mg} mg</p>
//               <p><strong>Total Carbohydrates:</strong> {food.carbohydrates_total_g} g</p>
//               <p><strong>Fiber:</strong> {food.fiber_g} g</p>
//               <p><strong>Sugar:</strong> {food.sugar_g} g</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default CalorieTracking;



import React, { useState } from 'react';

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



