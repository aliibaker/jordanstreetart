import mawaheb
from flask import request, jsonify

db = mawaheb.db



@mawaheb.app.route('/api/artist', methods=['GET'])
def get_artist():
    artist_id = request.args.get('artist_id')
    artist_query = mawaheb.Artist.query.filter_by(id=artist_id).first()
    artist_result = mawaheb.artist_schema.dump(artist_query)
    return jsonify(artist_result)

@mawaheb.app.route('/api/graffiti_creds', methods=['GET'])
def get_graffiti_creds():
    graffiti_id = request.args.get('graffiti_id')
    creds_query = mawaheb.Credits.query.filter_by(graffiti_id=graffiti_id)
    creds_result = mawaheb.credits_schema.dump(creds_query)
    return jsonify(creds_result)

@mawaheb.app.route('/api/creds', methods=['GET'])
def get_artist_creds():
    artist_id = request.args.get('artist_id')
    artist_query = mawaheb.Credits.query.filter_by(artist_id=artist_id).all()
    credits_results = mawaheb.credits_schema.dump(artist_query)
    return jsonify(credits_results)