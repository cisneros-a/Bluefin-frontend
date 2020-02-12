import React from 'react';
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckoutForm';

class MyStoreCheckout extends React.Component {
  render() {
    return (
        <div className='checkoutForm'>
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
      </div>
    );
  }
}

export default MyStoreCheckout;
