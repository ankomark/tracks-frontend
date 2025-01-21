
// import React, { useEffect, useState } from 'react';
// import { fetchTracks } from '../api';
// import TrackItem from './TrackItem';
// import SearchBar from './SearchBar';

// const TrackList = () => {
//     const [tracks, setTracks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchTrackData = async () => {
//             try {
//                 const data = await fetchTracks();
//                 setTracks(data);
//             } catch (err) {
//                 setError('Failed to load tracks. Please try again.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchTrackData();
//     }, []);

//     if (loading) {
//         return <div>Loading tracks...</div>;
//     }

//     if (error) {
//         return <div className="error">{error}</div>;
//     }

//     return (
//         <div className="page-container">
//             <SearchBar />
//             <div className="track-list">
//                 {tracks.map((track) => (
//                     <TrackItem key={track.id} track={track} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default TrackList;
import React, { useEffect, useState } from 'react';
import { fetchTracks } from '../api';
import TrackItem from './TrackItem';
import SearchBar from './SearchBar';

const TrackList = () => {
    const [tracks, setTracks] = useState([]);
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrackData = async () => {
            try {
                const data = await fetchTracks();
                setTracks(data);
                setFilteredTracks(data); // Initially, set filteredTracks to all tracks
            } catch (err) {
                setError('Failed to load tracks. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchTrackData();
    }, []);

    const handleSearch = (searchTerm) => {
        if (searchTerm) {
            const filtered = tracks.filter((track) =>
                track.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredTracks(filtered);
        } else {
            setFilteredTracks(tracks); // Reset to original tracks if search term is empty
        }
    };

    if (loading) {
        return <div>Loading tracks...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="page-container">
            <SearchBar onSearch={handleSearch} />
            <div className="track-list">
                {filteredTracks.map((track) => (
                    <TrackItem key={track.id} track={track} />
                ))}
            </div>
        </div>
    );
};

export default TrackList;
