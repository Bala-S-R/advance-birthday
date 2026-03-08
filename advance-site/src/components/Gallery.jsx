import React, { useEffect } from 'react';

const Gallery = ({ setPage, setSelectedPhoto }) => {
    const photos = [
        'one..jpg', 'two..jpg', 'three..jpg', 'four..jpg', 'five..jpg', 'six..jpg',
        'seven.jpg', 'eight.jpg', 'nine.jpg', 'ten.jpg', 'eleven.jpg', 'twelve.jpg',
        'thirteen.jpg', 'fourteen.jpg', 'fifteen.jpg', 'sixteen.jpg'
    ];

    useEffect(() => {
        document.title = "📸 Fun Memories - Vaishu B'Day";
    }, []);

    return (
        <div className="gallery-page fade-in birthday-pop">
            <h1 className="page-title"><span className="emoji-span">📸</span> Fun Memories</h1>
            <p className="gallery-subtitle">Funny moments that we cherish forever</p>
            <div className="gallery-grid">
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className="gallery-item"
                        onClick={() => setSelectedPhoto(`/memories/${photo}`)}
                    >
                        <img src={`/memories/${photo}`} alt={`Fun Memory ${index + 1}`} loading="lazy" />
                        <div className="gallery-overlay"><span className="emoji-span">✨</span></div>
                    </div>
                ))}
            </div>

            {/* Navigation buttons */}
            <div className="next-page-container">
                <button className="back-btn" onClick={() => {
                    const BIRTHDAY_DATE = new Date('2026-03-30T00:00:00').getTime();
                    const isBirthday = new Date().getTime() >= BIRTHDAY_DATE;
                    setPage(isBirthday ? 'celebration' : 'countdown');
                }}>
                    ← Back ({new Date().getTime() >= new Date('2026-03-30T00:00:00').getTime() ? 'Celebration' : 'Countdown'})
                </button>
                <button className="nav-button next-btn" onClick={() => setPage('childhood')}>
                    Next (Baby Vaishu <span className="emoji-span">👶</span>) →
                </button>
            </div>
        </div>
    );
};

export default Gallery;
