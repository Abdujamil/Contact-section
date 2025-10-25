'use client';
import React, {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import AppInput from '@/components/forms/elements/AppInput';
import styles from "@/app/page.module.scss";


export default function PasswordInputWithStrength({className}: { className?: string }) {
    const {watch} = useFormContext();
    const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('');
    const [showTooltip, setShowTooltip] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    // const showPassword = false;

    const isTooltipVisible = showTooltip && isInputFocused;
    const password = watch('Password');

    useEffect(() => {
        if (!password) {
            setPasswordStrength('');
            return;
        }

        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecial = /[^a-zA-Z0-9]/.test(password);
        const length = password.length;

        if (length > 7 && hasLetters && hasNumbers && hasSpecial) {
            setPasswordStrength('strong');
        } else if (length >= 6 && ((hasLetters && hasNumbers) || (hasLetters && hasSpecial))) {
            setPasswordStrength('medium');
        } else {
            setPasswordStrength('weak');
        }
    }, [password]);

    // Функция для получения текста подсказки
    const getTooltipText = (strength: 'weak' | 'medium' | 'strong') => {
        switch (strength) {
            case 'weak':
                return 'Рекомендуется добавить заглавные буквы, цифры и специальные символы';
            case 'medium':
                return 'Для повышения защиты добавьте символы, знаки или цифры';
            case 'strong':
                return 'Пароль соответствует требованиям безопасности';
            default:
                return '';
        }
    };
    return (
        <div className="relative">

            <div className={`relative flex justify-between w-full ${className}  mt-[33px]`}>
                <AppInput
                    className={`w-[290px] md:w-[313px]`}
                    type={'password'}
                    title="Пароль"
                    inputName="Password"
                    required
                    // showPasswordExternally={showPassword}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => {
                        setIsInputFocused(false);
                        setShowTooltip(false);
                    }}
                />
            </div>

            {isInputFocused && passwordStrength !== '' && (
                <div className="mt-2.5 flex leading-[138%] justify-start gap-2 items-center absolute bottom-[-29px]">
                <span className="font-[Roboto] text-[16px] text-[#adadad] font-[200]  leading-[80%]">
                    Сложность пароля:
                </span>
                    <div className="relative">
                      <span
                          className={`font-[Roboto] font-[200] text-[16px] leading-[80%] 
                          ${
                              passwordStrength === 'weak'
                                  ? 'text-[#FF3030]'
                                  : passwordStrength === 'medium'
                                      ? 'text-[#FFAA00]'
                                      : 'text-[#00C853]'
                          }`}
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                      >
                        {passwordStrength === 'weak'
                            ? 'Слабый'
                            : passwordStrength === 'medium'
                                ? 'Средний'
                                : 'Сильный'}
                      </span>

                        {isTooltipVisible && (
                            <div
                                className={`${styles.selectOption} absolute top-[25px] z-[99999] left-[60px]`}
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                <div className="border border-[#353535] rounded-sm p-[15px] shadow-lg min-w-[245px]">
                                    <p className="text-left text-[#adadad] text-[14px] font-[300] font-[Roboto] leading-[18px]">
                                        {getTooltipText(passwordStrength)}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}