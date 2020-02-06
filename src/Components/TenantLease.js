import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Stat, StatLabel, StatNumber, StatGroup, Box, Button } from "@chakra-ui/core";
import { fetchTenantLease } from '../actions';
import {Accordion, AccordionItem, AccordionHeader, AccordionPanel, AccordionIcon } from "@chakra-ui/core";

export default function TenantLease() {
    const userId = useSelector(state => state.user.user_id)
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
        {displayStats(tenantLease)}
        <br></br>
        <br></br>
        <br></br>

        <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <AccordionHeader>
      <Box flex="1" textAlign="left">
        Make A Payment
      </Box>
      <AccordionIcon />
    </AccordionHeader>
    <AccordionPanel pb={4}>
    <Button leftIcon="arrow-right" variantColor="teal" variant="solid">
    Submit your payment
  </Button> Make payments here! Stripe will securely send your payments!
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <AccordionHeader>
      <Box flex="1" textAlign="left">
        Request a Fix
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
      <Box flex="1" textAlign="left">
        View Your Lease
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


        </div>
    )
}
