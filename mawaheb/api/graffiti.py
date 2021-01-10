import mawaheb
from flask import request, jsonify
from collections import defaultdict

db = mawaheb.db

@mawaheb.app.route('/')
def index():
    return mawaheb.app.send_static_file('index.html')

# @mawaheb.app.route('/graffiti', methods=['POST'])
# def add_graffiti():
#     filename = request.json['filename']
#     artist = request.json['artist']
#     title = request.json['title']
#     lat = request.json['lat']
#     lng = request.json['lng']

#     new_graffiti = mawaheb.Graffiti(filename, artist, title, lat, lng)

#     db.session.add(new_graffiti)
#     db.session.commit()
    
#     return mawaheb.graffiti_schema.jsonify(new_graffiti)

@mawaheb.app.route('/api/graffiti', methods=['GET'])
def get_graffiti():
    all_graffiti = mawaheb.Graffiti.query.all()
    result = mawaheb.graffitis_schema.dump(all_graffiti)
    graffiti_collections = {}
    graffiti_collections = defaultdict(lambda: [], graffiti_collections)
    final_collection = []

    

    # final_collection = defaultdict(lambda: [], final_collection)

    # artist_test = mawaheb.Artist.query.filter_by(id=2).all()
    # artist = mawaheb.artists_schema.dump(artist_test)

    # join_test = db.session.query(mawaheb.Credits, mawaheb.Graffiti, mawaheb.Artist).join(mawaheb.Graffiti).join(mawaheb.Artist).all()
    # print(join_test)


    # grouping graffiti near each other together
    for data in result:
        loc = (data['lat'], data['lng'])
        creds_query = mawaheb.Credits.query.filter_by(graffiti_id=data['id']).all()
        creds_results = mawaheb.credits_schema.dump(creds_query)

        for artist in creds_results:
            artist_query = mawaheb.Artist.query.filter_by(id=artist['artist_id']).first()
            artist_result = mawaheb.artist_schema.dump(artist_query)
            if 'artists' not in data:
                data['artists'] = []
            data['artists'].append(artist_result)


 
        # if len(creds_query) != 0:
        #     for entry in graf_creds:
        #         artist_query = mawaheb.Artist.query.filter_by(id=entry['artist_id']).all()
        #         artist_info = mawaheb.artists_schema.dump(artist_query)
        #         data['artists'] = artist_info


        graffiti_collections[loc].append(data)
    for index, key in enumerate(graffiti_collections):
        temp_dict = {}

        temp_dict['collectionid'] = index
        temp_dict['collections'] = graffiti_collections[key]
        final_collection.append(temp_dict)

    

    return jsonify(final_collection)

@mawaheb.app.route('/api/graffiti_query')
def get_graffiti_data():
    graffiti_id = request.args.get('graffiti_id')
    graffiti_query = mawaheb.Graffiti.query.filter_by(id=graffiti_id)
    graffiti_results = mawaheb.graffitis_schema.dump(graffiti_query)
    return jsonify(graffiti_results)