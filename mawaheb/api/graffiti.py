import mawaheb
from flask import request, jsonify
from collections import defaultdict

db = mawaheb.db

@mawaheb.app.route('/graffiti', methods=['POST'])
def add_graffiti():
    filename = request.json['filename']
    artist = request.json['artist']
    title = request.json['title']
    lat = request.json['lat']
    lng = request.json['lng']

    new_graffiti = mawaheb.Graffiti(filename, artist, title, lat, lng)

    db.session.add(new_graffiti)
    db.session.commit()
    
    return mawaheb.graffiti_schema.jsonify(new_graffiti)

@mawaheb.app.route('/graffiti', methods=['GET'])
def get_graffiti():
    all_graffiti = mawaheb.Graffiti.query.all()
    print(all_graffiti)
    result = mawaheb.graffitis_schema.dump(all_graffiti)
    graffiti_collections = {}
    graffiti_collections = defaultdict(lambda: [], graffiti_collections)
    final_collection = []
    # final_collection = defaultdict(lambda: [], final_collection)

    # grouping graffiti near each other together
    for data in result:
        loc = (data['lat'], data['lng'])
        graffiti_collections[loc].append(data)
    print(graffiti_collections)
    for index, key in enumerate(graffiti_collections):
        temp_dict = {}

        print(key)
        temp_dict['collectionid'] = index
        temp_dict['collections'] = graffiti_collections[key]
        final_collection.append(temp_dict)

    print((final_collection))

    return jsonify(final_collection)
