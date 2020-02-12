import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Stat, StatLabel, StatNumber, StatGroup, Box, Button } from "@chakra-ui/core";
import { fetchTenantLease } from '../actions';
import {Accordion, AccordionItem, AccordionHeader, AccordionPanel, AccordionIcon } from "@chakra-ui/core";
import Tnavbar from './Tnavbar'
import MyStoreCheckout from './MyStoreCheckout';

import CheckoutForm from './CheckoutForm'
import Grid from "@material-ui/core/Grid";



export default function TenantLease() {
  const userId = parseInt(localStorage.userId)
    const tenantLease = useSelector(state => state.tenantLease.state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTenantLease(userId))
        }, [])

    const displayStats = (lease) => {
        if (tenantLease){
            const date = lease.created_at.split("-")
      let year = date[0]
      let newYear = parseInt(year) + 1
      let month = date[1]
      let day = date[2].split("")
      day.splice(2)
      let newDate = day.join('')
      const startDate = `${month}/${newDate}/${year}`
      const endDate = `${month}/${newDate}/${newYear}`

        return (
       
            <StatGroup>
            <Stat>
              <StatLabel>Lease Start Date: </StatLabel>
              <StatNumber>{startDate}</StatNumber>
              
            </Stat>
          
            <Stat>
              <StatLabel>Leased End Date: </StatLabel>
              <StatNumber>{endDate}</StatNumber>
             
            </Stat>
            <Stat>
              <StatLabel>Landlord : </StatLabel>
              <StatNumber>{lease.landlord.name}</StatNumber>
             
            </Stat>
          </StatGroup> 
        )
        }
    }



    return (
      <div>
        <div className='header'>
      <Tnavbar/>
      </div>
      <div class='leaseStat'>
        {displayStats(tenantLease)}
        </div>
        <br></br>
        <br></br>

<Grid container spacing={2}>
  <Grid sm={6}>
        <Accordion defaultIndex={[0]} allowMultiple>
    <AccordionItem>
    <AccordionHeader>
      <Box flex="1" textAlign="center">
       <h2> Make A Payment </h2>
      </Box>
      <AccordionIcon />
    </AccordionHeader>
    <AccordionPanel pb={4}>
    <Box flex="5" contentAlign="center">

    <div className='checkoutForm'>
    <MyStoreCheckout/>

        {/* <CheckoutForm/> */}
        </div>
      </Box>
   
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <AccordionHeader>
      <Box flex="1" textAlign="center">
       <h2> Request a Fix</h2>
      </Box>
      <AccordionIcon />
    </AccordionHeader>
    <AccordionPanel pb={4}>
    <Button leftIcon='edit' variantColor="pink" variant="solid">
    Request
  </Button> Fill out this form. Attach photos and relevant information. An official record.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <AccordionHeader>
      <Box flex="1" textAlign="center">
        <h2>View Your Lease</h2>
      </Box>
      <AccordionIcon />
    </AccordionHeader>
    <AccordionPanel pb={4}>
    <Button leftIcon='download' variantColor="purple" variant="solid">
    Download your lease
  </Button> Just incase you need to reference anything!
    </AccordionPanel>
  </AccordionItem>
</Accordion>
</Grid>
</Grid>


        </div>
    )
}
