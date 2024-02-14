from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(180), nullable=False)
    is_active = db.Column(db.Boolean, default=True)

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
