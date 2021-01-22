import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TourModal = ({show, handleClose}) => {
    return(
    <Modal
        show={show}
        onHide={handleClose}
        size="lg"
    >
    <Modal.Header closeButton>
          <Modal.Title>Underground Amman Street Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img src="underground.jpg" style={{maxWidth:"100%", height:"auto"}}></img>
            <p>Underground Amman Street Tour is a tour which explores some of Amman's neighborhoods and their relationship with urban art. 
               If you want to learn more about the street art scene in Amman, we would heavily recommend taking their tour. 
               Contact them on Facebook or Instagram for information regarding their tours. Also be sure to check out <a href="https://www.talesofjordan.com" target="_blank">Tales of Jordan</a> 
            </p>

            
        </Modal.Body>
        <Modal.Footer>
        <div>
            <Button href="https://www.instagram.com/undergroundamman/" style={{backgroundColor:"#C13584", border:"#C13584"}}target="_blank" className="mr-auto p-2"><i class="fab fa-instagram" variant="outline-primary"></i> Instagram</Button>
        </div>
        
        <Button href="https://www.facebook.com/undergroundamman/" target="_blank" className="mr-auto p-2"><i class="fab fa-facebook"></i> Facebook</Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>

    </Modal>
    );
}

export default TourModal;