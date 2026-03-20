import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SpaceshipSplash.css';

const SpaceshipSplash = ({ onComplete }) => {
    const [status, setStatus] = useState('PREPARING'); // PREPARING, LAUNCHING
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setStatus('LAUNCHING');
            // Complete after launch animation
            setTimeout(onComplete, 2500);
        }
    }, [countdown, onComplete]);

    return (
        <div className="spaceship-splash-root">
            {/* Animated Starfield */}
            <div className="star-container">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="star"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            width: `${Math.random() * 3}px`,
                            height: `${Math.random() * 3}px`
                        }}
                    />
                ))}
            </div>

            <div className="launch-pad">
                <AnimatePresence>
                    <motion.div
                        className="spaceship-wrapper"
                        initial={{ y: 0, opacity: 0 }}
                        animate={status === 'PREPARING' ? {
                            y: [0, -5, 0],
                            opacity: 1,
                            rotateX: [0, 2, 0],
                            x: [0, 1, -1, 0]
                        } : {
                            y: -1500,
                            scale: 0.8,
                            opacity: [1, 1, 0],
                            transition: { duration: 2, ease: "easeIn" }
                        }}
                        transition={status === 'PREPARING' ? {
                            duration: 0.1,
                            repeat: Infinity,
                        } : {}}
                    >
                        <img
                            src="/images.jpeg"
                            alt="Spaceship"
                            className="spaceship-img"
                        />

                        {/* Engine Glow */}
                        <motion.div
                            className="engine-glow"
                            animate={{
                                opacity: status === 'PREPARING' ? [0.4, 0.8, 0.4] : 1,
                                scale: status === 'PREPARING' ? [1, 1.2, 1] : 2
                            }}
                            transition={{ duration: 0.2, repeat: Infinity }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* UI Overlay */}
                <div className="launch-ui">
                    <motion.h1
                        className="font-pixel text-primary text-2xl md:text-4xl mb-4"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        {status === 'PREPARING' ? `T-MINUS ${countdown}` : "IGNITION"}
                    </motion.h1>
                    <p className="font-mono text-secondary text-xs tracking-[0.3em] uppercase opacity-60">
                        {status === 'PREPARING' ? "System checks in progress..." : "Warp drive engaged"}
                    </p>
                </div>
            </div>

            {/* Skip Button */}
            <button
                onClick={onComplete}
                className="skip-btn font-mono text-white/30 hover:text-white transition-colors text-[10px] uppercase tracking-[0.4em]"
            >
                [ Abort and Enter Labyrinth ]
            </button>
        </div>
    );
};

export default SpaceshipSplash;
