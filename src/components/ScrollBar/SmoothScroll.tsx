// Функция с настройками плавной прокрутки с учетом различных устройств ввода

// Main
// 'use client';
// import React, {useEffect, useRef, useState} from "react";
// import {usePathname} from "next/navigation";
// import {useCustomScroll} from "@/components/hooks/useCustomScroll";
// import { useRefreshRate} from "@/components/hooks/useRefreshRate";
//
// interface SmoothScrollProps {
//     children: React.ReactNode;
// }
//
// interface TrackpadDebugInfo {
//     deltaY: number;
//     deltaX: number;
//     deltaZ: number;
//     deltaMode: number;
//     avgDelta: number;
//     maxDelta: number;
//     minDelta: number;
//     deltaVariance: number;
//     eventCount: number;
//     lastEventTime: number;
//     frequency: number;
// }
//
// interface DelaySettings {
//     detectionDelay: {
//         enabled: boolean;
//         value: number;
//     };
//     scrollAnimationDelay: {
//         enabled: boolean;
//         value: number;
//     };
//     routeChangeDelay: {
//         enabled: boolean;
//         value: number;
//     };
//     resizeDelay: {
//         enabled: boolean;
//         value: number;
//     };
// }
//
//
// export default function SmoothScroll({children}: SmoothScrollProps) {
//     const scrollbarRef = useRef<HTMLDivElement>(null);
//     const pathname = usePathname();
//     const [showScrollbar, setShowScrollbar] = useState(true);
//     const [isOpen, setIsOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);
//
//     const { refreshRate, isDetecting, smoothScrollFactor: autoSmoothFactor } = useRefreshRate();
//
//     // Состояния для drag-to-scroll
//     const [isDragging, setIsDragging] = useState(false);
//     const [dragStartY, setDragStartY] = useState(0);
//     const [dragStartScrollTop, setDragStartScrollTop] = useState(0);
//
//     const [isTrackpad, setIsTrackpad] = useState(false);
//     const [trackpadDebugInfo, setTrackpadDebugInfo] = useState<TrackpadDebugInfo>({
//         deltaY: 0,
//         deltaX: 0,
//         deltaZ: 0,
//         deltaMode: 0,
//         avgDelta: 0,
//         maxDelta: 0,
//         minDelta: 0,
//         deltaVariance: 0,
//         eventCount: 0,
//         lastEventTime: 0,
//         frequency: 0
//     });
//
//     const [mouseSettings, setMouseSettings] = useState({
//         scrollStopThreshold: 0.5,
//         scrollEaseFactor: 0.25,
//         minScrollStep: 1,
//     });
//
//     const [trackpadSettings, setTrackpadSettings] = useState({
//         scrollStopThreshold: 0.0,
//         scrollEaseFactor: 0.50,
//         minScrollStep: 1
//     });
//
//     const [delaySettings, setDelaySettings] = useState<DelaySettings>({
//         detectionDelay: {
//             enabled: true,
//             value: 40
//         },
//         scrollAnimationDelay: {
//             enabled: true,
//             value: 1
//         },
//         routeChangeDelay: {
//             enabled: true,
//             value: 40
//         },
//         resizeDelay: {
//             enabled: true,
//             value: 40
//         }
//     });
//
//     // const { scrollbarRef: customScrollbarRef } = useCustomScroll({
//     //     smoothScrollFactor: isTrackpad ? trackpadSettings.scrollEaseFactor : mouseSettings.scrollEaseFactor,
//     //     enabled: showScrollbar && !isMobile,
//     //     target: 'window'
//     // });
//
//     const getScrollOffset = React.useCallback(() => {
//         if (pathname.includes('/policy') || pathname.includes('/organizations')) return -115;
//         if (pathname.includes('/blogPage')) return -174;
//         if (pathname.includes('/organizations/where-do-you-lose')) return -110;
//         if (pathname.includes('/editors')) return 90;
//         return 120;
//     }, [pathname]);
//
//     const { scrollbarRef: customScrollbarRef } = useCustomScroll({
//         smoothScrollFactor: isTrackpad ? trackpadSettings.scrollEaseFactor : mouseSettings.scrollEaseFactor,
//         scrollPadding: 2, // или ваше значение
//         enabled: showScrollbar && !isMobile,
//         target: 'window',
//         getScrollOffset // Передаем вашу функцию offset
//     });
//
//     // Определение мобильного устройства
//     useEffect(() => {
//         const checkMobile = () => {
//             const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
//                 window.innerWidth <= 768 ||
//                 ('ontouchstart' in window) ||
//                 (navigator.maxTouchPoints > 0);
//
//             setIsMobile(isMobileDevice);
//             return isMobileDevice;
//         };
//
//         checkMobile();
//         window.addEventListener('resize', checkMobile);
//
//         return () => {
//             window.removeEventListener('resize', checkMobile);
//         };
//     }, []);
//
//     // Определение типа устройства ввода (только для desktop)
//     useEffect(() => {
//         if (isMobile) return;
//
//         const wheelEvents: number[] = [];
//         const wheelTimestamps: number[] = [];
//         let detectionTimeout: NodeJS.Timeout;
//
//         const detectInputDevice = (e: WheelEvent) => {
//             const currentTime = Date.now();
//             const timeDiff = currentTime - trackpadDebugInfo.lastEventTime;
//
//             setTrackpadDebugInfo(prev => {
//                 const newEventCount = prev.eventCount + 1;
//                 const frequency = timeDiff > 0 ? 1000 / timeDiff : 0;
//
//                 return {
//                     ...prev,
//                     deltaY: e.deltaY,
//                     deltaX: e.deltaX,
//                     deltaZ: e.deltaZ,
//                     deltaMode: e.deltaMode,
//                     eventCount: newEventCount,
//                     lastEventTime: currentTime,
//                     frequency: frequency
//                 };
//             });
//
//             wheelEvents.push(Math.abs(e.deltaY));
//             wheelTimestamps.push(currentTime);
//             if (wheelEvents.length > 10) {
//                 wheelEvents.shift();
//                 wheelTimestamps.shift();
//             }
//
//             clearTimeout(detectionTimeout);
//
//             const delayValue = delaySettings.detectionDelay.enabled ?
//                 delaySettings.detectionDelay.value : 0;
//
//             detectionTimeout = setTimeout(() => {
//                 if (wheelEvents.length >= 5) {
//                     const avgDelta = wheelEvents.reduce((a, b) => a + b, 0) / wheelEvents.length;
//                     const maxDelta = Math.max(...wheelEvents);
//                     const minDelta = Math.min(...wheelEvents);
//                     const deltaVariance = maxDelta - minDelta;
//
//                     const intervals = [];
//                     for (let i = 1; i < wheelTimestamps.length; i++) {
//                         intervals.push(wheelTimestamps[i] - wheelTimestamps[i - 1]);
//                     }
//                     const avgInterval = intervals.length > 0 ?
//                         intervals.reduce((a, b) => a + b, 0) / intervals.length : 0;
//
//                     setTrackpadDebugInfo(prev => ({
//                         ...prev,
//                         avgDelta,
//                         maxDelta,
//                         minDelta,
//                         deltaVariance
//                     }));
//
//                     const isWindows = navigator.platform.toLowerCase().includes('win') ||
//                         navigator.userAgent.toLowerCase().includes('windows');
//                     const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
//                         navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
//
//                     let isLikelyTrackpad = false;
//                     let isLikelyMouse = false;
//
//                     if (isMac) {
//                         isLikelyTrackpad =
//                             avgDelta < 50 &&
//                             deltaVariance < 30 &&
//                             e.deltaMode === 0 &&
//                             avgInterval < 50;
//
//                         isLikelyMouse =
//                             avgDelta > 80 ||
//                             deltaVariance > 50 ||
//                             e.deltaMode !== 0 ||
//                             avgInterval > 100;
//                     } else if (isWindows) {
//                         isLikelyTrackpad =
//                             (avgDelta < 120 && deltaVariance < 100 && avgInterval < 30) ||
//                             (avgDelta < 30 && e.deltaMode === 0);
//
//                         isLikelyMouse =
//                             (avgDelta >= 120 && (deltaVariance > 100 || avgInterval > 50)) ||
//                             (e.deltaMode === 1) ||
//                             (avgDelta === 120 && deltaVariance === 0);
//                     } else {
//                         isLikelyTrackpad =
//                             avgDelta < 80 &&
//                             deltaVariance < 60 &&
//                             e.deltaMode === 0;
//
//                         isLikelyMouse =
//                             avgDelta > 100 ||
//                             deltaVariance > 80 ||
//                             e.deltaMode !== 0;
//                     }
//
//                     if (isLikelyTrackpad) {
//                         setIsTrackpad(true);
//                     } else if (isLikelyMouse) {
//                         setIsTrackpad(false);
//                     }
//                 }
//             }, delayValue);
//         };
//
//         const isWindows = navigator.platform.toLowerCase().includes('win') ||
//             navigator.userAgent.toLowerCase().includes('windows');
//         const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
//             navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
//
//         if (isMac) {
//             setIsTrackpad(true);
//         } else if (isWindows) {
//             setIsTrackpad(false);
//         }
//
//         window.addEventListener('wheel', detectInputDevice, {passive: true});
//
//         return () => {
//             window.removeEventListener('wheel', detectInputDevice);
//             clearTimeout(detectionTimeout);
//         };
//     }, [delaySettings.detectionDelay, isMobile]);
//
//     useEffect(() => {
//         const hideScrollPaths = [
//             // '/contacts/connection',
//             '/pricing',
//             // '/auth/login',
//             // '/auth/register',
//             // '/auth/forgot-password'
//         ];
//
//         const shouldHideScrollbar = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));
//
//         // На мобилках не блокируем overflow
//         if (window.screen.width > 768 && !isMobile) {
//             document.body.style.overflow = shouldHideScrollbar ? 'hidden' : '';
//             setShowScrollbar(!shouldHideScrollbar);
//         } else {
//             // На мобилках разрешаем нативный скролл
//             document.body.style.overflow = '';
//             setShowScrollbar(false);
//         }
//
//         const routeDelay = delaySettings.routeChangeDelay.enabled ?
//             delaySettings.routeChangeDelay.value : 0;
//
//         const timeout1 = setTimeout(() => window.dispatchEvent(new Event('scroll')), routeDelay);
//         const timeout2 = setTimeout(() => window.dispatchEvent(new Event('scroll')), routeDelay * 6);
//
//         return () => {
//             clearTimeout(timeout1);
//             clearTimeout(timeout2);
//             if (!isMobile) {
//                 document.body.style.overflow = '';
//             }
//         };
//     }, [pathname, delaySettings.routeChangeDelay, isMobile]);
//
//     const handleMouseMove = React.useCallback((e: MouseEvent) => {
//         if (!isDragging) return;
//
//         e.preventDefault();
//
//         const deltaY = e.clientY - dragStartY;
//         const scrollHeight = document.documentElement.scrollHeight;
//         const clientHeight = window.innerHeight;
//         const maxScroll = scrollHeight - clientHeight;
//
//         // Вычисляем коэффициент прокрутки
//         const scrollRatio = deltaY / clientHeight;
//         const newScrollTop = dragStartScrollTop + (scrollRatio * scrollHeight);
//
//         // Ограничиваем значения
//         const clampedScrollTop = Math.max(0, Math.min(newScrollTop, maxScroll));
//
//         window.scrollTo(0, clampedScrollTop);
//     }, [isDragging, dragStartY, dragStartScrollTop]);
//
//     const handleMouseUp = React.useCallback(() => {
//         if (!isDragging) return;
//
//         setIsDragging(false);
//
//         // Возвращаем нормальный курсор
//         document.body.style.cursor = '';
//         document.body.style.userSelect = '';
//     }, [isDragging]);
//
//     // Добавляем обработчики мыши для drag-to-scroll
//     useEffect(() => {
//         if (isDragging) {
//             document.addEventListener('mousemove', handleMouseMove);
//             document.addEventListener('mouseup', handleMouseUp);
//
//             return () => {
//                 document.removeEventListener('mousemove', handleMouseMove);
//                 document.removeEventListener('mouseup', handleMouseUp);
//             };
//         }
//     }, [isDragging, handleMouseMove, handleMouseUp]);
//
//     useEffect(() => {
//         // На мобилках используем нативный скролл
//         if (isMobile) return;
//
//         if (!scrollbarRef.current) return;
//
//         let currentScroll = window.scrollY;
//         let targetScroll = currentScroll;
//         let isScrolling = false;
//         let lastUpdateTime = 0;
//         let rafId: number | null = null;
//
//         const initScroll = () => {
//             currentScroll = window.scrollY;
//             targetScroll = currentScroll;
//         };
//
//         const handleWheel = (e: WheelEvent) => {
//             // Игнорируем wheel события во время drag
//             if (isDragging) return;
//
//             if ((e.target as HTMLElement).closest('textarea, .allow-native-scroll')) return;
//
//             e.preventDefault();
//             e.stopPropagation();
//             e.stopImmediatePropagation();
//
//             const settings = isTrackpad ? trackpadSettings : mouseSettings;
//             const scrollStep = Math.sign(e.deltaY) * Math.max(Math.abs(e.deltaY), settings.minScrollStep);
//             targetScroll += scrollStep;
//
//             const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//             targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
//
//             if (!isScrolling) {
//                 isScrolling = true;
//                 const animate = () => {
//                     const now = performance.now();
//                     const timeDelta = now - lastUpdateTime;
//                     lastUpdateTime = now;
//
//                     const diff = targetScroll - currentScroll;
//                     const absDiff = Math.abs(diff);
//
//                     if (absDiff < settings.scrollStopThreshold) {
//                         currentScroll = targetScroll;
//                         const finalPosition = Math.round(currentScroll * 100) / 100;
//
//                         window.scrollTo(0, finalPosition);
//
//                         requestAnimationFrame(() => {
//                             window.scrollTo(0, finalPosition);
//                         });
//
//                         isScrolling = false;
//                         rafId = null;
//                         return;
//                     }
//
//                     const timeMultiplier = Math.min(timeDelta / 16.67, 2);
//                     const adjustedEase = settings.scrollEaseFactor * timeMultiplier;
//
//                     currentScroll += diff * Math.min(adjustedEase, 0.5);
//                     const smoothPosition = Math.round(currentScroll * 100) / 100;
//
//                     window.scrollTo(0, smoothPosition);
//
//                     if (delaySettings.scrollAnimationDelay.enabled) {
//                         setTimeout(() => {
//                             rafId = requestAnimationFrame(animate);
//                         }, delaySettings.scrollAnimationDelay.value);
//                     } else {
//                         rafId = requestAnimationFrame(animate);
//                     }
//                 };
//
//                 lastUpdateTime = performance.now();
//                 if (delaySettings.scrollAnimationDelay.enabled) {
//                     setTimeout(() => {
//                         rafId = requestAnimationFrame(animate);
//                     }, delaySettings.scrollAnimationDelay.value);
//                 } else {
//                     rafId = requestAnimationFrame(animate);
//                 }
//             }
//         };
//
//         const handleScroll = () => {
//             if (!isScrolling && !isDragging) {
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
//                         const settings = isTrackpad ? trackpadSettings : mouseSettings;
//
//                         if (!isScrolling) {
//                             isScrolling = true;
//                             const animate = () => {
//                                 const diff = targetScroll - currentScroll;
//                                 if (Math.abs(diff) < settings.scrollStopThreshold) {
//                                     currentScroll = targetScroll;
//                                     window.scrollTo(0, Math.round(currentScroll * 100) / 100);
//                                     isScrolling = false;
//                                     return;
//                                 }
//
//                                 currentScroll += diff * settings.scrollEaseFactor;
//                                 window.scrollTo(0, Math.round(currentScroll * 100) / 100);
//
//                                 if (delaySettings.scrollAnimationDelay.enabled) {
//                                     setTimeout(() => requestAnimationFrame(animate), delaySettings.scrollAnimationDelay.value);
//                                 } else {
//                                     requestAnimationFrame(animate);
//                                 }
//                             };
//
//                             if (delaySettings.scrollAnimationDelay.enabled) {
//                                 setTimeout(() => requestAnimationFrame(animate), delaySettings.scrollAnimationDelay.value);
//                             } else {
//                                 requestAnimationFrame(animate);
//                             }
//                         }
//                     }
//                 }
//             }
//         };
//
//         const scrollHandler = () => {
//             handleScroll();
//             if (delaySettings.scrollAnimationDelay.enabled) {
//                 setTimeout(() => requestAnimationFrame(updateScrollbar), delaySettings.scrollAnimationDelay.value);
//             } else {
//                 requestAnimationFrame(updateScrollbar);
//             }
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
//         const handleResize = () => {
//             const resizeDelay = delaySettings.resizeDelay.enabled ?
//                 delaySettings.resizeDelay.value : 0;
//
//             if (resizeDelay > 0) {
//                 setTimeout(updateScrollbar, resizeDelay);
//             } else {
//                 updateScrollbar();
//             }
//         };
//
//         initScroll();
//         updateScrollbar();
//
//         window.addEventListener('wheel', handleWheel, {passive: false});
//         window.addEventListener('scroll', scrollHandler, {passive: true});
//         document.addEventListener('click', handleAnchorClick);
//         window.addEventListener('resize', handleResize);
//
//         return () => {
//             window.removeEventListener('wheel', handleWheel);
//             window.removeEventListener('scroll', scrollHandler);
//             document.removeEventListener('click', handleAnchorClick);
//             window.removeEventListener('resize', handleResize);
//
//             if (rafId) {
//                 cancelAnimationFrame(rafId);
//             }
//         };
//     }, [isTrackpad, trackpadSettings, mouseSettings, pathname, getScrollOffset, delaySettings, isMobile, isDragging]);
//
//     useEffect(() => {
//         window.scrollTo(0, 0);
//         document.documentElement.scrollTop = 0;
//         document.body.scrollTop = 0;
//
//         const routeDelay = delaySettings.routeChangeDelay.enabled ?
//             delaySettings.routeChangeDelay.value : 0;
//
//         setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, routeDelay);
//     }, [pathname, delaySettings.routeChangeDelay]);
//
//     const updateDelaySetting = (key: keyof DelaySettings, property: 'enabled' | 'value', value: boolean | number) => {
//         setDelaySettings(prev => ({
//             ...prev,
//             [key]: {
//                 ...prev[key],
//                 [property]: value
//             }
//         }));
//     };
//
//     return (
//         <>
//             {children}
//             {showScrollbar && !isMobile && (
//                 <div
//                     // ref={scrollbarRef}
//                     ref={customScrollbarRef}
//                     className={`scrollbar md:block hidden`}
//                 />
//             )}
//
//             {/* Кнопки управления */}
//             <div className="fixed top-[90%] right-4 z-[10000000000] hidden gap-2">
//                 {!isOpen ? (
//                     <button
//                         onClick={() => setIsOpen(true)}
//                         className="bg-blue-600 text-white px-2 py-1 rounded-lg text-sm cursor-pointer shadow hover:bg-blue-700 transition"
//                     >
//                         Open
//                     </button>
//                 ) : (
//                     <button
//                         onClick={() => setIsOpen(false)}
//                         className="bg-red-600 text-white px-2 py-1 rounded-lg text-sm cursor-pointer shadow hover:bg-red-700 transition"
//                     >
//                         Close
//                     </button>
//                 )}
//             </div>
//
//             {/*  ENHANCED SETTINGS PANEL */}
//             {isOpen && (
//                 <div
//                     className="fixed top-[70px] right-4 backdrop-blur-2xl border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 z-[9999999999] w-96 max-h-[80vh] overflow-y-auto allow-native-scroll">
//                     <h3 className="text-lg font-semibold ">
//                         Настройки прокрутки ({isTrackpad ? 'Тачпад' : 'Мышка'})
//                     </h3>
//
//                     {/* ===== TRACKPAD DEBUG INFO ===== */}
//                     <div className="mb-6 p-3  bg-gray-800 rounded-lg">
//                         <h4 className="text-sm font-bold mb-2 ">Отладка трекпада</h4>
//
//                         {/* OS Detection */}
//                         <div className="mb-2 p-2 bg-blue-900/20 rounded text-xs">
//                             <strong>ОС:</strong> {
//                             navigator.platform.toLowerCase().includes('win') || navigator.userAgent.toLowerCase().includes('windows') ? 'Windows' :
//                                 navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? 'macOS' : 'Other'
//                         } | <strong>Платформа:</strong> {navigator.platform}
//                         </div>
//
//                         <div className="grid grid-cols-2 gap-2 text-xs">
//                             <div>deltaY: <span
//                                 className="font-mono">{trackpadDebugInfo.deltaY.toFixed(1)}</span></div>
//                             <div>deltaX: <span
//                                 className="font-mono">{trackpadDebugInfo.deltaX.toFixed(1)}</span></div>
//                             <div>deltaMode: <span className="font-mono">{trackpadDebugInfo.deltaMode}</span>
//                             </div>
//                             <div>Частота: <span
//                                 className="font-mono">{trackpadDebugInfo.frequency.toFixed(1)}Hz</span>
//                             </div>
//                             <div>Среднее Δ: <span
//                                 className="font-mono">{trackpadDebugInfo.avgDelta.toFixed(1)}</span>
//                             </div>
//                             <div>Вариация: <span
//                                 className="font-mono">{trackpadDebugInfo.deltaVariance.toFixed(1)}</span>
//                             </div>
//                             <div>Событий: <span className="font-mono">{trackpadDebugInfo.eventCount}</span>
//                             </div>
//                             <div>Мин/Макс: <span
//                                 className="font-mono">{trackpadDebugInfo.minDelta.toFixed(1)}/{trackpadDebugInfo.maxDelta.toFixed(1)}</span>
//                             </div>
//                         </div>
//
//                         {/* Device Detection Logic */}
//                         <div className="mt-2 p-2 bg-yellow-900/20 rounded text-xs">
//                             <div className="flex justify-between">
//                                 <span>Детекция:</span>
//                                 <span
//                                     className={`font-bold ${isTrackpad ? 'text-green-600' : 'text-blue-600'}`}>
//                                 {isTrackpad ? 'Тачпад' : 'Мышь'}
//                             </span>
//                             </div>
//                             {navigator.platform.toLowerCase().includes('win') && (
//                                 <div className="text-xs text-gray-400 mt-1">
//                                     Windows критерии: avgΔ{trackpadDebugInfo.avgDelta < 120 ? '<120✓' : '≥120✗'},
//                                     var{trackpadDebugInfo.deltaVariance < 100 ? '<100✓' : '≥100✗'},
//                                     freq{trackpadDebugInfo.frequency > 33 ? '>33Hz✓' : '≤33Hz✗'}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//
//                     {/* ===== DELAY SETTINGS ===== */}
//                     <div className="mb-6">
//                         <h4 className="text-sm font-bold mb-3 border-b border-gray-600 pb-1">Управление
//                             задержками</h4>
//
//                         {Object.entries(delaySettings).map(([key, setting]) => {
//                             const labels = {
//                                 detectionDelay: 'Детекция устройства',
//                                 scrollAnimationDelay: 'Анимация скролла',
//                                 routeChangeDelay: 'Смена маршрута',
//                                 resizeDelay: 'Изменение размера'
//                             };
//
//                             return (
//                                 <div key={key} className="mb-3 p-2 bg-gray-700 rounded">
//                                     <div className="flex items-center justify-between mb-2">
//                                         <label className="text-xs font-medium">
//                                             {labels[key as keyof typeof labels]}
//                                         </label>
//                                         <label className="flex items-center">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={setting.enabled}
//                                                 onChange={(e) => updateDelaySetting(key as keyof DelaySettings, 'enabled', e.target.checked)}
//                                                 className="mr-1"
//                                             />
//                                             <span className="text-xs">Включено</span>
//                                         </label>
//                                     </div>
//
//                                     <div className="flex items-center gap-2">
//                                         <button
//                                             className="px-2 py-1 bg-gray-600 rounded text-xs"
//                                             disabled={!setting.enabled}
//                                             onClick={() => updateDelaySetting(key as keyof DelaySettings, 'value', Math.max(0, setting.value - (key === 'scrollAnimationDelay' ? 1 : 10)))}
//                                         >
//                                             –
//                                         </button>
//                                         <input
//                                             type="range"
//                                             min="0"
//                                             max={key === 'scrollAnimationDelay' ? '60' : '500'}
//                                             step={key === 'scrollAnimationDelay' ? '1' : '10'}
//                                             value={setting.value}
//                                             disabled={!setting.enabled}
//                                             onChange={(e) => updateDelaySetting(key as keyof DelaySettings, 'value', parseInt(e.target.value))}
//                                             className="flex-1"
//                                         />
//                                         <button
//                                             className="px-2 py-1  bg-gray-600 rounded text-xs"
//                                             disabled={!setting.enabled}
//                                             onClick={() => updateDelaySetting(key as keyof DelaySettings, 'value', Math.min(key === 'scrollAnimationDelay' ? 60 : 500, setting.value + (key === 'scrollAnimationDelay' ? 1 : 10)))}
//                                         >
//                                             +
//                                         </button>
//                                         <span className="text-xs font-mono w-12 text-right">
//                                         {setting.value}{key === 'scrollAnimationDelay' ? 'f' : 'ms'}
//                                     </span>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//
//                     {/* ===== MOUSE SETTINGS ===== */}
//                     <div className="mb-6">
//                         <h4 className="text-sm border-b font-bold mb-2 text-gray-300">Настройки для
//                             мышки</h4>
//
//                         <label className="block text-xs mb-1">Порог
//                             остановки: {mouseSettings.scrollStopThreshold.toFixed(2)}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 // min="0.001"
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
//                                 className="px-2 py-1 dark:bg-[#333333] rounded"
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
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 min="0"
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
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                         <label className="block text-xs mb-1">Минимальный
//                             шаг: {mouseSettings.minScrollStep}px</label>
//                         <div className="flex items-center gap-2 mb-6">
//                             <button
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                     {/* ===== TRACKPAD SETTINGS ===== */}
//                     <div>
//                         <h4 className="text-sm border-b font-bold mb-2 text-gray-300">Настройки для
//                             тачпада</h4>
//
//                         <label className="block text-xs mb-1">Порог
//                             остановки: {trackpadSettings.scrollStopThreshold.toFixed(2)}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 // min="0.001"
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
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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

