import React from 'react'
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {fetch_homes, toggleView} from '../actions';
import Grid from "@material-ui/core/Grid";
import Map from './Map'
import HomeSpec from './HomeSpecs'
import TenantAppTable from './TenantAppTable'
import { Switch } from "@chakra-ui/core";
import CardHolder from './CardHolder';
import TenantLease from './TenantLease';



export default function TenantDashboard() {
    const allHomes = useSelector((state) => state.homes)
    const selectedHome = useSelector(state => state.selectedHome)
    const dispatch = useDispatch() 
    const toggleState = useSelector(state => state.toggle)



    useEffect(() => {
        dispatch(fetch_homes())
      
    }, [])

    const showMap = (homes) => {
        if (homes.state) {
        if (homes.state.length > 0) {
            console.log(toggleState)
            if ( toggleState ){
              return   <CardHolder homes={homes} />
            } 
              return <Map/>
        } }
    }

    const showHomeSpecs = () => {
        if (selectedHome) {
            return <Grid item s={12}><HomeSpec/></Grid>
        }
    }


    return (
                <div>
                    {/* <TenantLease/> */}
                    <h3>Map</h3><Switch onChange={()=> dispatch(toggleView())} color="teal" size="lg"/><h3>Cards</h3>
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




  