'use client'
import {useForm, FormProvider, SubmitHandler} from "react-hook-form";
import AppInput from "@/components/forms/elements/AppInput";
import styles from "@/app/page.module.scss";
import React, {useEffect, useState} from "react";
import {emailRegex} from "@/components/Form/validation";
import Image from "next/image";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";
import HeaderStyles from "@/components/header/Header.module.css";
import {motion, useAnimation} from "framer-motion";
import Link from "next/link";
import FlightSuccess from "@/components/Form/FlightSuccess";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
import {bounceActiveBlock} from "@/components/Form/bounce";

type ForgotPasswordFormValues = {
    email: string;
};

export default function ForgotPasswordPage() {
    const methods = useForm<ForgotPasswordFormValues>({
        shouldFocusError: false
    });
    const {register, handleSubmit} = methods;
    const controls = useAnimation();

    const [showPolicy, setShowPolicy] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [emailStatus, setEmailStatus] = useState<"found" | "not_found" | null>(null);

// Замените это на реальную проверку (fetch или axios)
    const checkEmail = async (email: string) => {
        // Здесь вместо setTimeout будет реальный запрос
        return new Promise<"found" | "not_found">((resolve) => {
            setTimeout(() => {
                const knownEmails = ["test@example.com", "user@mail.ru"];
                resolve(knownEmails.includes(email.toLowerCase()) ? "found" : "not_found");
            }, 500);
        });
    };

    const handleEmailBlur = async (value: string) => {
        if (!emailRegex.test(value)) return;

        const result = await checkEmail(value.trim());
        setEmailStatus(result);
    };


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

    useEffect(() => {
        bounceActiveBlock('forgot-password', controls);
    }, [controls]);

    const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
        setShowPolicy(true); // показываем политику

        try {
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
        <>
            <Breadcrumbs forgotPasswordrUrl={true}/>
            <motion.div
                id="auth-forgot-password"
                initial={{y: 20, opacity: 1}}
                animate={controls}
                className={`${styles.BlogPageContent} w-full md:w-[860px] max-w-[860px] md:h-[561px] text-[18px] leading-relaxed whitespace-pre-line md:p-[40px]  p-5 border border-[#353535] rounded-[6px]`}
            >
                {!submitted ? (
                    <>
                        <div
                            className={`w-full h-full flex flex-wrap md:flex-nowrap gap-[30px] items-start justify-between`}>
                            <div
                                className={`w-full h-full flex flex-col items-center justify-between  md:max-w-[374px] ml-[0px]`}>
                                <FormProvider {...methods}>

                                    <form onSubmit={handleSubmit(onSubmit)} onClick={handleFormInteraction}
                                          className="w-full">
                                        <AppInput
                                            className={`${styles.bounceElem} mb-[53px] w-full md:w-[374px] mt-[20px] md:mt-0`}
                                            type={"email"}
                                            title={"E-mail"}
                                            inputName="email"
                                            required={true}
                                            onBlur={handleEmailBlur}
                                        />
                                        {emailStatus === "found" && (
                                            <p className="flex items-center gap-[7px] absolute left-[52px] text-[#34C759] mt-[-48px] mb-5 md:mb-0 text-[14px] font-[Rubik]">
                                                E-mail найден
                                                <svg width="16" height="13" viewBox="0 0 16 13" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                          d="M15.7516 0.178704C16.0539 0.441363 16.0845 0.897636 15.82 1.19782L5.63823 12.7534C5.50569 12.9038 5.31628 12.9929 5.11511 12.9996C4.91393 13.0063 4.71898 12.9298 4.57665 12.7885L0.213013 8.45514C-0.0710044 8.17309 -0.0710044 7.7158 0.213013 7.43376C0.497031 7.15171 0.957514 7.15171 1.24153 7.43376L5.05548 11.2212L14.7254 0.246645C14.9899 -0.0535365 15.4494 -0.0839547 15.7516 0.178704Z"
                                                          fill="#34C759"/>
                                                </svg>

                                            </p>
                                        )}
                                        {emailStatus === "not_found" && (
                                            <p className="absolute left-[52px] text-[#FF3030] mt-[-48px] mb-5 md:mb-0 text-[14px] font-[Rubik]">
                                                *Данный e-mail не зарегистрирован
                                            </p>
                                        )}

                                        <pre
                                            className={`absolute left-3 top-[-6%]  text-[#353535] right-0 text-center`}>
                                            Пример тестовых email-адресов: test@example.com, user@mail.ru.
                                        </pre>

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
                                                    className={`${styles.sendIconRight} mt-[1px] ml-[2px] transition-all !duration-[.13s] ease-in`}
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

                                <div className={`yandex-mb-texts flex flex-col mb-[2.5px] ml-0`}>
                                    <p className={`max-h-[30px] !leading-[120%] text-[#878787] text-[16px] font-[Rubik] flex items-start justify-start gap-5`}>
                                        <svg className={`min-w-[12px] mt-[4px]`} width="12" height="12" viewBox="0 0 12 12"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="6" cy="6" r="5.625" stroke="#3C404A" strokeWidth="0.75"/>
                                            <circle cx="6" cy="6" r="3" fill="#3C404A"/>
                                        </svg>

                                        Временный пароль будет отправлен <br/> на вашу почту.
                                    </p>

                                    <svg
                                        className={`mt-[23px] mb-[16px]`}
                                        width="370" height="1" viewBox="0 0 370 1" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <line y1="0.5" x2="370" y2="0.5" stroke="url(#paint0_linear_5340_3200)"/>
                                        <defs>
                                            <linearGradient id="paint0_linear_5340_3200" x1="0" y1="1.5" x2="370"
                                                            y2="1.5"
                                                            gradientUnits="userSpaceOnUse">
                                                <stop offset="0" stopColor="#9C9C9C"/>
                                                <stop offset="1" stopColor="#9C9C9C" stopOpacity="0"/>
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    <p className={`max-h-[30px] !leading-[120%] text-[#878787] text-[16px] font-[Rubik] flex items-start justify-start gap-5`}>
                                        <svg className={`min-w-[12px] mt-[4px]`} width="12" height="12" viewBox="0 0 12 12"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="6" cy="6" r="5.625" stroke="#3C404A" strokeWidth="0.75"/>
                                            <circle cx="6" cy="6" r="3" fill="#3C404A"/>
                                        </svg>

                                        После авторизации рекомендуем заменить пароль.
                                    </p>
                                </div>
                            </div>

                            <div className={`relative w-[374px] h-[479px]`}>
                                <Image
                                    className={`rounded-[4px]`}
                                    src='/auth/03.png' alt='03' fill/>
                            </div>
                        </div>

                        {/* Анимированный блок с политикой */}
                        <motion.div
                            className={`w-full absolute bottom-[-5%] left-1/2 transform -translate-x-1/2`}
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
                                Нажимая кнопку «Отправить» вы соглашаетесь с
                                <Link
                                    href="/politic/policy"
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
            </motion.div>
        </>
    );
}
