'use client'
// app/(auth)/login/page.tsx
import Image from "next/image";
import AppInput from "@/components/forms/elements/AppInput";
import { useForm, FormProvider } from "react-hook-form";
import Link from "next/link";
import styles from "@/app/page.module.scss";
import React, {useEffect} from "react";
import {emailRegex} from "@/components/Form/validation";
import CustomButton from "@/components/CustomButton/CustomButtom";

export default function LoginPage() {
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
        <div className={`flex gap-[30px] items-start justify-between`}>
           <div>
               <FormProvider {...methods}>
                <form className="space-y-4 w-full">
                    <AppInput
                        className={`${styles.bounceElem} md:w-[375px] mb-[34px]`}
                        type={"email"}
                        title={"Email"}
                        inputName="Email"
                        required={true}
                    />
                    <div className={`relative`}>
                        <AppInput
                            className={`${styles.bounceElem} md:w-[375px]`}
                            type={"password"}
                            title={"Password"}
                            inputName="Password"
                            required={true}
                        />
                        <Link className={`block font-[Rubik] text-[18px] text-[#adadad] text-end mt-2.5`} href="/auth/forgot-password">Забыли пароль?</Link>
                    </div>

                        <CustomButton
                            label='Отправить'
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
                    src='/auth/01.png' alt='01' width={375} height={509}/>
            </div>
        </div>
    );
}
