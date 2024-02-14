
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from flask import Flask, request, jsonify
import jwt
from functools import wraps

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
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

class WorkoutLog(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow) 
    duration = db.Column(db.Integer)
    workout_type = db.Column(db.String(120))
    calories_burned = db.Column(db.Integer)
    
    user = db.relationship('User', back_populates='workouts')
    
class CalorieLog(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    calories = db.Column(db.Integer)
    meal_type = db.Column(db.String(120))
    
    user = db.relationship('User', back_populates='calories')


class GoalSetting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    goal_type = db.Column(db.String(100))
    target = db.Column(db.Float)
    deadline = db.Column(db.Date)

class ProgressTracking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date)
    weight = db.Column(db.Float)
    body_measurements = db.Column(db.String(255))

class AuthToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    token = db.Column(db.String(255), unique=True, nullable=False)
    expiry_date = db.Column(db.DateTime)
