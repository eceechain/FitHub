from app import app, db, User, WorkoutLog, CalorieLog
from datetime import datetime, timedelta
with app.app_context():
    db.drop_all()
    db.create_all()


with app.app_context():

    # Create sample users
    user1 = User(username='john', email='john@example.com')
    user1.set_password('password123')
    
    user2 = User(username='jane', email='jane@example.com') 
    user2.set_password('password456')

    user3 = User(username='alice', email='alice@example.com')
    user3.set_password('password789')

# Create sample workout logs
    workout1 = WorkoutLog(
        user=user1,
        date=datetime.utcnow(),
        duration=60,
        workout_type='Running',
        calories_burned=300,
        workout_type_image='https://example.com/running_image.jpg',  # URL to the image
        description='A morning run in the park.'
    )

    workout2 = WorkoutLog(
        user=user2,
        date=datetime.utcnow(),
        duration=45,
        workout_type='Cycling',
        calories_burned=250,
        workout_type_image='https://example.com/cycling_image.jpg',  # URL to the image
        description='Riding through the countryside.'
    )

    workout3 = WorkoutLog(
        user=user1,
        date=datetime.utcnow() - timedelta(days=1),
        duration=30,
        workout_type='Swimming',
        calories_burned=200,
        workout_type_image='https://example.com/swimming_image.jpg',  # URL to the image
        description='Swimming laps in the local pool.'
    )

    workout4 = WorkoutLog(
        user=user2,
        date=datetime.utcnow() - timedelta(days=1),
        duration=50,
        workout_type='Walking',
        calories_burned=150,
        workout_type_image='https://example.com/walking_image.jpg',  # URL to the image
        description='An evening walk in the neighborhood.'
    )

    # Create sample calorie logs
    calorie1 = CalorieLog(user=user1, date=datetime.utcnow(), calories=500, meal_type='Breakfast')

    calorie2 = CalorieLog(user=user2, date=datetime.utcnow(), calories=600, meal_type='Lunch')

    calorie3 = CalorieLog(user=user1, date=datetime.utcnow() - timedelta(days=1), calories=400, meal_type='Dinner')

    calorie4 = CalorieLog(user=user2, date=datetime.utcnow() - timedelta(days=1), calories=300, meal_type='Snack')

    # Add data to database
    db.session.add_all([user1, user2, user3, workout1, workout2, workout3, workout4, calorie1, calorie2, calorie3, calorie4])

    # Commit changes
    db.session.commit()

    print("Sample data added to database.")
