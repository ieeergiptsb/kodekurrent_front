import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RocketSplash.css';

const RocketSplash = ({ onComplete }) => {
    const [status, setStatus] = useState('PREPARING'); // PREPARING, IGNITION, LAUNCHING
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setStatus('IGNITION');
            setTimeout(() => setStatus('LAUNCHING'), 800);
            setTimeout(onComplete, 1800);
        }
    }, [countdown, onComplete]);

    return (
        <div className="rocket-splash-root">
            {/* Parallax Starfield */}
            <div className="rocket-starfield">
                {[...Array(100)].map((_, i) => (
                    <div
                        key={i}
                        className="rocket-star"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`
                        }}
                    />
                ))}
            </div>

            <div className="rocket-launch-container">
                <AnimatePresence>
                    <motion.div
                        className="rocket-vessel-wrapper"
                        initial={{ scale: 0.5, opacity: 0, y: 100 }}
                        animate={status === 'PREPARING' ? {
                            scale: 0.5,
                            opacity: 1,
                            y: [0, -2, 0], // Subtle shivering jitter
                            x: 0
                        } : status === 'IGNITION' ? {
                            scale: 0.5,
                            opacity: 1,
                            y: [0, -4, 0], // Intense shivering jitter
                            x: 0
                        } : {
                            scale: 0.5, // Keep scale consistent
                            y: -2500,  // Vertical ascent
                            opacity: [1, 1, 0],
                            transition: { duration: 2.0, ease: "easeIn" }
                        }}
                        transition={status !== 'LAUNCHING' ? {
                            duration: 0.05,
                            repeat: Infinity,
                        } : {}}
                    >
                        <img
                            src="/WhatsApp_Image_2026-03-17_at_10.46.51_PM-removebg-preview.png"
                            alt="Rocket"
                            className="rocket-vessel-img"
                        />

                        {/* Dual Side Thrust Effects */}
                        {(status === 'IGNITION' || status === 'LAUNCHING') && (
                            <div className="dual-thrusters">
                                <motion.div
                                    className="rocket-thrust left"
                                    initial={{ opacity: 0, scaleY: 0 }}
                                    animate={{ opacity: 1, scaleY: [1, 1.2, 1] }}
                                    transition={{ duration: 0.1, repeat: Infinity }}
                                />
                                <motion.div
                                    className="rocket-thrust right"
                                    initial={{ opacity: 0, scaleY: 0 }}
                                    animate={{ opacity: 1, scaleY: [1, 1.2, 1] }}
                                    transition={{ duration: 0.1, repeat: Infinity, delay: 0.05 }}
                                />
                            </div>
                        )}

                        {/* Engine Glow */}
                        <div className={`rocket-engine-glow ${status}`} />
                    </motion.div>
                </AnimatePresence>

                {/* Tactical HUD */}
                <div className="rocket-hud">
                    <motion.div
                        className="hud-countdown font-pixel"
                        animate={status === 'IGNITION' ? { color: '#f43f5e', scale: 1.2 } : {}}
                    >
                        {status === 'PREPARING' ? `T-MINUS ${countdown}` : status === 'IGNITION' ? "IGNITION" : "LIFT OFF"}
                    </motion.div>
                    <div className="hud-line" />
                    <p className="hud-status font-mono">
                        {status === 'PREPARING' ? "FUELING SYSTEMS..." : status === 'IGNITION' ? "THRUSTERS STABILIZING..." : "VEHICLE CLEARING TOWER"}
                    </p>
                </div>
            </div>

            {/* Skip Option */}
            <button
                onClick={onComplete}
                className="rocket-skip-btn font-mono"
            >
                [ OVERRIDE_LAUNCH_AND_ENTER ]
            </button>

            {/* Flash Effect on Launch */}
            {status === 'LAUNCHING' && (
                <motion.div
                    className="launch-flash"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5 }}
                />
            )}
        </div>
    );
};

export default RocketSplash;
