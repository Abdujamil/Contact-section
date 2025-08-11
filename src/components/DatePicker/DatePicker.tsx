// Первый вариант

// import React, { useState, useEffect, useRef } from 'react';
// import styles from '@/app/page.module.scss';
// // import Close from "@/components/closeIcon/close";
//
// interface DatePickerProps {
//     isVisible: boolean;
//     onDateSelect: (date: string) => void;
//     onClose: () => void;
//     initialDate?: string;
// }
//
// export const DatePicker: React.FC<DatePickerProps> = ({
//     isVisible,
//     onDateSelect,
//     onClose,
//     initialDate
// }) => {
//     const months = [
//         'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
//         'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
//     ];
//
//     const currentYear = new Date().getFullYear();
//     const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
//
//     // Get days for specific month and year
//     const getDaysInMonth = (month: number, year: number) => {
//         return new Date(year, month + 1, 0).getDate();
//     };
//
//     const parseInitialDate = (dateString?: string) => {
//         if (!dateString) return { day: 1, month: 0, year: currentYear - 25 };
//
//         const parts = dateString.split('.');
//         if (parts.length === 3) {
//             const day = parseInt(parts[0]) || 1;
//             const month = (parseInt(parts[1]) || 1) - 1;
//             const year = parseInt(parts[2]) || currentYear - 25;
//             return { day, month, year };
//         }
//         return { day: 1, month: 0, year: currentYear - 25 };
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
//     const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//
//     // Get current days array based on selected month and year
//     const currentDays = Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => i + 1);
//
//     const [centerDayIndex, setCenterDayIndex] = useState(selectedDay - 1);
//     const [centerMonthIndex, setCenterMonthIndex] = useState(selectedMonth);
//     const [centerYearIndex, setCenterYearIndex] = useState(years.indexOf(selectedYear));
//
//     useEffect(() => {
//         const handleScrollCheck = () => {
//             if (dayRef.current) {
//                 const index = getCenteredIndex(dayRef.current);
//                 if (index !== -1) setCenterDayIndex(index);
//             }
//             if (monthRef.current) {
//                 const index = getCenteredIndex(monthRef.current);
//                 if (index !== -1) setCenterMonthIndex(index);
//             }
//             if (yearRef.current) {
//                 const index = getCenteredIndex(yearRef.current);
//                 if (index !== -1) setCenterYearIndex(index);
//             }
//
//             requestAnimationFrame(handleScrollCheck);
//         };
//
//         requestAnimationFrame(handleScrollCheck);
//     }, []);
//
//     const getCenteredIndex = (container: HTMLDivElement | null) => {
//         if (!container) return -1;
//
//         const containerRect = container.getBoundingClientRect();
//         const centerY = containerRect.top + containerRect.height / 2;
//
//         const items = Array.from(container.children[0].children) as HTMLDivElement[];
//
//         for (let i = 0; i < items.length; i++) {
//             const item = items[i];
//             const itemRect = item.getBoundingClientRect();
//             const itemCenterY = itemRect.top + itemRect.height / 2;
//
//             // Допустимая погрешность ~4px
//             if (Math.abs(itemCenterY - centerY) < 6) {
//                 return i;
//             }
//         }
//         return -1;
//     };
//
//
//     const scrollToSelected = () => {
//         const itemHeight = 28; // Consistent item height
//
//         if (dayRef.current) {
//             const targetScroll = (selectedDay - 1) * itemHeight;
//             dayRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
//         }
//
//         if (monthRef.current) {
//             const targetScroll = selectedMonth * itemHeight;
//             monthRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
//         }
//
//         if (yearRef.current) {
//             const yearIndex = years.indexOf(selectedYear);
//             const targetScroll = yearIndex * itemHeight;
//             yearRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
//         }
//     };
//
//     // Adjust selected day if it's invalid for current month/year
//     useEffect(() => {
//         const maxDays = getDaysInMonth(selectedMonth, selectedYear);
//         if (selectedDay > maxDays) {
//             setSelectedDay(maxDays);
//         }
//     }, [selectedMonth, selectedYear, selectedDay]);
//
//     useEffect(() => {
//         if (isVisible) {
//             setTimeout(() => {
//                 scrollToSelected();
//             }, 100);
//         }
//     }, [isVisible]);
//
//     const handleConfirm = () => {
//         const formattedDate = `${selectedDay.toString().padStart(2, '0')}.${(selectedMonth + 1).toString().padStart(2, '0')}.${selectedYear}`;
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
//         if (scrollTimeoutRef.current) {
//             clearTimeout(scrollTimeoutRef.current);
//         }
//
//         scrollTimeoutRef.current = setTimeout(() => {
//
//             if (!ref.current) return;
//
//             const container = ref.current;
//             const itemHeight = 28; // Consistent item height
//             const scrollTop = container.scrollTop;
//             const centerIndex = Math.round(scrollTop / itemHeight);
//             const clampedIndex = Math.max(0, Math.min(centerIndex, items.length - 1));
//
//             // Snap to center
//             const targetScroll = clampedIndex * itemHeight;
//             container.scrollTo({ top: targetScroll, behavior: 'smooth' });
//
//             // Set the value
//             if (type === 'day') {
//                 setValue(clampedIndex + 1);
//             } else if (type === 'month') {
//                 setValue(clampedIndex);
//             } else {
//                 setValue(items[clampedIndex] as number);
//             }
//         }, 100);
//     };
//
//     const getItemStyle = (index: number, selectedIndex: number, containerRef: React.RefObject<HTMLDivElement | null>) => {
//         if (!containerRef.current) return {};
//
//         // const itemHeight = 28; // Consistent item height
//         // const containerHeight = containerRef.current.clientHeight;
//         // const scrollTop = containerRef.current.scrollTop;
//         // const itemTop = index * itemHeight;
//         // const itemCenter = itemTop + itemHeight / 2;
//         // const containerCenter = scrollTop + containerHeight / 2;
//
//         // const distance = Math.abs(itemCenter - containerCenter);
//         // const maxDistance = containerHeight / 2;
//         // const normalizedDistance = Math.min(distance / maxDistance, 1);
//
//         // 3D rotation effect
//         // const rotationX = normalizedDistance * 25;
//         // const scale = 1 - normalizedDistance * 0.1;
//         // const opacity = 1 - normalizedDistance * 0.3;
//         const opacity = 1;
//
//         return {
//             transform: `perspective(1000px)`,
//             opacity,
//             transformOrigin: 'center center',
//             transformStyle: 'preserve-3d' as const
//         };
//     };
//
//     if (!isVisible) return null;
//
//     return (
//         <div className="font-[Rubik] fixed inset-0 z-50 flex top-auto bottom-[110px] left-[35px]">
//             <div className="w-full max-w-[294px] rounded-lg shadow-2xl mx-4 overflow-hidden">
//                 <div className="relative h-[253px] overflow-hidden">
//                     <div className={`${styles.datePicker} text-center pb-[50px] px-[1px] pt-[5px] border border-[#353535] rounded-[8px] mb-[33px]`}>
//                         {/* Header */}
//                         <div className="flex items-center justify-end p-3">
//                             <button
//                                 onClick={onClose}
//                                 className="text-[#3D9ED6]  text-base cursor-pointer transition-colors"
//                             >
//                                 <svg
//                                     className="animated-close"
//                                     width="14" height="14" viewBox="0 0 14 14" fill="none"
//                                     xmlns="http://www.w3.org/2000/svg">
//                                     <g clipPath="url(#clip0_5371_3270)">
//                                         <mask id="mask0_5371_3270" style={{ maskType: 'luminance' }}
//                                             maskUnits="userSpaceOnUse"
//                                             x="-1" y="-1" width="16" height="16">
//                                             <path d="M15 -1H-1V15H15V-1Z" fill="white" />
//                                         </mask>
//                                         <g mask="url(#mask0_5371_3270)">
//                                             <path
//                                                 d="M0.636568 2.05093L11.9503 13.3646L13.3645 11.9504L2.05078 0.636719L0.636568 2.05093Z"
//                                                 fill="#ADADAD" />
//                                             <path
//                                                 d="M2.05093 13.3647L8.41489 7.00069L7.00068 5.58648L0.636719 11.9504L2.05093 13.3647ZM10.5362 4.87937L13.3646 2.05094L11.9504 0.636731L9.122 3.46516L10.5362 4.87937Z"
//                                                 fill="#ADADAD" />
//                                         </g>
//                                     </g>
//                                     <defs>
//                                         <clipPath id="clip0_5371_3270">
//                                             <rect width="14" height="14" fill="white" />
//                                         </clipPath>
//                                     </defs>
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//
//                     {/* Selection indicator */}
//                     <div className={`${styles.datePicker} max-h-[36px] absolute inset-x-0 top-[44%] transform -translate-y-1/2 h-11 border-l border-r border-[#353535] !bg-[#3d9ed607] bg-opacity-5 backdrop-blur-[6px] scale-[.90] pointer-events-none`}>
//                     </div>
//
//                     <div className="flex w-full h-full max-h-[160px] absolute top-[31px] z-[9]">
//                         {/* Day wheel */}
//                         <div className="flex-1 relative overflow-hidden">
//                             <div
//                                 ref={dayRef}
//                                 className="h-full overflow-y-auto scrollbar-hide"
//                                 style={{
//                                     scrollSnapType: 'y mandatory',
//                                     perspective: '1000px'
//                                 }}
//                                 onScroll={() => handleScroll(dayRef, setSelectedDay, currentDays, 'day')}
//                             >
//                                 <div className="py-20 flex flex-col gap-[10px]">
//                                     {currentDays.map((day, index) => (
//                                         <div
//                                             key={day}
//                                             className={`max-h-[20px] flex items-center justify-center text-lg  transition-all duration-200 cursor-pointer
//                                              ${centerDayIndex === index ? 'text-[#3D9ED6]' : 'text-[#adadad]'
//                                                 }`}
//                                             style={{
//                                                 scrollSnapAlign: 'center',
//                                                 ...getItemStyle(index, selectedDay - 1, dayRef)
//                                             }}
//                                             onClick={() => {
//                                                 setSelectedDay(day);
//                                                 if (dayRef.current) {
//                                                     dayRef.current.scrollTo({
//                                                         top: index * 28,
//                                                         behavior: 'smooth'
//                                                     });
//                                                 }
//                                             }}
//                                         >
//                                             {day}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//
//                         {/* Month wheel */}
//                         <div className="flex-1 relative overflow-hidden">
//                             <div
//                                 ref={monthRef}
//                                 className="h-full overflow-y-auto scrollbar-hide"
//                                 style={{
//                                     scrollSnapType: 'y mandatory',
//                                     perspective: '1000px'
//                                 }}
//                                 onScroll={() => handleScroll(monthRef, setSelectedMonth, months, 'month')}
//                             >
//                                 <div className="py-20 flex flex-col gap-[10px]">
//                                     {months.map((month, index) => (
//                                         <div
//                                             key={month}
//                                             className={`max-h-[20px] flex items-center justify-center text-lg  transition-all duration-200 cursor-pointer
//                                             ${centerMonthIndex === index ? 'text-[#3D9ED6]' : 'text-[#adadad]'
//                                                 }`}
//                                             style={{
//                                                 scrollSnapAlign: 'center',
//                                                 ...getItemStyle(index, selectedMonth, monthRef)
//                                             }}
//                                             onClick={() => {
//                                                 setSelectedMonth(index);
//                                                 if (monthRef.current) {
//                                                     monthRef.current.scrollTo({
//                                                         top: index * 28,
//                                                         behavior: 'smooth'
//                                                     });
//                                                 }
//                                             }}
//                                         >
//                                             {month}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//
//                         {/* Year wheel */}
//                         <div className="flex-1 relative overflow-hidden">
//                             <div
//                                 ref={yearRef}
//                                 className="h-full overflow-y-auto scrollbar-hide"
//                                 style={{
//                                     scrollSnapType: 'y mandatory',
//                                     perspective: '1000px'
//                                 }}
//                                 onScroll={() => handleScroll(yearRef, setSelectedYear, years, 'year')}
//                             >
//                                 <div className="py-20 flex flex-col gap-[10px]">
//                                     {years.map((year, index) => (
//                                         <div
//                                             key={year}
//                                             className={`max-h-[20px] flex items-center justify-center text-lg  transition-all duration-200 cursor-pointer
//                                             ${centerYearIndex === index ? 'text-[#3D9ED6]' : 'text-[#adadad]'
//                                                 }`}
//                                             style={{
//                                                 scrollSnapAlign: 'center',
//                                                 ...getItemStyle(index, years.indexOf(selectedYear), yearRef)
//                                             }}
//                                             onClick={() => {
//                                                 setSelectedYear(year);
//                                                 if (yearRef.current) {
//                                                     yearRef.current.scrollTo({
//                                                         top: index * 28,
//                                                         behavior: 'smooth'
//                                                     });
//                                                 }
//                                             }}
//                                         >
//                                             {year}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Footer */}
//                     <div className={`${styles.datePicker} text-center pt-[50px] px-[24px] !pb-[5px] border border-[#353535] rounded-[8px]`}>
//                         <div className="flex m-3">
//                             <button
//                                 onClick={handleConfirm}
//                                 className={`${styles['menu-item']} !max-w-[50px] m-auto text-[#3D9ED6]  text-base cursor-pointer transition-colors`}
//                             >
//                                 Готово
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             <style jsx>{`
//                 .scrollbar-hide {
//                     -ms-overflow-style: none;
//                     scrollbar-width: none;
//                 }
//
//                 .scrollbar-hide::-webkit-scrollbar {
//                     display: none;
//                 }
//             `}</style>
//         </div>
//     );
// };
//
//


