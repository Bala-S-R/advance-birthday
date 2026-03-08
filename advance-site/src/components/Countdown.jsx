import React, { useEffect } from 'react';

const Countdown = ({ timeLeft, NAME, handleMidnight, setPage }) => {
    useEffect(() => {
        document.title = "Vaishu B'Day 🎂";
    }, []);

    const BIRTHDAY_DATE = new Date('2026-03-30T00:00:00').getTime();
    const isBirthday = new Date().getTime() >= BIRTHDAY_DATE;

    return (
        <div className="countdown-page fade-in">
            <h1 className="page-title">
                {isBirthday
                    ? <span className="emoji-span">Wish You Many More Happy Birthday {NAME}</span>
                    : <><span className="emoji-span">🎉</span> Advance Happy Birthday {NAME} <span className="emoji-span">🎉</span></>}
            </h1>
            <p className="message">
                The countdown has started!<br />
                Something special is coming...<br /><br />
                Stay here until midnight to celebrate together <span className="emoji-span">🎂</span>
            </p>

            <div className="countdown">
                <div className="countdown-item">
                    <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
                    <span className="countdown-label">Days</span>
                </div>
                <div className="countdown-item">
                    <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="countdown-label">Hours</span>
                </div>
                <div className="countdown-item">
                    <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="countdown-label">Mins</span>
                </div>
                <div className="countdown-item">
                    <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="countdown-label">Secs</span>
                </div>
            </div>

            {isBirthday && (
                <div className="next-page-container">
                    <button className="nav-button next-btn" onClick={() => setPage('celebration')}>
                        Next (Birthday Surprise <span className="emoji-span">🎂</span>) →
                    </button>
                </div>
            )}

            <div className="next-page-container">
                <button className="nav-button next-btn" onClick={() => setPage('gallery')}>
                    Next (Fun Memories <span className="emoji-span">📸</span>) →
                </button>
            </div>
        </div>
    );
};

export default Countdown;
