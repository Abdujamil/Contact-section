import React, { useEffect, useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import type { UseFormRegisterReturn } from 'react-hook-form';
import styles from '@/app/page.module.scss';

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

    useEffect(() => {
        setVisibleError(false);
        const t = setTimeout(() => setVisibleError(true), 30);
        return () => clearTimeout(t);
    }, [submitCount]);

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

    // Типизируем результат register, чтобы не использовать any
    const registration = register(inputName, { required }) as UseFormRegisterReturn;
    const { ref: rhfRef, ...regProps } = registration;

    // Объединяем рефы без any
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
        <div className={`relative w-full md:w-[314px] z-[2] max-h-[51px] ${disable ? 'active:scale-[0.95]' : ''} ${visibleError && (errors[inputName] || fail) && isSubmitted ? 'bounce' : ''} !transition-all !duration-300`}>
            <label htmlFor={inputName}  className={`field ${disable ? 'pointer-events-none' : ''} ${visibleError && (errors[inputName] || fail) && isSubmitted ? 'bounce' : ''}`}>
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
                <span className={`${styles.titleTop} !text-[18px] font-[Rubik] field__title ${errors[inputName] ? '!text-[#FF3030]' : ''} ${classNameTitle || ''}`}>
          {title}
        </span>
                <span className={`${styles.titleBottom} font-[Rubik] field__title-top ${classNameTitle || ''}`}>
          {title}
        </span>
            </label>
        </div>
    );
});

DateInput.displayName = 'DateInput';

export default DateInput;
