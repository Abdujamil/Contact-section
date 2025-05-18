// src/components/Form/mouse.ts
import React from "react";
import { AnimationControls } from "framer-motion";
import { bounceActiveBlock } from "./bounce";

let lastClickPosition: { x: number; y: number } | null = null;

export const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
};

export const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.setProperty("--last-mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--last-mouse-y", `${y}px`);
};

export const initializeMousePosition = (button: HTMLButtonElement) => {
    const rect = button.getBoundingClientRect();

    const x = lastClickPosition ? lastClickPosition.x : rect.width / 2;
    const y = lastClickPosition ? lastClickPosition.y : rect.height / 2;

    button.style.setProperty("--mouse-x", `${x}px`);
    button.style.setProperty("--mouse-y", `${y}px`);
    button.style.setProperty("--last-mouse-x", `${x}px`);
    button.style.setProperty("--last-mouse-y", `${y}px`);

    lastClickPosition = null; // сброс после использования
};

export const setLastClickPosition = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    lastClickPosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
    };
};

// Новые функции для переключения вкладок
export const switchTab = (
    tab: "contact" | "requisite",
    setActiveTab: React.Dispatch<React.SetStateAction<"contact" | "requisite">>,
    controls: AnimationControls,
    styles: Record<string, string>
) => {
    setActiveTab(tab);

    setTimeout(() => {
        const targetButton = tab === "contact"
            ? document.querySelector(`.${styles["contact-btn"]}`) as HTMLButtonElement
            : document.querySelector(`.${styles["requisite-btn"]}`) as HTMLButtonElement;

        if (targetButton) {
            initializeMousePosition(targetButton);
        }

        const targetBlock = tab === "contact"
            ? document.getElementById("form-main")
            : document.getElementById("requisite-block");

        if (targetBlock && targetBlock.offsetParent !== null) {
            bounceActiveBlock(tab, controls);
        }
    }, 10);
};

export const handleTabClick = (
    tab: "contact" | "requisite",
    setActiveTab: React.Dispatch<React.SetStateAction<"contact" | "requisite">>,
    controls: AnimationControls,
    styles: Record<string, string>
) => (e: React.MouseEvent<HTMLButtonElement>) => {
    setLastClickPosition(e);
    switchTab(tab, setActiveTab, controls, styles);
};
