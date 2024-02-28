import datetime
from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import requests
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from models import CalorieLog, WorkoutLog, db, User, GoalSetting, ProgressTracking

app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

# Setting up Flask JWT
app.config['JWT_SECRET_KEY'] = 'SECRET'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

#index route
@app.route('/', methods=['GET'])
def index():
    return jsonify(message=(
        "Welcome to [FitHub]!\n\n"
        "Congratulations on taking the first step towards a healthier and more active lifestyle. Whether you're just starting your fitness journey or looking to take your workouts to the next level, our app is here to support you every step of the way.\n\n"
        "With our comprehensive range of features, including workout tracking, goal setting, nutrition planning, and community support, achieving your fitness goals has never been easier. Whether you're aiming to lose weight, build muscle, improve endurance, or simply feel better overall, we've got you covered.\n\n"
        "Track your progress with ease, set personalized goals, and stay motivated with our diverse library of workouts and exercises. From cardio and strength training to yoga and HIIT, find the perfect workout for your needs and preferences.\n\n"
        "Connect with like-minded individuals in our supportive community, share your achievements, and get inspired by others on similar journeys. Together, we can celebrate victories, overcome challenges, and stay committed to living a healthier, happier life.\n\n"
        "Start your journey to better health and fitness today with [Your Fitness Application]. Let's make every step count towards a stronger, fitter, and more confident you!\n\n"
        "Get started now and unleash your full potential!"
    )), 200



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

#Logout route
@app.route('/logout', methods=['GET'])
@jwt_required()
def logout():
    return jsonify(message='Successfully logged out'), 200


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
#Get all progresstracking for a user
@app.route('/Users/<int:user_id>/ProgressTracking', methods=['GET'])
def get_user_progress_tracking(user_id):
    user = User.query.get(user_id)
    if user:
        progress_tracking = user.progress_tracking
        progress_tracking_list = []
        for progress_tracking in progress_tracking:
            progress_tracking_data = {
                'id': progress_tracking.id,
                'user_id': progress_tracking.user_id,
                'date': progress_tracking.date,
                'weight': progress_tracking.weight,
                'body_fat_percentage': progress_tracking.body_fat_percentage,
            }
            progress_tracking_list.append(progress_tracking_data)

            # Include the user's username in the response
            user_data = {
                'username': user.username,
                'progress_tracking': progress_tracking_list
            }
            return jsonify(user=user_data), 200
        else:
            return jsonify(message='User not found'), 404
        
#Get all Goalsetting for a user
@app.route('/Users/<int:user_id>/GoalSetting', methods=['GET'])
def get_user_goal_setting(user_id):
    user = User.query.get(user_id)
    if user:
        goal_setting = user.goal_setting
        goal_setting_list = []
        for goal_setting in goal_setting:
            goal_setting_data = {
                'id': goal_setting.id,
                'user_id': goal_setting.user_id,
                'goal_type': goal_setting.goal_type,
                'target': goal_setting.target,
                'deadline': goal_setting.deadline,
            }
            goal_setting_list.append(goal_setting_data)

            # Include the user's username in the response
            user_data = {
                'username': user.username,
                'goal_setting': goal_setting_list
            }

            return jsonify(user=user_data), 200
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
                'reps': workout.reps,
                'sets': workout.sets,
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
            'reps': workout.reps,
            'sets': workout.sets,
            'description': workout.description,
            'image': workout.image
        }
        workout_list.append(workout_dict)
    
    # Return the list of workout logs as JSON
    return jsonify(workouts=workout_list)  # Wrap workout_list inside jsonify and specify key name as 'workouts'

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
            'reps': workout.reps,
            'sets': workout.sets,
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
        workout.reps = data.get('reps')
        workout.sets = data.get('sets')
        workout.image = data.get('image')
        db.session.commit()
        return jsonify(message='Workout updated successfully'), 200
    else:
        return jsonify(message='Workout not found'), 404
    
#Post a workout
@app.route('/Workouts', methods=['POST'])
def post_workout():
    data = request.get_json()
    workout = WorkoutLog(user_id=data.get('user_id'), date=data.get('date'), duration=data.get('duration'), workout_type=data.get('workout_type'), calories_burned=data.get('calories_burned'), description=data.get('description'),reps=data.get('reps'),image=data.get('image'))
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
    
# Get Claories
@app.route('/Calories', methods=['GET'])
def get_calories():
    # Query all calorie logs from the database
    calories = CalorieLog.query.all()

    # Convert each calorie log to a dictionary
    calorie_list = []
    for calorie in calories:
        calorie_dict = {
            'id': calorie.id,
            'user_id': calorie.user_id,
            'date': calorie.date.strftime('%Y-%m-%d %H:%M:%S'),
            'calories': calorie.calories,
           'meal_type': calorie.meal_type
        }
        calorie_list.append(calorie_dict)

    # Return the list of calorie logs as JSON
    return jsonify(calorie_list)

