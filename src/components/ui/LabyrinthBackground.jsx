import React from 'react';
import './LabyrinthBackground.css';

const LabyrinthBackground = () => {
    return (
        <div className="labyrinth-container">
            <div className="labyrinth-grid" />
            <div className="labyrinth-scanlines" />
            <div className="labyrinth-glow" />
        </div>
    );
};

export default LabyrinthBackground;
