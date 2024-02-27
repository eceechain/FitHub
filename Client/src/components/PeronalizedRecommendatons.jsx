import React, { useState, useEffect } from 'react';

const PersonalizedRecommendations = () => {
    const [progress, setProgress] = useState([]);
    const [goals, setGoals] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        fetchProgress();
        fetchGoals();
    }, []);

    const fetchProgress = async () => {
        try {
            const response = await fetch('https://fithub-kl23.onrender.com/ProgressTracking');
            if (response.ok) {
                const data = await response.json();
                setProgress(data);
            } else {
                console.error('Failed to fetch progress data');
            }
        } catch (error) {
            console.error('Error fetching progress data:', error);
        }
    };

    const fetchGoals = async () => {
        try {
            const response = await fetch('https://fithub-kl23.onrender.com/GoalSetting');
            if (response.ok) {
                const data = await response.json();
                setGoals(data);
            } else {
                console.error('Failed to fetch goals data');
            }
        } catch (error) {
            console.error('Error fetching goals data:', error);
        }
    };

    useEffect(() => {
        if (progress.length > 0 && goals.length > 0) {
            const userGoals = goals.filter(goal => goal.user_id === getUserId());
            const userProgress = progress.filter(item => userGoals.some(goal => goal.goal_id === item.goal_id));
            const personalizedRecommendations = generateRecommendations(userGoals, userProgress);
            setRecommendations(personalizedRecommendations);
        }
    }, [progress, goals]);

    const getUserId = () => {
        return '123'; // Example user ID
    };

    const generateRecommendations = (userGoals, userProgress) => {
        const workoutRecommendations = userGoals.map(goal => {
            const progressForGoal = userProgress.find(item => item.goal_id === goal.goal_id);
            if (progressForGoal) {
                return `For goal '${goal.goal_type}', you should focus on ${progressForGoal.activity} for ${progressForGoal.duration} minutes per session.`;
            } else {
                return `You haven't made progress towards goal '${goal.goal_type}'. Start working on it with suitable exercises.`;
            }
        });
        return workoutRecommendations;
    };

    const updateResult = () => {
        // Implement your updateResult logic here
        return 'Update result logic here';
    };

    return (
        <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
            <h2>Personalized Recommendations</h2>
            <ul>
                {recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                ))}
            </ul>
            <form>
                <button type="submit" style={{ margin: '5px', backgroundColor: 'blue', color: 'white', fontSize: '1.2em' }}>Log Calories</button>
            </form>
            <div id="result" style={{ marginBottom: '20px', fontSize: '1.5em' }}>{updateResult()}</div>
        </div>
    );
};

export default PersonalizedRecommendations;
