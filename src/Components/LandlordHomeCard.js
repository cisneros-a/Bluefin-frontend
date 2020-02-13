import React from 'react';
import { useEffect, useState } from 'react'
import { Box, Image, Badge } from "@chakra-ui/core";
import {Popover, PopoverTrigger,  PopoverContent, PopoverHeader,  PopoverBody,  PopoverArrow,  PopoverCloseButton, useToast, useDisclosure } from "@chakra-ui/core";

import { Button } from "@chakra-ui/core";
import { useDispatch} from 'react-redux';
import { selectHome } from '../actions';




export default function LandlordHomeCard(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {currentHome, setCurrentHome} = useState([])

  const dispatch = useDispatch()

//   useEffect(() => {
//       fetch('http://localhost:3000/leases')
//       .then( res => res.json())
//       .then(data => { 
//           let currentLease = data.find(lease => lease.property_id === props.home.id)
//           setCurrentHome(currentLease)
//       })
//   }, [])

  const property = {
    imageUrl: `http://localhost:3000/${props.img}`,
    imageAlt: "Rear view of modern home with pool",
    beds: props.home.bedrooms,
    baths: props.home.bathrooms,
    title: props.home.address,
    formattedPrice: props.home.rent
  };


  let setSelectedHome= home => {
    console.log('clicked')
    let homeObj = {
      property : props.home,
      uploads: props.img
    }
    dispatch(selectHome(homeObj))
  }

//   const returnButton = () => {
//     <Button
//     onClick={onOpen}
//    variantColor="purple" variant="outline">
//     See more info!
//   </Button>
//   }
 
  console.log('homecard', props.img)

  return (


    <Box
    className="homeCard"
     boxShadow="lg"
      border="2px" 
      borderRadius="md" 
      borderColor="gray.200" 
      maxW="sm" 
      borderWidth="1px" 
      rounded="lg" 
      overflow="hidden">
        
      <Image width="100%" height="60%" src={property.imageUrl} alt={property.imageAlt} />

      <Box  p="6">
        <Box  d="flex" alignItems="baseline">
        
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
              
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {property.title}
        </Box>

        <Box>
          ${property.formattedPrice}
          <Box as="span" color="gray.600" fontSize="m">
            / month
          </Box>
          {/* <Button
            onClick={() => setSelectedHome(props.home)}
           variantColor="purple" variant="outline">
            See more info!
          </Button> */}
        </Box>
        
      </Box>


      {/* <Popover>
<PopoverTrigger>

</PopoverTrigger>
<PopoverContent zIndex={4}>
  <PopoverArrow />
  <PopoverCloseButton />
  <PopoverHeader>Renter {Request Sent!}</PopoverHeader>
  <PopoverBody>This feature is currently under construction.</PopoverBody>
</PopoverContent>
</Popover> */}
    </Box>
  );


}