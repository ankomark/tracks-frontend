
import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png'; // Replace with your logo path
import { FaHeart } from'react-icons/fa'; // Replace with your favorite icon library

const Header = () => {
    const isAuthenticated = !!localStorage.getItem('accessToken');

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
    };

    return (
        <header className="header">
            <img src={logo} alt="Logo" className="logo" />
            <h1 className="title">PLAY HEAVENLY MUSIC</h1>
            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/tracks">Tracks</Link>
                <Link to="/profiles">Profiles</Link>
                <Link to="/playlists">Playlists</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/favorites">
                    <FaHeart style={{ color: 'red', fontSize: '24px' }} />
                </Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/UploadTrackPage">Upload</Link>
                        <button onClick={handleLogout} className="logout-button">
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/login">Log In</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
