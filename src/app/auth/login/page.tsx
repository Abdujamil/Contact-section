'use client'
import Image from "next/image";
import AppInput from "@/components/forms/elements/AppInput";
import {useForm, FormProvider, SubmitHandler} from "react-hook-form";
import Link from "next/link";
import styles from "@/app/page.module.scss";
import React, {useEffect, useState} from "react";
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
    const [showPolicy, setShowPolicy] = useState(false);

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        setShowPolicy(true)
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

    // Добавляем обработчик для показа политики при взаимодействии с формой
    const handleFormInteraction = () => {
        if (!showPolicy) {
            setShowPolicy(true);
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
                        className={`h-full md:max-w-[374px] max-w-full w-full flex flex-col items-center justify-between`}>
                        <FormProvider {...methods}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-4 w-full"
                                onFocus={handleFormInteraction}
                                onClick={handleFormInteraction}
                            >
                                <AppInput
                                    className={`${styles.bounceElem} w-full md:w-[374px] mb-[33px]`}
                                    type={"email"}
                                    title={"E-mail"}
                                    inputName="email"
                                    required={true}
                                />
                                <div className={`relative w-full flex flex-col justify-between mb-[26px]`}>
                                    <PasswordInputWithStrength className={`${styles.bounceElem} !mb-0`}/>

                                    <div className={`relative inline-flex items-center justify-end`}>
                                        <Link
                                            className={`${styles['menu-item']}  w-fit mr-[14px] mt-[7.8px] !max-w-[122px]  font-[Rubik] !text-[16px] leading-[100%] text-[#adadad] !text-end `}
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
                                            className={`${styles.sendIconRight} mt-[3px] transition-all !duration-[.13s] ease-in`}
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

                        <div className={`max-w-[280px] md:max-w-[374px] ml-[-1px] mb-[2px]`}>
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

                                <p className={`whitespace-nowrap text-[#adadad] text-[16px] font-[Rubik] !leading-[70%] mb-[0.5px]`}>вход
                                    с помощью</p>

                                <svg
                                    className={`mb-[1px]`}
                                    width="119" height="2" viewBox="0 0 119 2" fill="none"
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
                            <div className={`mb-[-3px]`}>

                                <div
                                    className="md:mt-[10px] mt-[2px] flex items-center justify-between md:gap-[2px] gap-[4px]">

                                    <div
                                        className={`group overflow-hidden relative cursor-pointer flex items-center justify-center w-[90px] md:w-[123.67px] h-[50px] bg-[#20272A] rounded-[4px] border border-transparent active:border-[#ccc] active:scale-[.95] `}
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

                                    {/* яндекс */}
                                    <div
                                        className={`group overflow-hidden relative cursor-pointer flex items-center justify-center w-[90px] md:w-[123.67px] h-[50px] bg-[#20272A] rounded-[4px] border border-transparent active:border-[#ccc] active:scale-[.95]`}
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

                                    {/* сбербанк */}
                                    <div
                                        className={`group overflow-hidden relative cursor-pointer flex items-center justify-center w-[90px] md:w-[123.67px] h-[50px] bg-[#20272A] rounded-[4px] border border-transparent active:border-[#ccc] active:scale-[.95]`}
                                    >

                                        <svg
                                            className={`absolute transition-all duration-150 ease-in md:opacity-100 md:translate-y-0 md:group-hover:translate-y-[-50px] md:group-hover:opacity-0`}
                                            width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.3158 4.61279C21.8723 5.3419 22.3434 6.13402 22.7195 6.97324L12.049 14.9449L7.58954 12.1118V8.70348L12.049 11.5366L21.3158 4.61279Z" fill="#ADADAD"/>
                                            <path d="M3.03798 11.8709C3.03798 11.718 3.04166 11.566 3.04902 11.415L0.346445 11.2808C0.337246 11.4765 0.331729 11.6742 0.331729 11.8737C0.330579 13.4322 0.633075 14.9757 1.22187 16.4154C1.81066 17.8553 2.67416 19.1631 3.76283 20.2639L5.67984 18.322C4.84182 17.4762 4.17701 16.4708 3.72363 15.3637C3.27025 14.2566 3.03724 13.0695 3.03798 11.8709Z" fill="#ADADAD"/>
                                            <path d="M12.0449 2.74228C12.1957 2.74228 12.3456 2.74787 12.4946 2.75533L12.6298 0.0154568C12.4361 0.00613431 12.2411 0.00147365 12.0449 0.00147365C10.5062 -0.000427907 8.98247 0.305697 7.56096 0.902268C6.13945 1.49884 4.84822 2.37411 3.76141 3.47783L5.67842 5.42063C6.51309 4.57105 7.50524 3.89705 8.59783 3.43741C9.69041 2.97776 10.8618 2.74152 12.0449 2.74228Z" fill="#ADADAD"/>
                                            <path d="M12.0446 21.0011C11.8938 21.0011 11.7438 21.0011 11.5939 20.989L11.4587 23.7279C11.6531 23.7379 11.8484 23.7429 12.0446 23.7429C13.5826 23.7445 15.1056 23.4382 16.5264 22.8414C17.9471 22.2447 19.2375 21.3693 20.3235 20.2656L18.4101 18.3237C17.5753 19.1729 16.5833 19.8465 15.4909 20.3059C14.3985 20.7654 13.2273 21.0017 12.0446 21.0011Z" fill="#ADADAD"/>
                                            <path d="M17.1241 4.33497L19.4016 2.63361C17.3199 0.925234 14.7214 -0.00474227 12.0427 1.81858e-05V2.74175C13.8565 2.73947 15.6283 3.29501 17.1241 4.33497Z" fill="#ADADAD"/>
                                            <path d="M23.7604 11.8715C23.7619 11.1583 23.7003 10.4463 23.5764 9.74414L21.0551 11.6273C21.0551 11.7084 21.0551 11.7895 21.0551 11.8715C21.0558 13.1471 20.7919 14.4086 20.2807 15.5742C19.7695 16.7398 19.0223 17.7835 18.0876 18.6378L19.9062 20.6748C21.1214 19.563 22.0924 18.2048 22.7564 16.6883C23.4204 15.1717 23.7625 13.5307 23.7604 11.8715Z" fill="#ADADAD"/>
                                            <path d="M12.0473 21.0011C10.7886 21.0015 9.54381 20.734 8.39352 20.216C7.24328 19.6979 6.2132 18.9408 5.37001 17.9937L3.36102 19.8358C4.45793 21.0675 5.79803 22.0518 7.29445 22.7249C8.79086 23.3979 10.4101 23.7447 12.0473 23.7428V21.0011Z" fill="#ADADAD"/>
                                            <path d="M6.00548 5.10483L4.18782 3.06787C2.97228 4.17946 2.00086 5.53757 1.33655 7.05412C0.672256 8.57066 0.329915 10.2118 0.331733 11.8711H3.03798C3.03743 10.5956 3.3013 9.33406 3.8125 8.16845C4.3237 7.00288 5.07083 5.95912 6.00548 5.10483Z" fill="#ADADAD"/>
                                        </svg>

                                        <svg
                                            className={`absolute transition-all duration-150 ease-in md:opacity-0 md:translate-y-[50px] md:group-hover:translate-y-0 md:group-hover:opacity-100`}
                                            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.9832 4.61279C21.5397 5.3419 22.0108 6.13402 22.3869 6.97324L11.7164 14.9449L7.25696 12.1118V8.70348L11.7164 11.5366L20.9832 4.61279Z" fill="#21A038"/>
                                            <path d="M2.7054 11.8711C2.7054 11.7182 2.70908 11.5662 2.71644 11.4152L0.0138642 11.281C0.00466551 11.4767 -0.000851226 11.6744 -0.000851226 11.8739C-0.0020011 13.4325 0.300495 14.9759 0.889291 16.4157C1.47808 17.8555 2.34158 19.1633 3.43025 20.2641L5.34726 18.3222C4.50923 17.4764 3.84443 16.471 3.39105 15.3639C2.93767 14.2568 2.70466 13.0697 2.7054 11.8711Z" fill="url(#paint0_linear_6855_41)"/>
                                            <path d="M11.7123 2.74228C11.8631 2.74228 12.013 2.74787 12.162 2.75533L12.2973 0.0154568C12.1035 0.00613431 11.9085 0.00147365 11.7123 0.00147365C10.1736 -0.000427907 8.64989 0.305697 7.22838 0.902268C5.80687 1.49884 4.51564 2.37411 3.42883 3.47783L5.34584 5.42063C6.18051 4.57105 7.17266 3.89705 8.26525 3.43741C9.35783 2.97776 10.5292 2.74152 11.7123 2.74228Z" fill="url(#paint1_linear_6855_41)"/>
                                            <path d="M11.712 21.0011C11.5612 21.0011 11.4112 21.0011 11.2613 20.989L11.1261 23.7279C11.3205 23.7379 11.5158 23.7429 11.712 23.7429C13.25 23.7445 14.773 23.4382 16.1938 22.8414C17.6145 22.2447 18.9049 21.3693 19.9909 20.2656L18.0776 18.3237C17.2427 19.1729 16.2507 19.8465 15.1583 20.3059C14.066 20.7654 12.8948 21.0017 11.712 21.0011Z" fill="url(#paint2_linear_6855_41)"/>
                                            <path d="M16.7915 4.33497L19.0691 2.63361C16.9873 0.925234 14.3888 -0.00474227 11.7101 1.81858e-05V2.74175C13.524 2.73947 15.2958 3.29501 16.7915 4.33497Z" fill="url(#paint3_linear_6855_41)"/>
                                            <path d="M23.4279 11.8715C23.4293 11.1583 23.3677 10.4463 23.2438 9.74414L20.7225 11.6273C20.7225 11.7084 20.7225 11.7895 20.7225 11.8715C20.7232 13.1471 20.4593 14.4086 19.9482 15.5742C19.4369 16.7398 18.6897 17.7835 17.755 18.6378L19.5736 20.6748C20.7888 19.563 21.7599 18.2048 22.4238 16.6883C23.0879 15.1717 23.4299 13.5307 23.4279 11.8715Z" fill="#21A038"/>
                                            <path d="M11.7148 21.0011C10.456 21.0015 9.21123 20.734 8.06094 20.216C6.9107 19.6979 5.88062 18.9408 5.03743 17.9937L3.02844 19.8358C4.12535 21.0675 5.46545 22.0518 6.96187 22.7249C8.45828 23.3979 10.0776 23.7447 11.7148 23.7428V21.0011Z" fill="url(#paint4_linear_6855_41)"/>
                                            <path d="M5.6729 5.10477L3.85524 3.06781C2.6397 4.1794 1.66828 5.53751 1.00397 7.05406C0.339676 8.5706 -0.0026656 10.2117 -0.000847287 11.871H2.7054C2.70484 10.5955 2.96872 9.334 3.47992 8.16839C3.99112 7.00282 4.73825 5.95906 5.6729 5.10477Z" fill="url(#paint5_linear_6855_41)"/>
                                            <defs>
                                                <linearGradient id="paint0_linear_6855_41" x1="3.97758" y1="19.922" x2="0.949777" y2="11.2855" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.14" stop-color="#F1E813"/>
                                                    <stop offset="0.3" stop-color="#E6E418"/>
                                                    <stop offset="0.58" stop-color="#C9DA26"/>
                                                    <stop offset="0.89" stop-color="#A2CC39"/>
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_6855_41" x1="4.20152" y1="3.96259" x2="11.8426" y2="1.08933" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.06" stop-color="#0FA7DF"/>
                                                    <stop offset="0.54" stop-color="#0098F8"/>
                                                    <stop offset="0.92" stop-color="#0290EA"/>
                                                </linearGradient>
                                                <linearGradient id="paint2_linear_6855_41" x1="10.9477" y1="22.0881" x2="19.5705" y2="20.166" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.12" stop-color="#A2CC39"/>
                                                    <stop offset="0.28" stop-color="#86C239"/>
                                                    <stop offset="0.87" stop-color="#219F38"/>
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_6855_41" x1="11.1472" y1="0.918281" x2="18.5267" y2="3.16534" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.06" stop-color="#0290EA"/>
                                                    <stop offset="0.79" stop-color="#0C89CA"/>
                                                </linearGradient>
                                                <linearGradient id="paint4_linear_6855_41" x1="3.7073" y1="19.502" x2="11.7472" y2="22.4669" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.13" stop-color="#F1E813"/>
                                                    <stop offset="0.3" stop-color="#EAE616"/>
                                                    <stop offset="0.53" stop-color="#D8DF1F"/>
                                                    <stop offset="0.8" stop-color="#BAD52D"/>
                                                    <stop offset="0.98" stop-color="#A2CC39"/>
                                                </linearGradient>
                                                <linearGradient id="paint5_linear_6855_41" x1="1.00733" y1="12.2029" x2="4.29978" y2="3.75173" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0.07" stop-color="#A2CC39"/>
                                                    <stop offset="0.26" stop-color="#81C45E"/>
                                                    <stop offset="0.92" stop-color="#0FA7DF"/>
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>

                                <div
                                    className="w-full mt-[2px]  flex flex-col md:flex-row items-center justify-between md:gap-[2px] gap-[4px]">

                                    <div className={`flex items-center md:gap-[2px] gap-[4px]`}>

                                        <div
                                            className={`group overflow-hidden relative cursor-pointer flex items-center justify-center w-[90px] md:w-[92.25px] h-[50px] bg-[#20272A] rounded-[4px] border border-transparent active:border-[#ccc] active:scale-[.95] `}
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
                                            className={`group overflow-hidden relative cursor-pointer flex items-center justify-center w-[90px] md:w-[92.25px] h-[50px] bg-[#20272A] rounded-[4px] border border-transparent active:border-[#ccc] active:scale-[.95]`}
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

                                    <div className={`flex items-center md:gap-[2px] gap-[4px]`}>
                                        <div
                                            className={`group overflow-hidden relative cursor-pointer flex items-center justify-center w-[90px] md:w-[92.25px] h-[50px] bg-[#20272A] rounded-[4px] border border-transparent active:border-[#ccc] active:scale-[.95]`}
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
                                            className={`group overflow-hidden relative cursor-pointer flex items-center justify-center w-[90px] md:w-[91px] h-[50px] bg-[#20272A] rounded-[4px] border border-transparent active:border-[#ccc] active:scale-[.95]`}
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
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className='relative w-full md:max-w-[374px] md:max-h-[480px] rounded-[4px] mr-[2px] ml-[-1px]'>
                        <Image
                            className={`md:min-w-[374px] m-auto h-full rounded-[4px]`}
                            src='/auth/01.png' alt='01' width={375} height={488}/>
                    </div>

                    {/* Анимированный блок с политикой */}
                    <motion.div
                        className={`w-full absolute bottom-[-5%] left-[50%] transform -translate-x-1/2`}
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
                            Нажимая кнопку «Войти в аккаунт» вы соглашаетесь с
                            <Link
                                href="/politic/policy"
                                className={`!text-[#adadad] hover:!text-[#3D9ED6] ${styles["menu-item"]} !text-[16px] font-[300] ml-[4px]`}
                            >
                                политикой конфиденциальности
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}
