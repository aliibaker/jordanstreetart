import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import './GrafMap.css'

import MapGL, {Marker, FlyToInterpolator, Popup, NavigationControl} from 'react-map-gl';

import GrafMarker from './Markers/GrafMarker'
import GrafPopup from './GrafPopup'
import useSupercluster from 'use-supercluster';
import InfoModal from './Modals/InfoModal';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


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
  //radius
  const [radius, setRadius] = useState(40);


  const updateData = (cId, cIn) =>{
    setCollectionId(cId);
    setCollectionIndex(cIn);
  }

  const updatePopup = (cId, cIn) =>{
    setShowPopup(false);
    updateData(cId, cIn);
    setShowPopup(true);
  }

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

  const updateBaseLocation = (lat,lng, zoom) =>{
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: lng,
      zoom: zoom,
      transitionInterpolator: new FlyToInterpolator({speed: 1}),
      transitionDuration: 1000
    });
    setTransitioning(true);
    setTimeout(()=>{
      setTransitioning(false);
    }, 1200)
    setCollectionId(null)
    setCollectionIndex(null)
    setShowPopup(false)


  }

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
  
  //when a marker from the info modal is clicked, the location on the map is updated, popup for new data is opened, and then the info modal shows for new data
  const onInfoMarkerClick = (cId, cIn) =>{
    setShowInfo(false);
    setTimeout(()=>{setShowInfo(true)}, 1000)
    console.log(data[cId]);
    updateLocation(data[cId].collections[cIn].lat, data[cId].collections[cIn].lng);
    updatePopup(cId, cIn);
    onMoreInfoClick(cId, cIn);
    console.log(cId, cIn)
  }

  //when the more info button is clicked, data is fetched to store the artist's other work to be passed into the infomodal component 
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
    options: {radius: radius, maxZoom: 20}
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

      setRadius(4500/Math.pow(viewport.zoom, 2))

  }, [clusters])

  const GrafMarkers = clusters.map(cluster => {
      const [longitude, latitude] = cluster.geometry.coordinates;
      const {
        cluster: isCluster,
        point_count: pointCount
      } = cluster.properties
      //check if the data is a cluster, if it is render a ClusterMarker
      if (isCluster) {
        return (
            <Marker key={cluster.id} latitude={latitude} longitude={longitude}>
              <div className="cluster-marker"
                   key={cluster.id}
                   style={{
                     width: `${75 + pointCount / points.length * 30}px`,
                     height: `${75 + pointCount / points.length * 30}px`
                   }}
                   onClick={(e) => {
                     const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20);
                     setViewport({
                       ...viewport,
                       latitude,
                       longitude,
                       zoom: expansionZoom,
                       transitionInterpolator: new FlyToInterpolator({speed: 2}),
                       transitionDuration: "auto"
                     });
                     e.preventDefault();

                   }}>
                {pointCount}
              </div>
            </Marker>
        )

      }
      //else return a GrafMarker
      return (

          <div>
            <GrafMarker grafCollection={cluster.properties.collection}
                        key={cluster.properties.collectionId}
                        onClick={(cId, cIn) => {
                          console.log(cId, cIn);
                          updateLocation(data[cId].collections[cIn].lat, data[cId].collections[cIn].lng)
                          updatePopup(cId, cIn);

                        }}
                        updateData={(cId, cIn) => updateData(cId, cIn)}
                        collectionId={cluster.properties.collectionId}
                        collectionIndex={cluster.properties.collectionId === collectionId ? collectionIndex : 0}
                        selected={cluster.properties.collectionId === collectionId && showPopup === true}
                        onMoreInfoClick={(lat, lng) => {
                          onMoreInfoClick(lat, lng);
                          setShowInfo(true)
                        }}
            />
          </div>

      )
    })

  const buttonOptions = (
      <ButtonGroup>
          <DropdownButton as={ButtonGroup} title="Amman" id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1" onClick={()=>{updateBaseLocation(31.9548167,35.9244115, 14)}}>Luweibdeh/Jabal Amman</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={()=>{updateBaseLocation(31.9583329,35.8662133, 15.5)}}>Swefieh</Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={()=>{updateBaseLocation(31.9734829,35.9617931, 16)}}>AlHashmi</Dropdown.Item>
            <Dropdown.Item eventKey="4" onClick={()=>{updateBaseLocation(31.887391,35.855746, 14)}}>Marj Al Hamam</Dropdown.Item>
          </DropdownButton>
          <Button onClick={()=>{updateBaseLocation(32.555171, 35.860350, 16)}}>Irbid</Button>
      </ButtonGroup>
  )



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
        minZoom={10}
        ref = {mapRef}
      >

        {GrafMarkers}

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
              <div style = {{right:8}}>
                <NavigationControl showCompass={false}>

                </NavigationControl>
              </div>

      </MapGL>


    </div>
      <div className={"bottomRightButtons"}>
        {buttonOptions}
      </div>

    </>
      


    
  );
}

export default GrafMap;
