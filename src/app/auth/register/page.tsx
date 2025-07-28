'use client'
import {useForm, FormProvider, SubmitHandler} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {emailRegex} from "@/components/Form/validation";
import AppInput from "@/components/forms/elements/AppInput";
import styles from "@/app/page.module.scss";
import Image from "next/image";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";
import HeaderStyles from "@/components/header/Header.module.css";
import PasswordInputWithStrength from "@/app/auth/register/PasswordInputWithStrength";
import UsernameInputWithValidation from "@/app/auth/register/UsernameInputWithValidation";
import {motion} from "framer-motion";
import Link from "next/link";
import FlightSuccess from "@/components/Form/FlightSuccess";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
import {usePathname} from "next/navigation";

// Типизация данных формы
type RegisterFormValues = {
    email: string;
    password: string;
    username: string;
    nickname: string;
    date: string;
};

// Функция для валидации даты
const validateDate = (value: string) => {
    if (!value) return "Введите дату рождения";

    // Проверяем формат ДД.ММ.ГГГГ
    const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = value.match(dateRegex);

    if (!match) {
        return "Неверный формат даты. Используйте ДД.ММ.ГГГГ";
    }

    const [, day, month, year] = match;
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    // Проверяем, что дата валидна
    if (date.getDate() !== parseInt(day) ||
        date.getMonth() !== parseInt(month) - 1 ||
        date.getFullYear() !== parseInt(year)) {
        return "Несуществующая дата";
    }

    // Проверяем, что дата не в будущем
    const today = new Date();
    if (date > today) {
        return "Дата не может быть в будущем";
    }

    // Проверяем, что возраст не менее 13 лет (или другое ограничение)
    const minAge = 13;
    const minDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    if (date > minDate) {
        return `Минимальный возраст: ${minAge} лет`;
    }

    return true;
};

export default function RegisterPage() {
    const methods = useForm<RegisterFormValues>();
    const {register, handleSubmit} = methods;
    const [showPolicy, setShowPolicy] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const pathname = usePathname();

    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
        setShowPolicy(true);
        try {
            console.log("SUBMIT DATA:", data);
            setSubmitted(false);
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
        register("email", {
            required: "Введите email",
            pattern: {
                value: emailRegex,
                message: "Неверный формат email",
            },
        });

        register("date", {
            required: "Введите дату рождения",
            validate: validateDate
        });

        // Регистрируем остальные поля
        register("password", {required: "Введите пароль"});
        register("username", {required: "Введите имя пользователя"});
        register("nickname", {required: "Введите никнейм"});
    }, [register]);

    return (
        <>
            <Breadcrumbs registerUrl={true}/>
            <motion.div
                key={pathname}
                initial={{opacity: 0, y: -30}}
                animate={{opacity: 1, y: 0}}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 6,
                    mass: 0.3,
                }}
                className={`${styles.BlogPageContent} w-full max-w-[860px] md:h-[561px] text-[18px] leading-relaxed whitespace-pre-line md:p-[40px]  p-5 border border-[#353535] rounded-[6px]`}
            >

                {!submitted ? (
                    <div
                        className={`w-full relative flex md:flex-nowrap flex-wrap gap-[30px] items-start justify-between`}>
                        <div className={`h-full w-full md:w-[375px]`}>
                            <FormProvider {...methods}>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    // className="w-full md:w-[375px] space-y-[34.5px] h-full"
                                    className="w-full md:w-[375px] h-full"
                                    onFocus={handleFormInteraction}
                                    onClick={handleFormInteraction}
                                >
                                    <AppInput
                                        className={`${styles.bounceElem} w-full md:w-[375px] mb-[31px] mt-5 md:mt-0`}
                                        type={"email"}
                                        title={"E-mail"}
                                        inputName="email"
                                        required={true}
                                    />

                                    <PasswordInputWithStrength className={`${styles.bounceElem} w-full md:w-[375px]`}/>
                                    <UsernameInputWithValidation
                                        className={`${styles.bounceElem} w-full md:w-[375px]`}/>

                                    <AppInput
                                        className={`${styles.bounceElem} w-full md:w-[375px] my-[34px]`}
                                        title={"Ваш никнейм"}
                                        inputName="Nickname"
                                        required={true}
                                    />

                                    <AppInput
                                        className={`${styles.bounceElem} w-full md:w-[375px] mb-[43px]`}
                                        type={"text"}
                                        title={"Дата рождения"}
                                        inputName="date"
                                        required={true}
                                        mask="date"
                                    />

                                    <div className="relative !w-[220px] md:m-0 m-auto !overflow-hidden">
                                        <button
                                            type="submit"
                                            onMouseMove={handleMouseMove}
                                            onMouseLeave={handleMouseLeave}
                                            className={`${styles.btn} ${styles["register-button"]} ${styles["send-button"]} ${HeaderStyles["login-button"]} !border-[#353535] bg-[rgb(42_42_42/0.1)] group !w-[220px] !h-[51px] flex items-center !justify-center`}
                                            data-text=""
                                        >
                                <span
                                    className="!transition-all !duration-[.13s] !ease-in font-normal text-[#adadad] md:text-[20px] text-[18px] leading-[120%]">
                                    Регистрация
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
                        <div className={`w-full h-full`}>
                            <Image
                                className={`md:min-w-[375px] m-auto h-full md:h-[481px] rounded-[4px] border border-[#353535]`}
                                src='/auth/02.png' alt='03' width={375} height={481}/>
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
                                Используя AUDIO SECTOR, Вы соглашаетесь с
                                <Link
                                    href="/politic"
                                    className={`!text-[#adadad] hover:!text-[#3D9ED6] ${styles["menu-item"]} !text-[16px] font-[300] ml-[4px]`}
                                >
                                    политикой конфиденциальности
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                ) : (
                    <FlightSuccess
                        close={() => setSubmitted(false)}
                        isContactPage={false}
                        isRegisterPage={true}
                        small
                        text="Поздравляем с успешной регистрацией на сайте!"
                        subText="Чтобы полноценно работать в личном кабинете, необходимо активировать ваш аккаунт."
                    />
                )}
            </motion.div>
        </>
    );
}