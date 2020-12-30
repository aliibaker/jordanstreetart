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

    const renderArtists = () =>{
        if(data.collections[index].artists === undefined){
            return(<Card.Text>Artist: Unknown</Card.Text>)
        }
        else{
            if(data.collections[index].artists.length > 1){
                console.log(data.collections[index].artists)
                return(<Card.Text>
                        {data.collections[index].artists.map(artist => (
                            <Card.Link href="artist.link" target="_blank">{artist.name}</Card.Link>
                        ))}
                        </Card.Text>);
            }
            else{
                return(<Card.Text> Artist: &nbsp;
                    <Card.Link href={data.collections[index].artists[0].link}>
                        {data.collections[index].artists[0].name}
                    </Card.Link>
                    
                </Card.Text>)
            }
        }
        return(<Card.Text>Artists:</Card.Text>)
    }

    



    return(
        <Popup latitude={lat} longitude={lng} offsetLeft = {40} offsetTop = {10} style ={{opacity: 0}}>
          
            <Card style={{ width: '13rem' }}>
                {data.collections.length > 1 ?
                    <Carousel activeIndex={activeIndex} onSelect={handleSelect} indicators={false}> 
                
                        {data.collections.map(graf =>(
                            <Carousel.Item key={graf.id}>
                                <Card.Img src={`/hd_images/${graf.filename}`}></Card.Img>
                            </Carousel.Item>
                            
                        ))}
                    </Carousel>: <Card.Img src={`/hd_images/${data.collections[index].filename}`}></Card.Img> }
                
            <Card.Body>
              
                {renderArtists()}
             
                        <Card.Link href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}target='_blank'>
                                                View on Google Maps
                        </Card.Link>
            </Card.Body>
            

            </Card>
       
        </Popup>
    )
    

}


export default GrafPopup;
    
