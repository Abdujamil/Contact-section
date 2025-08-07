import React, {useEffect, useState, useRef} from 'react';
import {useFormContext} from "react-hook-form";
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

const DateInput: React.FC<DateInputProps> = ({
                                                 title,
                                                 disable,
                                                 fail,
                                                 inputName,
                                                 required,
                                                 className,
                                                 classNameTitle,
                                                 defaultValue,
                                                 value: propValue,
                                                 onChange
                                             }) => {
    const {register, formState: {errors, isSubmitted, submitCount}, setValue, watch} = useFormContext();
    const [visibleError, setVisibleError] = useState(false);
    const [internalValue, setInternalValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const currentValue = propValue !== undefined ? propValue : internalValue;
    const isActive = currentValue.trim().length > 0;

    const formatDate = (value: string) => {
        let cleaned = value.replace(/\D/g, '');
        cleaned = cleaned.substring(0, 8);

        let formatted = '';
        if (cleaned.length >= 1) {
            formatted += cleaned.substring(0, 2);
        }
        if (cleaned.length >= 3) {
            formatted += '.' + cleaned.substring(2, 4);
        }
        if (cleaned.length >= 5) {
            formatted += '.' + cleaned.substring(4, 8);
        }

        return formatted;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatDate(e.target.value);
        setInternalValue(formattedValue);
        setValue(inputName, formattedValue);
        if (onChange) {
            onChange(formattedValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = [
            'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight',
            'ArrowUp', 'ArrowDown', 'Home', 'End'
        ];

        if (!allowedKeys.includes(e.key) &&
            !/^\d$/.test(e.key) &&
            e.key !== '.' &&
            !e.ctrlKey &&
            !e.metaKey) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        setVisibleError(false);
        setTimeout(() => setVisibleError(true), 30);
    }, [submitCount]);

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === inputName && !value[inputName]) {
                setInternalValue('');
            }
        });
        return () => subscription.unsubscribe();
    }, [inputName, watch]);

    useEffect(() => {
        const initialDate = defaultValue || new Date().toLocaleDateString('ru-RU');
        setValue(inputName, initialDate);
        setInternalValue(initialDate);
    }, [inputName, defaultValue, setValue]);

    useEffect(() => {
        if (propValue !== undefined) {
            setInternalValue(propValue);
        }
    }, [propValue]);

    return (
        <div
            className={`relative w-full z-[2] max-h-[51px] ${disable && 'active:scale-[0.95]'} ${visibleError && (errors[inputName] || fail) && isSubmitted && 'bounce'} !transition-all !duration-300`}>
            <label
                htmlFor={inputName}
                className={`field ${disable && 'pointer-events-none'} ${visibleError && (errors[inputName] || fail) && isSubmitted && 'bounce'}`}>
                <input
                    id={inputName}
                    {...register(inputName, {required})}
                    ref={(el) => {
                        inputRef.current = el;
                        register(inputName, {required}).ref(el);
                    }}
                    type="text"
                    className={`field__input ${className} dark:text-[#adadad] ${fail && 'error !text-[red]'}
                    ${isActive ? '!bg-[#20272A] border-[#353535]' : '!bg-[#101010]'} focus:!bg-[#20272A] active:bg-[#20272A]'}`}
                    placeholder="дд.мм.гггг"
                    autoComplete="bday"
                    value={currentValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    aria-label={title}
                />
                <span
                    className={`${styles.titleTop} !text-[18px] font-[Rubik] field__title ${errors[inputName] && '!text-[#FF3030]'} ${classNameTitle}`}>
                    {title}
                </span>
                <span className={`${styles.titleBottom} font-[Rubik]  field__title-top ${classNameTitle}`}>
                    {title}
                </span>
            </label>
        </div>
    );
};

export default DateInput;