import React from "react";
import { useDispatch } from "react-redux";
import { Box, Image, Button } from "@chakra-ui/core";
import { selectLandlordProperty } from "../../actions";
import history from "../../history";

export default function LandlordHomeCard({ img, propertyInfo }) {
  const dispatch = useDispatch();

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
            handleClick(propertyInfo);
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
          handleClick(propertyInfo);
        }}
        variantColor="purple"
        variant="outline"
      >
        See lease info!
      </Button>
    );
  };

  const handleClick = (property) => {
    dispatch(selectLandlordProperty(propertyInfo));
    history.push(`/my-properties/${property.id}`);
  };

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
        height="100%"
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
