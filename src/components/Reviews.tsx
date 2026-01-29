
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../data';
import { Section } from './ui';

export const Reviews = () => {
    return (
        <Section className="py-32 px-6 bg-zinc-50 text-zinc-900 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-serif mb-6">Collectors' Voices</h2>
                    <p className="text-zinc-500 max-w-xl mx-auto text-lg">
                        Art is a dialogue. Here is what our community is saying about the pieces they've brought home.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {REVIEWS.map((review, i) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            className="bg-white p-10 shadow-sm border border-zinc-100 relative group hover:shadow-xl transition-shadow duration-500"
                        >
                            <Quote className="absolute top-8 right-8 text-zinc-100 w-12 h-12 group-hover:text-orange-100/50 transition-colors" />

                            <div className="flex gap-1 mb-6 text-orange-400">
                                {[...Array(review.rating)].map((_, r) => (
                                    <Star key={r} size={16} fill="currentColor" className="stroke-none" />
                                ))}
                            </div>

                            <p className="text-zinc-600 mb-8 leading-relaxed italic font-serif text-lg">
                                "{review.text}"
                            </p>

                            <div>
                                <h4 className="font-bold text-zinc-900 tracking-wide">{review.user}</h4>
                                <span className="text-xs text-zinc-400 uppercase tracking-widest">{review.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
