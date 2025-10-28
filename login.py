from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'f05f31fd-b1e3-43d3-a594-0fbc3862ef1d'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)

with app.app_context():
    db.create_all()

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250),nullable=False)
    date_created = db.Column(db.DateTime, default = datetime.utcnow)
    is_active = db.Column(db.Boolean , default = True)
    is_authenticated = db.Column(db.Boolean , default = True)

    def __repr__(self):
        return '<User %r>' % self.user_id
    
    def get_id(self):
        return self.user_id