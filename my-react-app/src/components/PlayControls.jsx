// src/components/PlayControls.js
// import React from 'react';

// const PlayControls = ({ track }) => {
//     const handlePlay = () => {
//         if (!track.audio_file) {
//             alert('Audio file not available');
//             return;
//         }
//         const audio = new Audio(track.audio_file);
//         audio.play();
//     };

//     return (
//         <div className="play-controls">
//             <button onClick={handlePlay}>Play</button>
//         </div>
//     );
// };

// export default PlayControls;





import React, { useRef, useState, useEffect } from 'react';

const PlayControls = ({ track }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => {
            setCurrentTime(audio.currentTime);
        };

        const setAudioDuration = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', setAudioDuration);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', setAudioDuration);
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const audio = audioRef.current;
        const newTime = (e.target.value / 100) * duration;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="play-controls">
            <audio ref={audioRef} src={track.audio_file} preload="auto" />
            <div className="progress-container">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={duration ? (currentTime / duration) * 100 : 0}
                    onChange={handleSeek}
                    className="progress-bar"
                />
            </div>
            <div className="time-info">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
            <div className="control-buttons">
                <button onClick={togglePlay}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    );
};

export default PlayControls;

