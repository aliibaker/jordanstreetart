import * as React from 'react';
import { useState, useEffect} from 'react';

import Data from '../grafitti.json'
import './GrafMap.css'

import MapGL, {Marker} from 'react-map-gl';

function GrafMap() {

const [viewport, setViewport] = useState({
    latitude: 31.963158,
    longitude: 35.930359,
    zoom: 14
  });

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken= 'pk.eyJ1IjoiYWxpaWJha2VzIiwiYSI6ImNrZHl2Ym9uMjFkZXYzMG9zMnR3M21rcmUifQ.NIMfO9cOOS7XQzlRCPLvPA'
    >
        {
            Data.Grafitti.map(graf =>(

                <Marker key = {graf.id} latitude = {graf.location.lat} longitude = {graf.location.lng}>

                    <button className = "grafImage">
                        <img  src = {`/images/${graf.image}`} />
                    </button>

                </Marker>
            )

            )
        }
    </MapGL>

    
  );
}

export default GrafMap;