// Base variant

// import React, {useState, useEffect, useRef} from 'react';
// import styles from '@/app/page.module.scss'
// import {AnimatePresence, motion} from "framer-motion";
// import {useDragScroll} from "@/components/DatePicker/useDragScroll";
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
//     const currentYear = new Date().getFullYear();
//
//     // Create infinite arrays for seamless scrolling
//     const createInfiniteArray = <T, >(baseArray: T[], repeatCount: number = 10): T[] => {
//         const result = [];
//         for (let i = 0; i < repeatCount; i++) {
//             result.push(...baseArray);
//         }
//         return result;
//     };
//
//     // Get days in month considering leap year
//     const getDaysInMonth = (month: number, year: number) => {
//         return new Date(year, month + 1, 0).getDate();
//     };
//
//     // Create dynamic days array based on current month/year selection
//     const createDaysArray = (month: number, year: number) => {
//         const daysInMonth = getDaysInMonth(month, year);
//         const baseDays = Array.from({length: daysInMonth}, (_, i) => i + 1);
//         return createInfiniteArray(baseDays, 15); // More repetitions for smooth infinite scroll
//     };
//
//     // Months repeated
//     const infiniteMonths = createInfiniteArray(months, 15);
//
//     // Years (expanded range, repeated)
//     const baseYears = Array.from({length: 300}, (_, i) => currentYear - i);
//     const infiniteYears = createInfiniteArray(baseYears, 5);
//
//     const parseInitialDate = (dateString?: string) => {
//         if (!dateString) return {day: 1, month: 0, year: currentYear - 25};
//
//         const parts = dateString.split('.');
//         if (parts.length === 3) {
//             const day = parseInt(parts[0]) || 1;
//             const month = (parseInt(parts[1]) || 1) - 1;
//             const year = parseInt(parts[2]) || currentYear - 25;
//             return {day, month, year};
//         }
//         return {day: 1, month: 0, year: currentYear - 25};
//     };
//
//     const initial = parseInitialDate(initialDate);
//     const [selectedDay, setSelectedDay] = useState(initial.day);
//     const [selectedMonth, setSelectedMonth] = useState(initial.month);
//     const [selectedYear, setSelectedYear] = useState(initial.year);
//
//     // Dynamic days array that updates when month/year changes
//     const [infiniteDays, setInfiniteDays] = useState(createDaysArray(initial.month, initial.year));
//
//     const dayRef = useRef<HTMLDivElement | null>(null);
//     const monthRef = useRef<HTMLDivElement | null>(null);
//     const yearRef = useRef<HTMLDivElement | null>(null);
//
//     useDragScroll(dayRef);
//     useDragScroll(monthRef);
//     useDragScroll(yearRef);
//
//     const isScrollingRef = useRef(false);
//
//     const [centerDayIndex, setCenterDayIndex] = useState(() => {
//         const middleIndex = Math.floor(createDaysArray(initial.month, initial.year).length / 2);
//         return middleIndex + initial.day - 1;
//     });
//     const [centerMonthIndex, setCenterMonthIndex] = useState(() => {
//         const middleIndex = Math.floor(infiniteMonths.length / 2);
//         return middleIndex + initial.month;
//     });
//     const [centerYearIndex, setCenterYearIndex] = useState(() => {
//         const middleIndex = Math.floor(infiniteYears.length / 2);
//         const yearOffset = baseYears.findIndex(y => y === initial.year);
//         return middleIndex + yearOffset;
//     });
//
//     // Update days array when month or year changes
//     useEffect(() => {
//         const newInfiniteDays = createDaysArray(selectedMonth, selectedYear);
//         setInfiniteDays(newInfiniteDays);
//
//         // Adjust selected day if it exceeds the days in the new month
//         const maxDays = getDaysInMonth(selectedMonth, selectedYear);
//         if (selectedDay > maxDays) {
//             setSelectedDay(maxDays);
//             // Update center index to the adjusted day
//             const middleIndex = Math.floor(newInfiniteDays.length / 2);
//             setCenterDayIndex(middleIndex + maxDays - 1);
//
//             // Scroll to the adjusted day
//             if (dayRef.current) {
//                 setTimeout(() => {
//                     const targetScroll = (middleIndex + maxDays - 1) * 28;
//                     dayRef.current?.scrollTo({top: targetScroll, behavior: 'smooth'});
//                 }, 100);
//             }
//         } else {
//             // Keep the same day but recalculate center index
//             const middleIndex = Math.floor(newInfiniteDays.length / 2);
//             setCenterDayIndex(middleIndex + selectedDay - 1);
//         }
//     }, [selectedMonth, selectedYear]);
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
//         const items = Array.from(container.children[0].children) as HTMLDivElement[];
//
//         for (let i = 0; i < items.length; i++) {
//             const item = items[i];
//             const itemRect = item.getBoundingClientRect();
//             const itemCenterY = itemRect.top + itemRect.height / 2;
//
//             if (Math.abs(itemCenterY - centerY) < 6) {
//                 return i;
//             }
//         }
//         return -1;
//     };
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
//         requestAnimationFrame(handleScrollCheck);
//     }, []);
//
//     const scrollToSelected = () => {
//         const itemHeight = 28;
//
//         if (dayRef.current) {
//             // Find middle occurrence of the selected day
//             const middleIndex = Math.floor(infiniteDays.length / 2);
//             const dayIndex = middleIndex + selectedDay - 1;
//             const targetScroll = dayIndex * itemHeight;
//             dayRef.current.scrollTo({top: targetScroll});
//             setCenterDayIndex(dayIndex);
//         }
//
//         if (monthRef.current) {
//             // Find middle occurrence of the selected month
//             const middleIndex = Math.floor(infiniteMonths.length / 2);
//             const monthIndex = middleIndex + selectedMonth;
//             const targetScroll = monthIndex * itemHeight;
//             monthRef.current.scrollTo({top: targetScroll});
//             setCenterMonthIndex(monthIndex);
//         }
//
//         if (yearRef.current) {
//             // Find middle occurrence of the selected year
//             const middleIndex = Math.floor(infiniteYears.length / 2);
//             const yearOffset = baseYears.findIndex(y => y === selectedYear);
//             if (yearOffset !== -1) {
//                 const yearIndex = middleIndex + yearOffset;
//                 const targetScroll = yearIndex * itemHeight;
//                 yearRef.current.scrollTo({top: targetScroll});
//                 setCenterYearIndex(yearIndex);
//             }
//         }
//     };
//
//     useEffect(() => {
//         if (isVisible) {
//             setTimeout(() => {
//                 scrollToSelected();
//             }, 100);
//         }
//     }, [isVisible]);
//
//     useEffect(() => {
//         if (isVisible && initialDate) {
//             const parsed = parseInitialDate(initialDate);
//             setSelectedDay(parsed.day);
//             setSelectedMonth(parsed.month);
//             setSelectedYear(parsed.year);
//
//             setTimeout(() => {
//                 scrollToSelected();
//             }, 150);
//         }
//     }, [isVisible, initialDate]);
//
//     const handleConfirm = () => {
//         const year = infiniteYears[centerYearIndex];
//         const day = infiniteDays[centerDayIndex];
//         const month = centerMonthIndex % 12;
//
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
//         // Clear existing timeout
//         if (throttledScrollHandler.current[key]) {
//             clearTimeout(throttledScrollHandler.current[key]);
//         }
//
//         isScrollingRef.current = true;
//
//         // Throttled scroll handler
//         throttledScrollHandler.current[key] = setTimeout(() => {
//             if (!ref.current) return;
//
//             const container = ref.current;
//             const itemHeight = 28;
//             const scrollTop = container.scrollTop;
//             const centerIndex = Math.round(scrollTop / itemHeight);
//             const clampedIndex = Math.max(0, Math.min(centerIndex, items.length - 1));
//
//             // Snap to center
//             const targetScroll = clampedIndex * itemHeight;
//             container.scrollTo({top: targetScroll, behavior: 'smooth'});
//
//             // Set the value based on type
//             if (type === 'day') {
//                 const dayValue = items[clampedIndex] as number;
//                 setValue(dayValue);
//             } else if (type === 'month') {
//                 const monthValue = clampedIndex % 12;
//                 setValue(monthValue);
//             } else if (type === 'year') {
//                 const yearValue = items[clampedIndex] as number;
//                 setValue(yearValue);
//             }
//
//             isScrollingRef.current = false;
//         }, 50);
//     };
//
//     const getItemStyle = () => {
//         return {
//             transform: `perspective(1000px)`,
//             opacity: 1,
//             transformOrigin: 'center center',
//             transformStyle: 'preserve-3d' as const
//         };
//     };
//
//
//     if (!isVisible) return null;
//     return (
//         <AnimatePresence>
//             <motion.div
//                 initial={{opacity: 0, y: -30}}
//                 animate={{opacity: 1, y: 0}}
//                 transition={{
//                     type: "spring",
//                     stiffness: 200,
//                     damping: 6,
//                     mass: 0.3,
//                 }}
//                 className=" w-full !font-[Rubik] absolute z-[9] flex top-auto bottom-[25.8%] left-[3.94%]">
//                 <div className="w-full max-w-[296px] mx-4">
//                     <div className="relative h-[253px]">
//                         <div
//                             className={`${styles.datePicker} relative z-[2] text-center pb-[50px] px-[1px] h-[110px] pt-[5px] border-1 border-[#353535] rounded-[8px] mb-[33px]`}>
//
//                         </div>
//
//                         {/* Selection indicator - more visible borders */}
//                         <div
//                             className={`w-[274px] m-auto max-h-[36px] absolute top-[43%] left-[10px] h-11 border-l-1 border-r-1 border-[#353535] bg-[#3d9ed612] backdrop-blur-[15px]  pointer-events-none`}>
//                         </div>
//
//                         <div
//                             className="flex  justify-center gap-[30px] w-full h-full max-h-[160px] absolute top-[45px] z-[9]">
//
//                             {/*Close icon*/}
//                             <button onClick={onClose}
//                                 className="absolute top-[-33px] right-[11px] z-[999999] text-[#3D9ED6]  text-base cursor-pointer transition-colors hover:text-[#5BADDB]"
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
//
//                             <div className={`${styles.datePickerHeader}`}></div>
//
//                             {/* Day wheel */}
//                             <div className="w-[25px] relative overflow-hidden">
//                                 <div
//                                     ref={dayRef}
//                                     className="h-full overflow-y-auto"
//                                     style={{
//                                         scrollSnapType: 'y mandatory',
//                                         perspective: '1000px',
//                                         scrollbarWidth: 'none',
//                                         msOverflowStyle: 'none'
//                                     }}
//                                     onScroll={() => handleScroll(dayRef, setSelectedDay, infiniteDays, 'day')}
//                                 >
//                                     <div className="py-20 flex flex-col gap-[15px]">
//                                         {infiniteDays.map((day, index) => (
//                                             <div
//                                                 key={`day-${index}`}
//                                                 className={`max-h-[20px] flex items-center justify-center text-lg  transition-all duration-200 cursor-pointer
//                                              ${centerDayIndex === index ? 'text-[#3D9ED6]' : 'text-[#adadad]'
//                                                 }`}
//                                                 style={{
//                                                     scrollSnapAlign: 'center',
//                                                     ...getItemStyle()
//                                                 }}
//                                                 onClick={() => {
//                                                     setSelectedDay(day);
//                                                     setCenterDayIndex(index);
//                                                     if (dayRef.current) {
//                                                         dayRef.current.scrollTo({
//                                                             top: index * 28,
//                                                             behavior: 'smooth'
//                                                         });
//                                                     }
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
//                                         scrollSnapType: 'y mandatory',
//                                         perspective: '1000px',
//                                         scrollbarWidth: 'none',
//                                         msOverflowStyle: 'none'
//                                     }}
//                                     onScroll={() => handleScroll(monthRef, setSelectedMonth, infiniteMonths, 'month')}
//                                 >
//                                     <div className="py-20 flex flex-col gap-[15px]">
//                                         {infiniteMonths.map((month, index) => (
//                                             <div
//                                                 key={`month-${index}`}
//                                                 className={`max-h-[20px] flex items-center justify-start text-lg  transition-all duration-200 cursor-pointer
//                                             ${centerMonthIndex === index ? 'text-[#3D9ED6]' : 'text-[#adadad]'
//                                                 }`}
//                                                 style={{
//                                                     scrollSnapAlign: 'center',
//                                                     ...getItemStyle()
//                                                 }}
//                                                 onClick={() => {
//                                                     setSelectedMonth(index % 12);
//                                                     setCenterMonthIndex(index);
//                                                     if (monthRef.current) {
//                                                         monthRef.current.scrollTo({
//                                                             top: index * 28,
//                                                             behavior: 'smooth'
//                                                         });
//                                                     }
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
//                                         scrollSnapType: 'y mandatory',
//                                         perspective: '1000px',
//                                         scrollbarWidth: 'none',
//                                         msOverflowStyle: 'none'
//                                     }}
//                                     onScroll={() => handleScroll(yearRef, setSelectedYear, infiniteYears, 'year')}
//                                 >
//                                     <div className="py-20 flex flex-col gap-[15px]">
//                                         {infiniteYears.map((year, index) => (
//                                             <div
//                                                 key={`year-${index}`}
//                                                 className={`max-h-[20px] flex items-center justify-center text-lg  transition-all duration-200 cursor-pointer
//                                             ${centerYearIndex === index ? 'text-[#3D9ED6]' : 'text-[#adadad]'
//                                                 }`}
//                                                 style={{
//                                                     scrollSnapAlign: 'center',
//                                                     ...getItemStyle()
//                                                 }}
//                                                 onClick={() => {
//                                                     setSelectedYear(year);
//                                                     setCenterYearIndex(index);
//                                                     if (yearRef.current) {
//                                                         yearRef.current.scrollTo({
//                                                             top: index * 28,
//                                                             behavior: 'smooth'
//                                                         });
//                                                     }
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
//                             className={`${styles.datePicker} flex flex-col items-center justify-end h-[110px] text-center pt-[50px] px-[24px] pb-[5px] border-1 border-[#353535] rounded-[8px] `}>
//                             <div className={`w-full flex flex-col items-end justify-end`}>
//
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//         </AnimatePresence>
//     );
// };

