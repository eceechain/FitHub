let chart; // Declare chart variable globally to access it within updateGraph function

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    const goal = document.getElementById("goal").value;
    const progress = parseInt(document.getElementById("progress").value);

    setGoal(goal, progress);
}

// Function to set and display the fitness goal and progress
function setGoal(goal, progress) {
    const goalText = getGoalText(goal);
    const progressDisplay = document.getElementById("progressDisplay");
    
    progressDisplay.innerHTML = `
        <p>Your fitness goal is ${goalText}.</p>
        <p>Your progress towards this goal is ${progress}%.</p>
    `;

    updateGraph(goal, progress); // Update the graph with the new goal and progress
}
// Function to get text representation of the selected fitness goal
function getGoalText(goal) {
    switch (goal) {
        case "weightLoss":
            return "Weight Loss";
        case "muscleGain":
            return "Muscle Gain";
        case "endurance":
            return "Improving Endurance";
        default:
            return "";
    }
}


// Function to update the graph with user's progress
function updateGraph(goal, progress) {
    const progressGraph = document.getElementById("progressGraph").getContext("2d");

    // Initialize chart with appropriate data based on goal
    const chartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Progress',
            data: [50, 60, 70, progress], // Initial data with the current progress
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
            fill: false
        }]
    };

    // Destroy previous chart instance if it exists
    if (chart) {
        chart.destroy();
    }

    // Create new chart instance
    chart = new Chart(progressGraph, {
        type: 'line',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Function to handle input value change
function handleInputChange(event) {
    const progress = parseInt(event.target.value);
    updateGraph(progress); // Update the graph with the new progress
}

// Add event listener to form submission
document.getElementById("goalForm").addEventListener("submit", handleSubmit);

// Add event listener to input value change
document.getElementById("progress").addEventListener("input", handleInputChange);


