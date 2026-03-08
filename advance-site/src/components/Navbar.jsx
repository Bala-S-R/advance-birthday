import React, { useState } from 'react';

const Navbar = ({ currentPage, setPage }) => {
    const [isOpen, setIsOpen] = useState(false);

    const BIRTHDAY_DATE = new Date('2026-03-30T00:00:00').getTime();
    const isBirthday = new Date().getTime() >= BIRTHDAY_DATE;

    const navLinks = [
        { id: 'celebration', label: <>WISH <span className="emoji-span">🎂</span></>, hideBeforeBirthday: true },
        { id: 'gallery', label: <>FUN <span className="emoji-span">📸</span></> },
        { id: 'childhood', label: <>BABY <span className="emoji-span">👶</span></> },
        { id: 'timeline', label: <>JOURNEY <span className="emoji-span">🗺️</span></> },
        { id: 'facts', label: <>FACTS <span className="emoji-span">🧠</span></> },
        { id: 'wishwall', label: <>WISHES <span className="emoji-span">💌</span></> },
        { id: 'surprise', label: <>GIFTS <span className="emoji-span">🎁</span></> },
        { id: 'game', label: <>PLAY <span className="emoji-span">🎮</span></> }
    ].filter(link => !link.hideBeforeBirthday || isBirthday);


    return (
        <nav className="navbar fade-in">
            <div className="nav-container">
                <div className="nav-logo" onClick={() => setPage(isBirthday ? 'celebration' : 'countdown')}>
                    VAISHU'S DAY <span className="emoji-span">✨</span>
                </div>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    {navLinks.map(link => (
                        <button
                            key={link.id}
                            className={`nav-link-btn ${currentPage === link.id ? 'active' : ''}`}
                            onClick={() => {
                                setPage(link.id);
                                setIsOpen(false);
                            }}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                <div className="nav-mobile-btn" onClick={() => setIsOpen(!isOpen)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
