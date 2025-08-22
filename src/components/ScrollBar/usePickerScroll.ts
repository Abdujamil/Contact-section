// import {useEffect, useLayoutEffect, useRef, useState} from "react";
//
// type AnyDiv = React.RefObject<HTMLDivElement | null>;
//
// export function usePickerScroll(
//     containerRef: AnyDiv,
//     {
//         ease = 0.22,           // чем больше — тем быстрее тянется к цели
//         snapThreshold = 0.6,    // точность перед снапом, в пикселях
//     }: { ease?: number; snapThreshold?: number } = {}
// ) {
//     const [isTrackpad, setIsTrackpad] = useState(false);
//
//     // измеренный шаг (расстояние между центрами соседних айтемов)
//     const stepRef = useRef(28);
//
//     // внутреннее состояние скроллера
//     const currentRef = useRef(0);
//     const targetRef = useRef(0);
//     const animatingRef = useRef(false);
//     const rafRef = useRef<number | null>(null);
//
//     // ---- helpers
//     const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
//
//     // Измеряем "шаг" по DOM (реальная высота айтема + gap)
//     const measureStep = () => {
//         const el = containerRef.current;
//         if (!el) return;
//
//         // структура: el -> (inner wrapper) -> items
//         const inner = el.firstElementChild as HTMLElement | null;
//         if (!inner || inner.children.length < 2) return;
//
//         const a = (inner.children[0] as HTMLElement).getBoundingClientRect();
//         const b = (inner.children[1] as HTMLElement).getBoundingClientRect();
//         const step = Math.round(b.top - a.top); // расстояние между центрами соседних элементов
//         if (step > 0) stepRef.current = step;
//     };
//
//     // Единый аниматор (живёт вне handleWheel, всегда видит свежие target/current)
//     const tick = () => {
//         const el = containerRef.current;
//         if (!el) {
//             animatingRef.current = false;
//             rafRef.current = null;
//             return;
//         }
//
//         const current = currentRef.current;
//         const target = targetRef.current;
//         const diff = target - current;
//
//         if (Math.abs(diff) <= snapThreshold) {
//             // снапимся к ближайшему индексу (по измеренному шагу!)
//             const step = stepRef.current;
//             const nearestIndex = Math.round(target / step);
//             const snap = nearestIndex * step;
//
//             currentRef.current = snap;
//             targetRef.current = snap;
//             el.scrollTop = snap;
//
//             animatingRef.current = false;
//             rafRef.current = null;
//             return;
//         }
//
//         // сглажённое приближение
//         const next = current + diff * ease;
//         currentRef.current = next;
//         el.scrollTop = next;
//
//         rafRef.current = requestAnimationFrame(tick);
//     };
//
//     const start = () => {
//         if (!animatingRef.current) {
//             animatingRef.current = true;
//             rafRef.current = requestAnimationFrame(tick);
//         }
//     };
//
//     useLayoutEffect(() => {
//         measureStep();
//
//         // на всякий — переизмеряем при ресайзе
//         const ro = new ResizeObserver(() => measureStep());
//         if (containerRef.current) ro.observe(containerRef.current);
//         return () => ro.disconnect();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [containerRef.current]);
//
//     useEffect(() => {
//         const el = containerRef.current;
//         if (!el) return;
//
//         // начальные значения
//         currentRef.current = el.scrollTop;
//         targetRef.current = el.scrollTop;
//
//         requestAnimationFrame(() => {
//             const step = stepRef.current;
//             const nearestIndex = Math.round(el.scrollTop / step);
//             const snap = nearestIndex * step;
//
//             currentRef.current = snap;
//             targetRef.current = snap;
//             el.scrollTop = snap;
//         });
//
//         // простая детекция трекпада
//         const wheelSamples: number[] = [];
//         let detectTimer: any;
//
//         const detectDevice = (e: WheelEvent) => {
//             wheelSamples.push(Math.abs(e.deltaY));
//             if (wheelSamples.length > 6) wheelSamples.shift();
//
//             clearTimeout(detectTimer);
//             detectTimer = setTimeout(() => {
//                 // deltaMode=1 => "по строкам" (Firefox/Windows колесо)
//                 const lineMode = e.deltaMode === 1;
//                 const avg = wheelSamples.reduce((a, b) => a + b, 0) / wheelSamples.length;
//
//                 // эвристика: маленькие амплитуды/частые импульсы — трекпад
//                 setIsTrackpad(!lineMode && avg < 60);
//             }, 60);
//         };
//
//         const onWheel = (e: WheelEvent) => {
//             detectDevice(e);
//
//             // когда управляем прокруткой сами — блокируем дефолт только на дискретном колесе
//             const isDiscrete = e.deltaMode === 1 || Math.abs(e.deltaY) >= 100;
//             if (isDiscrete) e.preventDefault();
//
//             // нормализуем шаг
//             const step = stepRef.current;
//             // deltaMode: 0 — пиксели, 1 — строки, 2 — страницы
//             let delta = e.deltaY;
//
//             // нормализация по deltaMode
//             if (e.deltaMode === 1) {
//                 delta *= stepRef.current; // «строки» → пиксели
//             } else if (e.deltaMode === 2) {
//                 delta *= el.clientHeight; // «страницы» → пиксели
//             }
//
//             if (!isTrackpad) {
//                 // мышка: строго один шаг
//                 delta = delta > 0 ? stepRef.current : -stepRef.current;
//             } else {
//                 // трекпад: оставляем delta, но делаем его мягче
//                 delta *= 0.8; // коэффициент можно подобрать (0.5–1.0)
//             }
//
//             // тачпад: оставляем delta как есть
//             targetRef.current = clamp(
//                 targetRef.current + delta,
//                 0,
//                 el.scrollHeight - el.clientHeight
//             );
//
//
//             start(); // важное: запускаем только один аниматор, цели можно менять сколько угодно
//         };
//
//         const onScroll = () => {
//             // внешние скроллы (тач, перетаскивание, клавиатура и т.д.)
//             if (!animatingRef.current) {
//                 currentRef.current = el.scrollTop;
//                 targetRef.current = el.scrollTop;
//             }
//         };
//
//         el.addEventListener("wheel", onWheel, {passive: false});
//         el.addEventListener("scroll", onScroll, {passive: true});
//
//         return () => {
//             el.removeEventListener("wheel", onWheel);
//             el.removeEventListener("scroll", onScroll);
//             if (rafRef.current) cancelAnimationFrame(rafRef.current);
//             clearTimeout(detectTimer);
//         };
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [containerRef.current]);
// }

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

