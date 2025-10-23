// import React, { useEffect, useState, useRef } from 'react';
// import { useFormContext } from 'react-hook-form';
// import type { UseFormRegisterReturn } from 'react-hook-form';
// import styles from '@/app/page.module.scss';
//
// interface DateInputProps {
//     title: string;
//     inputName: string;
//     required?: boolean;
//     disable?: boolean;
//     fail?: boolean;
//     className?: string;
//     classNameTitle?: string;
//     defaultValue?: string;
//     onFocus?: () => void;
//     value?: string;
//     onChange?: (value: string) => void;
// }
//
// const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(function DateInput(
//     {
//         title,
//         disable,
//         fail,
//         inputName,
//         required,
//         className,
//         classNameTitle,
//         defaultValue,
//         value: propValue,
//         onChange,
//         onFocus
//     },
//     forwardedRef
// ) {
//     const { register, formState: { errors, isSubmitted, submitCount }, setValue, watch } = useFormContext();
//     const [visibleError, setVisibleError] = useState(false);
//     const [internalValue, setInternalValue] = useState('');
//     const inputRef = useRef<HTMLInputElement | null>(null);
//
//     const currentValue = propValue !== undefined ? propValue : internalValue;
//     const isActive = currentValue.trim().length > 0;
//
//     const formatDate = (value: string) => {
//         const cleaned = value.replace(/\D/g, '').substring(0, 8);
//         let formatted = '';
//         if (cleaned.length >= 1) formatted += cleaned.substring(0, 2);
//         if (cleaned.length >= 3) formatted += '.' + cleaned.substring(2, 4);
//         if (cleaned.length >= 5) formatted += '.' + cleaned.substring(4, 8);
//         return formatted;
//     };
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const formattedValue = formatDate(e.target.value);
//         setInternalValue(formattedValue);
//         setValue(inputName, formattedValue);
//         onChange?.(formattedValue);
//     };
//
//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         const allowedKeys = [
//             'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight',
//             'ArrowUp', 'ArrowDown', 'Home', 'End'
//         ];
//         if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key) && e.key !== '.' && !e.ctrlKey && !e.metaKey) {
//             e.preventDefault();
//         }
//     };
//
//     useEffect(() => {
//         setVisibleError(false);
//         const t = setTimeout(() => setVisibleError(true), 30);
//         return () => clearTimeout(t);
//     }, [submitCount]);
//
//     useEffect(() => {
//         type WatchSubscription = { unsubscribe?: () => void } | (() => void);
//
//         const subscription = watch((value, { name }) => {
//             if (name === inputName && !value[inputName]) {
//                 setInternalValue('');
//             }
//         }) as WatchSubscription;
//
//         return () => {
//             if (typeof subscription === 'function') {
//                 subscription();
//             } else {
//                 subscription.unsubscribe?.();
//             }
//         };
//     }, [inputName, watch]);
//
//     useEffect(() => {
//         setValue(inputName, defaultValue ?? '');
//         if (defaultValue) setInternalValue(defaultValue);
//     }, [inputName, defaultValue, setValue]);
//
//     useEffect(() => {
//         if (propValue !== undefined) setInternalValue(propValue);
//     }, [propValue]);
//
//     // Типизируем результат register, чтобы не использовать any
//     const registration = register(inputName, { required }) as UseFormRegisterReturn;
//     const { ref: rhfRef, ...regProps } = registration;
//
//     // Объединяем рефы без any
//     const setRefs = (el: HTMLInputElement | null) => {
//         inputRef.current = el;
//
//         if (typeof rhfRef === 'function') {
//             rhfRef(el);
//         } else if (rhfRef && 'current' in rhfRef) {
//             (rhfRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
//         }
//
//         if (typeof forwardedRef === 'function') {
//             (forwardedRef as (instance: HTMLInputElement | null) => void)(el);
//         } else if (forwardedRef && 'current' in forwardedRef) {
//             (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
//         }
//     };
//
//     const inputClassName = [
//         'field__input',
//         className ?? '',
//         'dark:text-[#adadad]',
//         fail ? 'error !text-[red]' : '',
//         isActive ? '!bg-[#20272A] border-[#353535]' : '!bg-[#101010]',
//         'focus:!bg-[#20272A] active:bg-[#20272A]'
//     ].filter(Boolean).join(' ');
//
//     return (
//         <div className={`relative w-full md:w-[314px] z-[2] max-h-[51px] ${disable ? 'active:scale-[0.95]' : ''} ${visibleError && (errors[inputName] || fail) && isSubmitted ? 'bounce' : ''} !transition-all !duration-300`}>
//             <label htmlFor={inputName}  className={`field ${disable ? 'pointer-events-none' : ''} ${visibleError && (errors[inputName] || fail) && isSubmitted ? 'bounce' : ''}`}>
//                 <input
//                     id={inputName}
//                     {...regProps}
//                     ref={setRefs}
//                     type="text"
//                     className={inputClassName}
//                     placeholder="дд.мм.гггг"
//                     autoComplete="bday"
//                     value={currentValue}
//                     onChange={handleChange}
//                     onKeyDown={handleKeyDown}
//                     onFocus={onFocus}
//                     aria-label={title}
//                 />
//                 <span className={`${styles.titleTop} !text-[18px] font-[Rubik] field__title ${errors[inputName] ? '!text-[#FF3030]' : ''} ${classNameTitle || ''}`}>
//                   {title}
//                 </span>
//                 <span className={`${styles.titleBottom} font-[Rubik] field__title-top ${classNameTitle || ''}`}>
//                   {title}
//                 </span>
//             </label>
//         </div>
//     );
// });
//
// DateInput.displayName = 'DateInput';
//
// export default DateInput;

