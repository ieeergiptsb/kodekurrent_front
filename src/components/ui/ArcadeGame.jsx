import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ArcadeGame({ onClose }) {
    const [gameState, setGameState] = useState("START"); // START, PLAYING, GAME_OVER, WIN
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
    const canvasRef = useRef(null);
    const gameLoopRef = useRef(null);
    const containerRef = useRef(null);

    // Game Constants & State
    const ball = useRef({ x: 400, y: 400, dx: 3, dy: -3, radius: 10 });
    const paddle = useRef({ x: 325, width: 150, height: 12 });
    const bricks = useRef([]);
    const brickRowCount = 3;
    const brickColumnCount = 8;
    const brickWidth = 85;
    const brickHeight = 25;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 35;

    useEffect(() => {
        document.documentElement.classList.add('hide-custom-cursor');
        return () => document.documentElement.classList.remove('hide-custom-cursor');
    }, []);

    const initBricks = () => {
        const arr = [];
        for (let c = 0; c < brickColumnCount; c++) {
            arr[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                arr[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        bricks.current = arr;
    };

    const startGame = () => {
        setGameState("PLAYING");
        setScore(0);
        ball.current = { x: 400, y: 400, dx: 3, dy: -3, radius: 10 };
        paddle.current = { x: 325, width: 150, height: 12 };
        initBricks();
    };

    useEffect(() => {
        if (gameState !== "PLAYING") return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const update = () => {
            // Move Ball
            ball.current.x += ball.current.dx;
            ball.current.y += ball.current.dy;

            // Wall Collision
            if (ball.current.x + ball.current.radius > canvas.width || ball.current.x - ball.current.radius < 0) {
                ball.current.dx = -ball.current.dx;
            }
            if (ball.current.y - ball.current.radius < 0) {
                ball.current.dy = -ball.current.dy;
            } else if (ball.current.y + ball.current.radius > canvas.height - paddle.current.height) {
                // Paddle Collision
                if (ball.current.x > paddle.current.x && ball.current.x < paddle.current.x + paddle.current.width) {
                    ball.current.dy = -Math.abs(ball.current.dy); // Ensure it always goes up
                    // Add moderate variety to bounce based on where it hits paddle
                    const hitPoint = (ball.current.x - (paddle.current.x + paddle.current.width / 2)) / (paddle.current.width / 2);
                    ball.current.dx = hitPoint * 4;
                } else if (ball.current.y + ball.current.radius > canvas.height) {
                    setGameState("GAME_OVER");
                    if (score > highScore) setHighScore(score);
                }
            }

            // Brick Collision
            let bricksLeft = 0;
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    const b = bricks.current[c][r];
                    if (b.status === 1) {
                        bricksLeft++;
                        if (
                            ball.current.x > b.x &&
                            ball.current.x < b.x + brickWidth &&
                            ball.current.y > b.y &&
                            ball.current.y < b.y + brickHeight
                        ) {
                            ball.current.dy = -ball.current.dy;
                            b.status = 0;
                            setScore(s => s + 10);
                        }
                    }
                }
            }

            if (bricksLeft === 0) {
                setGameState("WIN");
                if (score + 100 > highScore) setHighScore(score + 100);
            }

            draw();
            gameLoopRef.current = requestAnimationFrame(update);
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Bricks
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    if (bricks.current[c][r].status === 1) {
                        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                        bricks.current[c][r].x = brickX;
                        bricks.current[c][r].y = brickY;

                        ctx.fillStyle = r % 2 === 0 ? "#a855f7" : "#ec4899";
                        ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                        // Bevel effect
                        ctx.strokeStyle = "rgba(255,255,255,0.2)";
                        ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
                    }
                }
            }

            // Draw Paddle
            ctx.fillStyle = "#fff";
            ctx.fillRect(paddle.current.x, canvas.height - paddle.current.height, paddle.current.width, paddle.current.height);

            // Draw Ball
            ctx.beginPath();
            ctx.arc(ball.current.x, ball.current.y, ball.current.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#00fff9";
            ctx.fill();
            ctx.closePath();
        };

        const handleInputMove = (clientX) => {
            if (!canvasRef.current) return;
            const rect = canvasRef.current.getBoundingClientRect();
            // Scale input to logical 800x500 coordinates
            const scaleX = canvas.width / rect.width;
            let logicalX = (clientX - rect.left) * scaleX;
            paddle.current.x = Math.max(0, Math.min(canvas.width - paddle.current.width, logicalX - paddle.current.width / 2));
        };

        const handleMouseMove = (e) => handleInputMove(e.clientX);
        const handleTouchMove = (e) => {
            if (e.touches && e.touches[0]) {
                handleInputMove(e.touches[0].clientX);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        gameLoopRef.current = requestAnimationFrame(update);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            cancelAnimationFrame(gameLoopRef.current);
        };
    }, [gameState, score, highScore]);

    const handleContainerMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-2 sm:p-4"
        >
            <div
                ref={containerRef}
                onMouseMove={handleContainerMouseMove}
                className="relative w-full max-w-3xl h-[60vh] sm:h-auto sm:aspect-[4/3] bg-[#0a0a0a] border-4 border-primary rounded-lg shadow-[0_0_60px_rgba(168,85,247,0.5)] overflow-hidden flex flex-col cursor-none"
            >
                {/* Custom Game Cursor - Only on desktop */}
                <div
                    className="pointer-events-none absolute z-[110] w-4 h-4 border-2 border-white mix-blend-difference rotate-45 hidden sm:block"
                    style={{ left: cursorPos.x, top: cursorPos.y, transform: 'translate(-50%, -50%) rotate(45deg)' }}
                >
                    <div className="absolute inset-0 bg-white/30 scale-50" />
                </div>

                {/* Header */}
                <div className="bg-primary/20 p-2 sm:p-4 flex justify-between items-center border-b border-primary/30">
                    <div className="font-pixel text-white text-xs sm:text-xl tracking-tighter">CODE BREAKER v2.0</div>
                    <div className="font-pixel text-white flex gap-4 sm:gap-8 text-[10px] sm:text-sm">
                        <span className="text-secondary">SCORE: {score}</span>
                        <span className="text-primary/70">HI: {highScore}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-secondary font-pixel text-sm sm:text-base flex-shrink-0"
                    >
                        [X]
                    </button>
                </div>

                {/* Game Area */}
                <div className="flex-1 relative overflow-hidden">
                    <canvas ref={canvasRef} width={800} height={500} className="w-full h-full touch-none" />

                    <AnimatePresence>
                        {gameState === "START" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-4 text-center"
                            >
                                <div className="text-3xl sm:text-5xl font-pixel text-primary mb-2">CODE</div>
                                <div className="text-5xl sm:text-7xl font-pixel text-secondary mb-8">BREAKER</div>
                                <button
                                    onClick={startGame}
                                    className="px-6 sm:px-10 py-3 sm:py-5 bg-primary text-white font-pixel text-sm sm:text-xl rounded-md hover:bg-secondary transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                                >
                                    DESTROY BUGS
                                </button>
                                <p className="mt-8 font-mono text-white/40 text-[10px] sm:text-sm tracking-[0.2em] uppercase">
                                    {isMobile() ? "Drag to move paddle" : "Mouse to move paddle"}
                                </p>
                            </motion.div>
                        )}

                        {gameState === "GAME_OVER" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0216]/90 backdrop-blur-md p-4 text-center"
                            >
                                <div className="text-3xl sm:text-6xl font-pixel text-secondary mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] uppercase">DEBUG FAILED</div>
                                <div className="text-sm sm:text-2xl font-pixel text-white/70 mb-10 tracking-widest uppercase">
                                    Final Binary: {score}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-xs sm:max-w-none">
                                    <button
                                        onClick={startGame}
                                        className="px-8 py-4 bg-primary text-white font-pixel text-sm sm:text-base rounded hover:bg-secondary transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                                    >
                                        REBOOT
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="px-8 py-4 border-2 border-primary text-white font-pixel text-sm sm:text-base rounded hover:bg-primary transition-all"
                                    >
                                        QUIT
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {gameState === "WIN" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-green-900/40 backdrop-blur-md p-4 text-center"
                            >
                                <div className="text-4xl sm:text-6xl font-pixel text-white mb-4 uppercase">BUG FREE!</div>
                                <div className="text-sm sm:text-2xl font-pixel text-primary mb-10 uppercase">LEGENDARY BINARY: {score + 100}</div>
                                <button
                                    onClick={startGame}
                                    className="px-8 py-4 bg-primary text-white font-pixel text-sm sm:text-base rounded hover:bg-white hover:text-black transition-all"
                                >
                                    PLAY AGAIN
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Tip & Skip Button */}
                <div className="bg-black/80 px-4 py-3 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="font-mono text-[8px] sm:text-[10px] text-white/30 uppercase tracking-[0.3em]">
                        Prevent the ball from escaping the sandbox
                    </p>
                    <button
                        onClick={onClose}
                        className="font-pixel text-[10px] sm:text-xs text-secondary hover:text-white transition-colors flex items-center gap-2 group cursor-pointer"
                    >
                        <span>SKIP TO WEBSITE</span>
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            {">>>"}
                        </motion.span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function isMobile() {
    if (typeof window === "undefined") return false;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent || "");
}
