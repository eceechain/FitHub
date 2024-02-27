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

    const handleClear = () => {
        setFoodQueries([]);
        setNutritionData([]);
        setError(null);
    };

    const handleDeleteLast = () => {
        setFoodQueries(prevQueries => prevQueries.slice(0, -1));
    };

    const calculateTotalNutrients = () => {
        const totals = {
            calories: 0,
            serving_size_g: 0,
            fat_total_g: 0,
            fat_saturated_g: 0,
            protein_g: 0,
            sodium_mg: 0,
            potassium_mg: 0,
            cholesterol_mg: 0,
            carbohydrates_total_g: 0,
            fiber_g: 0,
            sugar_g: 0
        };

        nutritionData.forEach(food => {
            if (food.length > 0) {
                const nutritionInfo = food[0];
                totals.calories += nutritionInfo.calories;
                totals.serving_size_g += nutritionInfo.serving_size_g;
                totals.fat_total_g += nutritionInfo.fat_total_g;
                totals.fat_saturated_g += nutritionInfo.fat_saturated_g;
                totals.protein_g += nutritionInfo.protein_g;
                totals.sodium_mg += nutritionInfo.sodium_mg;
                totals.potassium_mg += nutritionInfo.potassium_mg;
                totals.cholesterol_mg += nutritionInfo.cholesterol_mg;
                totals.carbohydrates_total_g += nutritionInfo.carbohydrates_total_g;
                totals.fiber_g += nutritionInfo.fiber_g;
                totals.sugar_g += nutritionInfo.sugar_g;
            }
        });

        return totals;
    };

    const totalNutrients = calculateTotalNutrients();

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundImage: `url('nutrition-background.jpg')`, /* Replace 'nutrition-background.jpg' with the path to your background image */
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div style={{
                width: '80%',
                maxWidth: '800px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)', /* Semi-transparent white background */
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', /* Shadow effect */
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }}>
                <h1 style={{ textAlign: 'center', color: '#333', width: '100%' }}>Nutrition</h1>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginBottom: '20px' }}>
                    <label htmlFor="foodQuery" style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#333' }}>Enter food items (separated by commas):</label>
                    <input
                        type="text"
                        id="foodQuery"
                        value={foodQueries.join(', ')}
                        onChange={handleFoodInputChange}
                        required
                        style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem' }}
                    />
                    <button
                        type="submit"
                        style={{ 
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50', /* Green background color */
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'background-color 0.3s ease'
                        }}
                    >
                        Nutrition Data
                    </button>
                </form>
                <div>
                    <button
                        onClick={handleClear}
                        style={{ 
                            padding: '10px 20px',
                            backgroundColor: '#FF5733', /* Red background color */
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'background-color 0.3s ease',
                            marginRight: '10px'
                        }}
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleDeleteLast}
                        style={{ 
                            padding: '10px 20px',
                            backgroundColor: '#3498db', /* Blue background color */
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'background-color 0.3s ease'
                        }}
                    >
                        Delete 
                    </button>
                </div>
                {error && <p style={{ color: '#FF0000', textAlign: 'center', width: '100%' }}>{error}</p>}
            </div>
            <div style={{
                width: '80%',
                maxWidth: '800px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gridGap: '20px'
            }}>
                {nutritionData.map((data, index) => (
                    <div key={index} style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)', /* Semi-transparent white background */
                        padding: '20px',
                        borderRadius: '10px',
                        marginBottom: '20px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', /* Shadow effect */
                    }}>
                        <h2 style={{ marginBottom: '10px' }}>Food Item {index + 1}</h2>
                        {data.length === 0 ? (
                            <p>No data available</p>
                        ) : (
                            data.map((nutritionInfo, i) => (
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
                            ))
                        )}
                    </div>
                ))}
            </div>
            <div style={{
                width: '80%',
                maxWidth: '800px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)', /* Semi-transparent white background */
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' /* Shadow effect */
            }}>
                <h2 style={{ marginBottom: '10px' }}>Total Nutrients</h2>
                <p>Calories: {totalNutrients.calories}</p>
                <p>Serving Size (g): {totalNutrients.serving_size_g}</p>
                <p>Total Fat (g): {totalNutrients.fat_total_g}</p>
                <p>Saturated Fat (g): {totalNutrients.fat_saturated_g}</p>
                <p>Protein (g): {totalNutrients.protein_g}</p>
                <p>Sodium (mg): {totalNutrients.sodium_mg}</p>
                <p>Potassium (mg): {totalNutrients.potassium_mg}</p>
                <p>Cholesterol (mg): {totalNutrients.cholesterol_mg}</p>
                <p>Total Carbohydrates (g): {totalNutrients.carbohydrates_total_g}</p>
                <p>Fiber (g): {totalNutrients.fiber_g}</p>
                <p>Sugar (g): {totalNutrients.sugar_g}</p>
            </div>
        </div>
    );
}

export default Nutrition;
