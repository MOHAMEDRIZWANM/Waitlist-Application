import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
                <p>
                    <a href="#" className="social-link">
                        <FaTwitter className="social-icon" />
                    </a>
                    <a href="#" className="social-link">
                        <FaFacebook className="social-icon" />
                    </a>
                    <a href="#" className="social-link">
                        <FaInstagram className="social-icon" />
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
