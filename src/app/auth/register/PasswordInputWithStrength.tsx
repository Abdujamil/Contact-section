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
    const [showPassword, setShowPassword] = useState(false);

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

            <div className={`relative flex justify-between w-full ${className}  mb-[43px]`}>
                <AppInput
                    className={`md:w-[314px]`}
                    type={'password'}
                    title="Пароль"
                    inputName="Password"
                    required
                    showPasswordExternally={showPassword}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => {
                        setIsInputFocused(false);
                        setShowTooltip(false);
                    }}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="max-h-[51px] z-10 cursor-pointer border border-[#353535] rounded-[4px] p-[15px] bg-[#101010] hover:bg-[#20272A] transition-colors duration-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                >
                    {showPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.21973 2.21983C2.09271 2.34682 2.01549 2.51517 2.00209 2.69428C1.98869 2.87339 2.04002 3.05136 2.14673 3.19583L2.21973 3.27983L6.25373 7.31483C4.28767 8.69435 2.88378 10.7354 2.29873 13.0648C2.25371 13.2566 2.28597 13.4584 2.38854 13.6267C2.4911 13.7949 2.65574 13.916 2.84687 13.9638C3.038 14.0116 3.24026 13.9823 3.40995 13.8822C3.57965 13.7821 3.70313 13.6192 3.75373 13.4288C4.27354 11.3612 5.55133 9.56449 7.33373 8.39483L9.14373 10.2048C8.42073 10.9603 8.02232 11.9689 8.03386 13.0146C8.04539 14.0602 8.46594 15.0598 9.20544 15.7991C9.94493 16.5385 10.9446 16.9589 11.9902 16.9702C13.0359 16.9816 14.0444 16.583 14.7997 15.8598L20.7187 21.7798C20.8526 21.914 21.0322 21.9926 21.2216 21.9997C21.411 22.0068 21.596 21.942 21.7396 21.8182C21.8831 21.6945 21.9744 21.5209 21.9953 21.3326C22.0161 21.1442 21.9648 20.9549 21.8517 20.8028L21.7787 20.7188L15.6657 14.6048L15.6667 14.6028L8.71673 7.65683L8.71873 7.65483L7.58573 6.52483L3.27973 2.21983C3.13911 2.07938 2.94848 2.00049 2.74973 2.00049C2.55098 2.00049 2.36036 2.07938 2.21973 2.21983ZM11.9997 5.49983C10.9997 5.49983 10.0297 5.64783 9.11073 5.92483L10.3477 7.16083C12.4873 6.73719 14.7078 7.15191 16.5502 8.31926C18.3926 9.4866 19.716 11.3173 20.2467 13.4328C20.2985 13.6218 20.4222 13.7829 20.5913 13.8818C20.7604 13.9808 20.9615 14.0096 21.1516 13.9622C21.3417 13.9148 21.5056 13.7948 21.6084 13.6281C21.7113 13.4613 21.7447 13.261 21.7017 13.0698C21.1599 10.907 19.9109 8.98733 18.153 7.61577C16.3952 6.2442 14.2294 5.49944 11.9997 5.49983ZM12.1947 9.00983L15.9957 12.8098C15.9466 11.8177 15.5303 10.8793 14.8278 10.1771C14.1253 9.47476 13.1868 9.05874 12.1947 9.00983Z"
                                fill="#878787"/>
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.0007 9.005C13.0615 9.005 14.079 9.42643 14.8291 10.1766C15.5792 10.9267 16.0007 11.9441 16.0007 13.005C16.0007 14.0659 15.5792 15.0833 14.8291 15.8334C14.079 16.5836 13.0615 17.005 12.0007 17.005C10.9398 17.005 9.92239 16.5836 9.17225 15.8334C8.4221 15.0833 8.00067 14.0659 8.00067 13.005C8.00067 11.9441 8.4221 10.9267 9.17225 10.1766C9.92239 9.42643 10.9398 9.005 12.0007 9.005ZM12.0007 5.5C16.6137 5.5 20.5967 8.65 21.7017 13.064C21.7501 13.2569 21.7198 13.4612 21.6176 13.6319C21.5154 13.8025 21.3496 13.9256 21.1567 13.974C20.9637 14.0224 20.7595 13.9922 20.5888 13.89C20.4181 13.7878 20.2951 13.6219 20.2467 13.429C19.7837 11.5925 18.7208 9.96306 17.2267 8.79913C15.7326 7.6352 13.8926 7.00338 11.9986 7.00384C10.1046 7.0043 8.26499 7.63702 6.7714 8.80167C5.27782 9.96632 4.21578 11.5962 3.75367 13.433C3.72984 13.5286 3.68741 13.6186 3.6288 13.6978C3.5702 13.777 3.49656 13.8439 3.41211 13.8946C3.32765 13.9454 3.23403 13.979 3.13658 13.9935C3.03914 14.0081 2.93978 14.0033 2.84417 13.9795C2.74857 13.9557 2.6586 13.9132 2.5794 13.8546C2.50019 13.796 2.43331 13.7224 2.38256 13.6379C2.33181 13.5535 2.2982 13.4599 2.28363 13.3624C2.26907 13.265 2.27384 13.1656 2.29767 13.07C2.83952 10.907 4.08872 8.98722 5.84678 7.61563C7.60484 6.24405 9.77087 5.49939 12.0007 5.5Z"
                                fill="#878787"/>
                        </svg>
                    )}
                </button>
            </div>

            {isInputFocused && passwordStrength !== '' && (
                <div className="mt-2.5 flex justify-start gap-2 items-center absolute bottom-[-30px]">
                <span className="font-[Rubik] text-[16px] text-[#CCCCCC] leading-[80%]">
                Сложность пароля:
                </span>
                    <div className="relative">
      <span
          className={`font-[Rubik] text-[16px] leading-[80%] ${
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
                                    <p className="text-left text-[#CCCCCC] text-[14px] font-[Rubik] leading-[18px]">
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