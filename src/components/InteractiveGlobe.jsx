import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function InteractiveGlobe() {
    const canvasRef = useRef();

    useEffect(() => {
        let phi = 0;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 300 * 2,
            height: 300 * 2,
            phi: 0,
            theta: 0.3,
            dark: 1, // Render the globe in a dark theme
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.05, 0.08, 0.15], // Deep steel blue base
            markerColor: [0.5, 0.57, 0.72], // Steel blue marker matching accent #8191B9
            glowColor: [0.5, 0.57, 0.72], // Steel blue glow
            markers: [
                // Marker referencing India roughly (RGIPT location: ~26.2N, 81.6E)
                { location: [26.25, 81.6], size: 0.1 }
            ],
            onRender: (state) => {
                // Called on every animation frame.
                // `state` will be an empty object, return updated params.
                state.phi = phi;
                phi += 0.005; // Adjust the rotation speed
            },
            opacity: 0.9,
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <a 
            href="https://www.google.com/maps/place/Rajiv+Gandhi+Institute+of+Petroleum+Technology+(RGIPT)/@26.2733824,81.5104,7146m/data=!3m1!1e3!4m6!3m5!1s0x399ba1580bf13c33:0x32df0c8e914ab52e!8m2!3d26.2649711!4d81.5066796!16s%2Fm%2F03d7rbq?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block hover:scale-105 transition-transform duration-300"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative w-[300px] h-[300px] flex items-center justify-center overflow-hidden mix-blend-screen"
            >
                <canvas
                    ref={canvasRef}
                    style={{ width: 300, height: 300, aspectRatio: 1, cursor: "pointer" }}
                />
            </motion.div>
        </a>
    );
}
