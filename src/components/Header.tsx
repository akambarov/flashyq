import React from 'react';
import '../styles/Header.css';
import logo from '../logo.svg';
import Info from './Info';

function Header() {
    return (
        <div className="site-header">
            <div className="site-logo">
                <a href="/">
                    <img
                        className="logo-img"
                        src={logo}
                        alt="FlashyQ logo"
                    />
                </a>
            </div>
            <div className="site-utilities">
                <Info />
            </div>
        </div>
    );
}

export default Header;