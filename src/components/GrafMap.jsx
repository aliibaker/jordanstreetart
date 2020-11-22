import * as React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios'

import Data from '../grafitti.json'
import './GrafMap.css'

import MapGL, {Popup} from 'react-map-gl';

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
    // async function getData(){
    //   const result = await axios(
    //     '/graffiti'
    //   );
    //   return result;
    // }

    // let result = getData()
    console.log(data)
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
                  
                  <GrafMarker grafCollection = {graf.collections}
                              />
              )

              )
          }
      </MapGL>

    </div>


    
  );
}

export default GrafMap;
