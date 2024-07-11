import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Pass.css';
import { resetPass } from '../api';

function Pass() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await resetPass({ password });
      if (response.data === "Password reset successfully") {
        setSuccess('Password reset successfully')
        navigate('/login', { replace: true });
      } else {
        setError('Error in resetting password');
      }
    } catch (error) {
      console.error('Error in resetting password:', error);
      setError('Error in reaching server');
    }
  };

  return (
    <div className='whole_div'>
      <div className="Pass-container">
        <h2 className='head'>Change Your Password</h2>
        <br />
        <form className='pass' onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit" className='btn'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Pass;
