import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import * as React from 'react'
import {useState, useEffect} from 'react'

import './InfoModal.css'

const InfoModal = ({grafData, collectionId, index, show, onHide, onGrafMarkerClick, onGrafDataChange}) => {
    const [artistWork, setArtistWork] = useState([])
    const [loaded, setLoaded] = useState(false)


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
          // let artistJsx = []
          // grafData.artists.forEach((artist,index)=>{
          //   if(artistWork[index] !== undefined){
          //     artistJsx.push(<>
          //         <h6>{artist.name}'s work</h6>
          //         <div className="other-works">
          //           {artistWork[index].map(art=>{
          //               <img 
          //               src={`/hd_images/${art.filename}`} 
          //               onClick={()=> {onGrafMarkerClick(art.lat, art.lng); setArtistWork([]); onGrafDataChange(art.collectionid, art.collection_index)}} 
          //               alt={art.id}></img>
          //           })}
          //         </div>
          //         </>)
          //   }
          //   else{
          //     artistJsx.push(
          //       <h6>Other work for {artist.name} not found on website</h6>
          //     )
          //   }


          // })

    
          //for now until i reconfigure the fetching system
          return null;
          
        }
        console.log(artistWork)
        return(<><h6>Other Works:</h6><div className="other-works">
              {artistWork[0] && artistWork[0].map((art)=>(
                <img 
                  src={`/hd_images/${art.filename}`} 
                  onClick={()=> {onGrafMarkerClick(art.lat, art.lng); setArtistWork([]); onGrafDataChange(art.collectionid, art.collection_index)}} 
                  alt={art.id}></img>
              ))}
      </div></>)
      }
      return null;
    }

    const randomizeArtistWork = (data)=>{
      //not really random but will work on this later
      return data
    }

    const processArtworkData = (data)=>{
      let dataArray = []
      data.forEach(dt =>{
        if(dt.graffiti_id !== grafData.id){
          fetch(`/api/graffiti_query?graffiti_id=${dt.graffiti_id}`).then(res=>res.json()).then(newData=>{
            dataArray.push(newData[0]);
          })
        }

      })
      console.log(dataArray)
      return dataArray;
    }
    useEffect(() =>{
      if(grafData.artists !== undefined){
        grafData.artists.forEach(artist=>{
          fetch(`/api/creds?artist_id=${artist.id}`).then(res => res.json()).then(data => {
            setArtistWork([...artistWork, processArtworkData(data)])
          })
        })
      }

    },[grafData.artists])

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
        {renderArtistWork()}

       
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
