import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import StatusMessages, { useMessages } from './StatusMessages';
import './Card.css';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const idUser = localStorage.getItem('idUser');

const CardForm = ({setIsAddCart, isAddCart}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [messages, addMessage] = useMessages();
  const navigate = useNavigate();

  const token =  localStorage.getItem('token');
  const checkout = JSON.parse(localStorage.getItem('checkout'));
 
  const handleSubmit = async (e) => {
    //refresh the page.
    e.preventDefault();   

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      addMessage('Stripe.js has not yet loaded.');
      return;
    }
    const amount = checkout.totalBill*100;
    const { error: backendError, clientSecret } = await fetch(
      'http://127.0.0.1:5000/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify( {
          paymentMethodType: 'card',
          currency: 'usd',
          amount,    
          listItems: checkout.listItem,
          email: checkout.userEmail,
          idUser,
          }
        )
      }
    ).then((r) => r.json());    

    if (backendError) {
      addMessage(backendError.message);
      return;
    }
    addMessage('Client secret returned');

    
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Jenny Rosen',
          },
        },
      }
    );
    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      addMessage(stripeError.message);
      return;
    }
    // Show a success message to your customer
    // There's a risk of the customer closing the window before callback
    // execution. Set up a webhook or plugin to listen for the
    // payment_intent.succeeded event that handles any business critical
    // post-payment actions.
    addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
    toast.success('Checkout successfully!',{
      position: toast.POSITION.TOP_CENTER
    });
    
    localStorage.removeItem('checkout');
    navigate('/')
    setIsAddCart(!isAddCart)
  };

  return (
    <><div id="form-Card">
      <h1>Card</h1>
      <form id="payment-form" onSubmit={handleSubmit}>
        <label className='label-card' htmlFor="card">Card</label>
        <CardElement id="card" />

        <button className='button-card' type="submit">Pay</button>
      </form>
      <StatusMessages messages={messages} />
    </div>
    </>
  );
};

export default CardForm;
