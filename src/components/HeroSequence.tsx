import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export const HeroSequence = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // We increase viewport height multiplier to give enough scroll space for the animation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const frameCount = 80;
        const images: HTMLImageElement[] = [];
        let imagesLoaded = 0;

        // Preload images
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const paddedIndex = String(i).padStart(3, '0');
            img.src = `/hero-sequence-new/ezgif-frame-${paddedIndex}.jpg`;
            img.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === 1) {
                    renderFrame(0);
                }
            };
            images.push(img);
        }

        const renderFrame = (index: number) => {
            const img = images[index];
            if (!img || !img.complete) return;

            const cw = canvas.width = window.innerWidth;
            const ch = canvas.height = window.innerHeight;
            const imgRatio = img.width / img.height;
            const canvasRatio = cw / ch;

            let drawW, drawH, offsetX, offsetY;
            if (canvasRatio > imgRatio) {
                // Canvas is wider than image (Landscape)
                drawW = cw;
                drawH = cw / imgRatio;
                offsetX = 0;
                offsetY = (ch - drawH) / 2;
            } else {
                // Canvas is taller than image (Mobile Portrait)
                drawW = ch * imgRatio;
                drawH = ch;
                // Center horizontally: (CanvasWidth - ImageWidth) / 2
                offsetX = (cw - drawW) / 2;
                offsetY = 0;
            }

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        };

        const unsubscribe = scrollYProgress.on("change", (latest) => {
            // Map scroll to frames, but finish the sequence a bit early (at 0.9)
            // to allow the card stack effect to happen at the end
            const frameProgress = Math.min(latest / 0.9, 1);
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(frameProgress * frameCount)
            );
            requestAnimationFrame(() => renderFrame(frameIndex));
        });

        const handleResize = () => {
            const currentProgress = scrollYProgress.get();
            const frameIndex = Math.min(frameCount - 1, Math.floor(currentProgress * frameCount));
            renderFrame(frameIndex);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Text Animations (Fade out earlier)
    const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const yText = useTransform(scrollYProgress, [0, 0.4], [0, 100]);
    const scaleText = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

    // CARD STACK / CURTAIN EFFECT TRANSFORMS
    // As we reach the end of the scroll (0.85 -> 1.0), the hero section:
    // 1. Scales down slightly (0.95)
    // 2. Gets dimmer (brightness filter)
    // 3. Pushes back (visual depth)
    const scaleContainer = useTransform(scrollYProgress, [0.85, 1], [1, 0.95]);
    const opacityContainer = useTransform(scrollYProgress, [0.85, 1], [1, 0.5]);
    const filterContainer = useTransform(scrollYProgress, [0.85, 1], ["brightness(1)", "brightness(0.4)"]);
    const radiusContainer = useTransform(scrollYProgress, [0.85, 1], ["0px", "20px"]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-zinc-950">
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                {/* 
                    The motion div here handles the "Card Stack" retreat. 
                    It wraps all the hero content.
                */}
                <motion.div
                    style={{
                        scale: scaleContainer,
                        opacity: opacityContainer,
                        filter: filterContainer,
                        borderRadius: radiusContainer
                    }}
                    className="relative w-full h-full bg-white origin-top overflow-hidden will-change-transform"
                >
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-100" />

                    {/* Light Vignette for depth on white background */}
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 0.9], [0.1, 0.2, 0.3]) }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
                    </motion.div>

                    {/* Hero Text - Changed back to Black for the clean aesthetic */}
                    <motion.div
                        style={{ opacity: opacityText, y: yText, scale: scaleText }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-black z-20 px-6 pointer-events-none"
                    >
                        <div className="max-w-6xl w-full text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <motion.h2
                                    initial={{ opacity: 0, letterSpacing: '0.8em' }}
                                    animate={{ opacity: 1, letterSpacing: '0.5em' }}
                                    transition={{ duration: 2.5, ease: "easeOut" }}
                                    className="text-xs md:text-sm font-sans uppercase text-zinc-500 mb-8 font-light"
                                >
                                    The Collection
                                </motion.h2>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                                    className="relative mb-6 w-full flex justify-center"
                                >
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-full bg-white/40 blur-[50px] rounded-[100%] pointer-events-none" />
                                    <img
                                        src="/awanti-logo.png"
                                        alt="Awanti Logo"
                                        className="h-40 md:h-56 w-auto object-contain relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                                    />
                                </motion.div>

                                <h1 className="text-3xl md:text-5xl font-serif text-black leading-none -tracking-[0.04em]">
                                    {'AWANTI'.split('').map((char, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: 0.3 + i * 0.08,
                                                duration: 1,
                                                ease: [0.16, 1, 0.3, 1]
                                            }}
                                            className="inline-block"
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </h1>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2, duration: 1.5 }}
                                className="max-w-lg mx-auto mt-8 text-sm md:text-base font-light text-zinc-500 leading-relaxed font-sans tracking-wide"
                            >
                                <span className="opacity-50">01</span> &mdash; IMMERSIVE ARTISTRY
                            </motion.p>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
                                className="w-24 h-px bg-zinc-800/20 mx-auto mt-8 origin-center"
                            />
                        </div>
                    </motion.div>

                    {/* Scroll Indicator - Black */}
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-black z-20 flex flex-col items-center gap-3"
                    >
                        <span className="text-[10px] tracking-[0.3em] uppercase font-light text-zinc-500">Scroll</span>
                        <div className="w-5 h-8 rounded-full border border-black/20 flex justify-center pt-1.5">
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1 h-1 rounded-full bg-black/60"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};
