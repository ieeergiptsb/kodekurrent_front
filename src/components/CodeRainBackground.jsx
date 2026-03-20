import React, { useEffect, useRef } from 'react';

export function CodeRainBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const symbols = '{}[]()<>!==+*-/|&^%$#@;:?';

        const alphabet = katakana + latin + nums + symbols;
        const fontSize = 16;
        const columns = Math.ceil(canvas.width / fontSize);

        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(18, 16, 35, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'hsla(285, 80%, 60%, 0.8)';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.shadowBlur = 5;
                ctx.shadowColor = 'hsl(285, 80%, 60%)';
                ctx.fillText(text, x, y);
                ctx.shadowBlur = 0;

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-10] w-full h-full pointer-events-none opacity-30 mix-blend-screen"
        />
    );
}
