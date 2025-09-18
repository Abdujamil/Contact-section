// Функция с настройками плавной прокрутки с учетом различных устройств ввода

// Main
'use client';
import React, {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import {useCustomScroll} from "@/components/hooks/useCustomScroll";
import { useRefreshRate} from "@/components/hooks/useRefreshRate";

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


export default function SmoothScroll({children}: SmoothScrollProps) {
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [showScrollbar, setShowScrollbar] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const { refreshRate, isDetecting, smoothScrollFactor: autoSmoothFactor } = useRefreshRate();

    // Состояния для drag-to-scroll
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartY, setDragStartY] = useState(0);
    const [dragStartScrollTop, setDragStartScrollTop] = useState(0);

    const [isTrackpad, setIsTrackpad] = useState(false);
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

    const [mouseSettings, setMouseSettings] = useState({
        scrollStopThreshold: 0.5,
        scrollEaseFactor: 0.25,
        minScrollStep: 1,
    });

    const [trackpadSettings, setTrackpadSettings] = useState({
        scrollStopThreshold: 0.0,
        scrollEaseFactor: 0.50,
        minScrollStep: 1
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

    // const { scrollbarRef: customScrollbarRef } = useCustomScroll({
    //     smoothScrollFactor: isTrackpad ? trackpadSettings.scrollEaseFactor : mouseSettings.scrollEaseFactor,
    //     enabled: showScrollbar && !isMobile,
    //     target: 'window'
    // });

    const getScrollOffset = React.useCallback(() => {
        if (pathname.includes('/policy') || pathname.includes('/organizations')) return -115;
        if (pathname.includes('/blogPage')) return -174;
        if (pathname.includes('/organizations/where-do-you-lose')) return -110;
        if (pathname.includes('/editors')) return 90;
        return 120;
    }, [pathname]);

    const { scrollbarRef: customScrollbarRef } = useCustomScroll({
        smoothScrollFactor: isTrackpad ? trackpadSettings.scrollEaseFactor : mouseSettings.scrollEaseFactor,
        scrollPadding: 2, // или ваше значение
        enabled: showScrollbar && !isMobile,
        target: 'window',
        getScrollOffset // Передаем вашу функцию offset
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

                    const isWindows = navigator.platform.toLowerCase().includes('win') ||
                        navigator.userAgent.toLowerCase().includes('windows');
                    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
                        navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;

                    let isLikelyTrackpad = false;
                    let isLikelyMouse = false;

                    if (isMac) {
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
                    } else if (isWindows) {
                        isLikelyTrackpad =
                            (avgDelta < 120 && deltaVariance < 100 && avgInterval < 30) ||
                            (avgDelta < 30 && e.deltaMode === 0);

                        isLikelyMouse =
                            (avgDelta >= 120 && (deltaVariance > 100 || avgInterval > 50)) ||
                            (e.deltaMode === 1) ||
                            (avgDelta === 120 && deltaVariance === 0);
                    } else {
                        isLikelyTrackpad =
                            avgDelta < 80 &&
                            deltaVariance < 60 &&
                            e.deltaMode === 0;

                        isLikelyMouse =
                            avgDelta > 100 ||
                            deltaVariance > 80 ||
                            e.deltaMode !== 0;
                    }

                    if (isLikelyTrackpad) {
                        setIsTrackpad(true);
                    } else if (isLikelyMouse) {
                        setIsTrackpad(false);
                    }
                }
            }, delayValue);
        };

        const isWindows = navigator.platform.toLowerCase().includes('win') ||
            navigator.userAgent.toLowerCase().includes('windows');
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
            navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;

        if (isMac) {
            setIsTrackpad(true);
        } else if (isWindows) {
            setIsTrackpad(false);
        }

        window.addEventListener('wheel', detectInputDevice, {passive: true});

        return () => {
            window.removeEventListener('wheel', detectInputDevice);
            clearTimeout(detectionTimeout);
        };
    }, [delaySettings.detectionDelay, isMobile]);

    useEffect(() => {
        const hideScrollPaths = [
            // '/contacts/connection',
            '/pricing',
            // '/auth/login',
            // '/auth/register',
            // '/auth/forgot-password'
        ];

        const shouldHideScrollbar = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));

        // На мобилках не блокируем overflow
        if (window.screen.width > 768 && !isMobile) {
            document.body.style.overflow = shouldHideScrollbar ? 'hidden' : '';
            setShowScrollbar(!shouldHideScrollbar);
        } else {
            // На мобилках разрешаем нативный скролл
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

        // Вычисляем коэффициент прокрутки
        const scrollRatio = deltaY / clientHeight;
        const newScrollTop = dragStartScrollTop + (scrollRatio * scrollHeight);

        // Ограничиваем значения
        const clampedScrollTop = Math.max(0, Math.min(newScrollTop, maxScroll));

        window.scrollTo(0, clampedScrollTop);
    }, [isDragging, dragStartY, dragStartScrollTop]);

    const handleMouseUp = React.useCallback(() => {
        if (!isDragging) return;

        setIsDragging(false);

        // Возвращаем нормальный курсор
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }, [isDragging]);

    // Добавляем обработчики мыши для drag-to-scroll
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
        // На мобилках используем нативный скролл
        if (isMobile) return;

        if (!scrollbarRef.current) return;

        let currentScroll = window.scrollY;
        let targetScroll = currentScroll;
        let isScrolling = false;
        let lastUpdateTime = 0;
        let rafId: number | null = null;

        const initScroll = () => {
            currentScroll = window.scrollY;
            targetScroll = currentScroll;
        };

        const handleWheel = (e: WheelEvent) => {
            // Игнорируем wheel события во время drag
            if (isDragging) return;

            if ((e.target as HTMLElement).closest('textarea, .allow-native-scroll')) return;

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            const settings = isTrackpad ? trackpadSettings : mouseSettings;
            const scrollStep = Math.sign(e.deltaY) * Math.max(Math.abs(e.deltaY), settings.minScrollStep);
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

                    if (absDiff < settings.scrollStopThreshold) {
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
                    const adjustedEase = settings.scrollEaseFactor * timeMultiplier;

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

                        const settings = isTrackpad ? trackpadSettings : mouseSettings;

                        if (!isScrolling) {
                            isScrolling = true;
                            const animate = () => {
                                const diff = targetScroll - currentScroll;
                                if (Math.abs(diff) < settings.scrollStopThreshold) {
                                    currentScroll = targetScroll;
                                    window.scrollTo(0, Math.round(currentScroll * 100) / 100);
                                    isScrolling = false;
                                    return;
                                }

                                currentScroll += diff * settings.scrollEaseFactor;
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
    }, [isTrackpad, trackpadSettings, mouseSettings, pathname, getScrollOffset, delaySettings, isMobile, isDragging]);

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

    return (
        <>
            {children}
            {showScrollbar && !isMobile && (
                <div
                    // ref={scrollbarRef}
                    ref={customScrollbarRef}
                    className={`scrollbar md:block hidden`}
                />
            )}

            {/* Кнопки управления */}
            <div className="fixed top-[90%] right-4 z-[10000000000]  gap-2">
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

            {/*  ENHANCED SETTINGS PANEL */}
            {isOpen && (
                <div
                    className="fixed top-[70px] right-4 backdrop-blur-2xl border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 z-[9999999999] w-96 max-h-[80vh] overflow-y-auto allow-native-scroll">
                    <h3 className="text-lg font-semibold ">
                        Настройки прокрутки ({isTrackpad ? 'Тачпад' : 'Мышка'})
                    </h3>

                    {/* ===== TRACKPAD DEBUG INFO ===== */}
                    <div className="mb-6 p-3  bg-gray-800 rounded-lg">
                        <h4 className="text-sm font-bold mb-2 ">Отладка трекпада</h4>

                        {/* OS Detection */}
                        <div className="mb-2 p-2 bg-blue-900/20 rounded text-xs">
                            <strong>ОС:</strong> {
                            navigator.platform.toLowerCase().includes('win') || navigator.userAgent.toLowerCase().includes('windows') ? 'Windows' :
                                navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? 'macOS' : 'Other'
                        } | <strong>Платформа:</strong> {navigator.platform}
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>deltaY: <span
                                className="font-mono">{trackpadDebugInfo.deltaY.toFixed(1)}</span></div>
                            <div>deltaX: <span
                                className="font-mono">{trackpadDebugInfo.deltaX.toFixed(1)}</span></div>
                            <div>deltaMode: <span className="font-mono">{trackpadDebugInfo.deltaMode}</span>
                            </div>
                            <div>Частота: <span
                                className="font-mono">{trackpadDebugInfo.frequency.toFixed(1)}Hz</span>
                            </div>
                            <div>Среднее Δ: <span
                                className="font-mono">{trackpadDebugInfo.avgDelta.toFixed(1)}</span>
                            </div>
                            <div>Вариация: <span
                                className="font-mono">{trackpadDebugInfo.deltaVariance.toFixed(1)}</span>
                            </div>
                            <div>Событий: <span className="font-mono">{trackpadDebugInfo.eventCount}</span>
                            </div>
                            <div>Мин/Макс: <span
                                className="font-mono">{trackpadDebugInfo.minDelta.toFixed(1)}/{trackpadDebugInfo.maxDelta.toFixed(1)}</span>
                            </div>
                        </div>

                        {/* Device Detection Logic */}
                        <div className="mt-2 p-2 bg-yellow-900/20 rounded text-xs">
                            <div className="flex justify-between">
                                <span>Детекция:</span>
                                <span
                                    className={`font-bold ${isTrackpad ? 'text-green-600' : 'text-blue-600'}`}>
                                {isTrackpad ? 'Тачпад' : 'Мышь'}
                            </span>
                            </div>
                            {navigator.platform.toLowerCase().includes('win') && (
                                <div className="text-xs text-gray-400 mt-1">
                                    Windows критерии: avgΔ{trackpadDebugInfo.avgDelta < 120 ? '<120✓' : '≥120✗'},
                                    var{trackpadDebugInfo.deltaVariance < 100 ? '<100✓' : '≥100✗'},
                                    freq{trackpadDebugInfo.frequency > 33 ? '>33Hz✓' : '≤33Hz✗'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ===== DELAY SETTINGS ===== */}
                    <div className="mb-6">
                        <h4 className="text-sm font-bold mb-3 border-b border-gray-600 pb-1">Управление
                            задержками</h4>

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
                                            className="px-2 py-1  bg-gray-600 rounded text-xs"
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

                    {/* ===== MOUSE SETTINGS ===== */}
                    <div className="mb-6">
                        <h4 className="text-sm border-b font-bold mb-2 text-gray-300">Настройки для
                            мышки</h4>

                        <label className="block text-xs mb-1">Порог
                            остановки: {mouseSettings.scrollStopThreshold.toFixed(2)}</label>
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                className="px-2 py-1  dark:bg-[#333333] rounded"
                                onClick={() =>
                                    setMouseSettings({
                                        ...mouseSettings,
                                        scrollStopThreshold: Math.max(0.01, mouseSettings.scrollStopThreshold - 0.01),
                                    })
                                }
                            >
                                –
                            </button>
                            <input
                                type="range"
                                // min="0.001"
                                max="5"
                                step="0.01"
                                value={mouseSettings.scrollStopThreshold}
                                onChange={(e) =>
                                    setMouseSettings({
                                        ...mouseSettings,
                                        scrollStopThreshold: parseFloat(e.target.value),
                                    })
                                }
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1 dark:bg-[#333333] rounded"
                                onClick={() =>
                                    setMouseSettings({
                                        ...mouseSettings,
                                        scrollStopThreshold: Math.min(5, mouseSettings.scrollStopThreshold + 0.01),
                                    })
                                }
                            >
                                +
                            </button>
                        </div>

                        <label className="block text-xs mb-1">Фактор
                            плавности: {mouseSettings.scrollEaseFactor.toFixed(2)}</label>
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                className="px-2 py-1  dark:bg-[#333333] rounded"
                                onClick={() =>
                                    setMouseSettings({
                                        ...mouseSettings,
                                        scrollEaseFactor: Math.max(0.01, mouseSettings.scrollEaseFactor - 0.01),
                                    })
                                }
                            >
                                –
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={mouseSettings.scrollEaseFactor}
                                onChange={(e) =>
                                    setMouseSettings({
                                        ...mouseSettings,
                                        scrollEaseFactor: parseFloat(e.target.value),
                                    })
                                }
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1  dark:bg-[#333333] rounded"
                                onClick={() =>
                                    setMouseSettings({
                                        ...mouseSettings,
                                        scrollEaseFactor: Math.min(1, mouseSettings.scrollEaseFactor + 0.01),
                                    })
                                }
                            >
                                +
                            </button>
                        </div>

                        <label className="block text-xs mb-1">Минимальный
                            шаг: {mouseSettings.minScrollStep}px</label>
                        <div className="flex items-center gap-2 mb-6">
                            <button
                                className="px-2 py-1  dark:bg-[#333333] rounded"
                                onClick={() =>
                                    setMouseSettings({
                                        ...mouseSettings,
                                        minScrollStep: Math.max(1, mouseSettings.minScrollStep - 1),
                                    })
                                }
                            >
                                –
                            </button>
                            <input
                                type="range"
                                min="1"
                                max="200"
                                step="1"
                                value={mouseSettings.minScrollStep}
                                onChange={(e) =>
                                    setMouseSettings({
                                        ...mouseSettings,
                                        minScrollStep: parseInt(e.target.value),
                                    })
                                }
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1  dark:bg-[#333333] rounded"
                                onClick={() =>
                                    setMouseSettings({
                                        ...mouseSettings,
                                        minScrollStep: Math.min(200, mouseSettings.minScrollStep + 1),
                                    })
                                }
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* ===== TRACKPAD SETTINGS ===== */}
                    <div>
                        <h4 className="text-sm border-b font-bold mb-2 text-gray-300">Настройки для
                            тачпада</h4>

                        <label className="block text-xs mb-1">Порог
                            остановки: {trackpadSettings.scrollStopThreshold.toFixed(2)}</label>
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                className="px-2 py-1  dark:bg-[#333333] rounded"
                                onClick={() =>
                                    setTrackpadSettings({
                                        ...trackpadSettings,
                                        scrollStopThreshold: Math.max(0.01, trackpadSettings.scrollStopThreshold - 0.01),
                                    })
                                }
                            >
                                –
                            </button>
                            <input
                                type="range"
                                // min="0.001"
                                max="5"
                                step="0.01"
                                value={trackpadSettings.scrollStopThreshold}
                                onChange={(e) =>
                                    setTrackpadSettings({
                                        ...trackpadSettings,
                                        scrollStopThreshold: parseFloat(e.target.value),
                                    })
                                }
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1  dark:bg-[#333333] rounded"
                                onClick={() =>
                                    setTrackpadSettings({
                                        ...trackpadSettings,
                                        scrollStopThreshold: Math.min(5, trackpadSettings.scrollStopThreshold + 0.01),
                                    })
                                }
                            >
                                +
                            </button>
                        </div>

                        <label className="block text-xs mb-1">Фактор
                            плавности: {trackpadSettings.scrollEaseFactor.toFixed(2)}</label>
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                className="px-2 py-1  dark:bg-[#333333] rounded"
                                onClick={() =>
                                    setTrackpadSettings({
                                        ...trackpadSettings,
                                        scrollEaseFactor: Math.max(0.01, trackpadSettings.scrollEaseFactor - 0.01),
                                    })
                                }
                            >
                                –
                            </button>
                            <input
                                type="range"
                                min="0.01"
                                max="1"
                                step="0.01"
                                value={trackpadSettings.scrollEaseFactor}
                                onChange={(e) =>
                                    setTrackpadSettings({
                                        ...trackpadSettings,
                                        scrollEaseFactor: parseFloat(e.target.value),
                                    })
                                }
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1  dark:bg-[#333333] rounded"
                                onClick={() =>
                                    setTrackpadSettings({
                                        ...trackpadSettings,
                                        scrollEaseFactor: Math.min(1, trackpadSettings.scrollEaseFactor + 0.01),
                                    })
                                }
                            >
                                +
                            </button>
                        </div>

                        <label className="block text-xs mb-1">Минимальный
                            шаг: {trackpadSettings.minScrollStep}px</label>
                        <div className="flex items-center gap-2">
                            <button
                                className="px-2 py-1  dark:bg-[#333333] rounded"
                                onClick={() =>
                                    setTrackpadSettings({
                                        ...trackpadSettings,
                                        minScrollStep: Math.max(1, trackpadSettings.minScrollStep - 1),
                                    })
                                }
                            >
                                –
                            </button>
                            <input
                                type="range"
                                min="1"
                                max="200"
                                step="1"
                                value={trackpadSettings.minScrollStep}
                                onChange={(e) =>
                                    setTrackpadSettings({
                                        ...trackpadSettings,
                                        minScrollStep: parseInt(e.target.value),
                                    })
                                }
                                className="w-full"
                            />
                            <button
                                className="px-2 py-1  dark:bg-[#333333] rounded"
                                onClick={() =>
                                    setTrackpadSettings({
                                        ...trackpadSettings,
                                        minScrollStep: Math.min(200, trackpadSettings.minScrollStep + 1),
                                    })
                                }
                            >
                                +
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

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
//         scrollStopThreshold: 0.5,
//         scrollEaseFactor: 0.25,
//         minScrollStep: 1
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
//     // Функция для определения фактора плавности по герцовке
//     const getAutoSmoothFactor = (rate: number): number => {
//         if (rate <= 129) return 0.25;
//         if (rate <= 199) return 0.20;
//         return 0.10;
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
