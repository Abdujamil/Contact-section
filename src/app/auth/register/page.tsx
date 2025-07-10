'use client'
// app/(auth)/register/page.tsx

import {useForm, FormProvider} from "react-hook-form";
import React, {useEffect} from "react";
import {emailRegex} from "@/components/Form/validation";
import AppInput from "@/components/forms/elements/AppInput";
import styles from "@/app/page.module.scss";
import Image from "next/image";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";
import HeaderStyles from "@/components/header/Header.module.css";
import PasswordInputWithStrength from "@/app/auth/register/PasswordInputWithStrength";
import UsernameInputWithValidation from "@/app/auth/register/UsernameInputWithValidation";

export default function RegisterPage() {
    const methods = useForm();
    const {register} = methods;

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

    return (
        <div
            className={`flex gap-[30px] items-start justify-between`}>
            <div>
                <FormProvider {...methods}>
                    <form className="space-y-4">
                        <AppInput
                            className={`${styles.bounceElem} md:w-[375px] mb-[34px]`}
                            type={"email"}
                            title={"E-mail"}
                            inputName="email"
                            required={true}
                        />

                        <PasswordInputWithStrength className={`${styles.bounceElem} md:w-[375px]`} />
                        <UsernameInputWithValidation className={`${styles.bounceElem} md:w-[375px]`} />

                        <AppInput
                            className={`${styles.bounceElem} md:w-[375px] my-[34px]`}
                            title={"Ваш никнейм"}
                            inputName="Nickname"
                            required={true}
                        />

                        <AppInput
                            className={`${styles.bounceElem} md:w-[375px] mb-[34px]`}
                            type={"date"}
                            title={"дд.мм.гг"}
                            inputName="date"
                            required={true}
                        />

                        <div className="relative !w-[220px] md:m-0 m-auto !overflow-hidden">
                            <button
                                type="submit"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className={`${styles.btn} ${styles["send-button"]} ${HeaderStyles["login-button"]} !border-[#353535] bg-[rgb(42_42_42/0.1)] group !w-[220px] !h-[51px] flex items-center !justify-center`}
                                data-text=""
                            >
                                                  <span
                                                      className="!transition-all !duration-[.13s] !ease-in font-normal text-[#adadad] md:text-[20px] text-[18px] leading-[120%]">
                                                    Отправить
                                                  </span>
                                <svg
                                    className={`${styles.sendIconRight} transition-all !duration-[.13s] ease-in`}
                                    width="16" height="17" viewBox="0 0 16 17" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3 9.5V7.5H0V9.5H3ZM8.96767 1.5L7.52908 2.93076L12.1092 7.48713H6V9.51185H12.1092L7.52908 14.0682L8.96767 15.5L16 8.5L15.2822 7.78462L14.5634 7.06823L8.96767 1.5Z"
                                        fill="#ADADAD"/>
                                </svg>

                            </button>
                            <div className={styles.highlight}/>
                        </div>
                    </form>
                </FormProvider>
            </div>
            <div>
                <Image
                    className={`rounded-[4px] border border-[#353535]`}
                    src='/auth/03.png' alt='03' width={375} height={509}/>
            </div>
        </div>
    );
}
