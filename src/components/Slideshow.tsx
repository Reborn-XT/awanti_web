import { useState, useEffect } from "react";
import { INVENTORY } from "../data";

const STORY_DURATION = 5000; // 5 seconds per story

export const Slideshow = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentItem = INVENTORY[activeIndex];

    // Navigate to previous/next story with transition
    const goToPrevious = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveIndex((prev) => (prev - 1 + INVENTORY.length) % INVENTORY.length);
            setProgress(0);
            setIsTransitioning(false);
        }, 100);
    };

    const goToNext = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % INVENTORY.length);
            setProgress(0);
            setIsTransitioning(false);
        }, 100);
    };

    // Auto-advance stories
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            goToNext();
        }, STORY_DURATION);

        return () => clearInterval(interval);
    }, [isPaused, activeIndex]);

    // Progress animation for current story
    useEffect(() => {
        if (isPaused) return;

        setProgress(0);
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / STORY_DURATION) * 100, 100);
            setProgress(newProgress);

            if (newProgress < 100) {
                requestAnimationFrame(animate);
            }
        };

        const animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [activeIndex, isPaused]);

    return (
        <section className="py-16 md:py-24 bg-zinc-950 border-b border-zinc-800">
            <div className="mb-8 md:mb-12 px-6 text-center max-w-3xl mx-auto">
                <span className="text-xs tracking-[0.3em] text-zinc-500 uppercase block mb-3">
                    The Collection
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                    Stories in Motion
                </h2>
            </div>

            {/* Instagram Stories Container */}
            <div className="max-w-md mx-auto px-4">
                <div
                    className="relative bg-black rounded-2xl overflow-hidden shadow-2xl"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Story Progress Bars (Instagram-style multiple bars at top) */}
                    <div className="absolute top-0 left-0 right-0 z-30 flex gap-1 p-2">
                        {INVENTORY.map((_, index) => (
                            <div
                                key={index}
                                className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
                            >
                                <div
                                    className="h-full bg-white transition-all ease-linear"
                                    style={{
                                        width: index < activeIndex
                                            ? '100%'
                                            : index === activeIndex
                                                ? `${progress}%`
                                                : '0%'
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Story Header (Instagram-style) */}
                    <div className={`absolute top-0 left-0 right-0 z-20 pt-4 pb-8 px-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent transition-opacity duration-250 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'
                        }`}>
                        <div className="flex items-center gap-3 mt-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-200 flex items-center justify-center text-black font-bold text-sm">
                                {currentItem.cat.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-sm leading-none mb-1">
                                    {currentItem.title}
                                </h3>
                                <p className="text-white/70 text-xs">
                                    {currentItem.cat} Collection
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Story Image */}
                    <div className="relative aspect-[9/16] bg-zinc-900">
                        <img
                            src={currentItem.img}
                            alt={currentItem.title}
                            className={`w-full h-full object-cover transition-all duration-250 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                                }`}
                            loading="lazy"
                        />

                        {/* Subtle bottom gradient for readability */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    </div>

                    {/* Story Bottom Info */}
                    <div className={`absolute bottom-0 left-0 right-0 z-20 p-6 transition-opacity duration-250 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'
                        }`}>
                        <div className="flex items-end justify-between">
                            <div>
                                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium mb-2">
                                    ₹{currentItem.price}
                                </span>
                                <p className="text-white/90 text-sm">
                                    Size: {currentItem.size}" • {currentItem.status}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tap Zones for Navigation (Instagram-style) */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer"
                        aria-label="Previous story"
                    />
                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer"
                        aria-label="Next story"
                    />
                </div>

                {/* Story Counter */}
                <div className="text-center mt-4">
                    <span className="text-zinc-500 text-sm">
                        {activeIndex + 1} / {INVENTORY.length}
                    </span>
                </div>
            </div>
        </section>
    );
};
