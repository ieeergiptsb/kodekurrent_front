import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import './SciFiBackground.css';

const sectionImages = {
    'home': "/images_k/hero-bg.jpg",
    'about': "/images_k/docs-bg.jpg",
    'timeline': "/images_k/timeline.jpeg",
    'sponsors': "/images_k/sponsor%20and%20bounty.jpeg",
    'prizes': "/images_k/sponsor%20and%20bounty.jpeg",
    'gallery': "/images_k/gallery.jpeg",
    'team': "/images_k/gallery.jpeg",
    'faq': "/images_k/features-bg.jpg",
    'contact': "/images_k/footer-bg.jpg"
};

const SciFiBackground = () => {
    const [activeSection, setActiveSection] = useState('home');

    // Use MotionValues for smooth interaction
    const { scrollY } = useScroll();
    // Instead of backgroundPositionX (which causes repaints), we use x (translate3d) which is GPU accelerated
    // We map scroll from 0-5000px to move the background horizontally by -5vw to 5vw
    const bgX = useTransform(scrollY, [0, 5000], ["-5vw", "5vw"]);
    
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Add spring physics for high-performance smoothing
    const springConfig = { damping: 30, stiffness: 200, restDelta: 0.001 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    // Map smooth mouse values to rotations
    const rotateX = useTransform(smoothMouseY, [0, 1], [2, -2]);
    const rotateY = useTransform(smoothMouseX, [0, 1], [-2, 2]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: Array.from({length: 11}, (_, i) => i * 0.1) // [0, 0.1, 0.2 ... 1]
        };

        const currentRatios = new Map();

        const handleIntersect = (entries) => {
            entries.forEach(entry => {
                currentRatios.set(entry.target.id, entry.intersectionRatio);
            });
            
            let maxRatio = 0;
            let bestSection = null;
            
            // First pass: find the maximum ratio
            currentRatios.forEach((ratio, id) => {
                if (ratio > maxRatio) {
                    maxRatio = ratio;
                    bestSection = id;
                }
            });
            
            // Only update if a highly visible section is found and it's changed
            if (bestSection && maxRatio >= 0.2) {
                setActiveSection(bestSection);
            } else if (maxRatio < 0.2) {
                // Failsafe: if nothing is clearly visible, default to home
                setActiveSection('home');
            }
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        const sections = document.querySelectorAll('section[id], div[id]');
        sections.forEach(section => observer.observe(section));

        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Set normalized coordinates (0 to 1)
            mouseX.set(clientX / innerWidth);
            mouseY.set(clientY / innerHeight);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="scifi-bg-viewport">
            {/* Global Scanline Effect */}
            <div className="scifi-scanline" />

            <motion.div
                className="scifi-bg-container"
                style={{
                    rotateX,
                    rotateY,
                    perspective: 1000
                }}
            >
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut"
                        }}
                        className="scifi-bg-layer"
                        style={{
                            backgroundImage: sectionImages[activeSection] ? `url("${sectionImages[activeSection]}")` : 'none',
                            x: bgX,
                            width: "110vw", /* Extra width to allow translation without edges showing */
                            left: "-5vw",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            zIndex: 1,
                            filter: 'brightness(0.6) contrast(1.1) saturate(0.8)'
                        }}
                    >
                        {/* Shutter effect replacement: subtle flicker on transition */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.2, 0] }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 bg-white/10 pointer-events-none z-10"
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="scifi-bg-overlay-glow" />
                <div className="scifi-bg-particles" />
            </motion.div>
        </div>
    );
};

export default SciFiBackground;
