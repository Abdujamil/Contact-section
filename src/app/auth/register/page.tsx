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

                                    <div className={`relative flex w-full mb-[43px]`}>
                                        <AppInput
                                            className={`${styles.bounceElem} w-full md:w-[314px]`}
                                            type={"text"}
                                            title={"Дата рождения"}
                                            inputName="date"
                                            required={true}
                                            mask="date"
                                        />


                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            className="z-10 cursor-pointer border border-[#353535] rounded-[4px] p-[15px] bg-[#101010]"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M18.3333 1.53846H15.8333V0.769231C15.8333 0.565218 15.7455 0.369561 15.5893 0.225302C15.433 0.0810437 15.221 0 15 0C14.779 0 14.567 0.0810437 14.4107 0.225302C14.2545 0.369561 14.1667 0.565218 14.1667 0.769231V1.53846H5.83333V0.769231C5.83333 0.565218 5.74554 0.369561 5.58926 0.225302C5.43297 0.0810437 5.22101 0 5 0C4.77899 0 4.56703 0.0810437 4.41074 0.225302C4.25446 0.369561 4.16667 0.565218 4.16667 0.769231V1.53846H1.66667C1.22464 1.53846 0.800716 1.70055 0.488155 1.98907C0.175595 2.27758 0 2.6689 0 3.07692V18.4615C0 18.8696 0.175595 19.2609 0.488155 19.5494C0.800716 19.8379 1.22464 20 1.66667 20H18.3333C18.7754 20 19.1993 19.8379 19.5118 19.5494C19.8244 19.2609 20 18.8696 20 18.4615V3.07692C20 2.6689 19.8244 2.27758 19.5118 1.98907C19.1993 1.70055 18.7754 1.53846 18.3333 1.53846ZM4.16667 3.07692V3.84615C4.16667 4.05017 4.25446 4.24582 4.41074 4.39008C4.56703 4.53434 4.77899 4.61538 5 4.61538C5.22101 4.61538 5.43297 4.53434 5.58926 4.39008C5.74554 4.24582 5.83333 4.05017 5.83333 3.84615V3.07692H14.1667V3.84615C14.1667 4.05017 14.2545 4.24582 14.4107 4.39008C14.567 4.53434 14.779 4.61538 15 4.61538C15.221 4.61538 15.433 4.53434 15.5893 4.39008C15.7455 4.24582 15.8333 4.05017 15.8333 3.84615V3.07692H18.3333V6.15385H1.66667V3.07692H4.16667ZM18.3333 18.4615H1.66667V7.69231H18.3333V18.4615Z"
                                                    fill="#878787"/>
                                            </svg>
                                        </button>

                                    </div>

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