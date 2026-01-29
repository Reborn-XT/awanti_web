
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { INVENTORY, type Product } from '../data';
import { Section } from './ui';

const ProductCard = ({ product, index }: { product: Product, index: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    return (
        <motion.div
            ref={ref}
            style={{ y: index % 2 === 0 ? 0 : y }} // Staggered parallax effect
            className="group relative cursor-pointer"
        >
            <div className="overflow-hidden bg-zinc-900 aspect-[3/4] relative">
                <motion.img
                    style={{ scale }}
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-80"
                    loading="lazy"
                />

                {/* Texture/Detail Reveal on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white font-serif italic text-lg tracking-widest border-b border-white/50 pb-1">View Details</span>
                </div>
            </div>

            <div className="mt-6 flex justify-between items-end">
                <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">{product.cat}</span>
                    <h3 className="text-xl font-serif text-zinc-200 group-hover:text-white transition-colors">{product.title}</h3>
                </div>
                <span className="text-zinc-400 font-light">₹{product.price}</span>
            </div>
        </motion.div>
    );
};

export const Collection = ({ onOpenGallery }: { onOpenGallery: () => void }) => {
    return (
        <Section className="py-32 px-6 bg-zinc-950 z-10">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="text-xs tracking-[0.3em] text-zinc-500 uppercase block mb-4">Chapter I</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
                            Curated<br />
                            <span className="text-zinc-600">Masterpieces</span>
                        </h2>
                    </div>
                    <p className="text-zinc-400 max-w-sm text-lg leading-relaxed font-light">
                        Each piece is a window into a different world. Hand-crafted, textured, and bursting with emotion.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-12">
                    {INVENTORY.slice(0, 9).map((product, i) => (
                        <ProductCard key={product.id} product={product} index={i} />
                    ))}
                </div>

                <div className="mt-32 text-center">
                    <button onClick={onOpenGallery} className="text-white border-b border-white/30 hover:border-white pb-1 transition-all">View Full Archive</button>
                </div>
            </div>
        </Section>
    );
};
