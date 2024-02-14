from app import app, db, User

# Create an application context
with app.app_context():
    # Create sample users
    user1 = User(username='john', email='john@example.com') 
    user1.set_password('password123')

    user2 = User(username='jane', email='jane@example.com')
    user2.set_password('password456')

    # Add users to the database
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()

    # Print users 
    print(User.query.all())