// import {useEffect, useLayoutEffect, useRef, useState} from "react";
//
// type AnyDiv = React.RefObject<HTMLDivElement | null>;
//
// export function usePickerScroll(
//     containerRef: AnyDiv,
//     {
//         ease = 0.22,           // чем больше — тем быстрее тянется к цели
//         snapThreshold = 0.6,   // точность перед снапом, в пикселях
//     }: { ease?: number; snapThreshold?: number } = {}
// ) {
//     const [isTrackpad, setIsTrackpad] = useState(false);
//
//     const stepRef = useRef(28);        // расстояние между айтемами
//     const currentRef = useRef(0);      // текущая позиция
//     const targetRef = useRef(0);       // целевая позиция
//     const animatingRef = useRef(false);
//     const rafRef = useRef<number | null>(null);
//
//     const clamp = (v: number, min: number, max: number) =>
//         Math.max(min, Math.min(max, v));
//
//     // --- измерение шага
//     const measureStep = () => {
//         const el = containerRef.current;
//         if (!el) return;
//
//         const inner = el.firstElementChild as HTMLElement | null;
//         if (!inner || inner.children.length < 2) return;
//
//         const a = (inner.children[0] as HTMLElement).getBoundingClientRect();
//         const b = (inner.children[1] as HTMLElement).getBoundingClientRect();
//         const step = Math.round(b.top - a.top);
//         if (step > 0) stepRef.current = step;
//     };
//
//     // --- анимация
//     const tick = () => {
//         const el = containerRef.current;
//         if (!el) {
//             animatingRef.current = false;
//             rafRef.current = null;
//             return;
//         }
//
//         const current = currentRef.current;
//         const target = targetRef.current;
//         const diff = target - current;
//
//         if (Math.abs(diff) <= snapThreshold) {
//             const step = stepRef.current;
//             const nearestIndex = Math.round(target / step);
//             const snap = nearestIndex * step;
//
//             currentRef.current = snap;
//             targetRef.current = snap;
//             el.scrollTop = snap;
//
//             animatingRef.current = false;
//             rafRef.current = null;
//             return;
//         }
//
//         const next = current + diff * ease;
//         currentRef.current = next;
//         el.scrollTop = next;
//
//         rafRef.current = requestAnimationFrame(tick);
//     };
//
//     const start = () => {
//         if (!animatingRef.current) {
//             animatingRef.current = true;
//             rafRef.current = requestAnimationFrame(tick);
//         }
//     };
//
//     // --- публичный метод
//     const snapTo = (index: number) => {
//         const el = containerRef.current;
//         if (!el) return;
//         const step = stepRef.current;
//         const pos = index * step;
//
//         currentRef.current = pos;
//         targetRef.current = pos;
//         el.scrollTop = pos;
//     };
//
//     // --- init
//     useLayoutEffect(() => {
//         measureStep();
//         const ro = new ResizeObserver(() => measureStep());
//         if (containerRef.current) ro.observe(containerRef.current);
//         return () => ro.disconnect();
//     }, [containerRef.current]);
//
//     useEffect(() => {
//         const el = containerRef.current;
//         if (!el) return;
//
//         currentRef.current = el.scrollTop;
//         targetRef.current = el.scrollTop;
//
//         const wheelSamples: number[] = [];
//         let detectTimer: any;
//
//         const detectDevice = (e: WheelEvent) => {
//             wheelSamples.push(Math.abs(e.deltaY));
//             if (wheelSamples.length > 6) wheelSamples.shift();
//
//             clearTimeout(detectTimer);
//             detectTimer = setTimeout(() => {
//                 const lineMode = e.deltaMode === 1;
//                 const avg = wheelSamples.reduce((a, b) => a + b, 0) / wheelSamples.length;
//                 setIsTrackpad(!lineMode && avg < 60);
//             }, 60);
//         };
//
//         const onWheel = (e: WheelEvent) => {
//             detectDevice(e);
//
//             const isDiscrete = e.deltaMode === 1 || Math.abs(e.deltaY) >= 100;
//             if (isDiscrete) e.preventDefault();
//
//             let delta = e.deltaY;
//             if (e.deltaMode === 1) delta *= stepRef.current;
//             else if (e.deltaMode === 2) delta *= el.clientHeight;
//
//             if (!isTrackpad) {
//                 delta = delta > 0 ? stepRef.current : -stepRef.current;
//             }
//
//             targetRef.current = clamp(
//                 targetRef.current + delta,
//                 0,
//                 el.scrollHeight - el.clientHeight
//             );
//
//             start();
//         };
//
//         const onScroll = () => {
//             if (!animatingRef.current) {
//                 currentRef.current = el.scrollTop;
//                 targetRef.current = el.scrollTop;
//             }
//         };
//
//         el.addEventListener("wheel", onWheel, {passive: false});
//         el.addEventListener("scroll", onScroll, {passive: true});
//
//         return () => {
//             el.removeEventListener("wheel", onWheel);
//             el.removeEventListener("scroll", onScroll);
//             if (rafRef.current) cancelAnimationFrame(rafRef.current);
//             clearTimeout(detectTimer);
//         };
//     }, [containerRef.current]);
//
//     return {snapTo};
// }
