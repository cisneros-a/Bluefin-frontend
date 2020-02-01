import React from 'react'

export default function MapPopup(props) {
    return (
        <div className="Popup">
              <h2>{props.selectedHome.address.split(',')[0]}</h2>
                            <p>Bedrooms: {props.selectedHome.bedrooms}</p>
                            <p>Bathrooms: {props.selectedHome.bathrooms}</p>
        </div>
    )
}
