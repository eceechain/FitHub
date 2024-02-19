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

// Add event listener to form submission
document.getElementById("goalForm").addEventListener("submit", handleSubmit);
