// import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
// import styles from '@/app/page.module.scss'
// import {AnimatePresence, motion, useAnimation} from "framer-motion";
// import gsap from "gsap";
// import {Observer} from "gsap/Observer";
// import {ScrollToPlugin} from "gsap/ScrollToPlugin";
// import {bounceActiveBlock} from "@/components/Form/bounce";
// import {usePickerScroll} from "@/components/ScrollBar/usePickerScroll";
//
// interface DatePickerProps {
//     isVisible: boolean;
//     onDateSelect: (date: string) => void;
//     onClose: () => void;
//     initialDate?: string;
// }
//
// export const DatePicker: React.FC<DatePickerProps> = ({
//                                                           isVisible,
//                                                           onDateSelect,
//                                                           onClose,
//                                                           initialDate
//                                                       }) => {
//     const months = [
//         'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
//         'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
//     ];
//
//     gsap.registerPlugin(Observer, ScrollToPlugin);
//     const controls = useAnimation();
//     const currentYear = new Date().getFullYear();
//
//     // Create infinite arrays for seamless scrolling - оптимизированная версия
//     const createInfiniteArray = <T, >(baseArray: T[], repeatCount: number = 2): T[] => {
//         const result: T[] = [];
//         for (let i = 0; i < repeatCount; i++) {
//             result.push(...baseArray);
//         }
//         return result;
//     };
//
//     // Create static days array (1-31, without month dependency)
//     const baseDays = Array.from({length: 31}, (_, i) => i + 1);
//     const infiniteDays = createInfiniteArray(baseDays, 1);
//
//     // Months repeated
//     const infiniteMonths = createInfiniteArray(months, 1);
//
//     // Years from 1900
//     const baseYears = Array.from({length: currentYear - 1900 + 1}, (_, i) => currentYear - i).filter(year => year >= 1900);
//     const infiniteYears = createInfiniteArray(baseYears, 1);
//
//     const parseInitialDate = (dateString?: string) => {
//         if (!dateString) return {day: 1, month: 0, year: 2000}; // дефолт: 1 января 2000
//
//         const parts = dateString.split('.');
//         if (parts.length === 3) {
//             const day = parseInt(parts[0]) || 1;
//             const month = (parseInt(parts[1]) || 1) - 1;
//             const year = Math.max(1900, parseInt(parts[2]) || 2000);
//             return {day, month, year};
//         }
//         return {day: 1, month: 0, year: 2000}; // дефолт: 1 января 2000
//     };
//
//     const initial = parseInitialDate(initialDate);
//     const [selectedDay, setSelectedDay] = useState(initial.day);
//     const [selectedMonth, setSelectedMonth] = useState(initial.month);
//     const [selectedYear, setSelectedYear] = useState(initial.year);
//
//     const dayRef = useRef<HTMLDivElement | null>(null);
//     const monthRef = useRef<HTMLDivElement | null>(null);
//     const yearRef = useRef<HTMLDivElement | null>(null);
//
//     const isScrollingRef = useRef(false);
//     const ITEM_HEIGHT = 28;
//
//     // Применяем кастомный скролл к каждому контейнеру - теперь только для колесика мыши
//     usePickerScroll(dayRef, {itemHeight: ITEM_HEIGHT});
//     usePickerScroll(monthRef, {itemHeight: ITEM_HEIGHT});
//     usePickerScroll(yearRef, {itemHeight: ITEM_HEIGHT});
//
//     // Calculate centered indices only once when the date picker is opened
//     const [centerDayIndex, setCenterDayIndex] = useState(() => {
//         const middleIndex = Math.floor(infiniteDays.length / 2);
//         return middleIndex + initial.day - 1;
//     });
//     const [centerMonthIndex, setCenterMonthIndex] = useState(() => {
//         const middleIndex = Math.floor(infiniteMonths.length / 2);
//         return middleIndex + initial.month;
//     });
//     const [centerYearIndex, setCenterYearIndex] = useState(() => {
//         const middleIndex = Math.floor(infiniteYears.length / 2);
//         const yearOffset = baseYears.findIndex(y => y === initial.year);
//         return yearOffset !== -1 ? middleIndex + yearOffset : middleIndex;
//     });
//
//     // Optimized scroll handler with throttling
//     const throttledScrollHandler = useRef<{ [key: string]: NodeJS.Timeout }>({});
//
//     const getCenteredIndex = (container: HTMLDivElement | null) => {
//         if (!container) return -1;
//
//         const containerRect = container.getBoundingClientRect();
//         const centerY = containerRect.top + containerRect.height / 2;
//
//         const items = Array.from(container.children[0]?.children || []) as HTMLDivElement[];
//
//         let closestIndex = -1;
//         let minDistance = Infinity;
//
//         for (let i = 0; i < items.length; i++) {
//             const item = items[i];
//             if (!item) continue;
//             const itemRect = item.getBoundingClientRect();
//             const itemCenterY = itemRect.top + itemRect.height / 2;
//             const distance = Math.abs(itemCenterY - centerY);
//
//             if (distance < minDistance) {
//                 minDistance = distance;
//                 closestIndex = i;
//             }
//         }
//
//         return closestIndex;
//     };
//
//     const scrollToSelected = () => {
//         if (yearRef.current) {
//             const middleIndex = Math.floor(infiniteYears.length / 20);
//             const yearOffset = baseYears.findIndex(y => y === selectedYear);
//             if (yearOffset !== -1) {
//                 const yearIndex = middleIndex + yearOffset;
//                 const targetScroll = yearIndex * ITEM_HEIGHT;
//                 yearRef.current.scrollTo({top: targetScroll});
//                 setCenterYearIndex(yearIndex);
//             }
//         }
//     };
//
//     useLayoutEffect(() => {
//         const parsed = parseInitialDate(initialDate);
//         setSelectedDay(parsed.day);
//         setSelectedMonth(parsed.month);
//         setSelectedYear(parsed.year);
//
//         // Проверяем, что контейнеры уже отрисованы
//         if (dayRef.current && monthRef.current && yearRef.current) {
//             scrollToSelected();
//         }
//     }, [isVisible, initialDate]);
//
//     useEffect(() => {
//         const handleScrollCheck = () => {
//             if (!isScrollingRef.current) {
//                 if (dayRef.current) {
//                     const index = getCenteredIndex(dayRef.current);
//                     if (index !== -1) setCenterDayIndex(index);
//                 }
//                 if (monthRef.current) {
//                     const index = getCenteredIndex(monthRef.current);
//                     if (index !== -1) setCenterMonthIndex(index);
//                 }
//                 if (yearRef.current) {
//                     const index = getCenteredIndex(yearRef.current);
//                     if (index !== -1) setCenterYearIndex(index);
//                 }
//             }
//             requestAnimationFrame(handleScrollCheck);
//         };
//
//         if (isVisible) {
//             handleScrollCheck();
//         }
//     }, [isVisible]);
//
//     // function for getting the number of days in a month
//     const getDaysInMonth = (month: number, year: number) => {
//         return new Date(year, month + 1, 0).getDate();
//     };
//
//     const handleConfirm = () => {
//         const year = infiniteYears[centerYearIndex];
//         const day = infiniteDays[centerDayIndex];
//         const month = centerMonthIndex % 12;
//
//         // Проверяем максимальное количество дней в выбранном месяце
//         const maxDays = getDaysInMonth(month, year);
//         const validDay = Math.min(day, maxDays);
//
//         const formattedDate = `${validDay.toString().padStart(2, '0')}.${(month + 1).toString().padStart(2, '0')}.${year}`;
//
//         setSelectedDay(validDay);
//         setSelectedMonth(month);
//         setSelectedYear(year);
//
//         onDateSelect(formattedDate);
//         onClose();
//     };
//
//     const handleScroll = (
//         ref: React.RefObject<HTMLDivElement | null>,
//         setValue: (value: number) => void,
//         items: (number | string)[],
//         type: 'day' | 'month' | 'year'
//     ) => {
//         if (!ref.current) return;
//
//         const key = `${type}_scroll`;
//
//         if (throttledScrollHandler.current[key]) {
//             clearTimeout(throttledScrollHandler.current[key]);
//         }
//
//         isScrollingRef.current = true;
//
//         throttledScrollHandler.current[key] = setTimeout(() => {
//             if (!ref.current) return;
//
//             const idx = getCenteredIndex(ref.current);
//             if (idx === -1) return;
//
//             if (type === 'day') {
//                 setValue(items[idx] as number);
//             } else if (type === 'month') {
//                 setValue(idx % 12);
//             } else {
//                 setValue(items[idx] as number);
//             }
//
//             isScrollingRef.current = false;
//         }, 100);
//     };
//
//     // Style without any effects during scroll
//     const getItemStyle = () => {
//         return {
//             opacity: 1,
//             transform: 'none',
//             transformOrigin: 'center center',
//             pointerEvents: 'auto' as const
//         };
//     };
//
//     useEffect(() => {
//         if (isVisible) {
//             const timer = setTimeout(() => {
//                 bounceActiveBlock('dataPicker', controls);
//             }, 10);
//
//             return () => clearTimeout(timer);
//         }
//     }, [isVisible, controls]);
//
//     if (!isVisible) return null;
//
//     return (
//         <AnimatePresence>
//             <motion.div
//                 id={`date-picker`}
//                 key="date-picker"
//                 initial={{y: 0, opacity: 1}}
//                 animate={controls}
//                 className="w-[310px] !font-[Rubik] absolute z-[99]  top-auto bottom-[59.5%] md:bottom-[25.4%] left-[2.98%] md:left-[3.98%]">
//                 <div className="w-full max-w-[296px] mx-4">
//                     <div className="relative h-[253px]">
//                         <div
//                             className={`${styles.datePicker} relative z-[2] text-center pb-[50px] px-[1px] h-[110px] pt-[5px] rounded-[4px] mb-[33px]`}>
//                         </div>
//                         <div
//                             className={` w-full pointer-events-none absolute top-0 z-[9999] text-center pb-[50px] px-[1px] h-[110px] pt-[5px] border-1 border-[#353535] rounded-[4px] mb-[33px]`}>
//                         </div>
//
//                         {/* Selection indicator - more visible borders */}
//                         <div
//                             className={`${styles.datePickerIndicator} w-[274px] m-auto max-h-[36px] absolute top-[43%] left-[10px] h-11 border-l-1 border-r-1 border-[#353535] bg-[#3d9ed612]  backdrop-blur-[15px]  pointer-events-none`}>
//                         </div>
//
//                         <div
//                             className="flex  justify-center gap-[30px] w-full h-full max-h-[160px] absolute top-[45px] z-[9]">
//
//                             {/*Close icon*/}
//                             <button onClick={onClose}
//                                     className="absolute top-[-33px] right-[11px] z-[999999] text-[#3D9ED6]  text-base cursor-pointer transition-colors hover:text-[#5BADDB]"
//                             >
//                                 <svg
//                                     className="animated-close"
//                                     width="14" height="14" viewBox="0 0 14 14" fill="none"
//                                     xmlns="http://www.w3.org/2000/svg">
//                                     <g clipPath="url(#clip0_5371_3270)">
//                                         <mask id="mask0_5371_3270" style={{maskType: 'luminance'}}
//                                               maskUnits="userSpaceOnUse"
//                                               x="-1" y="-1" width="16" height="16">
//                                             <path d="M15 -1H-1V15H15V-1Z" fill="white"/>
//                                         </mask>
//                                         <g mask="url(#mask0_5371_3270)">
//                                             <path
//                                                 d="M0.636568 2.05093L11.9503 13.3646L13.3645 11.9504L2.05078 0.636719L0.636568 2.05093Z"
//                                                 fill="#ADADAD"/>
//                                             <path
//                                                 d="M2.05093 13.3647L8.41489 7.00069L7.00068 5.58648L0.636719 11.9504L2.05093 13.3647ZM10.5362 4.87937L13.3646 2.05094L11.9504 0.636731L9.122 3.46516L10.5362 4.87937Z"
//                                                 fill="#ADADAD"/>
//                                         </g>
//                                     </g>
//                                     <defs>
//                                         <clipPath id="clip0_5371_3270">
//                                             <rect width="14" height="14" fill="white"/>
//                                         </clipPath>
//                                     </defs>
//                                 </svg>
//                             </button>
//                             <div className={`${styles.datePickerHeader}`}></div>
//
//                             {/* Day wheel */}
//                             <div className="w-[25px] relative overflow-hidden">
//                                 <div
//                                     ref={dayRef}
//                                     className="h-full overflow-y-auto"
//                                     style={{
//                                         scrollSnapType: 'y mandatory', // ВАЖНО: возвращаем scroll-snap для трекпада
//                                         perspective: '1000px',
//                                         scrollbarWidth: 'none',
//                                         msOverflowStyle: 'none',
//                                         WebkitOverflowScrolling: 'touch'
//                                     }}
//                                     onScroll={() => handleScroll(dayRef, setSelectedDay, infiniteDays, 'day')}
//                                 >
//                                     <div className="py-20 flex flex-col gap-[15px]">
//                                         {infiniteDays.map((day, index) => (
//                                             <div
//                                                 key={`day-${index}`}
//                                                 className={`max-h-[20px] flex items-center justify-center text-lg  select-none
//                                                 ${centerDayIndex === index ? 'text-[#ссс]' : 'text-[#878787]'
//                                                 }`}
//                                                 style={{
//                                                     scrollSnapAlign: 'center', // ВАЖНО: возвращаем для трекпада
//                                                     ...getItemStyle()
//                                                 }}
//                                             >
//                                                 {day}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//
//                             {/* Month wheel */}
//                             <div className="w-[100px] relative overflow-hidden">
//                                 <div
//                                     ref={monthRef}
//                                     className="h-full overflow-y-auto"
//                                     style={{
//                                         scrollSnapType: 'y mandatory', // ВАЖНО: возвращаем scroll-snap для трекпада
//                                         perspective: '1000px',
//                                         scrollbarWidth: 'none',
//                                         msOverflowStyle: 'none',
//                                         WebkitOverflowScrolling: 'touch'
//                                     }}
//                                     onScroll={() => handleScroll(monthRef, setSelectedMonth, infiniteMonths, 'month')}
//                                 >
//                                     <div className="py-20 flex flex-col gap-[15px]">
//                                         {infiniteMonths.map((month, index) => (
//                                             <div
//                                                 key={`month-${index}`}
//                                                 className={`max-h-[20px] flex items-center justify-start text-lg  select-none
//                                             ${centerMonthIndex === index ? 'text-[#ссс]' : 'text-[#878787]'
//                                                 }`}
//                                                 style={{
//                                                     scrollSnapAlign: 'center', // ВАЖНО: возвращаем для трекпада
//                                                     ...getItemStyle()
//                                                 }}
//                                             >
//                                                 {month}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//
//                             {/* Year wheel */}
//                             <div className="w-[60px] relative overflow-hidden">
//                                 <div
//                                     ref={yearRef}
//                                     className="h-full overflow-y-auto"
//                                     style={{
//                                         scrollSnapType: 'y mandatory', // ВАЖНО: возвращаем scroll-snap для трекпада
//                                         perspective: '1000px',
//                                         scrollbarWidth: 'none',
//                                         msOverflowStyle: 'none',
//                                         WebkitOverflowScrolling: 'touch'
//                                     }}
//                                     onScroll={() => handleScroll(yearRef, setSelectedYear, infiniteYears, 'year')}
//                                 >
//                                     <div className="py-20 flex flex-col gap-[15px]">
//                                         {infiniteYears.map((year, index) => (
//                                             <div
//                                                 key={`year-${index}`}
//                                                 className={`max-h-[20px] flex items-center justify-center text-lg  select-none
//                                             ${centerYearIndex === index ? 'text-[#ссс]' : 'text-[#878787]'
//                                                 }`}
//                                                 style={{
//                                                     scrollSnapAlign: 'center', // ВАЖНО: возвращаем для трекпада
//                                                     ...getItemStyle()
//                                                 }}
//                                             >
//                                                 {year}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//
//                             <div className={`${styles.datePickerFooter}`}></div>
//
//                             <button
//                                 onClick={handleConfirm}
//                                 className={`${styles['menu-item']} !absolute bottom-[-52px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] max-w-[54px] m-auto mb-[2px] text-[#3D9ED6] text-base cursor-pointer transition-colors`}
//                             >
//                                 Готово
//                             </button>
//                         </div>
//
//                         {/* Footer */}
//                         <div
//                             className={`${styles.datePicker} flex flex-col items-center justify-end h-[110px] text-center pt-[50px] px-[24px] pb-[5px] rounded-[4px] `}>
//
//                         </div>
//
//                         <div
//                             className={`absolute bottom-0 w-full flex flex-col items-center justify-end h-[110px] text-center pt-[50px] px-[24px] pb-[5px] border-1 border-[#353535] rounded-[4px] `}>
//
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//         </AnimatePresence>
//     );
// };

