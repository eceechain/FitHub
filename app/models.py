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
    goal_setting = db.relationship('GoalSetting', back_populates='user')
    progress_tracking = db.relationship('ProgressTracking', back_populates='user')

class WorkoutLog(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow) 
    duration = db.Column(db.Integer)
    workout_type = db.Column(db.String(120))
    image = db.Column(db.String(255))  # Adding an image column for the workout type
    calories_burned = db.Column(db.Integer)
    reps = db.Column(db.Integer)
    description = db.Column(db.Text)
    
    user = db.relationship('User', back_populates='workouts')
    
class CalorieLog(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    calories = db.Column(db.Integer)
    meal_type = db.Column(db.String(120))
    
    user = db.relationship('User', back_populates='calories')

class GoalSetting(db.Model, SerializerMixin):
    __tablename__ = 'goal_setting'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    goal_type = db.Column(db.String(100))
    target = db.Column(db.Float)
    deadline = db.Column(db.Date)

    user = db.relationship('User', back_populates='goal_setting')

class ProgressTracking(db.Model, SerializerMixin):
    __tablename__ = 'progress_tracking'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date)
    weight = db.Column(db.Float)
    body_fat_percentage = db.Column(db.Float)  # Add this line

    user = db.relationship('User', back_populates='progress_tracking')