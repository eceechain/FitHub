class CalorieTracker {
    constructor() {
        this.calories = {};
    }

    logCalories(date, totalCalories) {
        if (date in this.calories) {
            this.calories[date] += totalCalories;
        } else {
            this.calories[date] = totalCalories;
        }
    }

    getCalories(date) {
        return this.calories[date] || 0;
    }
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    const date = document.getElementById("date").value;
    const calories = parseInt(document.getElementById("calories").value);

    tracker.logCalories(date, calories);
    updateResult();
    document.getElementById("calorieForm").reset();
}

// Function to update result display
function updateResult() {
    const date = document.getElementById("date").value;
    const calories = tracker.getCalories(date);

    document.getElementById("result").innerText = `Total calories consumed on ${date}: ${calories}`;
}

// Initialize CalorieTracker instance
const tracker = new CalorieTracker();

// Add event listener to form submission
document.getElementById("calorieForm").addEventListener("submit", handleSubmit);
