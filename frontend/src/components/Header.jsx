import React, { useState, useEffect } from 'react';
import logo from '../assets/apple-icon.webp';
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from '../assets/User-Avatar-PNG-Transparent-Image.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        toast('Logging out');
        document.cookie.split(";").forEach(cookie => {
            document.cookie = cookie.replace(/^ +/, "")
                .split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        });
        window.location.reload()
        window.location.href = "/"
        window.history.pushState(null, "", "/")
    };

    return (
        <>
            <header>
                <nav className="navbar">
                    <img src={logo} alt="Logo" className="logo" />
                    {isMobile && (
                        <div className="menu-icon" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                        </div>
                    )}
                    <ul className={isMobile ? (isOpen ? 'navLinks open' : 'navLinks') : 'navLinks'}>
                        <div>
                            <li className="navItem"><a href="/" className="navLink">Home</a></li>
                            <li className="navItem"><a href="/waitlist" className="navLink">Leaderboard</a></li>
                            <li className="navItem"><a href="/support" className="navLink">Support</a></li>
                            <li className="navItem" id='avatar' onClick={toggleDropdown}>
                                <img src={Image} className='join' alt="" />
                                
                                {dropdownOpen && (
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item"><a href="/account" className="navLink">Account</a></li>
                                        <li className="dropdown-item"><button className="navLink" onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                )}
                            </li>
                        </div>
                    </ul>
                </nav>
            </header>
            <ToastContainer
            position='top-center'
            theme='dark'
            autoClose={2000}></ToastContainer>
        </>
    );
};

export default Header;
