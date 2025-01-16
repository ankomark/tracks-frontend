import React, { useState, useEffect } from 'react';
import { fetchComments, postComment } from '../api';

const Comments = ({ trackId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        const fetchCommentData = async () => {
            try {
                const data = await fetchComments(trackId);
                setComments(data);
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommentData();
    }, [trackId]);

    const handlePostComment = async () => {
        if (newComment.trim()) {
            try {
                const postedComment = await postComment(trackId, newComment);
                setComments((prevComments) => [...prevComments, postedComment]);
                setNewComment(''); // Clear the input after posting
            } catch (error) {
                console.error('Failed to post comment:', error);
            }
        }
    };

    const toggleComments = () => setShowComments((prev) => !prev);

    return (
        <div className="comments-section">
            <button className="avatar-button" onClick={toggleComments}>
                💬 {comments.length} 
            </button>

            {showComments && (
                <div className="comments-container">
                    {loading ? (
                        <div>Loading comments...</div>
                    ) : (
                        <ul className="comments-list">
                            {comments.map((comment) => (
                                <li key={comment.id} className="comment-item">
                                    <span className="comment-user">{comment.user.username}:</span>
                                    <span className="comment-content">{comment.content}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="comment-input-section">
                        <textarea
                            className="comment-input"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                        />
                        <button className="comment-post-button" onClick={handlePostComment}>
                            Post
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comments;
