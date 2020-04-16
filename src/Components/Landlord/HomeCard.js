import React from "react";
import { useEffect, useState } from "react";
import { Box, Image, Badge } from "@chakra-ui/core";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useToast,
  useDisclosure,
} from "@chakra-ui/core";

import { Button } from "@chakra-ui/core";
import { useDispatch } from "react-redux";
import { selectHome } from "../../actions";

export default function LandlordHomeCard({ img, propertyInfo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentHome, setCurrentHome } = useState([]);

  const dispatch = useDispatch();

  //   useEffect(() => {
  //       fetch('http://localhost:3000/leases')
  //       .then( res => res.json())
  //       .then(data => {
  //           let currentLease = data.find(lease => lease.property_id === props.home.id)
  //           setCurrentHome(currentLease)
  //       })
  //   }, [])

  const property = {
    imageUrl: `http://localhost:3000/${img}`,
    imageAlt: "Rear view of modern home with pool",
    beds: propertyInfo.bedrooms,
    baths: propertyInfo.bathrooms,
    title: propertyInfo.address,
    formattedPrice: propertyInfo.rent,
  };

  const displayButton = () => {
    if (propertyInfo.availability) {
      return (
        <Button
          onClick={() => {
            handleClick(false);
          }}
          variantColor="pink"
          variant="outline"
        >
          See more info!
        </Button>
      );
    }
    return (
      <Button
        onClick={() => {
          handleClick(true);
        }}
        variantColor="purple"
        variant="outline"
      >
        See lease info!
      </Button>
    );
  };

  const handleClick = (leased) => {};
  // let setSelectedHome = (home) => {
  //   console.log("clicked");
  //   let homeObj = {
  //     property: props.home,
  //     uploads: props.img,
  //   };
  //   dispatch(selectHome(homeObj));
  // };

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
      overflow="hidden"
    >
      <Image
        width="100%"
        height="60%"
        src={property.imageUrl}
        alt={property.imageAlt}
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
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
        </Box>
        {displayButton()}
      </Box>
    </Box>
  );
}
