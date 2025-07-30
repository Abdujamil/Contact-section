// 'use client'
// import React, {useEffect, useRef, useState} from "react";
// import {usePathname} from "next/navigation";

// interface SmoothScrollProps {
//     children: React.ReactNode;
// }

// export default function SmoothScroll({children}: SmoothScrollProps) {
//     const scrollbarRef = useRef<HTMLDivElement>(null);
//     const [showScrollbar, setShowScrollbar] = useState(true);
//     const pathname = usePathname();

//     useEffect(() => {
//         const hideScrollPaths = [
//             '/contacts/connection',
//             '/pricing',
//             '/auth/login',
//             '/auth/register', 
//             '/auth/forgot-password'
//         ];

//         const shouldHideScrollbar = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));

//         document.body.style.overflow = shouldHideScrollbar ? 'hidden' : '';
//         setShowScrollbar(!shouldHideScrollbar);

//         // Force scroll update after DOM changes
//         const timeout1 = setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 100);
//         const timeout2 = setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 300);

//         return () => {
//             clearTimeout(timeout1);
//             clearTimeout(timeout2);
//             document.body.style.overflow = '';
//         };
//     }, [pathname]);

//     useEffect(() => {
//         if (pathname.startsWith('/auth')) {
//             // Принудительно прокручиваем наверх
//             window.scrollTo(0, 0);
//             document.documentElement.scrollTop = 0; // на всякий случай
//         }
//     }, [pathname]);


//     const getScrollOffset = React.useCallback(() => {
//         if (pathname.includes('/policy') || pathname.includes('/organizations')) {
//             return -130;
//         }
//         if (pathname.includes('/blog')) {
//             return -188;
//         }
//         if (pathname.includes('/editors')) {
//             return 90;
//         }
//         return 120;
//     }, [pathname]);

//     useEffect(() => {
//         if (!scrollbarRef.current) return;

//         let currentScroll = 0;
//         let targetScroll = 0;
//         let isScrolling = false;
//         const scrollStopThreshold = 0.1;
        
//         // Adaptive easing based on refresh rate and device performance
//         const getAdaptiveEasing = () => {
//             // More sophisticated refresh rate detection
//             const isHighRefreshRate = window.matchMedia('(min-resolution: 120dpi)').matches || 
//                                     window.devicePixelRatio > 1.5;
            
//             // Check for reduced motion preference
//             const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
//             if (prefersReducedMotion) {
//                 return 0.4; // Faster for accessibility
//             }
            
//             // Adjust based on device performance hints
//             const connection = (navigator as Navigator & { connection?: { effectiveType: string } }).connection;
//             const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
            
//             if (isSlowConnection) {
//                 return 0.35; // Faster for slow connections
//             }
            
//             return isHighRefreshRate ? 0.15 : 0.25;
//         };
        
//         const scrollEaseFactor = getAdaptiveEasing();

//         const initScroll = () => {
//             currentScroll = window.scrollY;
//             targetScroll = currentScroll;
//         };

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

//         // ДОБАВЛЯЕМ: Обработчик кастомного события для скролла в начало
//         const handleCustomScrollToTop = () => {
//             targetScroll = 0;
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         };

//         // ДОБАВЛЯЕМ: Обработчик для установки конкретного targetScroll
//         const handleSetTargetScroll = (e: CustomEvent) => {
//             targetScroll = e.detail.targetScroll || 0;
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         };

//         const handleWheel = (e: WheelEvent) => {
//             const target = e.target as HTMLElement;

//             // Разрешаем нативный скролл внутри textarea и scrollable div
//             if (target.closest('textarea') || target.closest('.allow-native-scroll')) {
//                 return;
//             }

//             e.preventDefault();
//             targetScroll += e.deltaY;

//             const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//             targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         };

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

//                         if (!isScrolling) {
//                             isScrolling = true;
//                             requestAnimationFrame(smoothScroll);
//                         }
//                     }
//                 }
//             }
//         };

//         const handleScroll = () => {
//             if (!isScrolling) {
//                 currentScroll = window.scrollY;
//                 targetScroll = currentScroll;
//             }
//         };

//         // Весь остальной код скроллбара остается без изменений...
//         let isTicking = false;
//         let isDragging = false;
//         let startY = 0;
//         let startScrollTop = 0;
//         const scrollPadding = 4;
//         const scrollbar = scrollbarRef.current;

