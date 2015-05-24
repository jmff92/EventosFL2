from flask import Flask, request, session, redirect, url_for
from flask.ext.script import Manager, Server
from random import SystemRandom
from datetime import timedelta
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.migrate import Migrate, MigrateCommand
from werkzeug import secure_filename
import os

app = Flask(__name__, static_url_path='')
manager = Manager(app)
manager.add_command("runserver", Server(
    use_debugger = True,
    use_reloader = True,
    host = '0.0.0.0')
)

@app.before_request
def make_session_permanent():
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=45)
    session.modified = True

@app.route('/')
def root():
    return app.send_static_file('index.html')

from app.LinkEvents.Nodos import Nodos
app.register_blueprint(Nodos)

#Application code starts here

UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = set(['pdf'])

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'apl.db')
db = SQLAlchemy(app)
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)

eventos = db.Table('eventos', 
    db.Column('user_id', db.Integer, db.ForeignKey('user.username')),
    db.Column('evento_id', db.Integer, db.ForeignKey('evento.nombre'))  
    )

class User(db.Model):
    username = db.Column(db.String(20), primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password = db.Column(db.String(10), nullable=False)
    nombre = db.Column(db.String(30), nullable=False)
    apellido = db.Column(db.String(30), nullable=False)
    isAdmin = db.Column(db.Boolean)

    def __init__(self, username, email, password, nombre, apellido, isAdmin):
      self.username = username
      self.email = email
      self.password = password
      self.nombre = nombre
      self.apellido = apellido
      self.isAdmin = isAdmin

    def __repr__(self):
      return '<Usuario %r>' % (self.username)

class Evento(db.Model):
    nombre = db.Column(db.String(30), primary_key=True)
    descripcion = db.Column(db.String(300))
    fecha = db.Column(db.Date)
    lugar = db.Column(db.String(30))
    capacidad = db.Column(db.Integer, nullable=False)
    afiche = db.Column(db.String(100))

    def __init__(self, nombre, descripcion, fecha, lugar, capacidad, afiche):
      self.nombre = nombre
      self.descripcion = descripcion
      self.fecha = fecha
      self.lugar = lugar
      self.capacidad = capacidad
      self.afiche = afiche

    def __repr__(self):
        return '<Evento %r>' % (self.nombre)        

# Creacion de la BD
db.create_all()


#Application code ends here

if __name__ == '__main__':
    app.config.update(
      SECRET_KEY = repr(SystemRandom().random())
    )
    manager.run()