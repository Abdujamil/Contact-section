import React, {useEffect, useState, forwardRef} from 'react';
import {useFormContext} from "react-hook-form";
import styles from '../../../app/page.module.scss';

interface AppInputProps {
    title: string;
    inputName: string;
    type?: string;
    required?: boolean;
    disable?: boolean;
    fail?: boolean;
    // message?: boolean;
    mask?: string;
    className?: string;
    classNameTitle?: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(({
                                                                  title,
                                                                  disable,
                                                                  fail,
                                                                  // message = true,
                                                                  inputName,
                                                                  type = 'text',
                                                                  required,
                                                                  mask,
                                                                  className,
                                                                  classNameTitle,
                                                                  value,
                                                                  onChange,
                                                                  onBlur
                                                              }, ref) => {
    const {register, formState: {errors, isSubmitted, submitCount}, setValue, watch} = useFormContext();
    const [visibleError, setVisibleError] = useState(false);

    const formatPhoneNumber = (value: string) => {
        let cleaned = value.replace(/\D/g, '');

        if (cleaned[0] === '8') {
            cleaned = '7' + cleaned.substring(1);
        } else if (cleaned.length > 0 && cleaned[0] !== '7') {
            cleaned = '7' + cleaned;
        }

        let formatted = cleaned.length > 0 ? '+7' : '';
        if (cleaned.length > 1) formatted += ` (${cleaned.substring(1, 4)}`;
        if (cleaned.length >= 5) formatted += `) ${cleaned.substring(4, 7)}`;
        if (cleaned.length >= 8) formatted += `-${cleaned.substring(7, 9)}`;
        if (cleaned.length >= 10) formatted += `-${cleaned.substring(9, 11)}`;

        return formatted;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (mask === 'phone') {
            value = formatPhoneNumber(value);
        }

        setValue(inputName, value);
        if (onChange) {
            onChange(value);
        }
    };

    useEffect(() => {
        setVisibleError(false);
        setTimeout(() => setVisibleError(true), 30);
    }, [submitCount]);

    useEffect(() => {
        setValue(inputName, '');
    }, [title, inputName, setValue]);

    return (
        <div className={`relative z-[0] ${disable && 'active:scale-[0.95]'} transition-all duration-300`}>
            <label
                className={`field ${disable && 'pointer-events-none'} ${visibleError && (errors[inputName] || fail) && isSubmitted && 'bounce'}`}>
                <input
                    {...register(inputName, {required})}
                    ref={ref}
                    type={type}
                    className={`field__input ${className} ${fail && 'error !text-[red]'}`}
                    placeholder={title}
                    autoComplete="off"
                    value={value || watch(inputName) || ''}
                    onChange={handleChange}
                    onBlur={(e) => {
                        if (onBlur) onBlur(e.target.value);
                        if (e.target.value) {
                            e.target.value = e.target.value.trimEnd() + ' ';
                            e.target.setSelectionRange(e.target.value.length, e.target.value.length);
                        }
                    }}
                />
                <span className={`${styles.titleTop} field__title ${errors[inputName] && '!text-[#FF3030]'} ${classNameTitle}`}>
                  {title}
                </span>
                <span className={`${styles.titleBottom} field__title-top ${classNameTitle}`}>
                  {title}
                </span>
            </label>
        </div>
    );
});
AppInput.displayName = 'AppInput';
export default AppInput;

