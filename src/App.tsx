
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { HeroSequence } from './components/HeroSequence';
import { Slideshow } from './components/Slideshow';
import { Process } from './components/Process';
import { Commission } from './components/Commission';
import { FullGallery } from './components/FullGallery';
import { ShoppingBag } from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Marquee } from './components/Marquee';
import { Reviews } from './components/Reviews';
import { AmbientParticles } from './components/AmbientParticles';

function App() {
  const [showGallery, setShowGallery] = useState(false);
  const [loading, setLoading] = useState(true);

  // Refs for in-view animations
  const prologueRef = useRef(null);
  const footerRef = useRef(null);
  const INSTAGRAM_URL = "https://www.instagram.com/artsyauraa_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
  const prologueInView = useInView(prologueRef, { once: true, margin: "-100px" });
  const footerInView = useInView(footerRef, { once: true, margin: "-100px" });

  // Prologue parallax
  const prologueSectionRef = useRef(null);
  const { scrollYProgress: prologueScroll } = useScroll({
    target: prologueSectionRef,
    offset: ["start end", "end start"]
  });
  const quoteY = useTransform(prologueScroll, [0, 1], [60, -60]);
  const decoY1 = useTransform(prologueScroll, [0, 1], [40, -40]);
  const decoY2 = useTransform(prologueScroll, [0, 1], [-30, 30]);

  useEffect(() => {
    if (loading) return; // Don't init Lenis until preloader is done

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

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  // Word-by-word reveal for prologue
  const prologueWords = "Art is not just what you see, but what you make others feel. This collection is a curated anthology of moments, frozen in time and color.".split(' ');

  return (
    <div className="bg-white min-h-screen text-zinc-900 font-sans selection:bg-orange-200/30 cursor-none md:cursor-none">

      {/* Preloader */}
      <Preloader onComplete={() => setLoading(false)} />

      {/* Custom Cursor (Desktop only) */}
      <CustomCursor />

      {/* Film Grain Overlay */}
      <div className="noise-overlay" />

      {/* Ambient Gold Particles (visible on dark sections) */}
      {!loading && <AmbientParticles />}

      {/* Navigation - Clean & Sharp */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-start md:items-center pointer-events-none">
        <motion.a
          href="#"
          className="flex items-center hover:opacity-90 transition-opacity pointer-events-auto mt-2 md:mt-1 relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Ambient white glow to make black text visible on dark backgrounds */}
          <div className="absolute inset-0 bg-white/30 blur-2xl rounded-full scale-110 pointer-events-none" />
          <img src="/artsy-logo.png" alt="Awanti Logo" className="h-20 md:h-32 w-auto object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
        </motion.a>

        <div className="flex items-center gap-8 mix-blend-difference text-white pointer-events-auto pt-4 md:pt-0">
          <button onClick={() => setShowGallery(true)} className="nav-link text-sm font-medium tracking-wide hover:text-zinc-300 transition-colors">GALLERY</button>
          <button className="nav-link hidden md:block text-sm font-medium tracking-wide hover:text-zinc-300 transition-colors">PROCESS</button>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="nav-link hidden md:block text-sm font-medium tracking-wide hover:text-zinc-300 transition-colors">COMMISSION</a>
          <motion.div
            className="relative cursor-pointer group"
            whileHover={{ scale: 1.15, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
          </motion.div>
        </div>
      </nav>

      <main>
        <HeroSequence />

        {/* Narrative Prologue - Enhanced with Parallax */}
        <section
          ref={prologueSectionRef}
          className="py-32 md:py-48 px-6 max-w-full mx-auto text-center z-10 relative bg-zinc-950 overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)] opacity-[0.02] rounded-full blur-[120px]" />
          </div>

          {/* Parallax decorative elements */}
          <motion.div
            style={{ y: quoteY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          >
            <span className="text-[20vw] font-serif text-white/[0.015] leading-none">"</span>
          </motion.div>

          {/* Floating line — left */}
          <motion.div
            style={{ y: decoY1 }}
            className="absolute top-1/4 left-[10%] w-px h-24 bg-gradient-to-b from-transparent via-zinc-700/30 to-transparent pointer-events-none"
          />

          {/* Floating circle — right */}
          <motion.div
            style={{ y: decoY2 }}
            className="absolute bottom-1/4 right-[12%] w-3 h-3 rounded-full border border-zinc-700/20 pointer-events-none"
          />

          {/* Small accent dot */}
          <motion.div
            style={{ y: decoY1 }}
            className="absolute top-1/3 right-[20%] w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-20 pointer-events-none"
          />

          <div ref={prologueRef} className="max-w-2xl mx-auto relative z-10">
            <p className="text-xl md:text-2xl font-serif leading-relaxed text-zinc-100">
              <span className="inline">"</span>
              {prologueWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={prologueInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
              <span className="inline">"</span>
            </p>

            <motion.div
              initial={{ scaleY: 0 }}
              animate={prologueInView ? { scaleY: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
              className="w-px h-16 bg-zinc-700 mx-auto mt-12 origin-top"
            />
          </div>
        </section>

        <Slideshow />

        {/* Marquee Band — Visual rhythm breaker */}
        <Marquee />

        <Process />

        {/* Testimonials */}
        <Reviews />

        <Commission onStartCommission={() => window.open(INSTAGRAM_URL, '_blank')} />
        <FullGallery isOpen={showGallery} onClose={() => setShowGallery(false)} />
      </main>

      {/* Footer with Stagger Animation */}
      <footer ref={footerRef} className="py-32 px-6 bg-zinc-950 text-zinc-300 border-t border-zinc-900 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-accent)] opacity-[0.015] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={footerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center select-none pointer-events-none text-white relative"
          >
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-white/20 blur-[60px] rounded-[100%] pointer-events-none" />
            <img src="/artsy-logo.png" alt="Awanti Logo" className="w-[45vw] max-w-[500px] mb-8 object-contain relative z-10 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]" />
            <span className="text-[4vw] font-serif leading-none text-zinc-600 relative z-10 uppercase tracking-widest">AWANTI</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={footerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-12 flex gap-8 text-sm font-medium tracking-widest uppercase"
          >
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
            <a href="#" className="footer-link">Twitter</a>
            <a href="#" className="footer-link">Email</a>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={footerInView ? { width: '120px' } : {}}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="h-px bg-zinc-800 mx-auto mt-12"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={footerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8 text-zinc-600 text-xs text-center font-sans"
          >
            © 2026 Awanti Art Gallery. Crafted with Emotion.<br />
            Redesigned by Antigravity using React, Tailwind & Framer Motion.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}

export default App;
