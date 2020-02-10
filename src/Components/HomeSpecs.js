import React from 'react'
import { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { Button, ButtonGroup } from "@chakra-ui/core";
import { useDisclosure, Textarea, useToast } from "@chakra-ui/core";
import { FormControl, FormLabel, Box } from "@chakra-ui/core";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Image
} from "@chakra-ui/core";

export default function HomeSpecs() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const home = useSelector(state => state.selectedHome.state)
  const userId = useSelector(state => state.user.user_id)
  const [button, setButton] = useState(true)

 

  const handleClick = async () => {
    toast({
      title: "Thank you for submitting an application!",
      description: "You should recieve a response soon!",
      status: "success",
      duration: 2500,
      isClosable: true,
      position: 'top'
    })
    const application = {
      tenant_id: userId,
      landlord_id: home.property.user.id,
      property_id: home.property.id
    }

    const res = await fetch("http://localhost:3000/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ application })
    })

    const data = await res.json()
    if (data.message) {
      console.log('Maybe this failed')
    } else {
      console.log('Maybe this passed')
      setButton(!button)
    }     
  };



    return (
        <div className="HomeSpec">
          <div className="SpecImage">
   <Box size="sm">
  <Image size="400px" src={`http://localhost:3000/${home.uploads}`} alt="Home" />
</Box>
</div>
            
            <h1>{home.property.address}</h1>
            <h2>Rent: ${home.property.rent} </h2>
    <h2>Bedrooms: {home.property.bedrooms} Bathrooms: {home.property.bathrooms}</h2>
    <h2>Sqft: {home.property.sqft} </h2>

    <h2>Description: {home.property.description}</h2>
    <h3>Being leased by: {home.property.user.name}</h3>

    <ButtonGroup spacing={4}>
      <Button onClick={onOpen} leftIcon="edit" variantColor="teal" variant="solid">
        Apply now!
      </Button>
      <Button rightIcon="email" variantColor="teal" variant="outline">
        Email us!
      </Button>
    </ButtonGroup>

    
    <Modal  onClose={onClose}isOpen={isOpen} size="lg" onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
    <ModalHeader>Apply for {home.property.address.split(',')[0]}</ModalHeader>
      <ModalBody pb={6}>
    
      <FormControl className="modal">
              <FormLabel>Content: </FormLabel>
              <Textarea placeholder="Feel free to suggest a rent amout, why you might be a good fit, if you have pets, etc.." />
            </FormControl>

            
     
      </ModalBody>

      <ModalFooter>
      {button ? (
        <Button onClick={() => handleClick()} leftIcon="edit" variantColor="teal" variant="solid">
          Apply now!
        </Button>
        ) : ( 
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
           )}
       
      </ModalFooter>
    </ModalContent>
    </Modal>

    
   
        </div>


    )
}


