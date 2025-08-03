// Custom with settings(РАБОТАЕТ КОРРЕКТНО)
// 'use client';
// import React, { useEffect, useRef, useState } from "react";
// import { usePathname } from "next/navigation";
//
// interface SmoothScrollProps {
//     children: React.ReactNode;
// }
//
// export default function SmoothScroll({ children }: SmoothScrollProps) {
//     const scrollbarRef = useRef<HTMLDivElement>(null);
//     const pathname = usePathname();
//     const [showScrollbar, setShowScrollbar] = useState(true);
//     const [scrollStopThreshold, setScrollStopThreshold] = useState(0.15);
//     const [scrollEaseFactor, setScrollEaseFactor] = useState(0.30);
//     const [minScrollStep, setMinScrollStep] = useState(10);
//
//
//     useEffect(() => {
//         localStorage.setItem("scrollStopThreshold", scrollStopThreshold.toString());
//     }, [scrollStopThreshold]);
//
//     useEffect(() => {
//         localStorage.setItem("scrollEaseFactor", scrollEaseFactor.toString());
//     }, [scrollEaseFactor]);
//
//     useEffect(() => {
//         if (typeof window === 'undefined') return;
//
//         const storedEase = localStorage.getItem("scrollEaseFactor");
//         if (storedEase) {
//             setScrollEaseFactor(parseFloat(storedEase));
//         } else {
//             const adaptive = getAdaptiveEasing();
//             setScrollEaseFactor(adaptive);
//             localStorage.setItem("scrollEaseFactor", adaptive.toString());
//         }
//
//         const storedStep = localStorage.getItem("minScrollStep");
//         if (storedStep) {
//             setMinScrollStep(parseFloat(storedStep));
//         }
//     }, []);
//
//     useEffect(() => {
//         localStorage.setItem("minScrollStep", minScrollStep.toString());
//     }, [minScrollStep]);
//
//
//     // ===== ADAPTIVE EASING =====
//     function getAdaptiveEasing(): number {
//         const isHighRefreshRate = window.matchMedia('(min-resolution: 120dpi)').matches ||
//             window.devicePixelRatio > 1.5;
//
//         const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//         if (prefersReducedMotion) return 0.5;
//
//         const connection = (navigator as Navigator & { connection?: { effectiveType: string } }).connection;
//         const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
//         if (isSlowConnection) return 0.4;
//
//         return isHighRefreshRate ? 0.25 : 0.35;
//     }
//
//     // ===== HIDE SCROLLBAR ON ROUTES =====
//     useEffect(() => {
//         const hideScrollPaths = [
//             '/contacts/connection',
//             '/pricing',
//             '/auth/login',
//             '/auth/register',
//             '/auth/forgot-password'
//         ];
//
//         const shouldHideScrollbar = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));
//
//         document.body.style.overflow = shouldHideScrollbar ? 'hidden' : '';
//         setShowScrollbar(!shouldHideScrollbar);
//
//         const timeout1 = setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);
//         const timeout2 = setTimeout(() => window.dispatchEvent(new Event('scroll')), 300);
//
//         return () => {
//             clearTimeout(timeout1);
//             clearTimeout(timeout2);
//             document.body.style.overflow = '';
//         };
//     }, [pathname]);
//
//     const getScrollOffset = React.useCallback(() => {
//         if (pathname.includes('/policy') || pathname.includes('/organizations')) return -130;
//         if (pathname.includes('/blog')) return -188;
//         if (pathname.includes('/editors')) return 90;
//         return 120;
//     }, [pathname]);
//
//     useEffect(() => {
//         if (!scrollbarRef.current) return;
//
//         let currentScroll = window.scrollY;
//         let targetScroll = currentScroll;
//         let isScrolling = false;
//
//         const initScroll = () => {
//             currentScroll = window.scrollY;
//             targetScroll = currentScroll;
//         };
//
//         const smoothScroll = () => {
//             const diff = targetScroll - currentScroll;
//             if (Math.abs(diff) < scrollStopThreshold) {
//                 currentScroll = targetScroll;
//                 window.scrollTo(0, currentScroll);
//                 isScrolling = false;
//                 return;
//             }
//             currentScroll += diff * scrollEaseFactor;
//             window.scrollTo(0, currentScroll);
//             requestAnimationFrame(smoothScroll);
//         };
//
//         // const MIN_SCROLL_STEP = 30;
//         const handleWheel = (e: WheelEvent) => {
//             if ((e.target as HTMLElement).closest('textarea, .allow-native-scroll')) return;
//
//             e.preventDefault();
//
//             const scrollStep = Math.sign(e.deltaY) * Math.max(Math.abs(e.deltaY), minScrollStep);
//             targetScroll += scrollStep;
//
//             const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//             targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
//
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         };
//         // const handleWheel = (e: WheelEvent) => {
//         //     if ((e.target as HTMLElement).closest('textarea, .allow-native-scroll')) return;
//         //
//         //     e.preventDefault();
//         //     targetScroll += e.deltaY;
//         //     const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//         //     targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
//         //
//         //     if (!isScrolling) {
//         //         isScrolling = true;
//         //         requestAnimationFrame(smoothScroll);
//         //     }
//         // };
//
//         const handleScroll = () => {
//             if (!isScrolling) {
//                 currentScroll = window.scrollY;
//                 targetScroll = currentScroll;
//             }
//         };
//
//         const handleAnchorClick = (e: MouseEvent) => {
//             const target = e.target as HTMLElement;
//             if (target.tagName === "A") {
//                 const anchor = target.getAttribute("href");
//                 if (anchor?.startsWith("#")) {
//                     const el = document.querySelector(anchor);
//                     if (el) {
//                         e.preventDefault();
//                         const offset = getScrollOffset();
//                         const elTop = (el as HTMLElement).offsetTop - offset;
//                         const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//                         targetScroll = Math.max(0, Math.min(elTop, maxScroll));
//
//                         if (!isScrolling) {
//                             isScrolling = true;
//                             requestAnimationFrame(smoothScroll);
//                         }
//                     }
//                 }
//             }
//         };
//
//         const scrollHandler = () => {
//             handleScroll();
//             requestAnimationFrame(updateScrollbar);
//         };
//
//         const updateScrollbar = () => {
//             const scrollTop = window.scrollY;
//             const scrollHeight = document.documentElement.scrollHeight;
//             const clientHeight = window.innerHeight;
//             const maxScroll = scrollHeight - clientHeight;
//
//             const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
//             const maxTop = clientHeight - scrollbarHeight - 8;
//             const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;
//
//             if (scrollbarRef.current) {
//                 scrollbarRef.current.style.setProperty('--scrollY', `${topPercent}px`);
//                 scrollbarRef.current.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
//             }
//         };
//
//         initScroll();
//         updateScrollbar();
//
//         window.addEventListener('wheel', handleWheel, { passive: false });
//         window.addEventListener('scroll', scrollHandler, { passive: true });
//         document.addEventListener('click', handleAnchorClick);
//
//         window.addEventListener('resize', updateScrollbar);
//
//         return () => {
//             window.removeEventListener('wheel', handleWheel);
//             window.removeEventListener('scroll', scrollHandler);
//             document.removeEventListener('click', handleAnchorClick);
//             window.removeEventListener('resize', updateScrollbar);
//         };
//     }, [scrollStopThreshold, scrollEaseFactor, pathname, getScrollOffset]);
//
//     useEffect(() => {
//         window.scrollTo(0, 0);
//         document.documentElement.scrollTop = 0;
//         document.body.scrollTop = 0;
//
//         setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 50);
//     }, [pathname]);
//
//     return (
//         <>
//             {children}
//             {showScrollbar && <div ref={scrollbarRef} className="scrollbar md:block hidden"></div>}
//
//             {/* ===== LIVE SETTINGS PANEL ===== */}
//             {process.env.NODE_ENV === 'production' && (
//                 <div
//                     className="fixed top-[70px] right-4 backdrop-blur-2xl border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 z-[9999999999] w-80 max-h-[80vh] overflow-y-auto allow-native-scroll"
//                     style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
//                 >
//                     <div className="flex justify-between items-center mb-4">
//                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Настройки прокрутки</h3>
//                     </div>
//
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Порог остановки: {scrollStopThreshold.toFixed(2)}
//                         </label>
//                         <input
//                             type="range"
//                             min="0.01"
//                             max="5"
//                             step="0.01"
//                             value={scrollStopThreshold}
//                             onChange={(e) => setScrollStopThreshold(parseFloat(e.target.value))}
//                             className="w-full"
//                         />
//                     </div>
//
//                     <div className="mb-2">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Фактор плавности: {scrollEaseFactor.toFixed(2)}
//                         </label>
//                         <input
//                             type="range"
//                             min="0.01"
//                             max="1"
//                             step="0.01"
//                             value={scrollEaseFactor}
//                             onChange={(e) => setScrollEaseFactor(parseFloat(e.target.value))}
//                             className="w-full"
//                         />
//                     </div>
//
//                     <div className="mb-2">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Минимальный шаг скролла: {minScrollStep.toFixed(0)}px
//                         </label>
//                         <input
//                             type="range"
//                             min="1"
//                             max="200"
//                             step="1"
//                             value={minScrollStep}
//                             onChange={(e) => setMinScrollStep(parseInt(e.target.value))}
//                             className="w-full"
//                         />
//                     </div>
//
//                 </div>
//             )}
//         </>
//     );
// }


