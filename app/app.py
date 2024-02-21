
import datetime
import requests
import tweepy
from tweepy import TweepError
from flask import Flask, jsonify, redirect,  url_for, request
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from models import User, WorkoutLog, CalorieLog, GoalSetting, ProgressTracking, AuthToken, db
from sqlalchemy.orm import class_mapper


app = Flask(__name__)
CORS(app)

migrate = Migrate(app, db)

# Twitter API keys
consumer_key = 'Ybh2edeoVCGgDzz8J6CsMvBBf'
consumer_secret = '7P5iFnQJUGrfNL5zBJHGSaftiGU2vZSOQ32E6yCzVkKQOOw0mk'
access_token = '1608973500143869956-jB4olbq9lMudzc6ykuPMjwW3bIsstr'
access_token_secret = '0pHtPY1HS0xprjzBbKD0uOaHAW4LXgqCTUPa6v9jgYeAk'

# Setting up Flask JWT
app.config['JWT_SECRET_KEY'] = 'SECRET'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
jwt = JWTManager(app)

# Authenticate with Twitter
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

# Protected route requiring JWT authentication
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Query the database for the user
    user = User.query.filter_by(username=username).first()

    # Check if the user exists and the password matches
    if user:
        if check_password_hash(user.password_hash, password):
        # Create JWT token
         access_token = create_access_token(identity=username)
         return jsonify(access_token=access_token), 200
    else:
        return jsonify(message='Invalid username or password'), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

