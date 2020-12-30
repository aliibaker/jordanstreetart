import * as React from 'react';
import {useState} from 'react';
import {Popup} from 'react-map-gl'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'

import './GrafPopup.css'

const GrafPopup = ({data, index, onGrafDataChange}) =>{
    const {lat, lng} = data.collections[index];
    const [activeIndex, setIndex] = useState(index);


    const handleSelect = (selectedIndex, e) =>{
        setIndex(selectedIndex);
        onGrafDataChange(data.collectionid, selectedIndex);
    }



    return(
        <Popup latitude={lat} longitude={lng} offsetLeft = {40} offsetTop = {10} style ={{opacity: 0}}>
          
            <Card style={{ width: '14rem' }}>
                {data.collections.length > 1 ?
                    <Carousel activeIndex={activeIndex} onSelect={handleSelect} indicators={false}> 
                
                        {data.collections.map(graf =>(
                            <Carousel.Item key={graf.id}>
                                <Card.Img src={`/hd_images/${graf.filename}`}></Card.Img>
                            </Carousel.Item>
                            
                        ))}
                    </Carousel>: <Card.Img src={`/hd_images/${data.collections[index].filename}`}></Card.Img> }
                
                    <Card.Body>
                        <Card.Link href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}target='_blank'>
                                                View on Google Maps
                        </Card.Link>
            </Card.Body>
            

            </Card>
       
        </Popup>
    )
    

}


export default GrafPopup;
    
