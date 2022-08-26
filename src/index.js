import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
    
const root = ReactDOM.createRoot(document.getElementById('root'));

document.addEventListener('DOMContentLoaded', async () => {
      const publishableKey='pk_test_51LWacpDAWUchYURSa3toaaMmetwkL0pvMkEwCYNtoArahTX9S1qVJNtX1ttZno0MPZVh1pKEZBndKikXUu07edkh00GgZpyChs'
      const stripePromise = loadStripe(publishableKey);         
root.render(
      <Elements stripe={stripePromise}>
      <App />
      </Elements>
);
})

