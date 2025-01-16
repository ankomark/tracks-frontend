import React, { useState } from "react";
import { postComment } from "../services/api";

const CommentForm = ({ trackId }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postComment({ track: trackId, comment });
      setComment("");
      alert("Comment posted!");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        required
      ></textarea>
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;
