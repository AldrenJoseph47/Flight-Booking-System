import React from 'react';
import './Homepage.css'

const HomePage = () => {
    return (
        <div className="homepage">
            {/* <TopBar /> */}
            <video autoPlay loop muted className="background-video">
                <source src="fly.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="overlay">
                <h1>Ready to Fly With Us?</h1>
                <button className="get-started-button">Get Started</button>
            </div>
        </div>
    );
};

export default HomePage;