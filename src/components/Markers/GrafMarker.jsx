import * as React from 'react';
import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import {Marker, Popup, FlyToInterpolator} from 'react-map-gl';

import './GrafMarker.css'
import {LazyLoadImage} from 'react-lazy-load-image-component'

const Image = React.memo(function Image({ src, onClick }){
    return <LazyLoadImage
     src={src}
     className="grafImage"
     onClick={onClick}>
        </LazyLoadImage>;
});


const GrafMarker = ({grafCollection, collectionId, onClick, onGrafDataChange, selected, currentIndex}) =>{
    let ind = 0
    if(currentIndex !== null){
        ind = currentIndex
    }
    const[index, setIndex] = useState(ind)
    const[data, setData] = useState(grafCollection[ind])

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
             
                
            }, 3000)
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
                    <Image 
                        src={`/images/${data.filename}`} 
                        onClick={(e) => {
                            onClick();
                            e.preventDefault();
                            onGrafDataChange(collectionId, ind);
                            console.log(collectionId, ind)
                            }}></Image>
                </Marker>
                
            
            }
        </div>
    )
}

export default GrafMarker;
