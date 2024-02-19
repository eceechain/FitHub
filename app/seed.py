from app import app, db, User, WorkoutLog, CalorieLog, GoalSetting, ProgressTracking
from datetime import datetime, timedelta

with app.app_context():

# from models import User, WorkoutLog, CalorieLog, GoalSetting, ProgressTracking, db

    # Create sample users
    user1 = User(username='john', email='john@example.com')
    user1.set_password('password123')
    
    user2 = User(username='jane', email='jane@example.com') 
    user2.set_password('password456')

    user3 = User(username='alice', email='alice@example.com')
    user3.set_password('password789')

    # Create sample workout logs
    workout1 = WorkoutLog(user=user1, date=datetime.utcnow(), duration=60, workout_type='Running', calories_burned=300)

    workout2 = WorkoutLog(user=user2, date=datetime.utcnow(), duration=45, workout_type='Cycling', calories_burned=250)

    workout3 = WorkoutLog(user=user1, date=datetime.utcnow() - timedelta(days=1), duration=30, workout_type='Swimming', calories_burned=200)

    workout4 = WorkoutLog(user=user2, date=datetime.utcnow() - timedelta(days=1), duration=50, workout_type='Walking', calories_burned=150)

    # Create sample calorie logs
    calorie1 = CalorieLog(user=user1, date=datetime.utcnow(), calories=500, meal_type='Breakfast')

    calorie2 = CalorieLog(user=user2, date=datetime.utcnow(), calories=600, meal_type='Lunch')

    calorie3 = CalorieLog(user=user1, date=datetime.utcnow() - timedelta(days=1), calories=400, meal_type='Dinner')

    calorie4 = CalorieLog(user=user2, date=datetime.utcnow() - timedelta(days=1), calories=300, meal_type='Snack')

    # Create sample goal settings
    goal1 = GoalSetting(user=user1, goal_type='Weight Loss', target=10, deadline=datetime.now())
    goal2 = GoalSetting(user=user2, goal_type='Muscle Gain', target=5, deadline=datetime.now())

    # Create sample progress tracking
    progress1 = ProgressTracking(user=user1, date=datetime.now(), weight=70, body_measurements='Fit')
    progress2 = ProgressTracking(user=user2, date=datetime.now(), weight=80, body_measurements='Healthy')


    # Add data to database
    db.session.add_all([user1, user2, user3, workout1, workout2, workout3, workout4, calorie1, calorie2, calorie3, calorie4, goal1, goal2, progress1, progress2])

    # Commit changes
    db.session.commit()

    print("Sample data added to database.")
