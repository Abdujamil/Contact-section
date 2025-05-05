import {StaticImageData} from "next/image";

export interface AnimationSettings {
    duration: number;
    bounce: number; // Амплитуда отскока
    delay: number;   // Задержка
    ease: any;  // ease кривая
    times: number[]; // Временные точки для transition
    openY: number[]; // Анимация при открытии
    closeY: number[]; // Анимация при закрытии
    opacity: number[]; // Массив значений для opacity
}

export interface FaqCardProps {
    id: number;
    num: string;
    question: string;
    answer: string;
    fullAnswer: any;
    src: string | StaticImageData;
    defaultOpen?: boolean;
    isOpen?: boolean;
    onToggle?: (id: number) => void;
    animationSettings?: AnimationSettings;
}

export const defaultSettings: AnimationSettings = {
    duration: 0.6,
    bounce: 5,
    delay: 0,
    ease: [0.34, 1.56, 0.64, 1],
    times: [0, 0.2, 0.5, 0.8, 1],
    openY: [0, 26, 0, 0, 0], // Анимация открытия
    closeY: [60, -6, 0, 0, 0], // Анимация закрытия
    opacity: [0, 1, 1, 1, 1],    // Дефолтные значения для opacity
};