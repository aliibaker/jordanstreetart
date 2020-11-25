import * as React from 'react';
import { useState, useEffect} from 'react';
import './GrafMap.css'

import MapGL from 'react-map-gl';

import GrafMarker from './GrafMarker'

function GrafMap() {
const [data, setData] = useState([]);


const [viewport, setViewport] = useState({
    latitude: 31.963158,
    longitude: 35.930359,
    zoom: 14
  });

  useEffect(() =>{
    fetch('/api/graffiti').then(res => res.json()).then(data => {
      setData(data)
    })
  }, [])
  return (
    <div id = "map">
      <MapGL
        {...viewport}
        width="100vw"
        height="95.8vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
          {data !== null &&
              data.map(graf =>(
                  
                  <GrafMarker grafCollection = {graf.collections} key = {graf.collections[0].id}
                              />
              )

              )
          }
      </MapGL>

    </div>


    
  );
}

export default GrafMap;
