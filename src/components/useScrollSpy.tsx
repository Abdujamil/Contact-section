import {useEffect, useState} from "react";

interface UseScrollSpyOptions {
    sectionIds: string[]; // список ID секций с якорями
    offset?: number;      // насколько раньше триггерить активацию (в пикселях)
    threshold?: number;   // доля видимости (0–1)
}

/**
 * useScrollSpy — определяет активную секцию при скролле
 */
export function useScrollSpy({
                                 sectionIds,
                                 offset = 0,
                                 threshold = 0.5,
                             }: UseScrollSpyOptions) {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (visible.length > 0) {
                    const firstVisible = visible[0];
                    setActiveId("#" + firstVisible.target.id);
                }
            },
            {
                threshold,
                rootMargin: `-${offset}px 0px -50% 0px`,
            }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id.replace("#", ""));
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sectionIds, offset, threshold]);

    return activeId;
}
