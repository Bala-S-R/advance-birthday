import React, { useState, useEffect } from 'react';

const Surprise = ({ setPage }) => {
    const [message, setMessage] = useState("");
    const [isRevealing, setIsRevealing] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    const COOLDOWN_HOURS = 12;
    const COOLDOWN_MS = COOLDOWN_HOURS * 60 * 60 * 1000;

    const messages = [
        "Another year of being awesome begins today!",
        "Life is a party, and today you're the guest of honor!",
        "Your smile makes every day brighter!",
        "Cheers to more adventures and unforgettable moments!",
        "You make every gathering more fun!",
        "Keep shining and spreading happiness everywhere!",
        "Today is all about celebrating YOU!",
        "Another year older, wiser, and even more amazing!",
        "The world is better because you're in it!",
        "May your day be filled with laughter and cake!",
        "Calories don't count on birthdays!",
        "Birthdays are nature's way of telling us to eat more cake!",
        "Growing older is mandatory, growing up is optional!",
        "More candles means more wishes!",
        "Party mode: Activated!",
        "Let's celebrate like there's no tomorrow!",
        "Your birthday is the perfect excuse for cake!",
        "Another year, another level unlocked!",
        "A surprise smile just for you today!",
        "Here's a little extra happiness for your birthday!",
        "Sending a burst of birthday joy!",
        "Hope today brings you unexpected smiles!"
    ];

    // Check cooldown on mount
    useEffect(() => {
        document.title = "🎁 Gifts - Vaishu B'Day";
        checkCooldown();
        const timer = setInterval(checkCooldown, 1000);
        return () => clearInterval(timer);
    }, []);

    const checkCooldown = () => {
        const lastReveal = localStorage.getItem('lastRevealTime');
        if (lastReveal) {
            const elapsed = Date.now() - parseInt(lastReveal);
            if (elapsed < COOLDOWN_MS) {
                setIsLocked(true);
                setTimeLeft(COOLDOWN_MS - elapsed);
                return;
            }
        }
        setIsLocked(false);
        setTimeLeft(0);
    };

    const formatTime = (ms) => {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const revealSurprise = () => {
        if (isRevealing || isLocked) return;

        setIsRevealing(true);
        // Random message selection
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];

        setTimeout(() => {
            setMessage(randomMsg);
            setIsRevealing(false);
            // Set cooldown
            localStorage.setItem('lastRevealTime', Date.now().toString());
            checkCooldown();
        }, 1000);
    };

    return (
        <div className="surprise-page birthday-pop">
            <h1 className="page-title"><span className="emoji-span">🎁</span> Random Birthday Surprise</h1>

            <div className="surprise-container">
                <div className={`surprise-message-box ${isRevealing ? 'scaling' : ''}`}>
                    {message ? (
                        <p className="surprise-text">"{message}"</p>
                    ) : (
                        <p className="surprise-placeholder">Tap reveal for a surprise wish... ✨</p>
                    )}
                </div>

                <button
                    className={`nav-button reveal-button ${isLocked ? 'locked' : ''}`}
                    onClick={revealSurprise}
                    disabled={isLocked || isRevealing}
                >
                    {isRevealing ? "Revealing... ✨" : isLocked ? "Surprise Locked 🔒" : "Reveal Surprise Message 🎁"}
                </button>

                {isLocked && (
                    <div className="cooldown-notice">
                        <p className="cooldown-timer">Next surprise in: <span className="timer-value">{formatTime(timeLeft)}</span></p>
                    </div>
                )}
            </div>

            <div className="next-page-container">
                <button className="back-btn" onClick={() => setPage('wishwall')}>
                    ← Back (Wish Wall)
                </button>
                <button className="nav-button next-btn" onClick={() => setPage('game')}>
                    Next (Mini-Game <span className="emoji-span">🎮</span>) →
                </button>
            </div>
        </div>
    );
};

export default Surprise;
