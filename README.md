# FitHub

FitHub is an all-in-one fitness tracking application designed to help users maintain a consistent fitness routine and achieve their fitness goals effectively. It offers a centralized platform for tracking workout sessions, monitoring caloric intake, visualizing progress over time, and more. FitHub empowers users to stay motivated, accountable, and on track towards their fitness aspirations.

## Getting Started

To start using FitHub, follow these steps:

1. Clone the repository:
git clone git@github.com:eceechain/FitHub.git


2. Navigate to the project directory:
cd FitHub


3. **Install dependencies:** 
npm install # Install frontend dependencies
pip install -r requirements.txt # Install backend dependencies


4. Configure environment variables:
- Set up environment variables for database connection, API keys, etc.

5. Start the backend server:

     (1)python3 app.py

     (2)Flask run


6. Start the frontend development server:

     (1)npm start

     (2)npm run dev


7. Access the application via [http://localhost:3000](http://localhost:3000) in your browser.

## MVP Features

### React Frontend:

1. **User Registration and Authentication:** 
- Seamlessly register and login to access personalized fitness tracking features.

2. **Dashboard Overview:** 
- Get a comprehensive overview of fitness progress upon logging in.
- Track basic stats like total workouts completed, calories burned, and weight changes.

3. **Workout Logs:** 
- Record daily workouts with details such as exercise duration, type, sets, and reps.

4. **Calories Tracking:** 
- Log daily caloric intake manually or integrate with a nutrition database for accuracy.

5. **Progress Tracking:** 
- Visualize fitness progress over time through charts and graphs.
- Monitor weight changes and improvements in workout performance.

6. **Goal Setting:** 
- Set specific fitness goals (e.g., weight loss, muscle gain) and track progress.

7. **Social Sharing:** 
- Share achievements and progress on social media platforms for added motivation and support.

### Python Backend:

1. **User Management:** 
- Develop API endpoints for user registration, login, and authentication.

2. **Database Integration:** 
- Utilize a database to store user information, workout logs, calorie data, and progress tracking.

3. **Workout and Calorie Logging Endpoint:** 
- Create API endpoints to handle recording and retrieval of workout and calorie data.

4. **Progress Tracking Endpoint:** 
- Implement API endpoints to calculate and retrieve progress data over time.

5. **Goal Setting Endpoint:** 
- Manage setting, updating, and tracking of user fitness goals.

6. **Authentication Middleware:** 
- Secure API endpoints and validate user authentication using JWT.

7. **Third-Party Integrations:** 
- Integrate with external services (e.g., nutrition databases) for accurate calorie information.

8. **Social Media Sharing Integration:** 
- Incorporate functionality to enable users to share achievements on social media.

## Additional Features

FitHub also includes:

1. **Custom Workout Plans:** 
- Create and follow personalized workout plans tailored to individual goals and preferences.

2. **Nutrition Tracking:** 
- Track macronutrient intake (protein, carbohydrates, fats) to ensure a balanced diet.

3. **Integration with Fitness Devices:** 
- Sync with popular fitness devices (e.g., Fitbit, Apple Watch) to automatically track workouts and activity.

4. **Community Support:** 
- Join communities and forums to connect with like-minded individuals, share tips, and provide support.

## Technologies Used

- React
- Python3
- Flask
- PostgreSQL
- JWT

## Collaborators

- Jared 
- Isaac
- Craig
- Ali
- Leroy
- Abass

## License

FitHub is licensed under the [MIT License](LICENSE). Feel free to use and modif