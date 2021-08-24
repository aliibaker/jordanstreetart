import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'



const AboutModal = ({show, handleClose}) =>{
    return(
        <Modal 
            show={show} 
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
          <Modal.Title>Jordan Street Art</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>About</h4>
            <hr></hr>
            <p>Jordan Street Art is an open source web application which documents the graffiti and murals of Jordan on a virtual map.
            This project was founded and programmed by Ali Baker with the help of the street art community. 
            Check out the code on <a href ="https://github.com/bakesbasha/jordanstreetart" target="_blank">Github!</a> </p>
            <h4>Changelog V2.3</h4>
            <hr></hr>
            <ul>
                <li>Added 30 new murals.</li>
                <li>Added new timeline feature.</li>
                <li>Some bug fixes.</li>
            </ul>
            <h4>Future updates</h4>
            <hr></hr>
            <ul>
                <li>Revamp UI/UX.</li>
                <li>Allow for user posting.</li>
                <li>Development of a native iOS application.</li>
                <li>User contributor credits</li>
                <li>Artist Directories and filtering</li>
            </ul>
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>

        </Modal>
    );
}

export default AboutModal;