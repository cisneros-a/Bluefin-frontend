import React from 'react';
import HomeCard from "./HomeCard";
import { useSelector } from 'react-redux';
import Grid from "@material-ui/core/Grid";



export default function CardHolder(props) {

  const userType = useSelector(state => state.user.userType)

//      <Grid  container spacing={2} >
// <Grid  item s={7}>    
//     {showMap(allHomes)}      
// </Grid>

// <Grid item s={5}>
//     {showHomeSpecs()}
// </Grid>  
// </Grid>   

    let populateCards = () => {
        if (userType === 'tenant'){
            return props.homes.state.map(home=> <Grid className = "CardGrid"item xs={6}><HomeCard key={home.id} img={home.uploads} home={home.property}/> </Grid> )
          } else {
            return props.homes.map(home=> <Grid className = "CardGrid" item xs={4}><HomeCard key={home.id} home={home}/></Grid> )
          }
    }
    

    return (
        <div className="scroll">
          <Grid container spacing={1}>
            {populateCards()}
            </Grid>
        </div>
    )
}


