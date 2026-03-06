import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { REVIEWS } from '../data';
import { Star } from 'lucide-react';

export const Reviews = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="py-32 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-accent)] opacity-[0.015] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <span className="text-[var(--color-accent)] text-xs tracking-[0.3em] uppercase block mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                        What They <span className="italic text-zinc-500">Feel.</span>
                    </h2>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {REVIEWS.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + index * 0.15, duration: 0.7, ease: "easeOut" }}
                            className="group relative bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 md:p-10 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-500"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Big quotation mark */}
                            <span className="text-6xl font-serif text-[var(--color-accent)] opacity-20 leading-none block mb-4 select-none">
                                "
                            </span>

                            {/* Quote */}
                            <p className="text-zinc-300 leading-relaxed text-sm md:text-base mb-8 relative z-10">
                                {review.text}
                            </p>

                            {/* Divider */}
                            <div className="w-8 h-px bg-zinc-800 mb-6 group-hover:w-16 group-hover:bg-[var(--color-accent)]/30 transition-all duration-500" />

                            {/* Author */}
                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <p className="text-white font-medium text-sm">{review.user}</p>
                                    <p className="text-zinc-500 text-xs tracking-wider uppercase mt-1">{review.role}</p>
                                </div>
                                <div className="flex gap-0.5">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <Star key={i} size={12} className="text-[var(--color-accent)] fill-[var(--color-accent)]" />
                                    ))}
                                    {Array.from({ length: 5 - review.rating }).map((_, i) => (
                                        <Star key={i} size={12} className="text-zinc-700" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
