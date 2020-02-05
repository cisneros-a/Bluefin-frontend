import React from 'react'
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {populate_homes, toggleView} from '../actions';
import Grid from "@material-ui/core/Grid";
import Map from './Map'
import HomeSpec from './HomeSpecs'
import TenantAppTable from './TenantAppTable'
// import ToggleSwitch from './ToggleSwitch'
import { Switch } from "@chakra-ui/core";
import CardHolder from './CardHolder';



export default function TenantDashboard() {
    const allHomes = useSelector((state) => state.homes)
    const selectedHome = useSelector(state => state.selectedHome)

    const dispatch = useDispatch() 
    const [toggle, setToggle] = useState("card")

    const toggleState = useSelector(state => state.toggle.state)



    useEffect(() => {
        // console.log("This is hitting useEffet")
        // setToggle(toggleState)
        fetch('http://localhost:3000/properties')
        .then( res => res.json())
        .then(data => set_homes(data))
        .then(setToggle(toggleState))
        
    //     .then(idk => {if (updated){
    // }
    //     console.log(toggle)})
    }, [])

    const set_homes = (data) => {
        dispatch(populate_homes(data))
    }

    const showMap = (homes) => {
        if (homes.state.length > 0) {
            if (toggleState === 'card'){
              return   <CardHolder homes={homes} />
            } 
              return <Map/>
        }
    }

    const showHomeSpecs = () => {
        if (selectedHome) {
            return <Grid item s={12}><HomeSpec/></Grid>
        }
    }

    const handleToggle = () => {
        dispatch(toggleView())
    }

  

    return (
                <div>
                    <h3>Map</h3><Switch onChange={()=> handleToggle()} color="teal" size="lg"/><h3>Cards</h3>
                <div >
                    <Grid  container spacing={2} >
                        <Grid  item s={6}>    
                            {showMap(allHomes)}      
                        </Grid>

                        <Grid item s={6}>
                            <Grid container>
                            {showHomeSpecs()}
                            </Grid>
                        </Grid>  
                    </Grid> 
                    <TenantAppTable/> 
                </div>
        </div>
          
            
    )
}




  