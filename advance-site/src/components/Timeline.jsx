import React, { useEffect } from 'react';

const Timeline = ({ setPage }) => {
    useEffect(() => {
        document.title = "🗺️ Journey - Vaishu B'Day";
    }, []);
    const events = [
        {
            year: "2001",
            title: "Born and started the adventure",
            icon: "👶",
            description: "The world became a brighter place the moment you arrived!"
        },
        {
            year: "2004",
            title: "First day of school",
            icon: "🎒",
            description: "The beginning of a long and wonderful learning journey."
        },
        {
            year: "2016",
            title: "High school memories",
            icon: "📚",
            description: "Chasing dreams and making friends that last a lifetime."
        },
        {
            year: "2018",
            title: "College days",
            icon: "🎓",
            description: "New horizons, new challenges, and a whole lot of growth."
        },
        {
            year: "2023",
            title: "QSpiders",
            icon: "💻",
            description: "Taking professional steps and building an amazing career."
        },
        {
            year: "2026",
            title: "Another amazing birthday 🎉",
            icon: "🎂",
            description: "Celebrating YOU and all the incredible things yet to come!"
        }
    ];

    return (
        <div className="timeline-page fade-in">
            <div className="timeline-header">
                <h1 className="page-title"><span className="emoji-span">🎉</span> Birthday Timeline </h1>
                <p className="timeline-subtitle">A journey through the wonderful years of your life.</p>
            </div>

            <div className="timeline-main">
                <div className="timeline-line"></div>
                {events.map((event, index) => (
                    <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} style={{ animationDelay: `${index * 0.2}s` }}>
                        <div className="timeline-dot">
                            <span className="timeline-icon">{event.icon}</span>
                        </div>
                        <div className="timeline-content">
                            <div className="timeline-year">{event.year}</div>
                            <h3 className="timeline-event-title">{event.title}</h3>
                            <p className="timeline-description">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="next-page-container">
                <button className="back-btn" onClick={() => setPage('childhood')}>
                    ← Back (Childhood)
                </button>
                <button className="nav-button next-btn" onClick={() => setPage('facts')}>
                    Next (Fun Facts <span className="emoji-span">🧠</span>) →
                </button>
            </div>
        </div>
    );
};

export default Timeline;
