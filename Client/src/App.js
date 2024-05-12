import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Product from './components/Product/Product';
import UpdateProduct from './components/Product/UpdateProduct';
import CreateProduct from './components/Product/CreateProduct';
import Invoices from './components/Invoices/Invoices';
import InvoiceCreator from './components/Invoices/InvoiceCreator';
import Navbar from './components/Navbar/Navbar';
import Payments from './components/Payments/Payments';
import Login from './components/User/Login';
import Signup from './components/User/Signup';

function App() {
  
  const [products, setProducts] = useState();
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);

  const getInvoices = async () => {
    try {
      const response = await api.get("/invoices"); // Adjust the endpoint as necessary
      setInvoices(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  

  const getProducts = async () =>{ 
    
    try
    {
      const response = await api.get("/Product");
      // console.log(response.data);
      setProducts(response.data);
    } 
    catch(err)
    {
      console.log(err);
    }
  }
  const getPayments = async () => {
    try {
      const response = await api.get("/payment"); // Adjust the endpoint as necessary
      setPayments(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    getProducts();
    getInvoices();
    getPayments(); 
  }, []);

  return (
    <div className="App">
      
      <Routes>
          <Route path="/" element={<Login />} ></Route>
          <Route path="/Signup" element={<Signup />} ></Route>
      </Routes>
      <Navbar />
      <Routes>
            
            <Route path="/" element={<Layout/>}>
            <Route path="/Home" element={<Home />} ></Route>
            <Route path="/Product" element={<Product products={products} />}/>
            <Route path="/Product/id/:productId" element={<UpdateProduct  />} />
            <Route path="/Product/create" element={<CreateProduct  />} />
            <Route path="/Invoices" element={<Invoices invoices={invoices} />} /> 
            <Route path="/Invoices/create" element={<InvoiceCreator  />} />
            <Route path="/payment" element={<Payments payments={payments} />}/>
            {/* Add this line */}
            
          </Route>
      </Routes>
    </div>
  );
}





export default App;
