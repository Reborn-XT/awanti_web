
import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export const Process = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // We want this section to be longer to allow for slow scrubbing
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

        // Preload "ffout" gifs (treated as frames)
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const paddedIndex = String(i).padStart(3, '0');
            img.src = `/sequence-2/ffout${paddedIndex}.gif`; // Using GIFs as frames
            images.push(img);
        }

        const renderFrame = (index: number) => {
            const img = images[index];
            if (!img || !img.complete) return;

            // Contain logic (fit within canvas without cropping)
            const cw = canvas.width = canvas.clientWidth;
            const ch = canvas.height = canvas.clientHeight;

            const imgRatio = img.width / img.height;
            const canvasRatio = cw / ch;

            let drawW, drawH, offsetX, offsetY;

            // Contain logic
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
            // Map 0-1 of the scroll progress to frames
            const frameIndex = Math.min(frameCount - 1, Math.floor(latest * frameCount));
            requestAnimationFrame(() => renderFrame(frameIndex));
        });

        // Loop to ensure load?
        // Since we are scrolling, rendering on change is usually enough. 
        // Initial render:
        const initialTimer = setTimeout(() => renderFrame(0), 500);

        return () => {
            unsubscribe();
            clearTimeout(initialTimer);
        };
    }, []);

    const opacity1 = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
    const opacity2 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const opacity3 = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-zinc-950">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* The Canvas */}
                <div className="absolute inset-0 z-0">
                    <canvas ref={canvasRef} className="w-full h-full" />
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950 pointer-events-none" />

                {/* Story Overlay */}
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <motion.div style={{ opacity: opacity1 }} className="mb-32">
                        <span className="text-xs tracking-[0.3em] text-zinc-500 uppercase block mb-4">Chapter II</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">From Blank Canvas</h2>
                        <p className="text-zinc-400">Every journey begins with a single thought.</p>
                    </motion.div>

                    <motion.div style={{ opacity: opacity2 }} className="mb-32">
                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">To Layers of Life</h2>
                        <p className="text-zinc-400">Building depth, shadow, and emotion stroke by stroke.</p>
                    </motion.div>

                    <motion.div style={{ opacity: opacity3 }}>
                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">A Masterpiece Born</h2>
                        <p className="text-zinc-400">Your vision, immortalized in acrylic and oil.</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
