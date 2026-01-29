
import { motion } from 'framer-motion';
import { Button } from './ui';

export const Commission = ({ onStartCommission }: { onStartCommission?: () => void }) => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-zinc-50 text-zinc-900 border-t border-zinc-200">
            {/* Left Static Visual */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 overflow-hidden bg-zinc-100">
                <img
                    src="/ghibli-example.jpg"
                    alt="Custom Ghibli Style Art"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-8 left-8 text-white">
                    <span className="text-sm font-medium tracking-widest uppercase mb-2 block text-white/80">Commission #0842</span>
                    <h3 className="text-3xl font-serif">"The Memory of Summer"</h3>
                </div>
            </div>

            {/* Right Scrollable Form */}
            <div className="w-full md:w-1/2 relative bg-zinc-50">
                <div className="min-h-screen p-12 md:p-24 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-yellow-600 font-medium tracking-widest mb-4 block">LIMITED AVAILABILITY</span>
                        <span className="text-xs tracking-[0.3em] text-zinc-500 uppercase block mb-2">Chapter III</span>
                        <h2 className="text-5xl md:text-7xl font-serif mb-8 text-zinc-900 leading-tight">
                            Your Story,<br />
                            <span className="italic text-zinc-500">Reimagined.</span>
                        </h2>
                        <p className="text-zinc-600 text-lg mb-12 max-w-md leading-relaxed">
                            Commission a bespoke painting that captures not just a moment, but a feeling.
                            Specializing in Ghibli-inspired landscapes and emotional portraits.
                        </p>

                        <div className="space-y-12 border-l-2 border-zinc-200 pl-8 ml-2">
                            <div className="relative">
                                <span className="absolute -left-[39px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-4 border-zinc-50" />
                                <h4 className="text-xl font-serif mb-2">1. Choose Your Style</h4>
                                <p className="text-sm text-zinc-500">Select between "Ghibli Nostalgia", "Realistic Depth", or "Abstract Emotion".</p>
                            </div>
                            <div className="opacity-50 hover:opacity-100 transition-opacity relative">
                                <span className="absolute -left-[39px] top-0 w-4 h-4 rounded-full bg-zinc-300 border-4 border-zinc-50" />
                                <h4 className="text-xl font-serif mb-2">2. Upload Reference</h4>
                                <p className="text-sm text-zinc-500">Share your photo and tell us the story behind it.</p>
                            </div>
                            <div className="opacity-50 hover:opacity-100 transition-opacity relative">
                                <span className="absolute -left-[39px] top-0 w-4 h-4 rounded-full bg-zinc-300 border-4 border-zinc-50" />
                                <h4 className="text-xl font-serif mb-2">3. Receive Sketches</h4>
                                <p className="text-sm text-zinc-500">Approve the concept before the first brush stroke.</p>
                            </div>
                        </div>

                        <div className="mt-16">
                            <Button onClick={onStartCommission} className="w-full md:w-auto bg-zinc-900 text-white hover:bg-black">
                                Start Your Commission
                            </Button>
                            <p className="mt-4 text-xs text-zinc-400 text-center md:text-left">
                                Currently booking for February 2026.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
