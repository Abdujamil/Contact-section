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
//             window.scrollTo(0, 0);
//             document.documentElement.scrollTop = 0;
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
//         let isUserScrolling = false; // Track if user is actively scrolling
//         // const scrollStopThreshold = 0.1;
//         const scrollStopThreshold = 0.25;

//         // Adaptive easing based on refresh rate and device performance
//         const getAdaptiveEasing = () => {
//             const isHighRefreshRate = window.matchMedia('(min-resolution: 120dpi)').matches || 
//                                     window.devicePixelRatio > 1.5;

//             const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

//             if (prefersReducedMotion) {
//                 return 0.4;
//             }

//             const connection = (navigator as Navigator & { connection?: { effectiveType: string } }).connection;
//             const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');

//             if (isSlowConnection) {
//                 return 0.35;
//             }

//             return isHighRefreshRate ? 0.18 : 0.28; // Slightly increased for smoother feel
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

//         // Custom event handlers
//         const handleCustomScrollToTop = () => {
//             targetScroll = 0;
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         };

//         const handleSetTargetScroll = (e: CustomEvent) => {
//             targetScroll = e.detail.targetScroll || 0;
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         };

//         // Improved wheel handler with better momentum detection
//         let wheelTimeout: NodeJS.Timeout;
//         const handleWheel = (e: WheelEvent) => {
//             const target = e.target as HTMLElement;

//             // Allow native scroll in specific elements
//             if (target.closest('textarea') || target.closest('.allow-native-scroll')) {
//                 return;
//             }

//             e.preventDefault();

//             // Set user scrolling flag
//             isUserScrolling = true;
//             clearTimeout(wheelTimeout);

//             // Clear user scrolling flag after a delay
//             wheelTimeout = setTimeout(() => {
//                 isUserScrolling = false;
//             }, 150);

//             // Apply scroll delta
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

//         // Only update scroll values when not actively scrolling
//         const handleScroll = () => {
//             if (!isScrolling && !isUserScrolling) {
//                 currentScroll = window.scrollY;
//                 targetScroll = currentScroll;
//             }
//         };

//         // Scrollbar logic remains the same
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

//         // Improved scroll handler with better performance
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
//                 }, 10); // Reduced timeout for more responsive updates
//                 isTicking = true;
//             }
//         };

//         initScroll();
//         updateScrollbar();

//         // Event listeners
//         window.addEventListener('customScrollToTop', handleCustomScrollToTop);
//         window.addEventListener('setTargetScroll', handleSetTargetScroll as EventListener);
//         window.addEventListener('wheel', handleWheel, {passive: false});
//         window.addEventListener('scroll', scrollHandler, {passive: true}); // Made passive for better performance
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
//             // Cleanup
//             clearTimeout(wheelTimeout);
//             clearTimeout(scrollTimeout);

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
//             window.scrollTo(0, 0);
//             document.documentElement.scrollTop = 0;
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

//         let targetScroll = window.scrollY;
//         let animationId: number | null = null;

//         // Much simpler and more responsive easing
//         // const scrollEaseFactor = 0.25;
//         const scrollEaseFactor = 0.50;

//         const smoothScrollTo = (target: number) => {
//             const current = window.scrollY;
//             const diff = target - current;

//             // If difference is small enough, just set it directly
//             if (Math.abs(diff) < 2) {
//                 window.scrollTo(0, target);
//                 animationId = null;
//                 return;
//             }

//             // Adaptive easing - faster when close to target
//             const distance = Math.abs(diff);
//             let easeFactor = scrollEaseFactor;

//             if (distance < 50) {
//                 // Speed up when very close to target
//                 easeFactor = Math.max(0.4, scrollEaseFactor + (50 - distance) * 0.008);
//             }

//             const next = current + diff * easeFactor;
//             window.scrollTo(0, next);

//             animationId = requestAnimationFrame(() => smoothScrollTo(target));
//         };

//         // Custom event handlers
//         const handleCustomScrollToTop = () => {
//             targetScroll = 0;
//             if (animationId) cancelAnimationFrame(animationId);
//             smoothScrollTo(targetScroll);
//         };

//         const handleSetTargetScroll = (e: CustomEvent) => {
//             targetScroll = e.detail.targetScroll || 0;
//             if (animationId) cancelAnimationFrame(animationId);
//             smoothScrollTo(targetScroll);
//         };

//         // Simplified wheel handler - let browser handle most of the work
//         const handleWheel = (e: WheelEvent) => {
//             const target = e.target as HTMLElement;

//             // Allow native scroll in specific elements
//             if (target.closest('textarea') || target.closest('.allow-native-scroll')) {
//                 return;
//             }

//             // Only apply custom smooth scroll for large scroll movements
//             const scrollDelta = Math.abs(e.deltaY);

//             // For small movements, let browser handle natively for better performance
//             if (scrollDelta < 100) {
//                 return;
//             }

//             e.preventDefault();

//             targetScroll += e.deltaY;
//             const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//             targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

//             if (animationId) cancelAnimationFrame(animationId);
//             smoothScrollTo(targetScroll);
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

//                         if (animationId) cancelAnimationFrame(animationId);
//                         smoothScrollTo(targetScroll);
//                     }
//                 }
//             }
//         };

//         // Update target when user scrolls naturally (without interfering)
//         const handleNativeScroll = () => {
//             if (!animationId) {
//                 targetScroll = window.scrollY;
//             }
//         };

//         // Scrollbar logic
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
//                 '/auth/login',
//                 '/auth/register',
//                 '/auth/forgot-password'
//             ];
//             const shouldHide = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));

//             setShowScrollbar(!shouldHide);

//             if (maxScroll <= 0) return;

//             const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;  
//             const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
//             const topPercent = (scrollTop / maxScroll) * maxTop;

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

//             if (animationId) cancelAnimationFrame(animationId);
//             smoothScrollTo(targetScroll);
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

//         const scrollHandler = () => {
//             handleNativeScroll();

//             if (!isTicking) {
//                 requestAnimationFrame(() => {
//                     updateScrollbar();
//                     isTicking = false;
//                 });
//                 isTicking = true;
//             }
//         };

//         updateScrollbar();

//         // Event listeners
//         window.addEventListener('customScrollToTop', handleCustomScrollToTop);
//         window.addEventListener('setTargetScroll', handleSetTargetScroll as EventListener);
//         window.addEventListener('wheel', handleWheel, {passive: false});
//         window.addEventListener('scroll', scrollHandler, {passive: true});
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
//             if (animationId) cancelAnimationFrame(animationId);

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
//         };
//     }, [pathname, getScrollOffset]);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//         document.documentElement.scrollTop = 0;
//         document.body.scrollTop = 0;

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