// 'use client';
// import React, {useEffect, useRef, useState} from "react";
// import {usePathname} from "next/navigation";
// import {useCustomScroll} from "@/components/hooks/useCustomScroll";
//
// interface SmoothScrollProps {
//     children: React.ReactNode;
// }
//
// interface TrackpadDebugInfo {
//     deltaY: number;
//     deltaX: number;
//     deltaZ: number;
//     deltaMode: number;
//     avgDelta: number;
//     maxDelta: number;
//     minDelta: number;
//     deltaVariance: number;
//     eventCount: number;
//     lastEventTime: number;
//     frequency: number;
// }
//
// interface DelaySettings {
//     detectionDelay: {
//         enabled: boolean;
//         value: number;
//     };
//     scrollAnimationDelay: {
//         enabled: boolean;
//         value: number;
//     };
//     routeChangeDelay: {
//         enabled: boolean;
//         value: number;
//     };
//     resizeDelay: {
//         enabled: boolean;
//         value: number;
//     };
// }
//
//
// export default function SmoothScroll({children}: SmoothScrollProps) {
//     const scrollbarRef = useRef<HTMLDivElement>(null);
//     const pathname = usePathname();
//     const [showScrollbar, setShowScrollbar] = useState(true);
//     const [isOpen, setIsOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);
//
//     // Состояния для drag-to-scroll
//     const [isDragging, setIsDragging] = useState(false);
//     const [dragStartY, setDragStartY] = useState(0);
//     const [dragStartScrollTop, setDragStartScrollTop] = useState(0);
//
//     const [isTrackpad, setIsTrackpad] = useState(false);
//     const [trackpadDebugInfo, setTrackpadDebugInfo] = useState<TrackpadDebugInfo>({
//         deltaY: 0,
//         deltaX: 0,
//         deltaZ: 0,
//         deltaMode: 0,
//         avgDelta: 0,
//         maxDelta: 0,
//         minDelta: 0,
//         deltaVariance: 0,
//         eventCount: 0,
//         lastEventTime: 0,
//         frequency: 0
//     });
//
//     // Добавляем состояния для определения герцовки
//     const [refreshRate, setRefreshRate] = useState<number>(60);
//     const [isDetectingRefreshRate, setIsDetectingRefreshRate] = useState(true);
//
//     const [mouseSettings, setMouseSettings] = useState({
//         scrollStopThreshold: 0.0,
//         scrollEaseFactor: 0.10,
//         minScrollStep: 1
//     });
//
//     const [trackpadSettings, setTrackpadSettings] = useState({
//         scrollStopThreshold: 0.0,
//         scrollEaseFactor: 0.20,
//         minScrollStep: 1
//     });
//
//     const [delaySettings, setDelaySettings] = useState<DelaySettings>({
//         detectionDelay: {
//             enabled: true,
//             value: 40
//         },
//         scrollAnimationDelay: {
//             enabled: true,
//             value: 1
//         },
//         routeChangeDelay: {
//             enabled: true,
//             value: 40
//         },
//         resizeDelay: {
//             enabled: true,
//             value: 40
//         }
//     });
//
//     // Функция для определения фактора плавности по герцовке
//     const getAutoSmoothFactor = (rate: number): number => {
//         if (rate <= 129) return 0.20;
//         if (rate <= 199) return 0.15;
//         return 0.05;
//     };
//
//     // Определение герцовки экрана
//     useEffect(() => {
//         let frameCount = 0;
//         let startTime = 0;
//         let animationId: number;
//         const framesToMeasure = 60;
//
//         const measureFrameRate = (timestamp: number) => {
//             if (startTime === 0) {
//                 startTime = timestamp;
//             }
//
//             frameCount++;
//
//             if (frameCount < framesToMeasure) {
//                 animationId = requestAnimationFrame(measureFrameRate);
//             } else {
//                 const elapsed = timestamp - startTime;
//                 const calculatedFPS = Math.round((frameCount * 1000) / elapsed);
//
//                 // Округляем до стандартных значений refresh rate
//                 let detectedRate = calculatedFPS;
//                 if (calculatedFPS >= 58 && calculatedFPS <= 62) detectedRate = 60;
//                 else if (calculatedFPS >= 70 && calculatedFPS <= 76) detectedRate = 75;
//                 else if (calculatedFPS >= 88 && calculatedFPS <= 92) detectedRate = 90;
//                 else if (calculatedFPS >= 118 && calculatedFPS <= 122) detectedRate = 120;
//                 else if (calculatedFPS >= 143 && calculatedFPS <= 147) detectedRate = 144;
//                 else if (calculatedFPS >= 163 && calculatedFPS <= 167) detectedRate = 165;
//                 else if (calculatedFPS >= 238 && calculatedFPS <= 242) detectedRate = 240;
//                 else if (calculatedFPS >= 358 && calculatedFPS <= 362) detectedRate = 360;
//
//                 setRefreshRate(detectedRate);
//                 setIsDetectingRefreshRate(false);
//
//                 // Обновляем настройки с автоматическими значениями
//                 const autoFactor = getAutoSmoothFactor(detectedRate);
//                 setMouseSettings(prev => ({ ...prev, scrollEaseFactor: autoFactor }));
//                 setTrackpadSettings(prev => ({ ...prev, scrollEaseFactor: autoFactor }));
//
//                 console.log(`Detected refresh rate: ${detectedRate}Hz (measured: ${calculatedFPS}fps), auto factor: ${autoFactor}`);
//             }
//         };
//
//         const timeout = setTimeout(() => {
//             animationId = requestAnimationFrame(measureFrameRate);
//         }, 100);
//
//         return () => {
//             clearTimeout(timeout);
//             if (animationId) {
//                 cancelAnimationFrame(animationId);
//             }
//         };
//     }, []);
//
//     const getScrollOffset = React.useCallback(() => {
//         if (pathname.includes('/policy') || pathname.includes('/organizations')) return -115;
//         if (pathname.includes('/blogPage')) return -174;
//         if (pathname.includes('/organizations/where-do-you-lose')) return -110;
//         if (pathname.includes('/editors')) return 90;
//         return 120;
//     }, [pathname]);
//
//     const { scrollbarRef: customScrollbarRef } = useCustomScroll({
//         smoothScrollFactor: isTrackpad ? trackpadSettings.scrollEaseFactor : mouseSettings.scrollEaseFactor,
//         scrollPadding: 2,
//         enabled: showScrollbar && !isMobile,
//         target: 'window',
//         getScrollOffset
//     });
//
//     // Определение мобильного устройства
//     useEffect(() => {
//         const checkMobile = () => {
//             const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
//                 window.innerWidth <= 768 ||
//                 ('ontouchstart' in window) ||
//                 (navigator.maxTouchPoints > 0);
//
//             setIsMobile(isMobileDevice);
//             return isMobileDevice;
//         };
//
//         checkMobile();
//         window.addEventListener('resize', checkMobile);
//
//         return () => {
//             window.removeEventListener('resize', checkMobile);
//         };
//     }, []);
//
//     // Определение типа устройства ввода (только для desktop)
//     useEffect(() => {
//         if (isMobile) return;
//
//         const wheelEvents: number[] = [];
//         const wheelTimestamps: number[] = [];
//         let detectionTimeout: NodeJS.Timeout;
//
//         const detectInputDevice = (e: WheelEvent) => {
//             const currentTime = Date.now();
//             const timeDiff = currentTime - trackpadDebugInfo.lastEventTime;
//
//             setTrackpadDebugInfo(prev => {
//                 const newEventCount = prev.eventCount + 1;
//                 const frequency = timeDiff > 0 ? 1000 / timeDiff : 0;
//
//                 return {
//                     ...prev,
//                     deltaY: e.deltaY,
//                     deltaX: e.deltaX,
//                     deltaZ: e.deltaZ,
//                     deltaMode: e.deltaMode,
//                     eventCount: newEventCount,
//                     lastEventTime: currentTime,
//                     frequency: frequency
//                 };
//             });
//
//             wheelEvents.push(Math.abs(e.deltaY));
//             wheelTimestamps.push(currentTime);
//             if (wheelEvents.length > 10) {
//                 wheelEvents.shift();
//                 wheelTimestamps.shift();
//             }
//
//             clearTimeout(detectionTimeout);
//
//             const delayValue = delaySettings.detectionDelay.enabled ?
//                 delaySettings.detectionDelay.value : 0;
//
//             detectionTimeout = setTimeout(() => {
//                 if (wheelEvents.length >= 5) {
//                     const avgDelta = wheelEvents.reduce((a, b) => a + b, 0) / wheelEvents.length;
//                     const maxDelta = Math.max(...wheelEvents);
//                     const minDelta = Math.min(...wheelEvents);
//                     const deltaVariance = maxDelta - minDelta;
//
//                     const intervals = [];
//                     for (let i = 1; i < wheelTimestamps.length; i++) {
//                         intervals.push(wheelTimestamps[i] - wheelTimestamps[i - 1]);
//                     }
//                     const avgInterval = intervals.length > 0 ?
//                         intervals.reduce((a, b) => a + b, 0) / intervals.length : 0;
//
//                     setTrackpadDebugInfo(prev => ({
//                         ...prev,
//                         avgDelta,
//                         maxDelta,
//                         minDelta,
//                         deltaVariance
//                     }));
//
//                     const isWindows = navigator.platform.toLowerCase().includes('win') ||
//                         navigator.userAgent.toLowerCase().includes('windows');
//                     const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
//                         navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
//
//                     let isLikelyTrackpad = false;
//                     let isLikelyMouse = false;
//
//                     if (isMac) {
//                         isLikelyTrackpad =
//                             avgDelta < 50 &&
//                             deltaVariance < 30 &&
//                             e.deltaMode === 0 &&
//                             avgInterval < 50;
//
//                         isLikelyMouse =
//                             avgDelta > 80 ||
//                             deltaVariance > 50 ||
//                             e.deltaMode !== 0 ||
//                             avgInterval > 100;
//                     } else if (isWindows) {
//                         isLikelyTrackpad =
//                             (avgDelta < 120 && deltaVariance < 100 && avgInterval < 30) ||
//                             (avgDelta < 30 && e.deltaMode === 0);
//
//                         isLikelyMouse =
//                             (avgDelta >= 120 && (deltaVariance > 100 || avgInterval > 50)) ||
//                             (e.deltaMode === 1) ||
//                             (avgDelta === 120 && deltaVariance === 0);
//                     } else {
//                         isLikelyTrackpad =
//                             avgDelta < 80 &&
//                             deltaVariance < 60 &&
//                             e.deltaMode === 0;
//
//                         isLikelyMouse =
//                             avgDelta > 100 ||
//                             deltaVariance > 80 ||
//                             e.deltaMode !== 0;
//                     }
//
//                     if (isLikelyTrackpad) {
//                         setIsTrackpad(true);
//                     } else if (isLikelyMouse) {
//                         setIsTrackpad(false);
//                     }
//                 }
//             }, delayValue);
//         };
//
//         const isWindows = navigator.platform.toLowerCase().includes('win') ||
//             navigator.userAgent.toLowerCase().includes('windows');
//         const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
//             navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
//
//         if (isMac) {
//             setIsTrackpad(true);
//         } else if (isWindows) {
//             setIsTrackpad(false);
//         }
//
//         window.addEventListener('wheel', detectInputDevice, {passive: true});
//
//         return () => {
//             window.removeEventListener('wheel', detectInputDevice);
//             clearTimeout(detectionTimeout);
//         };
//     }, [delaySettings.detectionDelay, isMobile]);
//
//     useEffect(() => {
//         const hideScrollPaths = [
//             '/pricing',
//         ];
//
//         const shouldHideScrollbar = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));
//
//         if (window.screen.width > 768 && !isMobile) {
//             document.body.style.overflow = shouldHideScrollbar ? 'hidden' : '';
//             setShowScrollbar(!shouldHideScrollbar);
//         } else {
//             document.body.style.overflow = '';
//             setShowScrollbar(false);
//         }
//
//         const routeDelay = delaySettings.routeChangeDelay.enabled ?
//             delaySettings.routeChangeDelay.value : 0;
//
//         const timeout1 = setTimeout(() => window.dispatchEvent(new Event('scroll')), routeDelay);
//         const timeout2 = setTimeout(() => window.dispatchEvent(new Event('scroll')), routeDelay * 6);
//
//         return () => {
//             clearTimeout(timeout1);
//             clearTimeout(timeout2);
//             if (!isMobile) {
//                 document.body.style.overflow = '';
//             }
//         };
//     }, [pathname, delaySettings.routeChangeDelay, isMobile]);
//
//     const handleMouseMove = React.useCallback((e: MouseEvent) => {
//         if (!isDragging) return;
//
//         e.preventDefault();
//
//         const deltaY = e.clientY - dragStartY;
//         const scrollHeight = document.documentElement.scrollHeight;
//         const clientHeight = window.innerHeight;
//         const maxScroll = scrollHeight - clientHeight;
//
//         const scrollRatio = deltaY / clientHeight;
//         const newScrollTop = dragStartScrollTop + (scrollRatio * scrollHeight);
//
//         const clampedScrollTop = Math.max(0, Math.min(newScrollTop, maxScroll));
//
//         window.scrollTo(0, clampedScrollTop);
//     }, [isDragging, dragStartY, dragStartScrollTop]);
//
//     const handleMouseUp = React.useCallback(() => {
//         if (!isDragging) return;
//
//         setIsDragging(false);
//
//         document.body.style.cursor = '';
//         document.body.style.userSelect = '';
//     }, [isDragging]);
//
//     useEffect(() => {
//         if (isDragging) {
//             document.addEventListener('mousemove', handleMouseMove);
//             document.addEventListener('mouseup', handleMouseUp);
//
//             return () => {
//                 document.removeEventListener('mousemove', handleMouseMove);
//                 document.removeEventListener('mouseup', handleMouseUp);
//             };
//         }
//     }, [isDragging, handleMouseMove, handleMouseUp]);
//
//     useEffect(() => {
//         if (isMobile) return;
//
//         if (!scrollbarRef.current) return;
//
//         let currentScroll = window.scrollY;
//         let targetScroll = currentScroll;
//         let isScrolling = false;
//         let lastUpdateTime = 0;
//         let rafId: number | null = null;
//
//         const initScroll = () => {
//             currentScroll = window.scrollY;
//             targetScroll = currentScroll;
//         };
//
//         const handleWheel = (e: WheelEvent) => {
//             if (isDragging) return;
//
//             if ((e.target as HTMLElement).closest('textarea, .allow-native-scroll')) return;
//
//             e.preventDefault();
//             e.stopPropagation();
//             e.stopImmediatePropagation();
//
//             const settings = isTrackpad ? trackpadSettings : mouseSettings;
//             const scrollStep = Math.sign(e.deltaY) * Math.max(Math.abs(e.deltaY), settings.minScrollStep);
//             targetScroll += scrollStep;
//
//             const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//             targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
//
//             if (!isScrolling) {
//                 isScrolling = true;
//                 const animate = () => {
//                     const now = performance.now();
//                     const timeDelta = now - lastUpdateTime;
//                     lastUpdateTime = now;
//
//                     const diff = targetScroll - currentScroll;
//                     const absDiff = Math.abs(diff);
//
//                     if (absDiff < settings.scrollStopThreshold) {
//                         currentScroll = targetScroll;
//                         const finalPosition = Math.round(currentScroll * 100) / 100;
//
//                         window.scrollTo(0, finalPosition);
//
//                         requestAnimationFrame(() => {
//                             window.scrollTo(0, finalPosition);
//                         });
//
//                         isScrolling = false;
//                         rafId = null;
//                         return;
//                     }
//
//                     const timeMultiplier = Math.min(timeDelta / 16.67, 2);
//                     const adjustedEase = settings.scrollEaseFactor * timeMultiplier;
//
//                     currentScroll += diff * Math.min(adjustedEase, 0.5);
//                     const smoothPosition = Math.round(currentScroll * 100) / 100;
//
//                     window.scrollTo(0, smoothPosition);
//
//                     if (delaySettings.scrollAnimationDelay.enabled) {
//                         setTimeout(() => {
//                             rafId = requestAnimationFrame(animate);
//                         }, delaySettings.scrollAnimationDelay.value);
//                     } else {
//                         rafId = requestAnimationFrame(animate);
//                     }
//                 };
//
//                 lastUpdateTime = performance.now();
//                 if (delaySettings.scrollAnimationDelay.enabled) {
//                     setTimeout(() => {
//                         rafId = requestAnimationFrame(animate);
//                     }, delaySettings.scrollAnimationDelay.value);
//                 } else {
//                     rafId = requestAnimationFrame(animate);
//                 }
//             }
//         };
//
//         const handleScroll = () => {
//             if (!isScrolling && !isDragging) {
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
//                         const settings = isTrackpad ? trackpadSettings : mouseSettings;
//
//                         if (!isScrolling) {
//                             isScrolling = true;
//                             const animate = () => {
//                                 const diff = targetScroll - currentScroll;
//                                 if (Math.abs(diff) < settings.scrollStopThreshold) {
//                                     currentScroll = targetScroll;
//                                     window.scrollTo(0, Math.round(currentScroll * 100) / 100);
//                                     isScrolling = false;
//                                     return;
//                                 }
//
//                                 currentScroll += diff * settings.scrollEaseFactor;
//                                 window.scrollTo(0, Math.round(currentScroll * 100) / 100);
//
//                                 if (delaySettings.scrollAnimationDelay.enabled) {
//                                     setTimeout(() => requestAnimationFrame(animate), delaySettings.scrollAnimationDelay.value);
//                                 } else {
//                                     requestAnimationFrame(animate);
//                                 }
//                             };
//
//                             if (delaySettings.scrollAnimationDelay.enabled) {
//                                 setTimeout(() => requestAnimationFrame(animate), delaySettings.scrollAnimationDelay.value);
//                             } else {
//                                 requestAnimationFrame(animate);
//                             }
//                         }
//                     }
//                 }
//             }
//         };
//
//         const scrollHandler = () => {
//             handleScroll();
//             if (delaySettings.scrollAnimationDelay.enabled) {
//                 setTimeout(() => requestAnimationFrame(updateScrollbar), delaySettings.scrollAnimationDelay.value);
//             } else {
//                 requestAnimationFrame(updateScrollbar);
//             }
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
//         const handleResize = () => {
//             const resizeDelay = delaySettings.resizeDelay.enabled ?
//                 delaySettings.resizeDelay.value : 0;
//
//             if (resizeDelay > 0) {
//                 setTimeout(updateScrollbar, resizeDelay);
//             } else {
//                 updateScrollbar();
//             }
//         };
//
//         initScroll();
//         updateScrollbar();
//
//         window.addEventListener('wheel', handleWheel, {passive: false});
//         window.addEventListener('scroll', scrollHandler, {passive: true});
//         document.addEventListener('click', handleAnchorClick);
//         window.addEventListener('resize', handleResize);
//
//         return () => {
//             window.removeEventListener('wheel', handleWheel);
//             window.removeEventListener('scroll', scrollHandler);
//             document.removeEventListener('click', handleAnchorClick);
//             window.removeEventListener('resize', handleResize);
//
//             if (rafId) {
//                 cancelAnimationFrame(rafId);
//             }
//         };
//     }, [isTrackpad, trackpadSettings, mouseSettings, pathname, getScrollOffset, delaySettings, isMobile, isDragging]);
//
//     useEffect(() => {
//         window.scrollTo(0, 0);
//         document.documentElement.scrollTop = 0;
//         document.body.scrollTop = 0;
//
//         const routeDelay = delaySettings.routeChangeDelay.enabled ?
//             delaySettings.routeChangeDelay.value : 0;
//
//         setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, routeDelay);
//     }, [pathname, delaySettings.routeChangeDelay]);
//
//     const updateDelaySetting = (key: keyof DelaySettings, property: 'enabled' | 'value', value: boolean | number) => {
//         setDelaySettings(prev => ({
//             ...prev,
//             [key]: {
//                 ...prev[key],
//                 [property]: value
//             }
//         }));
//     };
//
//     return (
//         <>
//             {children}
//             {showScrollbar && !isMobile && (
//                 <div
//                     ref={customScrollbarRef}
//                     className={`scrollbar md:block hidden`}
//                 />
//             )}
//
//             <div className="fixed top-[90%] right-4 z-[10000000000]  gap-2">
//                 {!isOpen ? (
//                     <button
//                         onClick={() => setIsOpen(true)}
//                         className="bg-blue-600 text-white px-2 py-1 rounded-lg text-sm cursor-pointer shadow hover:bg-blue-700 transition"
//                     >
//                         Open
//                     </button>
//                 ) : (
//                     <button
//                         onClick={() => setIsOpen(false)}
//                         className="bg-red-600 text-white px-2 py-1 rounded-lg text-sm cursor-pointer shadow hover:bg-red-700 transition"
//                     >
//                         Close
//                     </button>
//                 )}
//             </div>
//
//             {isOpen && (
//                 <div
//                     className="absolute
//                      top-[70px] right-4 backdrop-blur-2xl border
//                     border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4
//                     z-[9999999999] w-96 overflow-y-auto allow-native-scroll">
//
//                     {/* REFRESH RATE INFO */}
//                     <div className="mb-6 p-3 bg-green-900/20 rounded-lg border border-green-600/30">
//                         <h4 className="text-sm font-bold mb-2 text-green-300">Частота обновления экрана</h4>
//                         <div className="grid grid-cols-2 gap-2 text-xs">
//                             <div>Частота: <span className="font-mono text-green-400">
//                                 {isDetectingRefreshRate ? 'Определяется...' : `${refreshRate}Hz`}
//                             </span></div>
//                             <div>Авто-фактор: <span className="font-mono text-green-400">
//                                 {getAutoSmoothFactor(refreshRate).toFixed(2)}
//                             </span></div>
//                         </div>
//
//                         <div className="mt-2 text-xs text-green-200">
//                             <div className="text-green-400 mt-1">
//                                 Текущий режим: {
//                                 refreshRate <= 129 ? '≤129Hz (0.25)' :
//                                     refreshRate <= 199 ? '130–199Hz (0.20)' :
//                                         '≥200Hz (0.10)'
//                             }
//                             </div>
//                         </div>
//                     </div>
//
//                     <h3 className="text-lg font-semibold ">
//                         Настройки прокрутки ({isTrackpad ? 'Тачпад' : 'Мышка'})
//                     </h3>
//
//                     {/* ===== TRACKPAD DEBUG INFO ===== */}
//                     <div className="mb-6 p-3  bg-gray-800 rounded-lg">
//                         <h4 className="text-sm font-bold mb-2 ">Отладка трекпада</h4>
//
//                         <div className="mb-2 p-2 bg-blue-900/20 rounded text-xs">
//                             <strong>ОС:</strong> {
//                             navigator.platform.toLowerCase().includes('win') || navigator.userAgent.toLowerCase().includes('windows') ? 'Windows' :
//                                 navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? 'macOS' : 'Other'
//                         } | <strong>Платформа:</strong> {navigator.platform}
//                         </div>
//
//                         <div className="grid grid-cols-2 gap-2 text-xs">
//                             <div>deltaY: <span
//                                 className="font-mono">{trackpadDebugInfo.deltaY.toFixed(1)}</span></div>
//                             <div>deltaX: <span
//                                 className="font-mono">{trackpadDebugInfo.deltaX.toFixed(1)}</span></div>
//                             <div>deltaMode: <span className="font-mono">{trackpadDebugInfo.deltaMode}</span>
//                             </div>
//                             <div>Частота: <span
//                                 className="font-mono">{trackpadDebugInfo.frequency.toFixed(1)}Hz</span>
//                             </div>
//                             <div>Среднее Δ: <span
//                                 className="font-mono">{trackpadDebugInfo.avgDelta.toFixed(1)}</span>
//                             </div>
//                             <div>Вариация: <span
//                                 className="font-mono">{trackpadDebugInfo.deltaVariance.toFixed(1)}</span>
//                             </div>
//                             <div>Событий: <span className="font-mono">{trackpadDebugInfo.eventCount}</span>
//                             </div>
//                             <div>Мин/Макс: <span
//                                 className="font-mono">{trackpadDebugInfo.minDelta.toFixed(1)}/{trackpadDebugInfo.maxDelta.toFixed(1)}</span>
//                             </div>
//                         </div>
//
//                         <div className="mt-2 p-2 bg-yellow-900/20 rounded text-xs">
//                             <div className="flex justify-between">
//                                 <span>Детекция:</span>
//                                 <span
//                                     className={`font-bold ${isTrackpad ? 'text-green-600' : 'text-blue-600'}`}>
//                                 {isTrackpad ? 'Тачпад' : 'Мышь'}
//                             </span>
//                             </div>
//                             {navigator.platform.toLowerCase().includes('win') && (
//                                 <div className="text-xs text-gray-400 mt-1">
//                                     Windows критерии: avgΔ{trackpadDebugInfo.avgDelta < 120 ? '<120✓' : '≥120✗'},
//                                     var{trackpadDebugInfo.deltaVariance < 100 ? '<100✓' : '≥100✗'},
//                                     freq{trackpadDebugInfo.frequency > 33 ? '>33Hz✓' : '≤33Hz✗'}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//
//                     {/* ===== DELAY SETTINGS ===== */}
//                     <div className="mb-6">
//                         <h4 className="text-sm font-bold mb-3 border-b border-gray-600 pb-1">Управление
//                             задержками</h4>
//
//                         {Object.entries(delaySettings).map(([key, setting]) => {
//                             const labels = {
//                                 detectionDelay: 'Детекция устройства',
//                                 scrollAnimationDelay: 'Анимация скролла',
//                                 routeChangeDelay: 'Смена маршрута',
//                                 resizeDelay: 'Изменение размера'
//                             };
//
//                             return (
//                                 <div key={key} className="mb-3 p-2 bg-gray-700 rounded">
//                                     <div className="flex items-center justify-between mb-2">
//                                         <label className="text-xs font-medium">
//                                             {labels[key as keyof typeof labels]}
//                                         </label>
//                                         <label className="flex items-center">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={setting.enabled}
//                                                 onChange={(e) => updateDelaySetting(key as keyof DelaySettings, 'enabled', e.target.checked)}
//                                                 className="mr-1"
//                                             />
//                                             <span className="text-xs">Включено</span>
//                                         </label>
//                                     </div>
//
//                                     <div className="flex items-center gap-2">
//                                         <button
//                                             className="px-2 py-1 bg-gray-600 rounded text-xs"
//                                             disabled={!setting.enabled}
//                                             onClick={() => updateDelaySetting(key as keyof DelaySettings, 'value', Math.max(0, setting.value - (key === 'scrollAnimationDelay' ? 1 : 10)))}
//                                         >
//                                             –
//                                         </button>
//                                         <input
//                                             type="range"
//                                             min="0"
//                                             max={key === 'scrollAnimationDelay' ? '60' : '500'}
//                                             step={key === 'scrollAnimationDelay' ? '1' : '10'}
//                                             value={setting.value}
//                                             disabled={!setting.enabled}
//                                             onChange={(e) => updateDelaySetting(key as keyof DelaySettings, 'value', parseInt(e.target.value))}
//                                             className="flex-1"
//                                         />
//                                         <button
//                                             className="px-2 py-1  bg-gray-600 rounded text-xs"
//                                             disabled={!setting.enabled}
//                                             onClick={() => updateDelaySetting(key as keyof DelaySettings, 'value', Math.min(key === 'scrollAnimationDelay' ? 60 : 500, setting.value + (key === 'scrollAnimationDelay' ? 1 : 10)))}
//                                         >
//                                             +
//                                         </button>
//                                         <span className="text-xs font-mono w-12 text-right">
//                                         {setting.value}{key === 'scrollAnimationDelay' ? 'f' : 'ms'}
//                                     </span>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//
//                     {/* ===== MOUSE SETTINGS ===== */}
//                     <div className="mb-6">
//                         <h4 className="text-sm border-b font-bold mb-2 text-gray-300">
//                             Настройки для мышки</h4>
//
//                         <label className="block text-xs mb-1">Порог остановки: {mouseSettings.scrollStopThreshold.toFixed(2)}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 className="px-2 py-1 dark:bg-[#333333] rounded"
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
//                             плавности: {mouseSettings.scrollEaseFactor.toFixed(2)} (Авто: {getAutoSmoothFactor(refreshRate).toFixed(2)})</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 min="0"
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
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                         <label className="block text-xs mb-1">Минимальный
//                             шаг: {mouseSettings.minScrollStep}px</label>
//                         <div className="flex items-center gap-2 mb-6">
//                             <button
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                     {/* ===== TRACKPAD SETTINGS ===== */}
//                     <div>
//                         <h4 className="text-sm border-b font-bold mb-2 text-gray-300">Настройки для
//                             тачпада</h4>
//
//                         <label className="block text-xs mb-1">Порог
//                             остановки: {trackpadSettings.scrollStopThreshold.toFixed(2)}</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                             плавности: {trackpadSettings.scrollEaseFactor.toFixed(2)} (Авто: {getAutoSmoothFactor(refreshRate).toFixed(2)})</label>
//                         <div className="flex items-center gap-2 mb-2">
//                             <button
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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
//                                 className="px-2 py-1  dark:bg-[#333333] rounded"
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

