
import React from 'react';
import PlayControls from './PlayControls';

import Likes from './LikeButton';
import Comments from './Comments';
import { FaArrowDown,FaHeart } from 'react-icons/fa';

import { useState,useEffect  } from 'react';

import { downloadTrack, toggleFavorite } from '../api';
import { getFavoriteTracks } from '../api';




const TrackItem = ({ track }) => {
    const [isFavorite, setIsFavorite] = useState(false); // Start with false by default
    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                const favoriteTracks = await getFavoriteTracks(); // Fetch the list of favorite tracks for the logged-in user
                const isTrackFavorite = favoriteTracks.some((favoriteTrack) => favoriteTrack.id === track.id);
                setIsFavorite(isTrackFavorite); // Update the state based on whether this track is in the user's favorites
            } catch (error) {
                console.error('Error fetching favorite status:', error);
            }
        };

        fetchFavoriteStatus();
    }, [track.id]); // Re-run if the track ID changes

    const handleDownload = async () => {
        try {
            await downloadTrack(track.id, track.file_name); // Pass track ID and file name
        } catch (error) {
            console.error('Error downloading the track:', error.message);
        }
    };

    const handleToggleFavorite = async () => {
        try {
            const result = await toggleFavorite(track.id); // Pass the track ID explicitly
            setIsFavorite(result.favorite); // Update the state based on the API response
           
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
            
        }
    };
    
    
    
    

    return (
        <div className="track-item">
            <img src={track.cover_image} alt={track.title} className="track-cover" />
            <h3>{track.title}</h3>
            <p>Posted by :{track.artist.username}</p>
            <PlayControls track={track} />

            <div className='place-at-bottom'>
            <Likes trackId={track.id} initialLikes={track.likes_count} />
            <Comments trackId={track.id} />

           

            <button onClick={handleDownload}>
                    <FaArrowDown /> Download
                </button>
                <button onClick={handleToggleFavorite}>
                    {/* Toggle heart color based on favorite status */}
                    <FaHeart style={{ color: isFavorite ? 'red' : 'gray' }} />
                    {isFavorite ? ' Remove from Favorites' : ' + to Favorites'}
                </button>

            </div>
        </div>
    );
};

export default TrackItem;