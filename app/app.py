# from flask import Flask, jsonify, request
# from flask_sqlalchemy import SQLAlchemy
# from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_cors import CORS
# from models import CalorieLog, WorkoutLog, User, GoalSetting, ProgressTracking

# app = Flask(__name__)
# CORS(app)
# jwt = JWTManager(app)

# app.config['JWT_SECRET_KEY'] = 'SECRET'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# class AuthMiddleware:
#     def __init__(self, app):
#         self.app = app

#     def __call__(self, environ, start_response):
#         token = request.headers.get('Authorization')
#         if not token:
#             return self.unauthorized_response()
#         try:
#             data = jwt.decode(token, app.config['JWT_SECRET_KEY'])
#             current_user = User.query.get(data['user_id'])
#             environ['current_user'] = current_user
#         except Exception as e:
#             print(e)
#             return self.unauthorized_response()

#         return self.app(environ, start_response)

#     def unauthorized_response(self):
#         response = jsonify({'message': 'Unauthorized'})
#         response.status_code = 401
#         return response

# class UserAPI:
#     def __init__(self, app):
#         self.app = app

#     def __call__(self, environ, start_response):
#         if request.path.startswith('/Users'):
#             if request.method == 'GET':
#                 return self.get_users(environ, start_response)
#             elif request.method == 'POST':
#                 return self.create_user(environ, start_response)

#         return self.app(environ, start_response)

#     def get_users(self, environ, start_response):
#         users = User.query.all()
#         users_list = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]
#         response = jsonify(users=users_list)
#         response.status_code = 200
#         return response(environ, start_response)

#     def create_user(self, environ, start_response):
#         data = request.get_json()
#         username = data.get('username')
#         email = data.get('email')
#         password = data.get('password')

#         user = User.query.filter_by(username=username).first()
#         if user:
#             response = jsonify(message='User already exists')
#             response.status_code = 409
#             return response(environ, start_response)
#         else:
#             user = User(username=username, email=email)
#             user.set_password(password)
#             db.session.add(user)
#             db.session.commit()
#             response = jsonify(message='User created successfully')
#             response.status_code = 201
#             return response(environ, start_response)

# class WorkoutAPI:
#     def __init__(self, app):
#         self.app = app

#     def __call__(self, environ, start_response):
#         if request.path.startswith('/Workouts'):
#             if request.method == 'GET':
#                 return self.get_workouts(environ, start_response)
#             elif request.method == 'POST':
#                 return self.create_workout(environ, start_response)

#         return self.app(environ, start_response)

#     def get_workouts(self, environ, start_response):
#         current_user = environ.get('current_user')
#         if not current_user:
#             response = jsonify({'message': 'Unauthorized'})
#             response.status_code = 401
#             return response(environ, start_response)

#         workouts = WorkoutLog.query.filter_by(user_id=current_user.id).all()
#         workouts_list = [{'id': workout.id, 'user_id': workout.user_id, 'date': workout.date,
#                           'duration': workout.duration, 'workout_type': workout.workout_type,
#                           'calories_burned': workout.calories_burned} for workout in workouts]

#         response = jsonify(workouts=workouts_list)
#         response.status_code = 200
#         return response(environ, start_response)

#     def create_workout(self, environ, start_response):
#         current_user = environ.get('current_user')
#         if not current_user:
#             response = jsonify({'message': 'Unauthorized'})
#             response.status_code = 401
#             return response(environ, start_response)

#         data = request.get_json()
#         workout = WorkoutLog(user_id=current_user.id, date=data.get('date'), duration=data.get('duration'),
#                              workout_type=data.get('workout_type'), calories_burned=data.get('calories_burned'))
#         db.session.add(workout)
#         db.session.commit()
#         response = jsonify(message='Workout added successfully')
#         response.status_code = 201
#         return response(environ, start_response)

# app.wsgi_app = AuthMiddleware(app.wsgi_app)
# app.wsgi_app = UserAPI(app.wsgi_app)
# app.wsgi_app = WorkoutAPI(app.wsgi_app)

# if __name__ == '__main__':
#     app.run(debug=True, port=5001)


import datetime
from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from models import User, WorkoutLog, CalorieLog, GoalSetting, ProgressTracking, AuthToken, db


app = Flask(__name__)
CORS(app)

migrate = Migrate(app, db)


#setting up Flask JWT
app.config['JWT_SECRET_KEY'] = 'SECRET'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
jwt = JWTManager(app)

# Route to register a new user
#Handles user registration, no duplicate email addresses are allowed
@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
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
@app.route('/goals/,int:user_id>', methods=['GET'])
def get_goals(user_id):
    goals = GoalSetting.query.filter_by(user_id=user_id).all()
    return jsonify([goal.__dict__ for goal in goals]), 200



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

if __name__ == '__main__':
    app.run(debug=True, port=5001)