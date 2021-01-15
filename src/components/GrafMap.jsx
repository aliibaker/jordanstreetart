import * as React from 'react';
import { useState, useEffect, useRef} from 'react';
import './GrafMap.css'

import MapGL, {Marker, FlyToInterpolator, Popup} from 'react-map-gl';

import GrafMarker from './Markers/GrafMarker'
import GrafPopup from './GrafPopup'
import useSupercluster from 'use-supercluster';
import InfoModal from './InfoModal';
import ArtistProfile from './ArtistProfile';


import axios from 'axios';



function GrafMap() {
  const[data, setData] = useState([]);
  const[popupData, setPopupData] = useState(null);
  const[popupIndex, setPopupIndex] = useState(null);
  const[showInfo, setShowInfo] = useState(false);
  const[transitioning, setTransitioning] = useState(false);
  const[artistWork, setArtistWork] = useState([]);


  const[viewport, setViewport] = useState({
      latitude: 31.963198,
      longitude: 35.930359,
      zoom: 10
    });
  
  //sets map reference 
  const mapRef = useRef();
  //fetches data from REST api 
  useEffect(() =>{
    fetch('/api/graffiti').then(res => res.json()).then(data => {
      setData(data)
    })
    const listener = e =>{
      if(e.target.classList.contains("overlays")){
        setPopupData(null);
        setPopupIndex(null);
      }
    };
    window.addEventListener("mousedown", listener)

    return(()=> {window.removeEventListener("mousedown", listener)})
  }, [])
  

  const getGrafData = (collectionId, cIndex) =>{
    return data[collectionId].collections[cIndex]
  }


  const onGrafMarkerClick = (latitude, longitude) =>{
    setViewport({
      ...viewport,
      latitude,
      longitude,
      zoom: 20,
      transitionInterpolator: new FlyToInterpolator({ speed: 1}),
      transitionDuration: 1000
    });
    setTransitioning(true);
    setTimeout(()=>{
      setTransitioning(false);

    },1200);
    setShowInfo(false);
  }
  const onGrafDataChange = (currData, index) =>{
    setPopupData(currData)
    setPopupIndex(index)

  };

  const onMoreInfoClick = async (cId, cIn) => {
    setArtistWork([]);
    const artists = data[cId].collections[cIn].artists;
    console.log(cId,cIn);
    if(artists !== undefined){
      let artistData = artists.map( async (artist, index)=>{
        let fetchArtistData = await axios.get(`/api/creds?artist_id=${artist.id}`);
        Promise.resolve(fetchArtistData)
        let dataArray = fetchArtistData.data.map(async (dt) => {
          let fetchGrafData = await axios.get(`/api/graffiti_query?graffiti_id=${dt.graffiti_id}`);
         
          return Promise.resolve(fetchGrafData);
        })
        return Promise.all(dataArray);
      })
  
      let tempArr = []
      artistData.forEach((artist, index) =>{
         tempArr.push([])
          artist.then(dt=> {
            tempArr[index].push(dt)
          })
        
      })
      setArtistWork(tempArr);
    }
  }

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






  useEffect(() =>{
    let found = false
    if(!transitioning)
      if(popupData !== null){
        clusters.forEach(cluster =>{
          if(cluster.properties.collectionId === popupData){
            found = true
          }
        })
        if(!found)
        {
          setPopupData(null)
          setPopupIndex(null)
        }
        
      }

  }, [clusters])




  return (
    <>
    <div id = "map">
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/aliibakes/ckjpw30p454tr19qsdypr1vyq"
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        transitionDUration={1000}
        minZoom={10}
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
                      onClick={(e) => {
                        const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20);
                        setViewport({
                          ...viewport,
                          latitude,
                          longitude,
                          zoom: expansionZoom,
                          transitionInterpolator: new FlyToInterpolator({ speed: 2}),
                          transitionDuration: "auto"
                        });
                        e.preventDefault();

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
                            onGrafMarkerClick(latitude, longitude);
                          }}  
                          onGrafDataChange={onGrafDataChange}
                          collectionId={cluster.properties.collectionId}
                          selected={cluster.properties.collectionId===popupData}
                          currentIndex={popupIndex}
              /> 
            </div>
     
          )
        })}
        {popupData !== null && 
          <GrafPopup 
            data={data[popupData]} 
            index={popupIndex} 
            onGrafDataChange={onGrafDataChange} 
            onMoreInfoClick={onMoreInfoClick}
            launchInfoModal={()=>{setShowInfo(true);}}>

          </GrafPopup>
        
        }

        {(showInfo !== false) && (popupData !== null) &&
           <InfoModal 
              grafData={data[popupData].collections[popupIndex]} 
              show={showInfo} 
              collectionId={popupData}
              index={popupIndex} 
              onHide={()=>{setShowInfo(false); onGrafDataChange(null,null)}}
              onGrafMarkerClick={onGrafMarkerClick}
              onGrafDataChange={onGrafDataChange}
              onMoreInfoClick = {(cId, cIn) => {onMoreInfoClick(cId, cIn);setTimeout(()=>{setShowInfo(true);}, 1000); }}
              artistWork = {artistWork}
              
              />
              }
              
        
      </MapGL>

    </div>
    </>
      


    
  );
}

export default GrafMap;
