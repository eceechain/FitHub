from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from models import CalorieLog, WorkoutLog, User, GoalSetting, ProgressTracking

app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)

app.config['JWT_SECRET_KEY'] = 'SECRET'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class AuthMiddleware:
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        token = request.headers.get('Authorization')
        if not token:
            return self.unauthorized_response()
        try:
            data = jwt.decode(token, app.config['JWT_SECRET_KEY'])
            current_user = User.query.get(data['user_id'])
            environ['current_user'] = current_user
        except Exception as e:
            print(e)
            return self.unauthorized_response()

        return self.app(environ, start_response)

    def unauthorized_response(self):
        response = jsonify({'message': 'Unauthorized'})
        response.status_code = 401
        return response

class UserAPI:
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        if request.path.startswith('/Users'):
            if request.method == 'GET':
                return self.get_users(environ, start_response)
            elif request.method == 'POST':
                return self.create_user(environ, start_response)

        return self.app(environ, start_response)

    def get_users(self, environ, start_response):
        users = User.query.all()
        users_list = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]
        response = jsonify(users=users_list)
        response.status_code = 200
        return response(environ, start_response)

    def create_user(self, environ, start_response):
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()
        if user:
            response = jsonify(message='User already exists')
            response.status_code = 409
            return response(environ, start_response)
        else:
            user = User(username=username, email=email)
            user.set_password(password)
            db.session.add(user)
            db.session.commit()
            response = jsonify(message='User created successfully')
            response.status_code = 201
            return response(environ, start_response)

class WorkoutAPI:
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        if request.path.startswith('/Workouts'):
            if request.method == 'GET':
                return self.get_workouts(environ, start_response)
            elif request.method == 'POST':
                return self.create_workout(environ, start_response)

        return self.app(environ, start_response)

    def get_workouts(self, environ, start_response):
        current_user = environ.get('current_user')
        if not current_user:
            response = jsonify({'message': 'Unauthorized'})
            response.status_code = 401
            return response(environ, start_response)

        workouts = WorkoutLog.query.filter_by(user_id=current_user.id).all()
        workouts_list = [{'id': workout.id, 'user_id': workout.user_id, 'date': workout.date,
                          'duration': workout.duration, 'workout_type': workout.workout_type,
                          'calories_burned': workout.calories_burned} for workout in workouts]

        response = jsonify(workouts=workouts_list)
        response.status_code = 200
        return response(environ, start_response)

    def create_workout(self, environ, start_response):
        current_user = environ.get('current_user')
        if not current_user:
            response = jsonify({'message': 'Unauthorized'})
            response.status_code = 401
            return response(environ, start_response)

        data = request.get_json()
        workout = WorkoutLog(user_id=current_user.id, date=data.get('date'), duration=data.get('duration'),
                             workout_type=data.get('workout_type'), calories_burned=data.get('calories_burned'))
        db.session.add(workout)
        db.session.commit()
        response = jsonify(message='Workout added successfully')
        response.status_code = 201
        return response(environ, start_response)

app.wsgi_app = AuthMiddleware(app.wsgi_app)
app.wsgi_app = UserAPI(app.wsgi_app)
app.wsgi_app = WorkoutAPI(app.wsgi_app)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
