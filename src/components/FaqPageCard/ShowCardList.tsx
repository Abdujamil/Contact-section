// import React, {useState, useEffect, useRef} from "react";
// import styles from '@/app/faq/faq.module.scss';
// import FaqCard from "./FaqCard";
// import {faqData} from "@/data/faq";
//
// type Props = {
//     initialOpenId?: number;
//     onToggle?: (id: number | null) => void;
// };
//
// const CardListt: React.FC<Props> = ({initialOpenId, onToggle}) => {
//     const [openIds, setOpenIds] = useState<number[]>(initialOpenId ? [initialOpenId] : []);
//
//     // Используем useRef для хранения всех ссылок на карточки
//     const cardRefs = useRef<Record<number, React.RefObject<HTMLDivElement>>>({}); // Явно указываем тип
//
//     const scrollToCard = (id: number) => {
//         const el = cardRefs.current[id]?.current;
//         if (el) {
//             const headerOffset = 80;
//             const elTop = el.offsetTop - headerOffset;
//
//             // Триггерим кастомное событие setTargetScroll
//             window.dispatchEvent(new CustomEvent("setTargetScroll", {
//                 detail: {targetScroll: elTop}
//             }));
//         }
//     };
//
//     const observer = useRef<IntersectionObserver | null>(null);
//
//     useEffect(() => {
//         if (observer.current) observer.current.disconnect();
//
//         // Создаем новый IntersectionObserver для наблюдения за видимостью карточек
//         observer.current = new IntersectionObserver((entries) => {
//             const visibleEntry = entries.find((entry) => entry.isIntersecting);
//             if (visibleEntry) {
//                 const visibleId = Number(visibleEntry.target.getAttribute("data-id"));
//                 if (openIds.includes(visibleId)) {
//                     onToggle?.(visibleId);
//                 }
//             }
//         }, {
//             threshold: 0.5,
//         });
//
//         // Подключаем observer к каждому элементу карточки через реф
//         Object.values(cardRefs.current).forEach((ref) => {
//             if (ref.current) observer.current?.observe(ref.current);
//         });
//
//         return () => observer.current?.disconnect();
//     }, [openIds, onToggle]);
//
//     const handleToggle = (id: number) => {
//         const isCurrentlyOpen = openIds.includes(id);
//         const newOpenIds = openIds.includes(id)
//             ? openIds.filter(openId => openId !== id)  // Убираем карточку из открытых
//             : [...openIds, id]; // Добавляем в открытые
//
//         setOpenIds(newOpenIds);
//
//         if (!isCurrentlyOpen) {
//             scrollToCard(id);
//         }
//
//         if (onToggle) {
//             onToggle(newOpenIds.length > 0 ? newOpenIds[newOpenIds.length - 1] : null); // Отправляем последний открытый ID
//         }
//     };
//
//     return (
//         <div className={`${styles.pageFaq} block`}>
//             {faqData.map((item) => (
//                 <div
//                     key={item.id}
//                     ref={(el) => {
//                         // Обновляем рефы, используя useRef для каждой карточки
//                         cardRefs.current[item.id] = el ? {current: el} : cardRefs.current[item.id];
//                     }}
//                     data-id={item.id}
//                 >
//                     <FaqCard
//                         id={item.id}
//                         num={item.num}
//                         question={item.question}
//                         fullAnswer={item.fullAnswer}
//                         src={item.src}
//                         isOpen={openIds.includes(item.id)} // проверяем, открыта ли карточка
//                         onToggle={() => handleToggle(item.id)}
//                         animationSettings={{
//                             duration: 0.6,
//                             bounce: 5,
//                             delay: 0,
//                             ease: [0.30, 1.7, 0.60, 1],
//                             times: [0, 0.2, 0.5, 0.8, 1],
//                             openY: [0, 26, 0, 0, 0],
//                             closeY: [60, -6, 0, 0, 0],
//                             opacity: [0, 1, 1, 1, 1],
//                         }}
//                         answer=""
//                     />
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// export default CardListt;

import React, {useState, useEffect, useRef} from "react";
import styles from '@/app/faq/faq.module.scss';
import FaqCard from "./FaqCard";
import {faqData} from "@/data/faq";

