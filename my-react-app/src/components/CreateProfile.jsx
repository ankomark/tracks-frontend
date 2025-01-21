import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api';

const CreateProfile = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        bio: '',
        birth_date: '',
        location: '',
       
        picture: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setProfileData((prev) => ({ ...prev, picture: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(profileData).forEach(([key, value]) => {
            formData.append(key, value);
        });
    
        try {
            const token = localStorage.getItem('accessToken');
            await axios.post(`${BASE_URL}/profiles/create_profile/`, formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' // This is important for file uploads
                },
            });
            navigate('/'); // Redirect to the homepage after profile creation
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    };
    

    return (
        <div className="create-profile">
            <h1>Create Your Profile</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="bio"
                    placeholder="Bio"
                    value={profileData.bio}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="birth_date"
                    placeholder="Birth Date"
                    value={profileData.birth_date}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={profileData.location}
                    onChange={handleChange}
                />
               
                <input type="file" name="picture" onChange={handleFileChange} />
                <button type="submit">Create Profile</button>
            </form>
        </div>
    );
};

export default CreateProfile;