# Get a single calorie
@app.route('/Calories/<int:calorie_id>', methods=['GET'])
def get_calorie(calorie_id):
    calorie = CalorieLog.query.get(calorie_id)
    if calorie:
        calorie_data = {
            'id': calorie.id,
            'user_id': calorie.user_id,
            'date': calorie.date.strftime('%Y-%m-%d %H:%M:%S'),
            'calories': calorie.calories,
           'meal_type': calorie.meal_type
        }
        return jsonify(calorie=calorie_data), 200
    else:
        return jsonify(message='Calorie not found'), 404
    
# Update a calorie
@app.route('/Calories/<int:calorie_id>', methods=['PUT'])
def update_calorie(calorie_id):
    data = request.get_json()
    calorie = CalorieLog.query.get(calorie_id)
    if calorie:
        calorie.date = data.get('date')
        calorie.calories = data.get('calories')
        calorie.meal_type = data.get('meal_type')
        db.session.commit()
        return jsonify(message='Calorie updated successfully'), 200
    else:
        return jsonify(message='Calorie not found'), 404
    
#Post a calorie
@app.route('/Calories', methods=['POST'])
def post_calorie():
    data = request.get_json()
    calorie = CalorieLog(user_id=data.get('user_id'), date=data.get('date'), calories=data.get('calories'), meal_type=data.get('meal_type'))
    db.session.add(calorie)
    db.session.commit()
    return jsonify(message='Calorie added successfully'), 201

# Delete a calorie
@app.route('/Calories/<int:calorie_id>', methods=['DELETE'])
def delete_calorie(calorie_id):
    calorie = CalorieLog.query.get(calorie_id)
    if calorie:
        db.session.delete(calorie)
        db.session.commit()
        return jsonify(message='Calorie deleted successfully'), 200
    else:
        return jsonify(message='Calorie not found'), 404
    
#get progresTracking
@app.route('/ProgressTracking', methods=['GET'])
def get_progressTracking():
    # Query all calorie logs from the database
    progressTracking = ProgressTracking.query.all()

    #convert each progressTracking to a dictionary
    progressTracking_list = []
    for progressTracking in progressTracking:
        progressTracking_dict = {
            'id': progressTracking.id,
            'user_id': progressTracking.user_id,
            'date': progressTracking.date.strftime('%Y-%m-%d %H:%M:%S'),
            'weight': progressTracking.weight,
            'body_fat_percentage': progressTracking.body_fat_percentage,
        }

        progressTracking_list.append(progressTracking_dict)

        # Return the list of progressTracking as JSON
    return jsonify(progressTracking_list)

@app.route('/ProgressTracking/<int:progressTracking_id>', methods=['GET'])
def get_single_progressTracking(progressTracking_id):
    progressTracking = ProgressTracking.query.get(progressTracking_id)
    if progressTracking:
        progressTracking_data = {
            'id': progressTracking.id,
            'user_id': progressTracking.user_id,
            'date': progressTracking.date.strftime('%Y-%m-%d %H:%M:%S'),
            'weight': progressTracking.weight,
            'body_fat_percentage': progressTracking.body_fat_percentage,
        }
        return jsonify(progressTracking=progressTracking_data), 200
    else:
        return jsonify(message='ProgressTracking not found'), 404

# Update a progressTracking
@app.route('/ProgressTracking/<int:progressTracking_id>', methods=['PUT'])
def update_progressTracking(progressTracking_id):
    data = request.get_json()
    progressTracking = ProgressTracking.query.get(progressTracking_id)
    if progressTracking:
        progressTracking.date = data.get('date')
        progressTracking.weight = data.get('weight')
        progressTracking.body_fat_percentage = data.get('body_fat_percentage')
        db.session.commit()
        return jsonify(message='ProgressTracking updated successfully'), 200
    else:
        return jsonify(message='ProgressTracking not found'), 404

#Post a progressTracking
@app.route('/ProgressTracking', methods=['POST'])
def post_progressTracking():
    data = request.get_json()
    progressTracking = ProgressTracking(user_id=data.get('user_id'), date=data.get('date'), weight=data.get('weight'), body_fat_percentage=data.get('body_fat_percentage'))
    db.session.add(progressTracking)
    db.session.commit()
    return jsonify(message='ProgressTracking added successfully'), 201

