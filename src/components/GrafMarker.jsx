import * as React from 'react';
import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card'
import {Marker, Popup} from 'react-map-gl';
import './GrafMarker.css'

const GrafMarker = (props) => {
    const[index, setIndex] = useState(0)
    const {grafCollection} = props
    const[data, setData] = useState(grafCollection[index])
    const[nextIndex, setNextIndex] = useState(grafCollection.length > 1 ? index + 1: 0)
    const[nextData, setNextData] = useState(grafCollection[nextIndex])
    const[url, setUrl] = useState('')
    const[showPopup, setShowPopup] = useState(false)

    const[hoverMarker, setHoverMarker] = useState(false)
    const[hoverPopup, setHoverPopup] = useState(false)

    // setData(grafCollection[index])
    // useEffect(() =>{
    //     const interval = setInterval(() =>{
    //         if(grafCollection !== null){
    //             setData(grafCollection[index])
    //             if(index < grafCollection.length)
    //                 setIndex(index + 1)
    //             else
    //                 setIndex(0)
    //         }

    //     }, 2000)
    //     return () => clearInterval(interval)
    // }, [])

    const onPopupClose = () =>{
        setHoverMarker(false)
        setShowPopup(false)
    }
    const onPopupOver = () =>{
        setShowPopup(true)
    }
    const onPopupLeave = () => {
        setShowPopup(false)
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
                
            }, 5000);
            return () => clearInterval(interval)
        }


    })


    return(
        <div onMouseOver={onPopupOver} onMouseLeave = {onPopupLeave}>
            {data !== null &&
              <div>
                <Marker key = {data.id} latitude = {data.lat} longitude = {data.lng} anchor = "bottom">
                    <button className = "grafImage" 
                    onClick={(e) => {
                            e.preventDefault();
                            window.open(`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`);
                            }     }        
                            >
                        <img className = "top" src = {`/images/${data.filename}`} />
                    </button>
                </Marker>
                <div className = "popup" >
                    {showPopup &&  
                        <Popup latitude = {data.lat} longitude = {data.lng} offsetLeft = {40} offsetTop = {20} onClose = {onPopupClose}>
                            <div>
                            <Card style={{ width: '14rem' }}>
                            <Card.Img variant="top" src={`/hd_images/${data.filename}`} className='cardImage'/>
                            <Card.Body>
                                <Card.Title>{data.title === null && <p>placeholder title</p>}</Card.Title>
                                <Card.Text>
                                    By {data.artist} artist
                                </Card.Text>
                      
                            </Card.Body>
                            </Card>
                            </div>
                        </Popup>
                    }
                </div>

             </div>
            }

        </div>

    )
}


export default GrafMarker;
