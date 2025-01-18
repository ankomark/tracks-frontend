import React, { useState, useEffect } from 'react';
import { getFavoriteTracks } from '../api';
import TrackItem from './TrackItem';
  // Import the styles

const FavoritesPage = () => {
    const [favoriteTracks, setFavoriteTracks] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavoriteTracks();
                setFavoriteTracks(data);
            } catch (error) {
                console.error('Error fetching favorite tracks:', error);
            }
        };

        fetchFavorites();
    }, []); // Run only once when the page loads

    return (
        <div className="favorites-page">
            <h1 className="favorites-header">My Favorite Tracks</h1>
            <div className="favorites-list">
                {favoriteTracks.length > 0 ? (
                    favoriteTracks.map((track) => <TrackItem key={track.id} track={track} />)
                ) : (
                    <p className="no-favorites">No favorite tracks yet!</p>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