//         function updateScrollbar() {
//             const scrollTop = window.scrollY || window.pageYOffset;
//             const scrollHeight = document.documentElement.scrollHeight;
//             const clientHeight = window.innerHeight || document.documentElement.clientHeight;
//             const maxScroll = scrollHeight - clientHeight;

//             const hideScrollPaths = [
//                 '/contacts/connection',
//                 '/pricing', 
//                 // '/organizations',
//                 '/auth/login',
//                 '/auth/register',
//                 '/auth/forgot-password'
//             ];
//             const shouldHide = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));

//             setShowScrollbar(!shouldHide);

//             const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
//             const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
//             const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;

//             if (scrollbar) {
//                 scrollbar.style.setProperty('--scrollY', `${topPercent}px`);
//                 scrollbar.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
//             }
//         }

//         function scrollMove(e: TouchEvent | MouseEvent) {
//             if (!isDragging) return;

//             const scrollHeight = document.documentElement.scrollHeight;
//             const clientHeight = window.innerHeight || document.documentElement.clientHeight;
//             const maxScrollDrag = scrollHeight - clientHeight;
//             const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
//             const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;

//             let clientY = 0;
//             if (e instanceof TouchEvent) {
//                 clientY = e.touches[0].clientY;
//             } else {
//                 clientY = e.clientY;
//             }

//             const deltaY = clientY - startY;
//             const scrollDelta = (deltaY / maxTop) * maxScrollDrag;

//             targetScroll = Math.max(0, Math.min(startScrollTop + scrollDelta, maxScrollDrag));

//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         }

//         function startScroll(e: TouchEvent | MouseEvent) {
//             isDragging = true;
//             let clientY = 0;

//             if (e instanceof TouchEvent) {
//                 clientY = e.touches[0].clientY;
//             } else {
//                 clientY = e.clientY;
//             }

//             startY = clientY;
//             startScrollTop = window.scrollY || window.pageYOffset;
//             e.preventDefault();
//         }

//         function stopScroll() {
//             isDragging = false;
//         }

//         // Debounced scroll handler for better performance
//         let scrollTimeout: NodeJS.Timeout;
//         const scrollHandler = () => {
//             handleScroll();

//             if (!isTicking) {
//                 clearTimeout(scrollTimeout);
//                 scrollTimeout = setTimeout(() => {
//                     requestAnimationFrame(() => {
//                         updateScrollbar();
//                         isTicking = false;
//                     });
//                 }, 16); // ~60fps
//                 isTicking = true;
//             }
//         };

//         initScroll();
//         updateScrollbar();

//         // ДОБАВЛЯЕМ: Слушатели для кастомных событий
//         window.addEventListener('customScrollToTop', handleCustomScrollToTop);
//         window.addEventListener('setTargetScroll', handleSetTargetScroll as EventListener);

//         // ДОБАВЛЯЕМ: Слушатель для кастомного события скролла в начало
//         window.addEventListener('customScrollToTop', handleCustomScrollToTop);

//         window.addEventListener('wheel', handleWheel, {passive: false});
//         window.addEventListener('scroll', scrollHandler);
//         document.addEventListener('click', handleAnchorClick);
//         window.addEventListener('resize', updateScrollbar);

//         if (scrollbar) {
//             scrollbar.addEventListener('mousedown', startScroll);
//             scrollbar.addEventListener('touchstart', startScroll);
//         }

//         document.addEventListener('mousemove', scrollMove);
//         document.addEventListener('mouseup', stopScroll);
//         document.addEventListener('touchmove', scrollMove);
//         document.addEventListener('touchend', stopScroll);

//         return () => {
//             // ДОБАВЛЯЕМ: Очистка кастомных событий
//             window.removeEventListener('customScrollToTop', handleCustomScrollToTop);
//             window.removeEventListener('setTargetScroll', handleSetTargetScroll as EventListener);

//             window.removeEventListener('wheel', handleWheel);
//             window.removeEventListener('scroll', scrollHandler);
//             document.removeEventListener('click', handleAnchorClick);
//             window.removeEventListener('resize', updateScrollbar);

//             if (scrollbar) {
//                 scrollbar.removeEventListener('mousedown', startScroll);
//                 scrollbar.removeEventListener('touchstart', startScroll);
//             }

