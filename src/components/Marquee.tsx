import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Marquee = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax shift for the two rows
    const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
    const x2 = useTransform(scrollYProgress, [0, 1], ['-15%', '0%']);

    const words = [
        'HAND PAINTED',
        'BESPOKE',
        'ORIGINAL ART',
        'AWANTI',
        'GHIBLI STYLE',
        'ONE OF ONE',
        'CURATED',
        'EMOTIONAL',
    ];

    const renderRow = (items: string[]) => (
        <>
            {[...items, ...items, ...items].map((word, i) => (
                <span key={i} className="flex items-center gap-8 shrink-0">
                    <span className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold whitespace-nowrap">
                        {word}
                    </span>
                    <span className="w-3 h-3 rounded-full bg-[var(--color-accent)] opacity-40 shrink-0" />
                </span>
            ))}
        </>
    );

    return (
        <div
            ref={ref}
            className="relative py-16 md:py-24 bg-zinc-950 border-y border-zinc-900 overflow-hidden select-none"
        >
            {/* Row 1 — Scrolls left */}
            <motion.div
                style={{ x: x1 }}
                className="flex items-center gap-8 text-white/[0.07] mb-6 marquee-row"
            >
                {renderRow(words)}
            </motion.div>

            {/* Row 2 — Scrolls right (outlined text) */}
            <motion.div
                style={{ x: x2 }}
                className="flex items-center gap-8 marquee-row"
            // Outline text effect via CSS
            >
                {[...words, ...words, ...words].map((word, i) => (
                    <span key={i} className="flex items-center gap-8 shrink-0">
                        <span
                            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold whitespace-nowrap"
                            style={{
                                WebkitTextStroke: '1px rgba(255,255,255,0.06)',
                                color: 'transparent',
                            }}
                        >
                            {word}
                        </span>
                        <span className="w-2 h-2 rounded-full border border-white/10 shrink-0" />
                    </span>
                ))}
            </motion.div>
        </div>
    );
};
