import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import * as React from 'react'
import {useState, useEffect} from 'react'

import './InfoModal.css'

const InfoModal = ({grafData, collectionId, index, show, onHide, getGrafData}) => {
    console.log(grafData)
    const [artistWork, setArtistWork] = useState(null)


    const randomizeArtistWork = (data)=>{
      //not really random but will work on this later
      return data
    }

    const processArtworkData = (data)=>{
      let dataArray = []
      console.log(data)
      data.forEach(dt =>{
        console.log(dt.graffiti_id);
        if(dt.graffiti_id !== grafData.id){
          fetch(`/api/graffiti_query?graffiti_id=${dt.graffiti_id}`).then(res=>res.json()).then(newData=>{
            dataArray.push(newData[0]);
          })
        }

      })
      return dataArray;
    }
    useEffect(() =>{
      if(grafData.artists !== undefined){
        fetch(`/api/creds?artist_id=${grafData.artists[0].id}`).then(res => res.json()).then(data => {
          setArtistWork(processArtworkData(data))
        })
      }

    }, [])


    console.log(artistWork)
    return(<>
        <Modal
      className="infomodal"
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
          <img src={`/hd_images/${grafData.filename}`} />
        </div>
      </Modal.Body>
      <Modal.Body>
        <h5>By: {grafData.artists && grafData.artists[0].name}</h5>
        <h5>Other works:</h5>
        <div className="other-works">
          {artistWork && artistWork.map((art)=>(
            <img src={`/hd_images/${art.filename}`}></img>
          ))}
        </div>

       
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