# Register route
@app.route('/Register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if the user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'User already exists'}), 409

    # Create a new user
    new_user = User(username=username, email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# Route to log in
#Handles user authentication by checkin the email and password against the database
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Find the user by email and username
    user = User.query.filter_by(email=email).first()

    # Check if the user exists and the password is correct
    if user and user.check_password(password):
        # Create an authentication token for the user
        access_token = create_access_token(identity=user.id)
        return jsonify({'auth_token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
   


# Route to add a workout log
#Allows the addition of work out logs for users
@app.route('/workout', methods=['POST'])
def add_workout_log():
    data = request.json
    user_id = data.get('user_id')
    date = data.get('date')
    duration = data.get('duration')
    workout_type = data.get('workout_type')
    calories_burned = data.get('calories_burned')

    # Create a new workout log
    new_workout = WorkoutLog(user_id=user_id, date=date, duration=duration,
                             workout_type=workout_type, calories_burned=calories_burned)

    db.session.add(new_workout)
    db.session.commit()

    return jsonify({'message': 'Workout log added successfully'}), 201


# Route to add a calorie log
@app.route('/calorie', methods=['POST'])
def add_calorie_log():
    data = request.json
    user_id = data.get('user_id')
    date = data.get('date')
    calories = data.get('calories')
    meal_type = data.get('meal_type')

    # Create a new calorie log
    new_calorie_log = CalorieLog(user_id=user_id, date=date, calories=calories, meal_type=meal_type)

    db.session.add(new_calorie_log)
    db.session.commit()

    return jsonify({'message': 'Calorie log added successfully'}), 201



#4.code for the goal setting table
#
# Route to get all a users goals
# GET method to get the goals for a user
@app.route('/goals/<int:user_id>', methods=['GET'])
def get_goals(user_id):
    goals = GoalSetting.query.filter_by(user_id=user_id).all()
    
     # Serialize the SQLAlchemy objects into dictionaries
    serialized_goals = []
    for goal in goals:
        serialized_goal = {}
        for column in class_mapper(GoalSetting).columns:
            serialized_goal[column.key] = getattr(goal, column.key)
        serialized_goals.append(serialized_goal)
    
    return jsonify(serialized_goals), 200

# POST method to add goals for a user
@app.route('/goals', methods=['POST'])
def set_goal():
    data = request.json
    user_id = data.get('user_id')
    goal_type = data.get('goal_type')
    target = data.get('target')
    deadline = data.get('deadline')

    # Create a new goal setting
    new_goal = GoalSetting(user_id=user_id, goal_type=goal_type, target=target, deadline=deadline)

    db.session.add(new_goal)
    db.session.commit()

    return jsonify({'message': 'Goal set successfully'}), 201

# PATCH method to adjust goals
@app.route('/goals/<int:goal_id>', methods=['PATCH'])
def adjust_goal(goal_id):
    goal = GoalSetting.query.get(goal_id)
    if not goal:
        return jsonify({'error': 'Goal not found'}), 404
    data = request.json
    if 'goal_type' in data:
        goal.goal_type = data['goal_type']
    if 'target' in data:
        goal.target = data['target']
    if 'deadline' in data:
        goal.deadline = data['deadline']
    db.session.commit()
    return jsonify({'message': 'Goal adjusted successfully'}), 200


# DELETE method to remove a goal
@app.route('/goals/<int:goal_id>', methods=['DELETE'])
def delete_goal(goal_id):
    goal = GoalSetting.query.get(goal_id)
    if not goal:
        return jsonify({'error': 'Goal not found'}), 404
    db.session.delete(goal)
    db.session.commit()
    return jsonify({'message': 'Goal deleted successfully'}), 200



# Route to track progress
#Enables users to track their progress
@app.route('/progress', methods=['POST'])
def track_progress():
    data = request.json
    user_id = data.get('user_id')
    date = data.get('date')
    weight = data.get('weight')
    body_measurements = data.get('body_measurements')

    # Track progress
    new_progress = ProgressTracking(user_id=user_id, date=date, weight=weight, body_measurements=body_measurements)

    db.session.add(new_progress)
    db.session.commit()

    return jsonify({'message': 'Progress tracked successfully'}), 201

# Retrieve all progress tracking records
@app.route('/progress', methods=['GET'])
def get_all_progress():
    progress = ProgressTracking.query.all()
    result = []
    for p in progress:
        progress_data = {
            'id': p.id,
            'user_id': p.user_id,
            'date': p.date,
            'weight': p.weight,
            'body_measurements': p.body_measurements
        }
        result.append(progress_data)
    return jsonify(result), 200

# Update an existing progress tracking record
@app.route('/progress/<int:id>', methods=['PATCH'])
def update_progress(id):
    progress = ProgressTracking.query.get(id)
    if progress:
        data = request.json
        progress.date = data.get('date', progress.date)
        progress.weight = data.get('weight', progress.weight)
        progress.body_measurements = data.get('body_measurements', progress.body_measurements)
        db.session.commit()
        return jsonify({'message': 'Progress updated successfully'}), 200
    else:
        return jsonify({'error': 'Progress not found'}), 404

# Delete an existing progress tracking record
@app.route('/progress/<int:id>', methods=['DELETE'])
def delete_progress(id):
    progress = ProgressTracking.query.get(id)
    if progress:
        db.session.delete(progress)
        db.session.commit()
        return jsonify({'message': 'Progress deleted successfully'}), 200
    else:
        return jsonify(message='User not found'), 404
    
@app.route('/Workouts', methods=['GET'])
def get_workouts():
    # Query all workout logs from the database
    workouts = WorkoutLog.query.all()
    
    # Convert each workout log to a dictionary
    workout_list = []
    for workout in workouts:
        workout_dict = {
            'id': workout.id,
            'user_id': workout.user_id,
            'date': workout.date.strftime('%Y-%m-%d %H:%M:%S'),
            'duration': workout.duration,
            'workout_type': workout.workout_type,
            'calories_burned': workout.calories_burned,
            'description': workout.description,
            'image': workout.image
        }
        workout_list.append(workout_dict)
    
    # Return the list of workout logs as JSON
    return jsonify(workout_list)

# Get a single workout
@app.route('/Workouts/<int:workout_id>', methods=['GET'])
def get_workout(workout_id):
    workout = WorkoutLog.query.get(workout_id)
    if workout:
        workout_data = {
            'id': workout.id,
            'user_id': workout.user_id,
            'date': workout.date.strftime('%Y-%m-%d %H:%M:%S'),
            'duration': workout.duration,
            'workout_type': workout.workout_type,
            'calories_burned': workout.calories_burned,
            'description': workout.description,
            'image': workout.image
        }
        return jsonify(workout=workout_data), 200
    else:
        return jsonify(message='Workout not found'), 404

# Update a workout
@app.route('/Workouts/<int:workout_id>', methods=['PUT'])
def update_workout(workout_id):
    data = request.get_json()
    workout = WorkoutLog.query.get(workout_id)
    if workout:
        workout.date = data.get('date')
        workout.duration = data.get('duration')
        workout.workout_type = data.get('workout_type')
        workout.calories_burned = data.get('calories_burned')
        workout.description = data.get('description')
        workout.image = data.get('image')
        db.session.commit()
        return jsonify(message='Workout updated successfully'), 200
    else:
        return jsonify(message='Workout not found'), 404
    
#Post a workout
@app.route('/Workouts', methods=['POST'])
def post_workout():
    data = request.get_json()
    workout = WorkoutLog(user_id=data.get('user_id'), date=data.get('date'), duration=data.get('duration'), workout_type=data.get('workout_type'), calories_burned=data.get('calories_burned'), description=data.get('description'), image=data.get('image'))
    db.session.add(workout)
    db.session.commit()
    return jsonify(message='Workout added successfully'), 201

# Delete a workout
@app.route('/Workouts/<int:workout_id>', methods=['DELETE'])
def delete_workout(workout_id):
    workout = WorkoutLog.query.get(workout_id)
    if workout:
        db.session.delete(workout)
        db.session.commit()
        return jsonify(message='Workout deleted successfully'), 200
    else:
        return jsonify(message='Workout not found'), 404

@app.route('/nutrition', methods=['GET'])
def get_nutrition_info():
    food_query = request.args.get('food')
    if not food_query:
        return jsonify(message='Please provide a food item'), 400

    # Replace 'YOUR_API_KEY' with your actual API key
    api_key = 'Db4/NYLkJ3xof9RojTrPPg==qvS0gzCNB7CEamM5'

    url = f'https://api.api-ninjas.com/v1/nutrition?query={food_query}&X-Api-Key={api_key}'

    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        # Format the response data
        formatted_data = [{
            "name": data["query"],
            "calories": data["calories"],
            "serving_size_g": data["serving_weight_grams"],
            "fat_total_g": data["fat_total_g"],
            "fat_saturated_g": data["fat_saturated_g"],
            "protein_g": data["protein_g"],
            "sodium_mg": data["sodium_mg"],
            "potassium_mg": data["potassium_mg"],
            "cholesterol_mg": data["cholesterol_mg"],
            "carbohydrates_total_g": data["carbohydrates_total_g"],
            "fiber_g": data["fiber_g"],
            "sugar_g": data["sugar_g"]
        }]
        
        return jsonify(formatted_data), 200
        return jsonify(data), 200
    except requests.exceptions.RequestException as e:
        return jsonify(message='Error fetching nutrition information'), 500
    

@app.route('/share-workout/<int:workout_id>', methods=['POST'])
def share_workout(workout_id):
    workout = WorkoutLog.query.get(workout_id)
    if workout:
        user = User.query.get(workout.user_id)
        if user:
            # Construct workout message template
            workout_template = f"🏋️‍♂️ {user.username} completed a {workout.workout_type} workout for {workout.duration} minutes and burned {workout.calories_burned} calories! #Fitness"

            try:
                # Post workout on Twitter with template
                api.update_status(workout_template)
                return jsonify(message='Workout shared successfully on Twitter'), 200
            except TweepError as e:
                return jsonify(message='Error sharing workout on Twitter. Please try again later.'), 500
        else:
            return jsonify(message='User not found'), 404
    else:
        return jsonify(message='Workout not found'), 404



if __name__ == '__main__':
    app.run(debug=True, port=5000)
