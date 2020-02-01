import React, { Fragment } from 'react'
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {populate_homes, toggleView} from '../actions';
import Grid from "@material-ui/core/Grid";
import Map from './Map'
import HomeCard from './HomeCard'
import HomeSpec from './HomeSpecs'
import TenantNavbar from './TenantNavbar'
import ToggleSwitch from './ToggleSwitch'
import { Switch } from "@chakra-ui/core";



export default function TenantDashboard() {
    const homes = useSelector((state) => state.homes)
    const selectedHome = useSelector(state => state.selectedHome)
    // const toggle = useSelector(state => state.toggle)
    const dispatch = useDispatch() 

    const [toggle, setToggle] = useState(false)


    useEffect(() => {
        console.log('Mounting')
        fetch('http://localhost:3000/properties')
        .then( res => res.json())
        .then(data => set_homes(data))
    }, [])

    const set_homes = (data) => {
        dispatch(populate_homes(data))
    }

    const showMap = () => {
        console.log(toggle)
        if (homes.state.length > 0) {
            if (toggle){
                return homes.state.map(home=>  <HomeCard key={home.id} home={home}/> )
            } 
                return <Map/>
        }
    }

    const showHomeSpecs = () => {
        if (selectedHome) {
            return <HomeSpec/>
        }
    }

    const handleToggle = () => {
        dispatch(toggleView())
    }

    // let showAddress = () => {
    //     return  homes.state.map(home => <Card address={home.address}/>)
    // }

    return (
        
        <div>
            <TenantNavbar/>
            <Fragment>
                            {/* <h3>Map</h3><Switch onClick={()=> setToggle(!toggle)} color="teal" size="lg"/><h3>Cards</h3> */}
                        </Fragment>
                <div >
                    <Grid  container spacing={2} >
                        <Grid className="scroll" item xs={7}> 
                              
                            {showMap()}      
                        </Grid>
                        <Grid item xs={5}>
                            {showHomeSpecs()}
                        </Grid>  
                    </Grid>
                        
                </div>
       

          
            </div>
          
            
    )
}




  