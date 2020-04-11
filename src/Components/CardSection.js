/**
* Use the CSS tab above to style your Element's container.
*/
import React from 'react';
import {CardElement} from 'react-stripe-elements';

const style = {
  base: {
    color: "#32325d",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#000",
    iconColor: "#000"
  }
};

const CardSection = () => {
  return (
    <label>
      Stripe API - Make secure no-hassle payments.
      <CardElement className="MyCardElement" style={style} />
    </label>
  );
};

export default CardSection;