import * as React from 'react';
import { useState, useEffect} from 'react';
import {Marker} from 'react-map-gl';

const GrafMarker = (props) => {
    const {id, filename, artist, title, lat, lng} = props
    return(
        <Marker key = {id} latitude = {lat} longitude = {lng}>
                <button className = "grafImage">
                    <img src = {`/images/${filename}`} />
                </button>
        </Marker>
    )
}


export default GrafMarker;
