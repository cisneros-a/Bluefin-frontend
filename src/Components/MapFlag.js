import React from 'react'
import { Button } from "@chakra-ui/core";


export default function MapFlag(props) {

    return (
        <div>
            

<Button  leftIcon="info" variantColor="purple" variant="solid">
${props.rent}
        </Button>
        </div>
    )
}