type Props = {
    initialOpenId?: number;
    onToggle?: (id: number | null) => void;
};

const CardListt: React.FC<Props> = ({initialOpenId, onToggle}) => {
    const [openIds, setOpenIds] = useState<number[]>(initialOpenId ? [initialOpenId] : []);
    const [isInitialized, setIsInitialized] = useState(false);

    // Используем useRef для хранения всех ссылок на карточки
    const cardRefs = useRef<Record<number, React.RefObject<HTMLDivElement>>>({}); // Явно указываем тип

    const scrollToCard = (id: number) => {
        const el = cardRefs.current[id]?.current;
        if (el) {
            const headerOffset = 80;
            const elTop = el.offsetTop - headerOffset;

            // Триггерим кастомное событие setTargetScroll
            window.dispatchEvent(new CustomEvent("setTargetScroll", {
                detail: {targetScroll: elTop}
            }));
        }
    };

    // Функция для скролла с задержкой (для случаев когда DOM еще не готов)
    const scrollToCardWithDelay = (id: number, delay: number = 100) => {
        setTimeout(() => {
            scrollToCard(id);
        }, delay);
    };

    const observer = useRef<IntersectionObserver | null>(null);

    // Эффект для первоначального скролла при загрузке
    useEffect(() => {
        if (initialOpenId && !isInitialized) {
            // Сначала пробуем скролл сразу
            scrollToCard(initialOpenId);

            // Если не получилось, пробуем с задержкой
            scrollToCardWithDelay(initialOpenId, 100);
            scrollToCardWithDelay(initialOpenId, 300);
            scrollToCardWithDelay(initialOpenId, 500);

            setIsInitialized(true);
        }
    }, [initialOpenId, isInitialized]);

    // Эффект для наблюдения за видимостью карточек
    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        // Создаем новый IntersectionObserver для наблюдения за видимостью карточек
        observer.current = new IntersectionObserver((entries) => {
            const visibleEntry = entries.find((entry) => entry.isIntersecting);
            if (visibleEntry) {
                const visibleId = Number(visibleEntry.target.getAttribute("data-id"));
                if (openIds.includes(visibleId)) {
                    onToggle?.(visibleId);
                }
            }
        }, {
            threshold: 0.5,
        });

        // Подключаем observer к каждому элементу карточки через реф
        Object.values(cardRefs.current).forEach((ref) => {
            if (ref.current) observer.current?.observe(ref.current);
        });

        return () => observer.current?.disconnect();
    }, [openIds, onToggle]);

    const handleToggle = (id: number) => {
        const isCurrentlyOpen = openIds.includes(id);
        const newOpenIds = openIds.includes(id)
            ? openIds.filter(openId => openId !== id)  // Убираем карточку из открытых
            : [...openIds, id]; // Добавляем в открытые

        setOpenIds(newOpenIds);

        if (!isCurrentlyOpen) {
            scrollToCard(id);
        }

        if (onToggle) {
            onToggle(newOpenIds.length > 0 ? newOpenIds[newOpenIds.length - 1] : null); // Отправляем последний открытый ID
        }
    };

    return (
        <div className={`${styles.pageFaq} block`}>
            {faqData.map((item) => (
                <div
                    key={item.id}
                    ref={(el) => {
                        // Обновляем рефы, используя useRef для каждой карточки
                        cardRefs.current[item.id] = el ? {current: el} : cardRefs.current[item.id];
                    }}
                    data-id={item.id}
                >
                    <FaqCard
                        id={item.id}
                        num={item.num}
                        question={item.question}
                        fullAnswer={item.fullAnswer}
                        src={item.src}
                        isOpen={openIds.includes(item.id)} // проверяем, открыта ли карточка
                        onToggle={() => handleToggle(item.id)}
                        animationSettings={{
                            duration: 0.6,
                            bounce: 5,
                            delay: 0,
                            ease: [0.30, 1.7, 0.60, 1],
                            times: [0, 0.2, 0.5, 0.8, 1],
                            openY: [0, 26, 0, 0, 0],
                            closeY: [60, -6, 0, 0, 0],
                            opacity: [0, 1, 1, 1, 1],
                        }}
                        answer=""
                    />
                </div>
            ))}
        </div>
    );
};

export default CardListt;