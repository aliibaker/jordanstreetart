"""
From spec.

Insta485 package initializer.
"""
import flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# app is a single object used by all the code modules in this package
app = flask.Flask(__name__, static_folder="../build", static_url_path='/')  # pylint: disable=invalid-name

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///streetart.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False
# Initialize Database
db = SQLAlchemy(app)
ma = Marshmallow(app)

#Create db model
class Graffiti(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(64), nullable=False)
    artist = db.Column(db.String(64), nullable=True)
    title = db.Column(db.String(64), nullable=True)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)

    def __init__(self, filename, artist, title, lat, lng):
        self.filename = filename
        self.artist = artist
        self.lat = lat
        self.lng = lng

    def __repr__(self):
        return '<Name %r>' % self.id

# schema
class GraffitiSchema(ma.Schema):
    class Meta:
        fields = ('id', 'filename', 'artist', 'title', 'lat', 'lng')

# one graffiti
graffiti_schema = GraffitiSchema()

# many graffiti
graffitis_schema = GraffitiSchema(many=True)


import mawaheb.api
