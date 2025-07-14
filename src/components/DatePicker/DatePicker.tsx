// import React, { useState, useEffect, useRef } from 'react';
//
type DatePickerProps = {
    onDateSelect: (date: string) => void;
    onClose: () => void;
    initialDate?: string;
    isVisible: boolean;
};

export const DatePicker: React.FC<DatePickerProps> = () => {
    // const [currentDate, setCurrentDate] = useState(new Date());
    // const [selectedDate, setSelectedDate] = useState(null);
    // const calendarRef = useRef(null);
    //
    // useEffect(() => {
    //     if (initialDate) {
    //         const parts = initialDate.split('.');
    //         if (parts.length === 3) {
    //             const date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    //             if (!isNaN(date.getTime())) {
    //                 setSelectedDate(date);
    //                 setCurrentDate(date);
    //             }
    //         }
    //     }
    // }, [initialDate]);
    //
    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (calendarRef.current && !calendarRef.current.contains(event.target)) {
    //             onClose();
    //         }
    //     };
    //
    //     if (isVisible) {
    //         document.addEventListener('mousedown', handleClickOutside);
    //     }
    //
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [isVisible, onClose]);
    //
    // const monthNames = [
    //     'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    //     'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    // ];
    //
    // const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    //
    // const getDaysInMonth = (day: number | null) => {
    //     const year = currentDate.getFullYear();
    //     const month = currentDate.getMonth();
    //     const firstDay = new Date(year, month, 1);
    //     const lastDay = new Date(year, month + 1, 0);
    //     const daysInMonth = lastDay.getDate();
    //     const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    //
    //     const days = [];
    //
    //     // Добавляем пустые ячейки для дней предыдущего месяца
    //     for (let i = 0; i < startingDayOfWeek; i++) {
    //         days.push(null);
    //     }
    //
    //     // Добавляем дни текущего месяца
    //     for (let day = 1; day <= daysInMonth; day++) {
    //         days.push(day);
    //     }
    //
    //     return days;
    // };
    //
    // const handleDateClick = (day: number | null) => {
    //     if (day) {
    //         const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    //         const today = new Date();
    //
    //         // Проверяем, что дата не в будущем
    //         if (newDate > today) {
    //             return;
    //         }
    //
    //         // Проверяем минимальный возраст (13 лет)
    //         const minAge = 13;
    //         const minDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    //         if (newDate > minDate) {
    //             return;
    //         }
    //
    //         setSelectedDate(newDate);
    //
    //         // Форматируем дату как ДД.ММ.ГГГГ
    //         const formattedDate = `${day.toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;
    //         onDateSelect(formattedDate);
    //         onClose();
    //     }
    // };
    //
    // const navigateMonth = (direction: number) => {
    //     setCurrentDate(prev => {
    //         const newDate = new Date(prev);
    //         newDate.setMonth(prev.getMonth() + direction);
    //         return newDate;
    //     });
    // };
    //
    // const navigateYear = (direction: number) => {
    //     setCurrentDate(prev => {
    //         const newDate = new Date(prev);
    //         newDate.setFullYear(prev.getFullYear() + direction);
    //         return newDate;
    //     });
    // };
    //
    // const isDateDisabled = (day: number | null) => {
    //     if (!day) return false;
    //
    //     const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    //     const today = new Date();
    //
    //     // Отключаем будущие даты
    //     if (date > today) return true;
    //
    //     // Отключаем даты, которые делают возраст меньше 13 лет
    //     const minAge = 13;
    //     const minDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    //     if (date > minDate) return true;
    //
    //     return false;
    // };
    //
    // const isDateSelected = (day: number | null) => {
    //     if (!day || !selectedDate) return false;
    //
    //     return selectedDate.getDate() === day &&
    //         selectedDate.getMonth() === currentDate.getMonth() &&
    //         selectedDate.getFullYear() === currentDate.getFullYear();
    // };
    //
    // const days = getDaysInMonth(currentDate);
    //
    // if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {/*<div*/}
            {/*    ref={calendarRef}*/}
            {/*    className="bg-[#1a1a1a] border border-[#353535] rounded-lg p-4 w-80 shadow-xl"*/}
            {/*>*/}
            {/*    /!* Заголовок с навигацией *!/*/}
            {/*    <div className="flex items-center justify-between mb-4">*/}
            {/*        <div className="flex items-center space-x-2">*/}
            {/*            <button*/}
            {/*                onClick={() => navigateYear(-1)}*/}
            {/*                className="p-1 hover:bg-[#2a2a2a] rounded transition-colors"*/}
            {/*            >*/}
            {/*                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">*/}
            {/*                    <path d="M11 4L7 8L11 12" stroke="#adadad" strokeWidth="2" strokeLinecap="round"/>*/}
            {/*                    <path d="M7 4L3 8L7 12" stroke="#adadad" strokeWidth="2" strokeLinecap="round"/>*/}
            {/*                </svg>*/}
            {/*            </button>*/}
            {/*            <button*/}
            {/*                onClick={() => navigateMonth(-1)}*/}
            {/*                className="p-1 hover:bg-[#2a2a2a] rounded transition-colors"*/}
            {/*            >*/}
            {/*                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">*/}
            {/*                    <path d="M10 4L6 8L10 12" stroke="#adadad" strokeWidth="2" strokeLinecap="round"/>*/}
            {/*                </svg>*/}
            {/*            </button>*/}
            {/*        </div>*/}

            {/*        <div className="text-[#adadad] font-medium text-center min-w-[140px]">*/}
            {/*            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}*/}
            {/*        </div>*/}

            {/*        <div className="flex items-center space-x-2">*/}
            {/*            <button*/}
            {/*                onClick={() => navigateMonth(1)}*/}
            {/*                className="p-1 hover:bg-[#2a2a2a] rounded transition-colors"*/}
            {/*            >*/}
            {/*                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">*/}
            {/*                    <path d="M6 4L10 8L6 12" stroke="#adadad" strokeWidth="2" strokeLinecap="round"/>*/}
            {/*                </svg>*/}
            {/*            </button>*/}
            {/*            <button*/}
            {/*                onClick={() => navigateYear(1)}*/}
            {/*                className="p-1 hover:bg-[#2a2a2a] rounded transition-colors"*/}
            {/*            >*/}
            {/*                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">*/}
            {/*                    <path d="M5 4L9 8L5 12" stroke="#adadad" strokeWidth="2" strokeLinecap="round"/>*/}
            {/*                    <path d="M9 4L13 8L9 12" stroke="#adadad" strokeWidth="2" strokeLinecap="round"/>*/}
            {/*                </svg>*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    /!* Дни недели *!/*/}
            {/*    <div className="grid grid-cols-7 gap-1 mb-2">*/}
            {/*        {daysOfWeek.map((day) => (*/}
            {/*            <div*/}
            {/*                key={day}*/}
            {/*                className="text-center text-[#666] text-sm font-medium py-2"*/}
            {/*            >*/}
            {/*                {day}*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}

            {/*    /!* Календарная сетка *!/*/}
            {/*    <div className="grid grid-cols-7 gap-1">*/}
            {/*        {days.map((day, index) => (*/}
            {/*            <button*/}
            {/*                key={index}*/}
            {/*                onClick={() => handleDateClick(day)}*/}
            {/*                disabled={isDateDisabled(day)}*/}
            {/*                className={`*/}
            {/*    h-8 w-8 text-sm rounded transition-colors*/}
            {/*    ${day ? 'hover:bg-[#2a2a2a]' : ''}*/}
            {/*    ${isDateSelected(day) ? 'bg-[#4a9eff] text-white' : 'text-[#adadad]'}*/}
            {/*    ${isDateDisabled(day) ? 'text-[#555] cursor-not-allowed' : 'cursor-pointer'}*/}
            {/*    ${!day ? 'cursor-default' : ''}*/}
            {/*  `}*/}
            {/*            >*/}
            {/*                {day}*/}
            {/*            </button>*/}
            {/*        ))}*/}
            {/*    </div>*/}

            {/*    /!* Кнопки управления *!/*/}
            {/*    <div className="flex justify-between mt-4 pt-4 border-t border-[#353535]">*/}
            {/*        <button*/}
            {/*            onClick={() => {*/}
            {/*                const today = new Date();*/}
            {/*                const minAge = 13;*/}
            {/*                const minDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());*/}

            {/*                if (today > minDate) {*/}
            {/*                    const formattedDate = `${minDate.getDate().toString().padStart(2, '0')}.${(minDate.getMonth() + 1).toString().padStart(2, '0')}.${minDate.getFullYear()}`;*/}
            {/*                    onDateSelect(formattedDate);*/}
            {/*                    onClose();*/}
            {/*                }*/}
            {/*            }}*/}
            {/*            className="text-[#4a9eff] hover:text-[#6bb6ff] transition-colors text-sm"*/}
            {/*        >*/}
            {/*            Мин. возраст*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*            onClick={onClose}*/}
            {/*            className="text-[#adadad] hover:text-white transition-colors text-sm"*/}
            {/*        >*/}
            {/*            Закрыть*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};
