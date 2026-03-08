import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import Countdown from './components/Countdown';
import Celebration from './components/Celebration';
import Gallery from './components/Gallery';
import Childhood from './components/Childhood';
import WishWall from './components/WishWall';
import Surprise from './components/Surprise';
import Timeline from './components/Timeline';
import FunFacts from './components/FunFacts';
import BirthdayGame from './components/BirthdayGame';
import ThankYou from './components/ThankYou';
import confetti from 'canvas-confetti';
import './style.css';

const BIRTHDAY_DATE = new Date('2026-03-30T00:00:00').getTime();
const NAME = 'Vaishu';

const App = () => {
    const [page, setPage] = useState('countdown');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const audioContextRef = useRef(null);
    const fireworksIntervalRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    useEffect(() => {
        if (page === 'countdown') {
            const timer = setInterval(() => {
                const now = new Date().getTime();
                const distance = BIRTHDAY_DATE - now;

                if (distance < 0) {
                    clearInterval(timer);
                    handleMidnight();
                    return;
                }

                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [page]);

    const handleMidnight = () => {
        setPage('celebration');
        triggerBirthdayEffects();
    };

    const triggerBirthdayEffects = () => {
        confetti({ particleCount: 300, spread: 150, origin: { y: 0.6 } });
        startFireworks();
        playMusic();
    };

    const startFireworks = () => {
        if (fireworksIntervalRef.current) return;
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        fireworksIntervalRef.current = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                startFireworks();
                clearInterval(fireworksIntervalRef.current);
                fireworksIntervalRef.current = null;
                return;
            }
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const playMusic = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const audioContext = audioContextRef.current;
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.type = 'sine';
        const melody = [
            { freq: 261.63, duration: 0.5 }, { freq: 261.63, duration: 0.5 },
            { freq: 293.66, duration: 1 }, { freq: 261.63, duration: 1 },
            { freq: 349.23, duration: 1 }, { freq: 329.63, duration: 2 },
        ];
        let time = audioContext.currentTime;
        melody.forEach(note => {
            oscillator.frequency.setValueAtTime(note.freq, time);
            gainNode.gain.setValueAtTime(0.1, time);
            time += note.duration;
        });
        oscillator.start();
        oscillator.stop(time);
    };

    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <Layout setPage={setPage} currentPage={page}>
            <div id="app">
                {page === 'countdown' && (
                    <Countdown
                        timeLeft={timeLeft}
                        NAME={NAME}
                        handleMidnight={handleMidnight}
                        setPage={setPage}
                    />
                )}
                {page === 'celebration' && (
                    <Celebration
                        NAME={NAME}
                        setPage={setPage}
                    />
                )}
                {page === 'gallery' && (
                    <Gallery
                        setPage={setPage}
                        setSelectedPhoto={setSelectedPhoto}
                    />
                )}
                {page === 'childhood' && (
                    <Childhood
                        setPage={setPage}
                        setSelectedPhoto={setSelectedPhoto}
                    />
                )}
                {page === 'wishwall' && (
                    <WishWall
                        setPage={setPage}
                    />
                )}
                {page === 'surprise' && (
                    <Surprise
                        setPage={setPage}
                    />
                )}
                {page === 'game' && (
                    <BirthdayGame
                        setPage={setPage}
                    />
                )}
                {page === 'facts' && (
                    <FunFacts
                        setPage={setPage}
                    />
                )}
                {page === 'timeline' && (
                    <Timeline
                        setPage={setPage}
                    />
                )}
                {page === 'thankyou' && (
                    <ThankYou
                        setPage={setPage}
                    />
                )}
            </div>

            {/* Global Lightbox */}
            {selectedPhoto && (
                <div className="lightbox-overlay" onClick={() => setSelectedPhoto(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedPhoto.startsWith('/') ? selectedPhoto : `/${selectedPhoto}`}
                            alt="Selected Memory"
                            className="preview-img"
                        />
                        <button className="close-lightbox" onClick={() => setSelectedPhoto(null)}>
                            Close Preview ×
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default App;
