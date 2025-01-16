// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { fetchProfiles } from '../api';

const Profile = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            const data = await fetchProfiles();
            setProfiles(data);
            setLoading(false);
        };
        fetchProfileData();
    }, []);

    if (loading) {
        return <div>Loading profiles...</div>;
    }

    return (
        <div>
            <h2>User Profiles</h2>
            <ul>
                {profiles.map((profile) => (
                    <li key={profile.id}>
                        <h3>{profile.user.username}</h3>
                        <p>Bio: {profile.bio}</p>
                        <p>Location: {profile.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
