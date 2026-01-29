
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui';

interface CommissionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CommissionModal = ({ isOpen, onClose }: CommissionModalProps) => {
    const [step, setStep] = useState(1);

    // Form States
    const [style, setStyle] = useState<string>('');

    const [desc, setDesc] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        setStep(3); // Success state
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col md:flex-row h-[600px]">
                            {/* Side Panel */}
                            <div className="hidden md:block w-1/3 bg-zinc-950 p-8 border-r border-zinc-800">
                                <h3 className="text-xl font-serif text-white mb-6">The Process</h3>
                                <div className="space-y-6 text-sm text-zinc-500">
                                    <div className={step === 1 ? "text-white" : ""}>1. Details</div>
                                    <div className={step === 2 ? "text-white" : ""}>2. Review</div>
                                    <div className={step === 3 ? "text-white" : ""}>3. Confirmed</div>
                                </div>
                                <div className="mt-auto pt-12">
                                    <div className="text-xs uppercase tracking-widest text-zinc-600 mb-2">Current Waitlist</div>
                                    <div className="text-2xl text-white font-serif">Feb '26</div>
                                </div>
                            </div>

                            {/* Form Area */}
                            <div className="w-full md:w-2/3 p-8 md:p-12 overflow-y-auto bg-zinc-900 text-zinc-50">
                                {step === 1 && (
                                    <form onSubmit={() => setStep(2)} className="space-y-6">
                                        <div>
                                            <h2 className="text-2xl font-serif mb-6">Tell us your vision</h2>

                                            <label className="block text-sm text-zinc-400 mb-2">Name</label>
                                            <input required type="text" className="w-full bg-zinc-800 border border-zinc-700 p-3 text-white focus:outline-none focus:border-orange-200 transition-colors" placeholder="Your Name" />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-2">Email</label>
                                            <input required type="email" className="w-full bg-zinc-800 border border-zinc-700 p-3 text-white focus:outline-none focus:border-orange-200 transition-colors" placeholder="your@email.com" />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-2">Preferred Style</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['Ghibli', 'Realistic', 'Abstract', 'Portrait'].map(s => (
                                                    <button
                                                        type="button"
                                                        key={s}
                                                        onClick={() => setStyle(s)}
                                                        className={`p-3 text-sm border transition-all ${style === s ? 'bg-zinc-800 border-orange-200 text-white' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Button type="submit" className="w-full justify-center bg-white text-black hover:bg-zinc-200">
                                                Continue
                                            </Button>
                                        </div>
                                    </form>
                                )}

                                {step === 2 && (
                                    <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                                        <h2 className="text-2xl font-serif mb-2">Final Details</h2>
                                        <p className="text-zinc-500 text-sm mb-6">Describe the memory or emotion you want captured.</p>

                                        <textarea
                                            required
                                            value={desc}
                                            onChange={e => setDesc(e.target.value)}
                                            className="w-full h-32 bg-zinc-800 border border-zinc-700 p-3 text-white focus:outline-none focus:border-orange-200 transition-colors resize-none"
                                            placeholder="Imagine a sunset over..."
                                        />

                                        <div className="bg-zinc-800/50 p-4 border border-zinc-800 text-sm text-zinc-400">
                                            <span className="block text-zinc-300 font-medium mb-1">Selected Style: {style || 'Not selected'}</span>
                                            Estimated Quote: ₹3500 - ₹5000
                                        </div>

                                        <div className="mt-auto flex gap-3">
                                            <Button type="button" variant="ghost" onClick={() => setStep(1)} className="w-1/2 justify-center">
                                                Back
                                            </Button>
                                            <Button type="submit" className="w-1/2 justify-center bg-white text-black hover:bg-zinc-200">
                                                Submit Request <Send size={16} />
                                            </Button>
                                        </div>
                                    </form>
                                )}

                                {step === 3 && (
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black mb-6"
                                        >
                                            <Send size={24} />
                                        </motion.div>
                                        <h2 className="text-3xl font-serif text-white mb-4">Request Sent</h2>
                                        <p className="text-zinc-400 max-w-xs mx-auto mb-8">
                                            We have received your concept. An artist will review it and contact you within 48 hours.
                                        </p>
                                        <Button onClick={onClose} variant="outline" className="w-full">
                                            Return to Gallery
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