// Custom with settings(тачпад и винде)
// 'use client';
// import React, {useEffect, useRef, useState} from "react";
// import {usePathname} from "next/navigation";
//
// interface SmoothScrollProps {
//     children: React.ReactNode;
// }
//
// export default function SmoothScroll({children}: SmoothScrollProps) {
//     const scrollbarRef = useRef<HTMLDivElement>(null);
//     const pathname = usePathname();
//     const [showScrollbar, setShowScrollbar] = useState(true);
//
//     const [isTrackpad, setIsTrackpad] = useState(false);
//
//     const [mouseSettings, setMouseSettings] = useState({
//         scrollStopThreshold: 0.15,
//         scrollEaseFactor: 0.20,
//         minScrollStep: 10
//     });
//
//     const [trackpadSettings, setTrackpadSettings] = useState({
//         scrollStopThreshold: 0.01,
//         scrollEaseFactor: 1.0,
//         minScrollStep: 1
//     });
//
//     // Инициализация настроек из localStorage
//     // useEffect(() => {
//     //     const storedMouse = {
//     //         scrollStopThreshold: parseFloat(localStorage.getItem('mouse_scrollStopThreshold') || '0.15'),
//     //         scrollEaseFactor: parseFloat(localStorage.getItem('mouse_scrollEaseFactor') || '0.20'),
//     //         minScrollStep: parseInt(localStorage.getItem('mouse_minScrollStep') || '10')
//     //     };
//     //     setMouseSettings(storedMouse);
//     //
//     //     const storedTrackpad = {
//     //         scrollStopThreshold: parseFloat(localStorage.getItem('trackpad_scrollStopThreshold') || '0.5'),
//     //         scrollEaseFactor: parseFloat(localStorage.getItem('trackpad_scrollEaseFactor') || '0.20'),
//     //         minScrollStep: parseInt(localStorage.getItem('trackpad_minScrollStep') || '1')
//     //     };
//     //     setTrackpadSettings(storedTrackpad);
//     // }, []);
//
//     // Сохранение настроек мыши в localStorage
//     // useEffect(() => {
//     //     localStorage.setItem('mouse_scrollStopThreshold', mouseSettings.scrollStopThreshold.toString());
//     //     localStorage.setItem('mouse_scrollEaseFactor', mouseSettings.scrollEaseFactor.toString());
//     //     localStorage.setItem('mouse_minScrollStep', mouseSettings.minScrollStep.toString());
//     // }, [mouseSettings]);
//     //
//     // // Сохранение настроек тачпада в localStorage
//     // useEffect(() => {
//     //     localStorage.setItem('trackpad_scrollStopThreshold', trackpadSettings.scrollStopThreshold.toString());
//     //     localStorage.setItem('trackpad_scrollEaseFactor', trackpadSettings.scrollEaseFactor.toString());
//     //     localStorage.setItem('trackpad_minScrollStep', trackpadSettings.minScrollStep.toString());
//     // }, [trackpadSettings]);
//
//     // Определение типа устройства ввода
//     useEffect(() => {
//         const wheelEvents: number[] = [];
//         let detectionTimeout: NodeJS.Timeout;
//
//         const detectInputDevice = (e: WheelEvent) => {
//             // Сохраняем последние 5 значений deltaY
//             wheelEvents.push(Math.abs(e.deltaY));
//             if (wheelEvents.length > 5) {
//                 wheelEvents.shift();
//             }
//
//             // Очищаем предыдущий таймаут
//             clearTimeout(detectionTimeout);
//
//             // Анализируем через небольшую задержку
//             detectionTimeout = setTimeout(() => {
//                 if (wheelEvents.length >= 3) {
//                     const avgDelta = wheelEvents.reduce((a, b) => a + b, 0) / wheelEvents.length;
//                     const maxDelta = Math.max(...wheelEvents);
//                     const minDelta = Math.min(...wheelEvents);
//                     const deltaVariance = maxDelta - minDelta;
//
//                     // Определяем устройство на основе нескольких факторов:
//                     const isLikelyTrackpad =
//                         // 1. Малые значения delta (обычно < 50 для тачпада)
//                         avgDelta < 50 &&
//                         // 2. Низкая вариативность (плавные движения)
//                         deltaVariance < 30 &&
//                         // 3. deltaMode === 0 (пиксели, а не строки/страницы)
//                         e.deltaMode === 0;
//
//                     const isLikelyMouse =
//                         // 1. Большие значения delta (обычно 100+ для колесика мыши)
//                         avgDelta > 80 ||
//                         // 2. Высокая вариативность или фиксированные значения
//                         deltaVariance > 50 ||
//                         // 3. deltaMode !== 0 (строки или страницы)
//                         e.deltaMode !== 0;
//
//                     if (isLikelyTrackpad) {
//                         setIsTrackpad(true);
//                     } else if (isLikelyMouse) {
//                         setIsTrackpad(false);
//                     }
//                     // Если не уверены, оставляем текущее состояние
//                 }
//             }, 100);
//         };
//
//         // Дополнительная проверка по User Agent для MacOS
//         const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
//             navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
//
//         // На Mac по умолчанию предполагаем тачпад
//         if (isMac) {
//             setIsTrackpad(true);
//         }
//
//         window.addEventListener('wheel', detectInputDevice, {passive: true});
//
//         return () => {
//             window.removeEventListener('wheel', detectInputDevice);
//             clearTimeout(detectionTimeout);
//         };
//     }, []);
//
//     // ===== ADAPTIVE EASING =====
//     // function getAdaptiveEasing(): number {
//     //     const isHighRefreshRate = window.matchMedia('(min-resolution: 120dpi)').matches ||
//     //         window.devicePixelRatio > 1.5;
//     //
//     //     const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//     //     if (prefersReducedMotion) return 0.5;
//     //
//     //     const connection = (navigator as Navigator & { connection?: { effectiveType: string } }).connection;
//     //     const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
//     //     if (isSlowConnection) return 0.4;
//     //
//     //     return isHighRefreshRate ? 0.25 : 0.35;
//     // }
//
//     // ===== HIDE SCROLLBAR ON ROUTES =====
//     useEffect(() => {
//         const hideScrollPaths = [
//             '/contacts/connection',
//             '/pricing',
//             '/auth/login',
//             '/auth/register',
//             '/auth/forgot-password'
//         ];
//
//         const shouldHideScrollbar = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));
//
//         document.body.style.overflow = shouldHideScrollbar ? 'hidden' : '';
//         setShowScrollbar(!shouldHideScrollbar);
//
//         const timeout1 = setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);
//         const timeout2 = setTimeout(() => window.dispatchEvent(new Event('scroll')), 300);
//
//         return () => {
//             clearTimeout(timeout1);
//             clearTimeout(timeout2);
//             document.body.style.overflow = '';
//         };
//     }, [pathname]);
//
//     const getScrollOffset = React.useCallback(() => {
//         if (pathname.includes('/policy') || pathname.includes('/organizations')) return -130;
//         if (pathname.includes('/blog')) return -188;
//         if (pathname.includes('/editors')) return 90;
//         return 120;
//     }, [pathname]);
//
//     useEffect(() => {
//         if (!scrollbarRef.current) return;
//
//         let currentScroll = window.scrollY;
//         let targetScroll = currentScroll;
//         let isScrolling = false;
//
//         const initScroll = () => {
//             currentScroll = window.scrollY;
//             targetScroll = currentScroll;
//         };
//
//         const handleWheel = (e: WheelEvent) => {
//             if ((e.target as HTMLElement).closest('textarea, .allow-native-scroll')) return;
//
//             e.preventDefault();
//
//             // ВАЖНО: Используем настройки в зависимости от типа устройства
//             const settings = isTrackpad ? trackpadSettings : mouseSettings;
//
//             const scrollStep = Math.sign(e.deltaY) * Math.max(Math.abs(e.deltaY), settings.minScrollStep);
//             targetScroll += scrollStep;
//
//             const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//             targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
//
//             if (!isScrolling) {
//                 isScrolling = true;
//                 const animate = () => {
//                     const diff = targetScroll - currentScroll;
//                     if (Math.abs(diff) < settings.scrollStopThreshold) {
//                         currentScroll = targetScroll;
//                         window.scrollTo(0, currentScroll);
//                         isScrolling = false;
//                         return;
//                     }
//                     currentScroll += diff * settings.scrollEaseFactor;
//                     window.scrollTo(0, currentScroll);
//                     requestAnimationFrame(animate);
//                 };
//                 requestAnimationFrame(animate);
//             }
//         };
//
//         const handleScroll = () => {
//             if (!isScrolling) {
//                 currentScroll = window.scrollY;
//                 targetScroll = currentScroll;
//             }
//         };
//
//         const handleAnchorClick = (e: MouseEvent) => {
//             const target = e.target as HTMLElement;
//             if (target.tagName === "A") {
//                 const anchor = target.getAttribute("href");
//                 if (anchor?.startsWith("#")) {
//                     const el = document.querySelector(anchor);
//                     if (el) {
//                         e.preventDefault();
//                         const offset = getScrollOffset();
//                         const elTop = (el as HTMLElement).offsetTop - offset;
//                         const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//                         targetScroll = Math.max(0, Math.min(elTop, maxScroll));
//
//                         // Используем настройки для анимации к якорю
//                         const settings = isTrackpad ? trackpadSettings : mouseSettings;
//
//                         if (!isScrolling) {
//                             isScrolling = true;
//                             const animate = () => {
//                                 const diff = targetScroll - currentScroll;
//                                 if (Math.abs(diff) < settings.scrollStopThreshold) {
//                                     currentScroll = targetScroll;
//                                     window.scrollTo(0, currentScroll);
//                                     isScrolling = false;
//                                     return;
//                                 }
//                                 currentScroll += diff * settings.scrollEaseFactor;
//                                 window.scrollTo(0, currentScroll);
//                                 requestAnimationFrame(animate);
//                             };
//                             requestAnimationFrame(animate);
//                         }
//                     }
//                 }
//             }
//         };
//
//         const scrollHandler = () => {
//             handleScroll();
//             requestAnimationFrame(updateScrollbar);
//         };
//
//         const updateScrollbar = () => {
//             const scrollTop = window.scrollY;
//             const scrollHeight = document.documentElement.scrollHeight;
//             const clientHeight = window.innerHeight;
//             const maxScroll = scrollHeight - clientHeight;
//
//             const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
//             const maxTop = clientHeight - scrollbarHeight - 8;
//             const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;
//
//             if (scrollbarRef.current) {
//                 scrollbarRef.current.style.setProperty('--scrollY', `${topPercent}px`);
//                 scrollbarRef.current.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
//             }
//         };
//
//         initScroll();
//         updateScrollbar();
//
//         window.addEventListener('wheel', handleWheel, {passive: false});
//         window.addEventListener('scroll', scrollHandler, {passive: true});
//         document.addEventListener('click', handleAnchorClick);
//         window.addEventListener('resize', updateScrollbar);
//
//         return () => {
//             window.removeEventListener('wheel', handleWheel);
//             window.removeEventListener('scroll', scrollHandler);
//             document.removeEventListener('click', handleAnchorClick);
//             window.removeEventListener('resize', updateScrollbar);
//         };
//     }, [isTrackpad, trackpadSettings, mouseSettings, pathname, getScrollOffset]);
//
//     useEffect(() => {
//         window.scrollTo(0, 0);
//         document.documentElement.scrollTop = 0;
//         document.body.scrollTop = 0;
//
//         setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 50);
//     }, [pathname]);
//
//     return (
//         <>
//             {children}
//             {showScrollbar && <div ref={scrollbarRef} className="scrollbar md:block hidden"></div>}
//
//             {/* ===== LIVE SETTINGS PANEL ===== */}
//             {process.env.NODE_ENV === 'production' && (
//                 <div
//                     className="fixed top-[70px] right-4 backdrop-blur-2xl border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 z-[9999999999] w-80 max-h-[80vh] overflow-y-auto allow-native-scroll">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                         Настройки прокрутки ({isTrackpad ? 'Тачпад' : 'Мышка'})
//                     </h3>
//
//                     <div className="mb-6">
//                         <h4 className="text-sm border-b font-bold mb-2 text-white-600">Настройки для мышки</h4>
//
//                         <label className="block text-xs mb-1">Порог
//                             остановки: {mouseSettings.scrollStopThreshold.toFixed(2)}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
//                                 onClick={() =>
//                                     setMouseSettings({
//                                         ...mouseSettings,
//                                         scrollStopThreshold: Math.max(0.01, mouseSettings.scrollStopThreshold - 0.01),
//                                     })
//                                 }
//                             >
//                                 –
//                             </button>
//                             <input
//                                 type="range"
//                                 min="0.01"
//                                 max="5"
//                                 step="0.01"
//                                 value={mouseSettings.scrollStopThreshold}
//                                 onChange={(e) =>
//                                     setMouseSettings({
//                                         ...mouseSettings,
//                                         scrollStopThreshold: parseFloat(e.target.value),
//                                     })
//                                 }
//                                 className="w-full"
//                             />
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
//                                 onClick={() =>
//                                     setMouseSettings({
//                                         ...mouseSettings,
//                                         scrollStopThreshold: Math.min(5, mouseSettings.scrollStopThreshold + 0.01),
//                                     })
//                                 }
//                             >
//                                 +
//                             </button>
//                         </div>
//
//                         <label className="block text-xs mb-1">Фактор
//                             плавности: {mouseSettings.scrollEaseFactor.toFixed(2)}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
//                                 onClick={() =>
//                                     setMouseSettings({
//                                         ...mouseSettings,
//                                         scrollEaseFactor: Math.max(0.01, mouseSettings.scrollEaseFactor - 0.01),
//                                     })
//                                 }
//                             >
//                                 –
//                             </button>
//                             <input
//                                 type="range"
//                                 min="0.01"
//                                 max="1"
//                                 step="0.01"
//                                 value={mouseSettings.scrollEaseFactor}
//                                 onChange={(e) =>
//                                     setMouseSettings({
//                                         ...mouseSettings,
//                                         scrollEaseFactor: parseFloat(e.target.value),
//                                     })
//                                 }
//                                 className="w-full"
//                             />
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
//                                 onClick={() =>
//                                     setMouseSettings({
//                                         ...mouseSettings,
//                                         scrollEaseFactor: Math.min(1, mouseSettings.scrollEaseFactor + 0.01),
//                                     })
//                                 }
//                             >
//                                 +
//                             </button>
//                         </div>
//
//                         <label className="block text-xs mb-1">Минимальный шаг: {mouseSettings.minScrollStep}px</label>
//                         <div className="flex items-center gap-2 mb-6">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
//                                 onClick={() =>
//                                     setMouseSettings({
//                                         ...mouseSettings,
//                                         minScrollStep: Math.max(1, mouseSettings.minScrollStep - 1),
//                                     })
//                                 }
//                             >
//                                 –
//                             </button>
//                             <input
//                                 type="range"
//                                 min="1"
//                                 max="200"
//                                 step="1"
//                                 value={mouseSettings.minScrollStep}
//                                 onChange={(e) =>
//                                     setMouseSettings({
//                                         ...mouseSettings,
//                                         minScrollStep: parseInt(e.target.value),
//                                     })
//                                 }
//                                 className="w-full"
//                             />
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
//                                 onClick={() =>
//                                     setMouseSettings({
//                                         ...mouseSettings,
//                                         minScrollStep: Math.min(200, mouseSettings.minScrollStep + 1),
//                                     })
//                                 }
//                             >
//                                 +
//                             </button>
//                         </div>
//                     </div>
//
//                     <div>
//                         <h4 className="text-sm border-b font-bold mb-2 text-white-600">Настройки для тачпада</h4>
//
//                         <label className="block text-xs mb-1">Порог
//                             остановки: {trackpadSettings.scrollStopThreshold.toFixed(2)}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
//                                 onClick={() =>
//                                     setTrackpadSettings({
//                                         ...trackpadSettings,
//                                         scrollStopThreshold: Math.max(0.01, trackpadSettings.scrollStopThreshold - 0.01),
//                                     })
//                                 }
//                             >
//                                 –
//                             </button>
//                             <input
//                                 type="range"
//                                 min="0.01"
//                                 max="5"
//                                 step="0.01"
//                                 value={trackpadSettings.scrollStopThreshold}
//                                 onChange={(e) =>
//                                     setTrackpadSettings({
//                                         ...trackpadSettings,
//                                         scrollStopThreshold: parseFloat(e.target.value),
//                                     })
//                                 }
//                                 className="w-full"
//                             />
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
//                                 onClick={() =>
//                                     setTrackpadSettings({
//                                         ...trackpadSettings,
//                                         scrollStopThreshold: Math.min(5, trackpadSettings.scrollStopThreshold + 0.01),
//                                     })
//                                 }
//                             >
//                                 +
//                             </button>
//                         </div>
//
//                         <label className="block text-xs mb-1">Фактор
//                             плавности: {trackpadSettings.scrollEaseFactor.toFixed(2)}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
//                                 onClick={() =>
//                                     setTrackpadSettings({
//                                         ...trackpadSettings,
//                                         scrollEaseFactor: Math.max(0.01, trackpadSettings.scrollEaseFactor - 0.01),
//                                     })
//                                 }
//                             >
//                                 –
//                             </button>
//                             <input
//                                 type="range"
//                                 min="0.01"
//                                 max="1"
//                                 step="0.01"
//                                 value={trackpadSettings.scrollEaseFactor}
//                                 onChange={(e) =>
//                                     setTrackpadSettings({
//                                         ...trackpadSettings,
//                                         scrollEaseFactor: parseFloat(e.target.value),
//                                     })
//                                 }
//                                 className="w-full"
//                             />
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
//                                 onClick={() =>
//                                     setTrackpadSettings({
//                                         ...trackpadSettings,
//                                         scrollEaseFactor: Math.min(1, trackpadSettings.scrollEaseFactor + 0.01),
//                                     })
//                                 }
//                             >
//                                 +
//                             </button>
//                         </div>
//
//                         <label className="block text-xs mb-1">Минимальный
//                             шаг: {trackpadSettings.minScrollStep}px</label>
//                         <div className="flex items-center gap-2">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
//                                 onClick={() =>
//                                     setTrackpadSettings({
//                                         ...trackpadSettings,
//                                         minScrollStep: Math.max(1, trackpadSettings.minScrollStep - 1),
//                                     })
//                                 }
//                             >
//                                 –
//                             </button>
//                             <input
//                                 type="range"
//                                 min="1"
//                                 max="200"
//                                 step="1"
//                                 value={trackpadSettings.minScrollStep}
//                                 onChange={(e) =>
//                                     setTrackpadSettings({
//                                         ...trackpadSettings,
//                                         minScrollStep: parseInt(e.target.value),
//                                     })
//                                 }
//                                 className="w-full"
//                             />
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
//                                 onClick={() =>
//                                     setTrackpadSettings({
//                                         ...trackpadSettings,
//                                         minScrollStep: Math.min(200, trackpadSettings.minScrollStep + 1),
//                                     })
//                                 }
//                             >
//                                 +
//                             </button>
//                         </div>
//
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

