import React from 'react';
import './Navbar.css'; // Import your CSS file
const Navbar = () => {
    return (
      <nav className="navbar">
        
        <a href="/Product" className="navbar-link">Products</a>
        <a href="/Invoices" className="navbar-link">Invoices</a>
        <a href="/payment" className="navbar-link">Payments</a>
        <a href="/" className="navbar-link">Log Out</a>
      </nav>
    );
  };
  
  export default Navbar;
