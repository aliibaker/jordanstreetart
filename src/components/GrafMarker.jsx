import * as React from 'react';
import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import {Marker, Popup} from 'react-map-gl';
import './GrafMarker.css'

const GrafMarker = (props) => {
    const[index, setIndex] = useState(0);
    const {grafCollection, togglePopup} = props;
    const[data, setData] = useState(grafCollection[index]);
    const[nextIndex, setNextIndex] = useState(grafCollection.length > 1 ? index + 1: 0);
    const[showPopup, setShowPopup] = useState(togglePopup);
    const[filename, setFilename] = useState(data.filename);

    const[hoverMarker, setHoverMarker] = useState(false);


    const onPopupOver = () =>{
        setShowPopup(true)
    }
    const onPopupLeave = () => {
        setShowPopup(false)
    }

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setNextIndex(selectedIndex + 1);
        setFilename(grafCollection[selectedIndex].filename)
    }

    useEffect(() =>{
        if(!showPopup){
            const interval = setInterval(() =>{
                if(index < grafCollection.length - 1)
                    setIndex(index + 1)
                else
                    setIndex(0)
                if(nextIndex < grafCollection.length - 1)
                    setNextIndex(nextIndex + 1)
                else
                    setNextIndex(0)
                setData(grafCollection[index])
                
            }, 3000);
            return () => clearInterval(interval)
        }
    })
    return(
        <div onMouseOver={onPopupOver} onMouseLeave = {onPopupLeave}>
            {data !== null &&
              <div>
                <Marker key = {data.id} latitude = {data.lat} longitude = {data.lng} anchor = "bottom">
                    <button className = "grafImage" 
                    onClick={onPopupOver}>
                        <img className = "top" src = {`/images/${filename}`} alt ={`${filename}`}/>
                    </button>
                </Marker>
                <div className = "popup" >
                    {showPopup &&  
                        <Popup latitude = {data.lat} longitude = {data.lng} offsetLeft = {40} offsetTop = {20} >
                            {grafCollection.length > 1 ? 
                            <Carousel activeIndex = {index} onSelect={handleSelect} >
                            {grafCollection.map(graf => (
                                <Carousel.Item >
                                    <Card style={{ width: '14rem' }}>
                                        <Card.Img variant="top" src={`/hd_images/${graf.filename}`} className='cardImage'/>
                                        <Card.Body>
                                            <Card.Link href={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`}>
                                                View on Google Maps</Card.Link>
                                        </Card.Body>
                                        
                                    </Card>
                                </Carousel.Item>
                            ))}
                        </Carousel> : 
                        <Card style={{ width: '14rem' }}>
                            <Card.Img variant="top" src={`/hd_images/${filename}`} className='cardImage'/>  
                            <Card.Body>
                                <Card.Link href={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`}>
                                                View on Google Maps</Card.Link>
                            </Card.Body>
                        </Card>       
                        
                        }
                            

                        </Popup>
                    }
                </div>

             </div>
            }

        </div>

    )
}


export default GrafMarker;


// <button className = "grafImage" 
// onClick={(e) => {
//         e.preventDefault();
//         window.open(`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`);
//         }     }        
//         >