// import React, {useState, useEffect, useRef} from 'react';
// import styles from '@/app/page.module.scss'
// import {AnimatePresence, motion} from "framer-motion";
// import {useDragScroll} from "@/components/DatePicker/useDragScroll";
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
//     const currentYear = new Date().getFullYear();
//
//     // Create infinite arrays for seamless scrolling
//     const createInfiniteArray = <T, >(baseArray: T[], repeatCount: number = 10): T[] => {
//         const result: T[] = [];
//         for (let i = 0; i < repeatCount; i++) {
//             result.push(...baseArray);
//         }
//         return result;
//     };
//
//     // Get days in month considering leap year
//     const getDaysInMonth = (month: number, year: number) => {
//         return new Date(year, month + 1, 0).getDate();
//     };
//
//     // Create dynamic days array based on current month/year selection
//     const createDaysArray = (month: number, year: number) => {
//         const daysInMonth = getDaysInMonth(month, year);
//         const baseDays = Array.from({length: daysInMonth}, (_, i) => i + 1);
//         return createInfiniteArray(baseDays, 15); // More repetitions for smooth infinite scroll
//     };
//
//     // Months repeated
//     const infiniteMonths = createInfiniteArray(months, 15);
//
//     // Years (expanded range, repeated)
//     const baseYears = Array.from({length: 126}, (_, i) => currentYear - i);
//     const infiniteYears = createInfiniteArray(baseYears, 5);
//
//     const parseInitialDate = (dateString?: string) => {
//         if (!dateString) return {day: 1, month: 0, year: currentYear - 25};
//
//         const parts = dateString.split('.');
//         if (parts.length === 3) {
//             const day = parseInt(parts[0]) || 1;
//             const month = (parseInt(parts[1]) || 1) - 1;
//             const year = parseInt(parts[2]) || currentYear - 25;
//             return {day, month, year};
//         }
//         return {day: 1, month: 0, year: currentYear - 25};
//     };
//
//     const initial = parseInitialDate(initialDate);
//     const [selectedDay, setSelectedDay] = useState(initial.day);
//     const [selectedMonth, setSelectedMonth] = useState(initial.month);
//     const [selectedYear, setSelectedYear] = useState(initial.year);
//
//     // Dynamic days array that updates when month/year changes
//     const [infiniteDays, setInfiniteDays] = useState(createDaysArray(initial.month, initial.year));
//
//     const dayRef = useRef<HTMLDivElement | null>(null);
//     const monthRef = useRef<HTMLDivElement | null>(null);
//     const yearRef = useRef<HTMLDivElement | null>(null);
//
//     useDragScroll(dayRef);
//     useDragScroll(monthRef);
//     useDragScroll(yearRef);
//
//     const isScrollingRef = useRef(false);
//
//     // Single source of truth for item height used everywhere (matching your scroll snap math)
//     const ITEM_HEIGHT = 28;
//
//     const [centerDayIndex, setCenterDayIndex] = useState(() => {
//         const middleIndex = Math.floor(createDaysArray(initial.month, initial.year).length / 2);
//         return middleIndex + initial.day - 1;
//     });
//     const [centerMonthIndex, setCenterMonthIndex] = useState(() => {
//         const middleIndex = Math.floor(infiniteMonths.length / 2);
//         return middleIndex + initial.month;
//     });
//     const [centerYearIndex, setCenterYearIndex] = useState(() => {
//         const middleIndex = Math.floor(infiniteYears.length / 2);
//         const yearOffset = baseYears.findIndex(y => y === initial.year);
//         return middleIndex + yearOffset;
//     });
//
//     // Update days array when month or year changes
//     useEffect(() => {
//         const newInfiniteDays = createDaysArray(selectedMonth, selectedYear);
//         setInfiniteDays(newInfiniteDays);
//
//         // Adjust selected day if it exceeds the days in the new month
//         const maxDays = getDaysInMonth(selectedMonth, selectedYear);
//         if (selectedDay > maxDays) {
//             setSelectedDay(maxDays);
//             // Update center index to the adjusted day
//             const middleIndex = Math.floor(newInfiniteDays.length / 2);
//             setCenterDayIndex(middleIndex + maxDays - 1);
//
//             // Scroll to the adjusted day
//             if (dayRef.current) {
//                 setTimeout(() => {
//                     const targetScroll = (middleIndex + maxDays - 1) * ITEM_HEIGHT;
//                     dayRef.current?.scrollTo({top: targetScroll, behavior: 'smooth'});
//                 }, 100);
//             }
//         } else {
//             // Keep the same day but recalculate center index
//             const middleIndex = Math.floor(newInfiniteDays.length / 2);
//             setCenterDayIndex(middleIndex + selectedDay - 1);
//         }
//     }, [selectedMonth, selectedYear]);
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
//         const items = Array.from(container.children[0].children) as HTMLDivElement[];
//
//         for (let i = 0; i < items.length; i++) {
//             const item = items[i];
//             const itemRect = item.getBoundingClientRect();
//             const itemCenterY = itemRect.top + itemRect.height / 2;
//
//             if (Math.abs(itemCenterY - centerY) < 6) {
//                 return i;
//             }
//         }
//         return -1;
//     };
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
//         requestAnimationFrame(handleScrollCheck);
//     }, []);
//
//     const scrollToSelected = () => {
//         if (dayRef.current) {
//             // Find middle occurrence of the selected day
//             const middleIndex = Math.floor(infiniteDays.length / 2);
//             const dayIndex = middleIndex + selectedDay - 1;
//             const targetScroll = dayIndex * ITEM_HEIGHT;
//             dayRef.current.scrollTo({top: targetScroll});
//             setCenterDayIndex(dayIndex);
//         }
//
//         if (monthRef.current) {
//             // Find middle occurrence of the selected month
//             const middleIndex = Math.floor(infiniteMonths.length / 2);
//             const monthIndex = middleIndex + selectedMonth;
//             const targetScroll = monthIndex * ITEM_HEIGHT;
//             monthRef.current.scrollTo({top: targetScroll});
//             setCenterMonthIndex(monthIndex);
//         }
//
//         if (yearRef.current) {
//             // Find middle occurrence of the selected year
//             const middleIndex = Math.floor(infiniteYears.length / 2);
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
//     useEffect(() => {
//         if (isVisible) {
//             setTimeout(() => {
//                 scrollToSelected();
//             }, 100);
//         }
//     }, [isVisible]);
//
//     useEffect(() => {
//         if (isVisible && initialDate) {
//             const parsed = parseInitialDate(initialDate);
//             setSelectedDay(parsed.day);
//             setSelectedMonth(parsed.month);
//             setSelectedYear(parsed.year);
//
//             setTimeout(() => {
//                 scrollToSelected();
//             }, 150);
//         }
//     }, [isVisible, initialDate]);
//
//     const handleConfirm = () => {
//         const year = infiniteYears[centerYearIndex];
//         const day = infiniteDays[centerDayIndex];
//         const month = centerMonthIndex % 12;
//
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
//         // Clear existing timeout
//         if (throttledScrollHandler.current[key]) {
//             clearTimeout(throttledScrollHandler.current[key]);
//         }
//
//         isScrollingRef.current = true;
//
//         // Throttled scroll handler
//         throttledScrollHandler.current[key] = setTimeout(() => {
//             if (!ref.current) return;
//
//             const container = ref.current;
//             const scrollTop = container.scrollTop;
//             const centerIndex = Math.round(scrollTop / ITEM_HEIGHT);
//             const clampedIndex = Math.max(0, Math.min(centerIndex, items.length - 1));
//
//             // Snap to center
//             const targetScroll = clampedIndex * ITEM_HEIGHT;
//             container.scrollTo({top: targetScroll, behavior: 'smooth'});
//
//             // Set the value based on type
//             if (type === 'day') {
//                 const dayValue = items[clampedIndex] as number;
//                 setValue(dayValue);
//             } else if (type === 'month') {
//                 const monthValue = clampedIndex % 12;
//                 setValue(monthValue);
//             } else if (type === 'year') {
//                 const yearValue = items[clampedIndex] as number;
//                 setValue(yearValue);
//             }
//
//             isScrollingRef.current = false;
//         }, 50);
//     };
//
//     // New getItemStyle: uses pixel distance from center (not raw index difference) so items don't abruptly disappear.
//     const getItemStyle = (index: number, centerIndex: number) => {
//         const offset = index - centerIndex; // signed
//         const distancePx = Math.abs(offset) * ITEM_HEIGHT; // pixel distance from center
//
//         // visible radius in pixels (how many pixels we treat as "near the center")
//         const visibleRadius = ITEM_HEIGHT * 5; // 5 items up/down are treated as visible
//
//         // normalized [0..1]
//         const t = Math.min(1, distancePx / visibleRadius);
//
//         const maxRotation = 28; // degrees
//         const rotation = (offset < 0 ? -1 : 1) * t * maxRotation; // keep sign so top and bottom rotate oppositely
//
//         const maxTranslateZ = 72; // px (how deep they go)
//         const translateZ = -t * maxTranslateZ;
//
//         // const minOpacity = 0.12;
//         const minOpacity = 1;
//         const opacity = Math.max(minOpacity, 1 - t * 1.05);
//
//         const scale = 1 - t * 0.08;
//
//         return {
//             transform: `translateZ(${translateZ}px) rotateX(${rotation}deg) scale(${scale})`,
//             opacity,
//             transformOrigin: 'center center',
//             transformStyle: 'preserve-3d' as const,
//             WebkitTransformStyle: 'preserve-3d' as const,
//             willChange: 'transform, opacity'
//         };
//     };
//
//     if (!isVisible) return null;
//     return (
//         <AnimatePresence>
//             <motion.div
//                 initial={{opacity: 0, y: -30}}
//                 animate={{opacity: 1, y: 0}}
//                 transition={{
//                     type: "spring",
//                     stiffness: 200,
//                     damping: 6,
//                     mass: 0.3,
//                 }}
//                 className=" w-full !font-[Rubik] absolute z-[99] flex top-auto bottom-[59.5%] md:bottom-[25.8%] left-[2.94%] md:left-[3.94%]">
//                 <div className="w-full max-w-[296px] mx-4">
//                     <div className="relative h-[253px]">
//                         <div
//                             className={`${styles.datePicker} relative z-[2] text-center pb-[50px] px-[1px] h-[110px] pt-[5px] border-1 border-[#353535] rounded-[8px] mb-[33px]`}>
//
//                         </div>
//
//                         {/* Selection indicator - more visible borders */}
//                         <div
//                             className={`w-[274px] m-auto max-h-[36px] absolute top-[43%] left-[10px] h-11 border-l-1 border-r-1 border-[#353535] bg-[#3d9ed612] backdrop-blur-[15px]  pointer-events-none`}>
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
//                                         scrollSnapType: 'y mandatory',
//                                         perspective: '1000px',
//                                         scrollbarWidth: 'none',
//                                         msOverflowStyle: 'none'
//                                     }}
//                                     onScroll={() => handleScroll(dayRef, setSelectedDay, infiniteDays, 'day')}
//                                 >
//                                     <div className="py-20 flex flex-col gap-[15px]">
//                                         {infiniteDays.map((day, index) => (
//                                             <div
//                                                 key={`day-${index}`}
//                                                 className={`max-h-[20px] flex items-center justify-center text-lg  transition-all duration-200 cursor-pointer
//                                                 ${centerDayIndex === index ? 'text-[#3D9ED6]' : 'text-[#adadad]'
//                                                 }`}
//                                                 style={{
//                                                     scrollSnapAlign: 'center',
//                                                     ...getItemStyle(index, centerDayIndex)
//                                                 }}
//                                                 onClick={() => {
//                                                     setSelectedDay(day);
//                                                     setCenterDayIndex(index);
//
//                                                     // if (dayRef.current) {
//                                                     //     dayRef.current.scrollTo({
//                                                     //         top: index * ITEM_HEIGHT,
//                                                     //         behavior: 'smooth'
//                                                     //     });
//                                                     // }
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
//                                         scrollSnapType: 'y mandatory',
//                                         perspective: '1000px',
//                                         scrollbarWidth: 'none',
//                                         msOverflowStyle: 'none'
//                                     }}
//                                     onScroll={() => handleScroll(monthRef, setSelectedMonth, infiniteMonths, 'month')}
//                                 >
//                                     <div className="py-20 flex flex-col gap-[15px]">
//                                         {infiniteMonths.map((month, index) => (
//                                             <div
//                                                 key={`month-${index}`}
//                                                 className={`max-h-[20px] flex items-center justify-start text-lg  transition-all duration-200 cursor-pointer
//                                             ${centerMonthIndex === index ? 'text-[#3D9ED6]' : 'text-[#adadad]'
//                                                 }`}
//                                                 style={{
//                                                     scrollSnapAlign: 'center',
//                                                     ...getItemStyle(index, centerMonthIndex)
//                                                 }}
//                                                 onClick={() => {
//                                                     setSelectedMonth(index % 12);
//                                                     setCenterMonthIndex(index);
//
//                                                     // if (monthRef.current) {
//                                                     //     monthRef.current.scrollTo({
//                                                     //         top: index * ITEM_HEIGHT,
//                                                     //         behavior: 'smooth'
//                                                     //     });
//                                                     // }
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
//                                         scrollSnapType: 'y mandatory',
//                                         perspective: '1000px',
//                                         scrollbarWidth: 'none',
//                                         msOverflowStyle: 'none'
//                                     }}
//                                     onScroll={() => handleScroll(yearRef, setSelectedYear, infiniteYears, 'year')}
//                                 >
//                                     <div className="py-20 flex flex-col gap-[15px]">
//                                         {infiniteYears.map((year, index) => (
//                                             <div
//                                                 key={`year-${index}`}
//                                                 className={`max-h-[20px] flex items-center justify-center text-lg  transition-all duration-200 cursor-pointer
//                                             ${centerYearIndex === index ? 'text-[#3D9ED6]' : 'text-[#adadad]'
//                                                 }`}
//                                                 style={{
//                                                     scrollSnapAlign: 'center',
//                                                     ...getItemStyle(index, centerYearIndex)
//                                                 }}
//                                                 onClick={() => {
//                                                     setSelectedYear(year);
//                                                     setCenterYearIndex(index);
//
//                                                     // if (yearRef.current) {
//                                                     //     yearRef.current.scrollTo({
//                                                     //         top: index * ITEM_HEIGHT,
//                                                     //         behavior: 'smooth'
//                                                     //     });
//                                                     // }
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
//                             className={`${styles.datePicker} flex flex-col items-center justify-end h-[110px] text-center pt-[50px] px-[24px] pb-[5px] border-1 border-[#353535] rounded-[8px] `}>
//                             <div className={`w-full flex flex-col items-end justify-end`}>
//
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//         </AnimatePresence>
//     );
// };


