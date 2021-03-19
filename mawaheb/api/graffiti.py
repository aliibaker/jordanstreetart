import mawaheb
from flask import request, jsonify
from collections import defaultdict
import random

db = mawaheb.db

graffiti_directory = defaultdict((lambda:{}))


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


        graffiti_collections[loc].append(data)
    for index, key in enumerate(graffiti_collections):
        temp_dict = {}

        temp_dict['collectionid'] = index
        temp_dict['collections'] = graffiti_collections[key]
        for collection_index, mural in enumerate(temp_dict['collections']):
            mural['collectionid'] = index
            mural['collection_index'] = collection_index
            id = mural['id']
            graffiti_directory[f'{id}']['collectionid'] = index
            graffiti_directory[f'{id}']['collection_index'] = collection_index
            
        final_collection.append(temp_dict)

    
    
    print(graffiti_directory)
    return jsonify(final_collection)

@mawaheb.app.route('/api/graffiti_query')
def get_graffiti_data():
    if(len(graffiti_directory) != 0):
        graffiti_id = request.args.get('graffiti_id')
        graffiti_query = mawaheb.Graffiti.query.filter_by(id=graffiti_id)
        graffiti_results = mawaheb.graffitis_schema.dump(graffiti_query)
        print(graffiti_results)
        graffiti_results[0]['collectionid'] = graffiti_directory[f'{graffiti_id}']['collectionid']
        graffiti_results[0]['collection_index'] = graffiti_directory[f'{graffiti_id}']['collection_index']
        return jsonify(graffiti_results)
    else:
        return 'Directory not loaded, please load the website first before requesting data about the art', 400

# @mawaheb.app.route('/api/graffiti_random')
# def get_random_data():
#     if(len(graffiti_directory) != 0):
#         rand_int_collection = random.int(0, len(graffiti_directory)-1)
#         rand_int_id = random.int(0, len(graffiti_directory[f'{rand_int_collection}']['collection_index']))
#         pass
#     else:
#         return 'Directory not loaded, please load the website first before requesting data about the art', 400