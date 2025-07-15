'use client';
import React, {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import AppInput from '@/components/forms/elements/AppInput';

const takenUsernames = ['admin', 'user123', 'test']; // эмитация БД

export default function UsernameInputWithValidation({className}: { className?: string }) {
    const {watch, setError, clearErrors} = useFormContext();
    const username = watch('Имя пользователя');
    const [isTaken, setIsTaken] = useState(false);

    useEffect(() => {
        if (!username) {
            setIsTaken(false);
            clearErrors('Имя пользователя');
            return;
        }

        const check = takenUsernames.includes(username.trim().toLowerCase());
        setIsTaken(check);

        if (check) {
            setError('Имя пользователя', {
                type: 'manual',
                message: 'Имя пользователя занято',
            });
        } else {
            clearErrors('Имя пользователя');
        }
    }, [username, setError, clearErrors]);

    return (
        <div className="relative">
            <AppInput
                className={className}
                title="Имя пользователя"
                inputName="Имя пользователя"
                required
            />
            {isTaken && (
                <p className="absolute text-[#FF3030] text-sm mt-1 font-[Rubik]">
                    *Имя пользователя занято
                </p>
            )}
        </div>
    );
}
