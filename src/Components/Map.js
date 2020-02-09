import React, {useState, useEffect} from 'react'
import {useSelector, } from 'react-redux';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import MapFlag from './MapFlag'
import MapPopup from './MapPopup'
import { useDispatch} from 'react-redux';
import { selectHome } from '../actions';

export default function Map() {
    const dispatch = useDispatch()
    const [viewport, setViewport] = useState({
        latitude: 30.2672,
        longitude: -97.7431,
        width: "45vw",
        height: "80vh",
        zoom: 12
      });

    const homes = useSelector((state) => state.homes)

    const REACT_APP_MAPBOX_TOKEN = "pk.eyJ1IjoiY2lzbmVyb3MtYSIsImEiOiJjazV5OWhjbG4yZWdmM2VuMWw4N3A1bjV2In0.Qr08RacxUb-4_etwtaK1Sg"
    const [selectedHome, setSelectedHome] = useState(null)

    const handleClick = (e, home) => {
        e.preventDefault()
        setSelectedHome(home)
        dispatch(selectHome(home))

    }

    useEffect(()=> {
        const listener = e =>{
            if (e.key === "Escape"){
                setSelectedHome(null);
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
            mapStyle='mapbox://styles/cisneros-a/ck62slkcs02ij1imqgdp6j6il'
            onViewportChange={viewport => {
                setViewport(viewport);
            }}
            >
                
                {homes.state.map((home) => (
                <Marker
                 key={home.id}
                 latitude={home.latitude}
                 longitude={home.longitude}
                 >
                   <button
                    onClick={event => handleClick(event, home)}
                    className="marker-btn">
                       <MapFlag rent={home.rent}/>
                   </button>
                </Marker>

                ))}

                {selectedHome ? (
                    <div className="Popup">
                    <Popup
                    onClose={() => setSelectedHome(null)}
                    latitude={selectedHome.latitude}
                    longitude={selectedHome.longitude}
                    >
                         <MapPopup selectedHome={selectedHome}/> 
                    </Popup>
                        </div>
                ) : null}
            </ReactMapGL>
        </div>
    )
}