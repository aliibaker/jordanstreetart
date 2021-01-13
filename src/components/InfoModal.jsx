import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import * as React from 'react'
import {useState, useEffect} from 'react'

import './InfoModal.css'

import axios from 'axios'


const InfoModal = ({grafData, collectionId, index, show, onHide, onGrafMarkerClick, onGrafDataChange, openInfo}) => {
    let arraySize = 0;
    if(grafData.artists !== undefined){
      arraySize = grafData.artists.length;
    }
    const [artistWork, setArtistWork] = useState([...Array(arraySize)].map(e => Array(0)))
    const [loaded, setLoaded] = useState(false)
    const [fetching, setFetching] = useState(true)



    const renderArtists = () =>{
      if(grafData.artists !== undefined){
        if(grafData.artists.length > 1){
          const artistData = grafData.artists.map(dt =>(
            <span><Button variant="link" href={`${dt.link}`} target="_blank">{dt.name}</Button></span>
          ))

          return(<h5>Artists: {artistData}</h5>)
        }
      return <h5>Artist: <Button variant="link" href={`${grafData.artists[0].link}`} target="_blank">{grafData.artists[0].name}</Button></h5>
      }

      return <h5>Artist: Unknown</h5>
    }

    const renderArtistWork = () =>{
      if(grafData.artists !== undefined){
        if(grafData.artists.length > 1){
          let artistJsx = []
          grafData.artists.forEach((artist,index)=>{
            console.log(artistWork[index])
            if(artistWork[index] !== undefined && artistWork[index].length > 1){
              artistJsx.push(<>
                  <h6>{artist.name}'s work: </h6>
                  <div className="other-works">
                    {artistWork[index].map(art=>{
                        if(art !== null){
                          console.log(art)
                          return(<img 
                            src={`/hd_images/${art.data[0].filename}`} 
                            onClick={()=> {
                              onGrafMarkerClick(art.data[0].lat, art.data[0].lng); 
                              setArtistWork([]);  
                              setTimeout(()=>{onGrafDataChange(art.data[0].collectionid, art.data[0].collection_index);}, 1000); 
                             openInfo()}} 
                            alt={art.data[0].id}></img>)
                        }
                        else{
                          return null;
                        }
                        
                    })}
                  </div>
                  </>)
            }
            else{
              artistJsx.push(
                <h6>Other work for {artist.name} not found on website</h6>
              )
            }
          })
   
          return artistJsx;
          
        }
        return(<><h6>Other Works:</h6><div className="other-works">
              {artistWork[0] && artistWork[0].map((art)=>{
                if (art !== null){
                  return(
                    <img 
                      src={`/hd_images/${art.data[0].filename}`} 
                      onClick={()=> {
                              onGrafMarkerClick(art.data[0].lat, art.data[0].lng); 
                              setArtistWork([]); 
                              onGrafDataChange(art.data[0].collectionid, art.data[0].collection_index);
                              openInfo();
                               }} 
                      alt={art.data[0].id}
                      >
                        
                      </img>
                    )
                }
                return null;


      })}
      </div></>)
      }
      return null;
    }

    useEffect(() =>{

      const processArtworkData =  async (data) => {
        let dataArray = data.map(async dt =>{
          if(dt.graffiti_id !== grafData.id){
            let fetchedGraffiti = await axios.get(`/api/graffiti_query?graffiti_id=${dt.graffiti_id}`)
            return fetchedGraffiti;
          }
          return null;
        })

        return Promise.all(dataArray);
      }
      setArtistWork([])
      let tempArr = [...artistWork]
      if(grafData.artists !== undefined){
        grafData.artists.forEach(async (artist, index)=>{
          fetch(`/api/creds?artist_id=${artist.id}`).then(res => res.json()).then(async data => {
     
            let artWorkData = await processArtworkData(data);
            console.log(artWorkData)
            tempArr[index] = artWorkData
    
            
            console.log(tempArr)
          
            
          })
        })
      }

      setArtistWork(tempArr);
      setFetching(false);
    

    }, [])

    return(<>
        <Modal
      
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Unknown title 
          </Modal.Title>
          <p className="d-flex justify-content-end id-box" >ID: {grafData.id}</p>
        </Modal.Header>
        <Modal.Body className ="infomodal-body">
          <div className="d-flex justify-content-center">
            <img src={`/hd_images/${grafData.filename}`} onLoad={()=>setLoaded}/>
          </div>
        </Modal.Body>
        
        <Modal.Body>
          {renderArtists()}
          {!fetching && renderArtistWork()}

        
        </Modal.Body>
        <Modal.Footer>
          <div className ="">
            <Button className= "mr-auto p-2" variant="outline-success" href={`https://www.google.com/maps/search/?api=1&query=${grafData.lat},${grafData.lng}`}target='_blank'><i class="fa fa-map-marker" aria-hidden="true"></i> Location</Button>
          </div>
          <Button className= "mr-auto p-2" variant="outline-warning"><i class="fas fa-exclamation-triangle"></i> Report an Issue</Button>
          <Button className= "" onClick={onHide} variant='outline-primary'>Close</Button>

        </Modal.Footer>
      </Modal>
    </>)
}

export default InfoModal;
