import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import '../styles/VerifyOTP.css';
import { verifyOTP, resendOTP } from '../api'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(60); // 60 seconds timer
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleVerify = async () => {
    setLoading(true); // Set loading to true when verification starts
    try {
      const response = await verifyOTP({ otp });
      if (response.data === 'Account verified and added to waitlist successfully. Referral Code is mailed to your mail') {
        setSuccess('Account verified and added to waitlist successfully. Referral Code is mailed to your mail');
        toast.success('Successfully Registered');
        setTimeout(() => navigate('/login', { replace: true }), 1000);
      } else if(response.data === 'Contest Completed') {
        setSuccess('Account verified. Sorry Contest Completed');
        navigate('/login', { replace: true });
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('Error verifying OTP. Please try again later.');
      console.error('Error verifying OTP', error);
    }
    setLoading(false); // Set loading to false after the process is complete
  };

  const handleResendOTP = async () => {
    setLoading(true); // Set loading to true when resending OTP starts
    try {
      const response = await resendOTP(); 
      if (response.data === 'Resend OTP successfull') {
        setSuccess('OTP resent successfully!');
        setTimer(60); 
        setIsResendDisabled(true); 
      } else {
        setError('Error resending OTP. Please try again.');
      }
    } catch (error) {
      setError('Error resending OTP. Please try again later.');
      console.error('Error resending OTP', error);
    }
    setLoading(false); // Set loading to false after the process is complete
  };

  return (
    <div className='whole_div'>
      <div className="verify-otp-container">
        <h2 className='head'>Verify OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        /><br />
        <button className="btn" onClick={handleVerify} disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
        <div className="resend-container">
          <p className='timer-text'>Resend OTP in {timer} seconds</p>
          <button
            className="btn"
            onClick={handleResendOTP}
            disabled={isResendDisabled || loading}
          >
            {loading ? 'Resending...' : 'Resend OTP'}
          </button>
        </div>
      </div>
      <ToastContainer
        position='top-center'
        theme='dark'
        autoClose={2000} 
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        {loading && (
          <div className="loader-wrapper">
            <div className='loader'>
              <div className='loader loader-inner'></div>
            </div>
          </div>
        )}
      </Backdrop>
    </div>
  );
}

export default VerifyOTP;
