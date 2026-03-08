import React, { useEffect } from 'react';


const Layout = ({ children, setPage, currentPage }) => {
    useEffect(() => {
        const pagesWithBalloons = ['countdown', 'celebration', 'gallery', 'childhood', 'timeline', 'facts', 'wishwall', 'surprise'];

        if (!pagesWithBalloons.includes(currentPage)) return;

        const createBalloons = () => {
            const container = document.body;
            const colors = [
                'rgba(108, 99, 255, 0.6)',
                'rgba(255, 0, 255, 0.4)',
                'rgba(0, 255, 255, 0.4)',
                'rgba(255, 255, 255, 0.3)'
            ];

            const createdBalloons = [];
            for (let i = 0; i < 15; i++) {
                const balloon = document.createElement('div');
                balloon.className = 'balloon';
                balloon.style.left = `${Math.random() * 100}vw`;
                balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                balloon.style.backdropFilter = 'blur(5px)';
                balloon.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                balloon.style.animationDelay = `${Math.random() * 10}s`;
                balloon.style.animationDuration = `${10 + Math.random() * 10}s`;
                container.appendChild(balloon);
                createdBalloons.push(balloon);
            }
            return createdBalloons;
        };

        const balloons = createBalloons();

        return () => {
            if (balloons) {
                balloons.forEach(b => b.remove());
            }
        };
    }, [currentPage]);

    return (
        <div className="main-layout">
            <div className="content-area">
                {children}
            </div>
        </div>
    );
};

export default Layout;
