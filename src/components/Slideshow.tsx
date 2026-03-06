import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { INVENTORY } from "../data";

// Tilt card component for interactive hover
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(px);
        y.set(py);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const Slideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [progress, setProgress] = useState(0);
    const SLIDE_DURATION = 6000;

    // Auto-play + progress bar
    useEffect(() => {
        setProgress(0);
        const startTime = Date.now();

        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const p = Math.min(elapsed / SLIDE_DURATION, 1);
            setProgress(p);
        }, 30);

        const timer = setTimeout(() => {
            nextSlide();
        }, SLIDE_DURATION);

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
        };
    }, [currentIndex]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 2 >= INVENTORY.length ? 0 : prev + 2));
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 2 < 0 ? Math.max(0, INVENTORY.length - 2) : prev - 2));
    };

    const currentItem = INVENTORY[currentIndex];
    const nextItem = INVENTORY[(currentIndex + 1) % INVENTORY.length];

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <section className="relative h-screen w-full overflow-hidden bg-zinc-950 text-white">

            {/* Slide Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-[2px] z-30 bg-white/10">
                <motion.div
                    className="h-full bg-gradient-to-r from-[var(--color-accent)] to-white/80"
                    style={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.05 }}
                />
            </div>

            {/* Dynamic Image-Based Padding Blur (Vibrant Gradient) */}
            <div className="absolute inset-0 z-0 hidden md:block overflow-hidden pointer-events-none">
                <motion.div
                    key={`blur-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 flex"
                >
                    <div className="absolute inset-0 flex animate-pulse-slow">
                        <img src={currentItem.img} alt="" className="w-1/2 h-full object-cover blur-[140px] scale-150 saturate-[2.5] opacity-80" />
                        <img src={nextItem.img} alt="" className="w-1/2 h-full object-cover blur-[140px] scale-150 saturate-[2.5] opacity-80" />
                    </div>
                    <div className="absolute inset-0 flex scale-110 opacity-40 mix-blend-screen">
                        <img src={currentItem.img} alt="" className="w-1/2 h-full object-cover blur-[100px] rotate-12 saturate-[2]" />
                        <img src={nextItem.img} alt="" className="w-1/2 h-full object-cover blur-[100px] -rotate-12 saturate-[2]" />
                    </div>
                </motion.div>
                <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-3xl" />
            </div>

            {/* Main Art Container (Diptych Layout) */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0 w-full h-full md:p-16 lg:p-32 flex gap-8 md:gap-12 items-center justify-center overflow-hidden z-10"
                >
                    {/* Image 1 */}
                    <TiltCard className="relative flex-1 h-full flex items-center justify-center bg-black/20 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 art-card cursor-hover">
                        <img
                            src={currentItem.img}
                            alt={currentItem.title}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Price tag */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs tracking-wider font-medium"
                        >
                            ₹{currentItem.price}
                        </motion.div>
                        {/* Status badge */}
                        {currentItem.status === 'Sold Out' && (
                            <div className="absolute top-6 left-6 bg-red-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-red-500/30 text-xs tracking-wider text-red-300">
                                Sold Out
                            </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 block mb-2">{currentItem.cat} • {currentItem.size}</span>
                                <h3 className="text-lg md:text-2xl font-serif font-bold text-white drop-shadow-xl">
                                    {currentItem.title}
                                </h3>
                            </motion.div>
                        </div>
                    </TiltCard>

                    {/* Image 2 */}
                    <TiltCard className="relative flex-1 h-full hidden md:flex items-center justify-center bg-black/20 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 art-card cursor-hover">
                        <img
                            src={nextItem.img}
                            alt={nextItem.title}
                            className="max-w-full max-h-full object-contain"
                        />
                        {/* Price tag */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs tracking-wider font-medium"
                        >
                            ₹{nextItem.price}
                        </motion.div>
                        {nextItem.status === 'Sold Out' && (
                            <div className="absolute top-6 left-6 bg-red-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-red-500/30 text-xs tracking-wider text-red-300">
                                Sold Out
                            </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 block mb-2">{nextItem.cat} • {nextItem.size}</span>
                                <h3 className="text-lg md:text-2xl font-serif font-bold text-white drop-shadow-xl">
                                    {nextItem.title}
                                </h3>
                            </motion.div>
                        </div>
                    </TiltCard>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls — Enhanced */}
            <div className="absolute bottom-12 right-12 flex items-center gap-6 z-20">
                {/* Dot indicators */}
                <div className="hidden md:flex items-center gap-2">
                    {Array.from({ length: Math.ceil(INVENTORY.length / 2) }).slice(0, 6).map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => { setDirection(i * 2 > currentIndex ? 1 : -1); setCurrentIndex(i * 2); }}
                            className={`rounded-full transition-all duration-300 ${i * 2 === currentIndex ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                                }`}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.8 }}
                        />
                    ))}
                </div>

                <div className="text-zinc-400 font-mono tracking-widest text-sm">
                    <span className="text-white text-lg">{String(Math.floor(currentIndex / 2) + 1).padStart(2, '0')}</span>
                    <span className="mx-2">/</span>
                    {String(Math.ceil(INVENTORY.length / 2)).padStart(2, '0')}
                </div>
                <div className="flex gap-2">
                    <motion.button
                        onClick={prevSlide}
                        className="p-3 bg-white/5 hover:bg-white/15 rounded-full backdrop-blur-md transition-colors border border-white/10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronLeft size={24} />
                    </motion.button>
                    <motion.button
                        onClick={nextSlide}
                        className="p-3 bg-white/5 hover:bg-white/15 rounded-full backdrop-blur-md transition-colors border border-white/10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronRight size={24} />
                    </motion.button>
                </div>
            </div>
        </section>
    );
};
