import React from 'react'
import { useState } from 'react'
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
  ModalCloseButton,
  Image
} from "@chakra-ui/core";

export default function HomeSpecs() {
  let photo ='/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2…2a493d3e508146c08205b9287e608a5ae797eb5b/IMG3.png'
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const allHomes = useSelector((state) => state.homes.state)
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
      landlord_id: home.user.id,
      property_id: home.id
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

  const getPicture = () => {
    fetch(`http://localhost:3000/properties/${home.id}`, {
              method: "GET",
              headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json'
              }
          })
          .then(res => res.json())
          .then(data => {
            console.log(data.uploads)
            return <img src='/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2…2a493d3e508146c08205b9287e608a5ae797eb5b/IMG3.png' alt='home'></img>
          })

    // const res = await fetch(`http://localhost:3000/properties/${home.id}`, {
    //           method: "GET",
    //           headers: {
    //               'Content-Type': 'application/json',
    //               Accept: 'application/json'
    //           }
    //       })
    // const data = await res.json()
    // console.log(data.uploads)
  //  return <img src={data.uploads} alt='home'></img>
  }

    return (
        <div className="HomeSpec">
   <Box size="sm">
  <Image size="400px" src="http://localhost:3000/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZmM9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c03ceae6fa4f46ab1cc8eb33b79b52fbeff7e85b/IMG1.png" alt="Home" />
</Box>
            
            <h1>{home.address}</h1>
            <h2>Rent: ${home.rent} </h2>
    <h2>Bedrooms: {home.bedrooms} Bathrooms: {home.bathrooms}</h2>
    <h2>Sqft: {home.sqft} </h2>

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


