import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './ShowProduct.css';

const ShowProduct = ({ products }) => {
  const navigate = useNavigate();

  const handleUpdateProduct = (productId) => {
    // Navigate to the update product route with the specific product ID
    navigate(`/Product/id/${productId}`);
  };

  const handleCreateProduct = () => {
    // Navigate to the route for creating a new product
    navigate('/Product/create');
  };

  return (
    <div className="product-container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className='table-header-row'>
              <TableCell className="table-cell-header">Product Name</TableCell>
              <TableCell className="table-cell-header">Product ID</TableCell>
              <TableCell className="table-cell-header">Price</TableCell>
              <TableCell className="table-cell-header">Quantity</TableCell>
              <TableCell className="table-cell-header">Edit Product</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.productId}>
                <TableCell className="table-cell">{product.productName}</TableCell>
                <TableCell className="table-cell">{product.productId}</TableCell>
                <TableCell className="table-cell">${product.productPrice}</TableCell>
                <TableCell className="table-cell">{product.productQuanty}</TableCell>
                <TableCell className="table-cell">
                  <Button
                    variant="primary"
                    onClick={() => handleUpdateProduct(product.productId)}
                  >
                    Edit Product
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Button to create a new product */}
      <Button
        variant="success"
        onClick={handleCreateProduct}
      >
        Create New Product
      </Button>
    </div>
  );
};

export default ShowProduct;
