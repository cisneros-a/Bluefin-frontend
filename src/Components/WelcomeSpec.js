import React from 'react'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import { useDisclosure, Textarea, useToast } from "@chakra-ui/core";


export default function WelcomeSpec() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  

  





    return (
        <div className="HomeSpec">
          
   {/* <Box size="sm">
  <Image size="500px" src={`http://localhost:3000/${home.uploads}`} alt="Home" />
</Box> */}

            <h1>Thank you for checking out Bluefin!</h1>
            <h2> This was built to help those with multiple properties post their<br></br> homes for rent and to keep track off all their infomation in one space. </h2>
    <h2>Bedrooms: </h2>
    <h2>Sqft: </h2>

    <h2>Description: </h2>
    <h3>Being leased by: </h3>
</div>
   

    
   
      


    )
}