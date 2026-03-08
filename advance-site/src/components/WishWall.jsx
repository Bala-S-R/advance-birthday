import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const WishWall = ({ setPage }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [wishes, setWishes] = useState([
        {
            id: 1,
            name: "Friend 🎉",
            message: "Advance Happy Birthday! I’m really lucky to have a friend like you. May your day be filled with happiness, laughter, and lots of sweet memories.",
            likes: 5,
            symbol: "🎉"
        },
        {
            id: 2,
            name: "Best Friend 💫",
            message: "Advance Happy Birthday to my best friend! Life is so much more fun with you by my side. Thank you for always being there for me. I hope this year brings you everything you dream of.",
            likes: 12,
            symbol: "💫"
        },
        {
            id: 3,
            name: "Future Hubby ❤️",
            message: "Advance Happy Birthday, my love! I can’t wait for all the birthdays we’ll celebrate together in the future. You make my life more beautiful every day, and I’m so lucky to have you. 🎂💖",
            likes: 99,
            symbol: "❤️"
        }
    ]);

    useEffect(() => {
        document.title = "💌 Wish Wall - Vaishu B'Day";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        const CHAT_ID = "1126185409";
        const BOT_TOKEN = "8638725696:AAEXh2fQMc1XlEx_2q2MdOrFQLuNgpMZO5E";

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const device = navigator.userAgent.includes('Mobi') ? 'Mobile' : 'Desktop';
        const platform = navigator.platform;

        const newWish = {
            id: Date.now(),
            name: name,
            message: message,
            likes: 0,
            symbol: "✨"
        };

        // Instant UI Update
        setWishes([newWish, ...wishes]);
        const submittedName = name;
        const submittedMsg = message;
        setName('');
        setMessage('');

        // Trigger confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Telegram Notification
        const telegramMsg = `🎉 New Birthday Wish\n👤 Name: ${submittedName}\n💬 Message: ${submittedMsg}\n🕒 Time: ${timeString}\n📱 Device: ${device} (${platform})\n🌍 From Website`;

        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: telegramMsg
                })
            });
        } catch (error) {
            console.error("Telegram notification failed:", error);
        }
    };

    const handleLike = (id) => {
        setWishes(wishes.map(wish =>
            wish.id === id ? { ...wish, likes: wish.likes + 1 } : wish
        ));
    };

    return (
        <div className="wish-wall-page birthday-pop">
            <h1 className="page-title"><span className="emoji-span">💌</span> Birthday Wish Wall</h1>

            <form className="wish-form" onSubmit={handleSubmit}>
                <h2 className="form-heading">Leave a Birthday Wish 💌</h2>
                <div className="form-group">
                    <label>Your Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type your name..."
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Your Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write something sweet..."
                        rows="3"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="nav-button submit-wish">Submit Wish ✨</button>
            </form>

            <div className="wish-board-container">
                <h2 className="board-heading">Live Wish Wall ✨</h2>
                <div className="wish-board">
                    {wishes.map(wish => (
                        <div key={wish.id} className="wish-card fade-in">
                            <div className="wish-header">
                                <span className="wish-name">{wish.name}</span>
                                <span className="wish-symbol">{wish.symbol}</span>
                            </div>
                            <p className="wish-message">{wish.message}</p>
                            <div className="wish-footer">
                                <button className="like-button" onClick={() => handleLike(wish.id)}>
                                    ❤️ {wish.likes}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="next-page-container">
                <button className="back-btn" onClick={() => setPage('facts')}>
                    ← Back (Fun Facts)
                </button>
                <button className="nav-button next-btn" onClick={() => setPage('surprise')}>
                    Next (Gifts <span className="emoji-span">🎁</span>) →
                </button>
            </div>
        </div>
    );
};

export default WishWall;