'use client';
import React, {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";

interface SmoothScrollProps {
    children: React.ReactNode;
}

enum TouchpadState {
    IDLE = "idle",
    SCROLLING = "scrolling",
    ANIMATING = "animating"
}

export default function SmoothScroll({children}: SmoothScrollProps) {
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [showScrollbar, setShowScrollbar] = useState(true);

    const [isTrackpad, setIsTrackpad] = useState(false);
    const [currentState, setCurrentState] = useState<TouchpadState>(TouchpadState.IDLE);

    // Временные метки для определения устройств
    const lastWheelTimeRef = useRef(0);
    const touchpadLockReleaseTimeRef = useRef(0);
    const wheelEventsRef = useRef<number[]>([]);

    const [mouseSettings, setMouseSettings] = useState({
        scrollStopThreshold: 0.15,
        scrollEaseFactor: 0.20,
        minScrollStep: 10
    });

    const [trackpadSettings, setTrackpadSettings] = useState({
        scrollStopThreshold: 0.01,
        scrollEaseFactor: 1.0,
        minScrollStep: 1
    });

    // Новые настройки для Windows Dell
    const [dellSettings, setDellSettings] = useState({
        MIN_DELTA: 5,
        TOUCHPAD_SENSITIVITY: 5,
        MAX_VELOCITY: 10,
        DEBOUNCE_TIME: 100,
        MACBOOK_DEBOUNCE_TIME: 100,
        WHEEL_THROTTLE: 16, // 60fps
        TOUCHPAD_WHEEL_THROTTLE: 33, // 30fps
        MOUSE_AFTER_TOUCHPAD_COOLDOWN: 50
    });

    // Определение ОС и устройства
    const [isWindows, setIsWindows] = useState(false);
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        const platform = navigator.platform.toLowerCase();

        const windowsDetected = userAgent.includes('win') || platform.includes('win');
        const macDetected = userAgent.includes('mac') || platform.includes('mac');

        setIsWindows(windowsDetected);
        setIsMac(macDetected);

        // На Mac по умолчанию предполагаем тачпад
        if (macDetected) {
            setIsTrackpad(true);
        }
    }, []);

    // Улучшенное определение типа устройства ввода для Windows
    useEffect(() => {
        let detectionTimeout: NodeJS.Timeout;

        const detectInputDevice = (e: WheelEvent) => {
            const currentTime = Date.now();
            const deltaY = Math.abs(e.deltaY);

            // Сохраняем последние события для анализа
            wheelEventsRef.current.push(deltaY);
            if (wheelEventsRef.current.length > 5) {
                wheelEventsRef.current.shift();
            }

            // Проверяем интервал между событиями
            const timeSinceLastWheel = currentTime - lastWheelTimeRef.current;
            lastWheelTimeRef.current = currentTime;

            clearTimeout(detectionTimeout);

            detectionTimeout = setTimeout(() => {
                if (wheelEventsRef.current.length >= 3) {
                    const avgDelta = wheelEventsRef.current.reduce((a, b) => a + b, 0) / wheelEventsRef.current.length;
                    const maxDelta = Math.max(...wheelEventsRef.current);
                    const minDelta = Math.min(...wheelEventsRef.current);
                    const deltaVariance = maxDelta - minDelta;

                    // Для Mac - более простая логика
                    if (isMac) {
                        const isLikelyTrackpad = avgDelta < 50 && deltaVariance < 30 && e.deltaMode === 0;
                        setIsTrackpad(isLikelyTrackpad);
                        return;
                    }

                    // Для Windows - расширенная логика
                    if (isWindows) {
                        const isLikelyTrackpad =
                            // Маленькие значения deltaY (меньше 40)
                            avgDelta < 40 &&
                            // Частые события (интервал меньше 110ms для Windows)
                            timeSinceLastWheel < 110 &&
                            // Низкая вариативность
                            deltaVariance < 30 &&
                            // Пиксельный режим
                            e.deltaMode === 0;

                        const isLikelyMouse =
                            avgDelta > 80 ||
                            deltaVariance > 50 ||
                            e.deltaMode !== 0 ||
                            timeSinceLastWheel > 110;

                        if (isLikelyTrackpad) {
                            setIsTrackpad(true);
                        } else if (isLikelyMouse) {
                            setIsTrackpad(false);
                        }
                    } else {
                        // Для других ОС - стандартная логика
                        const isLikelyTrackpad = avgDelta < 50 && deltaVariance < 30 && e.deltaMode === 0;
                        const isLikelyMouse = avgDelta > 80 || deltaVariance > 50 || e.deltaMode !== 0;

                        if (isLikelyTrackpad) {
                            setIsTrackpad(true);
                        } else if (isLikelyMouse) {
                            setIsTrackpad(false);
                        }
                    }
                }
            }, 100);
        };

        window.addEventListener('wheel', detectInputDevice, {passive: true});

        return () => {
            window.removeEventListener('wheel', detectInputDevice);
            clearTimeout(detectionTimeout);
        };
    }, [isWindows, isMac]);

    // ===== HIDE SCROLLBAR ON ROUTES =====
    useEffect(() => {
        const hideScrollPaths = [
            '/contacts/connection',
            '/pricing',
            '/auth/login',
            '/auth/register',
            '/auth/forgot-password'
        ];

        const shouldHideScrollbar = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));

        document.body.style.overflow = shouldHideScrollbar ? 'hidden' : '';
        setShowScrollbar(!shouldHideScrollbar);

        const timeout1 = setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);
        const timeout2 = setTimeout(() => window.dispatchEvent(new Event('scroll')), 300);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            document.body.style.overflow = '';
        };
    }, [pathname]);

    const getScrollOffset = React.useCallback(() => {
        if (pathname.includes('/policy') || pathname.includes('/organizations')) return -130;
        if (pathname.includes('/blog')) return -188;
        if (pathname.includes('/editors')) return 90;
        return 120;
    }, [pathname]);

    useEffect(() => {
        if (!scrollbarRef.current) return;

        let currentScroll = window.scrollY;
        let targetScroll = currentScroll;
        let isScrolling = false;

        const initScroll = () => {
            currentScroll = window.scrollY;
            targetScroll = currentScroll;
        };

        const handleWheel = (e: WheelEvent) => {
            if ((e.target as HTMLElement).closest('textarea, .allow-native-scroll')) return;

            const currentTime = Date.now();

            // Проверка throttling
            const throttleTime = isTrackpad ? dellSettings.TOUCHPAD_WHEEL_THROTTLE : dellSettings.WHEEL_THROTTLE;
            if (currentTime - lastWheelTimeRef.current < throttleTime) {
                return;
            }

            // Для Windows: если тачпад в состоянии ANIMATING, игнорируем все события
            if (isWindows && isTrackpad && currentState === TouchpadState.ANIMATING) {
                e.preventDefault();
                return;
            }

            // Для Windows: защита от конфликтов мыши после тачпада
            if (isWindows && !isTrackpad) {
                const timeSinceTouchpadRelease = currentTime - touchpadLockReleaseTimeRef.current;
                if (timeSinceTouchpadRelease < dellSettings.MOUSE_AFTER_TOUCHPAD_COOLDOWN) {
                    return;
                }
            }

            e.preventDefault();
            lastWheelTimeRef.current = currentTime;

            // Устанавливаем состояние скроллинга
            if (isTrackpad) {
                setCurrentState(TouchpadState.SCROLLING);
            }

            // ВАЖНО: Используем настройки в зависимости от типа устройства
            const settings = isTrackpad ? trackpadSettings : mouseSettings;

            // Для Windows Dell применяем минимальный порог deltaY
            const deltaY = e.deltaY;
            if (isWindows && Math.abs(deltaY) < dellSettings.MIN_DELTA) {
                return;
            }

            const scrollStep = isTrackpad && isWindows
                ? Math.sign(deltaY) * Math.max(Math.abs(deltaY) * dellSettings.TOUCHPAD_SENSITIVITY, settings.minScrollStep)
                : Math.sign(deltaY) * Math.max(Math.abs(deltaY), settings.minScrollStep);

            targetScroll += scrollStep;

            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

            if (!isScrolling) {
                isScrolling = true;

                if (isTrackpad && isWindows) {
                    // Для тачпада на Windows - упрощенная анимация через requestAnimationFrame
                    setCurrentState(TouchpadState.ANIMATING);

                    const animate = () => {
                        const diff = targetScroll - currentScroll;
                        if (Math.abs(diff) < settings.scrollStopThreshold) {
                            currentScroll = targetScroll;
                            window.scrollTo(0, currentScroll);
                            isScrolling = false;
                            setCurrentState(TouchpadState.IDLE);

                            // Устанавливаем время освобождения для дебаунса
                            touchpadLockReleaseTimeRef.current = Date.now() + (isMac ? dellSettings.MACBOOK_DEBOUNCE_TIME : dellSettings.DEBOUNCE_TIME);
                            return;
                        }
                        currentScroll += diff * settings.scrollEaseFactor;
                        window.scrollTo(0, currentScroll);
                        requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                } else {
                    // Стандартная анимация для мыши и других случаев
                    const animate = () => {
                        const diff = targetScroll - currentScroll;
                        if (Math.abs(diff) < settings.scrollStopThreshold) {
                            currentScroll = targetScroll;
                            window.scrollTo(0, currentScroll);
                            isScrolling = false;
                            if (isTrackpad) {
                                setCurrentState(TouchpadState.IDLE);
                            }
                            return;
                        }
                        currentScroll += diff * settings.scrollEaseFactor;
                        window.scrollTo(0, currentScroll);
                        requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            }
        };

        const handleScroll = () => {
            if (!isScrolling) {
                currentScroll = window.scrollY;
                targetScroll = currentScroll;
            }
        };

        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A") {
                const anchor = target.getAttribute("href");
                if (anchor?.startsWith("#")) {
                    const el = document.querySelector(anchor);
                    if (el) {
                        e.preventDefault();
                        const offset = getScrollOffset();
                        const elTop = (el as HTMLElement).offsetTop - offset;
                        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                        targetScroll = Math.max(0, Math.min(elTop, maxScroll));

                        const settings = isTrackpad ? trackpadSettings : mouseSettings;

                        if (!isScrolling) {
                            isScrolling = true;
                            const animate = () => {
                                const diff = targetScroll - currentScroll;
                                if (Math.abs(diff) < settings.scrollStopThreshold) {
                                    currentScroll = targetScroll;
                                    window.scrollTo(0, currentScroll);
                                    isScrolling = false;
                                    return;
                                }
                                currentScroll += diff * settings.scrollEaseFactor;
                                window.scrollTo(0, currentScroll);
                                requestAnimationFrame(animate);
                            };
                            requestAnimationFrame(animate);
                        }
                    }
                }
            }
        };

        const scrollHandler = () => {
            handleScroll();
            requestAnimationFrame(updateScrollbar);
        };

        const updateScrollbar = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            const maxScroll = scrollHeight - clientHeight;

            const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
            const maxTop = clientHeight - scrollbarHeight - 8;
            const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;

            if (scrollbarRef.current) {
                scrollbarRef.current.style.setProperty('--scrollY', `${topPercent}px`);
                scrollbarRef.current.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
            }
        };

        initScroll();
        updateScrollbar();

        window.addEventListener('wheel', handleWheel, {passive: false});
        window.addEventListener('scroll', scrollHandler, {passive: true});
        document.addEventListener('click', handleAnchorClick);
        window.addEventListener('resize', updateScrollbar);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', scrollHandler);
            document.removeEventListener('click', handleAnchorClick);
            window.removeEventListener('resize', updateScrollbar);
        };
    }, [isTrackpad, trackpadSettings, mouseSettings, dellSettings, pathname, getScrollOffset, currentState, isWindows, isMac]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, 50);
    }, [pathname]);

    return (
        <>
            {children}
            {showScrollbar && <div ref={scrollbarRef} className="scrollbar md:block hidden"></div>}

            {/* ===== LIVE SETTINGS PANEL ===== */}
            {process.env.NODE_ENV === 'production' && (
                <div className="fixed top-[70px] right-4 backdrop-blur-2xl border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 z-[9999999999] w-80 max-h-[80vh] overflow-y-auto allow-native-scroll">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Настройки прокрутки ({isTrackpad ? 'Тачпад' : 'Мышка'})
                    </h3>

                    <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                        ОС: {isWindows ? 'Windows' : isMac ? 'Mac' : 'Other'} |
                        Состояние: {currentState}
                    </div>

                    {/* Dell Windows Settings */}
                    <div className="mb-6">
                        <h4 className="text-sm border-b font-bold mb-2 text-white-600">Dell Windows настройки</h4>

                        <label className="block text-xs mb-1">Минимальный дельта-сдвиг: {dellSettings.MIN_DELTA}</label>
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setDellSettings({...dellSettings, MIN_DELTA: Math.max(1, dellSettings.MIN_DELTA - 1)})}
                            >–</button>
                            <input
                                type="range" min="1" max="20" step="1" value={dellSettings.MIN_DELTA}
                                onChange={(e) => setDellSettings({...dellSettings, MIN_DELTA: parseInt(e.target.value)})}
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setDellSettings({...dellSettings, MIN_DELTA: Math.min(20, dellSettings.MIN_DELTA + 1)})}
                            >+</button>
                        </div>

                        <label className="block text-xs mb-1">Чувствительность тачпада: {dellSettings.TOUCHPAD_SENSITIVITY}</label>
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setDellSettings({...dellSettings, TOUCHPAD_SENSITIVITY: Math.max(1, dellSettings.TOUCHPAD_SENSITIVITY - 1)})}
                            >–</button>
                            <input
                                type="range" min="1" max="20" step="1" value={dellSettings.TOUCHPAD_SENSITIVITY}
                                onChange={(e) => setDellSettings({...dellSettings, TOUCHPAD_SENSITIVITY: parseInt(e.target.value)})}
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setDellSettings({...dellSettings, TOUCHPAD_SENSITIVITY: Math.min(20, dellSettings.TOUCHPAD_SENSITIVITY + 1)})}
                            >+</button>
                        </div>

                        <label className="block text-xs mb-1">Время подавления дребезга: {dellSettings.DEBOUNCE_TIME}ms</label>
                        <div className="flex items-center gap-2 mb-4">
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setDellSettings({...dellSettings, DEBOUNCE_TIME: Math.max(10, dellSettings.DEBOUNCE_TIME - 10)})}
                            >–</button>
                            <input
                                type="range" min="10" max="500" step="10" value={dellSettings.DEBOUNCE_TIME}
                                onChange={(e) => setDellSettings({...dellSettings, DEBOUNCE_TIME: parseInt(e.target.value)})}
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setDellSettings({...dellSettings, DEBOUNCE_TIME: Math.min(500, dellSettings.DEBOUNCE_TIME + 10)})}
                            >+</button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="text-sm border-b font-bold mb-2 text-white-600">Настройки для мышки</h4>

                        <label className="block text-xs mb-1">Порог остановки: {mouseSettings.scrollStopThreshold.toFixed(2)}</label>
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setMouseSettings({...mouseSettings, scrollStopThreshold: Math.max(0.01, mouseSettings.scrollStopThreshold - 0.01)})}
                            >–</button>
                            <input
                                type="range" min="0.01" max="5" step="0.01" value={mouseSettings.scrollStopThreshold}
                                onChange={(e) => setMouseSettings({...mouseSettings, scrollStopThreshold: parseFloat(e.target.value)})}
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setMouseSettings({...mouseSettings, scrollStopThreshold: Math.min(5, mouseSettings.scrollStopThreshold + 0.01)})}
                            >+</button>
                        </div>

                        <label className="block text-xs mb-1">Фактор плавности: {mouseSettings.scrollEaseFactor.toFixed(2)}</label>
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setMouseSettings({...mouseSettings, scrollEaseFactor: Math.max(0.01, mouseSettings.scrollEaseFactor - 0.01)})}
                            >–</button>
                            <input
                                type="range" min="0.01" max="1" step="0.01" value={mouseSettings.scrollEaseFactor}
                                onChange={(e) => setMouseSettings({...mouseSettings, scrollEaseFactor: parseFloat(e.target.value)})}
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setMouseSettings({...mouseSettings, scrollEaseFactor: Math.min(1, mouseSettings.scrollEaseFactor + 0.01)})}
                            >+</button>
                        </div>

                        <label className="block text-xs mb-1">Минимальный шаг: {mouseSettings.minScrollStep}px</label>
                        <div className="flex items-center gap-2 mb-6">
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setMouseSettings({...mouseSettings, minScrollStep: Math.max(1, mouseSettings.minScrollStep - 1)})}
                            >–</button>
                            <input
                                type="range" min="1" max="200" step="1" value={mouseSettings.minScrollStep}
                                onChange={(e) => setMouseSettings({...mouseSettings, minScrollStep: parseInt(e.target.value)})}
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setMouseSettings({...mouseSettings, minScrollStep: Math.min(200, mouseSettings.minScrollStep + 1)})}
                            >+</button>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm border-b font-bold mb-2 text-white-600">Настройки для тачпада</h4>

                        <label className="block text-xs mb-1">Порог остановки: {trackpadSettings.scrollStopThreshold.toFixed(2)}</label>
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setTrackpadSettings({...trackpadSettings, scrollStopThreshold: Math.max(0.01, trackpadSettings.scrollStopThreshold - 0.01)})}
                            >–</button>
                            <input
                                type="range" min="0.01" max="5" step="0.01" value={trackpadSettings.scrollStopThreshold}
                                onChange={(e) => setTrackpadSettings({...trackpadSettings, scrollStopThreshold: parseFloat(e.target.value)})}
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setTrackpadSettings({...trackpadSettings, scrollStopThreshold: Math.min(5, trackpadSettings.scrollStopThreshold + 0.01)})}
                            >+</button>
                        </div>

                        <label className="block text-xs mb-1">Фактор плавности: {trackpadSettings.scrollEaseFactor.toFixed(2)}</label>
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setTrackpadSettings({...trackpadSettings, scrollEaseFactor: Math.max(0.01, trackpadSettings.scrollEaseFactor - 0.01)})}
                            >–</button>
                            <input
                                type="range" min="0.01" max="1" step="0.01" value={trackpadSettings.scrollEaseFactor}
                                onChange={(e) => setTrackpadSettings({...trackpadSettings, scrollEaseFactor: parseFloat(e.target.value)})}
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setTrackpadSettings({...trackpadSettings, scrollEaseFactor: Math.min(1, trackpadSettings.scrollEaseFactor + 0.01)})}
                            >+</button>
                        </div>

                        <label className="block text-xs mb-1">Минимальный шаг: {trackpadSettings.minScrollStep}px</label>
                        <div className="flex items-center gap-2">
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setTrackpadSettings({...trackpadSettings, minScrollStep: Math.max(1, trackpadSettings.minScrollStep - 1)})}
                            >–</button>
                            <input
                                type="range" min="1" max="200" step="1" value={trackpadSettings.minScrollStep}
                                onChange={(e) => setTrackpadSettings({...trackpadSettings, minScrollStep: parseInt(e.target.value)})}
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
                                onClick={() => setTrackpadSettings({...trackpadSettings, minScrollStep: Math.min(200, trackpadSettings.minScrollStep + 1)})}
                            >+</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}


