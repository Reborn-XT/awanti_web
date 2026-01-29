import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export const HeroSequence = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
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
            // Using the new path for the corrected frame sequence
            img.src = `/hero-sequence-new/ezgif-frame-${paddedIndex}.jpg`;
            img.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === 1) { // Render first frame immediately
                    renderFrame(0);
                }
            };
            images.push(img);
        }

        const renderFrame = (index: number) => {
            const img = images[index];
            if (!img || !img.complete) return;

            // Cover logic
            const cw = canvas.width = window.innerWidth;
            const ch = canvas.height = window.innerHeight;
            const imgRatio = img.width / img.height;
            const canvasRatio = cw / ch;

            let drawW, drawH, offsetX, offsetY;
            if (canvasRatio > imgRatio) {
                drawW = cw;
                drawH = cw / imgRatio;
                offsetX = 0;
                offsetY = (ch - drawH) / 2;
            } else {
                drawW = ch * imgRatio;
                drawH = ch;
                offsetX = (cw - drawW) / 2;
                offsetY = 0;
            }

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        };

        const unsubscribe = scrollYProgress.on("change", (latest) => {
            // latest is 0 to 1
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(latest * frameCount)
            );
            requestAnimationFrame(() => renderFrame(frameIndex));
        });

        // Resize handler
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

    // Text Animations (Optimized for light background)
    const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const yText = useTransform(scrollYProgress, [0, 0.4], [0, 100]);

    // Gradient overlay - using white fade instead of black since background is light
    const opacityOverlay = useTransform(scrollYProgress, [0, 0.5], [0, 0.5]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-zinc-50">
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

                {/* Light Gradient Overlay for Text Readability if needed */}
                <motion.div
                    style={{ opacity: opacityOverlay }}
                    className="absolute inset-0 bg-gradient-to-b from-white/0 via-transparent to-white/80 z-10"
                />

                <motion.div
                    style={{ opacity: opacityText, y: yText }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-zinc-900 z-20 px-6 pointer-events-none"
                >
                    <div className="max-w-4xl w-full text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h2 className="text-sm md:text-base tracking-[0.3em] font-sans uppercase text-zinc-500 mb-4">
                                The Portfolio
                            </h2>
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium tracking-tight text-zinc-900 drop-shadow-sm">
                                Awanti
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="max-w-xl mx-auto text-lg md:text-xl font-light text-zinc-600 leading-relaxed font-serif italic"
                        >
                            "Every stroke tells a story, every color holds an emotion. Welcome to a journey through my artistic expression."
                        </motion.p>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-zinc-400 text-xs tracking-widest animate-pulse z-20 flex flex-col items-center gap-2"
                >
                    <span className="uppercase">Begin the Journey</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-400 to-transparent" />
                </motion.div>
            </div>
        </div>
    );
};
