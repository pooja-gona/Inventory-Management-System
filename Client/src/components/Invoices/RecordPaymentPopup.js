// RecordPaymentPopup.js
import api from '../../api/axiosConfig';

import React, { useState, useEffect  } from 'react';

const RecordPaymentPopup = ({ invoiceId, onClose, onPaymentSuccess }) => {
  const [amount, setAmount] = useState('');
  const [invoice, setInvoice] = useState(null);
  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        // Fetch the details of the invoice using the invoiceId
        const response = await api.get(`/invoices/${invoiceId}`);
        if (response.status === 200) {
          setInvoice(response.data);
        } else {
          throw new Error('Failed to fetch invoice details');
        }
      } catch (error) {
        console.error('Error fetching invoice details:', error);
      }
    };

    fetchInvoiceDetails();
  }, [invoiceId]);

  const sendPaymentEmailToUser = async (paymentDetails) => {
    try {
      const newAmountDue = invoice.amountDue - paymentDetails.amount;
      const emailData = {
        to: invoice.customerEmail,
        subject: 'Payment Recorded',
        body: `You have recorded a payment for the following details:\n\n
          Invoice ID: ${paymentDetails.invoiceId}\n
          Amount: ${paymentDetails.amount}\n
          Amount Due: ${newAmountDue}\n
        `,
      };
  
      // Send an email to the customer
      await api.post('/email/send', emailData);
    } catch (error) {
      console.error('Error sending the payment email:', error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paymentDetails = { amount: Number(amount) };
      const response = await api.post(`/payment/create/invoices/${invoiceId}`, paymentDetails);
      if (response.status === 200) {
        // Send payment details to the user
        const paymentDetailsForUser = {
          invoiceId: invoiceId,
          amount: Number(amount),
          // Include any other relevant details
        };
        onPaymentSuccess(paymentDetailsForUser);

        // Send payment email to the customer
        sendPaymentEmailToUser(paymentDetailsForUser);
      } else {
        throw new Error('Failed to record payment');
      }
    } catch (error) {
      console.error("Failed to record payment:", error);
    }
  };

  

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2 style={{ color: "black" }}>Payment</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ color: "black" }}>
            Amount: $
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
            />
          </label>
          <div className="popup-actions">
            <button type="submit" className="pay-button">Pay</button>
            <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordPaymentPopup;
