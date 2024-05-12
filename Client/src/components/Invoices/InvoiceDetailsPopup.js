import React, { useState } from 'react';
import api from '../../api/axiosConfig';
import './InvoiceDetailsPopup.css'; // Ensure you create a corresponding CSS file for this

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
const InvoiceDetailsPopup = ({ invoice: initialInvoice, onClose }) => {
    const [invoice, setInvoice] = useState({ ...initialInvoice });
    const [editableFields, setEditableFields] = useState({});
  
  const handleFieldClick = (fieldName) => {
    setEditableFields({ ...editableFields, [fieldName]: true });
  };

  const handleFieldBlur = (fieldName) => {
    setEditableFields({ ...editableFields, [fieldName]: false });
  };

  const handleFieldChange = (fieldName, value) => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [fieldName]: value,
    }));
  };
  const handleSave = () => {
    // Create an updatedData object with non-null values
    const updatedData = {};
  
    // Check and add non-null values for each field
    if (invoice.customerName !== null) {
      updatedData.customerName = invoice.customerName;
    }
  
    if (invoice.customerAddress !== null) {
      updatedData.customerAddress = invoice.customerAddress;
    }
  
    if (invoice.customerEmail !== null) {
      updatedData.customerEmail = invoice.customerEmail;
    }
  
    if (invoice.customerPhoneNo !== null) {
      updatedData.customerPhoneNo = invoice.customerPhoneNo;
    }
  
    // Check if there are any valid fields to update
    if (Object.keys(updatedData).length === 0) {
      console.log('No valid fields to update.');
    //   return;
    onClose();
    window.location.href = '/invoices'; 
    }
  
    const invoiceId = invoice.invoiceId;
  
    api
      .put(`/invoices/${invoiceId}`, updatedData)
      .then((response) => {
        console.log('Invoice updated successfully');
        // navigate('/invoices'); // Redirect to the product list page
        // window.location.reload();
        onClose();
        // window.location.href = '/invoices'; 
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors
        console.error('Error updating the Invoice:', error);
      });
  };
  


  const handleCancel = () => {
    // Revert changes by resetting the invoice state to the initial invoice data
    setInvoice({ ...initialInvoice });
    setEditableFields({}); // Reset all fields to non-editable
  };

 
  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Invoice ID: {invoice.invoiceId}</h2>
        <div className='two-column-data'>
          <table className='two-column-table'>
            <tbody>
              <tr>
                <td><strong>Product ID:</strong></td>
                <td>
                  <input
                    type="text"
                    readOnly
                    value={invoice.productId}
                    onChange={(e) => handleFieldChange('productId', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
              <td><strong>Customer Name:</strong></td>
                <td>
                  <input
                    type="text"
                    value={invoice.customerName}
                    onChange={(e) => handleFieldChange('customerName', e.target.value)}
                  />
                </td>
                </tr>
              {/* Add similar rows for other fields */}
              <tr>
                <td><strong>Customer Email:</strong></td>
                <td>
                  <input
                    type="text"
                    value={invoice.customerEmail}
                    onChange={(e) => handleFieldChange('customerEmail', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td><strong>Customer Phone Number:</strong></td>
                <td>
                  <input
                    type="text"
                    value={invoice.customerPhoneNo}
                    onChange={(e) => handleFieldChange('customerPhoneNo', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td><strong>Customer Address:</strong></td>
                <td>
                  <input
                    type="text"
                    value={invoice.customerAddress}
                    onChange={(e) => handleFieldChange('customerAddress', e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table className='two-column-table'>
            <tbody>
              <tr>
                <td><strong>Price ($):</strong></td>
                <td>
                  <input
                    type="text"
                    readOnly
                    value={invoice.price}
                    onChange={(e) => handleFieldChange('price', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td><strong>Quantity:</strong></td>
                <td>
                  <input
                    type="text"
                    readOnly
                    value={invoice.quantity}
                    onChange={(e) => handleFieldChange('quantity', e.target.value)}
                  />
                  </td>
              </tr>
              <tr>
                <td><strong>Total Price ($):</strong></td>
                <td>
                  <input
                    type="text"
                    readOnly
                    value={invoice.totalPrice}
                    onChange={(e) => handleFieldChange('totalPrice', e.target.value)}
                  />
                  </td>
              </tr>
              <tr>
                <td><strong>Due Date:</strong></td>
                <td>
                  <input
                    type="text"
                    readOnly
                    value={formatDate(invoice.dueDate)}
                    onChange={(e) => handleFieldChange('dueDate', e.target.value)}
                  />
                  </td>
              </tr>
              <tr>
                <td><strong>Created Date:</strong></td>
                <td>
                  <input
                    type="text"
                    readOnly
                    value={formatDate(invoice.createdDate)}
                    onChange={(e) => handleFieldChange('createdDate', e.target.value)}
                  />
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="buttons-container">
        <button className="view-button"  onClick={onClose}>Close</button>
        <button className="view-button" onClick={() => handleSave(invoice.invoiceId)}>Update</button>
        </div>
      </div>
    </div>
  ); 
};


export default InvoiceDetailsPopup; 
