
import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export const Process = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const frameCount = 80;
        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const paddedIndex = String(i).padStart(3, '0');
            img.src = `/sequence-2/ffout${paddedIndex}.gif`;
            images.push(img);
        }

        const renderFrame = (index: number) => {
            const img = images[index];
            if (!img || !img.complete) return;

            const cw = canvas.width = canvas.clientWidth;
            const ch = canvas.height = canvas.clientHeight;

            const imgRatio = img.width / img.height;
            const canvasRatio = cw / ch;

            let drawW, drawH, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                drawH = ch;
                drawW = ch * imgRatio;
                offsetX = (cw - drawW) / 2;
                offsetY = 0;
            } else {
                drawW = cw;
                drawH = cw / imgRatio;
                offsetX = 0;
                offsetY = (ch - drawH) / 2;
            }

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        };

        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const frameIndex = Math.min(frameCount - 1, Math.floor(latest * frameCount));
            requestAnimationFrame(() => renderFrame(frameIndex));
        });

        const initialTimer = setTimeout(() => renderFrame(0), 500);

        return () => {
            unsubscribe();
            clearTimeout(initialTimer);
        };
    }, []);

    const opacity1 = useTransform(scrollYProgress, [0.05, 0.15, 0.3, 0.4], [0, 1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.7], [0, 1, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.7, 0.75, 0.9, 1], [0, 1, 1, 1]);

    // Scale transforms for a zoom-in feel
    const scale1 = useTransform(scrollYProgress, [0.05, 0.15, 0.3, 0.4], [0.95, 1, 1, 1.05]);
    const scale2 = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.7], [0.95, 1, 1, 1.05]);
    const scale3 = useTransform(scrollYProgress, [0.7, 0.75, 0.9, 1], [0.95, 1, 1, 1]);

    // Side progress line
    const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    // Chapter definitions
    const chapters = [
        {
            opacity: opacity1,
            y: useTransform(scrollYProgress, [0.05, 0.15, 0.3, 0.4], [30, 0, 0, -30]),
            scale: scale1,
            chapterLabel: "Chapter II",
            title: "From the",
            titleAccent: "Abyss.",
            description: "A blank canvas is not empty. It is full of infinite possibility.",
            number: "01"
        },
        {
            opacity: opacity2,
            y: useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.7], [30, 0, 0, -30]),
            scale: scale2,
            chapterLabel: null,
            title: "Emerging",
            titleAccent: "Light.",
            description: "Layer by layer, the shadow reveals the form.",
            number: "02"
        },
        {
            opacity: opacity3,
            y: useTransform(scrollYProgress, [0.7, 0.75, 0.9, 1], [30, 0, 0, 0]),
            scale: scale3,
            chapterLabel: null,
            title: "The",
            titleAccent: "Reveal.",
            description: "A story, finalized in pigment and time.",
            number: "03"
        }
    ];

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-[var(--color-void)]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* The Canvas */}
                <div className="absolute inset-0 z-0">
                    <canvas ref={canvasRef} className="w-full h-full opacity-60" />
                </div>

                {/* Overlay Vignettes */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)] via-transparent to-[var(--color-void)] pointer-events-none" />
                <div className="absolute inset-0 bg-black/40 pointer-events-none mix-blend-multiply" />

                {/* Left side progress indicator */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-4">
                    <div className="w-px h-32 bg-white/10 relative overflow-hidden rounded-full">
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[var(--color-accent)] to-transparent rounded-full"
                            style={{ height: progressHeight }}
                        />
                    </div>
                    {chapters.map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full border border-white/20"
                            style={{
                                backgroundColor: useTransform(
                                    scrollYProgress,
                                    [i * 0.33, (i + 0.5) * 0.33],
                                    ['rgba(255,255,255,0)', 'rgba(192,160,98,0.8)']
                                )
                            }}
                        />
                    ))}
                </div>

                {/* Cinematic Chapters */}
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <div className="relative w-full max-w-5xl px-6 h-full">
                        {chapters.map((chapter, i) => (
                            <motion.div
                                key={i}
                                style={{
                                    opacity: chapter.opacity,
                                    y: chapter.y,
                                    scale: chapter.scale,
                                }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center"
                            >
                                {chapter.chapterLabel && (
                                    <span className="text-xs tracking-[0.3em] text-[var(--color-text-muted)] uppercase block mb-4">
                                        {chapter.chapterLabel}
                                    </span>
                                )}

                                {/* Step number */}
                                <span className="text-[var(--color-accent)] text-[10px] tracking-[0.5em] uppercase mb-6 opacity-50">
                                    {chapter.number}
                                </span>

                                <h2 className="text-fluid-h2 font-serif text-[var(--color-text-main)] mb-6 tracking-tight">
                                    {chapter.title}{' '}
                                    <span className="italic text-[var(--color-text-muted)]">{chapter.titleAccent}</span>
                                </h2>

                                {/* Decorative line */}
                                <div className="w-12 h-px bg-[var(--color-accent)] opacity-30 mb-6" />

                                <p className="text-[var(--color-text-muted)] font-light tracking-wide max-w-md leading-relaxed">
                                    {chapter.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
