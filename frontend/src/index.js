import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import SignUp from './components/SignUp';
import VerifyOTP from './components/VerifyOtp';
import Home from './components/Home';
import Email from './components/email';
import Pass from './components/Pass';
import Admin from './components/Admin';
import Support from './components/Support';
import WaitingList from './components/WaitingList';
import PassOTP from './components/passotp';
import Adminld from './components/Adminld';
import Account from './components/Account';
import Coupan from './components/coupan';

 
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
      <Route index element={<Home />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/support" element={<Support/>}/>
        <Route path="/email" element={<Email/>}/>
        <Route path="/adminld" element={<Adminld/>}/>
        <Route path="/pass" element={<Pass/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/pass-otp" element={<PassOTP/>} />
        <Route path="/waitlist" element={<WaitingList/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/coupon" element={<Coupan/>} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById('root')
);
