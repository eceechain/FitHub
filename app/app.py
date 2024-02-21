import datetime
import requests
import tweepy
from tweepy import TweepError
from flask import Flask, jsonify, redirect,  url_for, request
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from models import CalorieLog, WorkoutLog, db, User, GoalSetting, ProgressTracking

app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)
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
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify(message='User already exists'), 409
    else:
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return jsonify(message='User created successfully'), 201

# Get all users
@app.route('/Users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_list = []
    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['username'] = user.username
        user_data['email'] = user.email
        user_data['password_hash'] = user.password_hash
        user_data['is_active'] = user.is_active
        users_list.append(user_data)
    return jsonify(users=users_list), 200


# Get a single user
@app.route('/Users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        user_data = {}
        user_data['id'] = user.id
        user_data['username'] = user.username
        user_data['email'] = user.email
        user_data['password_hash'] = user.password_hash
        user_data['is_active'] = user.is_active
        return jsonify(user=user_data), 200
    else:
        return jsonify(message='User not found'), 404
    
# Update a user
@app.route('/Users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
        data = request.get_json()
        user = User.query.get(user_id)
        if user:
            user.username = data.get('username')
            user.email = data.get('email')
            user.password_hash = data.get('password_hash')
            user.is_active = data.get('is_active')
            db.session.commit()
            return jsonify(message='User updated successfully'), 200
        else:
            return jsonify(message='User not found'), 404
        
# Delete a user
@app.route('/Users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify(message='User deleted successfully'), 200
    else:
        return jsonify(message='User not found'), 404

# Get all workouts for a user
@app.route('/Users/<int:user_id>/Workouts', methods=['GET'])
def get_user_workouts(user_id):
    user = User.query.get(user_id)
    if user:
        workouts = user.workouts
        workouts_list = []
        for workout in workouts:
            workout_data = { 
                'id': workout.id,
                'user_id': workout.user_id,
                'date': workout.date,
                'duration': workout.duration,
                'workout_type': workout.workout_type,
                'calories_burned': workout.calories_burned
            }
            workouts_list.append(workout_data)
        
        # Include the user's username in the response
        user_data = {
            'username': user.username,
            'workouts': workouts_list
        }
        
        return jsonify(user=user_data), 200
    else:
        return jsonify(message='User not found'), 404

# Get all calories for a user
@app.route('/Users/<int:user_id>/Calories', methods=['GET'])
def get_user_calories(user_id):
    user = User.query.get(user_id)
    if user:
        calories = user.calories
        calories_list = []
        for calorie in calories:
            calorie_data = {
                'id': calorie.id,
                'user_id': calorie.user_id,
                'date': calorie.date,
                'calories': calorie.calories,
               'meal_type': calorie.meal_type
            }
            calories_list.append(calorie_data)

        # Include the user's username in the response
        user_data = {
            'username': user.username,
            'calories': calories_list
        }

        return jsonify(user=user_data), 200
    else:
        return jsonify(message='User not found'), 404
    
# Add a workout for a user
@app.route('/Users/<int:user_id>/Workouts', methods=['POST'])
def add_user_workout(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if user:
        workout = WorkoutLog(user_id=user_id, date=data.get('date'), duration=data.get('duration'), workout_type=data.get('workout_type'), calories_burned=data.get('calories_burned'))
        db.session.add(workout)
        db.session.commit()
        return jsonify(message='Workout added successfully'), 201
    else:
        return jsonify(message='User not found'), 404
    
# Add a calorie for a user
@app.route('/Users/<int:user_id>/Calories', methods=['POST'])
def add_user_calorie(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if user:
        calorie = CalorieLog(user_id=user_id, date=data.get('date'), calories=data.get('calories'), meal_type=data.get('meal_type'))
        db.session.add(calorie)
        db.session.commit()
        return jsonify(message='Calorie added successfully'), 201
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