// 'use client';
// import React, {useEffect, useRef, useState} from "react";
// import {usePathname} from "next/navigation";
// import {useCustomScroll} from "@/components/hooks/useCustomScroll";
//
// interface SmoothScrollProps {
//     children: React.ReactNode;
// }
//
// interface TrackpadDebugInfo {
//     deltaY: number;
//     deltaX: number;
//     deltaZ: number;
//     deltaMode: number;
//     avgDelta: number;
//     maxDelta: number;
//     minDelta: number;
//     deltaVariance: number;
//     eventCount: number;
//     lastEventTime: number;
//     frequency: number;
// }
//
// interface DelaySettings {
//     detectionDelay: {
//         enabled: boolean;
//         value: number;
//     };
//     scrollAnimationDelay: {
//         enabled: boolean;
//         value: number;
//     };
//     routeChangeDelay: {
//         enabled: boolean;
//         value: number;
//     };
//     resizeDelay: {
//         enabled: boolean;
//         value: number;
//     };
// }
//
// interface DeviceSettings {
//     scrollStopThreshold: number;
//     scrollEaseFactor: number;
//     minScrollStep: number;
// }
//
// interface OSSettings {
//     mouse: DeviceSettings;
//     trackpad: DeviceSettings;
// }
//
// type OS = 'macOS' | 'Windows' | 'Other';
//
// export default function SmoothScroll({children}: SmoothScrollProps) {
//     const scrollbarRef = useRef<HTMLDivElement>(null);
//     const pathname = usePathname();
//     const [showScrollbar, setShowScrollbar] = useState(true);
//     const [isOpen, setIsOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);
//
//     // Состояния для drag-to-scroll
//     const [isDragging, setIsDragging] = useState(false);
//     const [dragStartY, setDragStartY] = useState(0);
//     const [dragStartScrollTop, setDragStartScrollTop] = useState(0);
//
//     const [isTrackpad, setIsTrackpad] = useState(false);
//     const [currentOS, setCurrentOS] = useState<OS>('Other');
//     const [trackpadDebugInfo, setTrackpadDebugInfo] = useState<TrackpadDebugInfo>({
//         deltaY: 0,
//         deltaX: 0,
//         deltaZ: 0,
//         deltaMode: 0,
//         avgDelta: 0,
//         maxDelta: 0,
//         minDelta: 0,
//         deltaVariance: 0,
//         eventCount: 0,
//         lastEventTime: 0,
//         frequency: 0
//     });
//
//     // Добавляем состояния для определения герцовки
//     const [refreshRate, setRefreshRate] = useState<number>(60);
//     const [isDetectingRefreshRate, setIsDetectingRefreshRate] = useState(true);
//
//     // Настройки для разных ОС
//     const [macOSSettings, setMacOSSettings] = useState<OSSettings>({
//         mouse: {
//             scrollStopThreshold: 0.0,
//             scrollEaseFactor: 0.10,
//             minScrollStep: 1
//         },
//         trackpad: {
//             scrollStopThreshold: 0.0,
//             scrollEaseFactor: 0.20,
//             minScrollStep: 1
//         }
//     });
//
//     const [windowsSettings, setWindowsSettings] = useState<OSSettings>({
//         mouse: {
//             scrollStopThreshold: 0.0,
//             scrollEaseFactor: 0.08,
//             minScrollStep: 2
//         },
//         trackpad: {
//             scrollStopThreshold: 0.0,
//             scrollEaseFactor: 0.25,
//             minScrollStep: 1
//         }
//     });
//
//     const [delaySettings, setDelaySettings] = useState<DelaySettings>({
//         detectionDelay: {
//             enabled: true,
//             value: 40
//         },
//         scrollAnimationDelay: {
//             enabled: true,
//             value: 1
//         },
//         routeChangeDelay: {
//             enabled: true,
//             value: 40
//         },
//         resizeDelay: {
//             enabled: true,
//             value: 40
//         }
//     });
//
//     // Функция для получения текущих настроек
//     const getCurrentSettings = (): DeviceSettings => {
//         const osSettings = currentOS === 'macOS' ? macOSSettings : windowsSettings;
//         return isTrackpad ? osSettings.trackpad : osSettings.mouse;
//     };
//
//     // Функция для определения фактора плавности по герцовке
//     const getAutoSmoothFactor = (rate: number): number => {
//         if (rate <= 129) return 0.20;
//         if (rate <= 199) return 0.15;
//         return 0.05;
//     };
//
//     // Определение ОС
//     useEffect(() => {
//         const detectOS = (): OS => {
//             const platform = navigator.platform.toLowerCase();
//             const userAgent = navigator.userAgent.toLowerCase();
//
//             if (platform.includes('win') || userAgent.includes('windows')) {
//                 return 'Windows';
//             } else if (platform.includes('mac') || userAgent.includes('mac')) {
//                 return 'macOS';
//             }
//             return 'Other';
//         };
//
//         const detectedOS = detectOS();
//         setCurrentOS(detectedOS);
//
//         // Устанавливаем значения по умолчанию для тачпада на macOS
//         if (detectedOS === 'macOS') {
//             setIsTrackpad(true);
//         } else if (detectedOS === 'Windows') {
//             setIsTrackpad(false);
//         }
//     }, []);
//
//     // Определение герцовки экрана
//     useEffect(() => {
//         let frameCount = 0;
//         let startTime = 0;
//         let animationId: number;
//         const framesToMeasure = 60;
//
//         const measureFrameRate = (timestamp: number) => {
//             if (startTime === 0) {
//                 startTime = timestamp;
//             }
//
//             frameCount++;
//
//             if (frameCount < framesToMeasure) {
//                 animationId = requestAnimationFrame(measureFrameRate);
//             } else {
//                 const elapsed = timestamp - startTime;
//                 const calculatedFPS = Math.round((frameCount * 1000) / elapsed);
//
//                 // Округляем до стандартных значений refresh rate
//                 let detectedRate = calculatedFPS;
//                 if (calculatedFPS >= 58 && calculatedFPS <= 62) detectedRate = 60;
//                 else if (calculatedFPS >= 70 && calculatedFPS <= 76) detectedRate = 75;
//                 else if (calculatedFPS >= 88 && calculatedFPS <= 92) detectedRate = 90;
//                 else if (calculatedFPS >= 118 && calculatedFPS <= 122) detectedRate = 120;
//                 else if (calculatedFPS >= 143 && calculatedFPS <= 147) detectedRate = 144;
//                 else if (calculatedFPS >= 163 && calculatedFPS <= 167) detectedRate = 165;
//                 else if (calculatedFPS >= 238 && calculatedFPS <= 242) detectedRate = 240;
//                 else if (calculatedFPS >= 358 && calculatedFPS <= 362) detectedRate = 360;
//
//                 setRefreshRate(detectedRate);
//                 setIsDetectingRefreshRate(false);
//
//                 // Обновляем настройки с автоматическими значениями
//                 const autoFactor = getAutoSmoothFactor(detectedRate);
//
//                 // Обновляем для обеих ОС
//                 setMacOSSettings(prev => ({
//                     ...prev,
//                     mouse: { ...prev.mouse, scrollEaseFactor: autoFactor },
//                     trackpad: { ...prev.trackpad, scrollEaseFactor: autoFactor }
//                 }));
//
//                 setWindowsSettings(prev => ({
//                     ...prev,
//                     mouse: { ...prev.mouse, scrollEaseFactor: autoFactor },
//                     trackpad: { ...prev.trackpad, scrollEaseFactor: autoFactor }
//                 }));
//
//                 console.log(`Detected refresh rate: ${detectedRate}Hz (measured: ${calculatedFPS}fps), auto factor: ${autoFactor}`);
//             }
//         };
//
//         const timeout = setTimeout(() => {
//             animationId = requestAnimationFrame(measureFrameRate);
//         }, 100);
//
//         return () => {
//             clearTimeout(timeout);
//             if (animationId) {
//                 cancelAnimationFrame(animationId);
//             }
//         };
//     }, []);
//
//     const getScrollOffset = React.useCallback(() => {
//         if (pathname.includes('/policy') || pathname.includes('/organizations')) return -115;
//         if (pathname.includes('/blogPage')) return -174;
//         if (pathname.includes('/organizations/where-do-you-lose')) return -110;
//         if (pathname.includes('/editors')) return 90;
//         return 120;
//     }, [pathname]);
//
//     const currentSettings = getCurrentSettings();
//     const { scrollbarRef: customScrollbarRef } = useCustomScroll({
//         smoothScrollFactor: currentSettings.scrollEaseFactor,
//         scrollPadding: 2,
//         enabled: showScrollbar && !isMobile,
//         target: 'window',
//         getScrollOffset
//     });
//
//     // Определение мобильного устройства
//     useEffect(() => {
//         const checkMobile = () => {
//             const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
//                 window.innerWidth <= 768 ||
//                 ('ontouchstart' in window) ||
//                 (navigator.maxTouchPoints > 0);
//
//             setIsMobile(isMobileDevice);
//             return isMobileDevice;
//         };
//
//         checkMobile();
//         window.addEventListener('resize', checkMobile);
//
//         return () => {
//             window.removeEventListener('resize', checkMobile);
//         };
//     }, []);
//
//     // Определение типа устройства ввода (только для desktop)
//     useEffect(() => {
//         if (isMobile) return;
//
//         const wheelEvents: number[] = [];
//         const wheelTimestamps: number[] = [];
//         let detectionTimeout: NodeJS.Timeout;
//
//         const detectInputDevice = (e: WheelEvent) => {
//             const currentTime = Date.now();
//             const timeDiff = currentTime - trackpadDebugInfo.lastEventTime;
//
//             setTrackpadDebugInfo(prev => {
//                 const newEventCount = prev.eventCount + 1;
//                 const frequency = timeDiff > 0 ? 1000 / timeDiff : 0;
//
//                 return {
//                     ...prev,
//                     deltaY: e.deltaY,
//                     deltaX: e.deltaX,
//                     deltaZ: e.deltaZ,
//                     deltaMode: e.deltaMode,
//                     eventCount: newEventCount,
//                     lastEventTime: currentTime,
//                     frequency: frequency
//                 };
//             });
//
//             wheelEvents.push(Math.abs(e.deltaY));
//             wheelTimestamps.push(currentTime);
//             if (wheelEvents.length > 10) {
//                 wheelEvents.shift();
//                 wheelTimestamps.shift();
//             }
//
//             clearTimeout(detectionTimeout);
//
//             const delayValue = delaySettings.detectionDelay.enabled ?
//                 delaySettings.detectionDelay.value : 0;
//
//             detectionTimeout = setTimeout(() => {
//                 if (wheelEvents.length >= 5) {
//                     const avgDelta = wheelEvents.reduce((a, b) => a + b, 0) / wheelEvents.length;
//                     const maxDelta = Math.max(...wheelEvents);
//                     const minDelta = Math.min(...wheelEvents);
//                     const deltaVariance = maxDelta - minDelta;
//
//                     const intervals = [];
//                     for (let i = 1; i < wheelTimestamps.length; i++) {
//                         intervals.push(wheelTimestamps[i] - wheelTimestamps[i - 1]);
//                     }
//                     const avgInterval = intervals.length > 0 ?
//                         intervals.reduce((a, b) => a + b, 0) / intervals.length : 0;
//
//                     setTrackpadDebugInfo(prev => ({
//                         ...prev,
//                         avgDelta,
//                         maxDelta,
//                         minDelta,
//                         deltaVariance
//                     }));
//
//                     let isLikelyTrackpad = false;
//                     let isLikelyMouse = false;
//
//                     if (currentOS === 'macOS') {
//                         isLikelyTrackpad =
//                             avgDelta < 50 &&
//                             deltaVariance < 30 &&
//                             e.deltaMode === 0 &&
//                             avgInterval < 50;
//
//                         isLikelyMouse =
//                             avgDelta > 80 ||
//                             deltaVariance > 50 ||
//                             e.deltaMode !== 0 ||
//                             avgInterval > 100;
//                     } else if (currentOS === 'Windows') {
//                         isLikelyTrackpad =
//                             (avgDelta < 120 && deltaVariance < 100 && avgInterval < 30) ||
//                             (avgDelta < 30 && e.deltaMode === 0);
//
//                         isLikelyMouse =
//                             (avgDelta >= 120 && (deltaVariance > 100 || avgInterval > 50)) ||
//                             (e.deltaMode === 1) ||
//                             (avgDelta === 120 && deltaVariance === 0);
//                     } else {
//                         isLikelyTrackpad =
//                             avgDelta < 80 &&
//                             deltaVariance < 60 &&
//                             e.deltaMode === 0;
//
//                         isLikelyMouse =
//                             avgDelta > 100 ||
//                             deltaVariance > 80 ||
//                             e.deltaMode !== 0;
//                     }
//
//                     if (isLikelyTrackpad) {
//                         setIsTrackpad(true);
//                     } else if (isLikelyMouse) {
//                         setIsTrackpad(false);
//                     }
//                 }
//             }, delayValue);
//         };
//
//         window.addEventListener('wheel', detectInputDevice, {passive: true});
//
//         return () => {
//             window.removeEventListener('wheel', detectInputDevice);
//             clearTimeout(detectionTimeout);
//         };
//     }, [delaySettings.detectionDelay, isMobile, currentOS]);
//
//     useEffect(() => {
//         const hideScrollPaths = [
//             '/pricing',
//         ];
//
//         const shouldHideScrollbar = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));
//
//         if (window.screen.width > 768 && !isMobile) {
//             document.body.style.overflow = shouldHideScrollbar ? 'hidden' : '';
//             setShowScrollbar(!shouldHideScrollbar);
//         } else {
//             document.body.style.overflow = '';
//             setShowScrollbar(false);
//         }
//
//         const routeDelay = delaySettings.routeChangeDelay.enabled ?
//             delaySettings.routeChangeDelay.value : 0;
//
//         const timeout1 = setTimeout(() => window.dispatchEvent(new Event('scroll')), routeDelay);
//         const timeout2 = setTimeout(() => window.dispatchEvent(new Event('scroll')), routeDelay * 6);
//
//         return () => {
//             clearTimeout(timeout1);
//             clearTimeout(timeout2);
//             if (!isMobile) {
//                 document.body.style.overflow = '';
//             }
//         };
//     }, [pathname, delaySettings.routeChangeDelay, isMobile]);
//
//     const handleMouseMove = React.useCallback((e: MouseEvent) => {
//         if (!isDragging) return;
//
//         e.preventDefault();
//
//         const deltaY = e.clientY - dragStartY;
//         const scrollHeight = document.documentElement.scrollHeight;
//         const clientHeight = window.innerHeight;
//         const maxScroll = scrollHeight - clientHeight;
//
//         const scrollRatio = deltaY / clientHeight;
//         const newScrollTop = dragStartScrollTop + (scrollRatio * scrollHeight);
//
//         const clampedScrollTop = Math.max(0, Math.min(newScrollTop, maxScroll));
//
//         window.scrollTo(0, clampedScrollTop);
//     }, [isDragging, dragStartY, dragStartScrollTop]);
//
//     const handleMouseUp = React.useCallback(() => {
//         if (!isDragging) return;
//
//         setIsDragging(false);
//
//         document.body.style.cursor = '';
//         document.body.style.userSelect = '';
//     }, [isDragging]);
//
//     useEffect(() => {
//         if (isDragging) {
//             document.addEventListener('mousemove', handleMouseMove);
//             document.addEventListener('mouseup', handleMouseUp);
//
//             return () => {
//                 document.removeEventListener('mousemove', handleMouseMove);
//                 document.removeEventListener('mouseup', handleMouseUp);
//             };
//         }
//     }, [isDragging, handleMouseMove, handleMouseUp]);
//
//     useEffect(() => {
//         if (isMobile) return;
//
//         if (!scrollbarRef.current) return;
//
//         let currentScroll = window.scrollY;
//         let targetScroll = currentScroll;
//         let isScrolling = false;
//         let lastUpdateTime = 0;
//         let rafId: number | null = null;
//
//         const initScroll = () => {
//             currentScroll = window.scrollY;
//             targetScroll = currentScroll;
//         };
//
//         const handleWheel = (e: WheelEvent) => {
//             if (isDragging) return;
//
//             if ((e.target as HTMLElement).closest('textarea, .allow-native-scroll')) return;
//
//             e.preventDefault();
//             e.stopPropagation();
//             e.stopImmediatePropagation();
//
//             const settings = getCurrentSettings();
//             const scrollStep = Math.sign(e.deltaY) * Math.max(Math.abs(e.deltaY), settings.minScrollStep);
//             targetScroll += scrollStep;
//
//             const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//             targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
//
//             if (!isScrolling) {
//                 isScrolling = true;
//                 const animate = () => {
//                     const now = performance.now();
//                     const timeDelta = now - lastUpdateTime;
//                     lastUpdateTime = now;
//
//                     const diff = targetScroll - currentScroll;
//                     const absDiff = Math.abs(diff);
//
//                     if (absDiff < settings.scrollStopThreshold) {
//                         currentScroll = targetScroll;
//                         const finalPosition = Math.round(currentScroll * 100) / 100;
//
//                         window.scrollTo(0, finalPosition);
//
//                         requestAnimationFrame(() => {
//                             window.scrollTo(0, finalPosition);
//                         });
//
//                         isScrolling = false;
//                         rafId = null;
//                         return;
//                     }
//
//                     const timeMultiplier = Math.min(timeDelta / 16.67, 2);
//                     const adjustedEase = settings.scrollEaseFactor * timeMultiplier;
//
//                     currentScroll += diff * Math.min(adjustedEase, 0.5);
//                     const smoothPosition = Math.round(currentScroll * 100) / 100;
//
//                     window.scrollTo(0, smoothPosition);
//
//                     if (delaySettings.scrollAnimationDelay.enabled) {
//                         setTimeout(() => {
//                             rafId = requestAnimationFrame(animate);
//                         }, delaySettings.scrollAnimationDelay.value);
//                     } else {
//                         rafId = requestAnimationFrame(animate);
//                     }
//                 };
//
//                 lastUpdateTime = performance.now();
//                 if (delaySettings.scrollAnimationDelay.enabled) {
//                     setTimeout(() => {
//                         rafId = requestAnimationFrame(animate);
//                     }, delaySettings.scrollAnimationDelay.value);
//                 } else {
//                     rafId = requestAnimationFrame(animate);
//                 }
//             }
//         };
//
//         const handleScroll = () => {
//             if (!isScrolling && !isDragging) {
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
//                         const settings = getCurrentSettings();
//
//                         if (!isScrolling) {
//                             isScrolling = true;
//                             const animate = () => {
//                                 const diff = targetScroll - currentScroll;
//                                 if (Math.abs(diff) < settings.scrollStopThreshold) {
//                                     currentScroll = targetScroll;
//                                     window.scrollTo(0, Math.round(currentScroll * 100) / 100);
//                                     isScrolling = false;
//                                     return;
//                                 }
//
//                                 currentScroll += diff * settings.scrollEaseFactor;
//                                 window.scrollTo(0, Math.round(currentScroll * 100) / 100);
//
//                                 if (delaySettings.scrollAnimationDelay.enabled) {
//                                     setTimeout(() => requestAnimationFrame(animate), delaySettings.scrollAnimationDelay.value);
//                                 } else {
//                                     requestAnimationFrame(animate);
//                                 }
//                             };
//
//                             if (delaySettings.scrollAnimationDelay.enabled) {
//                                 setTimeout(() => requestAnimationFrame(animate), delaySettings.scrollAnimationDelay.value);
//                             } else {
//                                 requestAnimationFrame(animate);
//                             }
//                         }
//                     }
//                 }
//             }
//         };
//
//         const scrollHandler = () => {
//             handleScroll();
//             if (delaySettings.scrollAnimationDelay.enabled) {
//                 setTimeout(() => requestAnimationFrame(updateScrollbar), delaySettings.scrollAnimationDelay.value);
//             } else {
//                 requestAnimationFrame(updateScrollbar);
//             }
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
//         const handleResize = () => {
//             const resizeDelay = delaySettings.resizeDelay.enabled ?
//                 delaySettings.resizeDelay.value : 0;
//
//             if (resizeDelay > 0) {
//                 setTimeout(updateScrollbar, resizeDelay);
//             } else {
//                 updateScrollbar();
//             }
//         };
//
//         initScroll();
//         updateScrollbar();
//
//         window.addEventListener('wheel', handleWheel, {passive: false});
//         window.addEventListener('scroll', scrollHandler, {passive: true});
//         document.addEventListener('click', handleAnchorClick);
//         window.addEventListener('resize', handleResize);
//
//         return () => {
//             window.removeEventListener('wheel', handleWheel);
//             window.removeEventListener('scroll', scrollHandler);
//             document.removeEventListener('click', handleAnchorClick);
//             window.removeEventListener('resize', handleResize);
//
//             if (rafId) {
//                 cancelAnimationFrame(rafId);
//             }
//         };
//     }, [isTrackpad, macOSSettings, windowsSettings, currentOS, pathname, getScrollOffset, delaySettings, isMobile, isDragging]);
//
//     useEffect(() => {
//         window.scrollTo(0, 0);
//         document.documentElement.scrollTop = 0;
//         document.body.scrollTop = 0;
//
//         const routeDelay = delaySettings.routeChangeDelay.enabled ?
//             delaySettings.routeChangeDelay.value : 0;
//
//         setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, routeDelay);
//     }, [pathname, delaySettings.routeChangeDelay]);
//
//     const updateDelaySetting = (key: keyof DelaySettings, property: 'enabled' | 'value', value: boolean | number) => {
//         setDelaySettings(prev => ({
//             ...prev,
//             [key]: {
//                 ...prev[key],
//                 [property]: value
//             }
//         }));
//     };
//
//     // Функции для обновления настроек
//     const updateOSSettings = (os: 'macOS' | 'Windows', deviceType: 'mouse' | 'trackpad', property: keyof DeviceSettings, value: number) => {
//         if (os === 'macOS') {
//             setMacOSSettings(prev => ({
//                 ...prev,
//                 [deviceType]: {
//                     ...prev[deviceType],
//                     [property]: value
//                 }
//             }));
//         } else {
//             setWindowsSettings(prev => ({
//                 ...prev,
//                 [deviceType]: {
//                     ...prev[deviceType],
//                     [property]: value
//                 }
//             }));
//         }
//     };
//
//     return (
//         <>
//             {children}
//             {showScrollbar && !isMobile && (
//                 <div
//                     ref={customScrollbarRef}
//                     className={`scrollbar md:block hidden`}
//                 />
//             )}
//
//             <div className="fixed top-[90%] right-4 z-[10000000000] gap-2">
//                 {!isOpen ? (
//                     <button
//                         onClick={() => setIsOpen(true)}
//                         className="bg-blue-600 text-white px-2 py-1 rounded-lg text-sm cursor-pointer shadow hover:bg-blue-700 transition"
//                     >
//                         Open
//                     </button>
//                 ) : (
//                     <button
//                         onClick={() => setIsOpen(false)}
//                         className="bg-red-600 text-white px-2 py-1 rounded-lg text-sm cursor-pointer shadow hover:bg-red-700 transition"
//                     >
//                         Close
//                     </button>
//                 )}
//             </div>
//
//             {isOpen && (
//                 <div className="absolute top-[70px] right-4 backdrop-blur-2xl border border-gray-300
//                 dark:border-gray-600 rounded-lg shadow-lg p-4 z-[9999999999] w-96  overflow-y-auto allow-native-scroll">
//
//                     {/* OS INFO */}
//                     <div className="mb-6 p-3 bg-blue-900/20 rounded-lg border border-blue-600/30">
//                         <h4 className="text-sm font-bold mb-2 text-blue-300">Информация о системе</h4>
//                         <div className="grid grid-cols-2 gap-2 text-xs">
//                             <div>ОС: <span className="font-mono text-blue-400">{currentOS}</span></div>
//                             <div>Устройство: <span className="font-mono text-blue-400">{isTrackpad ? 'Тачпад' : 'Мышь'}</span></div>
//                         </div>
//                     </div>
//
//                     {/* REFRESH RATE INFO */}
//                     <div className="mb-6 p-3 bg-green-900/20 rounded-lg border border-green-600/30">
//                         <h4 className="text-sm font-bold mb-2 text-green-300">Частота обновления экрана</h4>
//                         <div className="grid grid-cols-2 gap-2 text-xs">
//                             <div>Частота: <span className="font-mono text-green-400">
//                                 {isDetectingRefreshRate ? 'Определяется...' : `${refreshRate}Hz`}
//                             </span></div>
//                             <div>Авто-фактор: <span className="font-mono text-green-400">
//                                 {getAutoSmoothFactor(refreshRate).toFixed(2)}
//                             </span></div>
//                         </div>
//                     </div>
//
//                     <h3 className="text-lg font-semibold">
//                         Настройки прокрутки
//                     </h3>
//
//                     {/* ===== TRACKPAD DEBUG INFO ===== */}
//                     <div className="mb-6 p-3 bg-gray-800 rounded-lg">
//                         <h4 className="text-sm font-bold mb-2">Отладка детекции</h4>
//
//                         <div className="grid grid-cols-2 gap-2 text-xs">
//                             <div>deltaY: <span className="font-mono">{trackpadDebugInfo.deltaY.toFixed(1)}</span></div>
//                             <div>deltaMode: <span className="font-mono">{trackpadDebugInfo.deltaMode}</span></div>
//                             <div>Частота: <span className="font-mono">{trackpadDebugInfo.frequency.toFixed(1)}Hz</span></div>
//                             <div>Среднее Δ: <span className="font-mono">{trackpadDebugInfo.avgDelta.toFixed(1)}</span></div>
//                             <div>Вариация: <span className="font-mono">{trackpadDebugInfo.deltaVariance.toFixed(1)}</span></div>
//                             <div>События: <span className="font-mono">{trackpadDebugInfo.eventCount}</span></div>
//                         </div>
//                     </div>
//
//                     {/* ===== DELAY SETTINGS ===== */}
//                     <div className="mb-6">
//                         <h4 className="text-sm font-bold mb-3 border-b border-gray-600 pb-1">Управление задержками</h4>
//
//                         {Object.entries(delaySettings).map(([key, setting]) => {
//                             const labels = {
//                                 detectionDelay: 'Детекция устройства',
//                                 scrollAnimationDelay: 'Анимация скролла',
//                                 routeChangeDelay: 'Смена маршрута',
//                                 resizeDelay: 'Изменение размера'
//                             };
//
//                             return (
//                                 <div key={key} className="mb-3 p-2 bg-gray-700 rounded">
//                                     <div className="flex items-center justify-between mb-2">
//                                         <label className="text-xs font-medium">
//                                             {labels[key as keyof typeof labels]}
//                                         </label>
//                                         <label className="flex items-center">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={setting.enabled}
//                                                 onChange={(e) => updateDelaySetting(key as keyof DelaySettings, 'enabled', e.target.checked)}
//                                                 className="mr-1"
//                                             />
//                                             <span className="text-xs">Включено</span>
//                                         </label>
//                                     </div>
//
//                                     <div className="flex items-center gap-2">
//                                         <button
//                                             className="px-2 py-1 bg-gray-600 rounded text-xs"
//                                             disabled={!setting.enabled}
//                                             onClick={() => updateDelaySetting(key as keyof DelaySettings, 'value', Math.max(0, setting.value - (key === 'scrollAnimationDelay' ? 1 : 10)))}
//                                         >
//                                             –
//                                         </button>
//                                         <input
//                                             type="range"
//                                             min="0"
//                                             max={key === 'scrollAnimationDelay' ? '60' : '500'}
//                                             step={key === 'scrollAnimationDelay' ? '1' : '10'}
//                                             value={setting.value}
//                                             disabled={!setting.enabled}
//                                             onChange={(e) => updateDelaySetting(key as keyof DelaySettings, 'value', parseInt(e.target.value))}
//                                             className="flex-1"
//                                         />
//                                         <button
//                                             className="px-2 py-1 bg-gray-600 rounded text-xs"
//                                             disabled={!setting.enabled}
//                                             onClick={() => updateDelaySetting(key as keyof DelaySettings, 'value', Math.min(key === 'scrollAnimationDelay' ? 60 : 500, setting.value + (key === 'scrollAnimationDelay' ? 1 : 10)))}
//                                         >
//                                             +
//                                         </button>
//                                         <span className="text-xs font-mono w-12 text-right">
//                                         {setting.value}{key === 'scrollAnimationDelay' ? 'f' : 'ms'}
//                                     </span>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//
//                     {/* ===== macOS SETTINGS ===== */}
//                     <div className="mb-6">
//                         <h4 className="text-sm font-bold mb-3 border-b border-gray-600 pb-1 text-blue-300">
//                             Настройки для macOS
//                         </h4>
//
//                         {/* macOS Mouse Settings */}
//                         <div className="mb-4 p-3 bg-blue-900/10 rounded border border-blue-600/20">
//                             <h5 className="text-xs font-bold mb-2 text-blue-400">Мышь (macOS)</h5>
//
//                             <label className="block text-xs mb-1">
//                                 Порог остановки: {macOSSettings.mouse.scrollStopThreshold.toFixed(2)}
//                             </label>
//                             <div className="flex items-center gap-2 mb-2">
//                                 <button
//                                     className="px-2 py-1 bg-blue-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('macOS', 'mouse', 'scrollStopThreshold', Math.max(0.01, macOSSettings.mouse.scrollStopThreshold - 0.01))}
//                                 >
//                                     –
//                                 </button>
//                                 <input
//                                     type="range"
//                                     max="5"
//                                     step="0.01"
//                                     value={macOSSettings.mouse.scrollStopThreshold}
//                                     onChange={(e) => updateOSSettings('macOS', 'mouse', 'scrollStopThreshold', parseFloat(e.target.value))}
//                                     className="w-full"
//                                 />
//                                 <button
//                                     className="px-2 py-1 bg-blue-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('macOS', 'mouse', 'scrollStopThreshold', Math.min(5, macOSSettings.mouse.scrollStopThreshold + 0.01))}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//
//                             <label className="block text-xs mb-1">
//                                 Фактор плавности: {macOSSettings.mouse.scrollEaseFactor.toFixed(2)}
//                                 (Авто: {getAutoSmoothFactor(refreshRate).toFixed(2)})
//                             </label>
//                             <div className="flex items-center gap-2 mb-2">
//                                 <button
//                                     className="px-2 py-1 bg-blue-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('macOS', 'mouse', 'scrollEaseFactor', Math.max(0.01, macOSSettings.mouse.scrollEaseFactor - 0.01))}
//                                 >
//                                     –
//                                 </button>
//                                 <input
//                                     type="range"
//                                     min="0.01"
//                                     max="1"
//                                     step="0.01"
//                                     value={macOSSettings.mouse.scrollEaseFactor}
//                                     onChange={(e) => updateOSSettings('macOS', 'mouse', 'scrollEaseFactor', parseFloat(e.target.value))}
//                                     className="w-full"
//                                 />
//                                 <button
//                                     className="px-2 py-1 bg-blue-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('macOS', 'mouse', 'scrollEaseFactor', Math.min(1, macOSSettings.mouse.scrollEaseFactor + 0.01))}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//
//                             <label className="block text-xs mb-1">
//                                 Минимальный шаг: {macOSSettings.mouse.minScrollStep}px
//                             </label>
//                             <div className="flex items-center gap-2">
//                                 <button
//                                     className="px-2 py-1 bg-blue-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('macOS', 'mouse', 'minScrollStep', Math.max(1, macOSSettings.mouse.minScrollStep - 1))}
//                                 >
//                                     –
//                                 </button>
//                                 <input
//                                     type="range"
//                                     min="1"
//                                     max="200"
//                                     step="1"
//                                     value={macOSSettings.mouse.minScrollStep}
//                                     onChange={(e) => updateOSSettings('macOS', 'mouse', 'minScrollStep', parseInt(e.target.value))}
//                                     className="w-full"
//                                 />
//                                 <button
//                                     className="px-2 py-1 bg-blue-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('macOS', 'mouse', 'minScrollStep', Math.min(200, macOSSettings.mouse.minScrollStep + 1))}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>
//
//                         {/* macOS Trackpad Settings */}
//                         <div className="mb-4 p-3 bg-blue-900/10 rounded border border-blue-600/20">
//                             <h5 className="text-xs font-bold mb-2 text-blue-400">Тачпад (macOS)</h5>
//
//                             <label className="block text-xs mb-1">
//                                 Порог остановки: {macOSSettings.trackpad.scrollStopThreshold.toFixed(2)}
//                             </label>
//                             <div className="flex items-center gap-2 mb-2">
//                                 <button
//                                     className="px-2 py-1 bg-blue-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('macOS', 'trackpad', 'scrollStopThreshold', Math.max(0.01, macOSSettings.trackpad.scrollStopThreshold - 0.01))}
//                                 >
//                                     –
//                                 </button>
//                                 <input
//                                     type="range"
//                                     max="5"
//                                     step="0.01"
//                                     value={macOSSettings.trackpad.scrollStopThreshold}
//                                     onChange={(e) => updateOSSettings('macOS', 'trackpad', 'scrollStopThreshold', parseFloat(e.target.value))}
//                                     className="w-full"
//                                 />
//                                 <button
//                                     className="px-2 py-1 bg-blue-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('macOS', 'trackpad', 'scrollStopThreshold', Math.min(5, macOSSettings.trackpad.scrollStopThreshold + 0.01))}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//
//                             <label className="block text-xs mb-1">
//                                 Фактор плавности: {macOSSettings.trackpad.scrollEaseFactor.toFixed(2)}
//                                 (Авто: {getAutoSmoothFactor(refreshRate).toFixed(2)})
//                             </label>
//                             <div className="flex items-center gap-2 mb-2">
//                                 <button
//                                     className="px-2 py-1 bg-blue-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('macOS', 'trackpad', 'scrollEaseFactor', Math.max(0.01, macOSSettings.trackpad.scrollEaseFactor - 0.01))}
//                                 >
//                                     –
//                                 </button>
//                                 <input
//                                     type="range"
//                                     min="0.01"
//                                     max="1"
//                                     step="0.01"
//                                     value={macOSSettings.trackpad.scrollEaseFactor}
//                                     onChange={(e) => updateOSSettings('macOS', 'trackpad', 'scrollEaseFactor', parseFloat(e.target.value))}
//                                     className="w-full"
//                                 />
//                                 <button
//                                     className="px-2 py-1 bg-blue-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('macOS', 'trackpad', 'scrollEaseFactor', Math.min(1, macOSSettings.trackpad.scrollEaseFactor + 0.01))}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//
//                             <label className="block text-xs mb-1">
//                                 Минимальный шаг: {macOSSettings.trackpad.minScrollStep}px
//                             </label>
//                             <div className="flex items-center gap-2">
//                                 <button
//                                     className="px-2 py-1 bg-blue-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('macOS', 'trackpad', 'minScrollStep', Math.max(1, macOSSettings.trackpad.minScrollStep - 1))}
//                                 >
//                                     –
//                                 </button>
//                                 <input
//                                     type="range"
//                                     min="1"
//                                     max="200"
//                                     step="1"
//                                     value={macOSSettings.trackpad.minScrollStep}
//                                     onChange={(e) => updateOSSettings('macOS', 'trackpad', 'minScrollStep', parseInt(e.target.value))}
//                                     className="w-full"
//                                 />
//                                 <button
//                                     className="px-2 py-1 bg-blue-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('macOS', 'trackpad', 'minScrollStep', Math.min(200, macOSSettings.trackpad.minScrollStep + 1))}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* ===== WINDOWS SETTINGS ===== */}
//                     <div className="mb-6">
//                         <h4 className="text-sm font-bold mb-3 border-b border-gray-600 pb-1 text-green-300">
//                             Настройки для Windows
//                         </h4>
//
//                         {/* Windows Mouse Settings */}
//                         <div className="mb-4 p-3 bg-green-900/10 rounded border border-green-600/20">
//                             <h5 className="text-xs font-bold mb-2 text-green-400">Мышь (Windows)</h5>
//
//                             <label className="block text-xs mb-1">
//                                 Порог остановки: {windowsSettings.mouse.scrollStopThreshold.toFixed(2)}
//                             </label>
//                             <div className="flex items-center gap-2 mb-2">
//                                 <button
//                                     className="px-2 py-1 bg-green-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('Windows', 'mouse', 'scrollStopThreshold', Math.max(0.01, windowsSettings.mouse.scrollStopThreshold - 0.01))}
//                                 >
//                                     –
//                                 </button>
//                                 <input
//                                     type="range"
//                                     max="5"
//                                     step="0.01"
//                                     value={windowsSettings.mouse.scrollStopThreshold}
//                                     onChange={(e) => updateOSSettings('Windows', 'mouse', 'scrollStopThreshold', parseFloat(e.target.value))}
//                                     className="w-full"
//                                 />
//                                 <button
//                                     className="px-2 py-1 bg-green-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('Windows', 'mouse', 'scrollStopThreshold', Math.min(5, windowsSettings.mouse.scrollStopThreshold + 0.01))}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//
//                             <label className="block text-xs mb-1">
//                                 Фактор плавности: {windowsSettings.mouse.scrollEaseFactor.toFixed(2)}
//                                 (Авто: {getAutoSmoothFactor(refreshRate).toFixed(2)})
//                             </label>
//                             <div className="flex items-center gap-2 mb-2">
//                                 <button
//                                     className="px-2 py-1 bg-green-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('Windows', 'mouse', 'scrollEaseFactor', Math.max(0.01, windowsSettings.mouse.scrollEaseFactor - 0.01))}
//                                 >
//                                     –
//                                 </button>
//                                 <input
//                                     type="range"
//                                     min="0.01"
//                                     max="1"
//                                     step="0.01"
//                                     value={windowsSettings.mouse.scrollEaseFactor}
//                                     onChange={(e) => updateOSSettings('Windows', 'mouse', 'scrollEaseFactor', parseFloat(e.target.value))}
//                                     className="w-full"
//                                 />
//                                 <button
//                                     className="px-2 py-1 bg-green-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('Windows', 'mouse', 'scrollEaseFactor', Math.min(1, windowsSettings.mouse.scrollEaseFactor + 0.01))}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//
//                             <label className="block text-xs mb-1">
//                                 Минимальный шаг: {windowsSettings.mouse.minScrollStep}px
//                             </label>
//                             <div className="flex items-center gap-2">
//                                 <button
//                                     className="px-2 py-1 bg-green-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('Windows', 'mouse', 'minScrollStep', Math.max(1, windowsSettings.mouse.minScrollStep - 1))}
//                                 >
//                                     –
//                                 </button>
//                                 <input
//                                     type="range"
//                                     min="1"
//                                     max="200"
//                                     step="1"
//                                     value={windowsSettings.mouse.minScrollStep}
//                                     onChange={(e) => updateOSSettings('Windows', 'mouse', 'minScrollStep', parseInt(e.target.value))}
//                                     className="w-full"
//                                 />
//                                 <button
//                                     className="px-2 py-1 bg-green-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('Windows', 'mouse', 'minScrollStep', Math.min(200, windowsSettings.mouse.minScrollStep + 1))}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>
//
//                         {/* Windows Trackpad Settings */}
//                         <div className="mb-4 p-3 bg-green-900/10 rounded border border-green-600/20">
//                             <h5 className="text-xs font-bold mb-2 text-green-400">Тачпад (Windows)</h5>
//
//                             <label className="block text-xs mb-1">
//                                 Порог остановки: {windowsSettings.trackpad.scrollStopThreshold.toFixed(2)}
//                             </label>
//                             <div className="flex items-center gap-2 mb-2">
//                                 <button
//                                     className="px-2 py-1 bg-green-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('Windows', 'trackpad', 'scrollStopThreshold', Math.max(0.01, windowsSettings.trackpad.scrollStopThreshold - 0.01))}
//                                 >
//                                     –
//                                 </button>
//                                 <input
//                                     type="range"
//                                     max="5"
//                                     step="0.01"
//                                     value={windowsSettings.trackpad.scrollStopThreshold}
//                                     onChange={(e) => updateOSSettings('Windows', 'trackpad', 'scrollStopThreshold', parseFloat(e.target.value))}
//                                     className="w-full"
//                                 />
//                                 <button
//                                     className="px-2 py-1 bg-green-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('Windows', 'trackpad', 'scrollStopThreshold', Math.min(5, windowsSettings.trackpad.scrollStopThreshold + 0.01))}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//
//                             <label className="block text-xs mb-1">
//                                 Фактор плавности: {windowsSettings.trackpad.scrollEaseFactor.toFixed(2)}
//                                 (Авто: {getAutoSmoothFactor(refreshRate).toFixed(2)})
//                             </label>
//                             <div className="flex items-center gap-2 mb-2">
//                                 <button
//                                     className="px-2 py-1 bg-green-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('Windows', 'trackpad', 'scrollEaseFactor', Math.max(0.01, windowsSettings.trackpad.scrollEaseFactor - 0.01))}
//                                 >
//                                     –
//                                 </button>
//                                 <input
//                                     type="range"
//                                     min="0.01"
//                                     max="1"
//                                     step="0.01"
//                                     value={windowsSettings.trackpad.scrollEaseFactor}
//                                     onChange={(e) => updateOSSettings('Windows', 'trackpad', 'scrollEaseFactor', parseFloat(e.target.value))}
//                                     className="w-full"
//                                 />
//                                 <button
//                                     className="px-2 py-1 bg-green-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('Windows', 'trackpad', 'scrollEaseFactor', Math.min(1, windowsSettings.trackpad.scrollEaseFactor + 0.01))}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//
//                             <label className="block text-xs mb-1">
//                                 Минимальный шаг: {windowsSettings.trackpad.minScrollStep}px
//                             </label>
//                             <div className="flex items-center gap-2">
//                                 <button
//                                     className="px-2 py-1 bg-green-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('Windows', 'trackpad', 'minScrollStep', Math.max(1, windowsSettings.trackpad.minScrollStep - 1))}
//                                 >
//                                     –
//                                 </button>
//                                 <input
//                                     type="range"
//                                     min="1"
//                                     max="200"
//                                     step="1"
//                                     value={windowsSettings.trackpad.minScrollStep}
//                                     onChange={(e) => updateOSSettings('Windows', 'trackpad', 'minScrollStep', parseInt(e.target.value))}
//                                     className="w-full"
//                                 />
//                                 <button
//                                     className="px-2 py-1 bg-green-700 rounded text-xs"
//                                     onClick={() => updateOSSettings('Windows', 'trackpad', 'minScrollStep', Math.min(200, windowsSettings.trackpad.minScrollStep + 1))}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* CURRENT ACTIVE SETTINGS */}
//                     <div className="mb-6 p-3 bg-purple-900/20 rounded-lg border border-purple-600/30">
//                         <h4 className="text-sm font-bold mb-2 text-purple-300">
//                             Активные настройки ({currentOS} - {isTrackpad ? 'Тачпад' : 'Мышь'})
//                         </h4>
//                         <div className="grid grid-cols-2 gap-2 text-xs">
//                             <div>Порог остановки: <span className="font-mono text-purple-400">{currentSettings.scrollStopThreshold.toFixed(2)}</span></div>
//                             <div>Фактор плавности: <span className="font-mono text-purple-400">{currentSettings.scrollEaseFactor.toFixed(2)}</span></div>
//                             <div>Минимальный шаг: <span className="font-mono text-purple-400">{currentSettings.minScrollStep}px</span></div>
//                         </div>
//                     </div>
//
//                 </div>
//             )}
//         </>
//     );
// }