// Custom
// 'use client'
// import React, {useEffect, useRef, useState} from "react";
// import {usePathname} from "next/navigation";
//
// interface SmoothScrollProps {
//     children: React.ReactNode;
// }
//
// export default function SmoothScroll({children}: SmoothScrollProps) {
//     const scrollbarRef = useRef<HTMLDivElement>(null);
//     const [showScrollbar, setShowScrollbar] = useState(true);
//     const pathname = usePathname();
//
//
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
//         // Force scroll update after DOM changes
//         const timeout1 = setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 100);
//         const timeout2 = setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 300);
//
//         return () => {
//             clearTimeout(timeout1);
//             clearTimeout(timeout2);
//             document.body.style.overflow = '';
//         };
//     }, [pathname]);
//
//     useEffect(() => {
//         if (pathname.startsWith('/auth')) {
//             // Принудительно прокручиваем наверх
//             window.scrollTo(0, 0);
//             document.documentElement.scrollTop = 0; // на всякий случай
//         }
//     }, [pathname]);
//
//
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
//
//     useEffect(() => {
//         if (!scrollbarRef.current) return;
//
//         let currentScroll = 0;
//         let targetScroll = 0;
//         let isScrolling = false;
//         const scrollStopThreshold = 0.5; // Уменьшил порог остановки
//         // const scrollStopThreshold = 0.10; // Уменьшил порог остановки
//
//         // Немного увеличил скорость
//         const getAdaptiveEasing = () => {
//             const isHighRefreshRate = window.matchMedia('(min-resolution: 120dpi)').matches ||
//                                     window.devicePixelRatio > 1.5;
//
//             const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//
//             if (prefersReducedMotion) {
//                 return 0.5; // Быстрее для accessibility
//             }
//
//             const connection = (navigator as Navigator & { connection?: { effectiveType: string } }).connection;
//             const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
//
//             if (isSlowConnection) {
//                 return 0.4;
//             }
//
//             return isHighRefreshRate ? 0.25 : 0.35; // Увеличил скорость
//         };
//
//         const scrollEaseFactor = getAdaptiveEasing();
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
//         // Custom events
//         const handleCustomScrollToTop = () => {
//             targetScroll = 0;
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         };
//
//         const handleSetTargetScroll = (e: CustomEvent) => {
//             targetScroll = e.detail.targetScroll || 0;
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         };
//
//         const handleWheel = (e: WheelEvent) => {
//             const target = e.target as HTMLElement;
//
//             // Разрешаем нативный скролл внутри textarea и scrollable div
//             if (target.closest('textarea') || target.closest('.allow-native-scroll')) {
//                 return;
//             }
//
//             e.preventDefault();
//             targetScroll += e.deltaY;
//
//             const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//             targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
//
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
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
//
//                         const offset = getScrollOffset();
//                         const elTop = (el as HTMLElement).offsetTop - offset;
//
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
//         // КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: не обновляем скролл если идет анимация
//         const handleScroll = () => {
//             if (!isScrolling) {
//                 currentScroll = window.scrollY;
//                 targetScroll = currentScroll;
//             }
//         };
//
//         // Scrollbar logic
//         let isTicking = false;
//         let isDragging = false;
//         let startY = 0;
//         let startScrollTop = 0;
//         const scrollPadding = 4;
//         const scrollbar = scrollbarRef.current;
//
//         function updateScrollbar() {
//             const scrollTop = window.scrollY || window.pageYOffset;
//             const scrollHeight = document.documentElement.scrollHeight;
//             const clientHeight = window.innerHeight || document.documentElement.clientHeight;
//             const maxScroll = scrollHeight - clientHeight;
//
//             const hideScrollPaths = [
//                 '/contacts/connection',
//                 '/pricing',
//                 '/auth/login',
//                 '/auth/register',
//                 '/auth/forgot-password'
//             ];
//             const shouldHide = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));
//
//             setShowScrollbar(!shouldHide);
//
//             const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
//             const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
//             const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;
//
//             if (scrollbar) {
//                 scrollbar.style.setProperty('--scrollY', `${topPercent}px`);
//                 scrollbar.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
//             }
//         }
//
//         function scrollMove(e: TouchEvent | MouseEvent) {
//             if (!isDragging) return;
//
//             const scrollHeight = document.documentElement.scrollHeight;
//             const clientHeight = window.innerHeight || document.documentElement.clientHeight;
//             const maxScrollDrag = scrollHeight - clientHeight;
//             const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
//             const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
//
//             let clientY = 0;
//             if (e instanceof TouchEvent) {
//                 clientY = e.touches[0].clientY;
//             } else {
//                 clientY = e.clientY;
//             }
//
//             const deltaY = clientY - startY;
//             const scrollDelta = (deltaY / maxTop) * maxScrollDrag;
//
//             targetScroll = Math.max(0, Math.min(startScrollTop + scrollDelta, maxScrollDrag));
//
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         }
//
//         function startScroll(e: TouchEvent | MouseEvent) {
//             isDragging = true;
//             let clientY = 0;
//
//             if (e instanceof TouchEvent) {
//                 clientY = e.touches[0].clientY;
//             } else {
//                 clientY = e.clientY;
//             }
//
//             startY = clientY;
//             startScrollTop = window.scrollY || window.pageYOffset;
//             e.preventDefault();
//         }
//
//         function stopScroll() {
//             isDragging = false;
//         }
//
//         // Оптимизированный scroll handler
//         let scrollTimeout: NodeJS.Timeout;
//         const scrollHandler = () => {
//             handleScroll();
//
//             if (!isTicking) {
//                 clearTimeout(scrollTimeout);
//                 scrollTimeout = setTimeout(() => {
//                     requestAnimationFrame(() => {
//                         updateScrollbar();
//                         isTicking = false;
//                     });
//                 }, 8); // Уменьшил до 8ms для более отзывчивого обновления
//                 isTicking = true;
//             }
//         };
//
//         initScroll();
//         updateScrollbar();
//
//         // Event listeners
//         window.addEventListener('customScrollToTop', handleCustomScrollToTop);
//         window.addEventListener('setTargetScroll', handleSetTargetScroll as EventListener);
//         window.addEventListener('wheel', handleWheel, {passive: false});
//         window.addEventListener('scroll', scrollHandler, {passive: true});
//         document.addEventListener('click', handleAnchorClick);
//         window.addEventListener('resize', updateScrollbar);
//
//         if (scrollbar) {
//             scrollbar.addEventListener('mousedown', startScroll);
//             scrollbar.addEventListener('touchstart', startScroll);
//         }
//
//         document.addEventListener('mousemove', scrollMove);
//         document.addEventListener('mouseup', stopScroll);
//         document.addEventListener('touchmove', scrollMove);
//         document.addEventListener('touchend', stopScroll);
//
//         return () => {
//             clearTimeout(scrollTimeout);
//
//             window.removeEventListener('customScrollToTop', handleCustomScrollToTop);
//             window.removeEventListener('setTargetScroll', handleSetTargetScroll as EventListener);
//             window.removeEventListener('wheel', handleWheel);
//             window.removeEventListener('scroll', scrollHandler);
//             document.removeEventListener('click', handleAnchorClick);
//             window.removeEventListener('resize', updateScrollbar);
//
//             if (scrollbar) {
//                 scrollbar.removeEventListener('mousedown', startScroll);
//                 scrollbar.removeEventListener('touchstart', startScroll);
//             }
//
//             document.removeEventListener('mousemove', scrollMove);
//             document.removeEventListener('mouseup', stopScroll);
//             document.removeEventListener('touchmove', scrollMove);
//             document.removeEventListener('touchend', stopScroll);
//         };
//     }, [pathname, getScrollOffset]);
//
//     useEffect(() => {
//         // Reset scroll position on page change
//         window.scrollTo(0, 0);
//         document.documentElement.scrollTop = 0;
//         document.body.scrollTop = 0;
//
//         // Force scrollbar update after navigation
//         setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 50);
//     }, [pathname]);
//
//     return (
//         <>
//             {children}
//             {showScrollbar && <div ref={scrollbarRef} className="scrollbar md:block hidden"></div>}
//         </>
//     );
// }


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


