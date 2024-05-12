import React, { useEffect, useState } from 'react';
import { Paper, TextField, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import './UpdateProduct.css';


const UpdateProduct = () => {
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    productName: '',
    productPrice: 0,
    productQuanty: 0,
  });
  const params = useParams();
  const productId = params.productId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await api.get(`/Product/id/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    // Update fields if they are empty
    ['productName', 'productPrice', 'productQuanty'].forEach((field) => {
      if (!updatedProduct[field]) {
        updatedProduct[field] = product[field];
      }
    });
  
    // Send a PUT request to update the product with the new data in updatedProduct
    const updatedData = {
      productName: updatedProduct.productName,
      productPrice: updatedProduct.productPrice,
      productQuanty: updatedProduct.productQuanty,
    };
  
    api
      .put(`/Product/edit/${productId}`, updatedData)
      .then((response) => {
        // Handle the response if needed
        console.log('Product updated successfully');
        navigate('/Product'); // Redirect to the product list page
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors
        console.error('Error updating the product:', error);
      });
  };
  

  const handleDelete = () => {
    // Send a DELETE request to delete the product
    api
      .delete(`/Product/delete/${productId}`)
      .then((response) => {
        // Handle the response if needed
        console.log('Product deleted successfully');
        // Redirect the user to another page or perform other actions
        navigate('/Product'); // Redirect to the product list page
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors
        console.error('Error deleting the product:', error);
      });
  };
  const handleGoBack = () => {
    navigate('/Product'); // Redirect to the product list page
  };

  return (
    <div className="update-product-container">
      {product ? (
        <Paper key={product.productId} className="product-card">
          <h3>{product.productName}</h3>
          {/* <p>Product ID: {product.productId}</p>
          <p>Price: ${product.productPrice}</p>
          <p>Quantity: {product.productQuanty}</p> */}
        </Paper>
      ) : (
        <div>Loading product details...</div>
      )}

      <h3>Update Product</h3>
      <form>
        <TextField
          label="Product Name"
          name="productName"
          value={updatedProduct.productName || (product && product.productName) || ''}
          onChange={handleInputChange}
        />
        <TextField
          label="Price"
          name="productPrice"
          value={updatedProduct.productPrice || (product && product.productPrice) || ''}
          onChange={handleInputChange}
        />
        <TextField
          label="Quantity"
          name="productQuanty"
          value={updatedProduct.productQuanty || (product && product.productQuanty) || ''}
          onChange={handleInputChange}
        />
         <div className="button-container">
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Product
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete Product
        </Button>
        <Button variant="contained" color="error" onClick={handleGoBack}>
          Go Back
        </Button>
        </div>
        
      </form>
    </div>
  );
};

export default UpdateProduct;