# Delete a progressTracking
@app.route('/ProgressTracking/<int:progressTracking_id>', methods=['DELETE'])
def delete_progressTracking(progressTracking_id):
    progressTracking = ProgressTracking.query.get(progressTracking_id)
    if progressTracking:
        db.session.delete(progressTracking)
        db.session.commit()
        return jsonify(message='ProgressTracking deleted successfully'), 200
    else:
        return jsonify(message='ProgressTracking not found'), 404

#get Goals
@app.route('/GoalSetting', methods=['GET'])
def get_goals():
    # Query all calorie logs from the database
    goals = GoalSetting.query.all()
     
    #convert each goal to a dictionary
    goals_list = []
    for goal in goals:
        goal_dict ={
            'id': goal.id,
            'user_id': goal.user_id,
            'goal_type': goal.goal_type,
            'target': goal.target,
            'deadline': goal.deadline.strftime('%Y-%m-%d %H:%M:%S'),
        }
        goals_list.append(goal_dict)

        # Return the list of goals as JSON
    return jsonify(goals_list)

@app.route('/GoalSetting/<int:goal_id>', methods=['GET'])
def get_single_goal(goal_id):
    goal = GoalSetting.query.get(goal_id)
    if goal:
        goal_data = {
            'id': goal.id,
            'user_id': goal.user_id,
            'goal_type': goal.goal_type,
            'target': goal.target,
            'deadline': goal.deadline.strftime('%Y-%m-%d %H:%M:%S'),
        }
        return jsonify(goal=goal_data), 200
    else:
        return jsonify(message='Goal not found'), 404
    
# Update a goal
@app.route('/GoalSetting/<int:goal_id>', methods=['PUT'])
def update_goal(goal_id):
    data = request.get_json()
    goal = GoalSetting.query.get(goal_id)
    if goal:
        goal.goal_type = data.get('goal_type')
        goal.target = data.get('target')
        goal.deadline = data.get('deadline')
        db.session.commit()
        return jsonify(message='Goal updated successfully'), 200
    else:
        return jsonify(message='Goal not found'), 404
    
#Post a goal
@app.route('/GoalSetting', methods=['POST'])
def post_goal():
    data = request.get_json()
    goal = GoalSetting(user_id=data.get('user_id'), goal_type=data.get('goal_type'), target=data.get('target'), deadline=data.get('deadline'))
    db.session.add(goal)
    db.session.commit()
    return jsonify(message='Goal added successfully'), 201

# Delete a goal
@app.route('/GoalSetting/<int:goal_id>', methods=['DELETE'])
def delete_goal(goal_id):
    goal = GoalSetting.query.get(goal_id)
    if goal:
        db.session.delete(goal)
        db.session.commit()
        return jsonify(message='Goal deleted successfully'), 200
    else:
        return jsonify(message='Goal not found'), 404
    
@app.route('/nutrition', methods=['POST'])
def get_nutrition_info():
    meal_type = request.json.get('meal_type')
    foods = request.json.get('foods')

    if not meal_type:
        return jsonify(message='Please provide a meal type (breakfast, lunch, supper)'), 400

    if not foods:
        return jsonify(message='Please provide a list of foods'), 400

    # Replace 'YOUR_API_KEY' with your actual API key
    api_key = 'Db4/NYLkJ3xof9RojTrPPg==qvS0gzCNB7CEamM5'
    total_nutrition = {
        "calories": 0,
        "serving_size_g": 0,
        "fat_total_g": 0,
        "fat_saturated_g": 0,
        "protein_g": 0,
        "sodium_mg": 0,
        "potassium_mg": 0,
        "cholesterol_mg": 0,
        "carbohydrates_total_g": 0,
        "fiber_g": 0,
        "sugar_g": 0
    }

    for food_query in foods:
        url = f'https://api.api-ninjas.com/v1/nutrition?query={food_query}&X-Api-Key={api_key}'
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()

            # Update total nutrition
            total_nutrition["calories"] += data["calories"]
            total_nutrition["serving_size_g"] += data["serving_weight_grams"]
            total_nutrition["fat_total_g"] += data["fat_total_g"]
            total_nutrition["fat_saturated_g"] += data["fat_saturated_g"]
            total_nutrition["protein_g"] += data["protein_g"]
            total_nutrition["sodium_mg"] += data["sodium_mg"]
            total_nutrition["potassium_mg"] += data["potassium_mg"]
            total_nutrition["cholesterol_mg"] += data["cholesterol_mg"]
            total_nutrition["carbohydrates_total_g"] += data["carbohydrates_total_g"]
            total_nutrition["fiber_g"] += data["fiber_g"]
            total_nutrition["sugar_g"] += data["sugar_g"]
            
        except requests.exceptions.RequestException as e:
            return jsonify(message='Error fetching nutrition information'), 500

    return jsonify(total_nutrition), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)
