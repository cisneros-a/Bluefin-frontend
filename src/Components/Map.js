import React, {useState, useEffect} from 'react'

import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkData from "../data/skateboard-parks.json";

export default function Map() {
    const REACT_APP_MAPBOX_TOKEN = "pk.eyJ1IjoiY2lzbmVyb3MtYSIsImEiOiJjazV5OWhjbG4yZWdmM2VuMWw4N3A1bjV2In0.Qr08RacxUb-4_etwtaK1Sg"
    const [viewport, setViewport] = useState({
        latitude: 30.2672,
        longitude: -97.7431,
        width: "45vw",
        height: "80vh",
        zoom: 12
      });

    const [selectedPark, setSelectedPark] = useState(null)

    const handleClick = (e, park) => {
        e.preventDefault()
        setSelectedPark(park)

    }

    useEffect(()=> {
        const listener = e =>{
            if (e.key === "Escape"){
                setSelectedPark(null);
            }
        };
        window.addEventListener("keydown", listener)

        return () => {
            window.removeEventListener("keydown", listener)
        }
    }, [])


    return (
        <div>
            <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
            mapStyle='mapbox://styles/cisneros-a/ck5yaamb9a6qq1ijye427p2l3'
            onViewportChange={viewport => {
                setViewport(viewport);
            }}
            >
                
                {parkData.features.map((park) => (
                <Marker
                 key={park.properties.PARK_ID}
                 latitude={park.geometry.coordinates[1]}
                 longitude={park.geometry.coordinates[0]}
                 >
                   <button
                    onClick={event => handleClick(event, park)}
                    className="marker-btn">
                       <img src='./skateboarding.svg' alt="Skate Icon"/>
                   </button>
                </Marker>

                ))}

                {selectedPark ? (
                    <Popup
                    onClose={() => setSelectedPark(null)}
                    latitude={selectedPark.geometry.coordinates[1]}
                    longitude={selectedPark.geometry.coordinates[0]}
                    >
                        <div>
                            <h2>{selectedPark.properties.NAME}</h2>
                            <p>{selectedPark.properties.DESCRIPTIO}</p>
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </div>
    )
}