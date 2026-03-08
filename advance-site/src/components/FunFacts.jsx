import React, { useEffect } from 'react';

const FunFacts = ({ setPage }) => {
    useEffect(() => {
        document.title = "🧠 Fun Facts - Vaishu B'Day";
    }, []);
    const facts = [
        {
            category: "🎮 Favorite Game",
            value: "Shuttle (Badminton)",
            icon: "🏸"
        },
        {
            category: "🍕 Favorite Food",
            value: "Puli Satham, Idly with Tomato Chutney",
            icon: "🍽️"
        },
        {
            category: "🌍 Dream Destination",
            value: "Wherever I wish… with my life partner",
            icon: "✈️"
        },
        {
            category: "🎵 Favorite Songs",
            value: "Yuvan Shankar Raja songs",
            icon: "🎶"
        },
        {
            category: "🎬 Favorite Movies",
            value: "Vinnaithaandi Varuvaayaa (VTV), Shajahan",
            icon: "🍿"
        },
        {
            category: "🍫 Favorite Chocolates & Sweets",
            value: "KitKat, Burfi",
            icon: "🍬"
        }
    ];

    return (
        <div className="facts-page fade-in">
            <div className="facts-header">
                <h1 className="page-title"><span className="emoji-span">🧠</span> Fun Facts About the Birthday Star <span className="emoji-span">🎉</span></h1>
                <p className="facts-intro">
                    Everyone has their favorites!<br />
                    Here are some things Vaishu absolutely loves.
                </p>
            </div>

            <div className="facts-grid">
                {facts.map((fact, index) => (
                    <div key={index} className="fact-card" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="fact-icon"><span className="emoji-span">{fact.icon}</span></div>
                        <div className="fact-content">
                            <h3 className="fact-category">{fact.category}</h3>
                            <p className="fact-value">{fact.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="next-page-container">
                <button className="back-btn" onClick={() => setPage('timeline')}>
                    ← Back (Timeline)
                </button>
                <button className="nav-button next-btn" onClick={() => setPage('wishwall')}>
                    Next (Wish Wall <span className="emoji-span">💌</span>) →
                </button>
            </div>
        </div>
    );
};

export default FunFacts;
