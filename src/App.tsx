import React from 'react';
import './App.css';
import { CollectionCarousel } from './components/CollectionCarousel';
import { StoryCarousel } from './components/StoryCarousel';

export const App = () => (
    <div className="App">
        <CollectionCarousel />
        <StoryCarousel />
    </div>
);
