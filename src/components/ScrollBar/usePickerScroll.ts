import {useEffect, useLayoutEffect, useRef} from "react";

type AnyDiv = React.RefObject<HTMLDivElement | null>;

export function usePickerScroll(
    containerRef: AnyDiv,
    {
        itemHeight = 28,
    }: { itemHeight?: number } = {}
) {
    // измеренный шаг (расстояние между центрами соседних айтемов)
    const stepRef = useRef(itemHeight);

    // ---- helpers
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    // Измеряем "шаг" по DOM (реальная высота айтема + gap)
    const measureStep = () => {
        const el = containerRef.current;
        if (!el) return;

        // структура: el -> (inner wrapper) -> items
        const inner = el.firstElementChild as HTMLElement | null;
        if (!inner || inner.children.length < 2) return;

        const a = (inner.children[0] as HTMLElement).getBoundingClientRect();
        const b = (inner.children[1] as HTMLElement).getBoundingClientRect();
        const step = Math.round(b.top - a.top); // расстояние между центрами соседних элементов
        if (step > 0) stepRef.current = step;
    };

    useLayoutEffect(() => {
        measureStep();

        // на всякий — переизмеряем при ресайзе
        const ro = new ResizeObserver(() => measureStep());
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, [containerRef.current]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // Детекция типа устройства
        let lastWheelTime = 0;
        let wheelEventCount = 0;
        let isTrackpad = false;

        const detectDevice = (e: WheelEvent) => {
            const now = Date.now();
            const timeDiff = now - lastWheelTime;
            lastWheelTime = now;

            // Сброс счетчика если прошло много времени
            if (timeDiff > 100) {
                wheelEventCount = 0;
            }

            wheelEventCount++;

            // Эвристики для определения трекпада:
            // 1. Много мелких событий подряд
            // 2. Маленькие значения deltaY
            // 3. deltaMode === 0 (пиксели)
            const hasSmallDelta = Math.abs(e.deltaY) < 50;
            const isPixelMode = e.deltaMode === 0;
            const hasFrequentEvents = wheelEventCount > 3 && timeDiff < 50;

            isTrackpad = hasSmallDelta && isPixelMode && hasFrequentEvents;
        };

        const onWheel = (e: WheelEvent) => {
            detectDevice(e);

            // Если это трекпад - НЕ блокируем событие, пусть браузер обрабатывает нативно
            if (isTrackpad) {
                // Трекпад: полагаемся на нативное поведение + scroll-snap
                return;
            }

            // Если это колесико мыши - блокируем и делаем дискретный скролл
            e.preventDefault();

            const step = stepRef.current;
            const direction = e.deltaY > 0 ? 1 : -1;

            // Получаем текущую позицию и вычисляем целевую
            const currentScroll = el.scrollTop;
            const currentIndex = Math.round(currentScroll / step);
            const targetIndex = currentIndex + direction;

            // Ограничиваем скролл в пределах контента
            const maxScroll = el.scrollHeight - el.clientHeight;
            const targetScroll = clamp(targetIndex * step, 0, maxScroll);

            // Плавный переход к целевой позиции
            el.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        };

        el.addEventListener("wheel", onWheel, {passive: false});

        return () => {
            el.removeEventListener("wheel", onWheel);
        };
    }, [containerRef.current]);
}