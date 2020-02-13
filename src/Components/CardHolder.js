import React from 'react';
import HomeCard from "./HomeCard";
import LandlordHomeCard from "./LandlordHomeCard"
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
      // console.log(userType)
      // props.homes.state.map(home => console.log('populate homes', home))
        if (userType === 'tenant'){
            return props.homes.state.map(home=> <Grid className = "CardGrid"item xs={4}><HomeCard key={home.id} img={home.uploads} home={home.property}/> </Grid> )
          } else { console.log('cardholder', props)
            return props.homes.map(home=> <Grid className = "CardGrid" item xs={5}><LandlordHomeCard key={home.id} img={home.uploads} home={home.property}/></Grid> )
          }
    }
    

    return (
        <div className="scroll">
          <Grid className='cardDiv' container spacing={1}>
            {populateCards()}
            </Grid>
        </div>
    )
}


