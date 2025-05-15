"use client";

// @ts-expect-error: типы ломаются из-за package.json exports
import SimpleBar from "simplebar-react";
import { useRef, useEffect } from "react";
import 'simplebar-react/dist/simplebar.min.css';

export default function ScrollWrapper({ children }: { children: React.ReactNode }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const simpleBarRef = useRef<SimpleBar | null>(null);

    useEffect(() => {
        if (!simpleBarRef.current) return;

        let currentScroll = 0;
        let targetScroll = 0;
        let isScrolling = false;

        const scrollContainer = simpleBarRef.current.getScrollElement();

        const initScroll = () => {
            if (scrollContainer) {
                currentScroll = scrollContainer.scrollTop;
                targetScroll = currentScroll;
            }
        };

        const smoothScroll = () => {
            const diff = targetScroll - currentScroll;
            if (Math.abs(diff) < 0.5) {
                isScrolling = false;
                return;
            }
            currentScroll += diff * 0.1;
            if (scrollContainer) {
                scrollContainer.scrollTo({ top: currentScroll });
            }
            requestAnimationFrame(smoothScroll);
        };

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            targetScroll += e.deltaY;

            if (scrollContainer) {
                const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
                targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
            }

            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(smoothScroll);
            }
        };

        const handleScroll = () => {
            if (!isScrolling && scrollContainer) {
                currentScroll = scrollContainer.scrollTop;
                targetScroll = currentScroll;
            }
        };

        initScroll();

        if (scrollContainer) {
            scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
            scrollContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('wheel', handleWheel);
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <SimpleBar className="max-h-screen" ref={simpleBarRef}>
            {children}
        </SimpleBar>
    );
}
