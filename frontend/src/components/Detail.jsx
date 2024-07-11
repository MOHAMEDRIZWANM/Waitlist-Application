import React from 'react';
import '../styles/detail.css';
import iphoneImage from '../assets/iphone.png';

const Detail = () => {
    return (
        <div className="detail-container">
            <div className="features">
                <h2>iPhone 16 Pro Features</h2>
                <p>Unleash the power of the A18 Bionic chip, ProMotion display, and advanced triple-camera system in the sleek iPhone 16 Pro. Experience unmatched performance and design available now.</p>
                <ul>
                    <li>Blazing-fast A18 Bionic chip</li>
                    <li>Immersive ProMotion display</li>
                    <li>Pro-grade triple-camera system</li>
                    <li>Enhanced battery life</li>
                    <li>5G connectivity</li>
                    <li>Sleek, durable design</li>
                </ul>
            </div>
            <div className="visuals">
                <img src={iphoneImage} alt="iPhone 15 Pro" className="iphone-image" />
            </div>
        </div>
    );
};

export default Detail;
