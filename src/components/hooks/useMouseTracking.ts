import React, {useState} from "react";

export function useMouseTracking() {
    const [isFastClick, setIsFastClick] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
        e.currentTarget.style.setProperty("--last-mouse-x", `${x}px`);
        e.currentTarget.style.setProperty("--last-mouse-y", `${y}px`);
    };

    const handleMouseUp = () => {
        setTimeout(() => {
            setIsFastClick(false);
        }, 120);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        e.currentTarget.style.setProperty("--last-mouse-x", `${x}px`);
        e.currentTarget.style.setProperty("--last-mouse-y", `${y}px`);

        setIsFastClick(false);
    };

    return {
        isFastClick,
        setIsFastClick,
        handleMouseMove,
        handleMouseLeave,
        handleMouseUp,
    };
}
