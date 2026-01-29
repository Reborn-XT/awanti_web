
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { INVENTORY } from '../data';

interface InventoryItem {
    id: number;
    img: string;
    title: string;
    size: string;
    cat: string;
    price: number;
    status?: string;
}


interface FullGalleryProps {
    isOpen: boolean;
    onClose: () => void;
}

const CategoryFilter = ({
    active,
    categories,
    onSelect
}: {
    active: string,
    categories: string[],
    onSelect: (c: string) => void
}) => (
    <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-12">
        <button
            onClick={() => onSelect('All')}
            className={`text-sm tracking-widest uppercase transition-colors ${active === 'All' ? 'text-white border-b border-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
            All Works
        </button>
        {categories.map(cat => (
            <button
                key={cat}
                onClick={() => onSelect(cat)}
                className={`text-sm tracking-widest uppercase transition-colors ${active === cat ? 'text-white border-b border-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                {cat}
            </button>
        ))}
    </div>
);

// Lightbox Modal Component
interface ImageLightboxProps {
    item: InventoryItem | null;
    allItems: typeof INVENTORY;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

const ImageLightbox = ({ item, allItems, onClose, onPrev, onNext }: ImageLightboxProps) => {
    if (!item) return null;

    const currentIndex = allItems.findIndex(i => i.id === item.id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < allItems.length - 1;

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft' && hasPrev) onPrev();
        if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                onClick={onClose}
                onKeyDown={handleKeyDown}
                tabIndex={0}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 md:top-6 md:right-6 p-2 md:p-3 hover:bg-white/10 rounded-full transition-colors group z-20"
                    aria-label="Close"
                >
                    <X size={24} className="md:w-7 md:h-7 text-white group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Previous Button */}
                {hasPrev && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 md:p-3 hover:bg-white/10 rounded-full transition-colors group z-20"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={24} className="md:w-8 md:h-8 text-white" />
                    </button>
                )}

                {/* Next Button */}
                {hasNext && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 hover:bg-white/10 rounded-full transition-colors group z-20"
                        aria-label="Next image"
                    >
                        <ChevronRight size={24} className="md:w-8 md:h-8 text-white" />
                    </button>
                )}

                {/* Content Container */}
                <div
                    className="max-w-7xl max-h-[90vh] w-full flex flex-col md:flex-row gap-4 md:gap-6 items-center px-2 md:px-0"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Image Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 max-h-[50vh] md:max-h-[75vh] lg:max-h-[90vh] flex items-center justify-center"
                    >
                        <img
                            src={item.img}
                            alt={item.title}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        />
                    </motion.div>

                    {/* Details Panel */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 50, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="w-full md:w-80 bg-zinc-900/50 backdrop-blur-md p-4 md:p-6 lg:p-8 rounded-lg border border-zinc-800"
                    >
                        <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
                            {item.title}
                        </h2>

                        <div className="space-y-3 text-zinc-300">
                            <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                                <span className="text-zinc-400 text-sm uppercase tracking-wider">Category</span>
                                <span className="font-medium">{item.cat}</span>
                            </div>

                            <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                                <span className="text-zinc-400 text-sm uppercase tracking-wider">Size</span>
                                <span className="font-medium">{item.size}</span>
                            </div>

                            <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                                <span className="text-zinc-400 text-sm uppercase tracking-wider">Price</span>
                                <span className="font-medium text-lg text-orange-200">₹{item.price}</span>
                            </div>

                            {item.status && (
                                <div className="flex justify-between items-center pb-3">
                                    <span className="text-zinc-400 text-sm uppercase tracking-wider">Status</span>
                                    <span className={`font-medium px-3 py-1 rounded-full text-xs uppercase tracking-widest ${item.status === 'Sold Out'
                                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                        : 'bg-green-500/20 text-green-300 border border-green-500/30'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Navigation Hint */}
                        <div className="mt-6 pt-6 border-t border-zinc-800 text-xs text-zinc-500 text-center">
                            Use arrow keys or buttons to navigate
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export const FullGallery = ({ isOpen, onClose }: FullGalleryProps) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState<InventoryItem | null>(null);

    // Extract unique categories
    const categories = useMemo(() => Array.from(new Set(INVENTORY.map(i => i.cat))), []);

    // Filter items
    const filteredItems = useMemo(() => {
        if (selectedCategory === 'All') return INVENTORY;
        return INVENTORY.filter(i => i.cat === selectedCategory);
    }, [selectedCategory]);

    // Lightbox navigation handlers
    const handleImageClick = (item: InventoryItem) => {
        setSelectedImage(item);
    };

    const handleCloseLightbox = () => {
        setSelectedImage(null);
    };

    const handlePrevImage = () => {
        if (!selectedImage) return;
        const currentIndex = INVENTORY.findIndex(i => i.id === selectedImage.id);
        if (currentIndex > 0) {
            setSelectedImage(INVENTORY[currentIndex - 1]);
        }
    };

    const handleNextImage = () => {
        if (!selectedImage) return;
        const currentIndex = INVENTORY.findIndex(i => i.id === selectedImage.id);
        if (currentIndex < INVENTORY.length - 1) {
            setSelectedImage(INVENTORY[currentIndex + 1]);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '100%' }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-[60] bg-zinc-950 text-zinc-50 overflow-y-auto"
                    data-lenis-prevent
                >
                    {/* Header */}
                    <div className="sticky top-0 left-0 w-full flex justify-between items-center p-6 bg-zinc-950/90 backdrop-blur-md z-10 border-b border-zinc-900">
                        <span className="text-xl font-serif font-bold">The Archive.</span>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-zinc-900 rounded-full transition-colors group"
                        >
                            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>

                    <div className="max-w-[1600px] mx-auto p-6 md:p-12 pb-32">
                        <div className="mb-12">
                            <h2 className="text-4xl md:text-6xl font-serif mb-6">Explore the Collection</h2>
                            <p className="text-zinc-400 max-w-xl text-lg">
                                Dive deep into the complete works of Awanti Art. Filter by collection or style to find the piece that speaks to you.
                            </p>
                        </div>

                        <CategoryFilter
                            active={selectedCategory}
                            categories={categories}
                            onSelect={setSelectedCategory}
                        />

                        <motion.div
                            layout
                            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
                        >
                            <AnimatePresence mode='popLayout'>
                                {filteredItems.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="group cursor-pointer"
                                        onClick={() => handleImageClick(item)}
                                    >
                                        <div className="aspect-square bg-zinc-900 overflow-hidden relative mb-4">
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {item.status === 'Sold Out' && (
                                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 text-xs uppercase tracking-widest text-white border border-white/20">
                                                    Sold Out
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-lg leading-tight group-hover:text-orange-200 transition-colors">
                                                {item.title}
                                            </h3>
                                            <div className="flex justify-between items-center mt-1 text-zinc-500 text-sm">
                                                <span>{item.size} • {item.cat}</span>
                                                <span className="text-zinc-300">₹{item.price}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Image Lightbox */}
                    {selectedImage && (
                        <ImageLightbox
                            item={selectedImage}
                            allItems={INVENTORY}
                            onClose={handleCloseLightbox}
                            onPrev={handlePrevImage}
                            onNext={handleNextImage}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
