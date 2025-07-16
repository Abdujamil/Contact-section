import React, { useState, useEffect, useRef } from 'react';
import styles from '@/app/page.module.scss';

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
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    // Парсим начальную дату
    const parseInitialDate = (dateString?: string) => {
        if (!dateString) return { day: 1, month: 0, year: currentYear - 25 };

        const parts = dateString.split('.');
        if (parts.length === 3) {
            const day = parseInt(parts[0]) || 1;
            const month = (parseInt(parts[1]) || 1) - 1; // month is 0-indexed
            const year = parseInt(parts[2]) || currentYear - 25;
            return { day, month, year };
        }
        return { day: 1, month: 0, year: currentYear - 25 };
    };

    const initial = parseInitialDate(initialDate);
    const [selectedDay, setSelectedDay] = useState(initial.day);
    const [selectedMonth, setSelectedMonth] = useState(initial.month);
    const [selectedYear, setSelectedYear] = useState(initial.year);

    const dayRef = useRef<HTMLDivElement>(null);
    const monthRef = useRef<HTMLDivElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible) {
            // Прокручиваем к выбранным значениям
            setTimeout(() => {
                if (dayRef.current) {
                    const dayElement = dayRef.current.children[selectedDay - 1] as HTMLElement;
                    if (dayElement) {
                        dayRef.current.scrollTop = dayElement.offsetTop - dayRef.current.offsetHeight / 2 + dayElement.offsetHeight / 2;
                    }
                }
                if (monthRef.current) {
                    const monthElement = monthRef.current.children[selectedMonth] as HTMLElement;
                    if (monthElement) {
                        monthRef.current.scrollTop = monthElement.offsetTop - monthRef.current.offsetHeight / 2 + monthElement.offsetHeight / 2;
                    }
                }
                if (yearRef.current) {
                    const yearIndex = years.indexOf(selectedYear);
                    const yearElement = yearRef.current.children[yearIndex] as HTMLElement;
                    if (yearElement) {
                        yearRef.current.scrollTop = yearElement.offsetTop - yearRef.current.offsetHeight / 2 + yearElement.offsetHeight / 2;
                    }
                }
            }, 100);
        }
    }, [isVisible, selectedDay, selectedMonth, selectedYear, years]);

    const handleConfirm = () => {
        const formattedDate = `${selectedDay.toString().padStart(2, '0')}.${(selectedMonth + 1).toString().padStart(2, '0')}.${selectedYear}`;
        onDateSelect(formattedDate);
        onClose();
    };

    const handleScroll = (
        ref: React.RefObject<HTMLDivElement | null>,
        setValue: (value: number) => void,
        items: (number | string)[]
    ) => {
        if (!ref.current) return;

        const container = ref.current;
        const itemHeight = 44;
        const scrollTop = container.scrollTop;
        const centerIndex = Math.round(scrollTop / itemHeight);
        const clampedIndex = Math.max(0, Math.min(centerIndex, items.length - 1));

        if (ref === dayRef) {
            setValue(clampedIndex + 1);
        } else if (ref === monthRef) {
            setValue(clampedIndex);
        } else {
            setValue(items[clampedIndex] as number);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
            <div className={`${styles.datePicker} rounded-lg shadow-2xl w-80 max-w-sm mx-4`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <button
                        onClick={onClose}
                        className="text-blue-500 font-medium text-base hover:text-blue-600 transition-colors"
                    >
                        Отмена
                    </button>
                    <h3 className="text-lg font-semibold text-gray-900">Дата рождения</h3>
                    <button
                        onClick={handleConfirm}
                        className="text-blue-500 font-medium text-base hover:text-blue-600 transition-colors"
                    >
                        Готово
                    </button>
                </div>

                {/* Date Picker Wheels */}
                <div className="relative h-48 ">
                    {/* Selection indicator */}
                    <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-11  bg-[#2222] pointer-events-none z-10"></div>

                    <div className="flex h-full">
                        {/* Day wheel */}
                        <div className="flex-1 relative">
                            <div
                                ref={dayRef}
                                className="h-full overflow-y-scroll scrollbar-hide"
                                style={{ scrollSnapType: 'y mandatory' }}
                                onScroll={() => handleScroll(dayRef, setSelectedDay, days)}
                            >
                                <div className="py-20">
                                    {days.map((day) => (
                                        <div
                                            key={day}
                                            className={`h-11 flex items-center justify-center text-lg font-medium transition-colors cursor-pointer ${
                                                selectedDay === day ? 'text-[#3D9ED6]' : 'text-gray-400'
                                            }`}
                                            style={{ scrollSnapAlign: 'center' }}
                                            onClick={() => setSelectedDay(day)}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Month wheel */}
                        <div className="flex-1 relative">
                            <div
                                ref={monthRef}
                                className="h-full overflow-y-scroll scrollbar-hide"
                                style={{ scrollSnapType: 'y mandatory' }}
                                onScroll={() => handleScroll(monthRef, setSelectedMonth, months)}
                            >
                                <div className="py-20">
                                    {months.map((month, index) => (
                                        <div
                                            key={month}
                                            className={`h-11 flex items-center justify-center text-lg font-medium transition-colors cursor-pointer ${
                                                selectedMonth === index ? 'text-[#3D9ED6]' : 'text-gray-400'
                                            }`}
                                            style={{ scrollSnapAlign: 'center' }}
                                            onClick={() => setSelectedMonth(index)}
                                        >
                                            {month}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Year wheel */}
                        <div className="flex-1 relative">
                            <div
                                ref={yearRef}
                                className="h-full overflow-y-scroll scrollbar-hide"
                                style={{ scrollSnapType: 'y mandatory' }}
                                onScroll={() => handleScroll(yearRef, setSelectedYear, years)}
                            >
                                <div className="py-20">
                                    {years.map((year) => (
                                        <div
                                            key={year}
                                            className={`h-11 flex items-center justify-center text-lg font-medium transition-colors cursor-pointer ${
                                                selectedYear === year ? 'text-[#3D9ED6]' : 'text-gray-400'
                                            }`}
                                            style={{ scrollSnapAlign: 'center' }}
                                            onClick={() => setSelectedYear(year)}
                                        >
                                            {year}
                                        </div>
                                    ))}
                                </div>
                            </div>
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