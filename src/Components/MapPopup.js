import React from 'react'
import { Box, Badge, Image } from "@chakra-ui/core";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
  } from "@chakra-ui/core";

// export default function MapPopup(props) {
//     return (
//         <div className="Popup">
            
//               <h2>{props.selectedHome.address.split(',')[0]}</h2>
//                             <p>Bedrooms: {props.selectedHome.bedrooms}</p>
//                             <p>Bathrooms: {props.selectedHome.bathrooms}</p>
//         </div>
//     )
// }

export default function MapPopup() {
    const property = {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
      beds: 3,
      baths: 2,
      title: "Modern home in city center in the heart of historic Los Angeles",
      formattedPrice: "$1,900.00",
      reviewCount: 34,
      rating: 4,
    };
  
    return (
      <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
        
  
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" variantColor="teal">
              New
            </Badge>
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
            {property.formattedPrice}
            <Box as="span" color="gray.600" fontSize="sm">
              / wk
            </Box>
          </Box>
  
          <Box d="flex" mt="2" alignItems="center">
           
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {property.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
