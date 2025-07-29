// src/components/Form/bounce.ts
import {BounceEffect} from "@/components/hooks/useBounce";
import {useAnimation} from "framer-motion";


export const bounceElements = () => {
    const myElement = document.getElementById('bounce-checkbox');

    // Анимация для чекбоксов
    if (myElement) {
        BounceEffect(myElement, {
            startPosition: "-50px",
            endPosition: `${5}px`,
            duration: 500,
            easing: "ease",
            direction: 'vertical',
            distanceCoficent: -1
        });
    }
};
const motionSettings = {
    duration: 0.6,
    bounce: 5,
    delay: 0,
    ease: [0.34, 1.56, 0.64, 1],
    times: [0, 0.2, 0.5, 0.8, 1],
    openY: [0, 26, 0, 0, 0], // Анимация открытия
    closeY: [60, -6, 0, 0, 0], // Анимация закрытия
    opacity: [0, 1, 1, 1, 1],    // Дефолтные значения для opacity
};
const runMotionEffect = (controls: ReturnType<typeof useAnimation>) => {
    controls.start({
        y: motionSettings.openY,
        opacity: motionSettings.opacity,
        transition: {
            duration: motionSettings.duration,
            ease: motionSettings.ease,
            times: motionSettings.times,
        },
    });
};
export const bounceActiveBlock = (activeTab: 'connection' | 'requisite', controls: ReturnType<typeof useAnimation>) => {
    const block = activeTab === 'connection'
        ? document.getElementById('form-main')
        : document.getElementById('requisite-block');

    if (block) {

        controls.stop();
        
        // Сброс анимации перед запуском новой
        block.style.animation = 'none';
        void block.offsetHeight; // Trigger reflow

        runMotionEffect(controls);

    }
};