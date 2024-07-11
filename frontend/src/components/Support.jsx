import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Support.css';
import { support } from '../api';

function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sub: '',
    txt: ''
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
      const response = await support(formData);
      console.log(response);
      if (response.data === "Support ticket raised") {
        setSuccess('Support ticket raised');
        navigate('/');
      } else if (response.data === 'Internal Server Error') {
        setError('Server Error. Try again!');
      }
    } catch (error) {
      setError('Error signing in');
      console.error('Error signing in', error);
    }
  };

  return (
    <div className='whole_div'>
      <h1 className='heading'>Support Form</h1>
      <div className="support-container">
        <div className="support-form">
          <h2 className='head'>Support</h2>
          {/* {error && <p className='error'>{error}</p>}
          {success && <p className='success'>{success}</p>} */}
          <form onSubmit={handleSubmit}>
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
              type="text"
              name="sub"
              placeholder="Subject of Complaint"
              value={formData.sub}
              onChange={handleChange}
              required
            />
            <textarea
              name="txt"
              placeholder="Explain the Issues as Comments"
              value={formData.txt}
              onChange={handleChange}
              required
            ></textarea>
            <br />
            <div className='whole_btn'>
              <button className='btn' type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Support;
