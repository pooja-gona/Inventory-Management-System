import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';


const CreateProduct = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    productName: '',
    productPrice: '',
    productQuanty: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/Product/create', productData);
      if (response.status === 201) {
        sendEmailToUser();
        
        navigate('/Product'); // Redirect to the product list after creating a new product
        window.location.reload();
      } else {
        console.error('Failed to create the product');
      }
    } catch (error) {
      console.error('Error creating the product:', error);
    }
  };
  
  const sendEmailToUser = async () => {
    try {
      const emailData = {
        to: 'leongl550@gmail.com', // Replace with the user's email
        subject: 'Product Created',
        body: `You have created a new product: ${productData.productName}.`,
      };

      // Send an email to the user
      await api.post('/email/send', emailData);
    } catch (error) {
      console.error('Error sending the email:', error);
    }
  };

  return (
    <Container>
      <h3>Create New Product</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Label>Name:</Form.Label>
        <Form.Control
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleInputChange}
            required
            placeholder="Type the product name"
        />
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>Price:</Form.Label>
        <Form.Control
            type="number"
            name="productPrice"
            value={productData.productPrice}
            onChange={handleInputChange}
            required
            placeholder="Enter the product price"
        />
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>Quantity:</Form.Label>
        <Form.Control
            type="number"
            name="productQuanty"
            value={productData.productQuanty}
            onChange={handleInputChange}
            required
            placeholder="Enter the product quantity"
        />
        </Form.Group>


        <Button variant="primary" type="submit">
          Create Product
        </Button>
      </Form>
    </Container>
  );
};

export default CreateProduct;
