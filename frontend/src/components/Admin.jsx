import React, { useState } from 'react';
import { adminlogin } from '../api';  // Make sure to import the function
import '../styles/Admin.css';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleLogin = async () => {
    const response = await adminlogin({ email, password });
    if(response.data === "Invalid admin email") {
      console.log('Users are not allowed to login in this page')
      navigate('/login',{replace: true})
    } else if(response.data === "Invalid password") {
      console.log("Invalid Password")
    } else if (response.data === 'Admin Signed in Successfully'){
      console.log("Admin logged in")
      navigate('/adminld', { replace: true });
    } else {
      console.log('Error reaching server')
    }
  };

  return (
    <div className='whole_div'>
      <h1 className='heading'>Waiting List Application</h1>
      <div className="login-container">
        <div className="login-form">
          <h2 className='head'>Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br></br>
          <div className='whole_btn'>
            <button className='btn' onClick={handleLogin}>Sign In</button>
          </div><br></br>
        </div>
      </div>
    </div>
  );
}

export default Admin;
