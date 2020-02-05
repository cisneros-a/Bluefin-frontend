import React from 'react'
import LandlordNavbar from './LandlordNavbar'
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
// import {populate_homes} from '../actions';
import LandlordAppTable from './LandlordAppTable'
import CardHolder from './CardHolder';
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';





export default function LandlordDashboard() {
    // const allHomes = useSelector((state) => state.homes)
    // const selectedHome = useSelector(state => state.selectedHome)
    const userId = useSelector(state => state.user.user_id)
    // const dispatch = useDispatch() 
    // let leasedHomes = []
    // let unleasedHomes = []
    const [leasedHomes, setLeasedHomes] = useState([])
    const [unleasedHomes, setUnleasedHomes] = useState([])


    useEffect(() => {
        fetch('http://localhost:3000/properties')
        .then( res => res.json())
        .then(data => sortHomes(data))
    }, [])

    const sortHomes = data => {
        let landlordHomes = data.filter(home => home.user_id === userId)
        let availableHomes = landlordHomes.filter(home => home.availability)
        let unavailableHomes = landlordHomes.filter(home => home.availability === false)
        setLeasedHomes(unavailableHomes)
        setUnleasedHomes(availableHomes)
    }

    // const set_homes = (data) => {
    //     dispatch(populate_homes(data))
    // }

    const showCards = homes => {
      return  <CardHolder homes={homes} />     
        
    }

    return (
        <div>
            <div >
            <Grid container spacing={2}>
          <Grid item xs={5}>
            <Container>
              <Typography variant="h4" component="h3">
                <div className={'CardHolderName'}>Leased :</div>
              </Typography>
              {showCards(leasedHomes)}
              
            </Container>
          </Grid>

          <Grid item xs={5}>
            <Container>
              <Typography variant="h4" component="h3">
                <div className={'CardHolderName'}> Not Leased :</div>
              </Typography>
              {showCards(unleasedHomes)}
            </Container>
          </Grid>

         
        </Grid>
                </div>
                <Grid item xs={8}>
                <LandlordAppTable/>
                </Grid>
        </div>
    )
}
