import React from 'react'
import {useSelector} from 'react-redux'

export default function HomeSpecs() {

    const home = useSelector(state => state.selectedHome.state)

    return (
        <div className={"homeSpec"}>
            <h1>{home.address}</h1>
        </div>
    )
}
