'use client'
// app/(auth)/forgot-password/page.tsx
import {useForm, FormProvider, SubmitHandler} from "react-hook-form";
import AppInput from "@/components/forms/elements/AppInput";
import styles from "@/app/page.module.scss";
import React, {useEffect, useState} from "react";
import {emailRegex} from "@/components/Form/validation";
import Image from "next/image";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";
import HeaderStyles from "@/components/header/Header.module.css";
import {motion} from "framer-motion";
import Link from "next/link";
import FlightSuccess from "@/components/Form/FlightSuccess";

type ForgotPasswordFormValues = {
    email: string;
};

export default function ForgotPasswordPage() {
    const methods = useForm<ForgotPasswordFormValues>();
    const {register, handleSubmit} = methods;

    const [showPolicy, setShowPolicy] = useState(false);
    const [submitted, setSubmitted] = useState(false);

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

    const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
        setShowPolicy(true); // показываем политику

        try {
            // const res = await fetch('/api/forgot-password', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data),
            // });
            //
            // const result = await res.json();
            //
            // if (!res.ok) {
            //     alert(result.error || 'Ошибка восстановления пароля');
            //     return;
            // }

            console.log("Forgot password submitted:", data);
            setSubmitted(true); // Показываем сообщение
        } catch (error) {
            console.error(error);
            alert('Ошибка сервера');
        }
    };

    const handleFormInteraction = () => {
        if (!showPolicy) setShowPolicy(true);
    };


    return (
        <div className={`relative`}>

            {!submitted ? (
                <>
                    <div className={`flex gap-[30px] items-start justify-between md:h-[467px]`}>
                        <div>
                            <FormProvider {...methods}>

                                <form onSubmit={handleSubmit(onSubmit)} onClick={handleFormInteraction}
                                      className="space-y-4">
                                    <AppInput
                                        className={`${styles.bounceElem} md:w-[375px] mb-[30px]`}
                                        type={"email"}
                                        title={"E-mail"}
                                        inputName="email"
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

                        <div className={`h-full`}>
                            <Image
                                className={` h-full rounded-[4px] border border-[#353535]`}
                                src='/auth/03.png' alt='02' width={375} height={509}/>
                        </div>
                    </div>

                    {/* Анимированный блок с политикой */}
                    <motion.div
                        className={`w-full absolute bottom-[-15%] left-1/2 transform -translate-x-1/2`}
                        initial={{y: 20, opacity: 0}}
                        animate={
                            showPolicy ? {y: 10, opacity: 1} : {y: -4, opacity: 0}
                        }
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 4, // Меньше значение = больше отскок
                            mass: 0.3, // Добавляем массу для более "пружинистого" эффекта
                        }}
                    >
                        <p
                            className={`font-[Rubik] hidden md:block text-center text-[#adadad] text-[16px]`}
                        >
                            Нажимая на кнопку «Отправить» вы соглашаетесь с
                            <Link
                                href="/politic"
                                className={`!text-[#adadad] hover:!text-[#3D9ED6] ${styles["menu-item"]} !text-[16px] font-[300] ml-[4px]`}
                            >
                                политикой конфиденциальности
                            </Link>
                        </p>
                    </motion.div>
                </>

            ) : (
                <FlightSuccess
                    close={() => setSubmitted(false)}
                    isContactPage={false}
                    isRegisterPage={false}
                    small
                    text="Временный пароль отправлен."
                    subText="Рекомендуем после авторизации заменить пароль."
                />
            )}


        </div>
    );
}
