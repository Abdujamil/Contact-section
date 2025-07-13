// 'use client';
// import React, {useEffect, useState} from 'react';
// import {useFormContext} from 'react-hook-form';
// import Link from 'next/link';
// import AppInput from '@/components/forms/elements/AppInput';
// import styles from "@/app/page.module.scss";
//
// export default function PasswordInputWithStrength({className}: { className?: string }) {
//     const {watch} = useFormContext();
//     const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('');
//     const password = watch('Password');
//
//     useEffect(() => {
//         if (!password) {
//             setPasswordStrength('');
//             return;
//         }
//
//         const hasLetters = /[a-zA-Z]/.test(password);
//         const hasNumbers = /\d/.test(password);
//         const hasSpecial = /[^a-zA-Z0-9]/.test(password);
//         const length = password.length;
//
//         if (length > 7 && hasLetters && hasNumbers && hasSpecial) {
//             setPasswordStrength('strong');
//         } else if (length >= 6 && ((hasLetters && hasNumbers) || (hasLetters && hasSpecial))) {
//             setPasswordStrength('medium');
//         } else {
//             setPasswordStrength('weak');
//         }
//     }, [password]);
//
//     return (
//         <div className="relative md:h-[72px]">
//             <AppInput
//                 className={className}
//                 type="password"
//                 title="Пароль"
//                 inputName="Password"
//                 required
//             />
//
//             {passwordStrength === '' ? (
//                 <Link
//                     className={`${styles['menu-item']} relative left-[63%] right-auto md:mr-4 block font-[Rubik] !items-end !text-[16px] text-[#adadad] !text-end mt-2.5 leading-[80%]`}
//                     href="/auth/forgot-password">Забыли пароль?</Link>
//             ) : (
//                 <div className="mt-2.5 flex justify-start gap-2 items-center">
//                     <span className="font-[Rubik] text-[16px] text-[#CCCCCC] leading-[80%]">Сложность пароля:</span>
//                     <span
//                         className={`font-[Rubik] text-[16px] leading-[80%] ${
//                             passwordStrength === 'weak'
//                                 ? 'text-[#FF3030]'
//                                 : passwordStrength === 'medium'
//                                     ? 'text-[#FFAA00]'
//                                     : 'text-[#00C853]'
//                         }`}
//                     >
//             {passwordStrength === 'weak'
//                 ? 'Слабый'
//                 : passwordStrength === 'medium'
//                     ? 'Средний'
//                     : 'Сильный'}
//           </span>
//                 </div>
//             )}
//         </div>
//     );
// }


'use client';
import React, {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import Link from 'next/link';
import AppInput from '@/components/forms/elements/AppInput';
import styles from "@/app/page.module.scss";

export default function PasswordInputWithStrength({className}: { className?: string }) {
    const {watch} = useFormContext();
    const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('');
    const [showTooltip, setShowTooltip] = useState(false);
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
        <div className="relative md:h-[72px]">
            <AppInput
                className={className}
                type="password"
                title="Пароль"
                inputName="Password"
                required
            />

            {passwordStrength === '' ? (
             <div></div>
            ) : (
                <div className="mt-2.5 flex justify-start gap-2 items-center relative">
                    <span className="font-[Rubik] text-[16px] text-[#CCCCCC] leading-[80%]">Сложность пароля:</span>
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

                        {showTooltip && (
                            <div
                                className="absolute top-[30px] left-[140px] transform -translate-x-1/2 z-10 backdrop-blur-sm"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                <div
                                    className="border border-[#353535] rounded-sm p-[15px] shadow-lg min-w-[245px]"
                                    style={{
                                        background: 'rgba(53, 53, 53, 0.1)',
                                        boxShadow:
                                            '0px 0px 10px rgba(0, 0, 0, 0.6), inset 0px 0px 6px rgba(255, 255, 255, 0.1)',
                                    }}
                                >
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