"use client";

import { useState, useEffect } from "react";

interface ButtonProps {
    title: string;
}

const Button: React.FC<ButtonProps> = ({ title }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        setTimeout(() => setIsVisible(true), 0);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        if (!isHovered) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [isHovered]);

    return (
        <div className="relative" onMouseLeave={handleMouseLeave}>
            <button className="p-1.5 text-lg" onMouseEnter={handleMouseEnter}>
                {title}
            </button>
            <div
                className={`absolute top-15 left-0 w-32 p-4 rounded-xl bg-slate-100 text-base flex flex-col gap-2
                    transition-all duration-300 ease-out
                    ${
                        isHovered
                            ? "opacity-100 translate-y-0 z-20"
                            : "opacity-0 -translate-y-5 z-10"
                    }
                    ${isVisible ? "max-h-screen" : "max-h-0"}`}
            >
                <div>안녕</div>
                <div>안녕</div>
                <div>안녕</div>
                <div>안녕</div>
                <div>안녕</div>
            </div>
        </div>
    );
};

export default Button;
