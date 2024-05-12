import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig'; // ensure this path is correct
import { useNavigate } from 'react-router-dom'; 

// const invoiceCreateHeading = {
//   textAlign: 'left', // Align the text to the left
//   marginBottom: '20px', // Space below the heading
//   color : 'black'
//   // You can add additional styles here if necessary
// };

const formStyle = {
  display: 'flex',
  flexDirection: 'column', // stack children vertically
  width: '300px', // or whatever width you prefer
  margin: 'auto', // to center the form on the page
  padding: '20px', // spacing around the form
  boxSizing: 'border-box', // include padding in the width calculation
  gap: '10px', // space between form items
};

const labelStyle = {
  marginBottom: '5px',
};

const inputStyle = {
  padding: '8px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  padding: '10px 20px',
  background: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};


const InvoiceCreator = () => {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [invoice, setInvoice] = useState({
    customerName: '',
    customerAddress: '',
    customerEmail: '',
    customerPhoneNo: '',
    price: '',
    quantity: 1, // defaulting to one, can be changed as per the requirement
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    api.get('/Product')
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);

    const product = products.find((p) => p.productId.toString() === productId);
    if (product) {
      setInvoice((prevInvoice) => ({
        ...prevInvoice,
        productId: product.productId, // make sure to set the product ID here
        price: product.productPrice,
      }));
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
    }));
  };


  const sendEmailToUser = async () => {
    try {
      const emailData = {
        to: invoice.customerEmail,
        subject: 'Invoice Created',
        body: `You have created a new invoice with the following details:\n\n
          Customer Name: ${invoice.customerName}\n
          Customer Address: ${invoice.customerAddress}\n
          Customer Email: ${invoice.customerEmail}\n
          Customer Phone Number: ${invoice.customerPhoneNo}\n
          Product ID: ${invoice.productId}\n
          Quantity: ${invoice.quantity}\n
          Price: ${invoice.price}\n
          Total Price: ${invoice.price * invoice.quantity}\n
          Due Date: ${invoice.dueDate}\n
          // Include any other relevant details
        `,
      };
  
      // Send an email to the customer
      await api.post('/email/send', emailData);
    } catch (error) {
      console.error('Error sending the email:', error);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const invoiceToSend = {
      ...invoice,
      productId: selectedProductId 
    };

    // You would typically send the invoice to the server here
    api.post('/invoices', invoiceToSend)
      .then((response) => {
        console.log('Invoice created:', response.data);
        // Handle success, perhaps clear the form or give user feedback

        // send email
        sendEmailToUser();

        navigate('/invoices');
        window.location.reload();
        
      })
      .catch((error) => {
        console.error('Error creating invoice:', error);
        // Handle error, give user feedback
      });
  };

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <div>
      <h1 className="invoiceCreateHeading" style={{ color: 'black' }}>Create Invoice</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="productSelect" style={labelStyle}>Select Product:</label>
        <select id="productSelect" value={selectedProductId} onChange={handleProductChange}>
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.productId} value={product.productId}>
              {product.productName} (ID: {product.productId})
            </option>
          ))}
        </select>

        <input
          type="text"
          name="customerName"
          value={invoice.customerName}
          onChange={handleInputChange}
          placeholder="Customer Name"
        />

        <input
          type="text"
          name="customerAddress"
          value={invoice.customerAddress}
          onChange={handleInputChange}
          placeholder="Customer Address"
        />

        <input
          type="email"
          name="customerEmail"
          value={invoice.customerEmail}
          onChange={handleInputChange}
          placeholder="Customer Email"
        />

        <input
          type="tel"
          name="customerPhoneNo"
          value={invoice.customerPhoneNo}
          onChange={handleInputChange}
          placeholder="Customer Phone Number"
        />

        <input
          type="number"
          name="quantity"
          value={invoice.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          min="1"
        />

        <input
          type="text"
          name="price"
          value={invoice.price}
          readOnly
          placeholder="Price"
        />

      <button type="submit" style={buttonStyle}>Create Invoice</button>
      </form>
    </div>
  );
};

export default InvoiceCreator;
