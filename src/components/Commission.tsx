
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from './ui';

export const Commission = ({ onStartCommission }: { onStartCommission?: () => void }) => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const steps = [
        { num: "01", label: "STYLE", title: "Ghibli Nostalgia", desc: "Warm, hand-painted aesthetic inspired by Studio Ghibli's timeless worlds." },
        { num: "02", label: "REFERENCE", title: "Upload Memory", desc: "Share a photo, a feeling, or a sketch — we'll bring it to life." },
        { num: "03", label: "PROCESS", title: "The Creation", desc: "Watch your vision take shape through sketches, color studies, and final render." },
    ];

    return (
        <div ref={sectionRef} className="flex flex-col md:flex-row min-h-screen bg-[var(--color-void)] text-[var(--color-text-main)] border-t border-white/5">
            {/* Left Static Visual - Editorial Image */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 overflow-hidden bg-black group grayscale hover:grayscale-0 transition-all duration-1000 cursor-hover">
                <img
                    src="/ghibli-example.jpg"
                    alt="Custom Ghibli Style Art"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)] via-transparent to-transparent opacity-80" />

                {/* Floating info card on hover */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute bottom-12 left-12 right-12"
                >
                    <motion.div
                        className="w-12 h-[1px] bg-[var(--color-accent)] mb-8"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                        style={{ transformOrigin: "left" }}
                    />
                    <h3 className="text-4xl md:text-5xl font-serif italic text-white mb-2 leading-tight">
                        "The Memory of <br />Summer"
                    </h3>
                    <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mt-4">
                        Commission #0842 &mdash; Oil on Canvas
                    </p>
                </motion.div>
            </div>

            {/* Right Scrollable Form - Minimalist */}
            <div className="w-full md:w-1/2 relative bg-[var(--color-void)]">
                <div className="min-h-screen p-12 md:p-24 flex flex-col justify-center border-l border-white/5">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="text-[var(--color-accent)] text-xs tracking-[0.3em] uppercase block mb-6"
                        >
                            Chapter III
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                            className="text-6xl md:text-8xl font-serif mb-12 text-[var(--color-text-main)] leading-none -ml-1"
                        >
                            Your <span className="opacity-30">Vision.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.6 }}
                            className="text-[var(--color-text-muted)] text-lg mb-16 max-w-sm leading-relaxed font-light"
                        >
                            A bespoke painting is more than an object. It is a captured feeling. A frozen moment.
                        </motion.p>

                        <div className="space-y-8">
                            {steps.map((step, i) => (
                                <motion.div
                                    key={step.num}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.7 + i * 0.15, duration: 0.6 }}
                                    whileHover={{ x: 12 }}
                                    className="group cursor-pointer py-6 border-b border-white/5 hover:border-[var(--color-accent)]/20 transition-colors"
                                >
                                    <div className="flex items-start gap-6">
                                        <span className="text-[var(--color-accent)] text-xs tracking-wider mt-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                            {step.num}
                                        </span>
                                        <div>
                                            <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] block mb-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                                {step.label}
                                            </span>
                                            <h4 className="text-2xl md:text-3xl font-serif text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors duration-500">
                                                {step.title}
                                            </h4>
                                            <p className="text-sm text-[var(--color-text-muted)] mt-2 max-w-xs opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
                                                {step.desc}
                                            </p>
                                        </div>
                                        {/* Arrow indicator */}
                                        <motion.span
                                            className="ml-auto text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity mt-2"
                                        >
                                            →
                                        </motion.span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1.2 }}
                            className="mt-16"
                        >
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button onClick={onStartCommission} className="!bg-white !text-black !rounded-none !px-12 !py-6 hover:!bg-[var(--color-accent)] hover:!text-white transition-colors duration-500 font-sans tracking-widest uppercase text-xs magnetic-hover">
                                    Begin Commission
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
