
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
# from flask import Flask, request, jsonify
# import jwt
# from functools import wraps

db = SQLAlchemy()

# the tables present in the database
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(180), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.Enum('Male', 'Female', 'Other'))
    profile_picture = db.Column(db.String(255))
    registration_date = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    last_login = db.Column(db.TIMESTAMP)
    account_status = db.Column(db.Enum('Active', 'Suspended', 'Deleted'), default='Active')
    role = db.Column(db.String(50))
    verification_status = db.Column(db.Enum('Pending', 'Verified'), default='Pending')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    workouts = db.relationship('WorkoutLog', back_populates='user')
    calories = db.relationship('CalorieLog', back_populates='user')
    goals = db.relationship('GoalSetting', back_populates='user')
    progress = db.relationship('ProgressTracking', back_populates='user')
    auth_tokens = db.relationship('AuthToken', back_populates='users')


class WorkoutLog(db.Model, SerializerMixin):
    __tablename__ = 'workout_logs'


    id = db.Column(db.Integer, primary_key=True) 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow) 
    duration = db.Column(db.Integer)
    workout_type = db.Column(db.String(120))
    calories_burned = db.Column(db.Integer)
    
    user = db.relationship('User', back_populates='workouts')
    
class CalorieLog(db.Model, SerializerMixin):
    __tablename__ = 'calories_log'


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    calories = db.Column(db.Integer)
    meal_type = db.Column(db.String(120))
    
    user = db.relationship('User', back_populates='calories')

#methods needed for this model
    #GET method to get the goals for a user
    #POST method to add goals for a user
    #PATCH method to adjust goals
    #DELETE method to remove a goal
    #Should be able to track progress towards the goals
class GoalSetting(db.Model):
    __tablename__ = 'goal_setting'


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    #goal type eg weight loss, endurance, 
    goal_type = db.Column(db.String(100))
    target = db.Column(db.Float)
    deadline = db.Column(db.Date)


    #relationship to the User
    user = db.relationship('User', back_populates='goals')

#What should this table be used for
    #1.An API endpoint to calculate and retrieve data for the user over time 
    #Progress can be quantified eg bodyweight change, endurance(number of laps), fitness(lap time), weights lifted(inc or dec) 
class ProgressTracking(db.Model):
    __tablename__ = 'progress_tracking'


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.Date)
    weight = db.Column(db.Float)
    body_measurements = db.Column(db.String(255))
    #Remember to add more columns wrt the exercise eg for running/swimming-lap time   to facilitate the visualization of improvement


    #relationship to User
    user = db.relationship('User', back_populates='progress')

class AuthToken(db.Model):
    __tablename__ = 'auth_token'

    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    token = db.Column(db.String(255), unique=True, nullable=False)
    expiry_date = db.Column(db.DateTime)

    #relationship to user
    user = db.relationship('User', back_populates='auth_tokens')
