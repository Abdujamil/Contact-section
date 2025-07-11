'use client';
import React, {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import Link from 'next/link';
import AppInput from '@/components/forms/elements/AppInput';

export default function PasswordInputWithStrength({className}: { className?: string }) {
    const {watch} = useFormContext();
    const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('');
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

    return (
        <div className="relative">
            <AppInput
                className={className}
                type="password"
                title="Пароль"
                inputName="Password"
                required
            />

            {passwordStrength === '' ? (
                <Link
                    className="md:mr-4 block font-[Rubik] text-[18px] text-[#adadad] text-end mt-2.5 leading-[80%]"
                    href="/auth/forgot-password"
                >
                    Забыли пароль?
                </Link>
            ) : (
                <div className="mt-2.5 flex justify-start gap-2 items-center">
                    <span className="font-[Rubik] text-[16px] text-white">Сложность пароля:</span>
                    <span
                        className={`font-[Rubik] text-[16px] ${
                            passwordStrength === 'weak'
                                ? 'text-[#FF3030]'
                                : passwordStrength === 'medium'
                                    ? 'text-[#FFAA00]'
                                    : 'text-[#00C853]'
                        }`}
                    >
            {passwordStrength === 'weak'
                ? 'Слабый'
                : passwordStrength === 'medium'
                    ? 'Средний'
                    : 'Сильный'}
          </span>
                </div>
            )}
        </div>
    );
}
