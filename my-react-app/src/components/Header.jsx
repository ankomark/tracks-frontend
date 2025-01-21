import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import logo from '../assets/logo.png'; 
import { FaHeart } from 'react-icons/fa'; 

const BASE_URL = 'http://127.0.0.1:8000/api' // Ensure BASE_URL is defined in your environment variables

const Header = () => {
    const isAuthenticated = !!localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const checkProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get(`${BASE_URL}/profiles/has_profile/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.data.profile_exists) {
                    navigate('/create-profile'); // Redirect if no profile exists
                } else {
                    
                    const profileResponse = await axios.get(`${BASE_URL}/profiles/me/`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setProfile(profileResponse.data); // Load the profile data
                }
            } catch (error) {
                console.error('Error checking profile:', error);
                // Optionally: redirect to login or show an error message
            }
        };

        if (isAuthenticated) checkProfile();
    }, [isAuthenticated, navigate]);

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
                {/* <Link to="/profiles">Profiles</Link> */}
                <Link to="/playlists">Playlists</Link>
                <Link to="/favorites">
                    <FaHeart style={{ color: 'red', fontSize: '24px' }} />
                </Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/UploadTrackPage">Upload</Link>
                        <button onClick={handleLogout} className="logout-button">
                            Log Out
                        </button>
                        {profile && profile.picture ? (
                            <img
                                src={profile.picture}
                                alt="Profile"
                                className="profile-picture"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    marginLeft: '10px',
                                }}
                            />
                        ) : null}
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
