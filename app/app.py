import datetime
from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from models import CalorieLog, WorkoutLog, db, User

app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

# Setting up Flask JWT
app.config['JWT_SECRET_KEY'] = 'SECRET'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

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


if __name__ == '__main__':
    app.run(debug=True, port=5003)
