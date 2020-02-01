import React from 'react'
import {useSelector} from 'react-redux'
import { Button, ButtonGroup } from "@chakra-ui/core";

export default function HomeSpecs() {

    const home = useSelector(state => state.selectedHome.state)

    return (
        <div className={"HomeSpec"}>
            
            <h1>{home.address}</h1>
            <h2>Rent: ${home.rent} </h2>
    <h2>Bedrooms: {home.bedrooms} Bathrooms: {home.bathrooms}</h2>
    <h2>Description: {home.description}</h2>
    <ButtonGroup spacing={4}>
  <Button leftIcon="edit" variantColor="teal" variant="solid">
    Apply now!
  </Button>
  <Button rightIcon="email" variantColor="teal" variant="outline">
    Email us!
  </Button>
</ButtonGroup>
        </div>
    )
}


