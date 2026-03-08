import React, { useEffect } from 'react';

const ThankYou = ({ setPage }) => {
    useEffect(() => {
        document.title = "🙏 Thank You - Vaishu B'Day";
    }, []);

    return (
        <div className="thank-you-page fade-in birthday-pop">
            <h1 className="page-title"><span className="emoji-span">🙏</span> Thank You</h1>

            <div className="celebration-message-modern" style={{ textAlign: 'center', margin: '0 auto 4rem auto', borderLeft: 'none', borderBottom: '1px solid rgba(255, 215, 0, 0.3)', paddingLeft: '0', paddingBottom: '2rem' }}>
                <p>Thank you to everyone for the lovely birthday wishes! 🎉</p>
                <p>Your wishes, memories, and kind messages made this day even more special.</p>
                <p>Every message, every smile, and every moment shared means a lot and will always be remembered.</p>
                <p>Feeling truly grateful for all the love and positivity. <span className="emoji-span">💫</span></p>
            </div>

            <div className="content-area" style={{ padding: '0' }}>
                <h2 style={{ fontSize: '2rem', color: '#ffd700', marginBottom: '1rem' }}>With gratitude,</h2>
                <h1 style={{ fontSize: '4rem', fontFamily: "'Playfair Display', serif" }}>Vaishu <span className="emoji-span">✨</span></h1>
            </div>

            <div className="next-page-container" style={{ marginTop: '5rem' }}>
                <button className="back-btn" onClick={() => setPage('game')}>
                    ← Back (Mini-Game)
                </button>
                <button className="nav-button" onClick={() => {
                    const BIRTHDAY_DATE = new Date('2026-03-30T00:00:00').getTime();
                    const isBirthday = new Date().getTime() >= BIRTHDAY_DATE;
                    setPage(isBirthday ? 'celebration' : 'countdown');
                }}>
                    Back to Start 🏠
                </button>
            </div>
        </div>
    );
};

export default ThankYou;
