import * as React from 'react';
import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import {Marker, Popup, FlyToInterpolator} from 'react-map-gl';

import './GrafMarker.css'




const GrafMarker = ({grafCollection, collectionId, onClick, onGrafDataChange, selected, currentIndex}) =>{


    const[index, setIndex] = useState(0)
    const[data, setData] = useState(grafCollection[index])

    const cycleImages = () => {
        if(index < grafCollection.length - 1){
            setIndex(index + 1)
        }
        else{
            setIndex(0)
        }
        setData(grafCollection[index])
    }

    //cycling through the images every 4 seconds in case there are more than one image
    useEffect(()=>{
        if(!selected){
            const interval = setInterval(() =>{
             
                cycleImages()
             
                
            }, 4000)
            return () =>{ 
                clearInterval(interval);
                
            }
        }

        setData(grafCollection[currentIndex])
        


    })

    return(
        <div>
            {data &&
                <Marker 
                    key={collectionId} 
                    latitude={data.lat} 
                    longitude={data.lng} 
                    anchor="bottom"
                    >
                    <img 
                        className="grafImage" 
                        src={`/images/${data.filename}`} 
                        onClick={() => {
                            onClick()
                            onGrafDataChange(collectionId, index)
                            }}></img>
                </Marker>
                
            
            }
        </div>
    )
}




// const GrafMarker = (props) => {
//     const[index, setIndex] = useState(0);
//     const {grafCollection, togglePopup} = props;
//     const[data, setData] = useState(grafCollection[index]);
//     const[nextIndex, setNextIndex] = useState(grafCollection.length > 1 ? index + 1: 0);
//     const[showPopup, setShowPopup] = useState(togglePopup);
//     const[filename, setFilename] = useState(data.filename);

//     const[hoverMarker, setHoverMarker] = useState(false);


//     const onPopupOver = () =>{
//         setShowPopup(true)
//     }
//     const onPopupLeave = () => {
//         setShowPopup(false)
//     }

//     const cycleImages = () => {
//         if(index < grafCollection.length - 1)
//             setIndex(index + 1)
//         else
//             setIndex(0)
//         if(nextIndex < grafCollection.length - 1)
//             setNextIndex(nextIndex + 1)
//         else
//             setNextIndex(0)
//         setData(grafCollection[index])
//         setFilename(grafCollection[index].filename)
//     }

//     const handleSelect = (selectedIndex, e) => {
//         //TODO: Fix bug with carousel and images marker 
//         cycleImages()
//     }

//     useEffect(() =>{
//         if(!showPopup){
//             const interval = setInterval(() =>{
//                 cycleImages()
//             }, 3000);
//             return () => clearInterval(interval)
//         }

//     })
    
//     return(
//         <div onMouseOver={onPopupOver} onMouseLeave={onPopupLeave}>
//             {data !== null &&
//               <div>
//                 <Marker key = {data.id} latitude = {data.lat} longitude = {data.lng} anchor = "bottom">
//                     <button className = "grafImage" 
//                     onClick={() => {
//                         props.onClick()
//                         onPopupOver()
                        
//                         }}>
//                         <img className = "top" src = {`/images/${filename}`} alt ={`${filename}`}/>
//                     </button>
//                 </Marker>
//                 <div className = "popup" >
//                     {showPopup &&  
//                         <Popup latitude = {data.lat} longitude = {data.lng} offsetLeft = {40} offsetTop = {10} style ={{opacity: 0}}>
//                             {grafCollection.length > 1 ? 
//                             <Carousel activeIndex = {index} onSelect={handleSelect} indicators ={false} >
//                             {grafCollection.map(graf => (
//                                 <Carousel.Item key ={graf.id}>
//                                     <Card style={{ width: '14rem' }}>
//                                         <Card.Img variant="top" src={`/hd_images/${graf.filename}`} className='cardImage'/>
//                                         <Card.Body>
//                                             <Card.Link href={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`}target='_blank'>
//                                                 View on Google Maps</Card.Link>
//                                         </Card.Body>
                                        
//                                     </Card>
//                                 </Carousel.Item>
//                             ))}
//                         </Carousel> : 
//                         <Card style={{ width: '14rem' }}>
//                             <Card.Img variant="top" src={`/hd_images/${filename}`} className='cardImage'/>  
//                             <Card.Body>
                                
//                                 <Card.Link href={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`} target='_blank'>
//                                                 View on Google Maps</Card.Link>
//                             </Card.Body>
//                         </Card>       
                        
//                         }
                            

//                         </Popup>
//                     }
//                 </div>

//              </div>
//             }

//         </div>

//     )
// }


export default GrafMarker;
