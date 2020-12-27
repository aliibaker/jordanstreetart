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
    title = db.Column(db.String(64), nullable=True)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)

    def __init__(self, filename, title, lat, lng):
        self.filename = filename
        self.lat = lat
        self.lng = lng

    def __repr__(self):
        return '<Graffiti %r>' % self.id

# schema
class GraffitiSchema(ma.Schema):
    class Meta:
        fields = ('id', 'filename', 'title', 'lat', 'lng')

class Artist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(64), nullable=True)
    name = db.Column(db.String(64), nullable=False)
    link = db.Column(db.String(128), nullable=True)

    def __init__(self, filename, name, link):
        self.filename = filename
        self.name = name
        self.link = link

    def __repr__(self):
        return '<Artist %r>' % self.id

class ArtistSchema(ma.Schema):
    class Meta:
        fields = ('id', 'filename', 'name', 'link')

class Credits(db.Model):
    graffiti_id = db.Column(db.Integer, db.ForeignKey('graffiti.id'), primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'), nullable=False)

    def __init__(self, graffiti_id, artist_id):
        self.graffiti_id = graffiti_id
        self.artist_id = artist_id

class CreditSchema(ma.Schema):
    class Meta:
        fields = ('graffiti_id','artist_id')

# one graffiti
graffiti_schema = GraffitiSchema()

# many graffiti
graffitis_schema = GraffitiSchema(many=True)

artist_schema = ArtistSchema()

artists_schema = ArtistSchema(many=True)

credit_schema = CreditSchema()

credits_schema = CreditSchema(many=True)


import mawaheb.api
