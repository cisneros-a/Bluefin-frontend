import React from 'react'
import LandlordNavbar from './LandlordNavbar'
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {fetch_homes} from '../actions';
import LandlordAppTable from './LandlordAppTable'
import CardHolder from './CardHolder';
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import HomeForm from './HomeForm'
import Lnavbar from './Lnavbar'







export default function LandlordDashboard() {
    const allHomes = useSelector((state) => state.homes)
    // const selectedHome = useSelector(state => state.selectedHome)
    const userId = parseInt(localStorage.userId)
    const dispatch = useDispatch() 
    // let leasedHomes = []
    // let unleasedHomes = []
    const [leasedHomes, setLeasedHomes] = useState([])
    const [unleasedHomes, setUnleasedHomes] = useState([])


    useEffect(() => {
      console.log('useEffect')
      console.log(localStorage.userType)
      console.log('userId', userId)
      // dispatch(fetch_homes())
      // sortHomes(allHomes)
        fetch('http://localhost:3000/properties')
        .then( res => res.json())
        .then(data => sortHomes(data))
    }, [])

    const sortHomes = data => {
        let landlordHomes = data.filter(home => home.property.user_id === userId)
        if (landlordHomes) {
        let availableHomes = landlordHomes.filter(home => home.property.availability)
        // let onlyAvailableHomes = []
        // for (let i = 0; i < availableHomes.length; i++) {
        //   onlyAvailableHomes.push(availableHomes[i].property)
        // }
        let unavailableHomes = landlordHomes.filter(home => home.property.availability === false)
        // let onlyUnavailableHomes = []
        // for (let i = 0; i < unavailableHomes.length; i++) {
        //   onlyUnavailableHomes.push(unavailableHomes[i].property)
        // }
        // console.log('sorthomes unavailable', o)
        setLeasedHomes(unavailableHomes)
        setUnleasedHomes(availableHomes)
        }
    }

    // const set_homes = (data) => {
    //     dispatch(populate_homes(data))
    // }

    const showCards = homes => {
      // console.log('show cards', homes)
      return  <CardHolder homes={homes} />     
        
    }




    return (
        <div>
        <div className='header'>
          <Lnavbar />
        </div>
           
       
            <Grid container spacing={2}>
          <Grid className='leftContainer' item xs={6}>
          
              <Typography variant="h4" component="h3">
                <div className={'CardHolderName'}>Leased :</div>
              </Typography>
              <div className='leasedHomes'>
              {showCards(leasedHomes)}
              </div>
      
          </Grid>

          <Grid item xs={6}>
          
              <Typography variant="h4" component="h3">
                <div className={'CardHolderName'}> Not Leased :</div>
              </Typography>
              {showCards(unleasedHomes)}
           
          </Grid>

         
        </Grid>
                
                
        </div>
    )
}
