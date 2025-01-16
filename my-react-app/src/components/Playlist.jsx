// src/components/Playlist.js
import React, { useEffect, useState } from 'react';
import { fetchPlaylists } from '../api';

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
            <h2>Playlists</h2>
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist.id}>
                        <h3>{playlist.name}</h3>
                        <p>Created by: {playlist.user.username}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
