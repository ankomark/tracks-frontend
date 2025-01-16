
import React from 'react';
import PlayControls from './PlayControls';
import Likes from './LikeButton';
import Comments from './Comments';
import { FaArrowDown } from 'react-icons/fa';
import { useState } from 'react';

import { downloadTrack, toggleFavorite } from '../api';


const TrackItem = ({ track }) => {
    const [isFavorite, setIsFavorite] = useState(track.is_favorite || false);

    const handleDownload = async () => {
        try {
            await downloadTrack(track.id, track.file_name); // Pass track ID and file name
        } catch (error) {
            console.error('Error downloading the track:', error.message);
        }
    };

    const handleToggleFavorite = async () => {
        try {
            const message = await toggleFavorite(track.id);
            setIsFavorite(!isFavorite);
            console.log(message); // "Added to favorites" or "Removed from favorites"
        } catch (error) {
            console.error('Error toggling favorite:', error.message);
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
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>
    );
};

export default TrackItem;