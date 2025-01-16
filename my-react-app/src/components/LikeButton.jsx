// src/components/Likes.js
import React, { useState } from 'react';
import { updateLike } from '../api'; // API to handle like updates

const LikeButton = ({ trackId, initialLikes }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = async () => {
        try {
            // Update like status in the database
            const updatedLikes = await updateLike(trackId, !isLiked); // Pass trackId and new like state
            setLikes(updatedLikes); // Update UI with the new like count
            setIsLiked(!isLiked); // Toggle like state
        } catch (error) {
            console.error('Failed to update like status:', error);
        }
    };

    return (
        <button
            className={`like-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLikeClick}
        >
            ❤️ {likes}
        </button>
    );
};

export default LikeButton;
