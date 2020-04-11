import React from 'react';
import { useToast } from "@chakra-ui/core";

import {injectStripe} from 'react-stripe-elements';
import { Button } from "@chakra-ui/core";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from "@chakra-ui/core";


import CardSection from './CardSection';

function CheckoutForm() {
  let toast = useToast();

  let handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    toast({
      title: "Thank you for your payment!",
      description: "This will be posted in your history!",
      status: "success",
      duration: 2750,
      isClosable: true,
      position: 'top'
    })
    // See our confirmCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
    // this.props.stripe.confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
    //   payment_method: {
    //     card: this.props.elements.getElement('card'),
    //     billing_details: {
    //       name: 'Jenny Rosen',
    //     },
    //   }
    // });
  };

 
    return (
        
      <form >
        <CardSection />
        <Button onClick={(ev) => handleSubmit(ev)}leftIcon="arrow-right" variantColor="teal" variant="solid">
    Submit your payment
  </Button> 
      </form>
    );
  
}

export default injectStripe(CheckoutForm);