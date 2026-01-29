
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    children: React.ReactNode;
    icon?: boolean;
}

export const Button = ({ variant = 'primary', children, icon = false, className = '', ...props }: ButtonProps) => {
    const baseStyles = "px-8 py-4 font-medium tracking-wide transition-all duration-300 flex items-center gap-2 group relative overflow-hidden";

    const variants = {
        primary: "bg-zinc-50 text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]",
        outline: "border border-zinc-700 text-white hover:border-zinc-50 hover:bg-zinc-50/5",
        ghost: "text-zinc-400 hover:text-white"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
                {icon && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />}
            </span>
        </button>
    );
};

export const Section = ({ children, className = '', id = '' }: { children: React.ReactNode, className?: string, id?: string }) => (
    <section id={id} className={`relative w-full ${className}`}>
        {children}
    </section>
);
