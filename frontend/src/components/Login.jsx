import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import Image from '../assets/Waiting-bro (2).svg';
import { signin } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signin(formData);
      if (response.data === 'Account Not Verified') {
        console.log(response.data);
        setError('OTP not verified');
        navigate('/verify-otp', { replace: true });
      } else if (response.data === 'Wrong Password!') {
        toast.error('Invalid Password');
        setError(response.data);
      } else if (response.data === 'Account not found!') {
        setError(response.data);
        navigate('/signup', { replace: true });
      } else {
        setSuccess(response.data);
        toast.success("Successfully Loged in")
        setTimeout(()=>navigate('/', { replace: true }),1000);
      }
    } catch (error) {
      setError('Error signing up. Please try again later.');
      console.error('Error signing up', error);
    }
  };

  return (
    <div className='whole_div'>
      <h1 className='heading'>Waiting List Application</h1>
      <div className="login-container">
        <div></div>
        <div className="login-form">
          <h2 className='head'>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            /><br />
            <Link to="/email" className='forgot'>Forgot Password?</Link>
            <div className='whole_btn'>
              <button className='btn' type="submit">Sign In</button>
            </div>
          </form>
          <hr /><br />
          <div className='whole_btn'>
            <h5 className='txt'>If you are a new User?</h5>
            <Link to="/signup" className='click'>Sign Up</Link>
          </div>
          <br></br>
          <div className='whole_btn'>
            <h5 className='txt'>If you are a new Admin?</h5>
            <Link to="/admin" className='click'>Admin</Link>
          </div>
        </div>
        <div className="login-image">
          <img className='im' src={Image} alt="login" />
        </div>
      </div>
      <ToastContainer
      position='top-center'
      autoClose={2000}
      theme='dark'
      />
    </div>
  );
}

export default Login;
