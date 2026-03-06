
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    children: React.ReactNode;
    icon?: boolean;
}

export const Button = ({ variant = 'primary', children, icon = false, className = '', ...props }: ButtonProps) => {
    const baseStyles = "relative px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium flex items-center gap-2 transition-all duration-300 overflow-hidden group";

    const variants = {
        primary: "bg-white text-black hover:text-white border border-white hover:border-[var(--color-accent)]",
        outline: "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/5",
        ghost: "bg-transparent text-[var(--color-text-muted)] hover:text-white"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {/* Sweep fill effect for primary buttons */}
            {variant === 'primary' && (
                <span className="absolute inset-0 bg-[var(--color-accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
            )}
            {variant === 'outline' && (
                <span className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0" />
            )}
            <span className="relative z-10 flex items-center gap-2">
                {children}
                {icon && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />}
            </span>
        </button>
    );
};

export const Section = ({ children, className = '', id = '' }: { children: React.ReactNode, className?: string, id?: string }) => (
    <section id={id} className={`relative w-full ${className}`}>
        {children}
    </section>
);
