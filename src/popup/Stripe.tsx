import * as React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "17px",
              color: "#424770",
              letterSpacing: "0.025em",
              fontFamily: "Source Code Pro, monospace",
              "::placeholder": {
                color: "#aab7c4"
              },
              padding: "10px 14px"
            },
            invalid: {
              color: "#9e2146"
            }
          }
        }}
      />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const stripePromise = loadStripe("pk_test_EEHY7OZM10JqZG8MzSW6Lb0j00A4JIWiLY");

export const Stripe = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);
