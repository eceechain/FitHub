function handleSubmit(event) {
    event.preventDefault();

    const goal = document.getElementById("goal").value;
    const nutrition = parseInt(document.getElementById("nutrition").value);

    const recommendations = getRecommendations(goal, nutrition);
    displayRecommendations(recommendations);
}

// Function to get recommendations based on user's goal and nutrition
function getRecommendations(goal, nutrition) {
    let workoutRecommendation = "";
    let nutritionRecommendation = "";

    // Logic for workout and nutrition recommendations based on user's goal and nutrition
    switch (goal) {
        case "weightLoss":
            workoutRecommendation = "Cardio exercises like running, cycling, or swimming combined with strength training.";
            nutritionRecommendation = "Focus on a balanced diet with a slight calorie deficit. Include plenty of vegetables, lean proteins, and whole grains.";
            break;
        case "muscleGain":
            workoutRecommendation = "Strength training exercises targeting major muscle groups such as squats, deadlifts, bench presses, and rows.";
            nutritionRecommendation = "Consume a diet high in protein to support muscle growth, along with complex carbohydrates and healthy fats.";
            break;
        case "endurance":
            workoutRecommendation = "High-intensity interval training (HIIT) and endurance exercises like running, cycling, or swimming.";
            nutritionRecommendation = "Fuel your workouts with complex carbohydrates for sustained energy and include adequate protein and hydration.";
            break;
        default:
            break;
    }

    return { workoutRecommendation, nutritionRecommendation };
}

// Function to display recommendations
function displayRecommendations(recommendations) {
    const recommendationsDiv = document.getElementById("recommendations");
    recommendationsDiv.innerHTML = `
        <h2>Workout Recommendation:</h2>
        <p>${recommendations.workoutRecommendation}</p>
        <h2>Nutrition Recommendation:</h2>
        <p>${recommendations.nutritionRecommendation}</p>
    `;
}

// Add event listener to form submission
document.getElementById("goalForm").addEventListener("submit", handleSubmit);