import React, {useState, useEffect, useRef} from 'react';
import styles from '@/app/page.module.scss'
import {AnimatePresence, motion} from "framer-motion";

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

    const currentYear = new Date().getFullYear();

    // Create infinite arrays for seamless scrolling
    const createInfiniteArray = <T, >(baseArray: T[], repeatCount: number = 10): T[] => {
        const result: T[] = [];
        for (let i = 0; i < repeatCount; i++) {
            result.push(...baseArray);
        }
        return result;
    };

    // Get days in month considering leap year
    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Create dynamic days array based on current month/year selection
    const createDaysArray = (month: number, year: number) => {
        const daysInMonth = getDaysInMonth(month, year);
        const baseDays = Array.from({length: daysInMonth}, (_, i) => i + 1);
        return createInfiniteArray(baseDays, 15);
    };

    // Months repeated
    const infiniteMonths = createInfiniteArray(months, 15);

    // Годы только от 1900
    const baseYears = Array.from({length: currentYear - 1900 + 1}, (_, i) => currentYear - i).filter(year => year >= 1900);
    const infiniteYears = createInfiniteArray(baseYears, 5);

    const parseInitialDate = (dateString?: string) => {
        if (!dateString) return {day: 1, month: 0, year: Math.max(1900, currentYear - 25)};

        const parts = dateString.split('.');
        if (parts.length === 3) {
            const day = parseInt(parts[0]) || 1;
            const month = (parseInt(parts[1]) || 1) - 1;
            const year = Math.max(1900, parseInt(parts[2]) || currentYear - 25);
            return {day, month, year};
        }
        return {day: 1, month: 0, year: Math.max(1900, currentYear - 25)};
    };

    const initial = parseInitialDate(initialDate);
    const [selectedDay, setSelectedDay] = useState(initial.day);
    const [selectedMonth, setSelectedMonth] = useState(initial.month);
    const [selectedYear, setSelectedYear] = useState(initial.year);

    // Dynamic days array that updates when month/year changes
    const [infiniteDays, setInfiniteDays] = useState(createDaysArray(initial.month, initial.year));

    const dayRef = useRef<HTMLDivElement | null>(null);
    const monthRef = useRef<HTMLDivElement | null>(null);
    const yearRef = useRef<HTMLDivElement | null>(null);

    // Реализация drag scroll прямо здесь
    const setupDragScroll = (element: HTMLDivElement) => {
        let isDown = false;
        let startY = 0;
        let scrollTop = 0;

        const handleStart = (clientY: number) => {
            isDown = true;
            startY = clientY;
            scrollTop = element.scrollTop;
            element.style.cursor = 'grabbing';
            element.style.userSelect = 'none';

        };

        const handleMove = (clientY: number) => {
            if (!isDown) return;
            const y = clientY;
            const walk = (startY - y) * 2;
            element.scrollTop = scrollTop + walk;
        };

        const handleEnd = () => {
            isDown = false;
            element.style.cursor = 'grab';
            element.style.userSelect = '';
        };

        // Mouse events
        const onMouseDown = (e: MouseEvent) => handleStart(e.clientY);
        const onMouseMove = (e: MouseEvent) => handleMove(e.clientY);
        const onMouseUp = () => handleEnd();
        const onMouseLeave = () => handleEnd();

        // Touch events
        const onTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            handleStart(e.touches[0].clientY);
        };
        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            handleMove(e.touches[0].clientY);
        };
        const onTouchEnd = () => handleEnd();

        element.style.cursor = 'grab';
        element.addEventListener('mousedown', onMouseDown);
        element.addEventListener('mousemove', onMouseMove);
        element.addEventListener('mouseup', onMouseUp);
        element.addEventListener('mouseleave', onMouseLeave);
        element.addEventListener('touchstart', onTouchStart, { passive: false });
        element.addEventListener('touchmove', onTouchMove, { passive: false });
        element.addEventListener('touchend', onTouchEnd);

        return () => {
            element.removeEventListener('mousedown', onMouseDown);
            element.removeEventListener('mousemove', onMouseMove);
            element.removeEventListener('mouseup', onMouseUp);
            element.removeEventListener('mouseleave', onMouseLeave);
            element.removeEventListener('touchstart', onTouchStart);
            element.removeEventListener('touchmove', onTouchMove);
            element.removeEventListener('touchend', onTouchEnd);
        };
    };

    useEffect(() => {
        const cleanupFunctions: (() => void)[] = [];

        if (dayRef.current) {
            cleanupFunctions.push(setupDragScroll(dayRef.current));
        }
        if (monthRef.current) {
            cleanupFunctions.push(setupDragScroll(monthRef.current));
        }
        if (yearRef.current) {
            cleanupFunctions.push(setupDragScroll(yearRef.current));
        }

        return () => {
            cleanupFunctions.forEach(cleanup => cleanup());
        };
    }, [isVisible]);

    const isScrollingRef = useRef(false);
    const ITEM_HEIGHT = 28;

    const [centerDayIndex, setCenterDayIndex] = useState(() => {
        const middleIndex = Math.floor(createDaysArray(initial.month, initial.year).length / 2);
        return middleIndex + initial.day - 1;
    });
    const [centerMonthIndex, setCenterMonthIndex] = useState(() => {
        const middleIndex = Math.floor(infiniteMonths.length / 2);
        return middleIndex + initial.month;
    });
    const [centerYearIndex, setCenterYearIndex] = useState(() => {
        const middleIndex = Math.floor(infiniteYears.length / 2);
        const yearOffset = baseYears.findIndex(y => y === initial.year);
        return yearOffset !== -1 ? middleIndex + yearOffset : middleIndex;
    });

    // Update days array when month or year changes
    useEffect(() => {
        const newInfiniteDays = createDaysArray(selectedMonth, selectedYear);
        setInfiniteDays(newInfiniteDays);

        // Adjust selected day if it exceeds the days in the new month
        const maxDays = getDaysInMonth(selectedMonth, selectedYear);
        if (selectedDay > maxDays) {
            setSelectedDay(maxDays);
            const middleIndex = Math.floor(newInfiniteDays.length / 2);
            setCenterDayIndex(middleIndex + maxDays - 1);

            if (dayRef.current) {
                setTimeout(() => {
                    const targetScroll = (middleIndex + maxDays - 1) * ITEM_HEIGHT;
                    dayRef.current?.scrollTo({top: targetScroll, behavior: 'smooth'});
                }, 100);
            }
        } else {
            // ИСПРАВЛЕНИЕ 4: Правильно находим индекс для текущего дня
            const middleIndex = Math.floor(newInfiniteDays.length / 2);
            let targetIndex = -1;

            // Ищем ближайший к центру индекс с нужным днем
            for (let i = 0; i < newInfiniteDays.length; i++) {
                if (newInfiniteDays[i] === selectedDay) {
                    if (Math.abs(i - middleIndex) < Math.abs(targetIndex - middleIndex) || targetIndex === -1) {
                        targetIndex = i;
                    }
                }
            }

            if (targetIndex !== -1) {
                setCenterDayIndex(targetIndex);
                if (dayRef.current) {
                    setTimeout(() => {
                        dayRef.current?.scrollTo({top: targetIndex * ITEM_HEIGHT, behavior: 'smooth'});
                    }, 100);
                }
            }
        }
    }, [selectedMonth, selectedYear, selectedDay]);

    // Optimized scroll handler with throttling
    const throttledScrollHandler = useRef<{ [key: string]: NodeJS.Timeout }>({});

    const getCenteredIndex = (container: HTMLDivElement | null) => {
        if (!container) return -1;

        const containerRect = container.getBoundingClientRect();
        const centerY = containerRect.top + containerRect.height / 2;

        const items = Array.from(container.children[0].children) as HTMLDivElement[];

        let closestIndex = -1;
        let minDistance = Infinity;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
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

    const scrollToSelected = () => {
        if (dayRef.current) {
            const middleIndex = Math.floor(infiniteDays.length / 2);
            const dayIndex = middleIndex + selectedDay - 1;
            const targetScroll = dayIndex * ITEM_HEIGHT;
            dayRef.current.scrollTo({top: targetScroll});
            setCenterDayIndex(dayIndex);
        }

        if (monthRef.current) {
            const middleIndex = Math.floor(infiniteMonths.length / 2);
            const monthIndex = middleIndex + selectedMonth;
            const targetScroll = monthIndex * ITEM_HEIGHT;
            monthRef.current.scrollTo({top: targetScroll});
            setCenterMonthIndex(monthIndex);
        }

        if (yearRef.current) {
            const middleIndex = Math.floor(infiniteYears.length / 2);
            const yearOffset = baseYears.findIndex(y => y === selectedYear);
            if (yearOffset !== -1) {
                const yearIndex = middleIndex + yearOffset;
                const targetScroll = yearIndex * ITEM_HEIGHT;
                yearRef.current.scrollTo({top: targetScroll});
                setCenterYearIndex(yearIndex);
            }
        }
    };

    useEffect(() => {
        if (isVisible) {
            setTimeout(() => {
                scrollToSelected();
            }, 100);
        }
    }, [isVisible]);

    useEffect(() => {
        if (isVisible && initialDate) {
            const parsed = parseInitialDate(initialDate);
            setSelectedDay(parsed.day);
            setSelectedMonth(parsed.month);
            setSelectedYear(parsed.year);

            setTimeout(() => {
                scrollToSelected();
            }, 150);
        }
    }, [isVisible, initialDate]);

    const handleConfirm = () => {
        const year = infiniteYears[centerYearIndex];
        const day = infiniteDays[centerDayIndex];
        const month = centerMonthIndex % 12;

        const maxDays = getDaysInMonth(month, year);
        const validDay = Math.min(day, maxDays);

        const formattedDate = `${validDay.toString().padStart(2, '0')}.${(month + 1).toString().padStart(2, '0')}.${year}`;

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

            const container = ref.current;
            const scrollTop = container.scrollTop;
            const centerIndex = Math.round(scrollTop / ITEM_HEIGHT);
            const clampedIndex = Math.max(0, Math.min(centerIndex, items.length - 1));

            const targetScroll = clampedIndex * ITEM_HEIGHT;
            container.scrollTo({top: targetScroll, behavior: 'smooth'});

            if (type === 'day') {
                const dayValue = items[clampedIndex] as number;
                setValue(dayValue);
            } else if (type === 'month') {
                const monthValue = clampedIndex % 12;
                setValue(monthValue);
            } else if (type === 'year') {
                const yearValue = items[clampedIndex] as number;
                setValue(yearValue);
            }

            isScrollingRef.current = false;
        }, 100);
    };

    // Стиль без каких-либо эффектов при скролле - все элементы одинаковые
    const getItemStyle = () => {
        // Просто возвращаем базовые стили без изменений
        return {
            opacity: 1,
            transform: 'none',
            transformOrigin: 'center center',
            pointerEvents: 'auto' as const
        };
    };

    if (!isVisible) return null;
    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0, y: -30}}
                animate={{opacity: 1, y: 0}}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 6,
                    mass: 0.3,
                }}
                className=" w-full !font-[Rubik] absolute z-[99] flex top-auto bottom-[59.5%] md:bottom-[25.8%] left-[2.94%] md:left-[3.94%]">
                <div className="w-full max-w-[296px] mx-4">
                    <div className="relative h-[253px]">
                        <div
                            className={`${styles.datePicker} relative z-[2] text-center pb-[50px] px-[1px] h-[110px] pt-[5px] border-1 border-[#353535] rounded-[8px] mb-[33px]`}>

                        </div>

                        {/* Selection indicator - more visible borders */}
                        <div
                            className={`w-[274px] m-auto max-h-[36px] absolute top-[43%] left-[10px] h-11 border-l-1 border-r-1 border-[#353535] bg-[#3d9ed612] backdrop-blur-[15px]  pointer-events-none`}>
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
                                        scrollSnapType: 'y mandatory',
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
                                                className={`max-h-[20px] flex items-center justify-center text-lg  transition-all duration-200 cursor-pointer select-none
                                             ${centerDayIndex === index ? 'text-[#3D9ED6]' : 'text-[#adadad]'
                                                }`}
                                                style={{
                                                    scrollSnapAlign: 'center',
                                                    ...getItemStyle()
                                                }}
                                                onClick={() => {
                                                    setSelectedDay(day);
                                                    setCenterDayIndex(index);

                                                    if (dayRef.current) {
                                                        // Исправляем расчет скролла - учитываем padding
                                                        const containerHeight = dayRef.current.clientHeight;
                                                        const scrollTop = index * (ITEM_HEIGHT + 15) - (containerHeight / 2) + (ITEM_HEIGHT / 2);

                                                        dayRef.current.scrollTo({
                                                            top: scrollTop,
                                                            behavior: 'smooth'
                                                        });
                                                    }
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
                                        scrollSnapType: 'y mandatory',
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
                                                className={`max-h-[20px] flex items-center justify-start text-lg  transition-all duration-200 cursor-pointer select-none
                                            ${centerMonthIndex === index ? 'text-[#3D9ED6]' : 'text-[#adadad]'
                                                }`}
                                                style={{
                                                    scrollSnapAlign: 'center',
                                                    ...getItemStyle()
                                                }}
                                                onClick={() => {
                                                    setSelectedMonth(index % 12);
                                                    setCenterMonthIndex(index);
                                                    if (monthRef.current) {
                                                        // Исправляем расчет скролла - учитываем padding и gap
                                                        const containerHeight = monthRef.current.clientHeight;
                                                        const scrollTop = index * (ITEM_HEIGHT + 15) - (containerHeight / 2) + (ITEM_HEIGHT / 2);
                                                        monthRef.current.scrollTo({
                                                            top: scrollTop,
                                                            behavior: 'smooth'
                                                        });
                                                    }
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
                                        scrollSnapType: 'y mandatory',
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
                                                className={`max-h-[20px] flex items-center justify-center text-lg  transition-all duration-200 cursor-pointer select-none
                                            ${centerYearIndex === index ? 'text-[#3D9ED6]' : 'text-[#adadad]'
                                                }`}
                                                style={{
                                                    scrollSnapAlign: 'center',
                                                    ...getItemStyle()
                                                }}
                                                onClick={() => {
                                                    setSelectedYear(year);
                                                    setCenterYearIndex(index);
                                                    if (yearRef.current) {
                                                        // Исправляем расчет скролла - учитываем padding и gap
                                                        const containerHeight = yearRef.current.clientHeight;
                                                        const scrollTop = index * (ITEM_HEIGHT + 15) - (containerHeight / 2) + (ITEM_HEIGHT / 2);
                                                        yearRef.current.scrollTo({
                                                            top: scrollTop,
                                                            behavior: 'smooth'
                                                        });
                                                    }
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
                            className={`${styles.datePicker} flex flex-col items-center justify-end h-[110px] text-center pt-[50px] px-[24px] pb-[5px] border-1 border-[#353535] rounded-[8px] `}>
                            <div className={`w-full flex flex-col items-end justify-end`}>

                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};