// import React from "react";
// import { Link } from "react-router-dom";
// import Logo from "../assets/logo.png";


// const Header = () => {
//   return (
//     <>
//     <div className="header">
    
//       <div className="logo">
//         <img src={Logo} />

//      </div>
//       <div className="h1">
//         <h1>PLAY HEAVENLY MUSIC</h1>
//         </div>
//         <nav className="nav-links">
//         <Link to="/">Home</Link>
//         <Link to="/music">Music</Link>
//         <Link to="/events">Events</Link>
//         <Link to="/about">About</Link>
//       </nav>


      
    
//     </div>
    
//     <div className="search-bar">
//         <input type="text" placeholder="Search" />
//         <button type="submit">Search</button>
        
//       </div>
//     </>
//   );
// };

// export default Header;
// src/components/Header.js
// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Replace with your logo path

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
