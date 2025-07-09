'use client'
// app/(auth)/forgot-password/page.tsx
import { useForm, FormProvider } from "react-hook-form";
import CustomButton from "@/components/CustomButton/CustomButtom";
import AppInput from "@/components/forms/elements/AppInput";
import styles from "@/app/page.module.scss";
import React, {useEffect} from "react";
import {emailRegex} from "@/components/Form/validation";
import Image from "next/image";


export default function ForgotPasswordPage() {
    const methods = useForm();

    const { register } = methods;

    useEffect(() => {
        // Регистрируем email с кастомной валидацией
        register("email", {
            required: "Введите email",
            pattern: {
                value: emailRegex,
                message: "Неверный формат email",
            },
        });
    }, [register]);

    const IconLogin = (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9.5V7.5H0V9.5H3ZM8.96767 1.5L7.52908 2.93076L12.1092 7.48713H6V9.51185H12.1092L7.52908 14.0682L8.96767 15.5L16 8.5L15.2822 7.78462L14.5634 7.06823L8.96767 1.5Z" fill="#ADADAD"/>
        </svg>
    )
    return (
        <div  className={`flex gap-[30px] items-start justify-between`}>
            <div >
                <FormProvider {...methods}>
                    <form className="space-y-4">
                        <AppInput
                            className={`${styles.bounceElem} md:w-[375px] mb-[34px]`}
                            type={"email"}
                            title={"Email"}
                            inputName="Email"
                            required={true}
                        />
                        <CustomButton
                            label='Восстановить'
                            iconLeft={IconLogin}
                            iconRight={IconLogin}
                            className={`!ml-0 mt-[30px]`}
                        />
                    </form>
                </FormProvider>
            </div>

            <div>
                <Image
                    className={`rounded-[4px] border border-[#353535]`}
                    src='/auth/02.png' alt='02' width={375} height={509}/>
            </div>
        </div>
    );
}
