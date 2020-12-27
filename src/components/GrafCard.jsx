import * as React from 'react';
import Card from 'react-bootstrap/Card'
import './ArtistCard.css'

const GrafCard = (props) =>{

    const {grafData} = props;

    return(
    //     <Card border="light" style={{ width: '14rem', border: 'none', padding: 0 }} className = 'm-0'>
    //         <Card.Img variant="top" src={`/hd_images/${grafData.filename}`}/>
    //         <Card.Body>
    //             <Card.Text>
    //                 Artist: {grafData.artist}
    //             </Card.Text>
    //             <Card.Link href={`https://www.google.com/maps/search/?api=1&query=${grafData.lat},${grafData.lng}`}target='_blank'>
    //                 View on Google Maps
    //             </Card.Link>
    //         </Card.Body>
    // </Card>
        <div className="cardImage">
            <img src={`/hd_images/${grafData.filename}`} className=".img-responsive"/>
        </div>
    );
}


export default GrafCard;
    