import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import styles from '@/app/page.module.scss'
import {AnimatePresence, motion, useAnimation} from "framer-motion";
import gsap from "gsap";
import {Observer} from "gsap/Observer";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import {bounceActiveBlock} from "@/components/Form/bounce";
import {usePickerScroll} from "@/components/ScrollBar/usePickerScroll";

interface DatePickerProps {
    isVisible: boolean;
    onDateSelect: (date: string) => void;
    onClose: () => void;
    initialDate?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
                                                          isVisible,
                                                          onDateSelect,
                                                          onClose,
                                                          initialDate
                                                      }) => {
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    gsap.registerPlugin(Observer, ScrollToPlugin);
    const controls = useAnimation();
    const currentYear = new Date().getFullYear();

    // Create infinite arrays for seamless scrolling - оптимизированная версия
    const createInfiniteArray = <T, >(baseArray: T[], repeatCount: number = 2): T[] => {
        const result: T[] = [];
        for (let i = 0; i < repeatCount; i++) {
            result.push(...baseArray);
        }
        return result;
    };

    // Create static days array (1-31, without month dependency)
    const baseDays = Array.from({length: 31}, (_, i) => i + 1);
    const infiniteDays = createInfiniteArray(baseDays, 1);

    // Months repeated
    const infiniteMonths = createInfiniteArray(months, 1);

    // Years from 1900
    const baseYears = Array.from({length: currentYear - 1900 + 1}, (_, i) => currentYear - i).filter(year => year >= 1900);
    const infiniteYears = createInfiniteArray(baseYears, 1);

    const parseInitialDate = (dateString?: string) => {
        if (!dateString) return {day: 1, month: 0, year: 2000}; // дефолт: 1 января 2000

        const parts = dateString.split('.');
        if (parts.length === 3) {
            const day = parseInt(parts[0]) || 1;
            const month = (parseInt(parts[1]) || 1) - 1;
            const year = Math.max(1900, parseInt(parts[2]) || 2000);
            return {day, month, year};
        }
        return {day: 1, month: 0, year: 2000}; // дефолт: 1 января 2000
    };

    const initial = parseInitialDate(initialDate);
    const [selectedDay, setSelectedDay] = useState(initial.day);
    const [selectedMonth, setSelectedMonth] = useState(initial.month);
    const [selectedYear, setSelectedYear] = useState(initial.year);

    const dayRef = useRef<HTMLDivElement | null>(null);
    const monthRef = useRef<HTMLDivElement | null>(null);
    const yearRef = useRef<HTMLDivElement | null>(null);

    const isScrollingRef = useRef(false);
    const ITEM_HEIGHT = 28;

    // Применяем кастомный скролл к каждому контейнеру - теперь только для колесика мыши
    usePickerScroll(dayRef, {itemHeight: ITEM_HEIGHT});
    usePickerScroll(monthRef, {itemHeight: ITEM_HEIGHT});
    usePickerScroll(yearRef, {itemHeight: ITEM_HEIGHT});

    // ИСПРАВЛЕНИЕ: Убираем useState с функцией-инициализатором
    // Вместо этого будем вычислять индексы каждый раз при открытии
    const [centerDayIndex, setCenterDayIndex] = useState(0);
    const [centerMonthIndex, setCenterMonthIndex] = useState(0);
    const [centerYearIndex, setCenterYearIndex] = useState(0);

    // ИСПРАВЛЕННАЯ ФУНКЦИЯ: Пересчет и возврат индексов
    const recalculateIndices = () => {
        console.log('=== recalculateIndices called ===');
        console.log('Current selected values - day:', selectedDay, 'month:', selectedMonth, 'year:', selectedYear);

        // День
        const dayMiddleIndex = Math.floor(infiniteDays.length / 2);
        const newDayIndex = infiniteDays.findIndex(d => d === selectedDay);
        console.log('Day calculation - middleIndex:', dayMiddleIndex, 'selectedDay:', selectedDay, 'newDayIndex:', newDayIndex);

        // Месяц
        const monthMiddleIndex = Math.floor(infiniteMonths.length / 2);
        const newMonthIndex = infiniteMonths.findIndex((m, i) => i % 12 === selectedMonth);
        console.log('Month calculation - middleIndex:', monthMiddleIndex, 'selectedMonth:', selectedMonth, 'newMonthIndex:', newMonthIndex);

        // Год
        const newYearIndex = infiniteYears.findIndex(y => y === selectedYear);
        console.log('Year calculation - selectedYear:', selectedYear, 'newYearIndex:', newYearIndex);

        if (newYearIndex === -1) {
            console.log('❌ Year not found in infiniteYears');
            // на всякий случай ставим ближайший допустимый
            setCenterYearIndex(0);
            return {dayIndex: newDayIndex, monthIndex: newMonthIndex, yearIndex: 0};
        }

        console.log('infiniteDays.length:', infiniteDays.length);
        console.log('infiniteMonths.length:', infiniteMonths.length);
        console.log('infiniteYears.length:', infiniteYears.length);
        console.log('baseYears sample:', baseYears.slice(0, 5), '...', baseYears.slice(-5));

        // Устанавливаем состояния
        setCenterDayIndex(newDayIndex);
        setCenterMonthIndex(newMonthIndex);
        setCenterYearIndex(newYearIndex);

        // Возвращаем вычисленные индексы для немедленного использования
        return {
            dayIndex: newDayIndex,
            monthIndex: newMonthIndex,
            yearIndex: newYearIndex
        };
    };

    // Optimized scroll handler with throttling
    const throttledScrollHandler = useRef<{ [key: string]: NodeJS.Timeout }>({});

    const getCenteredIndex = (container: HTMLDivElement | null) => {
        if (!container) return -1;

        const containerRect = container.getBoundingClientRect();
        const centerY = containerRect.top + containerRect.height / 2;

        const items = Array.from(container.children[0]?.children || []) as HTMLDivElement[];

        let closestIndex = -1;
        let minDistance = Infinity;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (!item) continue;
            const itemRect = item.getBoundingClientRect();
            const itemCenterY = itemRect.top + itemRect.height / 2;
            const distance = Math.abs(itemCenterY - centerY);

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        }

        return closestIndex;
    };

    const scrollToIndex = (ref: HTMLDivElement, index: number) => {
        const item = ref.children[0].children[index] as HTMLElement;
        if (!item) return;
        const containerHeight = ref.clientHeight;
        const offset = item.offsetTop - (containerHeight / 2 - item.clientHeight / 2);
        ref.scrollTo({top: offset, behavior: "auto"});
    };


    const scrollToSelected = (indices?: { dayIndex: number, monthIndex: number, yearIndex: number }) => {
        // console.log('=== scrollToSelected called ===');
        // console.log('selectedDay:', selectedDay, 'selectedMonth:', selectedMonth, 'selectedYear:', selectedYear);
        //
        // // Используем переданные индексы или текущие состояния
        // const dayIdx = indices?.dayIndex ?? centerDayIndex;
        // const monthIdx = indices?.monthIndex ?? centerMonthIndex;
        // const yearIdx = indices?.yearIndex ?? centerYearIndex;
        //
        // console.log('Using indices - day:', dayIdx, 'month:', monthIdx, 'year:', yearIdx);
        //
        // if (!dayRef.current || !monthRef.current || !yearRef.current) {
        //     console.log('❌ Refs not ready');
        //     return;
        // }
        //
        // // Скроллим к индексам
        // const dayTargetScroll = dayIdx * ITEM_HEIGHT;
        // const monthTargetScroll = monthIdx * ITEM_HEIGHT;
        // const yearTargetScroll = yearIdx * ITEM_HEIGHT;
        //
        // console.log('Target scrolls - day:', dayTargetScroll, 'month:', monthTargetScroll, 'year:', yearTargetScroll);
        //
        // dayRef.current.scrollTo({top: dayTargetScroll, behavior: 'auto'});
        // monthRef.current.scrollTo({top: monthTargetScroll, behavior: 'auto'});
        // yearRef.current.scrollTo({top: yearTargetScroll, behavior: 'auto'});
        //
        // console.log('✅ Scrolled to positions');

        console.log('=== scrollToSelected called ===');
        const dayIdx = indices?.dayIndex ?? centerDayIndex;
        const monthIdx = indices?.monthIndex ?? centerMonthIndex;
        const yearIdx = indices?.yearIndex ?? centerYearIndex;

        if (dayRef.current) scrollToIndex(dayRef.current, dayIdx);
        if (monthRef.current) scrollToIndex(monthRef.current, monthIdx);
        if (yearRef.current) scrollToIndex(yearRef.current, yearIdx);

        console.log('✅ Scrolled to positions');
    };

    useLayoutEffect(() => {
        console.log('=== useLayoutEffect triggered ===');
        console.log('isVisible:', isVisible, 'initialDate:', initialDate);

        const parsed = parseInitialDate(initialDate);
        console.log('Parsed date:', parsed);

        setSelectedDay(parsed.day);
        setSelectedMonth(parsed.month);
        setSelectedYear(parsed.year);
        console.log('Set new selected values - day:', parsed.day, 'month:', parsed.month, 'year:', parsed.year);

        // ИСПРАВЛЕНИЕ: Пересчитываем индексы при каждом открытии
        if (isVisible) {
            console.log('👁️ DatePicker is visible, recalculating...');
            // Устанавливаем новые значения состояния
            setTimeout(() => {
                console.log('⏱️ First timeout - calling recalculateIndices');
                const calculatedIndices = recalculateIndices();
                // После пересчета индексов - скроллим с переданными индексами
                setTimeout(() => {
                    console.log('⏱️ Second timeout - calling scrollToSelected');
                    if (dayRef.current && monthRef.current && yearRef.current) {
                        console.log('✅ All refs ready, scrolling...');
                        scrollToSelected(calculatedIndices);
                    } else {
                        console.log('❌ Refs not ready yet');
                        console.log('dayRef.current:', !!dayRef.current);
                        console.log('monthRef.current:', !!monthRef.current);
                        console.log('yearRef.current:', !!yearRef.current);
                    }
                }, 0);
            }, 0);
        } else {
            console.log('👁️ DatePicker is not visible, skipping recalculation');
        }
    }, [isVisible, initialDate]);

    useEffect(() => {
        const handleScrollCheck = () => {
            if (!isScrollingRef.current) {
                if (dayRef.current) {
                    const index = getCenteredIndex(dayRef.current);
                    if (index !== -1) setCenterDayIndex(index);
                }
                if (monthRef.current) {
                    const index = getCenteredIndex(monthRef.current);
                    if (index !== -1) setCenterMonthIndex(index);
                }
                if (yearRef.current) {
                    const index = getCenteredIndex(yearRef.current);
                    if (index !== -1) setCenterYearIndex(index);
                }
            }
            requestAnimationFrame(handleScrollCheck);
        };

        if (isVisible) {
            handleScrollCheck();
        }
    }, [isVisible]);

    // function for getting the number of days in a month
    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const handleConfirm = () => {
        const year = infiniteYears[centerYearIndex];
        const day = infiniteDays[centerDayIndex];
        const month = centerMonthIndex % 12;

        console.log('=== handleConfirm ===');
        console.log('centerDayIndex:', centerDayIndex, 'day:', day);
        console.log('centerMonthIndex:', centerMonthIndex, 'month:', month);
        console.log('centerYearIndex:', centerYearIndex, 'year:', year);

        // Проверяем максимальное количество дней в выбранном месяце
        const maxDays = getDaysInMonth(month, year);
        const validDay = Math.min(day, maxDays);

        const formattedDate = `${validDay.toString().padStart(2, '0')}.${(month + 1).toString().padStart(2, '0')}.${year}`;
        console.log('Formatted date:', formattedDate);

        setSelectedDay(validDay);
        setSelectedMonth(month);
        setSelectedYear(year);

        onDateSelect(formattedDate);
        onClose();
    };

    const handleScroll = (
        ref: React.RefObject<HTMLDivElement | null>,
        setValue: (value: number) => void,
        items: (number | string)[],
        type: 'day' | 'month' | 'year'
    ) => {
        if (!ref.current) return;

        const key = `${type}_scroll`;

        if (throttledScrollHandler.current[key]) {
            clearTimeout(throttledScrollHandler.current[key]);
        }

        isScrollingRef.current = true;

        throttledScrollHandler.current[key] = setTimeout(() => {
            if (!ref.current) return;

            const idx = getCenteredIndex(ref.current);
            if (idx === -1) return;

            if (type === 'day') {
                setValue(items[idx] as number);
            } else if (type === 'month') {
                setValue(idx % 12);
            } else {
                setValue(items[idx] as number);
            }

            isScrollingRef.current = false;
        }, 100);
    };

    // Style without any effects during scroll
    const getItemStyle = () => {
        return {
            opacity: 1,
            transform: 'none',
            transformOrigin: 'center center',
            pointerEvents: 'auto' as const
        };
    };

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                bounceActiveBlock('dataPicker', controls);
            }, 10);

            return () => clearTimeout(timer);
        }
    }, [isVisible, controls]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                id={`date-picker`}
                key="date-picker"
                initial={{y: 0, opacity: 1}}
                animate={controls}
                className="w-[310px] !font-[Rubik] absolute z-[99]  top-auto bottom-[59.5%] md:bottom-[25.4%] left-[2.98%] md:left-[3.98%]">
                <div className="w-full max-w-[296px] mx-4">
                    <div className="relative h-[253px]">
                        <div
                            className={`${styles.datePicker} relative z-[2] text-center pb-[50px] px-[1px] h-[110px] pt-[5px] rounded-[4px] mb-[33px]`}>
                        </div>
                        <div
                            className={` w-full pointer-events-none absolute top-0 z-[9999] text-center pb-[50px] px-[1px] h-[110px] pt-[5px] border-1 border-[#353535] rounded-[4px] mb-[33px]`}>
                        </div>

                        {/* Selection indicator - more visible borders */}
                        <div
                            className={`${styles.datePickerIndicator} w-[274px] m-auto max-h-[36px] absolute top-[43%] left-[10px] h-11 border-l-1 border-r-1 border-[#353535] bg-[#3d9ed612]  backdrop-blur-[15px]  pointer-events-none`}>
                        </div>

                        <div
                            className="flex  justify-center gap-[30px] w-full h-full max-h-[160px] absolute top-[45px] z-[9]">

                            {/*Close icon*/}
                            <button onClick={onClose}
                                    className="absolute top-[-33px] right-[11px] z-[999999] text-[#3D9ED6]  text-base cursor-pointer transition-colors hover:text-[#5BADDB]"
                            >
                                <svg
                                    className="animated-close"
                                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_5371_3270)">
                                        <mask id="mask0_5371_3270" style={{maskType: 'luminance'}}
                                              maskUnits="userSpaceOnUse"
                                              x="-1" y="-1" width="16" height="16">
                                            <path d="M15 -1H-1V15H15V-1Z" fill="white"/>
                                        </mask>
                                        <g mask="url(#mask0_5371_3270)">
                                            <path
                                                d="M0.636568 2.05093L11.9503 13.3646L13.3645 11.9504L2.05078 0.636719L0.636568 2.05093Z"
                                                fill="#ADADAD"/>
                                            <path
                                                d="M2.05093 13.3647L8.41489 7.00069L7.00068 5.58648L0.636719 11.9504L2.05093 13.3647ZM10.5362 4.87937L13.3646 2.05094L11.9504 0.636731L9.122 3.46516L10.5362 4.87937Z"
                                                fill="#ADADAD"/>
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_5371_3270">
                                            <rect width="14" height="14" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <div className={`${styles.datePickerHeader}`}></div>

                            {/* Day wheel */}
                            <div className="w-[25px] relative overflow-hidden">
                                <div
                                    ref={dayRef}
                                    className="h-full overflow-y-auto"
                                    style={{
                                        scrollSnapType: 'y mandatory', // ВАЖНО: возвращаем scroll-snap для трекпада
                                        perspective: '1000px',
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',
                                        WebkitOverflowScrolling: 'touch'
                                    }}
                                    onScroll={() => handleScroll(dayRef, setSelectedDay, infiniteDays, 'day')}
                                >
                                    <div className="py-20 flex flex-col gap-[15px]">
                                        {infiniteDays.map((day, index) => (
                                            <div
                                                key={`day-${index}`}
                                                className={`max-h-[20px] flex items-center justify-center text-lg  select-none
                                                ${centerDayIndex === index ? 'text-[#ссс]' : 'text-[#878787]'
                                                }`}
                                                style={{
                                                    scrollSnapAlign: 'center', // ВАЖНО: возвращаем для трекпада
                                                    ...getItemStyle()
                                                }}
                                            >
                                                {day}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Month wheel */}
                            <div className="w-[100px] relative overflow-hidden">
                                <div
                                    ref={monthRef}
                                    className="h-full overflow-y-auto"
                                    style={{
                                        scrollSnapType: 'y mandatory', // ВАЖНО: возвращаем scroll-snap для трекпада
                                        perspective: '1000px',
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',
                                        WebkitOverflowScrolling: 'touch'
                                    }}
                                    onScroll={() => handleScroll(monthRef, setSelectedMonth, infiniteMonths, 'month')}
                                >
                                    <div className="py-20 flex flex-col gap-[15px]">
                                        {infiniteMonths.map((month, index) => (
                                            <div
                                                key={`month-${index}`}
                                                className={`max-h-[20px] flex items-center justify-start text-lg  select-none
                                            ${centerMonthIndex === index ? 'text-[#ссс]' : 'text-[#878787]'
                                                }`}
                                                style={{
                                                    scrollSnapAlign: 'center', // ВАЖНО: возвращаем для трекпада
                                                    ...getItemStyle()
                                                }}
                                            >
                                                {month}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Year wheel */}
                            <div className="w-[60px] relative overflow-hidden">
                                <div
                                    ref={yearRef}
                                    className="h-full overflow-y-auto"
                                    style={{
                                        scrollSnapType: 'y mandatory', // ВАЖНО: возвращаем scroll-snap для трекпада
                                        perspective: '1000px',
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',
                                        WebkitOverflowScrolling: 'touch'
                                    }}
                                    onScroll={() => handleScroll(yearRef, setSelectedYear, infiniteYears, 'year')}
                                >
                                    <div className="py-20 flex flex-col gap-[15px]">
                                        {infiniteYears.map((year, index) => (
                                            <div
                                                key={`year-${index}`}
                                                className={`max-h-[20px] flex items-center justify-center text-lg  select-none
                                            ${centerYearIndex === index ? 'text-[#ссс]' : 'text-[#878787]'
                                                }`}
                                                style={{
                                                    scrollSnapAlign: 'center', // ВАЖНО: возвращаем для трекпада
                                                    ...getItemStyle()
                                                }}
                                            >
                                                {year}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.datePickerFooter}`}></div>

                            <button
                                onClick={handleConfirm}
                                className={`${styles['menu-item']} !absolute bottom-[-52px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] max-w-[54px] m-auto mb-[2px] text-[#3D9ED6] text-base cursor-pointer transition-colors`}
                            >
                                Готово
                            </button>
                        </div>

                        {/* Footer */}
                        <div
                            className={`${styles.datePicker} flex flex-col items-center justify-end h-[110px] text-center pt-[50px] px-[24px] pb-[5px] rounded-[4px] `}>

                        </div>

                        <div
                            className={`absolute bottom-0 w-full flex flex-col items-center justify-end h-[110px] text-center pt-[50px] px-[24px] pb-[5px] border-1 border-[#353535] rounded-[4px] `}>

                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};