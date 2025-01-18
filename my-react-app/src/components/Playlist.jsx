// src/components/Playlist.js
import React, { useEffect, useState } from 'react';
import { fetchPlaylists } from '../api';
import FavoritesPage from './FavoritesPage';

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylistData = async () => {
            const data = await fetchPlaylists();
            setPlaylists(data);
            setLoading(false);
        };
        fetchPlaylistData();
    }, []);

    if (loading) {
        return <div>Loading playlists...</div>;
    }

    return (
        <div>
            <h2>WHEN YOU ADD SONGS TO YOUR FAVORITE THEY BECOME PART OF YOUR PLAYLIST</h2>
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist.id}>
                        <h3>{playlist.name}</h3>
                        <p>Created by: {playlist.user.username}</p>
                    </li>
                ))}
            </ul>

            <div>
                <FavoritesPage/>
            </div>
        </div>
    );
};

export default Playlist;
