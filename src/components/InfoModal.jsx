import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import * as React from 'react'
import {useState, useEffect} from 'react'

import './InfoModal.css'

import axios from 'axios'


const InfoModal = ({grafData, 
                    show, 
                    onHide, 
                    onGrafMarkerClick, 
                    onGrafDataChange, 
                    openInfo, 
                    onMoreInfoClick, 
                    artistWork}) => {
    const [loaded, setLoaded] = useState(false);



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
      if(artistWork.length !== 0){
        return(
          artistWork.map((work, index)=>{
            if(work.length !== 0){
              return(<>
                  <h6>{grafData.artists[index].name}'s work: </h6>
                  <div className="other-works">
                    {work[0].length !== 1 ? work[0].map((dt)=>{
                      if(dt.data[0].id !== grafData.id){
                        return(<img 
                          alt={`/hd_images/${dt.data[0].filename}`}
                          src={`/hd_images/${dt.data[0].filename}`} 
                          onClick={()=> {
                            console.log(dt.data[0].collectionid, dt.data[0].collection_index);
                            onGrafMarkerClick(dt.data[0].lat, dt.data[0].lng); 
                            onGrafDataChange(dt.data[0].collectionid, dt.data[0].collection_index);
                            onMoreInfoClick(dt.data[0].collectionid, dt.data[0].collection_index);
                           }}/>)
                      }
      
                    }): <p>No other work found on site.</p>}
                  </div>
              </>)
            }
            return null;
          }
        )
        )
    }
  }


    useEffect(()=>{
      setTimeout(()=>{setLoaded(true)}, 2000)

    }, [artistWork])

    return(<>
        <Modal
        key={grafData.id}
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
           {/* This renders the artists and their work if they have any  */}
          {renderArtists()} 
          {grafData.artists !== undefined ? ((loaded === true) ? renderArtistWork(): <div>loading...</div>):null}

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
