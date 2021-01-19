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
            <h4>Changelog V2.0</h4>
            <hr></hr>
            <ul>
                <li>Added clusters which group nearby data points near each other.</li>
                <li>Added support for artist credits.</li>
                <li>Redesigned the color scheme of the map to suit the color of the area.</li>
                <li>Added a more info page which allows users to view other works for the artist if available.</li>
                <li>Added a form via Google Surveys to allow users to submit/correct data on the website</li>
            </ul>
            <h4>Future updates</h4>
            <hr></hr>
            <ul>
                <li>Revamp UI/UX.</li>
                <li>Allow for user posting.</li>
                <li>Development of a native iOS application.</li>
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