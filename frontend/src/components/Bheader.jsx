import React, { useState, useEffect } from 'react';
import logo from '../assets/apple-icon.webp';
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Bheader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

    return (
        <>
            <header>
                <nav className="navbar">
                    <img src={logo} alt="Logo" className="logo" />
                    {isMobile && (
                        <div className="menu-icon" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={isOpen? faTimes : faBars} />
                        </div>
                    )}
                    <ul id='n-bar' className={isMobile? (isOpen? 'navLinks open' : 'navLinks') : 'navLinks'}>
                        <div className='div-1'>
                            <li className="navItem"><a href="/" className="navLink">Home</a></li>
                            {/* <li className="navItem"><a href="/" className="navLink">Leader board</a></li> */}
                            <li className="navItem"><a href="/support" className="navLink">Support</a></li>

                        </div>
                        <div className='div-2'>
                            <li className="navItem"><a href="/Login" className='join-waitlist'>Sign In</a></li>
                            <li className="navItem"><a href="/signup" className='join-waitlist'>Sign Up</a></li>
                        </div>

                    </ul>

                </nav>
            </header>
        </>
    );
};

export default Bheader;