from app import app, db, User, WorkoutLog, CalorieLog
from datetime import datetime, timedelta

with app.app_context():
    db.drop_all()
    db.create_all()

    # Create sample users
    users = [
        {'username': 'john', 'email': 'john@example.com', 'password': 'password123'},
        {'username': 'jane', 'email': 'jane@example.com', 'password': 'password456'},
        {'username': 'alice', 'email': 'alice@example.com', 'password': 'password789'},
        {'username': 'bob', 'email': 'bob@example.com', 'password': 'passwordabc'},
        {'username': 'emma', 'email': 'emma@example.com', 'password': 'passworddef'},
        {'username': 'michael', 'email': 'michael@example.com', 'password': 'passwordghi'},
        {'username': 'sophia', 'email': 'sophia@example.com', 'password': 'passwordjkl'},
        {'username': 'william', 'email': 'william@example.com', 'password': 'passwordmno'},
        {'username': 'olivia', 'email': 'olivia@example.com', 'password': 'passwordpqr'},
        {'username': 'james', 'email': 'james@example.com', 'password': 'passwordstu'},
        {'username': 'charlotte', 'email': 'charlotte@example.com', 'password': 'passwordvwx'},
        {'username': 'david', 'email': 'david@example.com', 'password': 'passwordyz1'},
        {'username': 'ava', 'email': 'ava@example.com', 'password': 'password234'},
        {'username': 'alexander', 'email': 'alexander@example.com', 'password': 'password567'},
        {'username': 'emily', 'email': 'emily@example.com', 'password': 'password890'},
        {'username': 'matthew', 'email': 'matthew@example.com', 'password': 'passwordabc1'},
        {'username': 'abigail', 'email': 'abigail@example.com', 'password': 'passworddef2'},
        {'username': 'lucas', 'email': 'lucas@example.com', 'password': 'passwordghi3'},
        {'username': 'amelia', 'email': 'amelia@example.com', 'password': 'passwordjkl4'},
        {'username': 'ethan', 'email': 'ethan@example.com', 'password': 'passwordmno5'},
    ]

    for user_data in users:
        user = User(username=user_data['username'], email=user_data['email'])
        user.set_password(user_data['password'])
        db.session.add(user)

    # Create sample workout logs
    workouts = [
        {'type': 'Treadmill', 'duration': 30, 'calories_burned': 250, 'description': 'Running on the treadmill for cardio.', 'image': 'treadmill_image.jpg'},
        {'type': 'Yoga', 'duration': 60, 'calories_burned': 250, 'description': 'Yoga session for flexibility and relaxation.', 'image': 'yoga_image.jpg'},
        {'type': 'HIIT', 'duration': 40, 'calories_burned': 350, 'description': 'High-Intensity Interval Training for cardio and strength.', 'image': 'hiit_image.jpg'},
        {'type': 'Weightlifting', 'duration': 50, 'calories_burned': 200, 'description': 'Strength training focusing on major muscle groups.', 'image': 'weightlifting_image.jpg'},
        {'type': 'Pilates', 'duration': 55, 'calories_burned': 180, 'description': 'Pilates session focusing on core strength and flexibility.', 'image': 'pilates_image.jpg'},
        {'type': 'Jump Rope', 'duration': 20, 'calories_burned': 150, 'description': 'Jumping rope for cardio and coordination.', 'image': 'jumprope_image.jpg'},
        {'type': 'Squats', 'duration': 25, 'calories_burned': 180, 'description': 'Squatting exercise for lower body strength.', 'image': 'squats_image.jpg'},
        {'type': 'Push-ups', 'duration': 15, 'calories_burned': 100, 'description': 'Push-ups for upper body strength.', 'image': 'pushups_image.jpg'},
        {'type': 'Sit-ups', 'duration': 20, 'calories_burned': 120, 'description': 'Sit-ups for core strength.', 'image': 'situps_image.jpg'},
        {'type': 'Burpees', 'duration': 30, 'calories_burned': 250, 'description': 'Full-body exercise combining squats, push-ups, and jumps.', 'image': 'burpees_image.jpg'},
        {'type': 'Plank', 'duration': 60, 'calories_burned': 150, 'description': 'Plank exercise for core stability.', 'image': 'plank_image.jpg'},
        {'type': 'Lunges', 'duration': 30, 'calories_burned': 180, 'description': 'Lunges for lower body strength and balance.', 'image': 'lunges_image.jpg'},
        {'type': 'Bicycles', 'duration': 25, 'calories_burned': 150, 'description': 'Bicycle crunches for core strength and obliques.', 'image': 'bicycles_image.jpg'},
        {'type': 'Dumbbell Rows', 'duration': 35, 'calories_burned': 200, 'description': 'Dumbbell rows for back and arm strength.', 'image': 'dumbbellrows_image.jpg'},
        {'type': 'Deadlifts', 'duration': 40, 'calories_burned': 250, 'description': 'Deadlifts for full-body strength.', 'image': 'deadlifts_image.jpg'},
        {'type': 'Tricep Dips', 'duration': 20, 'calories_burned': 120, 'description': 'Tricep dips for arm strength.', 'image': 'tricepdips_image.jpg'},
        {'type': 'Leg Press', 'duration': 30, 'calories_burned': 180, 'description': 'Leg press for leg strength and toning.', 'image': 'legpress_image.jpg'},
        {'type': 'Chest Press', 'duration': 35, 'calories_burned': 200, 'description': 'Chest press for chest and arm strength.', 'image': 'chestpress_image.jpg'}
    ]

    workout_logs = []

    for user_data in users:
     user = User.query.filter_by(email=user_data['email']).first()
     for workout in workouts:
        workout_log = WorkoutLog(
            user=user,
            date=datetime.utcnow(),
            duration=workout['duration'],
            workout_type=workout['type'],
            calories_burned=workout['calories_burned'],
            description=workout['description'],
            image=workout['image']
        )
        db.session.add(workout_log)  # Add the workout log to the session
        user.workouts.append(workout_log)  # Link the workout log to the user's workouts

# Commit changes
    db.session.commit()


    # Create sample calorie logs
    calorie_logs = [
        {'user': 'john', 'date': datetime.utcnow(), 'calories': 500, 'meal_type': 'Breakfast'},
        {'user': 'jane', 'date': datetime.utcnow(), 'calories': 600, 'meal_type': 'Lunch'},
        {'user': 'alice', 'date': datetime.utcnow(), 'calories': 400, 'meal_type': 'Dinner'},
        {'user': 'bob', 'date': datetime.utcnow(), 'calories': 300, 'meal_type': 'Snack'},
        {'user': 'emma', 'date': datetime.utcnow() - timedelta(days=1), 'calories': 550, 'meal_type': 'Breakfast'},
        {'user': 'michael', 'date': datetime.utcnow() - timedelta(days=1), 'calories': 700, 'meal_type': 'Lunch'},
        {'user': 'sophia', 'date': datetime.utcnow() - timedelta(days=1), 'calories': 450, 'meal_type': 'Dinner'},
        {'user': 'william', 'date': datetime.utcnow() - timedelta(days=1), 'calories': 350, 'meal_type': 'Snack'},
        {'user': 'olivia', 'date': datetime.utcnow() - timedelta(days=2), 'calories': 480, 'meal_type': 'Breakfast'},
        {'user': 'james', 'date': datetime.utcnow() - timedelta(days=2), 'calories': 620, 'meal_type': 'Lunch'},
        {'user': 'charlotte', 'date': datetime.utcnow() - timedelta(days=2), 'calories': 390, 'meal_type': 'Dinner'},
        {'user': 'david', 'date': datetime.utcnow() - timedelta(days=2), 'calories': 280, 'meal_type': 'Snack'},
        {'user': 'ava', 'date': datetime.utcnow() - timedelta(days=3), 'calories': 510, 'meal_type': 'Breakfast'},
        {'user': 'alexander', 'date': datetime.utcnow() - timedelta(days=3), 'calories': 650, 'meal_type':'Lunch'},
        {'user': 'emily', 'date': datetime.utcnow() - timedelta(days=3), 'calories': 420, 'meal_type': 'Dinner'},
        {'user': 'matthew', 'date': datetime.utcnow() - timedelta(days=3), 'calories': 320, 'meal_type': 'Snack'},
        {'user': 'abigail', 'date': datetime.utcnow() - timedelta(days=4), 'calories': 490, 'meal_type': 'Breakfast'},
        {'user': 'lucas', 'date': datetime.utcnow() - timedelta(days=4), 'calories': 630, 'meal_type': 'Lunch'},
        {'user': 'amelia', 'date': datetime.utcnow() - timedelta(days=4), 'calories': 400, 'meal_type': 'Dinner'},
        {'user': 'ethan', 'date': datetime.utcnow() - timedelta(days=4), 'calories': 300, 'meal_type': 'Snack'},
    ]

    for log_data in calorie_logs:
        user = User.query.filter_by(username=log_data['user']).first()
        calorie_log = CalorieLog(
            user=user,
            date=log_data['date'],
            calories=log_data['calories'],
            meal_type=log_data['meal_type']
        )
        db.session.add(calorie_log)

    # Commit changes
    db.session.commit()

    print("data added to database.")
