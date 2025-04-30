"use client";

import {useRef, useEffect} from 'react';
import styles from './GlassButton.module.css';

interface TabGlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive: boolean;
}

export default function TabGlassButton({
                                           children,
                                           className = '',
                                           type = 'button',
                                           isActive,
                                           ...props
                                       }: TabGlassButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const btn = buttonRef.current;
        if (!btn) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            btn.style.setProperty('--mouse-x', `${mouseX}px`);
            btn.style.setProperty('--mouse-y', `${mouseY}px`);

            const rotateX = (mouseY / rect.height) * 10 - 5; // Уменьшаем вращение для вкладок
            const rotateY = (mouseX / rect.width) * -10 + 5;

            btn.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
        };

        const resetTransform = () => {
            btn.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', resetTransform);
        btn.addEventListener('blur', resetTransform);

        return () => {
            btn.removeEventListener('mousemove', handleMouseMove);
            btn.removeEventListener('mouseleave', resetTransform);
            btn.removeEventListener('blur', resetTransform);
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            type={type}
            className={`${styles.glassButton} ${className} ${
                isActive ? styles.activeTab : ''
            }`}
            {...props}
        >
            <span className={styles.label}>{children}</span>
        </button>
    );
}