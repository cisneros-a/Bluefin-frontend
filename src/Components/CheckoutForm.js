import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import { Button } from "@chakra-ui/core";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from "@chakra-ui/core";


import CardSection from './CardSection';

class CheckoutForm extends React.Component {
  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    console.log('clicked!')
return (
    <Alert status="success">
    <AlertIcon />
    Data uploaded to the server. Fire on!
  </Alert>
)

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

  render() {
    return (
        
      <form >
        <CardSection />
        <Button onClick={this.handleSubmit}leftIcon="arrow-right" variantColor="teal" variant="solid">
    Submit your payment
  </Button> 
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);