//             document.removeEventListener('mousemove', scrollMove);
//             document.removeEventListener('mouseup', stopScroll);
//             document.removeEventListener('touchmove', scrollMove);
//             document.removeEventListener('touchend', stopScroll);
            
//             // Cleanup timeout
//             clearTimeout(scrollTimeout);
//         };
//     }, [pathname, getScrollOffset]);

//     useEffect(() => {
//         // Reset scroll position on page change
//         window.scrollTo(0, 0);
//         document.documentElement.scrollTop = 0;
//         document.body.scrollTop = 0;
        
//         // Force scrollbar update after navigation
//         setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 50);
//     }, [pathname]);

//     return (
//         <>
//             {children}
//             {showScrollbar && <div ref={scrollbarRef} className="scrollbar md:block hidden"></div>}
//         </>
//     );
// }

'use client'
import React, {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";

interface SmoothScrollProps {
    children: React.ReactNode;
}

export default function SmoothScroll({children}: SmoothScrollProps) {
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const [showScrollbar, setShowScrollbar] = useState(true);
    const pathname = usePathname();

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

        // Force scroll update after DOM changes
        const timeout1 = setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, 100);
        const timeout2 = setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, 300);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            document.body.style.overflow = '';
        };
    }, [pathname]);

    useEffect(() => {
        if (pathname.startsWith('/auth')) {
            // Принудительно прокручиваем наверх
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0; // на всякий случай
        }
    }, [pathname]);

    const getScrollOffset = React.useCallback(() => {
        if (pathname.includes('/policy') || pathname.includes('/organizations')) {
            return -130;
        }
        if (pathname.includes('/blog')) {
            return -188;
        }
        if (pathname.includes('/editors')) {
            return 90;
        }
        return 120;
    }, [pathname]);

    useEffect(() => {
        if (!scrollbarRef.current) return;

        let currentScroll = 0;
        let targetScroll = 0;
        let isScrolling = false;
        let isUserScrolling = false; // NEW: Track if user is actively scrolling
        const scrollStopThreshold = 0.1;
        
        // Adaptive easing based on refresh rate and device performance
        const getAdaptiveEasing = () => {
            const isHighRefreshRate = window.matchMedia('(min-resolution: 120dpi)').matches || 
                                    window.devicePixelRatio > 1.5;
            
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (prefersReducedMotion) {
                return 0.4;
            }
            
            const connection = (navigator as Navigator & { connection?: { effectiveType: string } }).connection;
            const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
            
            if (isSlowConnection) {
                return 0.35;
            }
            
            return isHighRefreshRate ? 0.18 : 0.28; // Slightly increased for smoother feel
        };
        
        const scrollEaseFactor = getAdaptiveEasing();

        const initScroll = () => {
            currentScroll = window.scrollY;
            targetScroll = currentScroll;
        };

        const smoothScroll = () => {
            const diff = targetScroll - currentScroll;
            if (Math.abs(diff) < scrollStopThreshold) {
                currentScroll = targetScroll;
                window.scrollTo(0, currentScroll);
                isScrolling = false;
                return;
            }
            currentScroll += diff * scrollEaseFactor;
            window.scrollTo(0, currentScroll);
            requestAnimationFrame(smoothScroll);
        };

        // Custom event handlers
        const handleCustomScrollToTop = () => {
            targetScroll = 0;
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(smoothScroll);
            }
        };

        const handleSetTargetScroll = (e: CustomEvent) => {
            targetScroll = e.detail.targetScroll || 0;
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(smoothScroll);
            }
        };

        // NEW: Improved wheel handler with better momentum detection
        let wheelTimeout: NodeJS.Timeout;
        const handleWheel = (e: WheelEvent) => {
            const target = e.target as HTMLElement;

            // Allow native scroll in specific elements
            if (target.closest('textarea') || target.closest('.allow-native-scroll')) {
                return;
            }

            e.preventDefault();
            
            // Set user scrolling flag
            isUserScrolling = true;
            clearTimeout(wheelTimeout);
            
            // Clear user scrolling flag after a delay
            wheelTimeout = setTimeout(() => {
                isUserScrolling = false;
            }, 150);

            // Apply scroll delta
            targetScroll += e.deltaY;

            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(smoothScroll);
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
                            requestAnimationFrame(smoothScroll);
                        }
                    }
                }
            }
        };

        // FIXED: Only update scroll values when not actively scrolling
        const handleScroll = () => {
            if (!isScrolling && !isUserScrolling) {
                currentScroll = window.scrollY;
                targetScroll = currentScroll;
            }
        };

        // Scrollbar logic remains the same
        let isTicking = false;
        let isDragging = false;
        let startY = 0;
        let startScrollTop = 0;
        const scrollPadding = 4;
        const scrollbar = scrollbarRef.current;

        function updateScrollbar() {
            const scrollTop = window.scrollY || window.pageYOffset;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight || document.documentElement.clientHeight;
            const maxScroll = scrollHeight - clientHeight;

            const hideScrollPaths = [
                '/contacts/connection',
                '/pricing', 
                '/auth/login',
                '/auth/register',
                '/auth/forgot-password'
            ];
            const shouldHide = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));

            setShowScrollbar(!shouldHide);

            const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
            const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
            const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;

            if (scrollbar) {
                scrollbar.style.setProperty('--scrollY', `${topPercent}px`);
                scrollbar.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
            }
        }

        function scrollMove(e: TouchEvent | MouseEvent) {
            if (!isDragging) return;

            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight || document.documentElement.clientHeight;
            const maxScrollDrag = scrollHeight - clientHeight;
            const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
            const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;

            let clientY = 0;
            if (e instanceof TouchEvent) {
                clientY = e.touches[0].clientY;
            } else {
                clientY = e.clientY;
            }

            const deltaY = clientY - startY;
            const scrollDelta = (deltaY / maxTop) * maxScrollDrag;

            targetScroll = Math.max(0, Math.min(startScrollTop + scrollDelta, maxScrollDrag));

            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(smoothScroll);
            }
        }

        function startScroll(e: TouchEvent | MouseEvent) {
            isDragging = true;
            let clientY = 0;

            if (e instanceof TouchEvent) {
                clientY = e.touches[0].clientY;
            } else {
                clientY = e.clientY;
            }

            startY = clientY;
            startScrollTop = window.scrollY || window.pageYOffset;
            e.preventDefault();
        }

        function stopScroll() {
            isDragging = false;
        }

        // Improved scroll handler with better performance
        let scrollTimeout: NodeJS.Timeout;
        const scrollHandler = () => {
            handleScroll();

            if (!isTicking) {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    requestAnimationFrame(() => {
                        updateScrollbar();
                        isTicking = false;
                    });
                }, 10); // Reduced timeout for more responsive updates
                isTicking = true;
            }
        };

        initScroll();
        updateScrollbar();

        // Event listeners
        window.addEventListener('customScrollToTop', handleCustomScrollToTop);
        window.addEventListener('setTargetScroll', handleSetTargetScroll as EventListener);
        window.addEventListener('wheel', handleWheel, {passive: false});
        window.addEventListener('scroll', scrollHandler, {passive: true}); // Made passive for better performance
        document.addEventListener('click', handleAnchorClick);
        window.addEventListener('resize', updateScrollbar);

        if (scrollbar) {
            scrollbar.addEventListener('mousedown', startScroll);
            scrollbar.addEventListener('touchstart', startScroll);
        }

        document.addEventListener('mousemove', scrollMove);
        document.addEventListener('mouseup', stopScroll);
        document.addEventListener('touchmove', scrollMove);
        document.addEventListener('touchend', stopScroll);

        return () => {
            // Cleanup
            clearTimeout(wheelTimeout);
            clearTimeout(scrollTimeout);
            
            window.removeEventListener('customScrollToTop', handleCustomScrollToTop);
            window.removeEventListener('setTargetScroll', handleSetTargetScroll as EventListener);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', scrollHandler);
            document.removeEventListener('click', handleAnchorClick);
            window.removeEventListener('resize', updateScrollbar);

            if (scrollbar) {
                scrollbar.removeEventListener('mousedown', startScroll);
                scrollbar.removeEventListener('touchstart', startScroll);
            }

            document.removeEventListener('mousemove', scrollMove);
            document.removeEventListener('mouseup', stopScroll);
            document.removeEventListener('touchmove', scrollMove);
            document.removeEventListener('touchend', stopScroll);
        };
    }, [pathname, getScrollOffset]);

    useEffect(() => {
        // Reset scroll position on page change
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Force scrollbar update after navigation
        setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, 50);
    }, [pathname]);

    return (
        <>
            {children}
            {showScrollbar && <div ref={scrollbarRef} className="scrollbar md:block hidden"></div>}
        </>
    );
}