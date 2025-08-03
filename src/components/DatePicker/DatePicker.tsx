import React, { useState, useEffect, useRef } from 'react';
import styles from '@/app/page.module.scss';
// import Close from "@/components/closeIcon/close";

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
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    // Get days for specific month and year
    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const parseInitialDate = (dateString?: string) => {
        if (!dateString) return { day: 1, month: 0, year: currentYear - 25 };

        const parts = dateString.split('.');
        if (parts.length === 3) {
            const day = parseInt(parts[0]) || 1;
            const month = (parseInt(parts[1]) || 1) - 1;
            const year = parseInt(parts[2]) || currentYear - 25;
            return { day, month, year };
        }
        return { day: 1, month: 0, year: currentYear - 25 };
    };

    const initial = parseInitialDate(initialDate);
    const [selectedDay, setSelectedDay] = useState(initial.day);
    const [selectedMonth, setSelectedMonth] = useState(initial.month);
    const [selectedYear, setSelectedYear] = useState(initial.year);

    const dayRef = useRef<HTMLDivElement | null>(null);
    const monthRef = useRef<HTMLDivElement | null>(null);
    const yearRef = useRef<HTMLDivElement | null>(null);

    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Get current days array based on selected month and year
    const currentDays = Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => i + 1);

    const scrollToSelected = () => {
        const itemHeight = 44; // Consistent item height

        if (dayRef.current) {
            const targetScroll = (selectedDay - 1) * itemHeight;
            dayRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }

        if (monthRef.current) {
            const targetScroll = selectedMonth * itemHeight;
            monthRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }

        if (yearRef.current) {
            const yearIndex = years.indexOf(selectedYear);
            const targetScroll = yearIndex * itemHeight;
            yearRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
    };

    // Adjust selected day if it's invalid for current month/year
    useEffect(() => {
        const maxDays = getDaysInMonth(selectedMonth, selectedYear);
        if (selectedDay > maxDays) {
            setSelectedDay(maxDays);
        }
    }, [selectedMonth, selectedYear, selectedDay]);

    useEffect(() => {
        if (isVisible) {
            setTimeout(() => {
                scrollToSelected();
            }, 100);
        }
    }, [isVisible]);

    const handleConfirm = () => {
        const formattedDate = `${selectedDay.toString().padStart(2, '0')}.${(selectedMonth + 1).toString().padStart(2, '0')}.${selectedYear}`;
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

        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {

            if (!ref.current) return;

            const container = ref.current;
            const itemHeight = 44; // Consistent item height
            const scrollTop = container.scrollTop;
            const centerIndex = Math.round(scrollTop / itemHeight);
            const clampedIndex = Math.max(0, Math.min(centerIndex, items.length - 1));

            // Snap to center
            const targetScroll = clampedIndex * itemHeight;
            container.scrollTo({ top: targetScroll, behavior: 'smooth' });

            // Set the value
            if (type === 'day') {
                setValue(clampedIndex + 1);
            } else if (type === 'month') {
                setValue(clampedIndex);
            } else {
                setValue(items[clampedIndex] as number);
            }
        }, 100);
    };

    const getItemStyle = (index: number, selectedIndex: number, containerRef: React.RefObject<HTMLDivElement | null>) => {
        if (!containerRef.current) return {};

        const itemHeight = 44; // Consistent item height
        const containerHeight = containerRef.current.clientHeight;
        const scrollTop = containerRef.current.scrollTop;
        const itemTop = index * itemHeight;
        const itemCenter = itemTop + itemHeight / 2;
        const containerCenter = scrollTop + containerHeight / 2;

        const distance = Math.abs(itemCenter - containerCenter);
        const maxDistance = containerHeight / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);

        // 3D rotation effect
        const rotationX = normalizedDistance * 25;
        const scale = 1 - normalizedDistance * 0.1;
        const opacity = 1 - normalizedDistance * 0.3;

        return {
            transform: `perspective(1000px) rotateX(${rotationX}deg) scale(${scale})`,
            opacity,
            transformOrigin: 'center center',
            transformStyle: 'preserve-3d' as const
        };
    };

    if (!isVisible) return null;

    return (
        <div className="font-[Rubik] fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[4px] bg-[#0000005e] bg-opacity-50">
            <div className="rounded-lg shadow-2xl w-80 max-w-sm mx-4 overflow-hidden">
                <div className="relative h-[253px] overflow-hidden">
                    <div className={`${styles.datePicker} text-center pb-[46px] px-[1px] pt-[5px] border border-[#353535] rounded-[8px] mb-[38px]`}>
                        {/* Header */}
                        <div className="flex items-center justify-end p-3">
                            <button
                                onClick={onClose}
                                className="text-[#3D9ED6] font-medium text-base cursor-pointer transition-colors"
                            >
                                <svg
                                    className="animated-close"
                                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_5371_3270)">
                                        <mask id="mask0_5371_3270" style={{ maskType: 'luminance' }}
                                            maskUnits="userSpaceOnUse"
                                            x="-1" y="-1" width="16" height="16">
                                            <path d="M15 -1H-1V15H15V-1Z" fill="white" />
                                        </mask>
                                        <g mask="url(#mask0_5371_3270)">
                                            <path
                                                d="M0.636568 2.05093L11.9503 13.3646L13.3645 11.9504L2.05078 0.636719L0.636568 2.05093Z"
                                                fill="#ADADAD" />
                                            <path
                                                d="M2.05093 13.3647L8.41489 7.00069L7.00068 5.58648L0.636719 11.9504L2.05093 13.3647ZM10.5362 4.87937L13.3646 2.05094L11.9504 0.636731L9.122 3.46516L10.5362 4.87937Z"
                                                fill="#ADADAD" />
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_5371_3270">
                                            <rect width="14" height="14" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Selection indicator */}
                    <div className={`${styles.datePicker} absolute inset-x-0 top-[43%] transform -translate-y-1/2 h-11 border-l border-r border-[#353535] bg-[#3D9ED6] bg-opacity-5 backdrop-blur-[6px] scale-[.90] pointer-events-none`}>
                    </div>

                    <div className="flex w-full h-full max-h-[138px] absolute top-[45px] z-[9]">
                        {/* Day wheel */}
                        <div className="flex-1 relative overflow-hidden">
                            <div
                                ref={dayRef}
                                className="h-full overflow-y-auto scrollbar-hide"
                                style={{
                                    scrollSnapType: 'y mandatory',
                                    perspective: '1000px'
                                }}
                                onScroll={() => handleScroll(dayRef, setSelectedDay, currentDays, 'day')}
                            >
                                <div className="py-20">
                                    {currentDays.map((day, index) => (
                                        <div
                                            key={day}
                                            className={`h-11 flex items-center justify-center text-lg font-medium transition-all duration-200 cursor-pointer ${selectedDay === day ? 'text-[#3D9ED6]' : 'text-[#adadad]'
                                                }`}
                                            style={{
                                                scrollSnapAlign: 'center',
                                                ...getItemStyle(index, selectedDay - 1, dayRef)
                                            }}
                                            onClick={() => {
                                                setSelectedDay(day);
                                                if (dayRef.current) {
                                                    dayRef.current.scrollTo({
                                                        top: index * 44,
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
                        <div className="flex-1 relative overflow-hidden">
                            <div
                                ref={monthRef}
                                className="h-full overflow-y-auto scrollbar-hide"
                                style={{
                                    scrollSnapType: 'y mandatory',
                                    perspective: '1000px'
                                }}
                                onScroll={() => handleScroll(monthRef, setSelectedMonth, months, 'month')}
                            >
                                <div className="py-20">
                                    {months.map((month, index) => (
                                        <div
                                            key={month}
                                            className={`h-11 flex items-center justify-center text-lg font-medium transition-all duration-200 cursor-pointer ${selectedMonth === index ? 'text-[#3D9ED6]' : 'text-[#adadad]'
                                                }`}
                                            style={{
                                                scrollSnapAlign: 'center',
                                                ...getItemStyle(index, selectedMonth, monthRef)
                                            }}
                                            onClick={() => {
                                                setSelectedMonth(index);
                                                if (monthRef.current) {
                                                    monthRef.current.scrollTo({
                                                        top: index * 44,
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
                        <div className="flex-1 relative overflow-hidden">
                            <div
                                ref={yearRef}
                                className="h-full overflow-y-auto scrollbar-hide"
                                style={{
                                    scrollSnapType: 'y mandatory',
                                    perspective: '1000px'
                                }}
                                onScroll={() => handleScroll(yearRef, setSelectedYear, years, 'year')}
                            >
                                <div className="py-20">
                                    {years.map((year, index) => (
                                        <div
                                            key={year}
                                            className={`h-11 flex items-center justify-center text-lg font-medium transition-all duration-200 cursor-pointer ${selectedYear === year ? 'text-[#3D9ED6]' : 'text-[#adadad]'
                                                }`}
                                            style={{
                                                scrollSnapAlign: 'center',
                                                ...getItemStyle(index, years.indexOf(selectedYear), yearRef)
                                            }}
                                            onClick={() => {
                                                setSelectedYear(year);
                                                if (yearRef.current) {
                                                    yearRef.current.scrollTo({
                                                        top: index * 44,
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
                    </div>

                    {/* Footer */}
                    <div className={`${styles.datePicker} text-center pt-[46px] px-[24px] pb-[5px] border border-[#353535] rounded-[8px]`}>
                        <div className="flex p-3">
                            <button
                                onClick={handleConfirm}
                                className={`${styles['menu-item']} !max-w-[50px] m-auto text-[#3D9ED6] font-medium text-base cursor-pointer transition-colors`}
                            >
                                Готово
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};


