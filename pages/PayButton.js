// src/components/Payment.js

import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [paymentUrl, setPaymentUrl] = useState('');
  const merchantId = 'CASHPLUSONLINE';
  const apiKey = '378f10aa-6762-4619-8c82-40617d6e5872';
  const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy URL

  const initiatePayment = async () => {
    try {
      const response = await axios.post(
        `${corsProxyUrl}https://api.phonepe.com/apis/hermes/pg/v1/pay`, // Use CORS proxy
        {
          merchantId,
          apiKey,
          amount: 5, // Amount in rupees
          merchantTransactionId: '45454bvvghcfxfgcv', // Replace with your unique transaction id
        },
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
        }
      );
      setPaymentUrl(response.data.paymentUrl); // Assuming paymentUrl is returned in response
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div>
      <button onClick={initiatePayment}>Initiate Payment</button>
      {paymentUrl && <a href={paymentUrl}>Proceed to Payment</a>}
    </div>
  );
};

export default Payment;
