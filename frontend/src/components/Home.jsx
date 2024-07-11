import React, { useState, useEffect } from 'react';
import Header from './Header';
import Background from './Background';
import Footer from './Footer';
import Detail from './Detail';
import Bheader from './Bheader';
import Cookies from 'js-cookie'; 
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = Cookies.get('token'); 
        if (token) {
            setIsLoggedIn(true);
        }
    }, [])
    return (
        <>
            {
                isLoggedIn ? <Header /> : <Bheader />
            }
            <Background/>
            <Detail/>
            <Footer/>
            
        </>
    );
}

export default Home;
