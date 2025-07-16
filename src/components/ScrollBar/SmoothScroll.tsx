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

    // useEffect(() => {
    //     const isContact = pathname === '/contact';
    //     const isPricing = pathname === '/pricing';
    //     const isOrganization = pathname === '/organizations';
    //
    //     document.body.style.overflow = isContact || isPricing || isOrganization ? 'hidden' : '';
    //     setShowScrollbar(!isContact);
    //
    //     const timeout1 = setTimeout(() => {
    //         window.dispatchEvent(new Event('scroll'));
    //     }, 50);
    //     const timeout2 = setTimeout(() => {
    //         window.dispatchEvent(new Event('scroll'));
    //     }, 200);
    //
    //     return () => {
    //         clearTimeout(timeout1);
    //         clearTimeout(timeout2);
    //         document.body.style.overflow = '';
    //     };
    // }, [pathname]);

    useEffect(() => {
        const hideScrollPaths = [
            '/contact',
            '/pricing',
            '/organizations',
            ...pathname.startsWith("/auth") ? [pathname] : []
        ];

        const shouldHideScrollbar = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));

        document.body.style.overflow = shouldHideScrollbar ? 'hidden' : '';
        setShowScrollbar(!shouldHideScrollbar);

        const timeout1 = setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, 50);
        const timeout2 = setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, 200);

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


    const getScrollOffset = () => {
        if (pathname.includes('/politic') || pathname.includes('/organizations')) {
            return -130;
        }
        if (pathname.includes('/blog')) {
            return -188;
        }
        if (pathname.includes('/editors')) {
            return 90;
        }
        return 120;
    };

    useEffect(() => {
        if (!scrollbarRef.current) return;

        let currentScroll = 0;
        let targetScroll = 0;
        let isScrolling = false;
        const scrollStopThreshold = 0.1;
        const scrollEaseFactor = 0.2;

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

        // ДОБАВЛЯЕМ: Обработчик кастомного события для скролла в начало
        const handleCustomScrollToTop = () => {
            targetScroll = 0;
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(smoothScroll);
            }
        };

        // ДОБАВЛЯЕМ: Обработчик для установки конкретного targetScroll
        const handleSetTargetScroll = (e: CustomEvent) => {
            targetScroll = e.detail.targetScroll || 0;
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(smoothScroll);
            }
        };

        const handleWheel = (e: WheelEvent) => {
            const target = e.target as HTMLElement;

            // Разрешаем нативный скролл внутри textarea и scrollable div
            if (target.closest('textarea') || target.closest('.allow-native-scroll')) {
                return;
            }

            e.preventDefault();
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

        const handleScroll = () => {
            if (!isScrolling) {
                currentScroll = window.scrollY;
                targetScroll = currentScroll;
            }
        };

        // Весь остальной код скроллбара остается без изменений...
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

            const hideScrollPaths = ['/contact', '/pricing'];
            const shouldHide = hideScrollPaths.some(path => pathname.includes(path)) || pathname.startsWith("/auth");

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

        const scrollHandler = () => {
            handleScroll();

            if (!isTicking) {
                requestAnimationFrame(() => {
                    updateScrollbar();
                    isTicking = false;
                });
                isTicking = true;
            }
        };

        initScroll();
        updateScrollbar();

        // ДОБАВЛЯЕМ: Слушатели для кастомных событий
        window.addEventListener('customScrollToTop', handleCustomScrollToTop);
        window.addEventListener('setTargetScroll', handleSetTargetScroll as EventListener);

        // ДОБАВЛЯЕМ: Слушатель для кастомного события скролла в начало
        window.addEventListener('customScrollToTop', handleCustomScrollToTop);

        window.addEventListener('wheel', handleWheel, {passive: false});
        window.addEventListener('scroll', scrollHandler);
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
            // ДОБАВЛЯЕМ: Очистка кастомных событий
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
    }, [pathname]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            {children}
            {showScrollbar && <div ref={scrollbarRef} className="scrollbar md:block hidden"></div>}
        </>
    );
}