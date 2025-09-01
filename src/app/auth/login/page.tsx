'use client'
import Image from "next/image";
import AppInput from "@/components/forms/elements/AppInput";
import {useForm, FormProvider, SubmitHandler} from "react-hook-form";
import Link from "next/link";
import styles from "@/app/page.module.scss";
import React, {useEffect} from "react";
import {emailRegex} from "@/components/Form/validation";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";
import HeaderStyles from "@/components/header/Header.module.css";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
import {motion, useAnimation} from "framer-motion";
import {bounceActiveBlock} from "@/components/Form/bounce";
import PasswordInputWithStrength from "@/app/auth/register/PasswordInputWithStrength";

type LoginFormValues = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const methods = useForm<LoginFormValues>({
        shouldFocusError: false
    });
    const {register, handleSubmit} = methods;
    const controls = useAnimation();

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        try {
            const res = await fetch('/api/login/route.ts', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.error || 'Ошибка входа');
                return;
            }

            console.log("SUBMIT DATA:", data);
            alert('Вход успешен!');
        } catch (error) {
            console.error(error);
            alert('Ошибка сервера');
        }
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
        bounceActiveBlock('login', controls);
    }, [controls]);

    return (
        <>
            <Breadcrumbs loginUrl={true}/>
            <motion.div
                id="auth-login"
                initial={{y: 20, opacity: 1}}
                animate={controls}
                className={`${styles.BlogPageContent} w-full max-w-[860px] md:h-[561px] text-[18px] leading-relaxed whitespace-pre-line md:p-[40px]  p-5 border border-[#353535] rounded-[6px]`}
            >
                <div
                    className={`md:w-[780px] h-full flex md:flex-row flex-col gap-[30px] items-start justify-between`}>
                    <div
                        className={`h-full md:max-w-[375px] max-w-full w-full flex flex-col items-center justify-between ml-[-1px] mt-[-1px]`}>
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                                <AppInput
                                    className={`${styles.bounceElem} w-full md:w-[375px] mb-[32px]`}
                                    type={"email"}
                                    title={"E-mail"}
                                    inputName="email"
                                    required={true}
                                />
                                <div className={`relative w-full flex flex-col justify-between mb-[30px]`}>
                                    <PasswordInputWithStrength className={`${styles.bounceElem} !mb-0`}/>

                                    <div className={`relative inline-flex items-center justify-end`}>
                                        <Link
                                            className={`${styles['menu-item']}  w-fit mr-[14px] mt-[7.5px] !max-w-[122px]  font-[Rubik] !text-[16px] leading-[12px] text-[#adadad] !text-end `}
                                            href="/auth/forgot-password">Забыли пароль?</Link>
                                    </div>
                                </div>
                                <div className="relative !w-[220px] md:m-0 m-auto !overflow-hidden">
                                    <button
                                        type="submit"
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                        className={`${styles.btn} ${styles["log-send-button"]} ${HeaderStyles["login-button"]} !border-[#353535] bg-[rgb(42_42_42/0.1)] group !w-[220px] !h-[51px] flex items-center !justify-center`}
                                        data-text=""
                                    >
                                                  <span
                                                      className="!transition-all !duration-[.13s] !ease-in font-normal text-[#adadad] md:text-[20px] text-[18px] leading-[120%]">
                                                    Войти в аккаунт
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

                        <div className={`max-w-[280px] md:max-w-[375px]`}>
                            {/* вход с помощью */}
                            <div className={`flex items-center gap-[7px] justify-between mt-[10px]`}>
                                <svg width="119" height="2" viewBox="0 0 119 2" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <line x1="119" y1="1" y2="1" stroke="url(#paint0_linear_4682_3632)"/>
                                    <defs>
                                        <linearGradient id="paint0_linear_4682_3632" x1="119" y1="0" x2="0" y2="0"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop offset="0" stopColor="#9C9C9C"/>
                                            <stop offset="1" stopColor="#9C9C9C" stopOpacity="0"/>
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <p className={`whitespace-nowrap text-[#adadad] text-[16px] font-[Rubik] !leading-[70%]`}>вход
                                    с помощью</p>

                                <svg width="119" height="2" viewBox="0 0 119 2" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <line x1="-4.37114e-08" y1="1" x2="119" y2="0.99999"
                                          stroke="url(#paint0_linear_4682_3634)"/>
                                    <defs>
                                        <linearGradient id="paint0_linear_4682_3634" x1="4.37114e-08" y1="2" x2="119"
                                                        y2="1.99999" gradientUnits="userSpaceOnUse">
                                            <stop offset="0" stopColor="#9C9C9C"/>
                                            <stop offset="1" stopColor="#9C9C9C" stopOpacity="0"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            {/*  Icons  */}
                            <div>
                                <div
                                    className="w-full mt-2 flex flex-col md:flex-row items-center justify-center md:gap-[2px] gap-[4px]">

                                    <div className={`flex items-center md:gap-[2px] gap-[4px]`}>
                                        <div
                                            className={`group overflow-hidden relative cursor-pointer flex items-center justify-center w-[90px] md:w-[60px] h-[50px] bg-[#20272A] rounded-[4px] border border-transparent active:border-[#ccc] active:scale-[.95] `}
                                        >
                                            <svg
                                                className={`absolute transition-all duration-150 ease-in md:opacity-100 md:translate-y-0 md:group-hover:translate-y-[-50px] md:group-hover:opacity-0`}
                                                key="google" width="28" height="28" viewBox="0 0 28 28" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_4682_3639)">
                                                    <path
                                                        d="M27.212 11.4444H26.1609V11.3902H14.4159V16.6102H21.7911C20.7151 19.6489 17.8239 21.8302 14.4159 21.8302C10.0918 21.8302 6.58587 18.3243 6.58587 14.0002C6.58587 9.67608 10.0918 6.17019 14.4159 6.17019C16.4119 6.17019 18.2278 6.92318 19.6104 8.15314L23.3016 4.46195C20.9709 2.28978 17.8532 0.950195 14.4159 0.950195C7.20901 0.950195 1.36588 6.79333 1.36588 14.0002C1.36588 21.2071 7.20901 27.0502 14.4159 27.0502C21.6227 27.0502 27.4659 21.2071 27.4659 14.0002C27.4659 13.1252 27.3758 12.2711 27.212 11.4444Z"
                                                        fill="#adadad"/>
                                                    <path
                                                        d="M2.87152 7.92583L7.1591 11.0702C8.31924 8.19792 11.1289 6.16995 14.4169 6.16995C16.4129 6.16995 18.2288 6.92294 19.6114 8.1529L23.3026 4.46171C20.9719 2.28953 17.8542 0.949951 14.4169 0.949951C9.40435 0.949951 5.0574 3.77984 2.87152 7.92583Z"
                                                        fill="#adadad"/>
                                                    <path
                                                        d="M14.4172 27.0503C17.788 27.0503 20.8509 25.7603 23.1666 23.6625L19.1276 20.2447C17.8174 21.2372 16.1888 21.8303 14.4172 21.8303C11.0229 21.8303 8.14083 19.6659 7.05507 16.6455L2.79947 19.9243C4.95924 24.1506 9.34535 27.0503 14.4172 27.0503Z"
                                                        fill="#adadad"/>
                                                    <path
                                                        d="M27.2128 11.4442H26.1617V11.39H14.4167V16.61H21.7919C21.2751 18.0697 20.3361 19.3283 19.1251 20.2451L19.1271 20.2438L23.166 23.6616C22.8802 23.9213 27.4667 20.525 27.4667 14C27.4667 13.125 27.3766 12.2709 27.2128 11.4442Z"
                                                        fill="#adadad"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_4682_3639">
                                                        <rect x="0.916656" y="0.5" width="27" height="27" rx="5"
                                                              fill="white"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <svg
                                                className={`absolute transition-all duration-150 ease-in md:opacity-0 md:translate-y-[50px] md:group-hover:translate-y-0 md:group-hover:opacity-100`}
                                                key="google1" width="28" height="28" viewBox="0 0 28 28" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_4682_3639)">
                                                    <path
                                                        d="M27.212 11.4444H26.1609V11.3902H14.4159V16.6102H21.7911C20.7151 19.6489 17.8239 21.8302 14.4159 21.8302C10.0918 21.8302 6.58587 18.3243 6.58587 14.0002C6.58587 9.67608 10.0918 6.17019 14.4159 6.17019C16.4119 6.17019 18.2278 6.92318 19.6104 8.15314L23.3016 4.46195C20.9709 2.28978 17.8532 0.950195 14.4159 0.950195C7.20901 0.950195 1.36588 6.79333 1.36588 14.0002C1.36588 21.2071 7.20901 27.0502 14.4159 27.0502C21.6227 27.0502 27.4659 21.2071 27.4659 14.0002C27.4659 13.1252 27.3758 12.2711 27.212 11.4444Z"
                                                        fill="#FFC107"/>
                                                    <path
                                                        d="M2.87152 7.92583L7.1591 11.0702C8.31924 8.19792 11.1289 6.16995 14.4169 6.16995C16.4129 6.16995 18.2288 6.92294 19.6114 8.1529L23.3026 4.46171C20.9719 2.28953 17.8542 0.949951 14.4169 0.949951C9.40435 0.949951 5.0574 3.77984 2.87152 7.92583Z"
                                                        fill="#FF3D00"/>
                                                    <path
                                                        d="M14.4172 27.0503C17.788 27.0503 20.8509 25.7603 23.1666 23.6625L19.1276 20.2447C17.8174 21.2372 16.1888 21.8303 14.4172 21.8303C11.0229 21.8303 8.14083 19.6659 7.05507 16.6455L2.79947 19.9243C4.95924 24.1506 9.34535 27.0503 14.4172 27.0503Z"
                                                        fill="#4CAF50"/>
                                                    <path
                                                        d="M27.2128 11.4442H26.1617V11.39H14.4167V16.61H21.7919C21.2751 18.0697 20.3361 19.3283 19.1251 20.2451L19.1271 20.2438L23.166 23.6616C22.8802 23.9213 27.4667 20.525 27.4667 14C27.4667 13.125 27.3766 12.2709 27.2128 11.4442Z"
                                                        fill="#1976D2"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_4682_3639">
                                                        <rect x="0.916656" y="0.5" width="27" height="27" rx="5"
                                                              fill="white"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                        </div>
                                        <div
                                            className={`group overflow-hidden relative cursor-pointer flex items-center justify-center w-[90px] md:w-[60px] h-[50px] bg-[#20272A] rounded-[4px] border border-transparent active:border-[#ccc] active:scale-[.95] `}
                                        >
                                            <svg
                                                className={`absolute transition-all duration-150 ease-in md:opacity-100 md:translate-y-0 md:group-hover:translate-y-[-50px] md:group-hover:opacity-0`}
                                                width="26" height="28" viewBox="0 0 26 28" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_4682_3646)">
                                                    <path
                                                        d="M24.9545 9.5452C24.7764 9.6712 21.6315 11.2868 21.6315 14.8792C21.6315 19.0344 25.6333 20.5044 25.7531 20.5408C25.7346 20.6304 25.1173 22.554 23.6431 24.514C22.3286 26.2388 20.9558 27.9608 18.8673 27.9608C16.7789 27.9608 16.2414 26.8548 13.8305 26.8548C11.481 26.8548 10.6456 27.9972 8.73526 27.9972C6.82494 27.9972 5.49202 26.4012 3.95946 24.4412C2.18428 22.1396 0.75 18.564 0.75 15.1704C0.75 9.7272 4.63206 6.8404 8.4527 6.8404C10.4828 6.8404 12.1751 8.0556 13.4496 8.0556C14.6628 8.0556 16.5547 6.7676 18.8643 6.7676C19.7396 6.7676 22.8845 6.8404 24.9545 9.5452ZM17.7678 4.4632C18.723 3.43 19.3987 1.9964 19.3987 0.5628C19.3987 0.364 19.3802 0.1624 19.3403 0C17.7862 0.0532 15.9373 0.9436 14.8225 2.1224C13.9472 3.0296 13.1302 4.4632 13.1302 5.9164C13.1302 6.1348 13.1701 6.3532 13.1886 6.4232C13.2869 6.44 13.4466 6.4596 13.6063 6.4596C15.0006 6.4596 16.7543 5.6084 17.7678 4.4632Z"
                                                        fill="#adadad"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_4682_3646">
                                                        <rect width="25" height="28" fill="white"
                                                              transform="translate(0.75)"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <svg
                                                className={`absolute transition-all duration-150 ease-in md:opacity-0 md:translate-y-[50px] md:group-hover:translate-y-0 md:group-hover:opacity-100`}
                                                key="apple" width="26" height="28" viewBox="0 0 26 28" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_4754_891)">
                                                    <path
                                                        d="M24.9545 9.5452C24.7764 9.6712 21.6315 11.2868 21.6315 14.8792C21.6315 19.0344 25.6333 20.5044 25.7531 20.5408C25.7346 20.6304 25.1173 22.554 23.6431 24.514C22.3286 26.2388 20.9558 27.9608 18.8673 27.9608C16.7789 27.9608 16.2414 26.8548 13.8305 26.8548C11.481 26.8548 10.6456 27.9972 8.73526 27.9972C6.82494 27.9972 5.49202 26.4012 3.95946 24.4412C2.18428 22.1396 0.75 18.564 0.75 15.1704C0.75 9.7272 4.63206 6.8404 8.4527 6.8404C10.4828 6.8404 12.1751 8.0556 13.4496 8.0556C14.6628 8.0556 16.5547 6.7676 18.8643 6.7676C19.7396 6.7676 22.8845 6.8404 24.9545 9.5452ZM17.7678 4.4632C18.723 3.43 19.3987 1.9964 19.3987 0.5628C19.3987 0.364 19.3802 0.1624 19.3403 0C17.7862 0.0532 15.9373 0.9436 14.8225 2.1224C13.9472 3.0296 13.1302 4.4632 13.1302 5.9164C13.1302 6.1348 13.1701 6.3532 13.1886 6.4232C13.2869 6.44 13.4466 6.4596 13.6063 6.4596C15.0006 6.4596 16.7543 5.6084 17.7678 4.4632Z"
                                                        fill="black"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_4754_891">
                                                        <rect width="25" height="28" fill="white"
                                                              transform="translate(0.75)"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div
                                            className={`group overflow-hidden relative cursor-pointer flex items-center justify-center w-[90px] md:w-[60px] h-[50px] bg-[#20272A] rounded-[4px] border border-transparent active:border-[#ccc] active:scale-[.95]`}
                                        >
                                            <svg
                                                className={`absolute transition-all duration-150 ease-in md:opacity-100 md:translate-y-0 md:group-hover:translate-y-[-50px] md:group-hover:opacity-0`}
                                                width="25" height="24" viewBox="0 0 25 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g style={{mixBlendMode: 'luminosity'}}>
                                                    <rect x="0.0830078" width="11.5443" height="11.5443"
                                                          fill="#ADADAD"/>
                                                    <rect x="12.5386" width="11.5443" height="11.5443" fill="#ADADAD"/>
                                                    <rect x="0.0830078" y="12.4557" width="11.5443" height="11.5443"
                                                          fill="#ADADAD"/>
                                                    <rect x="12.5386" y="12.4557" width="11.5443" height="11.5443"
                                                          fill="#ADADAD"/>
                                                </g>
                                            </svg>
                                            <svg
                                                className={`absolute transition-all duration-150 ease-in md:opacity-0 md:translate-y-[50px] md:group-hover:translate-y-0 md:group-hover:opacity-100`}
                                                key="microsoft" width="25" height="24" viewBox="0 0 25 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.083374" width="11.5443" height="11.5443" fill="#F8510C"/>
                                                <rect x="12.5391" width="11.5443" height="11.5443" fill="#7EBA00"/>
                                                <rect x="0.083374" y="12.4557" width="11.5443" height="11.5443"
                                                      fill="#00A3F4"/>
                                                <rect x="12.5391" y="12.4557" width="11.5443" height="11.5443"
                                                      fill="#FFBA00"/>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className={`flex items-center md:gap-[2px] gap-[4px]`}>
                                        <div
                                            className={`group overflow-hidden relative cursor-pointer flex items-center justify-center w-[90px] md:w-[60px] h-[50px] bg-[#20272A] rounded-[4px] border border-transparent active:border-[#ccc] active:scale-[.95]`}
                                        >

                                            <svg
                                                className={`absolute transition-all duration-150 ease-in md:opacity-100 md:translate-y-0 md:group-hover:translate-y-[-50px] md:group-hover:opacity-0`}
                                                width="14" height="24" viewBox="0 0 14 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10.2144 3.60952H8.59447C5.62468 3.60952 4.06265 5.27077 4.06265 7.72005C4.06265 10.4888 5.14257 11.7861 7.36027 13.4492L9.19228 14.8123L3.92766 23.5H-0.00634766L4.71832 15.7281C2.00098 13.577 0.475761 11.4879 0.475761 7.95433C0.475761 3.52433 3.27199 0.5 8.57518 0.5H13.8398V23.4787H10.2144V3.60952Z"
                                                    fill="#ADADAD"/>
                                            </svg>
                                            <svg
                                                className={`absolute transition-all duration-150 ease-in md:opacity-0 md:translate-y-[50px] md:group-hover:translate-y-0 md:group-hover:opacity-100`}
                                                key="yandex" width="14" height="24" viewBox="0 0 14 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10.2143 3.60952H8.59441C5.62462 3.60952 4.06259 5.27077 4.06259 7.72005C4.06259 10.4888 5.14251 11.7861 7.36021 13.4492L9.19222 14.8123L3.9276 23.5H-0.00640869L4.71826 15.7281C2.00092 13.577 0.4757 11.4879 0.4757 7.95433C0.4757 3.52433 3.27193 0.5 8.57512 0.5H13.8397V23.4787H10.2143V3.60952Z"
                                                    fill="#FC3F1D"/>
                                            </svg>

                                        </div>
                                        <div
                                            className={`group overflow-hidden relative cursor-pointer flex items-center justify-center w-[90px] md:w-[60px] h-[50px] bg-[#20272A] rounded-[4px] border border-transparent active:border-[#ccc] active:scale-[.95]`}
                                        >
                                            <svg
                                                className={`absolute transition-all duration-150 ease-in md:opacity-100 md:translate-y-0 md:group-hover:translate-y-[-50px] md:group-hover:opacity-0`}
                                                width="25" height="24" viewBox="0 0 25 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.3598 12C16.3598 13.9905 14.7405 15.6098 12.75 15.6098C10.7595 15.6098 9.14025 13.9905 9.14025 12C9.14025 10.0095 10.7595 8.39024 12.75 8.39024C14.7405 8.39024 16.3598 10.0095 16.3598 12ZM12.75 0C6.1335 0 0.75 5.3835 0.75 12C0.75 18.6165 6.1335 24 12.75 24C15.174 24 17.5118 23.2785 19.5098 21.9127L19.5442 21.8887L17.9272 20.0093L17.9002 20.0273C16.362 21.0165 14.5807 21.54 12.75 21.54C7.4895 21.54 3.20999 17.2605 3.20999 12C3.20999 6.7395 7.4895 2.46 12.75 2.46C18.0105 2.46 22.29 6.7395 22.29 12C22.29 12.6818 22.2142 13.3718 22.065 14.0505C21.7635 15.2887 20.8965 15.6682 20.2455 15.618C19.5907 15.5647 18.825 15.0982 18.8198 13.9567V13.0867V12C18.8198 8.65272 16.0972 5.93025 12.75 5.93025C9.40273 5.93025 6.68025 8.65272 6.68025 12C6.68025 15.3473 9.40273 18.0698 12.75 18.0698C14.376 18.0698 15.9007 17.4338 17.0505 16.278C17.7187 17.3182 18.8085 17.9707 20.0482 18.0698C20.1547 18.0787 20.2635 18.0833 20.3715 18.0833C21.2438 18.0833 22.1092 17.7915 22.8067 17.2613C23.526 16.7153 24.063 15.9255 24.36 14.9767C24.4072 14.8238 24.4942 14.4727 24.495 14.4705L24.4972 14.4578C24.672 13.6965 24.75 12.9375 24.75 12C24.75 5.3835 19.3665 0 12.75 0Z"
                                                    fill="#ADADAD"/>
                                            </svg>
                                            <svg
                                                className={`absolute transition-all duration-150 ease-in md:opacity-0 md:translate-y-[50px] md:group-hover:translate-y-0 md:group-hover:opacity-100`}
                                                key="mail" width="25" height="24" viewBox="0 0 25 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.3598 12C16.3598 13.9905 14.7405 15.6098 12.75 15.6098C10.7595 15.6098 9.14025 13.9905 9.14025 12C9.14025 10.0095 10.7595 8.39024 12.75 8.39024C14.7405 8.39024 16.3598 10.0095 16.3598 12ZM12.75 0C6.1335 0 0.75 5.3835 0.75 12C0.75 18.6165 6.1335 24 12.75 24C15.174 24 17.5118 23.2785 19.5098 21.9127L19.5442 21.8887L17.9272 20.0093L17.9002 20.0273C16.362 21.0165 14.5807 21.54 12.75 21.54C7.4895 21.54 3.20999 17.2605 3.20999 12C3.20999 6.7395 7.4895 2.46 12.75 2.46C18.0105 2.46 22.29 6.7395 22.29 12C22.29 12.6818 22.2142 13.3718 22.065 14.0505C21.7635 15.2887 20.8965 15.6682 20.2455 15.618C19.5907 15.5647 18.825 15.0982 18.8198 13.9567V13.0867V12C18.8198 8.65272 16.0972 5.93025 12.75 5.93025C9.40273 5.93025 6.68025 8.65272 6.68025 12C6.68025 15.3473 9.40273 18.0698 12.75 18.0698C14.376 18.0698 15.9007 17.4338 17.0505 16.278C17.7187 17.3182 18.8085 17.9707 20.0482 18.0698C20.1547 18.0787 20.2635 18.0833 20.3715 18.0833C21.2438 18.0833 22.1092 17.7915 22.8067 17.2613C23.526 16.7153 24.063 15.9255 24.36 14.9767C24.4072 14.8238 24.4942 14.4727 24.495 14.4705L24.4972 14.4578C24.672 13.6965 24.75 12.9375 24.75 12C24.75 5.3835 19.3665 0 12.75 0Z"
                                                    fill="#0077FF"/>
                                            </svg>

                                        </div>
                                        <div
                                            className={`group overflow-hidden relative cursor-pointer flex items-center justify-center w-[90px] md:w-[60px] h-[50px] bg-[#20272A] rounded-[4px] border border-transparent active:border-[#ccc] active:scale-[.95]`}
                                        >
                                            <svg
                                                className={`absolute transition-all duration-150 ease-in md:opacity-100 md:translate-y-0 md:group-hover:translate-y-[-50px] md:group-hover:opacity-0`}
                                                width="33" height="22" viewBox="0 0 33 22" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M17.9968 21.5C7.18374 21.5 1.01626 13.6171 0.759277 0.5H6.17567C6.35358 10.1276 10.3466 14.2057 13.5095 15.0465V0.5H18.6098V8.8033C21.7331 8.44595 25.0142 4.66216 26.1212 0.5H31.2214C30.3713 5.62913 26.8131 9.41291 24.2828 10.9685C26.8131 12.2297 30.8657 15.53 32.4076 21.5H26.7934C25.5875 17.506 22.5831 14.4159 18.6098 13.9955V21.5H17.9968Z"
                                                    fill="#ADADAD"/>
                                            </svg>
                                            <svg
                                                className={`absolute transition-all duration-150 ease-in md:opacity-0 md:translate-y-[50px] md:group-hover:translate-y-0 md:group-hover:opacity-100`}
                                                key="vk" width="33" height="22" viewBox="0 0 33 22" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M17.9966 21.5C7.18355 21.5 1.01608 13.6171 0.759094 0.5H6.17549C6.3534 10.1276 10.3464 14.2057 13.5093 15.0465V0.5H18.6096V8.8033C21.7329 8.44595 25.014 4.66216 26.121 0.5H31.2212C30.3712 5.62913 26.8129 9.41291 24.2827 10.9685C26.8129 12.2297 30.8656 15.53 32.4074 21.5H26.7932C25.5873 17.506 22.5829 14.4159 18.6096 13.9955V21.5H17.9966Z"
                                                    fill="#0077FF"/>
                                            </svg>

                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="md:mt-[2px] mt-[4px] flex items-center justify-center md:gap-[2px] gap-[4px]">
                                    <div
                                        className="group overflow-hidden flex items-center justify-center w-full max-w-[137px] md:max-w-[184px] h-[50px] bg-[#20272A] rounded-[4px] relative cursor-pointer border border-transparent active:border-[#ccc] active:scale-[.95]"
                                    >
                                        <svg
                                            className={`absolute transition-all duration-150 ease-in md:opacity-100 md:translate-y-0 md:group-hover:translate-y-[-50px] md:group-hover:opacity-0`}
                                            id='gosusluga' width="144" height="40" viewBox="0 0 144 40" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M30.8345 13.125C35.2763 13.1251 37.0083 15.0556 37.0083 20.0107C37.0083 25.0413 35.2763 26.9979 30.8345 26.998C26.4276 26.998 24.7114 25.0414 24.7114 20.0107C24.7114 15.0554 26.4276 13.125 30.8345 13.125ZM45.7983 13.125C47.1514 13.125 48.6536 13.3581 49.9126 13.7598C49.9613 13.776 50.0005 13.8121 50.02 13.8574C50.0395 13.9028 50.0398 13.9547 50.0171 14C49.7309 14.6993 49.2726 15.8306 48.9702 16.4951C48.9345 16.5664 48.8499 16.6018 48.772 16.5791C47.8148 16.3005 46.8331 16.1846 46.022 16.1846C43.1598 16.1846 42.8452 17.4252 42.8452 20.0596C42.8452 23.3553 43.8704 23.9355 46.022 23.9355C47.0053 23.9355 48.2535 23.7084 49.0063 23.4297C49.0484 23.4168 49.0971 23.4172 49.1392 23.4365C49.1813 23.456 49.2138 23.4921 49.23 23.5342L50.3247 26.1162C50.3571 26.2004 50.3123 26.2983 50.228 26.334C49.154 26.7617 46.9278 26.998 45.7983 26.998C41.2908 26.998 39.2819 24.8431 39.2817 20.0117C39.2817 15.248 41.2907 13.125 45.7983 13.125ZM23.7876 13.4863C23.903 13.4865 23.9807 13.6051 23.936 13.7129L22.7896 16.4688C22.7592 16.5414 22.6902 16.5749 22.6245 16.5684H17.8335V26.4736C17.8333 26.5641 17.7597 26.6377 17.6694 26.6377H14.5308C14.4405 26.6377 14.3668 26.5641 14.3667 26.4736V13.6494C14.3669 13.5591 14.4406 13.4863 14.5308 13.4863H23.7876ZM30.8345 16.0088C28.8845 16.0088 28.2007 16.3401 28.2007 20.0596C28.2007 23.5532 28.8267 24.1104 30.8345 24.1104C32.8804 24.1103 33.5181 23.553 33.5181 20.0596C33.518 16.3403 32.8226 16.0088 30.8345 16.0088Z"
                                                fill="#ADADAD"/>
                                            <path
                                                d="M55.0139 13.4863C55.0823 13.4863 55.1436 13.5281 55.1672 13.5918L58.3713 22.2822C59.4108 19.7027 60.3079 17.0259 61.2805 13.6064C61.3005 13.5361 61.3656 13.4863 61.4387 13.4863H64.5901C64.701 13.4863 64.7794 13.5965 64.7453 13.7021C62.2189 21.701 60.3707 26.244 57.8596 31.3682C57.8317 31.423 57.7747 31.458 57.7131 31.458H54.3205C54.1981 31.458 54.12 31.3268 54.176 31.2178C55.0313 29.5527 55.7792 28.0589 56.4524 26.6396L51.6819 13.7031C51.6431 13.5975 51.7218 13.4863 51.8352 13.4863H55.0139ZM95.595 13.4863C95.6632 13.4865 95.7247 13.5282 95.7483 13.5918L98.9524 22.2822C99.9919 19.7027 100.889 17.026 101.862 13.6064C101.882 13.5362 101.946 13.4865 102.019 13.4863H105.171C105.282 13.4864 105.36 13.5965 105.325 13.7021C102.799 21.701 100.952 26.244 98.4407 31.3682C98.4128 31.4231 98.3558 31.458 98.2942 31.458H94.9006C94.7782 31.458 94.7002 31.3267 94.7561 31.2178C95.6114 29.5527 96.3593 28.0588 97.0325 26.6396L92.2619 13.7031C92.2234 13.5977 92.3022 13.4865 92.4153 13.4863H95.595ZM72.178 13.125C73.5312 13.125 75.0341 13.358 76.2932 13.7598C76.3417 13.776 76.3802 13.8122 76.3996 13.8574C76.4191 13.9028 76.4194 13.9546 76.3967 14C76.1105 14.6993 75.6522 15.8306 75.3498 16.4951C75.3142 16.5663 75.2304 16.6016 75.1526 16.5791C74.1952 16.3004 73.2129 16.1846 72.4016 16.1846C69.5394 16.1846 69.2249 17.4252 69.2248 20.0596C69.2248 23.3552 70.25 23.9355 72.4016 23.9355C73.3849 23.9355 74.6331 23.7084 75.386 23.4297C75.428 23.4168 75.4767 23.4172 75.5188 23.4365C75.561 23.456 75.5934 23.4921 75.6096 23.5342L76.7053 26.1162C76.7378 26.2005 76.692 26.2983 76.6076 26.334C75.5335 26.7617 73.3074 26.998 72.178 26.998C67.6704 26.998 65.6615 24.8431 65.6614 20.0117C65.6614 15.248 67.6703 13.125 72.178 13.125ZM121.855 13.4863C121.946 13.4863 122.019 13.5578 122.019 13.6494V21.0654C122.091 23.3035 122.643 23.8398 124.545 23.8398C125.31 23.8398 125.989 23.7483 126.669 23.5586V13.6494C126.669 13.5578 126.742 13.4863 126.833 13.4863H129.971C130.062 13.4864 130.134 13.5579 130.131 13.6494V25.7217C130.131 25.7937 130.088 25.8589 130.02 25.8818C128.565 26.4382 126.114 26.998 123.917 26.998C120.155 26.998 118.632 25.3484 118.557 21.1367C118.554 21.0801 118.554 13.6689 118.554 13.6689V13.6494C118.554 13.5579 118.626 13.4864 118.717 13.4863H121.855ZM90.1272 13.4863C90.2172 13.4865 90.29 13.5592 90.2903 13.6494V26.4736C90.2901 26.564 90.2172 26.6375 90.1272 26.6377H86.9875C86.8973 26.6377 86.8236 26.5641 86.8235 26.4736V16.5684H83.6721C83.5562 18.03 83.3605 19.6012 83.0403 21.2588C82.6679 23.2001 82.2272 24.9611 81.7307 26.5254C81.7111 26.5909 81.6458 26.6375 81.5774 26.6377H78.3528C78.2451 26.6377 78.1664 26.5326 78.1955 26.4277C78.7345 24.5879 79.297 22.5051 79.6858 20.1963C80.0843 17.8088 80.2929 15.608 80.3811 13.6436C80.3843 13.555 80.4569 13.4863 80.5451 13.4863H90.1272ZM116.829 13.4863C116.945 13.4865 117.022 13.6051 116.978 13.7129L115.831 16.4688C115.801 16.5414 115.732 16.5749 115.666 16.5684H110.875V26.4736C110.875 26.5641 110.801 26.6377 110.711 26.6377H107.572C107.481 26.6375 107.409 26.5639 107.408 26.4736V13.6494C107.409 13.5592 107.482 13.4866 107.572 13.4863H116.829Z"
                                                fill="#ADADAD"/>
                                        </svg>

                                        <svg
                                            className={`absolute transition-all duration-150 ease-in md:opacity-0 md:translate-y-[50px] md:group-hover:translate-y-0 md:group-hover:opacity-100`}
                                            width="144" height="40" viewBox="0 0 144 40" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M30.8345 13.125C35.2763 13.1251 37.0083 15.0556 37.0083 20.0107C37.0083 25.0413 35.2763 26.9979 30.8345 26.998C26.4276 26.998 24.7114 25.0414 24.7114 20.0107C24.7114 15.0554 26.4276 13.125 30.8345 13.125ZM45.7983 13.125C47.1514 13.125 48.6536 13.3581 49.9126 13.7598C49.9613 13.776 50.0005 13.8121 50.02 13.8574C50.0395 13.9028 50.0398 13.9547 50.0171 14C49.7309 14.6993 49.2726 15.8306 48.9702 16.4951C48.9345 16.5664 48.8499 16.6018 48.772 16.5791C47.8148 16.3005 46.8331 16.1846 46.022 16.1846C43.1598 16.1846 42.8452 17.4252 42.8452 20.0596C42.8452 23.3553 43.8704 23.9355 46.022 23.9355C47.0053 23.9355 48.2535 23.7084 49.0063 23.4297C49.0484 23.4168 49.0971 23.4172 49.1392 23.4365C49.1813 23.456 49.2138 23.4921 49.23 23.5342L50.3247 26.1162C50.3571 26.2004 50.3123 26.2983 50.228 26.334C49.154 26.7617 46.9278 26.998 45.7983 26.998C41.2908 26.998 39.2819 24.8431 39.2817 20.0117C39.2817 15.248 41.2907 13.125 45.7983 13.125ZM23.7876 13.4863C23.903 13.4865 23.9807 13.6051 23.936 13.7129L22.7896 16.4688C22.7592 16.5414 22.6902 16.5749 22.6245 16.5684H17.8335V26.4736C17.8333 26.5641 17.7597 26.6377 17.6694 26.6377H14.5308C14.4405 26.6377 14.3668 26.5641 14.3667 26.4736V13.6494C14.3669 13.5591 14.4406 13.4863 14.5308 13.4863H23.7876ZM30.8345 16.0088C28.8845 16.0088 28.2007 16.3401 28.2007 20.0596C28.2007 23.5532 28.8267 24.1104 30.8345 24.1104C32.8804 24.1103 33.5181 23.553 33.5181 20.0596C33.518 16.3403 32.8226 16.0088 30.8345 16.0088Z"
                                                fill="#0066B3"/>
                                            <path
                                                d="M55.0139 13.4863C55.0823 13.4863 55.1436 13.5281 55.1672 13.5918L58.3713 22.2822C59.4108 19.7027 60.3079 17.0259 61.2805 13.6064C61.3005 13.5361 61.3656 13.4863 61.4387 13.4863H64.5901C64.701 13.4863 64.7794 13.5965 64.7453 13.7021C62.2189 21.701 60.3707 26.244 57.8596 31.3682C57.8317 31.423 57.7747 31.458 57.7131 31.458H54.3205C54.1981 31.458 54.12 31.3268 54.176 31.2178C55.0313 29.5527 55.7792 28.0589 56.4524 26.6396L51.6819 13.7031C51.6431 13.5975 51.7218 13.4863 51.8352 13.4863H55.0139ZM95.595 13.4863C95.6632 13.4865 95.7247 13.5282 95.7483 13.5918L98.9524 22.2822C99.9919 19.7027 100.889 17.026 101.862 13.6064C101.882 13.5362 101.946 13.4865 102.019 13.4863H105.171C105.282 13.4864 105.36 13.5965 105.325 13.7021C102.799 21.701 100.952 26.244 98.4407 31.3682C98.4128 31.4231 98.3558 31.458 98.2942 31.458H94.9006C94.7782 31.458 94.7002 31.3267 94.7561 31.2178C95.6114 29.5527 96.3593 28.0588 97.0325 26.6396L92.2619 13.7031C92.2234 13.5977 92.3022 13.4865 92.4153 13.4863H95.595ZM72.178 13.125C73.5312 13.125 75.0341 13.358 76.2932 13.7598C76.3417 13.776 76.3802 13.8122 76.3996 13.8574C76.4191 13.9028 76.4194 13.9546 76.3967 14C76.1105 14.6993 75.6522 15.8306 75.3498 16.4951C75.3142 16.5663 75.2304 16.6016 75.1526 16.5791C74.1952 16.3004 73.2129 16.1846 72.4016 16.1846C69.5394 16.1846 69.2249 17.4252 69.2248 20.0596C69.2248 23.3552 70.25 23.9355 72.4016 23.9355C73.3849 23.9355 74.6331 23.7084 75.386 23.4297C75.428 23.4168 75.4767 23.4172 75.5188 23.4365C75.561 23.456 75.5934 23.4921 75.6096 23.5342L76.7053 26.1162C76.7378 26.2005 76.692 26.2983 76.6076 26.334C75.5335 26.7617 73.3074 26.998 72.178 26.998C67.6704 26.998 65.6615 24.8431 65.6614 20.0117C65.6614 15.248 67.6703 13.125 72.178 13.125ZM121.855 13.4863C121.946 13.4863 122.019 13.5578 122.019 13.6494V21.0654C122.091 23.3035 122.643 23.8398 124.545 23.8398C125.31 23.8398 125.989 23.7483 126.669 23.5586V13.6494C126.669 13.5578 126.742 13.4863 126.833 13.4863H129.971C130.062 13.4864 130.134 13.5579 130.131 13.6494V25.7217C130.131 25.7937 130.088 25.8589 130.02 25.8818C128.565 26.4382 126.114 26.998 123.917 26.998C120.155 26.998 118.632 25.3484 118.557 21.1367C118.554 21.0801 118.554 13.6689 118.554 13.6689V13.6494C118.554 13.5579 118.626 13.4864 118.717 13.4863H121.855ZM90.1272 13.4863C90.2172 13.4865 90.29 13.5592 90.2903 13.6494V26.4736C90.2901 26.564 90.2172 26.6375 90.1272 26.6377H86.9875C86.8973 26.6377 86.8236 26.5641 86.8235 26.4736V16.5684H83.6721C83.5562 18.03 83.3605 19.6012 83.0403 21.2588C82.6679 23.2001 82.2272 24.9611 81.7307 26.5254C81.7111 26.5909 81.6458 26.6375 81.5774 26.6377H78.3528C78.2451 26.6377 78.1664 26.5326 78.1955 26.4277C78.7345 24.5879 79.297 22.5051 79.6858 20.1963C80.0843 17.8088 80.2929 15.608 80.3811 13.6436C80.3843 13.555 80.4569 13.4863 80.5451 13.4863H90.1272ZM116.829 13.4863C116.945 13.4865 117.022 13.6051 116.978 13.7129L115.831 16.4688C115.801 16.5414 115.732 16.5749 115.666 16.5684H110.875V26.4736C110.875 26.5641 110.801 26.6377 110.711 26.6377H107.572C107.481 26.6375 107.409 26.5639 107.408 26.4736V13.6494C107.409 13.5592 107.482 13.4866 107.572 13.4863H116.829Z"
                                                fill="#EE2F53"/>
                                        </svg>
                                    </div>

                                    <div
                                        className="group overflow-hidden flex items-center justify-center w-full max-w-[137px] md:max-w-[184px] h-[50px] bg-[#20272A] rounded-[4px] relative cursor-pointer border border-transparent active:border-[#ccc] active:scale-[.95]"
                                    >
                                        <svg
                                            className={`absolute transition-all duration-150 ease-in md:opacity-100 md:translate-y-0 gmd:roup-hover:translate-y-[-50px] md:group-hover:opacity-0`}
                                            id='sberId' width="116" height="24" viewBox="0 0 116 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M69.7476 7.28556L73.0048 4.88556H62.2048V19.1141H73.0048V16.7141H65.2905V13.1141H71.8048V10.7141H65.2905V7.28556H69.7476ZM56.2905 7.28556L59.5476 4.88556H47.2048V19.1141H53.6333C57.2333 19.1141 59.2905 17.4856 59.2905 14.657C59.2905 11.9141 57.4048 10.457 53.9762 10.457H50.2048V7.28556H56.2905ZM53.5476 12.7713C55.519 12.7713 56.3762 13.457 56.3762 14.7427C56.3762 16.0284 55.4333 16.7141 53.5476 16.7141H50.2905V12.7713H53.5476ZM81.6619 4.88556H75.8333V19.1141H78.919V15.0856H81.7476C85.5191 15.0856 87.8333 13.1141 87.8333 9.9427C87.8333 6.77128 85.4333 4.88556 81.6619 4.88556ZM81.6619 12.6856H78.919V7.19985H81.6619C83.6333 7.19985 84.7476 8.1427 84.7476 9.9427C84.6619 11.7427 83.6333 12.6856 81.6619 12.6856ZM41.9762 16.0284C41.119 16.457 40.2619 16.7141 39.319 16.7141C36.5762 16.7141 34.519 14.7427 34.519 11.9998C34.519 9.25699 36.4905 7.28556 39.319 7.28556C40.3476 7.28556 41.2905 7.62842 42.1476 8.1427L44.3762 6.51413L44.2048 6.3427C42.919 5.22842 41.2048 4.62842 39.2333 4.62842C37.0905 4.62842 35.2048 5.31413 33.7476 6.68556C32.3762 8.05699 31.519 9.9427 31.6048 11.9141C31.6048 13.8856 32.3762 15.7713 33.7476 17.2284C35.2048 18.5998 37.1762 19.3713 39.1476 19.2856C41.3762 19.2856 43.2619 18.5141 44.6333 17.1427L42.6619 15.6856L41.9762 16.0284Z"
                                                fill="#ADADAD"/>
                                            <path
                                                d="M21.7334 4.61279C22.2898 5.3419 22.7609 6.13402 23.137 6.97324L12.4666 14.9449L8.00708 12.1118V8.70348L12.4666 11.5366L21.7334 4.61279Z"
                                                fill="#ADADAD"/>
                                            <path
                                                d="M3.45552 11.8711C3.45552 11.7181 3.4592 11.5662 3.46656 11.4152L0.763986 11.2809C0.754788 11.4767 0.749271 11.6744 0.749271 11.8738C0.748121 13.4324 1.05062 14.9759 1.63941 16.4156C2.22821 17.8555 3.0917 19.1633 4.18038 20.2641L6.09738 18.3222C5.25936 17.4763 4.59455 16.4709 4.14117 15.3638C3.68779 14.2567 3.45478 13.0697 3.45552 11.8711Z"
                                                fill="#ADADAD"/>
                                            <path
                                                d="M12.4624 2.74228C12.6132 2.74228 12.7631 2.74787 12.9121 2.75533L13.0474 0.0154568C12.8536 0.00613431 12.6586 0.00147365 12.4624 0.00147365C10.9238 -0.000427907 9.40001 0.305697 7.9785 0.902268C6.55699 1.49884 5.26576 2.37411 4.17896 3.47783L6.09596 5.42063C6.93063 4.57105 7.92278 3.89705 9.01537 3.43741C10.108 2.97776 11.2794 2.74152 12.4624 2.74228Z"
                                                fill="#ADADAD"/>
                                            <path
                                                d="M12.4621 21.0011C12.3113 21.0011 12.1613 21.0011 12.0115 20.989L11.8762 23.7279C12.0706 23.7379 12.2659 23.7429 12.4621 23.7429C14.0001 23.7445 15.5232 23.4382 16.9439 22.8414C18.3647 22.2447 19.655 21.3693 20.741 20.2656L18.8277 18.3237C17.9929 19.1729 17.0008 19.8465 15.9084 20.3059C14.8161 20.7654 13.6449 21.0017 12.4621 21.0011Z"
                                                fill="#ADADAD"/>
                                            <path
                                                d="M17.5416 4.33497L19.8192 2.63361C17.7374 0.925234 15.1389 -0.00474227 12.4602 1.81858e-05V2.74175C14.2741 2.73947 16.0459 3.29501 17.5416 4.33497Z"
                                                fill="#ADADAD"/>
                                            <path
                                                d="M24.178 11.8715C24.1794 11.1583 24.1179 10.4463 23.994 9.74414L21.4726 11.6273C21.4726 11.7084 21.4726 11.7895 21.4726 11.8715C21.4733 13.1471 21.2094 14.4086 20.6983 15.5742C20.187 16.7398 19.4398 17.7835 18.5051 18.6378L20.3237 20.6748C21.5389 19.563 22.51 18.2048 23.1739 16.6883C23.838 15.1717 24.18 13.5307 24.178 11.8715Z"
                                                fill="#ADADAD"/>
                                            <path
                                                d="M12.4649 21.0011C11.2061 21.0015 9.96135 20.734 8.81106 20.216C7.66082 19.6979 6.63075 18.9408 5.78755 17.9937L3.77856 19.8358C4.87547 21.0675 6.21557 22.0518 7.71199 22.7249C9.2084 23.3979 10.8277 23.7447 12.4649 23.7428V21.0011Z"
                                                fill="#ADADAD"/>
                                            <path
                                                d="M6.42302 5.10477L4.60536 3.06781C3.38982 4.1794 2.4184 5.53751 1.75409 7.05406C1.0898 8.5706 0.747456 10.2117 0.749275 11.871H3.45553C3.45497 10.5955 3.71884 9.334 4.23004 8.16839C4.74124 7.00282 5.48837 5.95906 6.42302 5.10477Z"
                                                fill="#ADADAD"/>
                                            <path d="M98.7874 19.8088V5.14307H96.3986V19.8088H98.7874Z" fill="#ADADAD"/>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M102.101 5.14307V19.8088H108.42C110.731 19.8088 115.124 18.3266 115.124 12.1639C115.124 6.23519 110.886 5.14303 108.42 5.14307H102.101ZM104.644 17.5465V7.48337H107.88C109.267 7.48337 112.504 8.49749 112.504 12.1639C112.504 16.4544 109.344 17.5465 107.88 17.5465H104.644Z"
                                                  fill="#ADADAD"/>
                                        </svg>
                                        <svg
                                            className={`absolute transition-all duration-150 ease-in md:opacity-0 md:translate-y-[50px] md:group-hover:translate-y-0 md:group-hover:opacity-100`}
                                            width="116" height="24" viewBox="0 0 116 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M69.7475 7.28556L73.0046 4.88556H62.2046V19.1141H73.0046V16.7141H65.2904V13.1141H71.8046V10.7141H65.2904V7.28556H69.7475ZM56.2904 7.28556L59.5475 4.88556H47.2046V19.1141H53.6332C57.2332 19.1141 59.2904 17.4856 59.2904 14.657C59.2904 11.9141 57.4046 10.457 53.9761 10.457H50.2046V7.28556H56.2904ZM53.5475 12.7713C55.5189 12.7713 56.3761 13.457 56.3761 14.7427C56.3761 16.0284 55.4332 16.7141 53.5475 16.7141H50.2904V12.7713H53.5475ZM81.6618 4.88556H75.8332V19.1141H78.9189V15.0856H81.7475C85.5189 15.0856 87.8332 13.1141 87.8332 9.9427C87.8332 6.77128 85.4332 4.88556 81.6618 4.88556ZM81.6618 12.6856H78.9189V7.19985H81.6618C83.6332 7.19985 84.7475 8.1427 84.7475 9.9427C84.6618 11.7427 83.6332 12.6856 81.6618 12.6856ZM41.9761 16.0284C41.1189 16.457 40.2618 16.7141 39.3189 16.7141C36.5761 16.7141 34.5189 14.7427 34.5189 11.9998C34.5189 9.25699 36.4904 7.28556 39.3189 7.28556C40.3475 7.28556 41.2904 7.62842 42.1475 8.1427L44.3761 6.51413L44.2046 6.3427C42.9189 5.22842 41.2046 4.62842 39.2332 4.62842C37.0904 4.62842 35.2046 5.31413 33.7475 6.68556C32.3761 8.05699 31.5189 9.9427 31.6046 11.9141C31.6046 13.8856 32.3761 15.7713 33.7475 17.2284C35.2046 18.5998 37.1761 19.3713 39.1475 19.2856C41.3761 19.2856 43.2618 18.5141 44.6332 17.1427L42.6618 15.6856L41.9761 16.0284Z"
                                                fill="white"/>
                                            <path
                                                d="M21.7332 4.61279C22.2897 5.3419 22.7608 6.13402 23.1369 6.97324L12.4664 14.9449L8.00696 12.1118V8.70348L12.4664 11.5366L21.7332 4.61279Z"
                                                fill="#21A038"/>
                                            <path
                                                d="M3.4554 11.8711C3.4554 11.7181 3.45908 11.5662 3.46644 11.4152L0.763864 11.2809C0.754666 11.4767 0.749149 11.6744 0.749149 11.8738C0.747999 13.4324 1.05049 14.9759 1.63929 16.4156C2.22808 17.8555 3.09158 19.1633 4.18025 20.2641L6.09726 18.3222C5.25923 17.4763 4.59443 16.4709 4.14105 15.3638C3.68767 14.2567 3.45466 13.0697 3.4554 11.8711Z"
                                                fill="url(#paint0_linear_4682_3682)"/>
                                            <path
                                                d="M12.4623 2.74228C12.6131 2.74228 12.763 2.74787 12.912 2.75533L13.0473 0.0154568C12.8535 0.00613431 12.6585 0.00147365 12.4623 0.00147365C10.9236 -0.000427907 9.39989 0.305697 7.97838 0.902268C6.55687 1.49884 5.26564 2.37411 4.17883 3.47783L6.09584 5.42063C6.93051 4.57105 7.92266 3.89705 9.01525 3.43741C10.1078 2.97776 11.2792 2.74152 12.4623 2.74228Z"
                                                fill="url(#paint1_linear_4682_3682)"/>
                                            <path
                                                d="M12.462 21.0011C12.3112 21.0011 12.1612 21.0011 12.0113 20.989L11.8761 23.7279C12.0705 23.7379 12.2658 23.7429 12.462 23.7429C14 23.7445 15.523 23.4382 16.9438 22.8414C18.3645 22.2447 19.6549 21.3693 20.7409 20.2656L18.8276 18.3237C17.9927 19.1729 17.0007 19.8465 15.9083 20.3059C14.816 20.7654 13.6448 21.0017 12.462 21.0011Z"
                                                fill="url(#paint2_linear_4682_3682)"/>
                                            <path
                                                d="M17.5415 4.33497L19.8191 2.63361C17.7373 0.925234 15.1388 -0.00474227 12.4601 1.81858e-05V2.74175C14.274 2.73947 16.0458 3.29501 17.5415 4.33497Z"
                                                fill="url(#paint3_linear_4682_3682)"/>
                                            <path
                                                d="M24.1779 11.8715C24.1793 11.1583 24.1177 10.4463 23.9938 9.74414L21.4725 11.6273C21.4725 11.7084 21.4725 11.7895 21.4725 11.8715C21.4732 13.1471 21.2093 14.4086 20.6982 15.5742C20.1869 16.7398 19.4397 17.7835 18.505 18.6378L20.3236 20.6748C21.5388 19.563 22.5099 18.2048 23.1738 16.6883C23.8379 15.1717 24.1799 13.5307 24.1779 11.8715Z"
                                                fill="#21A038"/>
                                            <path
                                                d="M12.4648 21.0011C11.206 21.0015 9.96123 20.734 8.81094 20.216C7.6607 19.6979 6.63062 18.9408 5.78743 17.9937L3.77844 19.8358C4.87535 21.0675 6.21545 22.0518 7.71187 22.7249C9.20828 23.3979 10.8276 23.7447 12.4648 23.7428V21.0011Z"
                                                fill="url(#paint4_linear_4682_3682)"/>
                                            <path
                                                d="M6.4229 5.10477L4.60524 3.06781C3.3897 4.1794 2.41828 5.53751 1.75397 7.05406C1.08968 8.5706 0.747334 10.2117 0.749153 11.871H3.4554C3.45484 10.5955 3.71872 9.334 4.22992 8.16839C4.74112 7.00282 5.48825 5.95906 6.4229 5.10477Z"
                                                fill="url(#paint5_linear_4682_3682)"/>
                                            <path d="M98.7873 19.8088V5.14307H96.3985V19.8088H98.7873Z" fill="white"/>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M102.101 5.14307V19.8088H108.42C110.731 19.8088 115.124 18.3266 115.124 12.1639C115.124 6.23519 110.885 5.14303 108.42 5.14307H102.101ZM104.644 17.5465V7.48337H107.88C109.267 7.48337 112.504 8.49749 112.504 12.1639C112.504 16.4544 109.344 17.5465 107.88 17.5465H104.644Z"
                                                  fill="white"/>
                                            <defs>
                                                <linearGradient id="paint0_linear_4682_3682" x1="4.72758" y1="19.922"
                                                                x2="1.69978" y2="11.2854"
                                                                gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.14" stopColor="#F1E813"/>
                                                    <stop offset="0.3" stopColor="#E6E418"/>
                                                    <stop offset="0.58" stopColor="#C9DA26"/>
                                                    <stop offset="0.89" stopColor="#A2CC39"/>
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_4682_3682" x1="4.95152" y1="3.96259"
                                                                x2="12.5926" y2="1.08933"
                                                                gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.06" stopColor="#0FA7DF"/>
                                                    <stop offset="0.54" stopColor="#0098F8"/>
                                                    <stop offset="0.92" stopColor="#0290EA"/>
                                                </linearGradient>
                                                <linearGradient id="paint2_linear_4682_3682" x1="11.6977" y1="22.0881"
                                                                x2="20.3205" y2="20.166" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.12" stopColor="#A2CC39"/>
                                                    <stop offset="0.28" stopColor="#86C239"/>
                                                    <stop offset="0.87" stopColor="#219F38"/>
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_4682_3682" x1="11.8972" y1="0.918281"
                                                                x2="19.2767" y2="3.16534"
                                                                gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.06" stopColor="#0290EA"/>
                                                    <stop offset="0.79" stopColor="#0C89CA"/>
                                                </linearGradient>
                                                <linearGradient id="paint4_linear_4682_3682" x1="4.4573" y1="19.502"
                                                                x2="12.4972" y2="22.4669"
                                                                gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.13" stopColor="#F1E813"/>
                                                    <stop offset="0.3" stopColor="#EAE616"/>
                                                    <stop offset="0.53" stopColor="#D8DF1F"/>
                                                    <stop offset="0.8" stopColor="#BAD52D"/>
                                                    <stop offset="0.98" stopColor="#A2CC39"/>
                                                </linearGradient>
                                                <linearGradient id="paint5_linear_4682_3682" x1="1.75733" y1="12.2029"
                                                                x2="5.04978" y2="3.75173"
                                                                gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.07" stopColor="#A2CC39"/>
                                                    <stop offset="0.26" stopColor="#81C45E"/>
                                                    <stop offset="0.92" stopColor="#0FA7DF"/>
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='relative w-full md:max-w-[375px] md:max-h-[481px] rounded-[4px] mt-[-1px] mr-[1px]'>
                        <Image
                            className={`md:min-w-[375px] m-auto h-full rounded-[4px]`}
                            src='/auth/01.png' alt='01' width={375} height={488}/>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
