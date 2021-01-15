import * as React from 'react';
import {useState, useEffect} from 'react';
import {Popup} from 'react-map-gl'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import './GrafPopup.css'



const GrafPopup = ({data, index, onGrafDataChange, launchInfoModal, onMoreInfoClick}) =>{
    const {lat, lng} = data.collections[index];
    const [activeIndex, setIndex] = useState(index);
    const [loading, setLoading] = useState(true);


    const handleSelect = (selectedIndex, e) =>{
        setIndex(selectedIndex);
        onGrafDataChange(data.collectionid, selectedIndex);
        setLoading(false);
    }

    //this is some weird hack ive done to fix an annoying bug 

    const renderArtists = () =>{
        if(data.collections[index].artists === undefined){
            return(<Card.Text>Artist: Unknown</Card.Text>)
        }
        else{
            if(data.collections[index].artists.length > 1){
                return(<Card.Text className="artist-text"><span>Artists: </span>
                        {data.collections[index].artists.map((artist, index) => (
                            <Card.Link key={artist.id} className="" href={`${artist.link}`} target="_blank" >{artist.name}</Card.Link>
                        ))}
                        </Card.Text>);
            }
            else{
                return(<Card.Text>  <span style={{display: "inline"}}>Artist: </span>
                    <Card.Link href={data.collections[index].artists[0].link} target="_blank">
                        {data.collections[index].artists[0].name}
                    </Card.Link>
                    
                    
                </Card.Text>)
            }
        }
        return(<Card.Text>Artists:</Card.Text>)
    }

    return(
        <Popup latitude={lat} longitude={lng} offsetLeft = {40} offsetTop = {10} style ={{opacity: 0}}>
          
            <Card style={{ width: '13.5rem' }}>
                {data.collections.length > 1 ?
                    <Carousel activeIndex={activeIndex} onSelect={handleSelect} indicators={false} interval={null}> 
                
                        {data.collections.map(graf =>(
                            <Carousel.Item key={graf.id}>
                                    {loading && <Spinner animation="border" className="d-flex justify-content-center"></Spinner>}
                                    <Card.Img style={{display: loading ? "none" : "block"}} src={`/hd_images/${graf.filename}`} onLoad={()=> setLoading(false)}></Card.Img>
                            </Carousel.Item>
                            
                        ))}
                    </Carousel>:<> {loading && <Spinner animation="border" className="d-flex justify-content-center"></Spinner> }<Card.Img style={{display: loading ? "none" : "block"}}src={`/hd_images/${data.collections[index].filename}`} onLoad={()=> setLoading(false)}></Card.Img> </>}
                
            <Card.Body className="googlemap-button">
              
                {renderArtists()}
                        
            </Card.Body>
            <hr style={{height: "2px", margin:"0px"}}></hr>
            <Card.Body className="moreinfo-button d-flex justify-content-center">
                <Button className= "mr-auto p-2" variant="outline-success" href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}target='_blank'><i className="fa fa-map-marker" aria-hidden="true"></i> Location</Button>
                <Button variant="outline-info" onClick={()=>{launchInfoModal(); onMoreInfoClick(data.collectionid, activeIndex)}}>More Info</Button>
            </Card.Body>
            

            </Card>
       
        </Popup>
    )
    

}


export default GrafPopup;
    
