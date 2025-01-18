// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import TrackList from './components/TrackList';
import Profile from './components/Profile';
import Playlist from './components/Playlist';
import Comments from './components/Comments';
import LikeButton from './components/LikeButton';
import Categories from './components/Categories';
import UploadTrackPage from './components/UploadTrackPage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage';
import FavoritesPage from './components/FavoritesPage';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage/> } />
                <Route path="/tracks" element={<TrackList />} />
                <Route path="/profiles" element={<Profile />} />
                <Route path="/playlists" element={<Playlist />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="/LikeButton" element={<LikeButton />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />

                <Route
                    path="/UploadTrackPage"
                    element={
                        <ProtectedRoute>
                            <UploadTrackPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
