
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui';

interface CommissionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CommissionModal = ({ isOpen, onClose }: CommissionModalProps) => {
    const [step, setStep] = useState(1);
    const [style, setStyle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [focusedField, setFocusedField] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
    };

    const handleClose = () => {
        onClose();
        // Reset after close animation
        setTimeout(() => { setStep(1); setStyle(''); setDesc(''); }, 300);
    };

    // Step transition variants
    const stepVariants = {
        enter: { opacity: 0, x: 40, filter: 'blur(4px)' },
        center: { opacity: 1, x: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, x: -40, filter: 'blur(4px)' }
    };

    const styles = [
        { name: 'Ghibli', emoji: '🏔️', desc: 'Warm, hand-painted aesthetic' },
        { name: 'Realistic', emoji: '🎨', desc: 'True-to-life precision' },
        { name: 'Abstract', emoji: '✨', desc: 'Expressive & experimental' },
        { name: 'Portrait', emoji: '👤', desc: 'Capturing personality' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/70 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden rounded-xl"
                    >
                        {/* Ambient glow */}
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[var(--color-accent)] opacity-[0.03] rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500 opacity-[0.02] rounded-full blur-[80px] pointer-events-none" />

                        {/* Close Button */}
                        <motion.button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-10 p-1 hover:bg-white/10 rounded-full"
                            whileHover={{ rotate: 90, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={22} />
                        </motion.button>

                        <div className="flex flex-col md:flex-row h-[600px]">
                            {/* Side Panel - Enhanced */}
                            <div className="hidden md:flex md:flex-col w-1/3 bg-zinc-950 p-8 border-r border-zinc-800 relative overflow-hidden">
                                {/* Side panel ambient */}
                                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 pointer-events-none" />

                                <div className="relative z-10">
                                    <h3 className="text-xl font-serif text-white mb-8">The Process</h3>
                                    <div className="space-y-4">
                                        {[
                                            { n: 1, label: 'Details', icon: '📝' },
                                            { n: 2, label: 'Review', icon: '👁️' },
                                            { n: 3, label: 'Confirmed', icon: '✨' }
                                        ].map(({ n, label, icon }) => (
                                            <motion.div
                                                key={n}
                                                className={`flex items-center gap-3 py-3 px-3 rounded-lg transition-all duration-500 ${step === n
                                                        ? 'bg-white/5 text-white border border-white/10'
                                                        : step > n
                                                            ? 'text-[var(--color-accent)]'
                                                            : 'text-zinc-600'
                                                    }`}
                                                animate={step === n ? { x: 4 } : { x: 0 }}
                                            >
                                                <span className="text-sm">{icon}</span>
                                                <span className="text-sm font-medium">{n}. {label}</span>
                                                {step > n && (
                                                    <motion.span
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="ml-auto text-green-400 text-xs"
                                                    >
                                                        ✓
                                                    </motion.span>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div className="relative z-10 mt-8">
                                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-[var(--color-accent)] to-amber-300 rounded-full"
                                            animate={{ width: `${(step / 3) * 100}%` }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-zinc-600 mt-2 block">Step {step} of 3</span>
                                </div>

                                <div className="mt-auto relative z-10">
                                    <div className="text-xs uppercase tracking-widest text-zinc-600 mb-2">Current Waitlist</div>
                                    <div className="text-2xl text-white font-serif">Feb '26</div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className={`w-5 h-5 rounded-full border-2 border-zinc-950 bg-zinc-${600 + i * 100}`} />
                                            ))}
                                        </div>
                                        <span className="text-[10px] text-zinc-500 ml-2">+12 in queue</span>
                                    </div>
                                </div>
                            </div>

                            {/* Form Area - Animated Steps */}
                            <div className="w-full md:w-2/3 p-8 md:p-12 overflow-y-auto bg-zinc-900 text-zinc-50 relative">
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.form
                                            key="step1"
                                            variants={stepVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.3 }}
                                            onSubmit={() => setStep(2)}
                                            className="space-y-6"
                                        >
                                            <div>
                                                <h2 className="text-2xl font-serif mb-2">Tell us your vision</h2>
                                                <p className="text-zinc-500 text-sm mb-6">Every masterpiece begins with a conversation.</p>

                                                <label className="block text-sm text-zinc-400 mb-2">Name</label>
                                                <motion.input
                                                    required
                                                    type="text"
                                                    className={`w-full bg-zinc-800/50 border p-3.5 text-white rounded-lg focus:outline-none transition-all duration-300 ${focusedField === 'name' ? 'border-[var(--color-accent)] shadow-[0_0_20px_rgba(192,160,98,0.1)]' : 'border-zinc-700'
                                                        }`}
                                                    placeholder="Your Name"
                                                    onFocus={() => setFocusedField('name')}
                                                    onBlur={() => setFocusedField('')}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm text-zinc-400 mb-2">Email</label>
                                                <motion.input
                                                    required
                                                    type="email"
                                                    className={`w-full bg-zinc-800/50 border p-3.5 text-white rounded-lg focus:outline-none transition-all duration-300 ${focusedField === 'email' ? 'border-[var(--color-accent)] shadow-[0_0_20px_rgba(192,160,98,0.1)]' : 'border-zinc-700'
                                                        }`}
                                                    placeholder="your@email.com"
                                                    onFocus={() => setFocusedField('email')}
                                                    onBlur={() => setFocusedField('')}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm text-zinc-400 mb-3">Preferred Style</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {styles.map(s => (
                                                        <motion.button
                                                            type="button"
                                                            key={s.name}
                                                            onClick={() => setStyle(s.name)}
                                                            whileHover={{ scale: 1.02, y: -2 }}
                                                            whileTap={{ scale: 0.97 }}
                                                            className={`p-4 text-left border rounded-xl transition-all duration-300 ${style === s.name
                                                                    ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/50 text-white shadow-[0_0_30px_rgba(192,160,98,0.08)]'
                                                                    : 'bg-zinc-800/30 border-zinc-700/50 text-zinc-400 hover:border-zinc-500 hover:bg-zinc-800/50'
                                                                }`}
                                                        >
                                                            <span className="text-lg block mb-1">{s.emoji}</span>
                                                            <span className="text-sm font-medium block">{s.name}</span>
                                                            <span className="text-[10px] opacity-60">{s.desc}</span>
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="pt-4">
                                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                                    <Button type="submit" className="w-full justify-center bg-white text-black hover:bg-zinc-200 rounded-lg">
                                                        Continue <ArrowRight size={16} />
                                                    </Button>
                                                </motion.div>
                                            </div>
                                        </motion.form>
                                    )}

                                    {step === 2 && (
                                        <motion.form
                                            key="step2"
                                            variants={stepVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.3 }}
                                            onSubmit={handleSubmit}
                                            className="space-y-6 h-full flex flex-col"
                                        >
                                            <h2 className="text-2xl font-serif mb-2">Final Details</h2>
                                            <p className="text-zinc-500 text-sm mb-4">Describe the memory or emotion you want captured.</p>

                                            <textarea
                                                required
                                                value={desc}
                                                onChange={e => setDesc(e.target.value)}
                                                className={`w-full h-32 bg-zinc-800/50 border p-4 text-white rounded-xl focus:outline-none transition-all duration-300 resize-none ${focusedField === 'desc' ? 'border-[var(--color-accent)] shadow-[0_0_20px_rgba(192,160,98,0.1)]' : 'border-zinc-700'
                                                    }`}
                                                placeholder="Imagine a sunset over..."
                                                onFocus={() => setFocusedField('desc')}
                                                onBlur={() => setFocusedField('')}
                                            />

                                            {/* Character count */}
                                            <div className="text-right text-[10px] text-zinc-600">
                                                {desc.length} characters
                                            </div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="bg-zinc-800/30 p-5 border border-zinc-800 rounded-xl text-sm text-zinc-400"
                                            >
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Sparkles size={14} className="text-[var(--color-accent)]" />
                                                    <span className="text-zinc-300 font-medium text-xs uppercase tracking-wider">Summary</span>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span>Style</span>
                                                        <span className="text-white">{style || 'Not selected'}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Estimated Quote</span>
                                                        <span className="text-[var(--color-accent)] font-medium">₹3,500 — ₹5,000</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Delivery</span>
                                                        <span className="text-white">2–3 weeks</span>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            <div className="mt-auto flex gap-3">
                                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-1/2">
                                                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="w-full justify-center rounded-lg">
                                                        <ArrowLeft size={16} /> Back
                                                    </Button>
                                                </motion.div>
                                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-1/2">
                                                    <Button type="submit" className="w-full justify-center bg-white text-black hover:bg-zinc-200 rounded-lg">
                                                        Submit <Send size={16} />
                                                    </Button>
                                                </motion.div>
                                            </div>
                                        </motion.form>
                                    )}

                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            variants={stepVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.3 }}
                                            className="h-full flex flex-col items-center justify-center text-center"
                                        >
                                            {/* Success animation */}
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                                                className="w-20 h-20 bg-gradient-to-br from-[var(--color-accent)] to-amber-300 rounded-full flex items-center justify-center text-black mb-8 shadow-[0_0_40px_rgba(192,160,98,0.3)]"
                                            >
                                                <Send size={28} />
                                            </motion.div>

                                            {/* Confetti-like particles */}
                                            {[...Array(6)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                                    animate={{
                                                        opacity: [0, 1, 0],
                                                        scale: [0, 1, 0.5],
                                                        x: Math.cos(i * Math.PI / 3) * 80,
                                                        y: Math.sin(i * Math.PI / 3) * 80 - 40,
                                                    }}
                                                    transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                                                    className="absolute w-2 h-2 rounded-full bg-[var(--color-accent)]"
                                                    style={{ top: '40%', left: '50%' }}
                                                />
                                            ))}

                                            <motion.h2
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-3xl font-serif text-white mb-4"
                                            >
                                                Request Sent
                                            </motion.h2>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="text-zinc-400 max-w-xs mx-auto mb-8"
                                            >
                                                We have received your concept. An artist will review it and contact you within 48 hours.
                                            </motion.p>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.7 }}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button onClick={handleClose} variant="outline" className="w-full rounded-lg">
                                                    Return to Gallery
                                                </Button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