// Custom with settings
'use client';
import React, {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";

interface SmoothScrollProps {
    children: React.ReactNode;
}

export default function SmoothScroll({children}: SmoothScrollProps) {
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [showScrollbar, setShowScrollbar] = useState(true);

    const [isTrackpad, setIsTrackpad] = useState(false);

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

    // Инициализация настроек из localStorage
    // useEffect(() => {
    //     const storedMouse = {
    //         scrollStopThreshold: parseFloat(localStorage.getItem('mouse_scrollStopThreshold') || '0.15'),
    //         scrollEaseFactor: parseFloat(localStorage.getItem('mouse_scrollEaseFactor') || '0.20'),
    //         minScrollStep: parseInt(localStorage.getItem('mouse_minScrollStep') || '10')
    //     };
    //     setMouseSettings(storedMouse);
    //
    //     const storedTrackpad = {
    //         scrollStopThreshold: parseFloat(localStorage.getItem('trackpad_scrollStopThreshold') || '0.5'),
    //         scrollEaseFactor: parseFloat(localStorage.getItem('trackpad_scrollEaseFactor') || '0.20'),
    //         minScrollStep: parseInt(localStorage.getItem('trackpad_minScrollStep') || '1')
    //     };
    //     setTrackpadSettings(storedTrackpad);
    // }, []);

    // Сохранение настроек мыши в localStorage
    // useEffect(() => {
    //     localStorage.setItem('mouse_scrollStopThreshold', mouseSettings.scrollStopThreshold.toString());
    //     localStorage.setItem('mouse_scrollEaseFactor', mouseSettings.scrollEaseFactor.toString());
    //     localStorage.setItem('mouse_minScrollStep', mouseSettings.minScrollStep.toString());
    // }, [mouseSettings]);
    //
    // // Сохранение настроек тачпада в localStorage
    // useEffect(() => {
    //     localStorage.setItem('trackpad_scrollStopThreshold', trackpadSettings.scrollStopThreshold.toString());
    //     localStorage.setItem('trackpad_scrollEaseFactor', trackpadSettings.scrollEaseFactor.toString());
    //     localStorage.setItem('trackpad_minScrollStep', trackpadSettings.minScrollStep.toString());
    // }, [trackpadSettings]);

    // Определение типа устройства ввода
    useEffect(() => {
        const wheelEvents: number[] = [];
        let detectionTimeout: NodeJS.Timeout;

        const detectInputDevice = (e: WheelEvent) => {
            // Сохраняем последние 5 значений deltaY
            wheelEvents.push(Math.abs(e.deltaY));
            if (wheelEvents.length > 5) {
                wheelEvents.shift();
            }

            // Очищаем предыдущий таймаут
            clearTimeout(detectionTimeout);

            // Анализируем через небольшую задержку
            detectionTimeout = setTimeout(() => {
                if (wheelEvents.length >= 3) {
                    const avgDelta = wheelEvents.reduce((a, b) => a + b, 0) / wheelEvents.length;
                    const maxDelta = Math.max(...wheelEvents);
                    const minDelta = Math.min(...wheelEvents);
                    const deltaVariance = maxDelta - minDelta;

                    // Определяем устройство на основе нескольких факторов:
                    const isLikelyTrackpad =
                        // 1. Малые значения delta (обычно < 50 для тачпада)
                        avgDelta < 50 &&
                        // 2. Низкая вариативность (плавные движения)
                        deltaVariance < 30 &&
                        // 3. deltaMode === 0 (пиксели, а не строки/страницы)
                        e.deltaMode === 0;

                    const isLikelyMouse =
                        // 1. Большие значения delta (обычно 100+ для колесика мыши)
                        avgDelta > 80 ||
                        // 2. Высокая вариативность или фиксированные значения
                        deltaVariance > 50 ||
                        // 3. deltaMode !== 0 (строки или страницы)
                        e.deltaMode !== 0;

                    if (isLikelyTrackpad) {
                        setIsTrackpad(true);
                    } else if (isLikelyMouse) {
                        setIsTrackpad(false);
                    }
                    // Если не уверены, оставляем текущее состояние
                }
            }, 100);
        };

        // Дополнительная проверка по User Agent для MacOS
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
            navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;

        // На Mac по умолчанию предполагаем тачпад
        if (isMac) {
            setIsTrackpad(true);
        }

        window.addEventListener('wheel', detectInputDevice, {passive: true});

        return () => {
            window.removeEventListener('wheel', detectInputDevice);
            clearTimeout(detectionTimeout);
        };
    }, []);

    // ===== ADAPTIVE EASING =====
    // function getAdaptiveEasing(): number {
    //     const isHighRefreshRate = window.matchMedia('(min-resolution: 120dpi)').matches ||
    //         window.devicePixelRatio > 1.5;
    //
    //     const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    //     if (prefersReducedMotion) return 0.5;
    //
    //     const connection = (navigator as Navigator & { connection?: { effectiveType: string } }).connection;
    //     const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    //     if (isSlowConnection) return 0.4;
    //
    //     return isHighRefreshRate ? 0.25 : 0.35;
    // }

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

            e.preventDefault();

            // ВАЖНО: Используем настройки в зависимости от типа устройства
            const settings = isTrackpad ? trackpadSettings : mouseSettings;

            const scrollStep = Math.sign(e.deltaY) * Math.max(Math.abs(e.deltaY), settings.minScrollStep);
            targetScroll += scrollStep;

            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

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

                        // Используем настройки для анимации к якорю
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
    }, [isTrackpad, trackpadSettings, mouseSettings, pathname, getScrollOffset]);

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
            {process.env.NODE_ENV === 'development' && (
                <div
                    className="fixed top-[70px] right-4 backdrop-blur-2xl border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 z-[9999999999] w-80 max-h-[80vh] overflow-y-auto allow-native-scroll">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Настройки прокрутки ({isTrackpad ? 'Тачпад' : 'Мышка'})
                    </h3>

                    <div className="mb-6">
                        <h4 className="text-sm border-b font-bold mb-2 text-white-600">Настройки для мышки</h4>

                        <label className="block text-xs mb-1">Порог
                            остановки: {mouseSettings.scrollStopThreshold.toFixed(2)}</label>
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
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
                                min="0.01"
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
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
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
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
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
                                min="0.01"
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
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
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

                        <label className="block text-xs mb-1">Минимальный шаг: {mouseSettings.minScrollStep}px</label>
                        <div className="flex items-center gap-2 mb-6">
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
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
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
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

                    <div>
                        <h4 className="text-sm border-b font-bold mb-2 text-white-600">Настройки для тачпада</h4>

                        <label className="block text-xs mb-1">Порог
                            остановки: {trackpadSettings.scrollStopThreshold.toFixed(2)}</label>
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
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
                                min="0.01"
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
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
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
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
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
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
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
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
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
                                className="px-2 py-1 bg-gray-200 dark:bg-[#333333] rounded"
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


// 'use client'
// import React, {useEffect, useRef, useState} from "react";
// import {usePathname} from "next/navigation";
//
// interface SmoothScrollProps {
//     children: React.ReactNode;
//     // Mouse scroll settings
//     mouseScrollSpeed?: number; // Multiplier for mouse wheel delta (default: 1)
//     mouseScrollSmoothing?: number; // Easing factor for mouse scroll (0.1-1, default: 0.25)
//     enableMouseAcceleration?: boolean; // Enable scroll acceleration based on wheel speed
//     maxMouseScrollSpeed?: number; // Maximum scroll speed per wheel event
// }
//
// export default function SmoothScroll({
//                                          children,
//                                          mouseScrollSpeed = 1,
//                                          mouseScrollSmoothing = 0.25,
//                                          enableMouseAcceleration = true,
//                                          maxMouseScrollSpeed = 200
//                                      }: SmoothScrollProps) {
//     const scrollbarRef = useRef<HTMLDivElement>(null);
//     const [showScrollbar, setShowScrollbar] = useState(true);
//     const pathname = usePathname();
//
//     // Mouse scroll state
//     const mouseScrollState = useRef({
//         lastWheelTime: 0,
//         wheelVelocity: 0,
//         accelerationFactor: 1
//     });
//
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
//         // Force scroll update after DOM changes
//         const timeout1 = setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 100);
//         const timeout2 = setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 300);
//
//         return () => {
//             clearTimeout(timeout1);
//             clearTimeout(timeout2);
//             document.body.style.overflow = '';
//         };
//     }, [pathname]);
//
//     useEffect(() => {
//         if (pathname.startsWith('/auth')) {
//             // Принудительно прокручиваем наверх
//             window.scrollTo(0, 0);
//             document.documentElement.scrollTop = 0; // на всякий случай
//         }
//     }, [pathname]);
//
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
//
//     useEffect(() => {
//         if (!scrollbarRef.current) return;
//
//         let currentScroll = 0;
//         let targetScroll = 0;
//         let isScrolling = false;
//         const scrollStopThreshold = 0.5;
//
//         // Enhanced mouse scroll calculations
//         const calculateMouseScrollDelta = (wheelDelta: number): number => {
//             const currentTime = Date.now();
//             const timeDelta = currentTime - mouseScrollState.current.lastWheelTime;
//
//             // Base scroll amount
//             let scrollDelta = wheelDelta * mouseScrollSpeed;
//
//             if (enableMouseAcceleration && timeDelta < 100) {
//                 // Calculate acceleration based on wheel frequency
//                 const frequency = 1000 / Math.max(timeDelta, 16); // Prevent division by zero
//                 const accelerationMultiplier = Math.min(frequency / 10, 3); // Max 3x acceleration
//                 scrollDelta *= (1 + accelerationMultiplier * 0.5);
//             }
//
//             // Apply smoothing to the delta
//             const smoothedDelta = scrollDelta * mouseScrollSmoothing +
//                 mouseScrollState.current.wheelVelocity * (1 - mouseScrollSmoothing);
//
//             // Clamp to max speed
//             const clampedDelta = Math.sign(smoothedDelta) *
//                 Math.min(Math.abs(smoothedDelta), maxMouseScrollSpeed);
//
//             // Update state
//             mouseScrollState.current.lastWheelTime = currentTime;
//             mouseScrollState.current.wheelVelocity = clampedDelta;
//
//             return clampedDelta;
//         };
//
//         const getAdaptiveEasing = () => {
//             const isHighRefreshRate = window.matchMedia('(min-resolution: 120dpi)').matches ||
//                 window.devicePixelRatio > 1.5;
//
//             const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//
//             if (prefersReducedMotion) {
//                 return 0.5; // Быстрее для accessibility
//             }
//
//             const connection = (navigator as Navigator & { connection?: { effectiveType: string } }).connection;
//             const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
//
//             if (isSlowConnection) {
//                 return 0.4;
//             }
//
//             return isHighRefreshRate ? 0.25 : 0.35;
//         };
//
//         const scrollEaseFactor = getAdaptiveEasing();
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
//         // Custom events
//         const handleCustomScrollToTop = () => {
//             targetScroll = 0;
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         };
//
//         const handleSetTargetScroll = (e: CustomEvent) => {
//             targetScroll = e.detail.targetScroll || 0;
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         };
//
//         const handleWheel = (e: WheelEvent) => {
//             const target = e.target as HTMLElement;
//
//             // Разрешаем нативный скролл внутри textarea и scrollable div
//             if (target.closest('textarea') || target.closest('.allow-native-scroll')) {
//                 return;
//             }
//
//             e.preventDefault();
//
//             // Use enhanced mouse scroll calculation
//             const scrollDelta = calculateMouseScrollDelta(e.deltaY);
//             targetScroll += scrollDelta;
//
//             const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//             targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
//
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
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
//
//                         const offset = getScrollOffset();
//                         const elTop = (el as HTMLElement).offsetTop - offset;
//
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
//         // КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: не обновляем скролл если идет анимация
//         const handleScroll = () => {
//             if (!isScrolling) {
//                 currentScroll = window.scrollY;
//                 targetScroll = currentScroll;
//             }
//         };
//
//         // Scrollbar logic
//         let isTicking = false;
//         let isDragging = false;
//         let startY = 0;
//         let startScrollTop = 0;
//         const scrollPadding = 4;
//         const scrollbar = scrollbarRef.current;
//
//         function updateScrollbar() {
//             const scrollTop = window.scrollY || window.pageYOffset;
//             const scrollHeight = document.documentElement.scrollHeight;
//             const clientHeight = window.innerHeight || document.documentElement.clientHeight;
//             const maxScroll = scrollHeight - clientHeight;
//
//             const hideScrollPaths = [
//                 '/contacts/connection',
//                 '/pricing',
//                 '/auth/login',
//                 '/auth/register',
//                 '/auth/forgot-password'
//             ];
//             const shouldHide = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));
//
//             setShowScrollbar(!shouldHide);
//
//             const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
//             const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
//             const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;
//
//             if (scrollbar) {
//                 scrollbar.style.setProperty('--scrollY', `${topPercent}px`);
//                 scrollbar.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
//             }
//         }
//
//         function scrollMove(e: TouchEvent | MouseEvent) {
//             if (!isDragging) return;
//
//             const scrollHeight = document.documentElement.scrollHeight;
//             const clientHeight = window.innerHeight || document.documentElement.clientHeight;
//             const maxScrollDrag = scrollHeight - clientHeight;
//             const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
//             const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
//
//             let clientY = 0;
//             if (e instanceof TouchEvent) {
//                 clientY = e.touches[0].clientY;
//             } else {
//                 clientY = e.clientY;
//             }
//
//             const deltaY = clientY - startY;
//             const scrollDelta = (deltaY / maxTop) * maxScrollDrag;
//
//             targetScroll = Math.max(0, Math.min(startScrollTop + scrollDelta, maxScrollDrag));
//
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         }
//
//         function startScroll(e: TouchEvent | MouseEvent) {
//             isDragging = true;
//             let clientY = 0;
//
//             if (e instanceof TouchEvent) {
//                 clientY = e.touches[0].clientY;
//             } else {
//                 clientY = e.clientY;
//             }
//
//             startY = clientY;
//             startScrollTop = window.scrollY || window.pageYOffset;
//             e.preventDefault();
//         }
//
//         function stopScroll() {
//             isDragging = false;
//         }
//
//         // Оптимизированный scroll handler
//         let scrollTimeout: NodeJS.Timeout;
//         const scrollHandler = () => {
//             handleScroll();
//
//             if (!isTicking) {
//                 clearTimeout(scrollTimeout);
//                 scrollTimeout = setTimeout(() => {
//                     requestAnimationFrame(() => {
//                         updateScrollbar();
//                         isTicking = false;
//                     });
//                 }, 8);
//                 isTicking = true;
//             }
//         };
//
//         initScroll();
//         updateScrollbar();
//
//         // Event listeners
//         window.addEventListener('customScrollToTop', handleCustomScrollToTop);
//         window.addEventListener('setTargetScroll', handleSetTargetScroll as EventListener);
//         window.addEventListener('wheel', handleWheel, {passive: false});
//         window.addEventListener('scroll', scrollHandler, {passive: true});
//         document.addEventListener('click', handleAnchorClick);
//         window.addEventListener('resize', updateScrollbar);
//
//         if (scrollbar) {
//             scrollbar.addEventListener('mousedown', startScroll);
//             scrollbar.addEventListener('touchstart', startScroll);
//         }
//
//         document.addEventListener('mousemove', scrollMove);
//         document.addEventListener('mouseup', stopScroll);
//         document.addEventListener('touchmove', scrollMove);
//         document.addEventListener('touchend', stopScroll);
//
//         return () => {
//             clearTimeout(scrollTimeout);
//
//             window.removeEventListener('customScrollToTop', handleCustomScrollToTop);
//             window.removeEventListener('setTargetScroll', handleSetTargetScroll as EventListener);
//             window.removeEventListener('wheel', handleWheel);
//             window.removeEventListener('scroll', scrollHandler);
//             document.removeEventListener('click', handleAnchorClick);
//             window.removeEventListener('resize', updateScrollbar);
//
//             if (scrollbar) {
//                 scrollbar.removeEventListener('mousedown', startScroll);
//                 scrollbar.removeEventListener('touchstart', startScroll);
//             }
//
//             document.removeEventListener('mousemove', scrollMove);
//             document.removeEventListener('mouseup', stopScroll);
//             document.removeEventListener('touchmove', scrollMove);
//             document.removeEventListener('touchend', stopScroll);
//         };
//     }, [pathname, getScrollOffset, mouseScrollSpeed, mouseScrollSmoothing, enableMouseAcceleration, maxMouseScrollSpeed]);
//
//     useEffect(() => {
//         // Reset scroll position on page change
//         window.scrollTo(0, 0);
//         document.documentElement.scrollTop = 0;
//         document.body.scrollTop = 0;
//
//         // Force scrollbar update after navigation
//         setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 50);
//     }, [pathname]);
//
//     return (
//         <>
//             {children}
//             {showScrollbar && <div ref={scrollbarRef} className="scrollbar md:block hidden"></div>}
//         </>
//     );
// }


