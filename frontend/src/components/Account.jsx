import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserIcon from '../assets/User-Avatar-PNG-Transparent-Image.png';
import '../styles/Account.css';
import { details } from '../api';

function Account() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [referralUrl, setReferralUrl] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    const fetchdetails = async () => {
      const det = await details();
      setUsername(det.name);
      setEmail(det.email);
      const url = 'http://localhost:3000/signup/ref=' + det.referralCode;
      setReferralUrl(url);
      setReferralCode(det.referralCode);
    };
    fetchdetails();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000); // Clear the message after 2 seconds
    }, () => {
      setCopySuccess('Failed to copy');
    });
  };

  return (
    <div className='profile-container'>
      <div className='profile-header'>
        <img className='profile-icon' src={UserIcon} alt='User Icon' />
      </div>
      <div className='profile-details'>
        <label>Name:</label>
        <input
          type='text'
          value={username}
          disabled
        />
        <label>Email:</label>
        <input
          type='email'
          value={email}
          disabled
        />
        <label>Referral URL:</label>
        <div className='referral-url-container'>
          <input
            type='text'
            value={referralUrl}
            disabled
          />
          <button onClick={copyToClipboard} className='copy-button'>Copy</button>
          {copySuccess && <span className='copy-success'>{copySuccess}</span>}
        </div>
        <label>Referral Code:</label>
        <input
          type='text'
          value={referralCode}
          disabled
        />
        <Link to='/'>
          <button className='back-button'>Back</button>
        </Link>
      </div>
    </div>
  );
}

export default Account;
