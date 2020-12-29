import * as React from 'react';
import { useState, useEffect, useRef} from 'react';
import './GrafMap.css'

import MapGL, {Marker, FlyToInterpolator} from 'react-map-gl';

import GrafMarker from './Markers/GrafMarker'
import useSupercluster from 'use-supercluster';



function GrafMap() {
  const[data, setData] = useState([]);


  const[viewport, setViewport] = useState({
      latitude: 31.963158,
      longitude: 35.930359,
      zoom: 12
    });
  
  //sets map reference 
  const mapRef = useRef();
  //fetches data from REST api 
  useEffect(() =>{
    fetch('/api/graffiti').then(res => res.json()).then(data => {
      setData(data)
    })
  }, [])

  //creating clusters
  const points = data.map(graf => ({
    type: "Feature",
    properties: {
      cluster: false,
      collectionId: graf.collectionid,
      collection: graf.collections
    },
    geometry: {type: "Point", coordinates: [graf.collections[0].lng, graf.collections[0].lat]}
  }));


  const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null


  // get clusters
  const {clusters, supercluster} = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds: bounds,
    options: {radius: 46, maxZoom: 20}
  })

  console.log('clusters', clusters)



  return (
    <div id = "map">
      <MapGL
        {...viewport}
        width="100vw"
        height="95.8vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        ref = {mapRef}
      >
        {clusters && clusters.map(cluster => {
          const[longitude, latitude] = cluster.geometry.coordinates;
          const{cluster: isCluster, 
                point_count: pointCount
          } = cluster.properties

          //check if the data is a cluster, if it is render a ClusterMarker
          if(isCluster){
            return(
              <Marker key={cluster.id} latitude={latitude} longitude={longitude}>
                <div className="cluster-marker" 
                      style={{width: `${75 + pointCount/points.length*30}px`,
                              height: `${75 + pointCount/points.length*30}px`}}
                      onClick={() => {
                        const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20);
                        setViewport({
                          ...viewport,
                          latitude,
                          longitude,
                          zoom: expansionZoom,
                          transitionInterpolator: new FlyToInterpolator({ speed: 2}),
                          transitionDuration: "auto"
                        })
                      }}                                 >
                {pointCount}
                </div>
              </Marker>
            )

          }
          //else return a GrafMarker
          return(
            <div>
              <GrafMarker grafCollection={cluster.properties.collection} 
                          key={cluster.properties.collectionId}
                          onClick={() => {
                            setViewport({
                              ...viewport,
                              latitude,
                              longitude,
                              zoom: 18,
                              transitionInterpolator: new FlyToInterpolator({ speed: 1}),
                              transitionDuration: "auto"
                            })
                          }}  
              /> 
            </div>
            
          )
        })}
      </MapGL>

    </div>


    
  );
}

export default GrafMap;
