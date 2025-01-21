import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', is_artist: false });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/auth/signup/', formData);
            navigate('/login'); // Redirect to login page after successful sign-up
        } catch (error) {
            setError(error.response?.data?.message || 'Error signing up');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    autoComplete="username" 
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                    autocomplete="email"
                    
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <label className="artist-label">
                    <input
                        type="checkbox"
                        name="is_artist"
                        checked={formData.is_artist}
                        onChange={handleChange}
                    />
                    Are you an artist?
                </label>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default SignUpPage;