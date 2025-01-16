// src/components/Categories.js
import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../api';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryData = async () => {
            const data = await fetchCategories();
            setCategories(data);
            setLoading(false);
        };
        fetchCategoryData();
    }, []);

    if (loading) {
        return <div>Loading categories...</div>;
    }

    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <h3>{category.name}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
