import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PreloaderProps {
    onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<'loading' | 'revealing' | 'done'>('loading');

    useEffect(() => {
        // Simulate loading progress (tied to actual image preloading)
        let current = 0;
        const interval = setInterval(() => {
            current += Math.random() * 12 + 3;
            if (current >= 100) {
                current = 100;
                clearInterval(interval);
                // Small pause at 100% before reveal
                setTimeout(() => setPhase('revealing'), 400);
            }
            setProgress(Math.min(current, 100));
        }, 120);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (phase === 'revealing') {
            // After the curtain animation finishes
            const timer = setTimeout(() => {
                setPhase('done');
                onComplete();
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [phase, onComplete]);

    const letters = 'AWANTI'.split('');

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <>
                    {/* Top Curtain */}
                    <motion.div
                        className="fixed top-0 left-0 w-full h-1/2 bg-zinc-950 z-[100] flex items-end justify-center overflow-hidden"
                        animate={phase === 'revealing' ? { y: '-100%' } : { y: 0 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    >
                        {/* Bottom edge of top curtain shows AWANTI top half */}
                    </motion.div>

                    {/* Bottom Curtain */}
                    <motion.div
                        className="fixed bottom-0 left-0 w-full h-1/2 bg-zinc-950 z-[100] flex items-start justify-center overflow-hidden"
                        animate={phase === 'revealing' ? { y: '100%' } : { y: 0 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    >
                        {/* Top edge of bottom curtain shows AWANTI bottom half */}
                    </motion.div>

                    {/* Center Content (sits at the seam between the two curtains) */}
                    <motion.div
                        className="fixed inset-0 z-[101] flex flex-col items-center justify-center pointer-events-none"
                        animate={phase === 'revealing' ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeIn' }}
                    >
                        {/* Brand Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
                            className="relative mb-6"
                        >
                            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-125" />
                            <img
                                src="/awanti-logo.png"
                                alt="Awanti Logo"
                                className="w-56 md:w-80 h-auto object-contain relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            />
                        </motion.div>

                        {/* Brand Name — Staggered Letters */}
                        <div className="flex items-center gap-[0.02em]">
                            {letters.map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.3 + i * 0.1,
                                        duration: 0.8,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight"
                                >
                                    {char}
                                </motion.span>
                            ))}
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                                className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-accent)]"
                            >
                                .
                            </motion.span>
                        </div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="mt-6 text-xs tracking-[0.4em] uppercase text-zinc-400 font-light"
                        >
                            Hand Painted Originals
                        </motion.p>

                        {/* Progress Bar */}
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: '160px' }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="mt-10 h-[1px] bg-zinc-800 relative overflow-hidden rounded-full"
                        >
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--color-accent)] to-white/80 rounded-full"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </motion.div>

                        {/* Percentage */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ delay: 1 }}
                            className="mt-3 text-[10px] tracking-widest text-zinc-500 font-mono"
                        >
                            {Math.round(progress)}%
                        </motion.span>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
