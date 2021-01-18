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
  //data of all the murals, divided into collections
  const[data, setData] = useState([]);
  //stores the current collection data selected
  const[collectionId, setCollectionId] = useState(null);
  //stores the index of the data in the collection being viewed
  const[collectionIndex, setCollectionIndex] = useState(null);
  //bool to determine if info modal should be shown
  const[showInfo, setShowInfo] = useState(false);
  //bool to know if map is transitioning to another point
  const[transitioning, setTransitioning] = useState(false);
  //artist work data for the info modal
  const[artistWork, setArtistWork] = useState([]);
  //show popup state
  const [showPopup, setShowPopup] = useState(false);


  const updateData = (cId, cIn) =>{
    setCollectionId(cId);
    setCollectionIndex(cIn);
  }

  const updatePopup = (cId, cIn) =>{
    setShowPopup(false);
    updateData(cId, cIn);
    setShowPopup(true);
  }

  // const updateInfoModal = (cId, cIn) =>{
  
  // }


  //map base configuration
  const[viewport, setViewport] = useState({
      latitude: 31.963198,
      longitude: 35.930359,
      zoom: 10
    });
  
  //sets map reference 
  const mapRef = useRef();

  //fetches data from REST api, only done once
  useEffect(() =>{
    fetch('/api/graffiti').then(res => res.json()).then(data => {
      setData(data)
    })
    const listener = e =>{
      if(e.target.classList.contains("overlays")){
        setShowPopup(false);
      }
    };
    //event listener to check if user clicks outside the popup to close it.
    window.addEventListener("mousedown", listener)

    return(()=> {window.removeEventListener("mousedown", listener)})
  }, [])


  const updateLocation = (lat, lng) =>{
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: lng,
      zoom: 20,
      transitionInterpolator: new FlyToInterpolator({speed: 1}),
      transitionDuration: 1000
    });
    setTransitioning(true);
    setTimeout(()=>{
      setTransitioning(false);
    }, 1200)

  }
  
  //if a user clicks a marker, it takes it to the new location in 1000ms, closes the infomodal 
  // const onGrafMarkerClick = (latitude, longitude) =>{
  //   setShowPopup(false);
  //   setViewport({
  //     ...viewport,
  //     latitude,
  //     longitude,
  //     zoom: 20,
  //     transitionInterpolator: new FlyToInterpolator({ speed: 1}),
  //     transitionDuration: 1000
  //   });
  //   setTransitioning(true);
  //   setTimeout(()=>{
  //     setTransitioning(false);

  //   },1200);
  //   setShowPopup(true);
  //   setShowInfo(false);
  // }
  //function which when called changes the current data being viewed 

  

  // const hidePopup = () =>{
  //   setShowPopup(false);
  //   onGrafDataChange(null, null);
  // }

  //when the more info button is clicked, data is fetched to store the artist's other work to be passed into the infomodal component 

  const onInfoMarkerClick = (cId, cIn) =>{
    setShowInfo(false);
    setTimeout(()=>{setShowInfo(true)}, 1000)
    console.log(data[cId]);
    updateLocation(data[cId].collections[cIn].lat, data[cId].collections[cIn].lng);
    updatePopup(cId, cIn);
    onMoreInfoClick(cId, cIn);
    console.log(cId, cIn)
  }

  const onMoreInfoClick = async (cId, cIn) => {
    setArtistWork([]);
    const artists = data[cId].collections[cIn].artists;
    console.log(cId,cIn);
    //check if the mural has 
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
      if(collectionId !== null){
        clusters.forEach(cluster =>{
          if(cluster.properties.collectionId === collectionId){
            found = true
          }
        })
        if(!found)
        {
          setCollectionId(null)
          setCollectionIndex(null)
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
                      key={cluster.id}
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
                          onClick={(cId,cIn) => {
                            console.log(cId, cIn);
                            updateLocation(data[cId].collections[cIn].lat, data[cId].collections[cIn].lng)
                            updatePopup(cId, cIn);
                            
                          }}  
                          updateData={(cId, cIn)=>updateData(cId, cIn)}
                          collectionId={cluster.properties.collectionId}
                          collectionIndex={cluster.properties.collectionId===collectionId ? collectionIndex:0}
                          selected={cluster.properties.collectionId===collectionId && showPopup === true}
                          onMoreInfoClick = {(lat,lng)=>{onMoreInfoClick(lat,lng); setShowInfo(true)}}
              /> 
            </div>
     
          )
        })}
        {/* {showPopup !== false ?
          <GrafPopup 
            data={data[collectionId]} 
            index={collectionIndex} 
            updateData={(cId, cIn)=>updateData(cId, cIn)}
            onMoreInfoClick={onMoreInfoClick}
            launchInfoModal={()=>{setShowInfo(true);}}>

          </GrafPopup>: null
        
        } */}

        {(showInfo !== false)  &&
           <InfoModal 
              grafData={data[collectionId].collections[collectionIndex]} 
              show={showInfo} 
              collectionId={collectionId}
              index={collectionIndex} 
              onHide={()=>{setShowInfo(false);}}
              artistWork = {artistWork}
              onInfoMarkerClick={onInfoMarkerClick}
              
              />
              }
              
        
      </MapGL>

    </div>
    </>
      


    
  );
}

export default GrafMap;
