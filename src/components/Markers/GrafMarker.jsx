import * as React from 'react';
import {useState, useEffect} from 'react';
import {Marker} from 'react-map-gl';
import GrafPopup from '../GrafPopup'

import './GrafMarker.css'




const GrafMarker = ({grafCollection, collectionId, collectionIndex, onClick, selected, updateData, onMoreInfoClick}) =>{
    const[index, setIndex] = useState(collectionIndex);
    const[data, setData] = useState(grafCollection[index]);

    const onCarouselClick = (newIndex) =>{
        setIndex(newIndex);
        updateData(collectionId, newIndex);
        setData(grafCollection[newIndex]);
    }

    const cycleImages = () => {
        if(index < grafCollection.length - 1){
            setIndex(index + 1)
            setData(grafCollection[index + 1])
        }
        else{
            setIndex(0)
            setData(grafCollection[0])
        }
        
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
                        onClick={(e)=>{onClick(collectionId, index); e.preventDefault();}}
                        alt={`/images/${data.filename}`}
                    ></img>
                </Marker>
                
            
            }
            {selected === true ? 
            <GrafPopup
                data={grafCollection} 
                index={index} 
                onCarouselClick={onCarouselClick}
                onMoreInfoClick={onMoreInfoClick}
                >

            </GrafPopup>:null}
        </div>
    )
}

export default GrafMarker;
