// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        // Implement search functionality based on the search term
    };

    return (
        <input
            type="text"
            placeholder="Search tracks..."
            value={searchTerm}
            onChange={handleSearch}
        />
    );
};

export default SearchBar;
