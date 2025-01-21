import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { createTrack } from '../api'; // Ensure this API function is defined

const TrackUploadForm = () => {
    const [title, setTitle] = useState('');
    const [album, setAlbum] = useState('');
    const [audioFile, setAudioFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [lyrics, setLyrics] = useState('');
    const [audioFileMessage, setAudioFileMessage] = useState('');
    const [coverImageMessage, setCoverImageMessage] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    const handleAudioFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type.split('/')[0];
            if (fileType === 'audio') {
                setAudioFile(file);
                setAudioFileMessage('Audio file selected: ' + file.name);
            } else {
                setAudioFile(null);
                setAudioFileMessage('Please select a valid audio file.');
            }
        }
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type.split('/')[0];
            if (fileType === 'image') {
                setCoverImage(file);
                setCoverImageMessage('Cover image selected: ' + file.name);
            } else {
                setCoverImage(null);
                setCoverImageMessage('Please select a valid image file.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('album', album);
        formData.append('audio_file', audioFile);
        formData.append('cover_image', coverImage);
        formData.append('lyrics', lyrics);

        try {
            await createTrack(formData); // Ensure this function sends a POST request
            navigate('/'); // Redirect to the home page on success
        } catch (error) {
            console.error('Error uploading track:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="formContainer">
            <div className="formGroup">
                <input
                    type="text"
                    placeholder="Track Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="formGroup">
                <input
                    type="text"
                    placeholder="Album Name"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                />
            </div>
            <div className="formGroup">
                <label htmlFor="audioFile" className="fileLabel audioLabel">Audio File</label>
                <input
                    id="audioFile"
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioFileChange}
                    required
                />
                <p>{audioFileMessage}</p> {/* Display audio file message */}
            </div>
            <div className="formGroup">
                <label htmlFor="coverImage" className="fileLabel imageLabel">Cover Image</label>
                <input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    required
                />
                <p>{coverImageMessage}</p> {/* Display cover image message */}
            </div>
            <div className="formGroup">
                <textarea
                    placeholder="Lyrics"
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                />
            </div>
            <button type="submit">Upload Track</button>
        </form>
    );
};

export default TrackUploadForm;
