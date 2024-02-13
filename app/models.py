from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
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

# Create the database tables
with app.app_context():
    db.create_all()