// 'use client'
// import React, {useEffect, useRef, useState} from "react";
// import {usePathname} from "next/navigation";
//
// interface SmoothScrollProps {
//     children: React.ReactNode;
//     showSettingsPanel?: boolean; // Toggle settings panel visibility
//     onSettingsChange?: (settings: ScrollSettings) => void; // Callback for settings changes
// }
//
// interface ScrollSettings {
//     mouseScrollSpeed: number;
//     mouseScrollSmoothing: number;
//     enableMouseAcceleration: boolean;
//     maxMouseScrollSpeed: number;
// }
//
// const defaultSettings: ScrollSettings = {
//     mouseScrollSpeed: 1,
//     mouseScrollSmoothing: 0.25,
//     enableMouseAcceleration: true,
//     maxMouseScrollSpeed: 200
// };
//
// // Settings Panel Component
// const ScrollSettingsPanel: React.FC<{
//     settings: ScrollSettings;
//     onSettingsChange: (settings: ScrollSettings) => void;
//     onClose: () => void;
//     isOpen: boolean;
// }> = ({settings, onSettingsChange, onClose, isOpen}) => {
//     const handleChange = (key: keyof ScrollSettings, value: number | boolean) => {
//         onSettingsChange({
//             ...settings,
//             [key]: value
//         });
//     };
//
//     const resetToDefaults = () => {
//         onSettingsChange(defaultSettings);
//     };
//
//     const presets = {
//         smooth: {
//             mouseScrollSpeed: 0.8,
//             mouseScrollSmoothing: 0.4,
//             enableMouseAcceleration: false,
//             maxMouseScrollSpeed: 150
//         },
//         fast: {
//             mouseScrollSpeed: 1.5,
//             mouseScrollSmoothing: 0.15,
//             enableMouseAcceleration: true,
//             maxMouseScrollSpeed: 300
//         },
//         precise: {
//             mouseScrollSpeed: 0.5,
//             mouseScrollSmoothing: 0.5,
//             enableMouseAcceleration: false,
//             maxMouseScrollSpeed: 100
//         },
//         default: defaultSettings
//     };
//
//     const applyPreset = (preset: keyof typeof presets) => {
//         onSettingsChange(presets[preset]);
//     };
//
//     if (!isOpen) return null;
//
//     return (
//         <div
//             className="fixed top-[70px] right-4 backdrop-blur-2xl border border-[#ffffff3d] rounded-lg shadow-lg p-4 z-50 w-80 max-h-[80vh] overflow-y-auto"
//             style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}
//         >
//             <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                     Scroll Settings
//                 </h3>
//                 <button
//                     onClick={onClose}
//                     className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
//                 >
//                     ×
//                 </button>
//             </div>
//
//             {/* Presets */}
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Quick Presets:
//                 </label>
//                 <div className="grid grid-cols-2 gap-2">
//                     {Object.keys(presets).map((preset) => (
//                         <button
//                             key={preset}
//                             onClick={() => applyPreset(preset as keyof typeof presets)}
//                             className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 rounded capitalize"
//                         >
//                             {preset}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//
//             {/* Mouse Scroll Speed */}
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Mouse Scroll Speed: {settings.mouseScrollSpeed.toFixed(2)}
//                 </label>
//                 <input
//                     type="range"
//                     min="0.1"
//                     max="3"
//                     step="0.1"
//                     value={settings.mouseScrollSpeed}
//                     onChange={(e) => handleChange('mouseScrollSpeed', parseFloat(e.target.value))}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#333333]"
//                 />
//                 <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     <span>Slow</span>
//                     <span>Fast</span>
//                 </div>
//             </div>
//
//             {/* Mouse Scroll Smoothing */}
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Scroll Smoothing: {settings.mouseScrollSmoothing.toFixed(2)}
//                 </label>
//                 <input
//                     type="range"
//                     min="0.1"
//                     max="1"
//                     step="0.05"
//                     value={settings.mouseScrollSmoothing}
//                     onChange={(e) => handleChange('mouseScrollSmoothing', parseFloat(e.target.value))}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#333333]"
//                 />
//                 <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     <span>More Smooth</span>
//                     <span>More Responsive</span>
//                 </div>
//             </div>
//
//             {/* Max Mouse Scroll Speed */}
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Max Scroll Speed: {settings.maxMouseScrollSpeed}px
//                 </label>
//                 <input
//                     type="range"
//                     min="50"
//                     max="500"
//                     step="10"
//                     value={settings.maxMouseScrollSpeed}
//                     onChange={(e) => handleChange('maxMouseScrollSpeed', parseInt(e.target.value))}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#333333]"
//                 />
//                 <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     <span>50px</span>
//                     <span>500px</span>
//                 </div>
//             </div>
//
//             {/* Mouse Acceleration */}
//             <div className="mb-4">
//                 <label className="flex items-center space-x-2">
//                     <input
//                         type="checkbox"
//                         checked={settings.enableMouseAcceleration}
//                         onChange={(e) => handleChange('enableMouseAcceleration', e.target.checked)}
//                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-[#333333] dark:border-gray-600"
//                     />
//                     <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Enable Mouse Acceleration
//                     </span>
//                 </label>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     Faster scrolling when wheel events happen quickly
//                 </p>
//             </div>
//
//             {/* Reset Button */}
//             <div className="flex space-x-2">
//                 <button
//                     onClick={resetToDefaults}
//                     className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#333333] dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded text-sm"
//                 >
//                     Reset to Defaults
//                 </button>
//             </div>
//
//             {/* Current Values Info */}
//             <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Current Settings:</p>
//                 <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
//                     <div>Speed: {settings.mouseScrollSpeed}x</div>
//                     <div>Smoothing: {settings.mouseScrollSmoothing}</div>
//                     <div>Max Speed: {settings.maxMouseScrollSpeed}px</div>
//                     <div>Acceleration: {settings.enableMouseAcceleration ? 'On' : 'Off'}</div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default function SmoothScroll({
//                                          children,
//                                          showSettingsPanel = false,
//                                          onSettingsChange
//                                      }: SmoothScrollProps) {
//     const scrollbarRef = useRef<HTMLDivElement>(null);
//     const [showScrollbar, setShowScrollbar] = useState(true);
//     const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(showSettingsPanel);
//     const [scrollSettings, setScrollSettings] = useState<ScrollSettings>(defaultSettings);
//     const pathname = usePathname();
//
//     // Mouse scroll state
//     const mouseScrollState = useRef({
//         lastWheelTime: 0,
//         wheelVelocity: 0,
//         accelerationFactor: 1
//     });
//
//     // Handle settings change
//     const handleSettingsChange = (newSettings: ScrollSettings) => {
//         setScrollSettings(newSettings);
//         onSettingsChange?.(newSettings);
//
//         // Save to localStorage for persistence
//         try {
//             localStorage.setItem('smoothScrollSettings', JSON.stringify(newSettings));
//         } catch (e) {
//             console.error(e);
//         }
//     };
//
//     // Load settings from localStorage on mount
//     useEffect(() => {
//         try {
//             const saved = localStorage.getItem('smoothScrollSettings');
//             if (saved) {
//                 const parsedSettings = JSON.parse(saved);
//                 setScrollSettings(parsedSettings);
//                 onSettingsChange?.(parsedSettings);
//             }
//         } catch (e) {
//             console.error(e);
//         }
//     }, []);
//
//     // Toggle settings panel with keyboard shortcut
//     useEffect(() => {
//         const handleKeyDown = (e: KeyboardEvent) => {
//             if (e.ctrlKey && e.shiftKey && e.key === 'S') {
//                 e.preventDefault();
//                 setIsSettingsPanelOpen(prev => !prev);
//             }
//         };
//
//         window.addEventListener('keydown', handleKeyDown);
//         return () => window.removeEventListener('keydown', handleKeyDown);
//     }, []);
//
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
//         // Force scroll update after DOM changes
//         const timeout1 = setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 100);
//         const timeout2 = setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 300);
//
//         return () => {
//             clearTimeout(timeout1);
//             clearTimeout(timeout2);
//             document.body.style.overflow = '';
//         };
//     }, [pathname]);
//
//     useEffect(() => {
//         if (pathname.startsWith('/auth')) {
//             window.scrollTo(0, 0);
//             document.documentElement.scrollTop = 0;
//         }
//     }, [pathname]);
//
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
//
//     useEffect(() => {
//         if (!scrollbarRef.current) return;
//
//         let currentScroll = 0;
//         let targetScroll = 0;
//         let isScrolling = false;
//         const scrollStopThreshold = 0.5;
//
//         // Enhanced mouse scroll calculations using current settings
//         const calculateMouseScrollDelta = (wheelDelta: number): number => {
//             const currentTime = Date.now();
//             const timeDelta = currentTime - mouseScrollState.current.lastWheelTime;
//
//             // Base scroll amount
//             let scrollDelta = wheelDelta * scrollSettings.mouseScrollSpeed;
//
//             if (scrollSettings.enableMouseAcceleration && timeDelta < 100) {
//                 // Calculate acceleration based on wheel frequency
//                 const frequency = 1000 / Math.max(timeDelta, 16);
//                 const accelerationMultiplier = Math.min(frequency / 10, 3);
//                 scrollDelta *= (1 + accelerationMultiplier * 0.5);
//             }
//
//             // Apply smoothing to the delta
//             const smoothedDelta = scrollDelta * scrollSettings.mouseScrollSmoothing +
//                 mouseScrollState.current.wheelVelocity * (1 - scrollSettings.mouseScrollSmoothing);
//
//             // Clamp to max speed
//             const clampedDelta = Math.sign(smoothedDelta) *
//                 Math.min(Math.abs(smoothedDelta), scrollSettings.maxMouseScrollSpeed);
//
//             // Update state
//             mouseScrollState.current.lastWheelTime = currentTime;
//             mouseScrollState.current.wheelVelocity = clampedDelta;
//
//             return clampedDelta;
//         };
//
//         const getAdaptiveEasing = () => {
//             const isHighRefreshRate = window.matchMedia('(min-resolution: 120dpi)').matches ||
//                 window.devicePixelRatio > 1.5;
//
//             const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//
//             if (prefersReducedMotion) {
//                 return 0.5;
//             }
//
//             const connection = (navigator as Navigator & { connection?: { effectiveType: string } }).connection;
//             const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
//
//             if (isSlowConnection) {
//                 return 0.4;
//             }
//
//             return isHighRefreshRate ? 0.25 : 0.35;
//         };
//
//         const scrollEaseFactor = getAdaptiveEasing();
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
//         // Custom events
//         const handleCustomScrollToTop = () => {
//             targetScroll = 0;
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         };
//
//         const handleSetTargetScroll = (e: CustomEvent) => {
//             targetScroll = e.detail.targetScroll || 0;
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         };
//
//         const handleWheel = (e: WheelEvent) => {
//             const target = e.target as HTMLElement;
//
//             // Allow native scroll inside textarea and scrollable div
//             if (target.closest('textarea') || target.closest('.allow-native-scroll')) {
//                 return;
//             }
//
//             e.preventDefault();
//
//             // Use enhanced mouse scroll calculation
//             const scrollDelta = calculateMouseScrollDelta(e.deltaY);
//             targetScroll += scrollDelta;
//
//             const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//             targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
//
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
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
//
//                         const offset = getScrollOffset();
//                         const elTop = (el as HTMLElement).offsetTop - offset;
//
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
//         const handleScroll = () => {
//             if (!isScrolling) {
//                 currentScroll = window.scrollY;
//                 targetScroll = currentScroll;
//             }
//         };
//
//         // Scrollbar logic (keeping original implementation)
//         let isTicking = false;
//         let isDragging = false;
//         let startY = 0;
//         let startScrollTop = 0;
//         const scrollPadding = 4;
//         const scrollbar = scrollbarRef.current;
//
//         function updateScrollbar() {
//             const scrollTop = window.scrollY || window.pageYOffset;
//             const scrollHeight = document.documentElement.scrollHeight;
//             const clientHeight = window.innerHeight || document.documentElement.clientHeight;
//             const maxScroll = scrollHeight - clientHeight;
//
//             const hideScrollPaths = [
//                 '/contacts/connection',
//                 '/pricing',
//                 '/auth/login',
//                 '/auth/register',
//                 '/auth/forgot-password'
//             ];
//             const shouldHide = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));
//
//             setShowScrollbar(!shouldHide);
//
//             const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
//             const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
//             const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;
//
//             if (scrollbar) {
//                 scrollbar.style.setProperty('--scrollY', `${topPercent}px`);
//                 scrollbar.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
//             }
//         }
//
//         function scrollMove(e: TouchEvent | MouseEvent) {
//             if (!isDragging) return;
//
//             const scrollHeight = document.documentElement.scrollHeight;
//             const clientHeight = window.innerHeight || document.documentElement.clientHeight;
//             const maxScrollDrag = scrollHeight - clientHeight;
//             const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
//             const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
//
//             let clientY = 0;
//             if (e instanceof TouchEvent) {
//                 clientY = e.touches[0].clientY;
//             } else {
//                 clientY = e.clientY;
//             }
//
//             const deltaY = clientY - startY;
//             const scrollDelta = (deltaY / maxTop) * maxScrollDrag;
//
//             targetScroll = Math.max(0, Math.min(startScrollTop + scrollDelta, maxScrollDrag));
//
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         }
//
//         function startScroll(e: TouchEvent | MouseEvent) {
//             isDragging = true;
//             let clientY = 0;
//
//             if (e instanceof TouchEvent) {
//                 clientY = e.touches[0].clientY;
//             } else {
//                 clientY = e.clientY;
//             }
//
//             startY = clientY;
//             startScrollTop = window.scrollY || window.pageYOffset;
//             e.preventDefault();
//         }
//
//         function stopScroll() {
//             isDragging = false;
//         }
//
//         let scrollTimeout: NodeJS.Timeout;
//         const scrollHandler = () => {
//             handleScroll();
//
//             if (!isTicking) {
//                 clearTimeout(scrollTimeout);
//                 scrollTimeout = setTimeout(() => {
//                     requestAnimationFrame(() => {
//                         updateScrollbar();
//                         isTicking = false;
//                     });
//                 }, 8);
//                 isTicking = true;
//             }
//         };
//
//         initScroll();
//         updateScrollbar();
//
//         // Event listeners
//         window.addEventListener('customScrollToTop', handleCustomScrollToTop);
//         window.addEventListener('setTargetScroll', handleSetTargetScroll as EventListener);
//         window.addEventListener('wheel', handleWheel, {passive: false});
//         window.addEventListener('scroll', scrollHandler, {passive: true});
//         document.addEventListener('click', handleAnchorClick);
//         window.addEventListener('resize', updateScrollbar);
//
//         if (scrollbar) {
//             scrollbar.addEventListener('mousedown', startScroll);
//             scrollbar.addEventListener('touchstart', startScroll);
//         }
//
//         document.addEventListener('mousemove', scrollMove);
//         document.addEventListener('mouseup', stopScroll);
//         document.addEventListener('touchmove', scrollMove);
//         document.addEventListener('touchend', stopScroll);
//
//         return () => {
//             clearTimeout(scrollTimeout);
//
//             window.removeEventListener('customScrollToTop', handleCustomScrollToTop);
//             window.removeEventListener('setTargetScroll', handleSetTargetScroll as EventListener);
//             window.removeEventListener('wheel', handleWheel);
//             window.removeEventListener('scroll', scrollHandler);
//             document.removeEventListener('click', handleAnchorClick);
//             window.removeEventListener('resize', updateScrollbar);
//
//             if (scrollbar) {
//                 scrollbar.removeEventListener('mousedown', startScroll);
//                 scrollbar.removeEventListener('touchstart', startScroll);
//             }
//
//             document.removeEventListener('mousemove', scrollMove);
//             document.removeEventListener('mouseup', stopScroll);
//             document.removeEventListener('touchmove', scrollMove);
//             document.removeEventListener('touchend', stopScroll);
//         };
//     }, [pathname, getScrollOffset, scrollSettings]);
//
//     useEffect(() => {
//         // Reset scroll position on page change
//         window.scrollTo(0, 0);
//         document.documentElement.scrollTop = 0;
//         document.body.scrollTop = 0;
//
//         // Force scrollbar update after navigation
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
//             {/* Settings Toggle Button */}
//             <button
//                 onClick={() => setIsSettingsPanelOpen(!isSettingsPanelOpen)}
//                 className="fixed bottom-[150px] right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-40 transition-colors"
//                 title="Toggle Scroll Settings (Ctrl+Shift+S)"
//             >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//                     <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
//                 </svg>
//             </button>
//
//             {/* Settings Panel */}
//             <ScrollSettingsPanel
//                 settings={scrollSettings}
//                 onSettingsChange={handleSettingsChange}
//                 onClose={() => setIsSettingsPanelOpen(false)}
//                 isOpen={isSettingsPanelOpen}
//             />
//         </>
//     );
// }


