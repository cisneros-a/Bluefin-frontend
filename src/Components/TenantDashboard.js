import React from 'react'
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {fetch_homes, toggleView} from '../actions';
import Grid from "@material-ui/core/Grid";
import Map from './Map'
import HomeSpec from './HomeSpecs'
import WelcomeSpec from './WelcomeSpec'
import Tnavbar from './Tnavbar'
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
            // console.log('homes.state.length is greater than 0')   
            // console.log(homes.state)       
            let onlyHomes = []
            homes.state.forEach(home => onlyHomes.push(home.property))
            if ( toggleState ){
              return   <CardHolder homes={homes} />
            } 
              return <Map homes={homes.state}/>
        }
     }
    }

    const showHomeSpecs = () => {
        if (selectedHome) {
            return <HomeSpec/>
        } 
        // else{
        //     return <WelcomeSpec/>
        // }
    }


    return (
       
                <div className='header'>
                     <Tnavbar/>
                <div/>
                <div className='toggle'>
                    <h3>Map</h3><Switch onChange={()=> dispatch(toggleView())} color="teal" size="lg"/><h3>Cards</h3>
                    </div>
                <div >
                    <Grid  container spacing={6} >
                        <Grid  item s={7}>    
                            {showMap(allHomes)}      
                        </Grid>

                        <Grid item s={5}>
                            {showHomeSpecs()}   
                        </Grid>  
                    </Grid> 
                 </div>
         </div>
          
            
    )
}




  