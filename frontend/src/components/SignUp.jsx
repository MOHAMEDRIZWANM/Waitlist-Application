import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';
import Backdrop from '@mui/material/Backdrop';
import Image from '../assets/Waiting-bro (2).svg';
import { signup } from '../api';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    referredBy: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    setLoading(true); // Set loading to true when sign-up starts
    try {
      const response = await signup(formData);
      if (response.data === 'Successfully signed up. Verify OTP') {
        setSuccess('Sign up successful! Please check your email for the OTP.');
        navigate('/verify-otp', { replace: true });
      } else {
        setError(response.data);
      }
    } catch (error) {
      setError('Error signing up. Please try again later.');
      console.error('Error signing up', error);
    }
    setLoading(false); // Set loading to false after the process is complete
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="head">Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name} 
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="referredBy"
          placeholder="Referral ID"
          value={formData.referredBy}
          onChange={handleChange}
        />
        {passwordError && <p className="error">{passwordError}</p>}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="button-group">
          <button className="signup-btn" onClick={handleSignUp} disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
        <hr /><br />
        <div className="whole_btn">
          <h5 className="txt">Already have an Account?</h5>
          <Link to="/login"><a className="click" href="/login">Sign In</a></Link>
        </div>
      </div>
      <div className="signup-image">
        <img className="im" src={Image} alt="signup" />
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        {loading && (
          <div className="signup-loader-wrapper">
            <div className="signup-loader">
              <div className="signup-loader-inner"></div>
            </div>
          </div>
        )}
      </Backdrop>
    </div>
  );
}

export default SignUp;
