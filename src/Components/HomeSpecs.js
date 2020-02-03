import React from 'react'
import {useSelector} from 'react-redux'
import { Button, ButtonGroup } from "@chakra-ui/core";
import { useDisclosure, Textarea, useToast } from "@chakra-ui/core";
import { FormControl, FormLabel } from "@chakra-ui/core";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/core";

export default function HomeSpecs() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const home = useSelector(state => state.selectedHome.state)
  const userId = useSelector(state => state.user.user_id)

  const handleClick = async () => {
    const application = {
      tenant_id: userId,
      landlord_id: home.user.id,
      property_id: home.id
    }

    fetch("http://localhost:3000/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ application })
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  //   const resp = await fetch("http://localhost:3000/applications", {
  //     method: "POST",
  //     headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //     },
  //     body: JSON.stringify({ tenant_id: userId,
  //       landlord_id: home.user.id,
  //       property_id: home.id })
  // })
  // const data = await resp.json()
  //   console.log(data)
    
 

    return (
        <div className="HomeSpec">
            
            <h1>{home.address}</h1>
            <h2>Rent: ${home.rent} </h2>
    <h2>Bedrooms: {home.bedrooms} Bathrooms: {home.bathrooms}</h2>
    <h2>Description: {home.description}</h2>
    <h3>Being leased by: {home.user.name}</h3>

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
    <ModalHeader>Apply for {home.address.split(',')[0]}</ModalHeader>
      {/* <ModalCloseButton /> */}
      <ModalBody pb={6}>
    
      <FormControl className="modal">
              <FormLabel>Content: </FormLabel>
              <Textarea placeholder="Feel free to suggest a rent amout, why you might be a good fit, if you have pets, etc.." />
            </FormControl>

            
     
      </ModalBody>

      <ModalFooter>
        <Button variantColor="teal" mr={3} onClick={() => handleClick()}  >
          Submit!
        </Button>
        <Button variant="ghost">Cancel</Button>
      </ModalFooter>
    </ModalContent>
    </Modal>

    
   
        </div>


    )
}


