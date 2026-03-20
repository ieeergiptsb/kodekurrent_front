import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SciFiSplashScreen.css';

const BOOT_LOGS = [
    "INITIALIZING KERNEL...",
    "MAPPING LABYRINTH GEOMETRY...",
    "ESTABLISHING SECURE CONNECTION...",
    "BYPASSING FIREWALLS...",
    "DATA STREAM SYNCHRONIZED.",
    "INTERFACE LOADING...",
    "SYSTEM READY."
];

const SciFiSplashScreen = ({ onComplete }) => {
    const [currentLogIndex, setCurrentLogIndex] = useState(0);
    const [isBooted, setIsBooted] = useState(false);

    useEffect(() => {
        if (currentLogIndex < BOOT_LOGS.length) {
            const timeout = setTimeout(() => {
                setCurrentLogIndex(prev => prev + 1);
            }, 300 + Math.random() * 500);
            return () => clearTimeout(timeout);
        } else {
            setTimeout(() => setIsBooted(true), 500);
        }
    }, [currentLogIndex]);

    return (
        <motion.div
            className="scifi-splash-root"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            {/* Background Grid */}
            <div className="scifi-splash-grid" />

            <div className="scifi-splash-content">
                {!isBooted ? (
                    <div className="scifi-boot-sequence">
                        <div className="terminal-header">
                            <span className="terminal-dot red" />
                            <span className="terminal-dot yellow" />
                            <span className="terminal-dot green" />
                            <span className="terminal-title">SYSTEM_BOOT.LOG</span>
                        </div>
                        <div className="terminal-body font-mono">
                            {BOOT_LOGS.slice(0, currentLogIndex + 1).map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="log-line"
                                >
                                    <span className="log-prompt">{">"}</span> {log}
                                </motion.div>
                            ))}
                            {currentLogIndex < BOOT_LOGS.length && (
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="cursor"
                                >
                                    _
                                </motion.span>
                            )}
                        </div>
                    </div>
                ) : (
                    <motion.div
                        className="scifi-portal-sequence flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="relative mb-12">
                            {/* Circular Portal Pulse */}
                            <motion.div
                                className="portal-ring ring-1"
                                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div
                                className="portal-ring ring-2"
                                animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            />
                            <div className="portal-core">
                                <motion.div
                                    className="portal-inner"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </div>

                        <motion.h1
                            className="text-4xl md:text-6xl font-pixel text-primary glitch-text mb-8"
                            data-text="ENTER THE LABYRINTH"
                            initial={{ letterSpacing: "0.5em", opacity: 0 }}
                            animate={{ letterSpacing: "0.1em", opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            ENTER THE LABYRINTH
                        </motion.h1>

                        <motion.button
                            className="boot-button font-pixel px-8 py-4 bg-primary/20 border-2 border-primary text-white hover:bg-primary hover:text-black transition-all"
                            onClick={onComplete}
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            INITIATE CONNECTION
                        </motion.button>
                    </motion.div>
                )}
            </div>

            {/* Persistence Navigation */}
            <div className="absolute bottom-8 right-8 z-50">
                <button
                    onClick={onComplete}
                    className="font-mono text-secondary/40 hover:text-secondary text-xs uppercase tracking-[0.3em] transition-colors cursor-pointer flex items-center gap-2"
                >
                    [ SKIP_SYSTEM_BOOTING ]
                </button>
            </div>

            {/* CRT Flicker Overlay */}
            <div className="crt-overlay" />
        </motion.div>
    );
};

export default SciFiSplashScreen;
