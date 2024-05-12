import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from 'react-bootstrap/Button';

const Payments = ({ payments }) => {
  return (
    <div className="payments-container">
        <h1 style={{ color: "black" }}>Payments History</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className='table-header-row'>
              <TableCell className="table-cell-header">Payment ID</TableCell>
              <TableCell className="table-cell-header">Invoice ID</TableCell>
              <TableCell className="table-cell-header">Created Date</TableCell>
              <TableCell className="table-cell-header">Amount Paid</TableCell>
              <TableCell className="table-cell-header">Amount Due</TableCell>
              <TableCell className="table-cell-header">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments?.map((payment) => (
              <TableRow key={payment.paymentId}>
                <TableCell className="table-cell">{payment.paymentId}</TableCell>
                <TableCell className="table-cell">{payment.invoiceId}</TableCell>
                <TableCell className="table-cell">{payment.createdDate}</TableCell>
                <TableCell className="table-cell">{payment.amountPaid}</TableCell>
                <TableCell className="table-cell">{payment.amountDue}</TableCell>
                <TableCell className="table-cell">{payment.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Payments;