'use client';
import React, {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import {useCustomScroll} from "@/components/hooks/useCustomScroll";

interface SmoothScrollProps {
    children: React.ReactNode;
}

interface TrackpadDebugInfo {
    deltaY: number;
    deltaX: number;
    deltaZ: number;
    deltaMode: number;
    avgDelta: number;
    maxDelta: number;
    minDelta: number;
    deltaVariance: number;
    eventCount: number;
    lastEventTime: number;
    frequency: number;
}

interface DelaySettings {
    detectionDelay: {
        enabled: boolean;
        value: number;
    };
    scrollAnimationDelay: {
        enabled: boolean;
        value: number;
    };
    routeChangeDelay: {
        enabled: boolean;
        value: number;
    };
    resizeDelay: {
        enabled: boolean;
        value: number;
    };
}

interface DeviceSettings {
    scrollStopThreshold: number;
    scrollEaseFactor: number;
    minScrollStep: number;
}

interface OSSettings {
    mouse: DeviceSettings;
    trackpad: DeviceSettings;
}

type OS = 'macOS' | 'Windows' | 'Other';

export default function SmoothScroll({children}: SmoothScrollProps) {
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [showScrollbar, setShowScrollbar] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Состояния для drag-to-scroll
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartY, setDragStartY] = useState(0);
    const [dragStartScrollTop, setDragStartScrollTop] = useState(0);

    const [isTrackpad, setIsTrackpad] = useState(false);
    const [currentOS, setCurrentOS] = useState<OS>('Other');
    const [trackpadDebugInfo, setTrackpadDebugInfo] = useState<TrackpadDebugInfo>({
        deltaY: 0,
        deltaX: 0,
        deltaZ: 0,
        deltaMode: 0,
        avgDelta: 0,
        maxDelta: 0,
        minDelta: 0,
        deltaVariance: 0,
        eventCount: 0,
        lastEventTime: 0,
        frequency: 0
    });

    // Добавляем состояния для определения герцовки
    const [refreshRate, setRefreshRate] = useState<number>(60);
    const [isDetectingRefreshRate, setIsDetectingRefreshRate] = useState(true);

    // Настройки для разных ОС
    const [macOSSettings, setMacOSSettings] = useState<OSSettings>({
        mouse: {
            scrollStopThreshold: 0.0,
            scrollEaseFactor: 0.10,
            minScrollStep: 1
        },
        trackpad: {
            scrollStopThreshold: 0.0,
            scrollEaseFactor: 0.15,
            minScrollStep: 1
        }
    });

    const [windowsSettings, setWindowsSettings] = useState<OSSettings>({
        mouse: {
            scrollStopThreshold: 0.0,
            scrollEaseFactor: 0.08,
            minScrollStep: 2
        },
        trackpad: {
            scrollStopThreshold: 0.0,
            scrollEaseFactor: 0.25,
            minScrollStep: 1
        }
    });

    const [delaySettings, setDelaySettings] = useState<DelaySettings>({
        detectionDelay: {
            enabled: true,
            value: 40
        },
        scrollAnimationDelay: {
            enabled: true,
            value: 1
        },
        routeChangeDelay: {
            enabled: true,
            value: 40
        },
        resizeDelay: {
            enabled: true,
            value: 40
        }
    });

    // Функция для получения текущих настроек
    const getCurrentSettings = (): DeviceSettings => {
        const osSettings = currentOS === 'macOS' ? macOSSettings : windowsSettings;
        return isTrackpad ? osSettings.trackpad : osSettings.mouse;
    };

    // Функция для определения фактора плавности по герцовке
    // const getAutoSmoothFactor = (rate: number): number => {
    //     if (rate <= 129) return 0.15;
    //     if (rate <= 199) return 0.10;
    //     return 0.05;
    // };

    // Функция для определения фактора плавности по герцовке
    const getAutoSmoothFactor = (rate: number): number => {
        const is4K = Math.max(window.screen.width, window.screen.height) >= 3840;

        if (is4K) {
            if (rate <= 59) return 0.13;
            if (rate <= 79) return 0.12;
            if (rate <= 99) return 0.11;
            if (rate <= 119) return 0.10;
            if (rate <= 139) return 0.09;
            if (rate <= 159) return 0.08;
            if (rate <= 179) return 0.07;
            if (rate <= 199) return 0.06;
            if (rate <= 219) return 0.05;
            return 0.04; // 220+
        } else {
            // старое поведение для FullHD и ниже
            if (rate <= 129) return 0.15;
            if (rate <= 199) return 0.10;
            return 0.05;
        }
    };


    // Определение ОС
    useEffect(() => {
        const detectOS = (): OS => {
            const platform = navigator.platform.toLowerCase();
            const userAgent = navigator.userAgent.toLowerCase();

            if (platform.includes('win') || userAgent.includes('windows')) {
                return 'Windows';
            } else if (platform.includes('mac') || userAgent.includes('mac')) {
                return 'macOS';
            }
            return 'Other';
        };

        const detectedOS = detectOS();
        setCurrentOS(detectedOS);

        // Устанавливаем значения по умолчанию для тачпада на macOS
        if (detectedOS === 'macOS') {
            setIsTrackpad(true);
        } else if (detectedOS === 'Windows') {
            setIsTrackpad(false);
        }
    }, []);

    // Определение герцовки экрана
    useEffect(() => {
        let frameCount = 0;
        let startTime = 0;
        let animationId: number;
        const framesToMeasure = 60;

        const measureFrameRate = (timestamp: number) => {
            if (startTime === 0) {
                startTime = timestamp;
            }

            frameCount++;

            if (frameCount < framesToMeasure) {
                animationId = requestAnimationFrame(measureFrameRate);
            } else {
                const elapsed = timestamp - startTime;
                const calculatedFPS = Math.round((frameCount * 1000) / elapsed);

                // Округляем до стандартных значений refresh rate
                let detectedRate = calculatedFPS;
                if (calculatedFPS >= 58 && calculatedFPS <= 62) detectedRate = 60;
                else if (calculatedFPS >= 70 && calculatedFPS <= 76) detectedRate = 75;
                else if (calculatedFPS >= 88 && calculatedFPS <= 92) detectedRate = 90;
                else if (calculatedFPS >= 118 && calculatedFPS <= 122) detectedRate = 120;
                else if (calculatedFPS >= 143 && calculatedFPS <= 147) detectedRate = 144;
                else if (calculatedFPS >= 163 && calculatedFPS <= 167) detectedRate = 165;
                else if (calculatedFPS >= 238 && calculatedFPS <= 242) detectedRate = 240;
                else if (calculatedFPS >= 358 && calculatedFPS <= 362) detectedRate = 360;

                setRefreshRate(detectedRate);
                setIsDetectingRefreshRate(false);

                // Обновляем настройки с автоматическими значениями
                // Обновляем для обеих ОС
                // setMacOSSettings(prev => ({
                //     ...prev,
                //     mouse: {...prev.mouse, scrollEaseFactor: autoFactor},
                //     trackpad: {...prev.trackpad, scrollEaseFactor: autoFactor}
                // }));
                //
                if (currentOS === "Windows") {
                    const autoFactor = getAutoSmoothFactor(detectedRate);

                    setWindowsSettings(prev => ({
                        ...prev,
                        mouse: { ...prev.mouse, scrollEaseFactor: autoFactor },
                        trackpad: { ...prev.trackpad, scrollEaseFactor: autoFactor }
                    }));

                    console.log(
                        `Windows detected refresh rate: ${detectedRate}Hz (measured: ${calculatedFPS}fps), auto factor: ${autoFactor}`
                    );
                } else {
                    console.log(
                        `Detected refresh rate: ${detectedRate}Hz (measured: ${calculatedFPS}fps) — auto factor skipped (not Windows)`
                    );
                }
            }
        };

        const timeout = setTimeout(() => {
            animationId = requestAnimationFrame(measureFrameRate);
        }, 100);

        return () => {
            clearTimeout(timeout);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, []);

    const getScrollOffset = React.useCallback(() => {
        if (pathname.includes('/policy') || pathname.includes('/organizations')) return -115;
        if (pathname.includes('/blogPage')) return -174;
        if (pathname.includes('/organizations/where-do-you-lose')) return -110;
        if (pathname.includes('/editors')) return 90;
        return 120;
    }, [pathname]);

    const currentSettings = getCurrentSettings();
    const {scrollbarRef: customScrollbarRef} = useCustomScroll({
        smoothScrollFactor: currentSettings.scrollEaseFactor,
        scrollPadding: 2,
        enabled: showScrollbar && !isMobile,
        target: 'window',
        getScrollOffset
    });

    // Определение мобильного устройства
    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                window.innerWidth <= 768 ||
                ('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0);

            setIsMobile(isMobileDevice);
            return isMobileDevice;
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // // Определение типа устройства ввода (только для desktop)
    // useEffect(() => {
    //     if (isMobile) return;
    //
    //     const wheelEvents: number[] = [];
    //     const wheelTimestamps: number[] = [];
    //     let detectionTimeout: NodeJS.Timeout;
    //
    //     const detectInputDevice = (e: WheelEvent) => {
    //         const currentTime = Date.now();
    //         const timeDiff = currentTime - trackpadDebugInfo.lastEventTime;
    //
    //         setTrackpadDebugInfo(prev => {
    //             const newEventCount = prev.eventCount + 1;
    //             const frequency = timeDiff > 0 ? 1000 / timeDiff : 0;
    //
    //             return {
    //                 ...prev,
    //                 deltaY: e.deltaY,
    //                 deltaX: e.deltaX,
    //                 deltaZ: e.deltaZ,
    //                 deltaMode: e.deltaMode,
    //                 eventCount: newEventCount,
    //                 lastEventTime: currentTime,
    //                 frequency: frequency
    //             };
    //         });
    //
    //         wheelEvents.push(Math.abs(e.deltaY));
    //         wheelTimestamps.push(currentTime);
    //         if (wheelEvents.length > 10) {
    //             wheelEvents.shift();
    //             wheelTimestamps.shift();
    //         }
    //
    //         clearTimeout(detectionTimeout);
    //
    //         const delayValue = delaySettings.detectionDelay.enabled ?
    //             delaySettings.detectionDelay.value : 0;
    //
    //         detectionTimeout = setTimeout(() => {
    //             if (wheelEvents.length >= 5) {
    //                 const avgDelta = wheelEvents.reduce((a, b) => a + b, 0) / wheelEvents.length;
    //                 const maxDelta = Math.max(...wheelEvents);
    //                 const minDelta = Math.min(...wheelEvents);
    //                 const deltaVariance = maxDelta - minDelta;
    //
    //                 const intervals = [];
    //                 for (let i = 1; i < wheelTimestamps.length; i++) {
    //                     intervals.push(wheelTimestamps[i] - wheelTimestamps[i - 1]);
    //                 }
    //                 const avgInterval = intervals.length > 0 ?
    //                     intervals.reduce((a, b) => a + b, 0) / intervals.length : 0;
    //
    //                 setTrackpadDebugInfo(prev => ({
    //                     ...prev,
    //                     avgDelta,
    //                     maxDelta,
    //                     minDelta,
    //                     deltaVariance
    //                 }));
    //
    //                 let isLikelyTrackpad = false;
    //                 let isLikelyMouse = false;
    //
    //                 if (currentOS === 'macOS') {
    //                     isLikelyTrackpad =
    //                         avgDelta < 50 &&
    //                         deltaVariance < 30 &&
    //                         e.deltaMode === 0 &&
    //                         avgInterval < 50;
    //
    //                     isLikelyMouse =
    //                         avgDelta > 80 ||
    //                         deltaVariance > 50 ||
    //                         e.deltaMode !== 0 ||
    //                         avgInterval > 100;
    //                 } else if (currentOS === 'Windows') {
    //                     // isLikelyTrackpad =
    //                     //     (avgDelta < 120 && deltaVariance < 100 && avgInterval < 30) ||
    //                     //     (avgDelta < 30 && e.deltaMode === 0);
    //                     //
    //                     // isLikelyMouse =
    //                     //     (avgDelta >= 120 && (deltaVariance > 100 || avgInterval > 50)) ||
    //                     //     (e.deltaMode === 1) ||
    //                     //     (avgDelta === 120 && deltaVariance === 0);
    //
    //
    //                     const isWheelStep = Math.abs(e.deltaY) % 120 === 0;
    //
    //                     isLikelyTrackpad =
    //                         !isWheelStep &&
    //                         avgDelta < 80 &&
    //                         deltaVariance < 60 &&
    //                         avgInterval < 30;
    //
    //                     isLikelyMouse =
    //                         isWheelStep ||
    //                         avgDelta >= 120 ||
    //                         deltaVariance > 80 ||
    //                         avgInterval > 80;
    //
    //                 } else {
    //                     isLikelyTrackpad =
    //                         avgDelta < 80 &&
    //                         deltaVariance < 60 &&
    //                         e.deltaMode === 0;
    //
    //                     isLikelyMouse =
    //                         avgDelta > 100 ||
    //                         deltaVariance > 80 ||
    //                         e.deltaMode !== 0;
    //                 }
    //
    //                 if (isLikelyTrackpad) {
    //                     setIsTrackpad(true);
    //                 } else if (isLikelyMouse) {
    //                     setIsTrackpad(false);
    //                 }
    //             }
    //         }, delayValue);
    //     };
    //
    //     window.addEventListener('wheel', detectInputDevice, {passive: true});
    //
    //     return () => {
    //         window.removeEventListener('wheel', detectInputDevice);
    //         clearTimeout(detectionTimeout);
    //     };
    // }, [delaySettings.detectionDelay, isMobile, currentOS]);

    // Определение типа устройства ввода (только для desktop)
    useEffect(() => {
        if (isMobile) return;

        const wheelEvents: number[] = [];
        const wheelTimestamps: number[] = [];
        let detectionTimeout: NodeJS.Timeout;

        const detectInputDevice = (e: WheelEvent) => {
            const currentTime = Date.now();
            const timeDiff = currentTime - trackpadDebugInfo.lastEventTime;

            setTrackpadDebugInfo(prev => {
                const newEventCount = prev.eventCount + 1;
                const frequency = timeDiff > 0 ? 1000 / timeDiff : 0;

                return {
                    ...prev,
                    deltaY: e.deltaY,
                    deltaX: e.deltaX,
                    deltaZ: e.deltaZ,
                    deltaMode: e.deltaMode,
                    eventCount: newEventCount,
                    lastEventTime: currentTime,
                    frequency: frequency
                };
            });

            wheelEvents.push(Math.abs(e.deltaY));
            wheelTimestamps.push(currentTime);
            if (wheelEvents.length > 10) {
                wheelEvents.shift();
                wheelTimestamps.shift();
            }

            clearTimeout(detectionTimeout);

            const delayValue = delaySettings.detectionDelay.enabled ?
                delaySettings.detectionDelay.value : 0;

            detectionTimeout = setTimeout(() => {
                if (wheelEvents.length >= 5) {
                    const avgDelta = wheelEvents.reduce((a, b) => a + b, 0) / wheelEvents.length;
                    const maxDelta = Math.max(...wheelEvents);
                    const minDelta = Math.min(...wheelEvents);
                    const deltaVariance = maxDelta - minDelta;

                    const intervals = [];
                    for (let i = 1; i < wheelTimestamps.length; i++) {
                        intervals.push(wheelTimestamps[i] - wheelTimestamps[i - 1]);
                    }
                    const avgInterval = intervals.length > 0 ?
                        intervals.reduce((a, b) => a + b, 0) / intervals.length : 0;

                    setTrackpadDebugInfo(prev => ({
                        ...prev,
                        avgDelta,
                        maxDelta,
                        minDelta,
                        deltaVariance
                    }));

                    let isLikelyTrackpad = false;
                    let isLikelyMouse = false;

                    if (currentOS === 'macOS') {
                        // Логика для macOS
                        isLikelyTrackpad =
                            avgDelta < 50 &&
                            deltaVariance < 30 &&
                            e.deltaMode === 0 &&
                            avgInterval < 50;

                        isLikelyMouse =
                            avgDelta > 80 ||
                            deltaVariance > 50 ||
                            e.deltaMode !== 0 ||
                            avgInterval > 100;

                    } else if (currentOS === 'Windows') {
                        // Улучшенная логика для Windows
                        const isPreciseScrolling = e.deltaMode === 0; // pixel scrolling
                        const isLineScrolling = e.deltaMode === 1; // line scrolling

                        // Проверка на "ступенчатость" мыши (обычно кратно 100 или 120)
                        const isMouseStep = Math.abs(e.deltaY) % 100 === 0 ||
                            Math.abs(e.deltaY) % 120 === 0;

                        // Проверка на плавность тачпада
                        const hasSmoothDelta = Math.abs(e.deltaY) > 0 &&
                            Math.abs(e.deltaY) < 50;

                        // Проверка на высокую частоту событий (тачпад)
                        const hasHighFrequency = intervals.length > 0 &&
                            avgInterval < 20;

                        // Проверка на низкую вариативность (тачпад)
                        const hasLowVariance = deltaVariance < 40;

                        isLikelyTrackpad =
                            isPreciseScrolling &&
                            hasSmoothDelta &&
                            hasHighFrequency &&
                            hasLowVariance &&
                            !isMouseStep;

                        isLikelyMouse =
                            isLineScrolling ||
                            isMouseStep ||
                            avgDelta >= 100 ||
                            !hasHighFrequency ||
                            !hasLowVariance;

                        // Дополнительная проверка: если deltaMode = 0 и значения очень маленькие - это точно тачпад
                        if (isPreciseScrolling && Math.abs(e.deltaY) < 10 && Math.abs(e.deltaY) > 0) {
                            isLikelyTrackpad = true;
                            isLikelyMouse = false;
                        }

                        // Дополнительная проверка: если deltaMode = 1 - это точно мышь
                        if (isLineScrolling) {
                            isLikelyTrackpad = false;
                            isLikelyMouse = true;
                        }

                    } else {
                        // Для других ОС
                        isLikelyTrackpad =
                            avgDelta < 80 &&
                            deltaVariance < 60 &&
                            e.deltaMode === 0;

                        isLikelyMouse =
                            avgDelta > 100 ||
                            deltaVariance > 80 ||
                            e.deltaMode !== 0;
                    }

                    console.log('Detection:', {
                        OS: currentOS,
                        deltaY: e.deltaY,
                        deltaMode: e.deltaMode,
                        avgDelta,
                        deltaVariance,
                        avgInterval,
                        isLikelyTrackpad,
                        isLikelyMouse
                    });

                    if (isLikelyTrackpad) {
                        setIsTrackpad(true);
                    } else if (isLikelyMouse) {
                        setIsTrackpad(false);
                    }
                }
            }, delayValue);
        };

        // Устанавливаем начальное значение на основе платформы
        if (currentOS === 'macOS') {
            setIsTrackpad(true); // На macOS по умолчанию предполагаем тачпад
        } else if (currentOS === 'Windows') {
            setIsTrackpad(false); // На Windows по умолчанию предполагаем мышь
        }

        window.addEventListener('wheel', detectInputDevice, {passive: true});

        return () => {
            window.removeEventListener('wheel', detectInputDevice);
            clearTimeout(detectionTimeout);
        };
    }, [delaySettings.detectionDelay, isMobile, currentOS]);

    useEffect(() => {
        const hideScrollPaths = [
            '/pricing',
        ];

        const shouldHideScrollbar = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));

        if (window.screen.width > 768 && !isMobile) {
            document.body.style.overflow = shouldHideScrollbar ? 'hidden' : '';
            setShowScrollbar(!shouldHideScrollbar);
        } else {
            document.body.style.overflow = '';
            setShowScrollbar(false);
        }

        const routeDelay = delaySettings.routeChangeDelay.enabled ?
            delaySettings.routeChangeDelay.value : 0;

        const timeout1 = setTimeout(() => window.dispatchEvent(new Event('scroll')), routeDelay);
        const timeout2 = setTimeout(() => window.dispatchEvent(new Event('scroll')), routeDelay * 6);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            if (!isMobile) {
                document.body.style.overflow = '';
            }
        };
    }, [pathname, delaySettings.routeChangeDelay, isMobile]);

    const handleMouseMove = React.useCallback((e: MouseEvent) => {
        if (!isDragging) return;

        e.preventDefault();

        const deltaY = e.clientY - dragStartY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        const maxScroll = scrollHeight - clientHeight;

        const scrollRatio = deltaY / clientHeight;
        const newScrollTop = dragStartScrollTop + (scrollRatio * scrollHeight);

        const clampedScrollTop = Math.max(0, Math.min(newScrollTop, maxScroll));

        window.scrollTo(0, clampedScrollTop);
    }, [isDragging, dragStartY, dragStartScrollTop]);

    const handleMouseUp = React.useCallback(() => {
        if (!isDragging) return;

        setIsDragging(false);

        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }, [isDragging]);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    useEffect(() => {
        if (isMobile) return;

        if (!scrollbarRef.current) return;

        let currentScroll = window.scrollY;
        let targetScroll = currentScroll;
        let isScrolling = false;
        let lastUpdateTime = 0;
        let rafId: number | null = null;

        // Получаем настройки внутри эффекта для актуального состояния
        const activeSettings = currentOS === 'macOS' ?
            (isTrackpad ? macOSSettings.trackpad : macOSSettings.mouse) :
            (isTrackpad ? windowsSettings.trackpad : windowsSettings.mouse);

        const initScroll = () => {
            currentScroll = window.scrollY;
            targetScroll = currentScroll;
        };

        const handleWheel = (e: WheelEvent) => {
            if (isDragging) return;

            if ((e.target as HTMLElement).closest('textarea, .allow-native-scroll')) return;

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            const scrollStep = Math.sign(e.deltaY) * Math.max(Math.abs(e.deltaY), activeSettings.minScrollStep);
            targetScroll += scrollStep;

            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

            if (!isScrolling) {
                isScrolling = true;
                const animate = () => {
                    const now = performance.now();
                    const timeDelta = now - lastUpdateTime;
                    lastUpdateTime = now;

                    const diff = targetScroll - currentScroll;
                    const absDiff = Math.abs(diff);

                    if (absDiff < activeSettings.scrollStopThreshold) {
                        currentScroll = targetScroll;
                        const finalPosition = Math.round(currentScroll * 100) / 100;

                        window.scrollTo(0, finalPosition);

                        requestAnimationFrame(() => {
                            window.scrollTo(0, finalPosition);
                        });

                        isScrolling = false;
                        rafId = null;
                        return;
                    }

                    const timeMultiplier = Math.min(timeDelta / 16.67, 2);
                    const adjustedEase = activeSettings.scrollEaseFactor * timeMultiplier;

                    currentScroll += diff * Math.min(adjustedEase, 0.5);
                    const smoothPosition = Math.round(currentScroll * 100) / 100;

                    window.scrollTo(0, smoothPosition);

                    if (delaySettings.scrollAnimationDelay.enabled) {
                        setTimeout(() => {
                            rafId = requestAnimationFrame(animate);
                        }, delaySettings.scrollAnimationDelay.value);
                    } else {
                        rafId = requestAnimationFrame(animate);
                    }
                };

                lastUpdateTime = performance.now();
                if (delaySettings.scrollAnimationDelay.enabled) {
                    setTimeout(() => {
                        rafId = requestAnimationFrame(animate);
                    }, delaySettings.scrollAnimationDelay.value);
                } else {
                    rafId = requestAnimationFrame(animate);
                }
            }
        };

        const handleScroll = () => {
            if (!isScrolling && !isDragging) {
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

                        if (!isScrolling) {
                            isScrolling = true;
                            const animate = () => {
                                const diff = targetScroll - currentScroll;
                                if (Math.abs(diff) < activeSettings.scrollStopThreshold) {
                                    currentScroll = targetScroll;
                                    window.scrollTo(0, Math.round(currentScroll * 100) / 100);
                                    isScrolling = false;
                                    return;
                                }

                                currentScroll += diff * activeSettings.scrollEaseFactor;
                                window.scrollTo(0, Math.round(currentScroll * 100) / 100);

                                if (delaySettings.scrollAnimationDelay.enabled) {
                                    setTimeout(() => requestAnimationFrame(animate), delaySettings.scrollAnimationDelay.value);
                                } else {
                                    requestAnimationFrame(animate);
                                }
                            };

                            if (delaySettings.scrollAnimationDelay.enabled) {
                                setTimeout(() => requestAnimationFrame(animate), delaySettings.scrollAnimationDelay.value);
                            } else {
                                requestAnimationFrame(animate);
                            }
                        }
                    }
                }
            }
        };

        const scrollHandler = () => {
            handleScroll();
            if (delaySettings.scrollAnimationDelay.enabled) {
                setTimeout(() => requestAnimationFrame(updateScrollbar), delaySettings.scrollAnimationDelay.value);
            } else {
                requestAnimationFrame(updateScrollbar);
            }
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

        const handleResize = () => {
            const resizeDelay = delaySettings.resizeDelay.enabled ?
                delaySettings.resizeDelay.value : 0;

            if (resizeDelay > 0) {
                setTimeout(updateScrollbar, resizeDelay);
            } else {
                updateScrollbar();
            }
        };

        initScroll();
        updateScrollbar();

        window.addEventListener('wheel', handleWheel, {passive: false});
        window.addEventListener('scroll', scrollHandler, {passive: true});
        document.addEventListener('click', handleAnchorClick);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', scrollHandler);
            document.removeEventListener('click', handleAnchorClick);
            window.removeEventListener('resize', handleResize);

            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [isTrackpad, macOSSettings, windowsSettings, currentOS, pathname, getScrollOffset, delaySettings, isMobile, isDragging]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        const routeDelay = delaySettings.routeChangeDelay.enabled ?
            delaySettings.routeChangeDelay.value : 0;

        setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, routeDelay);
    }, [pathname, delaySettings.routeChangeDelay]);

    const updateDelaySetting = (key: keyof DelaySettings, property: 'enabled' | 'value', value: boolean | number) => {
        setDelaySettings(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                [property]: value
            }
        }));
    };

    // Функции для обновления настроек
    const updateOSSettings = (os: 'macOS' | 'Windows', deviceType: 'mouse' | 'trackpad', property: keyof DeviceSettings, value: number) => {
        if (os === 'macOS') {
            setMacOSSettings(prev => ({
                ...prev,
                [deviceType]: {
                    ...prev[deviceType],
                    [property]: value
                }
            }));
        } else {
            setWindowsSettings(prev => ({
                ...prev,
                [deviceType]: {
                    ...prev[deviceType],
                    [property]: value
                }
            }));
        }
    };

    return (
        <>
            {children}
            {showScrollbar && !isMobile && (
                <div
                    ref={customScrollbarRef}
                    className={`scrollbar md:block hidden`}
                />
            )}

            <div className="fixed top-[90%] right-4 z-[10000000000] gap-2">
                {!isOpen ? (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-blue-600 text-white px-2 py-1 rounded-lg text-sm cursor-pointer shadow hover:bg-blue-700 transition"
                    >
                        Open
                    </button>
                ) : (
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-red-600 text-white px-2 py-1 rounded-lg text-sm cursor-pointer shadow hover:bg-red-700 transition"
                    >
                        Close
                    </button>
                )}
            </div>

            {isOpen && (
                <div
                    className="absolute top-[70px] right-4 backdrop-blur-2xl border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 z-[9999999999] w-96  overflow-y-auto allow-native-scroll">

                    {/* OS INFO */}
                    <div className="mb-6 p-3 bg-blue-900/20 rounded-lg border border-blue-600/30">
                        <h4 className="text-sm font-bold mb-2 text-blue-300">Информация о системе</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>ОС: <span className="font-mono text-blue-400">{currentOS}</span></div>
                            <div>Устройство: <span
                                className="font-mono text-blue-400">{isTrackpad ? 'Тачпад' : 'Мышь'}</span></div>
                        </div>
                    </div>

                    {/* REFRESH RATE INFO */}
                    <div className="mb-6 p-3 bg-green-900/20 rounded-lg border border-green-600/30">
                        <h4 className="text-sm font-bold mb-2 text-green-300">Частота обновления экрана</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>Частота: <span className="font-mono text-green-400">
                                {isDetectingRefreshRate ? 'Определяется...' : `${refreshRate}Hz`}</span>
                            </div>

                            {
                                currentOS === 'Windows' ? (
                                    <div>Авто-фактор: <span className="font-mono text-green-400">
                                        {getAutoSmoothFactor(refreshRate).toFixed(2)}
                                    </span></div>
                                ) : (
                                    <div className="col-span-2 text-xs text-gray-400">
                                        Авто-фактор доступен только для Windows
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold">
                        Настройки прокрутки
                    </h3>

                    {/* ===== TRACKPAD DEBUG INFO ===== */}
                    <div className="mb-6 p-3 bg-gray-800 rounded-lg">
                        <h4 className="text-sm font-bold mb-2">Отладка детекции</h4>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>deltaY: <span className="font-mono">{trackpadDebugInfo.deltaY.toFixed(1)}</span></div>
                            <div>deltaMode: <span className="font-mono">{trackpadDebugInfo.deltaMode}</span></div>
                            <div>Частота: <span className="font-mono">{trackpadDebugInfo.frequency.toFixed(1)}Hz</span>
                            </div>
                            <div>Среднее Δ: <span className="font-mono">{trackpadDebugInfo.avgDelta.toFixed(1)}</span>
                            </div>
                            <div>Вариация: <span
                                className="font-mono">{trackpadDebugInfo.deltaVariance.toFixed(1)}</span></div>
                            <div>События: <span className="font-mono">{trackpadDebugInfo.eventCount}</span></div>
                        </div>
                    </div>

                    {/* ===== DELAY SETTINGS ===== */}
                    <div className="mb-6">
                        <h4 className="text-sm font-bold mb-3 border-b border-gray-600 pb-1">Управление задержками</h4>

                        {Object.entries(delaySettings).map(([key, setting]) => {
                            const labels = {
                                detectionDelay: 'Детекция устройства',
                                scrollAnimationDelay: 'Анимация скролла',
                                routeChangeDelay: 'Смена маршрута',
                                resizeDelay: 'Изменение размера'
                            };

                            return (
                                <div key={key} className="mb-3 p-2 bg-gray-700 rounded">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-xs font-medium">
                                            {labels[key as keyof typeof labels]}
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={setting.enabled}
                                                onChange={(e) => updateDelaySetting(key as keyof DelaySettings, 'enabled', e.target.checked)}
                                                className="mr-1"
                                            />
                                            <span className="text-xs">Включено</span>
                                        </label>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-2 py-1 bg-gray-600 rounded text-xs"
                                            disabled={!setting.enabled}
                                            onClick={() => updateDelaySetting(key as keyof DelaySettings, 'value', Math.max(0, setting.value - (key === 'scrollAnimationDelay' ? 1 : 10)))}
                                        >
                                            –
                                        </button>
                                        <input
                                            type="range"
                                            min="0"
                                            max={key === 'scrollAnimationDelay' ? '60' : '500'}
                                            step={key === 'scrollAnimationDelay' ? '1' : '10'}
                                            value={setting.value}
                                            disabled={!setting.enabled}
                                            onChange={(e) => updateDelaySetting(key as keyof DelaySettings, 'value', parseInt(e.target.value))}
                                            className="flex-1"
                                        />
                                        <button
                                            className="px-2 py-1 bg-gray-600 rounded text-xs"
                                            disabled={!setting.enabled}
                                            onClick={() => updateDelaySetting(key as keyof DelaySettings, 'value', Math.min(key === 'scrollAnimationDelay' ? 60 : 500, setting.value + (key === 'scrollAnimationDelay' ? 1 : 10)))}
                                        >
                                            +
                                        </button>
                                        <span className="text-xs font-mono w-12 text-right">
                                        {setting.value}{key === 'scrollAnimationDelay' ? 'f' : 'ms'}
                                    </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ===== macOS SETTINGS ===== */}  {/* ===== WINDOWS SETTINGS ===== */}
                    {
                        currentOS === 'macOS' ? (
                            <div className="mb-6">
                                <h4 className="text-sm font-bold mb-3 border-b border-gray-600 pb-1 text-blue-300">
                                    Настройки для macOS
                                </h4>

                                {/* macOS Mouse Settings */}
                                <div className="mb-4 p-3 bg-blue-900/10 rounded border border-blue-600/20">
                                    <h5 className="text-xs font-bold mb-2 text-blue-400">Мышь (macOS)</h5>

                                    <label className="block text-xs mb-1">
                                        Порог остановки: {macOSSettings.mouse.scrollStopThreshold.toFixed(2)}
                                    </label>
                                    <div className="flex items-center gap-2 mb-2">
                                        <button
                                            className="px-2 py-1 bg-blue-700 rounded text-xs"
                                            onClick={() => updateOSSettings('macOS', 'mouse', 'scrollStopThreshold', Math.max(0.01, macOSSettings.mouse.scrollStopThreshold - 0.01))}
                                        >
                                            –
                                        </button>
                                        <input
                                            type="range"
                                            max="5"
                                            step="0.01"
                                            value={macOSSettings.mouse.scrollStopThreshold}
                                            onChange={(e) => updateOSSettings('macOS', 'mouse', 'scrollStopThreshold', parseFloat(e.target.value))}
                                            className="w-full"
                                        />
                                        <button
                                            className="px-2 py-1 bg-blue-700 rounded text-xs"
                                            onClick={() => updateOSSettings('macOS', 'mouse', 'scrollStopThreshold', Math.min(5, macOSSettings.mouse.scrollStopThreshold + 0.01))}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <label className="block text-xs mb-1">
                                        Фактор плавности: {macOSSettings.mouse.scrollEaseFactor.toFixed(2)}
                                    </label>
                                    <div className="flex items-center gap-2 mb-2">
                                        <button
                                            className="px-2 py-1 bg-blue-700 rounded text-xs"
                                            onClick={() => updateOSSettings('macOS', 'mouse', 'scrollEaseFactor', Math.max(0.01, macOSSettings.mouse.scrollEaseFactor - 0.01))}
                                        >
                                            –
                                        </button>
                                        <input
                                            type="range"
                                            min="0.01"
                                            max="1"
                                            step="0.01"
                                            value={macOSSettings.mouse.scrollEaseFactor}
                                            onChange={(e) => updateOSSettings('macOS', 'mouse', 'scrollEaseFactor', parseFloat(e.target.value))}
                                            className="w-full"
                                        />
                                        <button
                                            className="px-2 py-1 bg-blue-700 rounded text-xs"
                                            onClick={() => updateOSSettings('macOS', 'mouse', 'scrollEaseFactor', Math.min(1, macOSSettings.mouse.scrollEaseFactor + 0.01))}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <label className="block text-xs mb-1">
                                        Минимальный шаг: {macOSSettings.mouse.minScrollStep}px
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-2 py-1 bg-blue-700 rounded text-xs"
                                            onClick={() => updateOSSettings('macOS', 'mouse', 'minScrollStep', Math.max(1, macOSSettings.mouse.minScrollStep - 1))}
                                        >
                                            –
                                        </button>
                                        <input
                                            type="range"
                                            min="1"
                                            max="200"
                                            step="1"
                                            value={macOSSettings.mouse.minScrollStep}
                                            onChange={(e) => updateOSSettings('macOS', 'mouse', 'minScrollStep', parseInt(e.target.value))}
                                            className="w-full"
                                        />
                                        <button
                                            className="px-2 py-1 bg-blue-700 rounded text-xs"
                                            onClick={() => updateOSSettings('macOS', 'mouse', 'minScrollStep', Math.min(200, macOSSettings.mouse.minScrollStep + 1))}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* macOS Trackpad Settings */}
                                <div className="mb-4 p-3 bg-blue-900/10 rounded border border-blue-600/20">
                                    <h5 className="text-xs font-bold mb-2 text-blue-400">Тачпад (macOS)</h5>

                                    <label className="block text-xs mb-1">
                                        Порог остановки: {macOSSettings.trackpad.scrollStopThreshold.toFixed(2)}
                                    </label>
                                    <div className="flex items-center gap-2 mb-2">
                                        <button
                                            className="px-2 py-1 bg-blue-700 rounded text-xs"
                                            onClick={() => updateOSSettings('macOS', 'trackpad', 'scrollStopThreshold', Math.max(0.01, macOSSettings.trackpad.scrollStopThreshold - 0.01))}
                                        >
                                            –
                                        </button>
                                        <input
                                            type="range"
                                            max="5"
                                            step="0.01"
                                            value={macOSSettings.trackpad.scrollStopThreshold}
                                            onChange={(e) => updateOSSettings('macOS', 'trackpad', 'scrollStopThreshold', parseFloat(e.target.value))}
                                            className="w-full"
                                        />
                                        <button
                                            className="px-2 py-1 bg-blue-700 rounded text-xs"
                                            onClick={() => updateOSSettings('macOS', 'trackpad', 'scrollStopThreshold', Math.min(5, macOSSettings.trackpad.scrollStopThreshold + 0.01))}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <label className="block text-xs mb-1">
                                        Фактор плавности: {macOSSettings.trackpad.scrollEaseFactor.toFixed(2)}
                                    </label>
                                    <div className="flex items-center gap-2 mb-2">
                                        <button
                                            className="px-2 py-1 bg-blue-700 rounded text-xs"
                                            onClick={() => updateOSSettings('macOS', 'trackpad', 'scrollEaseFactor', Math.max(0.01, macOSSettings.trackpad.scrollEaseFactor - 0.01))}
                                        >
                                            –
                                        </button>
                                        <input
                                            type="range"
                                            min="0.01"
                                            max="1"
                                            step="0.01"
                                            value={macOSSettings.trackpad.scrollEaseFactor}
                                            onChange={(e) => updateOSSettings('macOS', 'trackpad', 'scrollEaseFactor', parseFloat(e.target.value))}
                                            className="w-full"
                                        />
                                        <button
                                            className="px-2 py-1 bg-blue-700 rounded text-xs"
                                            onClick={() => updateOSSettings('macOS', 'trackpad', 'scrollEaseFactor', Math.min(1, macOSSettings.trackpad.scrollEaseFactor + 0.01))}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <label className="block text-xs mb-1">
                                        Минимальный шаг: {macOSSettings.trackpad.minScrollStep}px
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-2 py-1 bg-blue-700 rounded text-xs"
                                            onClick={() => updateOSSettings('macOS', 'trackpad', 'minScrollStep', Math.max(1, macOSSettings.trackpad.minScrollStep - 1))}
                                        >
                                            –
                                        </button>
                                        <input
                                            type="range"
                                            min="1"
                                            max="200"
                                            step="1"
                                            value={macOSSettings.trackpad.minScrollStep}
                                            onChange={(e) => updateOSSettings('macOS', 'trackpad', 'minScrollStep', parseInt(e.target.value))}
                                            className="w-full"
                                        />
                                        <button
                                            className="px-2 py-1 bg-blue-700 rounded text-xs"
                                            onClick={() => updateOSSettings('macOS', 'trackpad', 'minScrollStep', Math.min(200, macOSSettings.trackpad.minScrollStep + 1))}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-6">
                                <h4 className="text-sm font-bold mb-3 border-b border-gray-600 pb-1 text-green-300">
                                    Настройки для Windows
                                </h4>

                                {/* Windows Mouse Settings */}
                                <div className="mb-4 p-3 bg-green-900/10 rounded border border-green-600/20">
                                    <h5 className="text-xs font-bold mb-2 text-green-400">Мышь (Windows)</h5>

                                    <label className="block text-xs mb-1">
                                        Порог остановки: {windowsSettings.mouse.scrollStopThreshold.toFixed(2)}
                                    </label>
                                    <div className="flex items-center gap-2 mb-2">
                                        <button
                                            className="px-2 py-1 bg-green-700 rounded text-xs"
                                            onClick={() => updateOSSettings('Windows', 'mouse', 'scrollStopThreshold', Math.max(0.01, windowsSettings.mouse.scrollStopThreshold - 0.01))}
                                        >
                                            –
                                        </button>
                                        <input
                                            type="range"
                                            max="5"
                                            step="0.01"
                                            value={windowsSettings.mouse.scrollStopThreshold}
                                            onChange={(e) => updateOSSettings('Windows', 'mouse', 'scrollStopThreshold', parseFloat(e.target.value))}
                                            className="w-full"
                                        />
                                        <button
                                            className="px-2 py-1 bg-green-700 rounded text-xs"
                                            onClick={() => updateOSSettings('Windows', 'mouse', 'scrollStopThreshold', Math.min(5, windowsSettings.mouse.scrollStopThreshold + 0.01))}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <label className="block text-xs mb-1">
                                        Фактор плавности: {windowsSettings.mouse.scrollEaseFactor.toFixed(2)}
                                        (Авто: {getAutoSmoothFactor(refreshRate).toFixed(2)})
                                    </label>
                                    <div className="flex items-center gap-2 mb-2">
                                        <button
                                            className="px-2 py-1 bg-green-700 rounded text-xs"
                                            onClick={() => updateOSSettings('Windows', 'mouse', 'scrollEaseFactor', Math.max(0.01, windowsSettings.mouse.scrollEaseFactor - 0.01))}
                                        >
                                            –
                                        </button>
                                        <input
                                            type="range"
                                            min="0.01"
                                            max="1"
                                            step="0.01"
                                            value={windowsSettings.mouse.scrollEaseFactor}
                                            onChange={(e) => updateOSSettings('Windows', 'mouse', 'scrollEaseFactor', parseFloat(e.target.value))}
                                            className="w-full"
                                        />
                                        <button
                                            className="px-2 py-1 bg-green-700 rounded text-xs"
                                            onClick={() => updateOSSettings('Windows', 'mouse', 'scrollEaseFactor', Math.min(1, windowsSettings.mouse.scrollEaseFactor + 0.01))}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <label className="block text-xs mb-1">
                                        Минимальный шаг: {windowsSettings.mouse.minScrollStep}px
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-2 py-1 bg-green-700 rounded text-xs"
                                            onClick={() => updateOSSettings('Windows', 'mouse', 'minScrollStep', Math.max(1, windowsSettings.mouse.minScrollStep - 1))}
                                        >
                                            –
                                        </button>
                                        <input
                                            type="range"
                                            min="1"
                                            max="200"
                                            step="1"
                                            value={windowsSettings.mouse.minScrollStep}
                                            onChange={(e) => updateOSSettings('Windows', 'mouse', 'minScrollStep', parseInt(e.target.value))}
                                            className="w-full"
                                        />
                                        <button
                                            className="px-2 py-1 bg-green-700 rounded text-xs"
                                            onClick={() => updateOSSettings('Windows', 'mouse', 'minScrollStep', Math.min(200, windowsSettings.mouse.minScrollStep + 1))}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Windows Trackpad Settings */}
                                <div className="mb-4 p-3 bg-green-900/10 rounded border border-green-600/20">
                                    <h5 className="text-xs font-bold mb-2 text-green-400">Тачпад (Windows)</h5>

                                    <label className="block text-xs mb-1">
                                        Порог остановки: {windowsSettings.trackpad.scrollStopThreshold.toFixed(2)}
                                    </label>
                                    <div className="flex items-center gap-2 mb-2">
                                        <button
                                            className="px-2 py-1 bg-green-700 rounded text-xs"
                                            onClick={() => updateOSSettings('Windows', 'trackpad', 'scrollStopThreshold', Math.max(0.01, windowsSettings.trackpad.scrollStopThreshold - 0.01))}
                                        >
                                            –
                                        </button>
                                        <input
                                            type="range"
                                            max="5"
                                            step="0.01"
                                            value={windowsSettings.trackpad.scrollStopThreshold}
                                            onChange={(e) => updateOSSettings('Windows', 'trackpad', 'scrollStopThreshold', parseFloat(e.target.value))}
                                            className="w-full"
                                        />
                                        <button
                                            className="px-2 py-1 bg-green-700 rounded text-xs"
                                            onClick={() => updateOSSettings('Windows', 'trackpad', 'scrollStopThreshold', Math.min(5, windowsSettings.trackpad.scrollStopThreshold + 0.01))}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <label className="block text-xs mb-1">
                                        Фактор плавности: {windowsSettings.trackpad.scrollEaseFactor.toFixed(2)}
                                        (Авто: {getAutoSmoothFactor(refreshRate).toFixed(2)})
                                    </label>
                                    <div className="flex items-center gap-2 mb-2">
                                        <button
                                            className="px-2 py-1 bg-green-700 rounded text-xs"
                                            onClick={() => updateOSSettings('Windows', 'trackpad', 'scrollEaseFactor', Math.max(0.01, windowsSettings.trackpad.scrollEaseFactor - 0.01))}
                                        >
                                            –
                                        </button>
                                        <input
                                            type="range"
                                            min="0.01"
                                            max="1"
                                            step="0.01"
                                            value={windowsSettings.trackpad.scrollEaseFactor}
                                            onChange={(e) => updateOSSettings('Windows', 'trackpad', 'scrollEaseFactor', parseFloat(e.target.value))}
                                            className="w-full"
                                        />
                                        <button
                                            className="px-2 py-1 bg-green-700 rounded text-xs"
                                            onClick={() => updateOSSettings('Windows', 'trackpad', 'scrollEaseFactor', Math.min(1, windowsSettings.trackpad.scrollEaseFactor + 0.01))}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <label className="block text-xs mb-1">
                                        Минимальный шаг: {windowsSettings.trackpad.minScrollStep}px
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-2 py-1 bg-green-700 rounded text-xs"
                                            onClick={() => updateOSSettings('Windows', 'trackpad', 'minScrollStep', Math.max(1, windowsSettings.trackpad.minScrollStep - 1))}
                                        >
                                            –
                                        </button>
                                        <input
                                            type="range"
                                            min="1"
                                            max="200"
                                            step="1"
                                            value={windowsSettings.trackpad.minScrollStep}
                                            onChange={(e) => updateOSSettings('Windows', 'trackpad', 'minScrollStep', parseInt(e.target.value))}
                                            className="w-full"
                                        />
                                        <button
                                            className="px-2 py-1 bg-green-700 rounded text-xs"
                                            onClick={() => updateOSSettings('Windows', 'trackpad', 'minScrollStep', Math.min(200, windowsSettings.trackpad.minScrollStep + 1))}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {/* CURRENT ACTIVE SETTINGS */}
                    <div className="mb-6 p-3 bg-purple-900/20 rounded-lg border border-purple-600/30">
                        <h4 className="text-sm font-bold mb-2 text-purple-300">
                            Активные настройки ({currentOS} - {isTrackpad ? 'Тачпад' : 'Мышь'})
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>Порог остановки: <span
                                className="font-mono text-purple-400">{currentSettings.scrollStopThreshold.toFixed(2)}</span>
                            </div>
                            <div>Фактор плавности: <span
                                className="font-mono text-purple-400">{currentSettings.scrollEaseFactor.toFixed(2)}</span>
                            </div>
                            <div>Минимальный шаг: <span
                                className="font-mono text-purple-400">{currentSettings.minScrollStep}px</span></div>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}

// Оптимизированный код для SmoothScroll компонента

// 'use client';
// import React, { useEffect, useState, useCallback } from "react";
// import { usePathname } from "next/navigation";
// import { useCustomScroll } from "@/components/hooks/useCustomScroll";
// import { useIsMobile } from "@/components/hooks/useIsMobile";
//
// interface SmoothScrollProps {
//     children: React.ReactNode;
// }
//
// export default function SmoothScroll({ children }: SmoothScrollProps) {
//     const pathname = usePathname();
//     const isMobile = useIsMobile(768);
//     const [showScrollbar, setShowScrollbar] = useState(true);
//     const [isTrackpad, setIsTrackpad] = useState(false);
//
//     const mouseSettings = { scrollEaseFactor: 0.25 };
//     const trackpadSettings = { scrollEaseFactor: 0.5 };
//     const delaySettings = { detectionDelay: 40, routeChangeDelay: 40 };
//
//     const getScrollOffset = useCallback(() => {
//         if (pathname.includes("/policy") || pathname.includes("/organizations"))
//             return -115;
//         if (pathname.includes("/blogPage")) return -174;
//         if (pathname.includes("/organizations/where-do-you-lose")) return -110;
//         if (pathname.includes("/editors")) return 90;
//         return 120;
//     }, [pathname]);
//
//     const { scrollbarRef: customScrollbarRef } = useCustomScroll({
//         smoothScrollFactor: isTrackpad
//             ? trackpadSettings.scrollEaseFactor
//             : mouseSettings.scrollEaseFactor,
//         scrollPadding: 2,
//         enabled: showScrollbar && !isMobile,
//         target: "window",
//         getScrollOffset,
//     });
//
//     // detect input device
//     useEffect(() => {
//         if (isMobile) return;
//         let detectionTimeout: NodeJS.Timeout;
//
//         const wheelEvents: number[] = [];
//         const wheelTimestamps: number[] = [];
//
//         const detectInputDevice = (e: WheelEvent) => {
//             const currentTime = Date.now();
//             wheelEvents.push(Math.abs(e.deltaY));
//             wheelTimestamps.push(currentTime);
//
//             if (wheelEvents.length > 10) {
//                 wheelEvents.shift();
//                 wheelTimestamps.shift();
//             }
//
//             clearTimeout(detectionTimeout);
//             detectionTimeout = setTimeout(() => {
//                 if (wheelEvents.length < 5) return;
//                 const avgDelta =
//                     wheelEvents.reduce((a, b) => a + b, 0) / wheelEvents.length;
//                 const maxDelta = Math.max(...wheelEvents);
//                 const minDelta = Math.min(...wheelEvents);
//                 const deltaVariance = maxDelta - minDelta;
//
//                 const intervals = wheelTimestamps
//                     .slice(1)
//                     .map((t, i) => t - wheelTimestamps[i]);
//                 const avgInterval =
//                     intervals.length > 0
//                         ? intervals.reduce((a, b) => a + b, 0) / intervals.length
//                         : 0;
//
//                 const isMac = /Mac/i.test(navigator.platform);
//                 const isWindows = /Win/i.test(navigator.platform);
//
//                 let isLikelyTrackpad = false;
//                 if (isMac) {
//                     isLikelyTrackpad =
//                         avgDelta < 50 && deltaVariance < 30 && avgInterval < 50;
//                 } else if (isWindows) {
//                     isLikelyTrackpad =
//                         (avgDelta < 120 && deltaVariance < 100 && avgInterval < 30) ||
//                         (avgDelta < 30 && e.deltaMode === 0);
//                 } else {
//                     isLikelyTrackpad = avgDelta < 80 && deltaVariance < 60;
//                 }
//
//                 setIsTrackpad(isLikelyTrackpad);
//             }, delaySettings.detectionDelay);
//         };
//
//         window.addEventListener("wheel", detectInputDevice, { passive: true });
//         return () => {
//             window.removeEventListener("wheel", detectInputDevice);
//             clearTimeout(detectionTimeout);
//         };
//     }, [isMobile]);
//
//     // hide scrollbar on some pages - может быть понадобится
//     // useEffect(() => {
//     //     const hideScrollPaths = [
//     //         "/pricing",
//     //         "/auth/login",
//     //         "/auth/register",
//     //         "/auth/forgot-password",
//     //     ];
//     //     const shouldHideScrollbar = hideScrollPaths.some(
//     //         (path) => pathname === path || pathname.startsWith(path)
//     //     );
//     //
//     //     if (!isMobile) {
//     //         document.body.style.overflow = shouldHideScrollbar ? "hidden" : "";
//     //         setShowScrollbar(!shouldHideScrollbar);
//     //     } else {
//     //         document.body.style.overflow = "";
//     //         setShowScrollbar(false);
//     //     }
//     //
//     //     const timeout1 = setTimeout(
//     //         () => window.dispatchEvent(new Event("scroll")),
//     //         delaySettings.routeChangeDelay
//     //     );
//     //     const timeout2 = setTimeout(
//     //         () => window.dispatchEvent(new Event("scroll")),
//     //         delaySettings.routeChangeDelay * 6
//     //     );
//     //
//     //     return () => {
//     //         clearTimeout(timeout1);
//     //         clearTimeout(timeout2);
//     //         if (!isMobile) document.body.style.overflow = "";
//     //     };
//     // }, [pathname, isMobile]);
//
//     return (
//         <>
//             {children}
//             {showScrollbar && !isMobile && (
//                 <div ref={customScrollbarRef} className="scrollbar md:block hidden" />
//             )}
//         </>
//     );
// }
