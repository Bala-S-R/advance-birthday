import React, { useEffect } from 'react';

const Celebration = ({ NAME, setPage }) => {
    useEffect(() => {
        document.title = "HAPPY BIRTHDAY VAISHU! 🎉 - Vaishu B'Day";
    }, []);

    return (
        <div className="celebration-page birthday-pop">
            <div className="celebration-grid">
                <div className="celebration-left">
                    <div className="cake-image-container">
                        <img
                            src="/realistic_cake.png"
                            alt="Three-tier birthday cake"
                            className="realistic-cake-img"
                        />
                    </div>
                </div>

                <div className="celebration-right">
                    <h1 className="celebration-title"><span className="emoji-span">🎉</span> It's Officially Birthday Time! <span className="emoji-span">🎉</span></h1>

                    <div className="celebration-message-modern">
                        Today we celebrate an amazing person.<br />
                        Thank you for bringing joy, laughter and great memories into our lives.
                    </div>

                    <div className="birthday-hero hero-glow-realistic">
                        Wish You Many More<br />
                        Happy Birthday<br />
                        <span className="celebrant-name">{NAME}!</span>
                    </div>

                </div>
            </div>

            {/* Navigation buttons */}
            <div className="next-page-container">
                <button className="back-btn" onClick={() => setPage('countdown')}>
                    ← Back (Countdown)
                </button>
                <button className="nav-button next-btn" onClick={() => setPage('gallery')}>
                    Next (Fun Memories <span className="emoji-span">📸</span>) →
                </button>
            </div>
        </div>
    );
};

export default Celebration;