// 'use client'
// import React, {useEffect, useRef, useState} from "react";
// import {usePathname} from "next/navigation";
//
// interface SmoothScrollProps {
//     children: React.ReactNode;
//     showSettingsPanel?: boolean; // Toggle settings panel visibility
//     onSettingsChange?: (settings: ScrollSettings) => void; // Callback for settings changes
// }
//
// interface ScrollSettings {
//     mouseScrollSpeed: number;
//     mouseScrollSmoothing: number;
//     enableMouseAcceleration: boolean;
//     maxMouseScrollSpeed: number;
//     // Touchpad settings
//     touchpadScrollSpeed: number;
//     touchpadScrollSmoothing: number;
//     touchpadInertia: boolean;
//     touchpadPrecisionMode: boolean;
// }
//
// const defaultSettings: ScrollSettings = {
//     mouseScrollSpeed: 1,
//     mouseScrollSmoothing: 0.5,
//     enableMouseAcceleration: true,
//     maxMouseScrollSpeed: 200,
//
//     // Touchpad defaults
//     touchpadScrollSpeed: 1,
//     touchpadScrollSmoothing: 0.2,
//     touchpadInertia: true,
//     touchpadPrecisionMode: false
// };
//
// // Settings Panel Component
// const ScrollSettingsPanel: React.FC<{
//     settings: ScrollSettings;
//     onSettingsChange: (settings: ScrollSettings) => void;
//     onClose: () => void;
//     isOpen: boolean;
// }> = ({settings, onSettingsChange, onClose, isOpen}) => {
//     const handleChange = (key: keyof ScrollSettings, value: number | boolean) => {
//         onSettingsChange({
//             ...settings,
//             [key]: value
//         });
//     };
//
//     const resetToDefaults = () => {
//         onSettingsChange(defaultSettings);
//     };
//
//     const presets = {
//         smooth: {
//             mouseScrollSpeed: 0.8, mouseScrollSmoothing: 0.4, enableMouseAcceleration: false, maxMouseScrollSpeed: 150,
//             touchpadScrollSpeed: 0.6, touchpadScrollSmoothing: 0.3, touchpadInertia: true, touchpadPrecisionMode: true
//         },
//         fast: {
//             mouseScrollSpeed: 1.5, mouseScrollSmoothing: 0.15, enableMouseAcceleration: true, maxMouseScrollSpeed: 300,
//             touchpadScrollSpeed: 1.2, touchpadScrollSmoothing: 0.1, touchpadInertia: false, touchpadPrecisionMode: false
//         },
//         precise: {
//             mouseScrollSpeed: 0.5, mouseScrollSmoothing: 0.5, enableMouseAcceleration: false, maxMouseScrollSpeed: 100,
//             touchpadScrollSpeed: 0.4, touchpadScrollSmoothing: 0.4, touchpadInertia: true, touchpadPrecisionMode: true
//         },
//         default: defaultSettings
//     };
//
//     const applyPreset = (preset: keyof typeof presets) => {
//         onSettingsChange(presets[preset]);
//     };
//
//     if (!isOpen) return null;
//
//     return (
//         <div
//             className="fixed top-[70px] right-4 backdrop-blur-2xl border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 z-[9999999999] w-80 max-h-[80vh] overflow-y-auto allow-native-scroll"
//             style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}
//         >
//             <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                     Scroll Settings
//                 </h3>
//                 <button
//                     onClick={onClose}
//                     className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
//                 >
//                     ×
//                 </button>
//             </div>
//
//             {/* Presets */}
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Quick Presets:
//                 </label>
//                 <div className="grid grid-cols-2 gap-2">
//                     {Object.keys(presets).map((preset) => (
//                         <button
//                             key={preset}
//                             onClick={() => applyPreset(preset as keyof typeof presets)}
//                             className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 rounded capitalize"
//                         >
//                             {preset}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//
//             {/* Mouse Scroll Speed */}
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Mouse Scroll Speed: {settings.mouseScrollSpeed.toFixed(2)}
//                 </label>
//                 <input
//                     type="range"
//                     min="0.1"
//                     max="3"
//                     step="0.1"
//                     value={settings.mouseScrollSpeed}
//                     onChange={(e) => handleChange('mouseScrollSpeed', parseFloat(e.target.value))}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#333333]"
//                 />
//                 <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     <span>Slow</span>
//                     <span>Fast</span>
//                 </div>
//             </div>
//
//             {/* Mouse Scroll Smoothing */}
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Scroll Smoothing: {settings.mouseScrollSmoothing.toFixed(2)}
//                 </label>
//                 <input
//                     type="range"
//                     min="0.1"
//                     max="1"
//                     step="0.05"
//                     value={settings.mouseScrollSmoothing}
//                     onChange={(e) => handleChange('mouseScrollSmoothing', parseFloat(e.target.value))}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#333333]"
//                 />
//                 <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     <span>More Smooth</span>
//                     <span>More Responsive</span>
//                 </div>
//             </div>
//
//             {/* Max Mouse Scroll Speed */}
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Max Scroll Speed: {settings.maxMouseScrollSpeed}px
//                 </label>
//                 <input
//                     type="range"
//                     min="50"
//                     max="500"
//                     step="10"
//                     value={settings.maxMouseScrollSpeed}
//                     onChange={(e) => handleChange('maxMouseScrollSpeed', parseInt(e.target.value))}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#333333]"
//                 />
//                 <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     <span>50px</span>
//                     <span>500px</span>
//                 </div>
//             </div>
//
//             {/* Mouse Acceleration */}
//             <div className="mb-4">
//                 <label className="flex items-center space-x-2">
//                     <input
//                         type="checkbox"
//                         checked={settings.enableMouseAcceleration}
//                         onChange={(e) => handleChange('enableMouseAcceleration', e.target.checked)}
//                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-[#333333] dark:border-gray-600"
//                     />
//                     <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Enable Mouse Acceleration
//                     </span>
//                 </label>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     Faster scrolling when wheel events happen quickly
//                 </p>
//             </div>
//
//             {/* Touchpad Section */}
//             <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mb-4">
//                 <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
//                     Touchpad Settings
//                 </h4>
//
//                 {/* Touchpad Scroll Speed */}
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Touchpad Scroll Speed: {settings.touchpadScrollSpeed.toFixed(2)}
//                     </label>
//                     <input
//                         type="range"
//                         min="0.1"
//                         max="2"
//                         step="0.1"
//                         value={settings.touchpadScrollSpeed}
//                         onChange={(e) => handleChange('touchpadScrollSpeed', parseFloat(e.target.value))}
//                         className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#333333]"
//                     />
//                     <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
//                         <span>Slow</span>
//                         <span>Fast</span>
//                     </div>
//                 </div>
//
//                 {/* Touchpad Scroll Smoothing */}
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Touchpad Smoothing: {settings.touchpadScrollSmoothing.toFixed(2)}
//                     </label>
//                     <input
//                         type="range"
//                         min="0.05"
//                         max="0.8"
//                         step="0.05"
//                         value={settings.touchpadScrollSmoothing}
//                         onChange={(e) => handleChange('touchpadScrollSmoothing', parseFloat(e.target.value))}
//                         className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#333333]"
//                     />
//                     <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
//                         <span>More Smooth</span>
//                         <span>More Responsive</span>
//                     </div>
//                 </div>
//
//                 {/* Touchpad Inertia */}
//                 <div className="mb-4">
//                     <label className="flex items-center space-x-2">
//                         <input
//                             type="checkbox"
//                             checked={settings.touchpadInertia}
//                             onChange={(e) => handleChange('touchpadInertia', e.target.checked)}
//                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-[#333333] dark:border-gray-600"
//                         />
//                         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                             Enable Touchpad Inertia
//                         </span>
//                     </label>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                         Scroll continues smoothly after touchpad gesture ends
//                     </p>
//                 </div>
//
//                 {/* Touchpad Precision Mode */}
//                 <div className="mb-4">
//                     <label className="flex items-center space-x-2">
//                         <input
//                             type="checkbox"
//                             checked={settings.touchpadPrecisionMode}
//                             onChange={(e) => handleChange('touchpadPrecisionMode', e.target.checked)}
//                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-[#333333] dark:border-gray-600"
//                         />
//                         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                             Precision Mode
//                         </span>
//                     </label>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                         More precise control for small touchpad movements
//                     </p>
//                 </div>
//             </div>
//
//             {/* Reset Button */}
//             <div className="flex space-x-2">
//                 <button
//                     onClick={resetToDefaults}
//                     className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#333333] dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded text-sm"
//                 >
//                     Reset to Defaults
//                 </button>
//             </div>
//
//             {/* Current Values Info */}
//             <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Current Settings:</p>
//                 <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
//                     <div>Speed: {settings.mouseScrollSpeed}x</div>
//                     <div>Smoothing: {settings.mouseScrollSmoothing}</div>
//                     <div>Max Speed: {settings.maxMouseScrollSpeed}px</div>
//                     <div>Acceleration: {settings.enableMouseAcceleration ? 'On' : 'Off'}</div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default function SmoothScroll({
//                                          children,
//                                          showSettingsPanel = false,
//                                          onSettingsChange
//                                      }: SmoothScrollProps) {
//     const scrollbarRef = useRef<HTMLDivElement>(null);
//     const [showScrollbar, setShowScrollbar] = useState(true);
//     const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(showSettingsPanel);
//     const [scrollSettings, setScrollSettings] = useState<ScrollSettings>(defaultSettings);
//     const pathname = usePathname();
//
//     // Mouse scroll state
//     const mouseScrollState = useRef({
//         lastWheelTime: 0,
//         wheelVelocity: 0,
//         accelerationFactor: 1
//     });
//
//     // Handle settings change
//     const handleSettingsChange = (newSettings: ScrollSettings) => {
//         setScrollSettings(newSettings);
//         onSettingsChange?.(newSettings);
//
//         // Save to localStorage for persistence
//         try {
//             localStorage.setItem('smoothScrollSettings', JSON.stringify(newSettings));
//         } catch (e) {
//             console.error(e);
//         }
//     };
//
//     // Load settings from localStorage on mount
//     useEffect(() => {
//         try {
//             const saved = localStorage.getItem('smoothScrollSettings');
//             if (saved) {
//                 const parsedSettings = JSON.parse(saved);
//                 const merged = { ...defaultSettings, ...parsedSettings };
//                 setScrollSettings(merged);
//                 onSettingsChange?.(merged);
//             }
//         } catch (e) {
//             console.error(e);
//         }
//     }, []);
//
//     // Toggle settings panel with keyboard shortcut
//     useEffect(() => {
//         const handleKeyDown = (e: KeyboardEvent) => {
//             if (e.ctrlKey && e.shiftKey && e.key === 'S') {
//                 e.preventDefault();
//                 setIsSettingsPanelOpen(prev => !prev);
//             }
//         };
//
//         window.addEventListener('keydown', handleKeyDown);
//         return () => window.removeEventListener('keydown', handleKeyDown);
//     }, []);
//
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
//         // Force scroll update after DOM changes
//         const timeout1 = setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 100);
//         const timeout2 = setTimeout(() => {
//             window.dispatchEvent(new Event('scroll'));
//         }, 300);
//
//         return () => {
//             clearTimeout(timeout1);
//             clearTimeout(timeout2);
//             document.body.style.overflow = '';
//         };
//     }, [pathname]);
//
//     useEffect(() => {
//         if (pathname.startsWith('/auth')) {
//             window.scrollTo(0, 0);
//             document.documentElement.scrollTop = 0;
//         }
//     }, [pathname]);
//
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
//
//     useEffect(() => {
//         if (!scrollbarRef.current) return;
//
//         let currentScroll = 0;
//         let targetScroll = 0;
//         let isScrolling = false;
//         const scrollStopThreshold = 0.5;
//
//         // Enhanced mouse scroll calculations using current settings
//         const calculateMouseScrollDelta = (wheelDelta: number): number => {
//             const currentTime = Date.now();
//             const timeDelta = currentTime - mouseScrollState.current.lastWheelTime;
//
//             // Base scroll amount
//             let scrollDelta = wheelDelta * scrollSettings.mouseScrollSpeed;
//
//             if (scrollSettings.enableMouseAcceleration && timeDelta < 100) {
//                 // Calculate acceleration based on wheel frequency
//                 const frequency = 1000 / Math.max(timeDelta, 16);
//                 const accelerationMultiplier = Math.min(frequency / 10, 3);
//                 scrollDelta *= (1 + accelerationMultiplier * 0.5);
//             }
//
//             // Apply smoothing to the delta
//             const smoothedDelta = scrollDelta * scrollSettings.mouseScrollSmoothing +
//                 mouseScrollState.current.wheelVelocity * (1 - scrollSettings.mouseScrollSmoothing);
//
//             // Clamp to max speed
//             const clampedDelta = Math.sign(smoothedDelta) *
//                 Math.min(Math.abs(smoothedDelta), scrollSettings.maxMouseScrollSpeed);
//
//             // Update state
//             mouseScrollState.current.lastWheelTime = currentTime;
//             mouseScrollState.current.wheelVelocity = clampedDelta;
//
//             return clampedDelta;
//         };
//
//         const getAdaptiveEasing = () => {
//             const isHighRefreshRate = window.matchMedia('(min-resolution: 120dpi)').matches ||
//                 window.devicePixelRatio > 1.5;
//
//             const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//
//             if (prefersReducedMotion) {
//                 return 0.5;
//             }
//
//             const connection = (navigator as Navigator & { connection?: { effectiveType: string } }).connection;
//             const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
//
//             if (isSlowConnection) {
//                 return 0.4;
//             }
//
//             return isHighRefreshRate ? 0.25 : 0.35;
//         };
//
//         const scrollEaseFactor = getAdaptiveEasing();
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
//         // Custom events
//         const handleCustomScrollToTop = () => {
//             targetScroll = 0;
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         };
//
//         const handleSetTargetScroll = (e: CustomEvent) => {
//             targetScroll = e.detail.targetScroll || 0;
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         };
//
//         const handleWheel = (e: WheelEvent) => {
//             const target = e.target as HTMLElement;
//
//             // Allow native scroll inside textarea and scrollable div
//             if (target.closest('textarea') || target.closest('.allow-native-scroll')) {
//                 return;
//             }
//
//             e.preventDefault();
//
//             // Use enhanced mouse scroll calculation
//             const scrollDelta = calculateMouseScrollDelta(e.deltaY);
//             targetScroll += scrollDelta;
//
//             const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//             targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
//
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
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
//
//                         const offset = getScrollOffset();
//                         const elTop = (el as HTMLElement).offsetTop - offset;
//
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
//         const handleScroll = () => {
//             if (!isScrolling) {
//                 currentScroll = window.scrollY;
//                 targetScroll = currentScroll;
//             }
//         };
//
//         // Scrollbar logic (keeping original implementation)
//         let isTicking = false;
//         let isDragging = false;
//         let startY = 0;
//         let startScrollTop = 0;
//         const scrollPadding = 4;
//         const scrollbar = scrollbarRef.current;
//
//         function updateScrollbar() {
//             const scrollTop = window.scrollY || window.pageYOffset;
//             const scrollHeight = document.documentElement.scrollHeight;
//             const clientHeight = window.innerHeight || document.documentElement.clientHeight;
//             const maxScroll = scrollHeight - clientHeight;
//
//             const hideScrollPaths = [
//                 '/contacts/connection',
//                 '/pricing',
//                 '/auth/login',
//                 '/auth/register',
//                 '/auth/forgot-password'
//             ];
//             const shouldHide = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));
//
//             setShowScrollbar(!shouldHide);
//
//             const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
//             const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
//             const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;
//
//             if (scrollbar) {
//                 scrollbar.style.setProperty('--scrollY', `${topPercent}px`);
//                 scrollbar.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
//             }
//         }
//
//         function scrollMove(e: TouchEvent | MouseEvent) {
//             if (!isDragging) return;
//
//             const scrollHeight = document.documentElement.scrollHeight;
//             const clientHeight = window.innerHeight || document.documentElement.clientHeight;
//             const maxScrollDrag = scrollHeight - clientHeight;
//             const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
//             const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
//
//             let clientY = 0;
//             if (e instanceof TouchEvent) {
//                 clientY = e.touches[0].clientY;
//             } else {
//                 clientY = e.clientY;
//             }
//
//             const deltaY = clientY - startY;
//             const scrollDelta = (deltaY / maxTop) * maxScrollDrag;
//
//             targetScroll = Math.max(0, Math.min(startScrollTop + scrollDelta, maxScrollDrag));
//
//             if (!isScrolling) {
//                 isScrolling = true;
//                 requestAnimationFrame(smoothScroll);
//             }
//         }
//
//         function startScroll(e: TouchEvent | MouseEvent) {
//             isDragging = true;
//             let clientY = 0;
//
//             if (e instanceof TouchEvent) {
//                 clientY = e.touches[0].clientY;
//             } else {
//                 clientY = e.clientY;
//             }
//
//             startY = clientY;
//             startScrollTop = window.scrollY || window.pageYOffset;
//             e.preventDefault();
//         }
//
//         function stopScroll() {
//             isDragging = false;
//         }
//
//         let scrollTimeout: NodeJS.Timeout;
//         const scrollHandler = () => {
//             handleScroll();
//
//             if (!isTicking) {
//                 clearTimeout(scrollTimeout);
//                 scrollTimeout = setTimeout(() => {
//                     requestAnimationFrame(() => {
//                         updateScrollbar();
//                         isTicking = false;
//                     });
//                 }, 8);
//                 isTicking = true;
//             }
//         };
//
//         initScroll();
//         updateScrollbar();
//
//         // Event listeners
//         window.addEventListener('customScrollToTop', handleCustomScrollToTop);
//         window.addEventListener('setTargetScroll', handleSetTargetScroll as EventListener);
//         window.addEventListener('wheel', handleWheel, {passive: false});
//         window.addEventListener('scroll', scrollHandler, {passive: true});
//         document.addEventListener('click', handleAnchorClick);
//         window.addEventListener('resize', updateScrollbar);
//
//         if (scrollbar) {
//             scrollbar.addEventListener('mousedown', startScroll);
//             scrollbar.addEventListener('touchstart', startScroll);
//         }
//
//         document.addEventListener('mousemove', scrollMove);
//         document.addEventListener('mouseup', stopScroll);
//         document.addEventListener('touchmove', scrollMove);
//         document.addEventListener('touchend', stopScroll);
//
//         return () => {
//             clearTimeout(scrollTimeout);
//
//             window.removeEventListener('customScrollToTop', handleCustomScrollToTop);
//             window.removeEventListener('setTargetScroll', handleSetTargetScroll as EventListener);
//             window.removeEventListener('wheel', handleWheel);
//             window.removeEventListener('scroll', scrollHandler);
//             document.removeEventListener('click', handleAnchorClick);
//             window.removeEventListener('resize', updateScrollbar);
//
//             if (scrollbar) {
//                 scrollbar.removeEventListener('mousedown', startScroll);
//                 scrollbar.removeEventListener('touchstart', startScroll);
//             }
//
//             document.removeEventListener('mousemove', scrollMove);
//             document.removeEventListener('mouseup', stopScroll);
//             document.removeEventListener('touchmove', scrollMove);
//             document.removeEventListener('touchend', stopScroll);
//         };
//     }, [pathname, getScrollOffset, scrollSettings]);
//
//     useEffect(() => {
//         // Reset scroll position on page change
//         window.scrollTo(0, 0);
//         document.documentElement.scrollTop = 0;
//         document.body.scrollTop = 0;
//
//         // Force scrollbar update after navigation
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
//             {/* Settings Toggle Button */}
//             <button
//                 onClick={() => setIsSettingsPanelOpen(!isSettingsPanelOpen)}
//                 className="fixed bottom-[100px] right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-40 transition-colors"
//                 title="Toggle Scroll Settings (Ctrl+Shift+S)"
//             >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//                     <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
//                 </svg>
//             </button>
//
//             {/* Settings Panel */}
//             <ScrollSettingsPanel
//                 settings={scrollSettings}
//                 onSettingsChange={handleSettingsChange}
//                 onClose={() => setIsSettingsPanelOpen(false)}
//                 isOpen={isSettingsPanelOpen}
//             />
//         </>
//     );
// }