import React, { useEffect, useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import type { UseFormRegisterReturn } from 'react-hook-form';
import styles from '@/app/page.module.scss';
import { DatePicker } from '@/components/DatePicker/DatePicker';
import HeaderStyles from "@/components/header/Header.module.css";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";

interface DateInputProps {
    title: string;
    inputName: string;
    required?: boolean;
    disable?: boolean;
    fail?: boolean;
    className?: string;
    classNameTitle?: string;
    defaultValue?: string;
    onFocus?: () => void;
    value?: string;
    onChange?: (value: string) => void;
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(function DateInput(
    {
        title,
        disable,
        fail,
        inputName,
        required,
        className,
        classNameTitle,
        defaultValue,
        value: propValue,
        onChange,
        onFocus
    },
    forwardedRef
) {
    const { register, formState: { errors, isSubmitted, submitCount }, setValue, watch } = useFormContext();
    const [visibleError, setVisibleError] = useState(false);
    const [internalValue, setInternalValue] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [bounce, setBounce] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const currentValue = propValue !== undefined ? propValue : internalValue;
    const isActive = currentValue.trim().length > 0;

    const formatDate = (value: string) => {
        const cleaned = value.replace(/\D/g, '').substring(0, 8);
        let formatted = '';
        if (cleaned.length >= 1) formatted += cleaned.substring(0, 2);
        if (cleaned.length >= 3) formatted += '.' + cleaned.substring(2, 4);
        if (cleaned.length >= 5) formatted += '.' + cleaned.substring(4, 8);
        return formatted;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatDate(e.target.value);
        setInternalValue(formattedValue);
        setValue(inputName, formattedValue);
        onChange?.(formattedValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = [
            'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight',
            'ArrowUp', 'ArrowDown', 'Home', 'End'
        ];
        if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key) && e.key !== '.' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
        }
    };

    const togglePicker = () => {
        setShowDatePicker(prev => {
            const newState = !prev;
            if (newState) {
                setTimeout(() => inputRef.current?.focus(), 0);
            }
            return newState;
        });
    };

    const handleDateSelect = (date: string) => {
        setInternalValue(date);
        setTimeout(() => {
            setValue(inputName, date);
            onChange?.(date);
        }, 0);
        setShowDatePicker(false);
    };

    useEffect(() => {
        setVisibleError(false);
        const t = setTimeout(() => setVisibleError(true), 30);
        return () => clearTimeout(t);
    }, [submitCount]);

    useEffect(() => {
        if (isSubmitted && errors[inputName]) {
            setBounce(true);
            const t = setTimeout(() => setBounce(false), 500);
            return () => clearTimeout(t);
        }
    }, [submitCount, errors, inputName, isSubmitted]);

    useEffect(() => {
        type WatchSubscription = { unsubscribe?: () => void } | (() => void);

        const subscription = watch((value, { name }) => {
            if (name === inputName && !value[inputName]) {
                setInternalValue('');
            }
        }) as WatchSubscription;

        return () => {
            if (typeof subscription === 'function') {
                subscription();
            } else {
                subscription.unsubscribe?.();
            }
        };
    }, [inputName, watch]);

    useEffect(() => {
        setValue(inputName, defaultValue ?? '');
        if (defaultValue) setInternalValue(defaultValue);
    }, [inputName, defaultValue, setValue]);

    useEffect(() => {
        if (propValue !== undefined) setInternalValue(propValue);
    }, [propValue]);

    // Хук для удержания фокуса на инпуте
    useEffect(() => {
        const keepFocus = (e: MouseEvent) => {
            if (showDatePicker && inputRef.current) {
                const target = e.target as HTMLElement;
                if (target !== inputRef.current) {
                    e.preventDefault();
                    inputRef.current.focus();
                }
            }
        };

        document.addEventListener("mousedown", keepFocus, true);
        return () => document.removeEventListener("mousedown", keepFocus, true);
    }, [showDatePicker]);

    const registration = register(inputName, { required }) as UseFormRegisterReturn;
    const { ref: rhfRef, ...regProps } = registration;

    const setRefs = (el: HTMLInputElement | null) => {
        inputRef.current = el;

        if (typeof rhfRef === 'function') {
            rhfRef(el);
        } else if (rhfRef && 'current' in rhfRef) {
            (rhfRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
        }

        if (typeof forwardedRef === 'function') {
            (forwardedRef as (instance: HTMLInputElement | null) => void)(el);
        } else if (forwardedRef && 'current' in forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
        }
    };

    const inputClassName = [
        'field__input',
        className ?? '',
        'dark:text-[#adadad]',
        fail ? 'error !text-[red]' : '',
        isActive ? '!bg-[#20272A] border-[#353535]' : '!bg-[#101010]',
        'focus:!bg-[#20272A] active:bg-[#20272A]'
    ].filter(Boolean).join(' ');

    return (
        <div className="relative flex items-center justify-between mb-[41px]">
            <div className={`relative w-full z-[2] max-h-[51px]
            ${disable ? 'active:scale-[0.95]' : ''} ${visibleError && (errors[inputName] || fail) && isSubmitted ? 'bounce' : ''} !transition-all !duration-300`}
            >
                <label htmlFor={inputName} className={`flex items-center justify-between field ${disable ? 'pointer-events-none' : ''} ${visibleError && (errors[inputName] || fail) && isSubmitted ? 'bounce' : ''}`}>
                    <div
                        className={`${HeaderStyles['input-hover-effect']} border border-[#353535] focus-within:border-[#737373] rounded-[4px]`}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}

                    >
                        <input
                            id={inputName}
                            {...regProps}
                            ref={setRefs}
                            type="text"
                            className={inputClassName}
                            placeholder="дд.мм.гггг"
                            autoComplete="bday"
                            value={currentValue}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            onFocus={onFocus}
                            aria-label={title}
                        />
                        <span
                            className={`${styles.titleTop} !text-[16px] font-[Roboto] field__title mt-[-2px] ${errors[inputName] ? '!text-[#FF3030]' : ''} ${classNameTitle || ''}`}>
                        {title}
                    </span>
                        <span className={`${styles.titleBottom} font-[Rubik] field__title-top mt-[-2px] ${classNameTitle || ''}`}>
                        {title}
                    </span>
                    </div>

                    {/* Calendar Button */}
                    <button
                        type="button"
                        onClick={togglePicker}
                        className={`active:scale-[.95] ${bounce ? 'bounce' : ''} ${showDatePicker ? 'border-[#737373] !bg-[#20272a]' : ''} flex items-center justify-center w-[51px] h-[51px] z-10 cursor-pointer border border-[#353535] rounded-[4px] bg-[#101010] hover:bg-[#20272A] hover:border-[#737373] transition-colors duration-300`}
                    >
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.8333 1.61551H16.3333V0.807814C16.3333 0.593601 16.2455 0.388161 16.0893 0.23669C15.933 0.0852179 15.721 0.00012207 15.5 0.00012207C15.279 0.00012207 15.067 0.0852179 14.9107 0.23669C14.7545 0.388161 14.6667 0.593601 14.6667 0.807814V1.61551H6.33333V0.807814C6.33333 0.593601 6.24554 0.388161 6.08926 0.23669C5.93298 0.0852179 5.72101 0.00012207 5.5 0.00012207C5.27899 0.00012207 5.06702 0.0852179 4.91074 0.23669C4.75446 0.388161 4.66667 0.593601 4.66667 0.807814V1.61551H2.16667C1.72464 1.61551 1.30072 1.7857 0.988155 2.08864C0.675595 2.39159 0.5 2.80246 0.5 3.23089V19.3847C0.5 19.8132 0.675595 20.224 0.988155 20.527C1.30072 20.8299 1.72464 21.0001 2.16667 21.0001H18.8333C19.2754 21.0001 19.6993 20.8299 20.0118 20.527C20.3244 20.224 20.5 19.8132 20.5 19.3847V3.23089C20.5 2.80246 20.3244 2.39159 20.0118 2.08864C19.6993 1.7857 19.2754 1.61551 18.8333 1.61551ZM4.66667 3.23089V4.03858C4.66667 4.2528 4.75446 4.45824 4.91074 4.60971C5.06702 4.76118 5.27899 4.84628 5.5 4.84628C5.72101 4.84628 5.93298 4.76118 6.08926 4.60971C6.24554 4.45824 6.33333 4.2528 6.33333 4.03858V3.23089H14.6667V4.03858C14.6667 4.2528 14.7545 4.45824 14.9107 4.60971C15.067 4.76118 15.279 4.84628 15.5 4.84628C15.721 4.84628 15.933 4.76118 16.0893 4.60971C16.2455 4.45824 16.3333 4.2528 16.3333 4.03858V3.23089H18.8333V6.46166H2.16667V3.23089H4.66667ZM18.8333 19.3847H2.16667V8.07705H18.8333V19.3847Z"
                                fill="#878787"/>
                        </svg>
                    </button>
                </label>

            </div>

            {/* DatePicker */}
            <DatePicker
                isVisible={showDatePicker}
                onDateSelect={handleDateSelect}
                onClose={() => setShowDatePicker(false)}
                initialDate={currentValue || ""}
            />
        </div>
    );
});

DateInput.displayName = 'DateInput';

export default DateInput;