import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, Instagram, Mail, Lock, Star, ChevronRight, Palette } from 'lucide-react';

// --- DATA FROM PDF ---
const INVENTORY = [
  { id: 1, title: "Serene Nature", price: 249, size: "4x4 inches", cat: "Miniature", status: "Available", img: "https://images.unsplash.com/photo-1579783902614-a3fb39279c71?auto=format&fit=crop&q=80&w=800", desc: "A pocket-sized window to peace. Hand-painted on mini canvas with easel." },
  { id: 2, title: "Sunset Silhouette", price: 299, size: "4x4 inches", cat: "Miniature", status: "Available", img: "https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?auto=format&fit=crop&q=80&w=800", desc: "Warm gradients meeting dark horizons. Perfect for desk warmth." },
  { id: 3, title: "Twilight Landscape", price: 299, size: "4x4 inches", cat: "Miniature", status: "Available", img: "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&q=80&w=800", desc: "Cool tones for a calm mind. Varnished finish." },
  { id: 4, title: "Panda & Bamboo", price: 399, size: "4x4 inches", cat: "Cute Art", status: "Available", img: "https://images.unsplash.com/photo-1628151016004-e0c2f6d62911?auto=format&fit=crop&q=80&w=800", desc: "Playful spirit animal art. Includes wooden easel stand." },
  { id: 5, title: "Urban Cityscape", price: 449, size: "4x4 inches", cat: "Miniature", status: "Available", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800", desc: "The city that never sleeps, now on your desk." },
  { id: 6, title: "Magical World", price: 349, size: "4x4 inches", cat: "Fantasy", status: "Sold Out", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800", desc: "A glimpse into the ethereal." },
  { id: 7, title: "Flamingo Queen", price: 799, size: "8x8 inches", cat: "Statement", status: "Available", img: "https://images.unsplash.com/photo-1552089123-2d26226fc2b7?auto=format&fit=crop&q=80&w=800", desc: "Bold pinks and confident strokes." },
  { id: 8, title: "Deadpool & Wolverine", price: 599, size: "8x8 inches", cat: "Pop Culture", status: "Sold Out", img: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=800", desc: "Maximum effort. Hand-painted tribute." },
  { id: 9, title: "Fairytale Landscape", price: 1499, size: "6x8 inches", cat: "Landscape", status: "Available", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800", desc: "Where dreams meet canvas. Intricate detailing." },
  { id: 10, title: "Peaceful Evening", price: 1899, size: "6x8 inches", cat: "Landscape", status: "Available", img: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&q=80&w=800", desc: "Serenity captured in oil." },
  { id: 11, title: "Italian Town", price: 3299, size: "6x8 inches", cat: "Masterpiece", status: "Sold Out", img: "https://images.unsplash.com/photo-1520190283912-669d2a34e432?auto=format&fit=crop&q=80&w=800", desc: "Cobblestone streets and warm memories." },
  { id: 12, title: "Custom Ghibli Style", price: 3499, size: "6x8 inches", cat: "Commission", status: "Waitlist", img: "https://images.unsplash.com/photo-1558679934-29729a67a06d?auto=format&fit=crop&q=80&w=800", desc: "Your memory, reimagined in the style of Studio Ghibli." },
  { id: 13, title: "Abstract City Rain", price: 4999, size: "12x16 inches", cat: "Masterpiece", status: "Sold Out", img: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800", desc: "Leonid Afremov style. Vibrant, palette knife texture." },
];

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // addToCart
  const addToCart = (item) => {
    if (item.status === "Available") {
      setCart([...cart, item]);
      setActiveModal(null);
    }
  };

  return (
    <div className="bg-zinc-950 text-zinc-50 font-sans selection:bg-amber-900 selection:text-white overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-zinc-950/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-serif tracking-widest font-bold">AWANTI<span className="text-amber-600">.</span>ART</div>
          
          <div className="hidden md:flex space-x-8 text-sm tracking-widest uppercase opacity-80">
            <a href="#collection" className="hover:text-amber-500 transition-colors">Collection</a>
            <a href="#custom" className="hover:text-amber-500 transition-colors">Commissions</a>
            <a href="#about" className="hover:text-amber-500 transition-colors">About</a>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative cursor-pointer group">
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
            <Menu className="md:hidden cursor-pointer" size={24} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (Texture Reveal) --- */}
      <section className="relative h-[120vh] w-full overflow-hidden">
        {/* The painting that zooms out */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-75"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=1920')`,
            transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.2}px)`,
            filter: `brightness(${1 - scrollY * 0.001})` 
          }}
        />
        
        {/* Dark Overlay that fades away */}
        <div 
          className="absolute inset-0 bg-zinc-950 pointer-events-none transition-opacity duration-700 ease-out"
          style={{ opacity: Math.max(0, 1 - scrollY / 500) }} 
        >
            <div className="h-full w-full flex flex-col items-center justify-center">
                <h1 className="text-4xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 tracking-tighter opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 1 }}>
                    ART THAT SPEAKS
                </h1>
                <p className="mt-4 text-zinc-400 text-sm tracking-[0.3em] uppercase opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 1 }}>
                    Scroll to Explore
                </p>
            </div>
        </div>

        {/* Text that slides in after scroll */}
        <div 
          className="absolute bottom-32 left-6 md:left-24 max-w-lg pointer-events-none"
          style={{ 
            transform: `translateY(${100 - Math.min(100, scrollY * 0.2)}px)`,
            opacity: Math.min(1, (scrollY - 200) / 300) 
          }}
        >
          <h2 className="text-5xl font-serif leading-tight">
            The <span className="text-amber-600 italic">Vibrant</span> <br/> Abstract Cityscape
          </h2>
          <div className="mt-6 flex items-center space-x-4">
            <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs uppercase tracking-wider bg-zinc-900/50 backdrop-blur">12x16 Inches</span>
            <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs uppercase tracking-wider bg-zinc-900/50 backdrop-blur">Varnished</span>
          </div>
        </div>
      </section>

      {/* --- HORIZONTAL SCROLL GALLERY (The Master Collection) --- */}
      <section id="collection" className="relative py-24 bg-zinc-950">
        <div className="container mx-auto px-6 mb-12">
            <h3 className="text-zinc-500 uppercase tracking-widest text-sm mb-2">Curated Collection</h3>
            <h2 className="text-3xl md:text-4xl font-serif">From Moments to Masterpieces</h2>
        </div>

        {/* Scroll Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-12 hide-scrollbar space-x-8 px-6 md:px-24">
            {/* High Value / Sold Out Items */}
            {INVENTORY.filter(i => i.price > 1000).map((item) => (
                <div key={item.id} className="snap-center shrink-0 w-[85vw] md:w-[600px] relative group cursor-pointer" onClick={() => setActiveModal(item)}>
                    <div className="aspect-[4/5] overflow-hidden relative rounded-sm">
                        <img 
                            src={item.img} 
                            alt={item.title} 
                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${item.status !== 'Available' ? 'grayscale group-hover:grayscale-0' : ''}`} 
                        />
                        {/* Status Tag */}
                        <div className="absolute top-4 right-4">
                            {item.status === 'Available' ? (
                                <span className="bg-amber-600 text-black text-xs font-bold px-3 py-1 uppercase tracking-wider">Available</span>
                            ) : (
                                <span className="bg-zinc-200 text-black text-xs font-bold px-3 py-1 uppercase tracking-wider">{item.status}</span>
                            )}
                        </div>
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="border border-white/30 text-white px-6 py-3 uppercase tracking-widest text-xs backdrop-blur-sm">View Details</span>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-between items-end">
                        <div>
                            <h3 className="text-2xl font-serif">{item.title}</h3>
                            <p className="text-zinc-500 text-sm mt-1">{item.size} — {item.cat}</p>
                        </div>
                        <p className="text-xl font-light">₹{item.price}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* --- THE MINIATURE GRID (Masonry Feel) --- */}
      <section className="py-24 bg-zinc-900/50">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div>
                    <h2 className="text-3xl md:text-5xl font-serif">Pocket Serenity</h2>
                    <p className="text-zinc-400 mt-4 max-w-md font-light">
                        Small scale, massive impact. Perfect for desks, shelves, and thoughtful gifts. Each piece includes a wooden easel.
                    </p>
                </div>
                <div className="hidden md:block">
                    <ArrowRight className="text-amber-600" size={32} />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {INVENTORY.filter(i => i.price < 1000).map((item) => (
                    <div 
                        key={item.id} 
                        className="group relative cursor-pointer"
                        onClick={() => setActiveModal(item)}
                    >
                        <div className="aspect-square overflow-hidden bg-zinc-800 rounded-sm relative">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                            {item.status !== "Available" && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <span className="text-xs uppercase tracking-widest border border-white/20 px-3 py-1">Sold Out</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-3">
                            <div className="flex justify-between items-start">
                                <h4 className="text-sm font-medium group-hover:text-amber-500 transition-colors">{item.title}</h4>
                                <span className="text-sm text-zinc-400">₹{item.price}</span>
                            </div>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-wide mt-1">{item.cat}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- CUSTOM ORDERS (Scroll Trigger Animation) --- */}
      <section id="custom" className="min-h-screen bg-zinc-950 flex flex-col md:flex-row items-center relative overflow-hidden">
        {/* Left: Text (Sticky) */}
        <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center z-10 bg-zinc-950/80 backdrop-blur-sm md:bg-transparent">
            <div className="inline-flex items-center space-x-2 text-amber-500 mb-4">
                <Palette size={16} />
                <span className="uppercase tracking-widest text-xs font-bold">Commissions Open</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6">
                Your Story, <br/> Painted.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-md">
                Turn a cherished memory into a timeless piece of art. Whether it's a Ghibli-style portrait or a landscape from your travels, we bring your vision to life on canvas.
            </p>
            <button className="bg-white text-black px-8 py-4 uppercase tracking-widest text-xs font-bold w-fit hover:bg-amber-500 hover:text-white transition-colors">
                Request Commission
            </button>
        </div>

        {/* Right: Visual (Parallax) */}
        <div className="absolute top-0 right-0 w-full md:w-2/3 h-full opacity-40 md:opacity-100">
             {/* Simulating the "Sketch to Art" effect with CSS blend modes */}
             <div className="relative h-full w-full">
                <img 
                    src="https://images.unsplash.com/photo-1558679934-29729a67a06d?auto=format&fit=crop&q=80&w=1200" 
                    alt="Ghibli Style Art" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-zinc-950/20 to-zinc-950" />
             </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section id="about" className="py-32 border-t border-zinc-900">
        <div className="container mx-auto px-6 text-center">
            <Star className="mx-auto text-amber-600 mb-8" size={32} />
            <h2 className="text-3xl font-serif mb-6">Hand-Painted. Varnished. Yours.</h2>
            <p className="max-w-2xl mx-auto text-zinc-400 font-light leading-relaxed">
                "I believe art shouldn't just be viewed; it should be felt. From the texture of the brushstrokes to the final coat of protective varnish, every piece is a labor of love designed to add a soul to your space."
            </p>
            <div className="mt-12 flex justify-center space-x-6">
                <Instagram className="text-zinc-600 hover:text-white cursor-pointer transition-colors" />
                <Mail className="text-zinc-600 hover:text-white cursor-pointer transition-colors" />
            </div>
            <p className="mt-12 text-zinc-700 text-xs uppercase tracking-widest">© 2026 Awanti Art. All Rights Reserved.</p>
        </div>
      </section>

      {/* --- PRODUCT MODAL --- */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setActiveModal(null)} />
            <div className="bg-zinc-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row rounded-sm shadow-2xl border border-zinc-800 animate-fade-in-up">
                <button 
                    onClick={() => setActiveModal(null)}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-white z-10"
                >
                    <X size={24} />
                </button>

                {/* Image Side */}
                <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-8">
                    <img 
                        src={activeModal.img} 
                        alt={activeModal.title} 
                        className="max-h-[60vh] md:max-h-full object-contain shadow-2xl" 
                    />
                </div>

                {/* Info Side */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-2">
                        <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">{activeModal.cat}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">{activeModal.title}</h2>
                    <p className="text-zinc-400 leading-relaxed mb-6">{activeModal.desc}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                        <div className="border-t border-zinc-800 pt-3">
                            <span className="text-zinc-500 block text-xs uppercase">Dimensions</span>
                            <span>{activeModal.size}</span>
                        </div>
                        <div className="border-t border-zinc-800 pt-3">
                            <span className="text-zinc-500 block text-xs uppercase">Finish</span>
                            <span>Varnished</span>
                        </div>
                        <div className="border-t border-zinc-800 pt-3">
                            <span className="text-zinc-500 block text-xs uppercase">Inclusions</span>
                            <span>Easel Stand</span>
                        </div>
                         <div className="border-t border-zinc-800 pt-3">
                            <span className="text-zinc-500 block text-xs uppercase">Status</span>
                            <span className={activeModal.status === "Available" ? "text-green-400" : "text-zinc-500"}>{activeModal.status}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-8 border-t border-zinc-800">
                        <span className="text-2xl font-light">₹{activeModal.price}</span>
                        {activeModal.status === "Available" ? (
                            <button 
                                onClick={() => addToCart(activeModal)}
                                className="bg-white text-black px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-amber-500 hover:text-white transition-colors"
                            >
                                Add to Cart
                            </button>
                        ) : (
                            <button disabled className="bg-zinc-800 text-zinc-500 px-8 py-3 uppercase tracking-widest text-xs font-bold cursor-not-allowed flex items-center space-x-2">
                                <Lock size={12} />
                                <span>Waitlist</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Custom Styles for Scrollbar hidden but functional */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;