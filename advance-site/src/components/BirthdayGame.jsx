import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

const BirthdayGame = ({ setPage }) => {
    const [score, setScore] = useState(0);
    const [balloons, setBalloons] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30); // 30 seconds limit
    const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

    const TARGET_SCORE = 20;

    useEffect(() => {
        document.title = "🎮 Play Game - Vaishu B'Day";
    }, []);

    // Timer logic
    useEffect(() => {
        if (gameOver || timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameOver(true);
                    setGameStatus(score >= TARGET_SCORE ? 'won' : 'lost');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, gameOver, score]);

    // Trigger victory confetti
    const triggerVictoryConfetti = useCallback(() => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeRemaining = animationEnd - Date.now();

            if (timeRemaining <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeRemaining / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }, []);

    useEffect(() => {
        if (gameStatus === 'won') {
            triggerVictoryConfetti();
        }
    }, [gameStatus, triggerVictoryConfetti]);

    // Balloon generation logic
    const createBalloon = useCallback(() => {
        const id = Math.random().toString(36).substr(2, 9);
        const left = Math.random() * 80 + 10;
        const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        const size = Math.random() * 50 + 50; // Slightly larger hitboxes (50-100px)
        const duration = Math.random() * 3 + 3; // 3-6s

        return { id, left, color, size, duration };
    }, []);

    useEffect(() => {
        if (gameOver) return;

        const interval = setInterval(() => {
            if (balloons.length < 15) {
                setBalloons(prev => [...prev, createBalloon()]);
            }
        }, 600);

        return () => clearInterval(interval);
    }, [balloons.length, gameOver, createBalloon]);

    const popBalloon = (id) => {
        if (gameOver) return;

        setScore(prev => {
            const newScore = prev + 1;
            if (newScore >= TARGET_SCORE) {
                setGameOver(true);
                setGameStatus('won');
            }
            return newScore;
        });
        setBalloons(prev => prev.filter(b => b.id !== id));
    };

    const resetGame = () => {
        setScore(0);
        setBalloons([]);
        setGameOver(false);
        setTimeLeft(30);
        setGameStatus('playing');
    };

    return (
        <div className="game-page birthday-pop">
            <div className="game-header">
                <h1 className="page-title"><span className="emoji-span">🎮</span> Birthday Mini Game</h1>
                <div className="game-stats">
                    <div className="score-board">
                        Score: <span className="score-value">{score}</span> / {TARGET_SCORE}
                    </div>
                    <div className={`timer-board ${timeLeft < 10 ? 'timer-low' : ''}`}>
                        Time: <span className="timer-value">{timeLeft}s</span>
                    </div>
                </div>
            </div>

            <div className="game-area">
                {!gameOver ? (
                    balloons.map(balloon => (
                        <div
                            key={balloon.id}
                            className="game-balloon"
                            style={{
                                left: `${balloon.left}%`,
                                backgroundColor: balloon.color,
                                width: `${balloon.size}px`,
                                height: `${balloon.size * 1.3}px`,
                                animationDuration: `${balloon.duration}s`,
                                '--balloon-color': balloon.color
                            }}
                            onPointerDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                popBalloon(balloon.id);
                            }}
                            onAnimationEnd={() => setBalloons(prev => prev.filter(b => b.id !== balloon.id))}
                        >
                            <div className="balloon-shine"></div>
                            <div className="balloon-string"></div>
                        </div>
                    ))
                ) : (
                    <div className="game-over-screen">
                        {gameStatus === 'won' ? (
                            <>
                                <h2 className="victory-text"><span className="emoji-span">🎉</span> Amazing Job, Vaishu! <span className="emoji-span">🎉</span></h2>
                                <p className="victory-sub">You've popped all the balloons in time!</p>
                                <div className="victory-card">
                                    <p>Your speed and skill are unmatched!</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="loss-text"><span className="emoji-span">⏰</span> Time's Up! <span className="emoji-span">⏰</span></h2>
                                <p className="loss-sub">Don't worry, even MVPs need a warm-up!</p>
                                <div className="loss-card">
                                    <p>Score: {score} / {TARGET_SCORE}</p>
                                </div>
                            </>
                        )}
                        <div className="game-actions">
                            <button className="nav-button" onClick={resetGame}>
                                {gameStatus === 'won' ? "Play Again 🎮" : "Try Again 🔄"}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="game-instructions">
                {!gameOver && <p>Pop {TARGET_SCORE} balloons in 30 seconds! 🎈</p>}
            </div>

            <div className="next-page-container">
                <button className="back-btn" onClick={() => setPage('surprise')}>
                    ← Back (Gifts)
                </button>
                <button className="nav-button next-btn" onClick={() => setPage('thankyou')}>
                    Next (Thank You <span className="emoji-span">🙏</span>) →
                </button>
            </div>
        </div>
    );
};

export default BirthdayGame;