// Custom with settings and touchpad states
// 'use client';
// import React, {useEffect, useRef, useState} from "react";
// import {usePathname} from "next/navigation";
//
// interface SmoothScrollProps {
//     children: React.ReactNode;
// }
//
// enum TouchpadState {
//     IDLE = "idle",
//     SCROLLING = "scrolling",
//     ANIMATING = "animating"
// }
//
// export default function SmoothScroll({children}: SmoothScrollProps) {
//     const scrollbarRef = useRef<HTMLDivElement>(null);
//     const pathname = usePathname();
//     const [showScrollbar, setShowScrollbar] = useState(true);
//     const [currentState, setCurrentState] = useState<TouchpadState>(TouchpadState.IDLE);
//     const [isTrackpad, setIsTrackpad] = useState(false);
//     const [isMac, setIsMac] = useState(false);
//
//     // Временные переменные для обнаружения
//     const lastWheelTimeRef = useRef<number>(0);
//     const touchpadLockReleaseTimeRef = useRef<number>(0);
//
//     // Настройки
//     const [settings, setSettings] = useState({
//         MIN_DELTA: 5,
//         TOUCHPAD_SENSITIVITY: 5,
//         MAX_VELOCITY: 10,
//         DEBOUNCE_TIME: 100,
//         MACBOOK_DEBOUNCE_TIME: 100,
//         TOUCHPAD_WHEEL_THROTTLE: 16, // Убираем агрессивный throttling для тачпада
//         WHEEL_THROTTLE: 16,
//         MOUSE_AFTER_TOUCHPAD_COOLDOWN: 50
//     });
//
//     const [mouseSettings, setMouseSettings] = useState({
//         scrollStopThreshold: 0.15,
//         scrollEaseFactor: 0.20,
//         minScrollStep: 10
//     });
//
//     const [trackpadSettings, setTrackpadSettings] = useState({
//         scrollStopThreshold: 0.5,
//         scrollEaseFactor: 0.15,
//         minScrollStep: 1
//     });
//
//     // Определение Mac OS
//     useEffect(() => {
//         const isMacOS = navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
//             navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
//         setIsMac(isMacOS);
//         if (isMacOS) {
//             setIsTrackpad(true);
//         }
//     }, []);
//
//     // Определение типа устройства ввода (упрощенная версия)
//     const detectInputDevice = React.useCallback((e: WheelEvent) => {
//         const currentTime = Date.now();
//         const deltaY = Math.abs(e.deltaY);
//
//         // Простая логика определения без сложных вычислений
//         const isLikelyTouchpad =
//             // Маленькие значения deltaY (меньше 40)
//             deltaY < 40 &&
//             // deltaMode === 0 (пиксели)
//             e.deltaMode === 0;
//
//         const isLikelyMouse =
//             // Большие значения delta (больше 80)
//             deltaY > 80 ||
//             // deltaMode !== 0 (строки или страницы)
//             e.deltaMode !== 0;
//
//         // На Mac сразу считаем тачпадом, иначе определяем по событию
//         if (isMac || isLikelyTouchpad) {
//             if (!isTrackpad) setIsTrackpad(true);
//         } else if (isLikelyMouse) {
//             if (isTrackpad) setIsTrackpad(false);
//         }
//     }, [isMac, isTrackpad]);
//
//     // ===== HIDE SCROLLBAR ON ROUTES =====
//     useEffect(() => {
//         const hideScrollPaths = [
//             '/contacts/connection',
//             '/pricing',
//             '/auth/login',
//             '/auth/register',
//             '/auth/forgot-password'
//         ];
//
//         const shouldHideScrollbar = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));
//
//         document.body.style.overflow = shouldHideScrollbar ? 'hidden' : '';
//         setShowScrollbar(!shouldHideScrollbar);
//
//         const timeout1 = setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);
//         const timeout2 = setTimeout(() => window.dispatchEvent(new Event('scroll')), 300);
//
//         return () => {
//             clearTimeout(timeout1);
//             clearTimeout(timeout2);
//             document.body.style.overflow = '';
//         };
//     }, [pathname]);
//
//     const getScrollOffset = React.useCallback(() => {
//         if (pathname.includes('/policy') || pathname.includes('/organizations')) return -130;
//         if (pathname.includes('/blog')) return -188;
//         if (pathname.includes('/editors')) return 90;
//         return 120;
//     }, [pathname]);
//
//     useEffect(() => {
//         if (!scrollbarRef.current) return;
//
//         let currentScroll = window.scrollY;
//         let targetScroll = currentScroll;
//         let isScrolling = false;
//
//         const initScroll = () => {
//             currentScroll = window.scrollY;
//             targetScroll = currentScroll;
//         };
//
//         const handleWheel = (e: WheelEvent) => {
//             // Проверяем, находится ли курсор над элементами, где нужен нативный скролл
//             const target = e.target as HTMLElement;
//             if (target.closest('textarea, .allow-native-scroll')) {
//                 return; // Не preventDefault для этих элементов
//             }
//
//             // Определяем устройство (но не мешаем скроллу)
//             detectInputDevice(e);
//
//             const currentTime = Date.now();
//
//             // Упрощенный throttling только по времени
//             const throttleTime = isTrackpad ? settings.TOUCHPAD_WHEEL_THROTTLE : settings.WHEEL_THROTTLE;
//             if (currentTime - lastWheelTimeRef.current < throttleTime) {
//                 e.preventDefault();
//                 return;
//             }
//
//             e.preventDefault();
//             lastWheelTimeRef.current = currentTime;
//
//             // Используем настройки в зависимости от типа устройства
//             const scrollSettings = isTrackpad ? trackpadSettings : mouseSettings;
//
//             if (Math.abs(e.deltaY) < settings.MIN_DELTA) return;
//
//             const scrollStep = Math.sign(e.deltaY) * Math.max(Math.abs(e.deltaY) * (isTrackpad ? settings.TOUCHPAD_SENSITIVITY : 1), scrollSettings.minScrollStep);
//             targetScroll += scrollStep;
//
//             const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//             targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
//
//             if (!isScrolling) {
//                 isScrolling = true;
//                 setCurrentState(isTrackpad ? TouchpadState.ANIMATING : TouchpadState.SCROLLING);
//
//                 const animate = () => {
//                     const diff = targetScroll - currentScroll;
//                     if (Math.abs(diff) < scrollSettings.scrollStopThreshold) {
//                         currentScroll = targetScroll;
//                         window.scrollTo(0, currentScroll);
//                         isScrolling = false;
//                         setCurrentState(TouchpadState.IDLE);
//                         return;
//                     }
//                     currentScroll += diff * scrollSettings.scrollEaseFactor;
//                     window.scrollTo(0, currentScroll);
//                     requestAnimationFrame(animate);
//                 };
//                 requestAnimationFrame(animate);
//             }
//         };
//
//         const handleScroll = () => {
//             if (!isScrolling) {
//                 currentScroll = window.scrollY;
//                 targetScroll = currentScroll;
//             }
//         };
//
//         const handleAnchorClick = (e: MouseEvent) => {
//             const target = e.target as HTMLElement;
//             if (target.tagName === "A") {
//                 const anchor = target.getAttribute("href");
//                 if (anchor?.startsWith("#")) {
//                     const el = document.querySelector(anchor);
//                     if (el) {
//                         e.preventDefault();
//                         const offset = getScrollOffset();
//                         const elTop = (el as HTMLElement).offsetTop - offset;
//                         const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//                         targetScroll = Math.max(0, Math.min(elTop, maxScroll));
//
//                         const scrollSettings = isTrackpad ? trackpadSettings : mouseSettings;
//
//                         if (!isScrolling) {
//                             isScrolling = true;
//                             const animate = () => {
//                                 const diff = targetScroll - currentScroll;
//                                 if (Math.abs(diff) < scrollSettings.scrollStopThreshold) {
//                                     currentScroll = targetScroll;
//                                     window.scrollTo(0, currentScroll);
//                                     isScrolling = false;
//                                     return;
//                                 }
//                                 currentScroll += diff * scrollSettings.scrollEaseFactor;
//                                 window.scrollTo(0, currentScroll);
//                                 requestAnimationFrame(animate);
//                             };
//                             requestAnimationFrame(animate);
//                         }
//                     }
//                 }
//             }
//         };
//
//         const scrollHandler = () => {
//             handleScroll();
//             requestAnimationFrame(updateScrollbar);
//         };
//
//         const updateScrollbar = () => {
//             const scrollTop = window.scrollY;
//             const scrollHeight = document.documentElement.scrollHeight;
//             const clientHeight = window.innerHeight;
//             const maxScroll = scrollHeight - clientHeight;
//
//             const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
//             const maxTop = clientHeight - scrollbarHeight - 8;
//             const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;
//
//             if (scrollbarRef.current) {
//                 scrollbarRef.current.style.setProperty('--scrollY', `${topPercent}px`);
//                 scrollbarRef.current.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
//             }
//         };
//
//         initScroll();
//         updateScrollbar();
//
//         window.addEventListener('wheel', handleWheel, {passive: false});
//         window.addEventListener('scroll', scrollHandler, {passive: true});
//         document.addEventListener('click', handleAnchorClick);
//         window.addEventListener('resize', updateScrollbar);
//
//         return () => {
//             window.removeEventListener('wheel', handleWheel);
//             window.removeEventListener('scroll', scrollHandler);
//             document.removeEventListener('click', handleAnchorClick);
//             window.removeEventListener('resize', updateScrollbar);
//         };
//     }, [isTrackpad, trackpadSettings, mouseSettings, pathname, getScrollOffset, currentState, settings, detectInputDevice, isMac]);
//
//     useEffect(() => {
//         window.scrollTo(0, 0);
//         document.documentElement.scrollTop = 0;
//         document.body.scrollTop = 0;
//
//         setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 50);
//     }, [pathname]);
//
//     return (
//         <>
//             {children}
//             {showScrollbar && <div ref={scrollbarRef} className="scrollbar md:block hidden"></div>}
//
//             {/* ===== LIVE SETTINGS PANEL ===== */}
//             {process.env.NODE_ENV === 'development' && (
//                 <div className="fixed top-[70px] right-4 backdrop-blur-2xl border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 z-[9999999999] w-80 max-h-[80vh] overflow-y-auto allow-native-scroll">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                         Настройки прокрутки
//                     </h3>
//
//                     <div className="mb-4 p-2 bg-gray-100 dark:bg-gray-700 rounded">
//                         <p className="text-sm text-gray-600 dark:text-gray-300">
//                             Устройство: <span className="font-bold">{isTrackpad ? 'Тачпад' : 'Мышь'}</span>
//                         </p>
//                         <p className="text-sm text-gray-600 dark:text-gray-300">
//                             Состояние: <span className="font-bold">{currentState}</span>
//                         </p>
//                         <p className="text-sm text-gray-600 dark:text-gray-300">
//                             ОС: <span className="font-bold">{isMac ? 'macOS' : 'Windows/Linux'}</span>
//                         </p>
//                     </div>
//
//                     {/* Основные настройки */}
//                     <div className="mb-6">
//                         <h4 className="text-sm border-b font-bold mb-3 text-gray-600 dark:text-gray-300">Основные настройки</h4>
//
//                         <label className="block text-xs mb-1">MIN_DELTA: {settings.MIN_DELTA}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setSettings({...settings, MIN_DELTA: Math.max(1, settings.MIN_DELTA - 1)})}
//                             >–</button>
//                             <input
//                                 type="range" min="1" max="20" step="1" value={settings.MIN_DELTA}
//                                 onChange={(e) => setSettings({...settings, MIN_DELTA: parseInt(e.target.value)})}
//                                 className="w-full h-1"
//                             />
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setSettings({...settings, MIN_DELTA: Math.min(20, settings.MIN_DELTA + 1)})}
//                             >+</button>
//                         </div>
//
//                         <label className="block text-xs mb-1">TOUCHPAD_SENSITIVITY: {settings.TOUCHPAD_SENSITIVITY}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setSettings({...settings, TOUCHPAD_SENSITIVITY: Math.max(1, settings.TOUCHPAD_SENSITIVITY - 1)})}
//                             >–</button>
//                             <input
//                                 type="range" min="1" max="20" step="1" value={settings.TOUCHPAD_SENSITIVITY}
//                                 onChange={(e) => setSettings({...settings, TOUCHPAD_SENSITIVITY: parseInt(e.target.value)})}
//                                 className="w-full h-1"
//                             />
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setSettings({...settings, TOUCHPAD_SENSITIVITY: Math.min(20, settings.TOUCHPAD_SENSITIVITY + 1)})}
//                             >+</button>
//                         </div>
//
//                         <label className="block text-xs mb-1">MAX_VELOCITY: {settings.MAX_VELOCITY}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setSettings({...settings, MAX_VELOCITY: Math.max(1, settings.MAX_VELOCITY - 1)})}
//                             >–</button>
//                             <input
//                                 type="range" min="1" max="50" step="1" value={settings.MAX_VELOCITY}
//                                 onChange={(e) => setSettings({...settings, MAX_VELOCITY: parseInt(e.target.value)})}
//                                 className="w-full h-1"
//                             />
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setSettings({...settings, MAX_VELOCITY: Math.min(50, settings.MAX_VELOCITY + 1)})}
//                             >+</button>
//                         </div>
//
//                         <label className="block text-xs mb-1">DEBOUNCE_TIME: {settings.DEBOUNCE_TIME}ms</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setSettings({...settings, DEBOUNCE_TIME: Math.max(10, settings.DEBOUNCE_TIME - 10)})}
//                             >–</button>
//                             <input
//                                 type="range" min="10" max="1000" step="10" value={settings.DEBOUNCE_TIME}
//                                 onChange={(e) => setSettings({...settings, DEBOUNCE_TIME: parseInt(e.target.value)})}
//                                 className="w-full h-1"
//                             />
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setSettings({...settings, DEBOUNCE_TIME: Math.min(1000, settings.DEBOUNCE_TIME + 10)})}
//                             >+</button>
//                         </div>
//
//                         <label className="block text-xs mb-1">MACBOOK_DEBOUNCE_TIME: {settings.MACBOOK_DEBOUNCE_TIME}ms</label>
//                         <div className="flex items-center gap-2 mb-4">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setSettings({...settings, MACBOOK_DEBOUNCE_TIME: Math.max(10, settings.MACBOOK_DEBOUNCE_TIME - 10)})}
//                             >–</button>
//                             <input
//                                 type="range" min="10" max="1000" step="10" value={settings.MACBOOK_DEBOUNCE_TIME}
//                                 onChange={(e) => setSettings({...settings, MACBOOK_DEBOUNCE_TIME: parseInt(e.target.value)})}
//                                 className="w-full h-1"
//                             />
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setSettings({...settings, MACBOOK_DEBOUNCE_TIME: Math.min(1000, settings.MACBOOK_DEBOUNCE_TIME + 10)})}
//                             >+</button>
//                         </div>
//                     </div>
//
//                     {/* Настройки для мыши */}
//                     <div className="mb-6">
//                         <h4 className="text-sm border-b font-bold mb-2 text-gray-600 dark:text-gray-300">Настройки для мыши</h4>
//
//                         <label className="block text-xs mb-1">Порог остановки: {mouseSettings.scrollStopThreshold.toFixed(2)}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setMouseSettings({...mouseSettings, scrollStopThreshold: Math.max(0.01, mouseSettings.scrollStopThreshold - 0.01)})}
//                             >–</button>
//                             <input type="range" min="0.01" max="5" step="0.01" value={mouseSettings.scrollStopThreshold}
//                                    onChange={(e) => setMouseSettings({...mouseSettings, scrollStopThreshold: parseFloat(e.target.value)})}
//                                    className="w-full h-1"/>
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setMouseSettings({...mouseSettings, scrollStopThreshold: Math.min(5, mouseSettings.scrollStopThreshold + 0.01)})}
//                             >+</button>
//                         </div>
//
//                         <label className="block text-xs mb-1">Фактор плавности: {mouseSettings.scrollEaseFactor.toFixed(2)}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setMouseSettings({...mouseSettings, scrollEaseFactor: Math.max(0.01, mouseSettings.scrollEaseFactor - 0.01)})}
//                             >–</button>
//                             <input type="range" min="0.01" max="1" step="0.01" value={mouseSettings.scrollEaseFactor}
//                                    onChange={(e) => setMouseSettings({...mouseSettings, scrollEaseFactor: parseFloat(e.target.value)})}
//                                    className="w-full h-1"/>
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setMouseSettings({...mouseSettings, scrollEaseFactor: Math.min(1, mouseSettings.scrollEaseFactor + 0.01)})}
//                             >+</button>
//                         </div>
//
//                         <label className="block text-xs mb-1">Минимальный шаг: {mouseSettings.minScrollStep}px</label>
//                         <div className="flex items-center gap-2 mb-4">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setMouseSettings({...mouseSettings, minScrollStep: Math.max(1, mouseSettings.minScrollStep - 1)})}
//                             >–</button>
//                             <input type="range" min="1" max="200" step="1" value={mouseSettings.minScrollStep}
//                                    onChange={(e) => setMouseSettings({...mouseSettings, minScrollStep: parseInt(e.target.value)})}
//                                    className="w-full h-1"/>
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setMouseSettings({...mouseSettings, minScrollStep: Math.min(200, mouseSettings.minScrollStep + 1)})}
//                             >+</button>
//                         </div>
//                     </div>
//
//                     {/* Настройки для тачпада */}
//                     <div>
//                         <h4 className="text-sm border-b font-bold mb-2 text-gray-600 dark:text-gray-300">Настройки для тачпада</h4>
//
//                         <label className="block text-xs mb-1">Порог остановки: {trackpadSettings.scrollStopThreshold.toFixed(2)}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setTrackpadSettings({...trackpadSettings, scrollStopThreshold: Math.max(0.01, trackpadSettings.scrollStopThreshold - 0.01)})}
//                             >–</button>
//                             <input type="range" min="0.01" max="5" step="0.01" value={trackpadSettings.scrollStopThreshold}
//                                    onChange={(e) => setTrackpadSettings({...trackpadSettings, scrollStopThreshold: parseFloat(e.target.value)})}
//                                    className="w-full h-1"/>
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setTrackpadSettings({...trackpadSettings, scrollStopThreshold: Math.min(5, trackpadSettings.scrollStopThreshold + 0.01)})}
//                             >+</button>
//                         </div>
//
//                         <label className="block text-xs mb-1">Фактор плавности: {trackpadSettings.scrollEaseFactor.toFixed(2)}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setTrackpadSettings({...trackpadSettings, scrollEaseFactor: Math.max(0.01, trackpadSettings.scrollEaseFactor - 0.01)})}
//                             >–</button>
//                             <input type="range" min="0.01" max="1" step="0.01" value={trackpadSettings.scrollEaseFactor}
//                                    onChange={(e) => setTrackpadSettings({...trackpadSettings, scrollEaseFactor: parseFloat(e.target.value)})}
//                                    className="w-full h-1"/>
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setTrackpadSettings({...trackpadSettings, scrollEaseFactor: Math.min(1, trackpadSettings.scrollEaseFactor + 0.01)})}
//                             >+</button>
//                         </div>
//
//                         <label className="block text-xs mb-1">Минимальный шаг: {trackpadSettings.minScrollStep}px</label>
//                         <div className="flex items-center gap-2">
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setTrackpadSettings({...trackpadSettings, minScrollStep: Math.max(1, trackpadSettings.minScrollStep - 1)})}
//                             >–</button>
//                             <input type="range" min="1" max="200" step="1" value={trackpadSettings.minScrollStep}
//                                    onChange={(e) => setTrackpadSettings({...trackpadSettings, minScrollStep: parseInt(e.target.value)})}
//                                    className="w-full h-1"/>
//                             <button
//                                 className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded text-xs"
//                                 onClick={() => setTrackpadSettings({...trackpadSettings, minScrollStep: Math.min(200, trackpadSettings.minScrollStep + 1)})}
//                             >+</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }