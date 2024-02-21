from app import app, db, User, WorkoutLog, CalorieLog, GoalSetting, ProgressTracking
from datetime import datetime, timedelta
import random

with app.app_context():
    db.drop_all()
    db.create_all()

# from models import User, WorkoutLog, CalorieLog, GoalSetting, ProgressTracking, db

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
        {'type': 'Treadmill', 'duration': 30, 'calories_burned': 250, 'description': 'Running on the treadmill for cardio.', 'image': 'https://i.vimeocdn.com/video/1165892863-3914c1bea88cc80e5218d0dadddbf1065c20d144e20caceaf2370fd742e03370-d_640x360.jpg'},
        {'type': 'Yoga', 'duration': 60, 'calories_burned': 250, 'description': 'Yoga session for flexibility and relaxation.', 'image': 'https://cdn.pixabay.com/photo/2020/11/03/13/04/yoga-5709767_1280.png'},
        {'type': 'HIIT', 'duration': 40, 'calories_burned': 350, 'description': 'High-Intensity Interval Training for cardio and strength.', 'image': 'https://thumbs.dreamstime.com/b/woman-burpee-exercise-doing-circuit-cardio-workout-instruction-cartoon-vector-illustration-198652151.jpg'},
        {'type': 'Weightlifting', 'duration': 50, 'calories_burned': 200, 'description': 'Strength training focusing on major muscle groups.', 'image': 'https://cdn.pixabay.com/photo/2020/06/01/14/52/weightlifter-5246940_640.jpg'},
        {'type': 'Pilates', 'duration': 55, 'calories_burned': 180, 'description': 'Pilates session focusing on core strength and flexibility.', 'image': 'https://cdn.pixabay.com/photo/2020/03/12/13/33/press-up-4925111_640.jpg'},
        {'type': 'Jump Rope', 'duration': 20, 'calories_burned': 150, 'description': 'Jumping rope for cardio and coordination.', 'image': 'https://i.pinimg.com/736x/4b/2e/13/4b2e130e63264e93931565ea19063312.jpg'},
        {'type': 'Squats', 'duration': 25, 'calories_burned': 180, 'description': 'Squatting exercise for lower body strength.', 'image': 'https://cdn.pixabay.com/photo/2022/06/02/02/59/squats-7236948_960_720.png'},
        {'type': 'Push-ups', 'duration': 15, 'calories_burned': 100, 'description': 'Push-ups for upper body strength.', 'image': 'https://cdn.pixabay.com/photo/2020/03/12/13/33/press-up-4925111_1280.jpg'},
        {'type': 'Sit-ups', 'duration': 20, 'calories_burned': 120, 'description': 'Sit-ups for core strength.', 'image': 'https://thumbs.dreamstime.com/b/man-doing-sit-ups-exercise-abdominals-exercise-flat-vector-illustration-man-doing-sit-ups-exercise-abdominals-exercise-flat-vector-201076158.jpg'},
        {'type': 'Burpees', 'duration': 30, 'calories_burned': 250, 'description': 'Full-body exercise combining squats, push-ups, and jumps.', 'image': 'https://t4.ftcdn.net/jpg/04/29/02/59/360_F_429025937_nNFfycLc9tY4SBYj5dyxhPVk7QxNwpra.jpg'},
        {'type': 'Plank', 'duration': 60, 'calories_burned': 150, 'description': 'Plank exercise for core stability.', 'image': 'https://i.pinimg.com/originals/bb/93/89/bb9389b7be696161406c9ffe36ca2762.jpg'},
        {'type': 'Lunges', 'duration': 30, 'calories_burned': 180, 'description': 'Lunges for lower body strength and balance.', 'image': 'https://thumbs.dreamstime.com/b/man-doing-dumbbell-walking-lunges-exercise-man-doing-dumbbell-walking-lunges-exercise-flat-vector-illustration-isolated-white-230812187.jpg'},
        {'type': 'Bicycles', 'duration': 25, 'calories_burned': 150, 'description': 'Bicycle crunches for core strength and obliques.', 'image': 'https://cdn.pixabay.com/photo/2020/10/24/19/15/man-5682389_1280.png'},
        {'type': 'Dumbbell Rows', 'duration': 35, 'calories_burned': 200, 'description': 'Dumbbell rows for back and arm strength.', 'image': 'https://cdn.pixabay.com/photo/2012/04/13/15/02/gym-32740_640.png'},
        {'type': 'Deadlifts', 'duration': 40, 'calories_burned': 250, 'description': 'Deadlifts for full-body strength.', 'image': 'https://www.shutterstock.com/image-vector/man-doing-sumo-barbell-deadlifts-600nw-2034318965.jpg'},
        {'type': 'Tricep Dips', 'duration': 20, 'calories_burned': 120, 'description': 'Tricep dips for arm strength.', 'image': 'https://www.shutterstock.com/image-vector/man-doing-bench-tricep-dips-600nw-1951111822.jpg'},
        {'type': 'Leg Press', 'duration': 30, 'calories_burned': 180, 'description': 'Leg press for leg strength and toning.', 'image': 'https://thumbs.dreamstime.com/b/man-doing-leg-press-exercise-machine-flat-vector-illustration-isolated-man-doing-leg-press-exercise-machine-flat-vector-253463013.jpg'},
        {'type': 'Chest Press', 'duration': 35, 'calories_burned': 200, 'description': 'Chest press for chest and arm strength.', 'image': 'https://cdni.iconscout.com/illustration/premium/thumb/incline-chest-press-5422312-4552283.png?f=webp'}
    ]

    for user_data in users:
        user = User.query.filter_by(email=user_data['email']).first()
        num_workouts = random.randint(4, 5)  # Randomly select between 4 and 5 workouts for each user
        user_workouts = random.sample(workouts, num_workouts)  # Select random workouts for the user
        for workout in user_workouts:
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

    # Commit workout log changes
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
        {'user': 'abigail', 'date': datetime.utcnow() - timedelta(days=4), 'calories': 540, 'meal_type': 'Breakfast'},
        {'user': 'lucas', 'date': datetime.utcnow() - timedelta(days=4), 'calories': 680, 'meal_type': 'Lunch'},
        {'user': 'amelia', 'date': datetime.utcnow() - timedelta(days=4), 'calories': 430, 'meal_type': 'Dinner'},
        {'user': 'ethan', 'date': datetime.utcnow() - timedelta(days=4), 'calories': 350, 'meal_type': 'Snack'},
    ]

    for log in calorie_logs:
        user = User.query.filter_by(username=log['user']).first()
        calorie_log = CalorieLog(
            user=user,
            date=log['date'],
            calories=log['calories'],
            meal_type=log['meal_type']
        )
        db.session.add(calorie_log)

    # Commit calorie log changes
    db.session.commit()

    # Create sample goal settings
    goals = [
        {'user': 'john', 'goal_type': 'Weight Loss', 'target': 10, 'deadline': datetime.utcnow() + timedelta(days=30)},
        {'user': 'jane', 'goal_type': 'Muscle Gain', 'target': 5, 'deadline': datetime.utcnow() + timedelta(days=45)},
        {'user': 'alice', 'goal_type': 'Maintenance', 'target': 0, 'deadline': datetime.utcnow() + timedelta(days=60)},
        {'user': 'bob', 'goal_type': 'Weight Loss', 'target': 8, 'deadline': datetime.utcnow() + timedelta(days=60)},
        {'user': 'emma', 'goal_type': 'Muscle Gain', 'target': 4, 'deadline': datetime.utcnow() + timedelta(days=75)},
        {'user': 'michael', 'goal_type': 'Maintenance', 'target': 0, 'deadline': datetime.utcnow() + timedelta(days=90)},
        {'user': 'sophia', 'goal_type': 'Weight Loss', 'target': 6, 'deadline': datetime.utcnow() + timedelta(days=45)},
        {'user': 'william', 'goal_type': 'Muscle Gain', 'target': 3, 'deadline': datetime.utcnow() + timedelta(days=60)},
        {'user': 'olivia', 'goal_type': 'Maintenance', 'target': 0, 'deadline': datetime.utcnow() + timedelta(days=30)},
        {'user': 'james', 'goal_type': 'Weight Loss', 'target': 9, 'deadline': datetime.utcnow() + timedelta(days=75)},
        {'user': 'charlotte', 'goal_type': 'Muscle Gain', 'target': 5, 'deadline': datetime.utcnow() + timedelta(days=90)},
        {'user': 'david', 'goal_type': 'Maintenance', 'target': 0, 'deadline': datetime.utcnow() + timedelta(days=45)},
        {'user': 'ava', 'goal_type': 'Weight Loss', 'target': 7, 'deadline': datetime.utcnow() + timedelta(days=60)},
        {'user': 'alexander', 'goal_type': 'Muscle Gain', 'target': 4, 'deadline': datetime.utcnow() + timedelta(days=75)},
        {'user': 'emily', 'goal_type': 'Maintenance', 'target': 0, 'deadline': datetime.utcnow() + timedelta(days=90)},
        {'user': 'matthew', 'goal_type': 'Weight Loss', 'target': 10, 'deadline': datetime.utcnow() + timedelta(days=45)},
        {'user': 'abigail', 'goal_type': 'Muscle Gain', 'target': 6, 'deadline': datetime.utcnow() + timedelta(days=60)},
        {'user': 'lucas', 'goal_type': 'Maintenance', 'target': 0, 'deadline': datetime.utcnow() + timedelta(days=75)},
        {'user': 'amelia', 'goal_type': 'Weight Loss', 'target': 8, 'deadline': datetime.utcnow() + timedelta(days=90)},
        {'user': 'ethan', 'goal_type': 'Muscle Gain', 'target': 4, 'deadline': datetime.utcnow() + timedelta(days=45)},
    ]

    for goal_data in goals:
        user = User.query.filter_by(username=goal_data['user']).first()
        if user:
            goal_setting = GoalSetting(
                user=user,
                goal_type=goal_data['goal_type'],
                target=goal_data['target'],
                deadline=goal_data['deadline']
            )
            db.session.add(goal_setting)

    # Commit goal setting changes
    db.session.commit()

    # Create sample progress tracking data
    progress_data = [
        {'user': 'john', 'weight': 80, 'body_fat_percentage': 20},
        {'user': 'jane', 'weight': 65, 'body_fat_percentage': 25},
        {'user': 'alice', 'weight': 70, 'body_fat_percentage': 22},
        {'user': 'bob', 'weight': 90, 'body_fat_percentage': 18},
        {'user': 'emma', 'weight': 60, 'body_fat_percentage': 27},
        {'user': 'michael', 'weight': 75, 'body_fat_percentage': 21},
        {'user': 'sophia', 'weight': 85, 'body_fat_percentage': 19},
        {'user': 'william', 'weight': 72, 'body_fat_percentage': 23},
        {'user': 'olivia', 'weight': 68, 'body_fat_percentage': 24},
        {'user': 'james', 'weight': 88, 'body_fat_percentage': 17},
        {'user': 'charlotte', 'weight': 62, 'body_fat_percentage': 26},
        {'user': 'david', 'weight': 78, 'body_fat_percentage': 20},
        {'user': 'ava', 'weight': 84, 'body_fat_percentage': 18},
        {'user': 'alexander', 'weight': 67, 'body_fat_percentage': 25},
        {'user': 'emily', 'weight': 73, 'body_fat_percentage': 22},
        {'user': 'matthew', 'weight': 82, 'body_fat_percentage': 19},
        {'user': 'abigail', 'weight': 63, 'body_fat_percentage': 24},
        {'user': 'lucas', 'weight': 79, 'body_fat_percentage': 21},
        {'user': 'amelia', 'weight': 71, 'body_fat_percentage': 23},
        {'user': 'ethan', 'weight': 86, 'body_fat_percentage': 16},
    ]

    for data in progress_data:
        user = User.query.filter_by(username=data['user']).first()
        progress = ProgressTracking(
            user=user,
            date=datetime.utcnow() - timedelta(days=30),  # Progress data from 30 days ago
            weight=data['weight'],
            body_fat_percentage=data['body_fat_percentage']
        )
        db.session.add(progress)

    # Commit progress tracking changes
    db.session.commit()

    print("Database seeded successfully.")
