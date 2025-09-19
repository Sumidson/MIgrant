import React from 'react';

const LoadingLogo = () => {
    return (
        <>
            <style>{`
        /* Container for the loader. */
        .loader-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.25rem;
        }

        /* The main SVG logo container. */
        .migrantcare-logo {
            width: 120px;
            height: 120px;
        }

        /* --- Animation Keyframes --- */

        /* Draws the shield outline into view */
        @keyframes draw-shield {
            from {
                stroke-dashoffset: 280;
            }
            to {
                stroke-dashoffset: 0;
            }
        }

        /* Fades in and creates a gentle pulsing/breathing effect for the heart */
        @keyframes pulse-heart {
            0% {
                opacity: 0;
                transform: scale(0.95);
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes glow-heart {
             0%, 100% {
                filter: drop-shadow(0 0 3px rgba(37, 99, 235, 0.3));
             }
             50% {
                filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.5));
             }
        }

        /* Draws the digital pulse line continuously */
        @keyframes draw-pulse-line {
            0% {
                stroke-dashoffset: 80;
            }
            40% {
                stroke-dashoffset: 0;
            }
            80% {
                stroke-dashoffset: 0;
            }
            100% {
                stroke-dashoffset: -80;
            }
        }

        /* --- Element Styling & Animation Application --- */

        .shield-outline {
            stroke-dasharray: 280;
            stroke-dashoffset: 280;
            animation: draw-shield 1.5s ease-out forwards;
        }

        .heart-fill {
            opacity: 0;
            transform-origin: center;
            animation: pulse-heart 1.5s ease-out forwards, glow-heart 2.5s ease-in-out 1.5s infinite;
        }

        .pulse-line {
            stroke-dasharray: 80;
            stroke-dashoffset: 80;
            animation: draw-pulse-line 2.5s ease-in-out 1s infinite;
        }

        .loading-text {
            font-size: 1.1rem;
            font-weight: 500;
            color: #475569; /* Tailwind's slate-600 */
            letter-spacing: 0.5px;
        }
      `}</style>
            <div className="loader-container">
                {/* SVG Logo */}
                <svg className="migrantcare-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    {/* Shield Outline */}
                    <path
                        className="shield-outline"
                        d="M50 5 L95 25 V55 C95 85 50 95 50 95 C50 95 5 85 5 55 V25 Z"
                        fill="none"
                        stroke="#d1d5db"  /* Tailwind's gray-300 */
                        strokeWidth="2"
                    />

                    {/* Heart Shape (Filled) */}
                    <path
                        className="heart-fill"
                        d="M50 65C46 58 25 45 25 32 A12 12 0 1 1 50 28 A12 12 0 1 1 75 32 C75 45 54 58 50 65Z"
                        fill="#2563eb" /* Theme Blue */
                    />

                    {/* Digital Pulse Line */}
                    <path
                        className="pulse-line"
                        d="M30 45 H 42 L 47 40 L 53 50 L 58 45 H 70"
                        fill="none"
                        stroke="#10b981" /* Theme Teal/Emerald */
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <p className="loading-text">Loading Securely...</p>
            </div>
        </>
    );
};

export default LoadingLogo;

