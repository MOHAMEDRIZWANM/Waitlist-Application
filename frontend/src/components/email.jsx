import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Email.css';
import { forgotPass } from '../api';

function Email() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPass({email});
      if (response.data === "OTP Send Successful") {
        setSuccess("OTP Send Successful")
        navigate('/pass-otp', { replace: true });
      } else if (response.data === "No user data found") {
        setError("No user data found")
        navigate('/signup', {replace: true})
      } else {
        setError("Error in reaching server")
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className='whole_div'>
      <div className="Email-container">
        <h2 className='head'>Enter Your Mail id</h2>
        <br />
        <form className='mail' onSubmit={handleSubmit}>
          <input 
             
            type="email" 
            placeholder="Enter E-mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          /> 
          <br />
          <button type="submit" className='btn'>Next</button>
        </form>
      </div>
    </div>
  );
}

export default Email;