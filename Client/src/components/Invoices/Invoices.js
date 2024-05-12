import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Invoices.css'; // Assume you have some CSS for styling
import api from '../../api/axiosConfig';
import InvoiceDetailsPopup from './InvoiceDetailsPopup'; // Ensure this component is created
import RecordPaymentPopup from './RecordPaymentPopup';
import './RecordPaymentPopup.css';

const Invoices = ({ onInvoiceClick }) => {

  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('none');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); 
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false); 
  const [showRecordPaymentPopup, setShowRecordPaymentPopup] = useState(false);
  const [currentInvoiceId, setCurrentInvoiceId] = useState(null);

  
  useEffect(() => {
    // Fetch all invoices when the component mounts
    const fetchAllInvoices = async () => {
      try {
        const allInvoices = await getAllInvoiceDetails();
        setInvoices(allInvoices);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      }
    };

    fetchAllInvoices();
  }, []); 

  const handleOpenRecordPaymentPopup = async (invoiceId) => {
    try {
      // Fetch details of the selected invoice
      const invoiceDetails = await getInvoiceDetails(invoiceId);
      setSelectedInvoice(invoiceDetails);

      console.log('Opening popup for invoice ID:', invoiceId); // Debugging log
      setCurrentInvoiceId(invoiceId);
      setShowRecordPaymentPopup(true);
    } catch (error) {
      console.error("Failed to fetch invoice details for payment:", error);
    }
  };

  function formatDate(date) { 
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1), // getMonth() is zero-based
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    // Pad the month and day with leading zeros if necessary
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [month, day, year].join('-'); // Concatenate with dashes
  }

  const handleSearchTypeChange = async (e) => {
    const value = e.target.value;
    setSearchType(value);
    
    if (value === 'none') {
     
      // window.location.reload();
      try {
        
        const response = await api.get(`/searchInvoices`);
        if (response.status === 200) {
          setInvoices(response.data);
        } else {
          throw new Error('Failed to search invoices');
        }
      } catch (error) {
        console.error("Failed to search invoices:", error);
        // Handle the error appropriately 
      }
    }
  };

  const calculateStatus = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
  
    // Remove the time component for proper date comparison
    currentDate.setHours(0, 0, 0, 0);
    dueDateObj.setHours(0, 0, 0, 0);
  
    if (dueDateObj < currentDate) {
      return 'Overdue';
    } else if (dueDateObj.getTime() === currentDate.getTime()) {
      return 'Due Today';
    } else {
      return 'Not Due';
    }
  };  
  
  const searchInvoices = async () => {
    
    try {
      const params = new URLSearchParams({
        [searchType]: searchTerm
      }).toString();

      const response = await api.get(`/searchInvoices?${params}`);
      if (response.status === 200) {
        setInvoices(response.data);
      } else {
        throw new Error('Failed to search invoices');
      }
    } catch (error) {
      console.error("Failed to search invoices:", error);
      // Handle the error appropriately
    }
  };

  const handleInvoiceClick = async (invoiceId) => {
    try {
      const details = await getInvoiceDetails(invoiceId);
      setSelectedInvoice(details);
      setShowPopup(true);
    } catch (error) {
      console.error("Failed to fetch invoice details:", error);
    }
  };

  const getInvoiceDetails = async (invoiceId) => {
    // Replace with the actual API endpoint and include any required headers or parameters
    const response = await api.get(`/invoices/${invoiceId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch details for invoiceId:', invoiceId);
    }
  };

  const getAllInvoiceDetails = async () => {
    // Replace with the actual API endpoint and include any required headers or parameters
    const response = await api.get(`/invoices`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch invoices');
    }
  };

  const handleDeleteInvoice = async (invoiceId) => {
    try {
      const response = await api.delete(`/invoices/${invoiceId}`);
      if (response.status === 200) {
        setDeleteSuccess(true); // Set success message to be shown
        // Refresh the invoice list or reload the page here if necessary
        // For example, you could call a function that fetches the invoices again
        // fetchInvoices(); // assuming you have a function to refresh the invoices
        // Alternatively, you could use window.location.reload(); but it's not the React way
        setSuccessMessage('Delete successful');
        setTimeout(() => setSuccessMessage(''), 3000);

        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to delete invoice:", error);
      // Handle the error appropriately
    }
  };
  

  return (
    
    <div className="invoices-container">
         {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="invoices-header">
      <h1>Invoice History</h1>
      <div className="search-section">
      <select value={searchType} onChange={handleSearchTypeChange}>
          
            <option value="none">None</option>
            <option value="invoiceId">Invoice ID</option>
            <option value="customerName">Customer Name</option>
            <option value="customerEmail">Customer Email</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <button className='view-button' onClick={searchInvoices}>Search</button>
        </div>
        <Link to="/invoices/create">
          <button className="create-invoice-button">
            Create Invoice
          </button>
        </Link>
      </div>
      
      {invoices && invoices.length > 0 ? (
        <table className="invoices-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Product ID</th>
              {/* <th>Customer Name</th> */}
              {/* <th>Customer Address</th> */}
              <th>Customer Email</th>
              {/* <th>Customer Phone No</th> */}
              {/* <th>Price</th> */}
              {/* <th>Quantity</th> */}
              
              <th>Total Price</th>
              <th>Amount Paid</th>
              <th>Amount Due</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody className='invoice-table-data'>
            {invoices.map((invoice) => (
              <tr key={invoice.invoiceId}>
                <td>{invoice.invoiceId}</td>
                <td>{invoice.productId}</td>
                {/* <td>{invoice.customerName}</td> */}
                {/* <td>{invoice.customerAddress}</td> */}
                <td>{invoice.customerEmail}</td>
                {/* <td>{invoice.customerPhoneNo}</td> */}
                {/* <td>{invoice.price}</td> */}
                {/* <td>{invoice.quantity}</td> */}
                <td>{invoice.totalPrice}</td>
                <td>{invoice.amountPaid}</td>
                <td>{invoice.amountDue}</td>
                <td>{formatDate(invoice.dueDate)}</td>
                <td>{calculateStatus(invoice.dueDate)}</td>
                <td>
                  <button className="vieww-button" 
                  onClick={() => handleInvoiceClick(invoice.invoiceId)}>
                    View
                  </button>
                  <button className="delete-button" 
                    onClick={() => handleDeleteInvoice(invoice.invoiceId)}>
                    Delete
                  </button>
                </td>
                <td>
                <button className="view-button" 
                  onClick={() => handleOpenRecordPaymentPopup(invoice.invoiceId)}>
                  Pay
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No invoices available.</div>
      )}
      {showPopup && selectedInvoice && (
        <InvoiceDetailsPopup 
          invoice={selectedInvoice} 
          onClose={() => {
            setShowPopup(false);
            setSelectedInvoice(null);
          }}
        />
      )}
    {showRecordPaymentPopup && (
  <RecordPaymentPopup
    invoiceId={currentInvoiceId}
    onClose={() => setShowRecordPaymentPopup(false)}
    onPaymentSuccess={() => {
      setShowRecordPaymentPopup(false);
      setSuccessMessage('Payment recorded successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      // Refresh the list of invoices or redirect as needed
      window.location.reload(); // or use your fetchAllInvoices function
    }}
  />
)}
    </div>
  );
};
export default Invoices;
