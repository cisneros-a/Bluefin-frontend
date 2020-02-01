import React from 'react'
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {populate_homes} from '../actions';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ToggleSwitch from './ToggleSwitch'
import Map from './Map'
import TestCard from './TestCard'
import HomeSpec from './HomeSpecs'
import { Modal, ModalBody, ModalContent } from "@chakra-ui/core";



export default function TenantDashboard() {
    const homes = useSelector((state) => state.homes)
    const selectedHome = useSelector(state => state.selectedHome)

    const dispatch = useDispatch() 
    const [toggle, setToggle] = useState(true)


    useEffect(() => {
        fetch('http://localhost:3000/properties')
        .then( res => res.json())
        .then(data => set_homes(data))
    }, [])

    const set_homes = (data) => {
        dispatch(populate_homes(data))
    }

    const showMapOrCards = () => {
        console.log(selectedHome)
        if (homes.state.length > 0) {
            if (toggle){
                return homes.state.map(home=>  <TestCard key={home.id} home={home}/> )
            } 
                return <Map/>
        }
    }

    const showHomeSpecs = () => {
        if (selectedHome) {
            return <HomeSpec/>
        }
    }

    const handleToggle = (button) => {
        console.log(button)
        if (button === "Card"){
            // setToggle(true)
            console.log("card")
        } else if (button === "Map"){
            // setToggle(false)
            console.log("map");
            
        }
    }

    // let showAddress = () => {
    //     return  homes.state.map(home => <Card address={home.address}/>)
    // }

    return (
        
        <div>
            {/* <ToggleSwitch  handleToggle={() => handleToggle()}>Toggle!!</ToggleSwitch> */}
                <div >
                    <Grid  container spacing={2} >
                        <Grid className="scroll" item xs={6}>       
                            {showMapOrCards()}      
                        </Grid>
                        <Grid item xs={6}>
                            {showHomeSpecs()}
                        </Grid>  
                    </Grid>
                        
                </div>
       

          
            </div>
          
            
    )
}




  