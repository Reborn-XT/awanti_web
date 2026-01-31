
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { HeroSequence } from './components/HeroSequence';
import { Slideshow } from './components/Slideshow';
import { Process } from './components/Process';
import { Commission } from './components/Commission';
import { FullGallery } from './components/FullGallery';
import { Reviews } from './components/Reviews';
import { Button } from './components/ui';



import { CommissionModal } from './components/CommissionModal';

function App() {
  const [showSticky, setShowSticky] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showCommission, setShowCommission] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Sticky CTA Logic
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-50 font-sans selection:bg-orange-200/30">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-white">
        <a href="#" className="text-xl font-serif font-bold tracking-tighter hover:opacity-70 transition-opacity">AWANTI.</a>

        <div className="flex items-center gap-8">
          <button onClick={() => setShowGallery(true)} className="text-sm font-medium tracking-wide hover:text-zinc-300 transition-colors">GALLERY</button>
          <button className="hidden md:block text-sm font-medium tracking-wide hover:text-zinc-300 transition-colors">PROCESS</button>
          <button onClick={() => setShowCommission(true)} className="hidden md:block text-sm font-medium tracking-wide hover:text-zinc-300 transition-colors">COMMISSION</button>
          <div className="relative cursor-pointer group">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </nav>

      <main>
        <HeroSequence />

        {/* Narrative Prologue */}
        <section className="py-24 px-6 max-w-2xl mx-auto text-center z-10 relative">
          <p className="text-xl md:text-2xl font-serif leading-relaxed text-zinc-300">
            "Art is not just what you see, but what you make others feel.
            This collection is a curated anthology of moments, frozen in time and color."
          </p>
          <div className="w-px h-16 bg-zinc-800 mx-auto mt-12"></div>
        </section>

        <Slideshow />
        <Process />
        <Commission onStartCommission={() => setShowCommission(true)} />
        <Reviews />
        <FullGallery isOpen={showGallery} onClose={() => setShowGallery(false)} />
        <CommissionModal isOpen={showCommission} onClose={() => setShowCommission(false)} />
      </main>

      <footer className="py-24 px-6 bg-zinc-50 text-zinc-900 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="text-[10vw] font-serif leading-none opacity-10 select-none pointer-events-none">AWANTI</h1>
          <div className="mt-12 flex gap-8 text-sm font-medium tracking-widest uppercase">
            <a href="#" className="hover:text-zinc-500 transition-colors">Instagram</a>
            <a href="#" className="hover:text-zinc-500 transition-colors">Twitter</a>
            <a href="#" className="hover:text-zinc-500 transition-colors">Email</a>
          </div>
          <p className="mt-12 text-zinc-400 text-xs text-center font-sans">
            © 2026 Awanti Art Gallery. Crafted with Emotion.<br />
            Redesigned by Antigravity using React, Tailwind & Framer Motion.
          </p>
        </div>
      </footer>

      {/* Sticky Bottom CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-40"
          >
            <Button onClick={() => setShowCommission(true)} className="shadow-2xl bg-white text-black border border-zinc-200">
              Create Your Artwork <ArrowUpRight size={16} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
