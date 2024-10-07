"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useCreatePaymentIntentMutation } from "@/redux/payment/paymentApi";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#1f2937",
      fontSize: "16px",
      fontFamily: "'Inter', sans-serif",
      "::placeholder": {
        color: "#6b7280",
      },
    },
    invalid: {
      color: "#dc2626",
    },
  },
};

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Call backend to create payment intent
      const { data } = await createPaymentIntent(10).unwrap();
      const clientSecret = data.clientSecret;

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed");
      } else {
        if (result.paymentIntent?.status === "succeeded") {
          toast.success("Payment successful!");

          // Redirect to the original post page
          const originalPostId = localStorage.getItem("lastAttemptedPostId");
          if (originalPostId) {
            window.location.href = `/posts/${originalPostId}`;
            localStorage.removeItem("lastAttemptedPostId"); // Clean up
          } else {
            window.location.href = "/";
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create Your Payment
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Card Details
          </label>
          <div className="border border-gray-300 rounded px-3 py-2">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          {loading ? "Processing..." : "Pay $10"}
        </button>
      </form>
    </div>
  );
};

const PaymentForm: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentForm;
