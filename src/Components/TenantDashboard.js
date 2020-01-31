import React from 'react'
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {populate_homes} from '../actions';
import Map from './Map'


export default function TenantDashboard() {
    const homes = useSelector((state) => state.homes)
    const dispatch = useDispatch() 


    useEffect(() => {
        fetch('http://localhost:3000/properties')
        .then( res => res.json())
        .then(data => set_homes(data))
    }, [])

    const set_homes = (data) => {
        dispatch(populate_homes(data))
    }

    const showMap = () => {
        console.log(homes.state.length)
        if (homes.state.length > 0) {
            return <Map/>
        }
    }

    // let showAddress = () => {
    //     return  homes.state.map(home => <Card address={home.address}/>)
    // }

    return (
        <div>
          {/* {showMap()} */}
            </div>
    )
}




  