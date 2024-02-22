import React, { useState } from 'react';

function Nutrition() {
    const [foodQueries, setFoodQueries] = useState([]);
    const [nutritionData, setNutritionData] = useState([]);
    const [error, setError] = useState(null);

    const fetchNutritionData = async () => {
        try {
            const apiKey = 'Db4/NYLkJ3xof9RojTrPPg==qvS0gzCNB7CEamM5';
            const requests = foodQueries.map(query =>
                fetch(`https://api.api-ninjas.com/v1/nutrition?query=${query}&X-Api-Key=${apiKey}`)
            );
            const responses = await Promise.all(requests);
            const data = await Promise.all(responses.map(response => response.json()));
            setNutritionData(data);
        } catch (error) {
            console.error('Error fetching nutrition data:', error);
            setError('Error fetching nutrition data. Please try again.');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchNutritionData();
    };

    const handleFoodInputChange = (event) => {
        const { value } = event.target;
        setFoodQueries(value.split(',').map(food => food.trim()));
    };

    return (
        <div>
            <h1>Nutrition</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="foodQuery">Enter food items (separated by commas):</label>
                <input
                    type="text"
                    id="foodQuery"
                    value={foodQueries.join(', ')}
                    onChange={handleFoodInputChange}
                    required
                />
                <button type="submit">Fetch Nutrition Data</button>
            </form>
            {error && <p>{error}</p>}
            {nutritionData.length > 0 && (
                <div>
                    {nutritionData.map((data, index) => (
                        <div key={index}>
                            <h2>Food Item {index + 1}</h2>
                            {data.length === 0 ? (
                                <p>No data available</p>
                            ) : (
                                <div>
                                    {data.map((nutritionInfo, i) => (
                                        <div key={i}>
                                            <p>Name: {nutritionInfo.name}</p>
                                            <p>Calories: {nutritionInfo.calories}</p>
                                            <p>Serving Size (g): {nutritionInfo.serving_size_g}</p>
                                            <p>Total Fat (g): {nutritionInfo.fat_total_g}</p>
                                            <p>Saturated Fat (g): {nutritionInfo.fat_saturated_g}</p>
                                            <p>Protein (g): {nutritionInfo.protein_g}</p>
                                            <p>Sodium (mg): {nutritionInfo.sodium_mg}</p>
                                            <p>Potassium (mg): {nutritionInfo.potassium_mg}</p>
                                            <p>Cholesterol (mg): {nutritionInfo.cholesterol_mg}</p>
                                            <p>Total Carbohydrates (g): {nutritionInfo.carbohydrates_total_g}</p>
                                            <p>Fiber (g): {nutritionInfo.fiber_g}</p>
                                            <p>Sugar (g): {nutritionInfo.sugar_g}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Nutrition;
