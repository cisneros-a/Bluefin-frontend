import React from 'react'
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {populate_homes, toggleView} from '../actions';
import Grid from "@material-ui/core/Grid";
import Map from './Map'
import HomeSpec from './HomeSpecs'
import TenantNavbar from './TenantNavbar'
// import ToggleSwitch from './ToggleSwitch'
// import { Switch } from "@chakra-ui/core";
import CardHolder from './CardHolder';



export default function TenantDashboard() {
    const allHomes = useSelector((state) => state.homes)
    const selectedHome = useSelector(state => state.selectedHome)
    const dispatch = useDispatch() 
    const [toggle, setToggle] = useState(true)

    // const toggle = useSelector(state => state.toggle)



    useEffect(() => {
        fetch('http://localhost:3000/properties')
        .then( res => res.json())
        .then(data => set_homes(data))
    }, [])

    const set_homes = (data) => {
        dispatch(populate_homes(data))
    }

    const showMap = (homes) => {
        if (homes.state.length > 0) {
            if (toggle){
              return   <CardHolder homes={homes} />
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

  

    return (
        <div>
            <TenantNavbar/>
                        {/* <h3>Map</h3><Switch onClick={()=> setToggle(!toggle)} color="teal" size="lg"/><h3>Cards</h3> */}
                <div >
                    <Grid  container spacing={2} >
                        <Grid  item xs={7}>    
                            {showMap(allHomes)}      
                        </Grid>

                        <Grid item xs={5}>
                            {showHomeSpecs()}
                        </Grid>  
                    </Grid>  
                </div>
        </div>
          
            
    )
}




  