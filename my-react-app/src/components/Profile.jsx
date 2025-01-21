// import React, { useEffect, useState } from 'react';
// import { fetchProfile } from '../api';

// const Profile = () => {
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const data = await fetchProfile(); // Fetch authenticated user's profile
//                 setProfile(data);
//             } catch (error) {
//                 if (error.response?.status === 401) {
//                     console.error('Unauthorized: Please log in again.');
//                 } else {
//                     console.error('Error fetching profile:', error);
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };
        
//         fetchUserProfile();
//     }, []);

//     if (loading) {
//         return <div>Loading profile...</div>;
//     }

//     if (!profile) {
//         return <div>No profile found. Please create one.</div>;
//     }

//     return (
//         <div>
//             <h2>{profile.user.username}'s Profile</h2>
//             <p>Bio: {profile.bio}</p>
//             <p>Birth Date: {profile.birth_date}</p>
//             <p>Location: {profile.location}</p>
//             {profile.picture && <img src={profile.picture} alt="Profile" />}
//         </div>
//     );
// };

// export default Profile;
