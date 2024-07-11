import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VerifyOTP.css';
import { passResOTP, resendOTP } from '../api'; 

function PassOTP() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [timer, setTimer] = useState(60); 
    const [isResendDisabled, setIsResendDisabled] = useState(true);
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
        try {
        const response = await passResOTP({ otp });
        if (response.data === "OTP Verified Successfully") {
            setSuccess("OTP Verified Successfully");
            navigate('/pass', { replace: true });
        } else {
            setError('Invalid OTP. Please try again.');
        }
        } catch (error) {
        setError('Error verifying OTP. Please try again later.');
        console.error('Error verifying OTP', error);
        }
    };

    const handleResendOTP = async () => {
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
                <button className="btn" onClick={handleVerify}>Verify</button>
                <div className="resend-container">
                    <p className='timer-text'>Resend OTP in {timer} seconds</p>
                    <button
                    className="btn"
                    onClick={handleResendOTP}
                    disabled={isResendDisabled}
                    >
                        Resend OTP
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PassOTP;