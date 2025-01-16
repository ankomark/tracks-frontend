import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrackItem from './TrackItem';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await axios.get('/api/songs/tracks/favorites/', config);
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error.message);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="favorites-page">
            <h1>Your Favorites</h1>
            {favorites.map((track) => (
                <TrackItem key={track.id} track={track} />
            ))}
        </div>
    );
};

export default Favorites;
