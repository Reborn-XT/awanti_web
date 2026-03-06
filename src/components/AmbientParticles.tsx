import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    opacity: number;
    life: number;
    maxLife: number;
}

export const AmbientParticles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        const particles: Particle[] = [];
        const PARTICLE_COUNT = 20;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize particles
        const createParticle = (): Particle => ({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 100,
            size: Math.random() * 2 + 0.5,
            speedY: -(Math.random() * 0.3 + 0.1),
            speedX: (Math.random() - 0.5) * 0.2,
            opacity: 0,
            life: 0,
            maxLife: Math.random() * 600 + 300,
        });

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p = createParticle();
            p.y = Math.random() * canvas.height; // Spread initially
            p.life = Math.random() * p.maxLife; // Stagger
            particles.push(p);
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.life++;
                p.x += p.speedX;
                p.y += p.speedY;

                // Fade in/out based on life
                const lifeRatio = p.life / p.maxLife;
                if (lifeRatio < 0.1) {
                    p.opacity = (lifeRatio / 0.1) * 0.25;
                } else if (lifeRatio > 0.8) {
                    p.opacity = ((1 - lifeRatio) / 0.2) * 0.25;
                } else {
                    p.opacity = 0.25;
                }

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(192, 160, 98, ${p.opacity})`;
                ctx.fill();

                // Reset if dead or out of bounds
                if (p.life >= p.maxLife || p.y < -20) {
                    particles[i] = createParticle();
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[5]"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};
