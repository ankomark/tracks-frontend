
import React, { useEffect, useState } from 'react';
import { fetchTracks } from '../api';
import TrackItem from './TrackItem';
import SearchBar from './SearchBar';

const TrackList = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrackData = async () => {
            try {
                const data = await fetchTracks();
                setTracks(data);
            } catch (err) {
                setError('Failed to load tracks. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchTrackData();
    }, []);

    if (loading) {
        return <div>Loading tracks...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="page-container">
            <SearchBar />
            <div className="track-list">
                {tracks.map((track) => (
                    <TrackItem key={track.id} track={track} />
                ))}
            </div>
        </div>
    );
};

export default TrackList;
