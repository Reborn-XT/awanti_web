import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show on desktop
        const isTouchDevice = 'ontouchstart' in window;
        if (isTouchDevice) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            setIsVisible(true);

            // Dot follows instantly
            dot.style.left = `${mouseX - 4}px`;
            dot.style.top = `${mouseY - 4}px`;
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        // Ring follows with lag (smooth trailing)
        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.left = `${ringX - 16}px`;
            ring.style.top = `${ringY - 16}px`;
            requestAnimationFrame(animateRing);
        };
        const animFrame = requestAnimationFrame(animateRing);

        // Detect hoverable elements
        const handleHoverIn = () => setIsHovering(true);
        const handleHoverOut = () => setIsHovering(false);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        // Add event listeners to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-hover');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleHoverIn);
            el.addEventListener('mouseleave', handleHoverOut);
        });

        // Observer for dynamically added elements
        const observer = new MutationObserver(() => {
            const newElements = document.querySelectorAll('a, button, [role="button"], .cursor-hover');
            newElements.forEach(el => {
                el.addEventListener('mouseenter', handleHoverIn);
                el.addEventListener('mouseleave', handleHoverOut);
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            cancelAnimationFrame(animFrame);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleHoverIn);
                el.removeEventListener('mouseleave', handleHoverOut);
            });
            observer.disconnect();
        };
    }, []);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

    return (
        <>
            <div
                ref={dotRef}
                className={`cursor-dot ${isHovering ? 'hover' : ''}`}
                style={{ opacity: isVisible ? 1 : 0 }}
            />
            <div
                ref={ringRef}
                className={`cursor-ring ${isHovering ? 'hover' : ''}`}
                style={{ opacity: isVisible ? 1 : 0 }}
            />
        </>
    );
};
