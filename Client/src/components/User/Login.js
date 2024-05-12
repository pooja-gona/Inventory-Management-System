import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import Validation from './LoginValidation'
import axios from 'axios'

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    
    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        // if(err.email === "" && err.password ===""){
            axios.post('http://localhost:5000/login',values)
            .then(res => {
                if(res.data === true){
                    navigate('/Product');
                }else{
                    alert("No record exists");
                }
                
            })
            .catch(err => console.log(err));
        // }
    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'> 
            <form action = "" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rounded-0'></input>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password'
                    onChange={handleInput} className='form-control rounded-0'></input>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100'>Log in</button>
                <p>* You agree to our terms and policies</p>
                <Link to="/Signup" className='btn btn-default border w-100 bg-light text-decoration-none'>Create Account</Link>
            </form>
        </div>
    </div>
  )
}

export default Login