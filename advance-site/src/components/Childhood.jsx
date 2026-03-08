import React, { useEffect } from 'react';

const Childhood = ({ setPage, setSelectedPhoto }) => {
    const photos = [
        'one.jpeg', 'two.jpeg', 'three.jpeg', 'four.jpeg', 'five.jpeg', 'six.jpeg',
        'seven.jpeg', 'eight.jpeg', 'nine.jpeg', 'ten.jpeg', 'eleven.jpeg', 'twelve.jpeg',
        'thirteen.jpeg', 'fourteen.jpeg', 'fifteen.jpeg', 'sixteen.jpeg'
    ];

    useEffect(() => {
        document.title = "👶 Childhood Memories - Vaishu B'Day";
    }, []);

    return (
        <div className="childhood-page fade-in birthday-pop">
            <h1 className="page-title"><span className="emoji-span">👶</span> Little Vaishu</h1>
            <p className="gallery-subtitle">Where it all began... precious moments!</p>
            <div className="gallery-grid">
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className="gallery-item"
                        onClick={() => setSelectedPhoto(`/childhood/${photo}`)}
                    >
                        <img src={`/childhood/${photo}`} alt={`Childhood Memory ${index + 1}`} loading="lazy" />
                        <div className="gallery-overlay"><span className="emoji-span">🍼</span></div>
                    </div>
                ))}
            </div>
            {/* Navigation buttons */}
            <div className="next-page-container">
                <button className="back-btn" onClick={() => setPage('gallery')}>
                    ← Back (Gallery)
                </button>
                <button className="nav-button next-btn" onClick={() => setPage('timeline')}>
                    Next (Birthday Journey <span className="emoji-span">🗺️</span>) →
                </button>
            </div>
        </div>
    );
};

export default Childhood;
