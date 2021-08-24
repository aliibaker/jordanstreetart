import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react'
import * as React from 'react'
import {useState, useEffect} from 'react'

import './TimelineModal.css'
import axios from 'axios'



const TimelineContainer = ({imgId, artist}) =>{
    console.log(artist)
    console.log(imgId)

    return(
        <div className="timeline-content">
            <h5>Unknown title</h5>
            <img src={`hd_images/graf_${imgId}.jpg`}/>
            {artist !== undefined ?
                (<p>Artist:
                    {artist.map((art)=>((<a href={""}> {art.name}</a>)))}
                </p>): <p>Unknown Artist</p>}
        </div>
    )
}

const TimelineModal = ({grafData, show, onHide}) =>{
    const tagArtists = grafData.tagover[0].artists
    return(
        <Modal
            show={show}
            onHide={onHide}
            size={"lg"}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Timeline
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={"timeline"}>
                    <ul>
                        {grafData.tagover.map((tag)=>(
                            <li>
                                <TimelineContainer imgId={tag.original_id} artist={tag.artists}></TimelineContainer>
                            </li>

                        ))}
                        <li>
                            <TimelineContainer imgId={grafData.tagover[0].new_id} artist={grafData.artists}></TimelineContainer>
                        </li>

                    </ul>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className= "" onClick={onHide} variant='outline-primary'>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TimelineModal;