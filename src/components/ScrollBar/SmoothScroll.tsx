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
        const isContact = pathname === '/contact';
        const isPricing = pathname === '/pricing';
        const isOrganization = pathname === '/organizations';

        // Скрываем нативный скролл при переходе на /contact
        document.body.style.overflow = isContact || isPricing || isOrganization ? 'hidden' : '';
        setShowScrollbar(!isContact);

        // Принудительно пересчитываем скроллбар после рендера страницы
        const timeout1 = setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, 50);
        const timeout2 = setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, 200); // на случай отложенного контента

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            document.body.style.overflow = '';
        };
    }, [pathname]);

    // Функция для получения offset в зависимости от страницы
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
        // if (pathname.includes('/organizations')) {
        //     return -130;
        // }
        return 120; // Дефолтный offset для остальных страниц
    };

    useEffect(() => {
        if (!scrollbarRef.current) return;

        let currentScroll = 0;
        let targetScroll = 0;
        let isScrolling = false;
        const scrollStopThreshold = 0.1;
        const scrollEaseFactor = 0.2;

        // Инициализируем текущую прокрутку
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

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            targetScroll += e.deltaY;

            // Ограничим targetScroll в пределах документа
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(smoothScroll);
            }
        };

        // Обработчик кликов по якорям - адаптированный из ScrollWrapper
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A") {
                const anchor = target.getAttribute("href");
                if (anchor?.startsWith("#")) {
                    const el = document.querySelector(anchor);
                    if (el) {
                        e.preventDefault();

                        const offset = getScrollOffset(); // отступ вверх (в пикселях)
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

        // Обработчик обычного скролла
        const handleScroll = () => {
            if (!isScrolling) {
                currentScroll = window.scrollY;
                targetScroll = currentScroll;
            }
        };

        // Кастомный скроллбар логика
        let isTicking = false;
        let isDragging = false;
        let startY = 0;
        let startScrollTop = 0;
        const scrollPadding = 4;
        const scrollbar = scrollbarRef.current;

        // Обновление позиции и высоты ползунка при прокрутке
        function updateScrollbar() {
            const scrollTop = window.scrollY || window.pageYOffset;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight || document.documentElement.clientHeight;
            const maxScroll = scrollHeight - clientHeight;

            setShowScrollbar(!pathname.includes("/contact"));


            // Показываем скроллбар только если есть что скроллить
            // const shouldShowScrollbar = maxScroll > 10; // небольшой порог
            // setShowScrollbar(shouldShowScrollbar);

            // if (!shouldShowScrollbar) return;

            // Высота ползунка
            const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
            // Позиция ползунка
            const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
            const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;

            // Обновляем CSS-переменные
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

            // Используем нашу систему плавного скролла
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

        // Обработчик прокрутки с обновлением скроллбара
        const scrollHandler = () => {
            handleScroll(); // наша логика плавного скролла

            if (!isTicking) {
                requestAnimationFrame(() => {
                    updateScrollbar();
                    isTicking = false;
                });
                isTicking = true;
            }
        };

        // Инициализация
        initScroll();
        updateScrollbar();

        // Добавляем слушатели
        window.addEventListener('wheel', handleWheel, {passive: false});
        window.addEventListener('scroll', scrollHandler);
        document.addEventListener('click', handleAnchorClick);
        window.addEventListener('resize', updateScrollbar);

        // Скроллбар события
        if (scrollbar) {
            scrollbar.addEventListener('mousedown', startScroll);
            scrollbar.addEventListener('touchstart', startScroll);
        }

        document.addEventListener('mousemove', scrollMove);
        document.addEventListener('mouseup', stopScroll);
        document.addEventListener('touchmove', scrollMove);
        document.addEventListener('touchend', stopScroll);

        // Очистка при размонтировании
        return () => {
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
    }, [pathname]); // Добавляем pathname в зависимости для пересчета offset


    // Сброс скролла при смене страницы
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            {children}
            {showScrollbar && <div ref={scrollbarRef} className="scrollbar"></div>}
            {/* <div ref={scrollbarRef} className="scrollbar"></div>*/}
        </>
    );
}