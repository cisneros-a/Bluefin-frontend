import React from 'react'
import {useSelector} from 'react-redux';


export default function MapFlag(props) {

    return (
        <div className="MapFlag">
            <h1>${props.rent}</h1>
        </div>
    )
}