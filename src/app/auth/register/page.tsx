// 'use client'
// import {useForm, FormProvider, SubmitHandler} from "react-hook-form";
// import React, {useEffect, useRef, useState} from "react";
// import {emailRegex} from "@/components/Form/validation";
// import AppInput from "@/components/forms/elements/AppInput";
// import styles from "@/app/page.module.scss";
// import Image from "next/image";
// import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";
// import HeaderStyles from "@/components/header/Header.module.css";
// import PasswordInputWithStrength from "@/app/auth/register/PasswordInputWithStrength";
// import UsernameInputWithValidation from "@/app/auth/register/UsernameInputWithValidation";
// import {motion, useAnimation} from "framer-motion";
// import Link from "next/link";
// import FlightSuccess from "@/components/Form/FlightSuccess";
// import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
// import {bounceActiveBlock} from "@/components/Form/bounce";
// import DateInput from "@/components/DatePicker/DateInput";
// import {DatePicker} from "@/components/DatePicker/DatePicker";
// import {useWatch} from "react-hook-form";
//
// // Типизация данных формы
// // type RegisterFormValues = {
// //     email: string;
// //     password: string;
// //     username: string;
// //     nickname: string;
// //     date: string;
// // };
//
// // Функция для валидации даты
// // const validateDate = (value: string) => {
// //     if (!value) return "Введите дату рождения";
// //
// //     // Проверяем формат ДД.ММ.ГГГГ
// //     const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
// //     const match = value.match(dateRegex);
// //
// //     if (!match) {
// //         return "Неверный формат даты. Используйте ДД.ММ.ГГГГ";
// //     }
// //
// //     const [, day, month, year] = match;
// //     const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
// //
// //     // Проверяем, что дата валидна
// //     if (date.getDate() !== parseInt(day) ||
// //         date.getMonth() !== parseInt(month) - 1 ||
// //         date.getFullYear() !== parseInt(year)) {
// //         return "Несуществующая дата";
// //     }
// //
// //     // Проверяем, что дата не в будущем
// //     const today = new Date();
// //     if (date > today) {
// //         return "Дата не может быть в будущем";
// //     }
// //
// //     // Проверяем, что возраст не менее 13 лет (или другое ограничение)
// //     const minAge = 13;
// //     const minDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
// //     if (date > minDate) {
// //         return `Минимальный возраст: ${minAge} лет`;
// //     }
// //
// //     return true;
// // };
// //
// // export default function RegisterPage() {
// //     const methods = useForm<RegisterFormValues>({
// //         shouldFocusError: false
// //     });
// //
// //     const {register, handleSubmit, formState} = methods;
// //     const [showPolicy, setShowPolicy] = useState(false);
// //     const [submitted, setSubmitted] = useState(false);
// //
// //     const [selectedDate, setSelectedDate] = useState("");
// //     const [showDatePicker, setShowDatePicker] = useState(false);
// //     const controls = useAnimation();
// //
// //     const dateValue = useWatch({control: methods.control, name: "date"});
// //     const dateInputRef = useRef<HTMLInputElement | null>(null);
// //
// //     const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
// //         setShowPolicy(true);
// //         try {
// //             console.log("SUBMIT DATA:", data);
// //             setSubmitted(false);
// //         } catch (error) {
// //             console.error(error);
// //             alert('Ошибка сервера');
// //         }
// //     };
// //
// //     // Добавляем обработчик для показа политики при взаимодействии с формой
// //     const handleFormInteraction = () => {
// //         if (!showPolicy) {
// //             setShowPolicy(true);
// //         }
// //     };
// //
// //     const togglePicker = () => {
// //         setShowDatePicker(prev => {
// //             const newState = !prev;
// //             if (newState) {
// //                 setTimeout(() => dateInputRef.current?.focus(), 0);
// //             }
// //             return newState;
// //         });
// //     };
// //
// //     // обработчики для DatePicker
// //     const handleDateSelect = (date: string) => {
// //         console.log("Selected date:", date); // для отладки
// //         setSelectedDate(date);
// //         // Используем setTimeout чтобы избежать конфликтов с состоянием
// //         setTimeout(() => {
// //             methods.setValue("date", date);
// //         }, 0);
// //         setShowDatePicker(false);
// //     };
// //
// //
// //     // const handleDatePickerClose = () => {
// //     //     setShowDatePicker(false);
// //     // };
// //
// //     // const handleDateInputFocus = () => {
// //     //     setShowDatePicker(true);
// //     // };
// //
// //     const [bounce, setBounce] = useState(false);
// //
// //     useEffect(() => {
// //         if (formState.isSubmitted && formState.errors.date) {
// //             setBounce(true);
// //             const t = setTimeout(() => setBounce(false), 500); // длительность bounce-анимации
// //             return () => clearTimeout(t);
// //         }
// //     }, [formState.submitCount, formState.errors.date, formState.isSubmitted]);
// //
// //     const handleDateInputChange = (value: string) => {
// //         methods.setValue("date", value);
// //     };
// //
// //     // Хук для удержания фокуса на инпуте
// //     useEffect(() => {
// //         const keepFocus = (e: MouseEvent) => {
// //             if (showDatePicker && dateInputRef.current) {
// //                 const target = e.target as HTMLElement;
// //                 // Если кликнули не по самому инпуту
// //                 if (target !== dateInputRef.current) {
// //                     e.preventDefault(); // Не даём браузеру забрать фокус
// //                     dateInputRef.current.focus();
// //                 }
// //             }
// //         };
// //
// //         document.addEventListener("mousedown", keepFocus, true);
// //         return () => document.removeEventListener("mousedown", keepFocus, true);
// //     }, [showDatePicker]);
// //
// //     useEffect(() => {
// //         register("email", {
// //             required: "Введите email",
// //             pattern: {
// //                 value: emailRegex,
// //                 message: "Неверный формат email",
// //             },
// //         });
// //
// //         register("date", {
// //             required: "Введите дату рождения",
// //             validate: validateDate
// //         });
// //
// //         register("password", {required: "Введите пароль"});
// //         register("username", {required: "Введите имя пользователя"});
// //         register("nickname", {required: "Введите никнейм"});
// //
// //         // Если есть начальная дата, устанавливаем ее
// //         if (selectedDate) {
// //             methods.setValue("date", selectedDate);
// //         }
// //     }, [register]); // Убираем selectedDate из зависимостей
// //
// //     // Синхронизируем selectedDate с dateValue из формы
// //     useEffect(() => {
// //         if (dateValue && dateValue !== selectedDate) {
// //             setSelectedDate(dateValue);
// //         }
// //     }, [dateValue]);
// //
// //     // Устанавливаем начальное значение selectedDate из dateValue
// //     useEffect(() => {
// //         if (dateValue) {
// //             setSelectedDate(dateValue);
// //         }
// //     }, []); // Выполняется только при монтировании
// //
// //     useEffect(() => {
// //         bounceActiveBlock('register', controls);
// //     }, [controls]);
// //
// //     useEffect(() => {
// //         if (selectedDate) {
// //             methods.setValue("date", selectedDate);
// //         }
// //     }, [register]);
// //
// //     return (
// //         <>
// //             <Breadcrumbs registerUrl={true}/>
// //             <motion.div
// //                 id="auth-register"
// //                 initial={{y: 20, opacity: 1}}
// //                 animate={controls}
// //                 className={`${styles.registerContent} ${styles.BlogPageContent} relative !backdrop-blur-0 w-full max-w-[860px] md:h-[561px] text-[18px] leading-relaxed whitespace-pre-line md:p-[40px]  p-5 border border-[#353535] rounded-[6px]`}
// //             >
// //
// //                 {!submitted ? (
// //                     <div
// //                         className={`w-full relative flex md:flex-nowrap flex-wrap gap-[30px] items-start justify-between`}>
// //                         <div className={`h-full w-full md:w-[374px]`}>
// //                             <FormProvider {...methods}>
// //                                 <form
// //                                     onSubmit={handleSubmit(onSubmit)}
// //                                     className="w-full md:w-[374px] h-full"
// //                                     onFocus={handleFormInteraction}
// //                                     onClick={handleFormInteraction}
// //                                 >
// //                                     <AppInput
// //                                         className={`${styles.bounceElem} w-full md:w-[374px] mb-[33px] mt-5 md:mt-0`}
// //                                         type={"email"}
// //                                         title={"E-mail"}
// //                                         inputName="email"
// //                                         required={true}
// //                                     />
// //
// //                                     <PasswordInputWithStrength className={`${styles.bounceElem}`}/>
// //                                     <UsernameInputWithValidation
// //                                         className={`${styles.bounceElem} w-full md:w-[374px]`}/>
// //
// //                                     <AppInput
// //                                         className={`${styles.bounceElem} w-full md:w-[374px] my-[33px]`}
// //                                         title={"Ваш никнейм"}
// //                                         inputName="Nickname"
// //                                         required={true}
// //                                     />
// //
// //                                     <div
// //                                         className={`relative mb-[41px] flex items-center justify-between`}
// //                                     >
// //                                         <DateInput
// //                                             ref={dateInputRef}
// //                                             title="Дата рождения"
// //                                             inputName="date"
// //                                             required
// //                                             value={methods.watch("date") || ""}
// //                                             onChange={handleDateInputChange}
// //                                             className={`${styles.bounceElem} w-[290px] md:w-[313px]`}
// //                                         />
// //
// //                                         <button
// //                                             type="button"
// //                                             onClick={togglePicker}
// //                                             className={`active:scale-[.95] ${bounce ? 'bounce' : ''} ${showDatePicker ? 'border-[#737373] !bg-[#20272a]' : ''}  flex items-center justify-center w-[51px] h-[51px] z-10 cursor-pointer border border-[#353535] rounded-[4px]  bg-[#101010] hover:bg-[#20272A] hover:border-[#737373] transition-colors duration-300`}
// //                                         >
// //                                             <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                                                 <path d="M18.8333 1.61551H16.3333V0.807814C16.3333 0.593601 16.2455 0.388161 16.0893 0.23669C15.933 0.0852179 15.721 0.00012207 15.5 0.00012207C15.279 0.00012207 15.067 0.0852179 14.9107 0.23669C14.7545 0.388161 14.6667 0.593601 14.6667 0.807814V1.61551H6.33333V0.807814C6.33333 0.593601 6.24554 0.388161 6.08926 0.23669C5.93298 0.0852179 5.72101 0.00012207 5.5 0.00012207C5.27899 0.00012207 5.06702 0.0852179 4.91074 0.23669C4.75446 0.388161 4.66667 0.593601 4.66667 0.807814V1.61551H2.16667C1.72464 1.61551 1.30072 1.7857 0.988155 2.08864C0.675595 2.39159 0.5 2.80246 0.5 3.23089V19.3847C0.5 19.8132 0.675595 20.224 0.988155 20.527C1.30072 20.8299 1.72464 21.0001 2.16667 21.0001H18.8333C19.2754 21.0001 19.6993 20.8299 20.0118 20.527C20.3244 20.224 20.5 19.8132 20.5 19.3847V3.23089C20.5 2.80246 20.3244 2.39159 20.0118 2.08864C19.6993 1.7857 19.2754 1.61551 18.8333 1.61551ZM4.66667 3.23089V4.03858C4.66667 4.2528 4.75446 4.45824 4.91074 4.60971C5.06702 4.76118 5.27899 4.84628 5.5 4.84628C5.72101 4.84628 5.93298 4.76118 6.08926 4.60971C6.24554 4.45824 6.33333 4.2528 6.33333 4.03858V3.23089H14.6667V4.03858C14.6667 4.2528 14.7545 4.45824 14.9107 4.60971C15.067 4.76118 15.279 4.84628 15.5 4.84628C15.721 4.84628 15.933 4.76118 16.0893 4.60971C16.2455 4.45824 16.3333 4.2528 16.3333 4.03858V3.23089H18.8333V6.46166H2.16667V3.23089H4.66667ZM18.8333 19.3847H2.16667V8.07705H18.8333V19.3847Z" fill="#878787"/>
// //                                             </svg>
// //                                         </button>
// //                                     </div>
// //
// //                                     <div className="relative !w-[220px] md:m-0 m-auto !overflow-hidden">
// //                                         <button
// //                                             type="submit"
// //                                             onMouseMove={handleMouseMove}
// //                                             onMouseLeave={handleMouseLeave}
// //                                             className={`${styles.btn} ${styles["register-button"]} ${styles["send-button"]} ${HeaderStyles["login-button"]} !border-[#353535] bg-[rgb(42_42_42/0.1)] group !w-[220px] !h-[51px] flex items-center !justify-center`}
// //                                             data-text=""
// //                                         >
// //                                             <span
// //                                                 className="!transition-all !duration-[.13s] !ease-in font-normal text-[#adadad] md:text-[20px] text-[18px] leading-[120%]">
// //                                                 Регистрация
// //                                             </span>
// //                                             <svg
// //                                                 className={`${styles.sendIconRight} mt-[4px] transition-all !duration-[.13s] ease-in`}
// //                                                 width="16" height="17" viewBox="0 0 16 17" fill="none"
// //                                                 xmlns="http://www.w3.org/2000/svg">
// //                                                 <path
// //                                                     d="M3 9.5V7.5H0V9.5H3ZM8.96767 1.5L7.52908 2.93076L12.1092 7.48713H6V9.51185H12.1092L7.52908 14.0682L8.96767 15.5L16 8.5L15.2822 7.78462L14.5634 7.06823L8.96767 1.5Z"
// //                                                     fill="#ADADAD"/>
// //                                             </svg>
// //                                         </button>
// //                                         <div className={styles.highlight}/>
// //                                     </div>
// //                                 </form>
// //                             </FormProvider>
// //                         </div>
// //                         <div className={`relative w-[374px] h-[479px]`}>
// //                             <Image
// //                                 className={`rounded-[4px]`}
// //                                 src='/auth/02.png' alt='03' fill/>
// //                         </div>
// //
// //                         {/* Анимированный блок с политикой */}
// //                         <motion.div
// //                             className={`w-full absolute bottom-[-14.3%] left-[50%] transform -translate-x-1/2`}
// //                             initial={{y: 20, opacity: 0}}
// //                             animate={
// //                                 showPolicy ? {y: 10, opacity: 1} : {y: -4, opacity: 0}
// //                             }
// //                             transition={{
// //                                 type: "spring",
// //                                 stiffness: 300,
// //                                 damping: 4, // Меньше значение = больше отскок
// //                                 mass: 0.3, // Добавляем массу для более "пружинистого" эффекта
// //                             }}
// //                         >
// //                             <p
// //                                 className={`font-[Rubik] hidden md:block text-center text-[#adadad] text-[16px]`}
// //                             >
// //                                 Нажимая кнопку «Регистрация» вы соглашаетесь с
// //                                 <Link
// //                                     href="/politic/policy"
// //                                     className={`!text-[#adadad] hover:!text-[#3D9ED6] ${styles["menu-item"]} !text-[16px] font-[300] ml-[4px]`}
// //                                 >
// //                                     политикой конфиденциальности
// //                                 </Link>
// //                             </p>
// //                         </motion.div>
// //                     </div>
// //                 ) : (
// //                     <FlightSuccess
// //                         close={() => setSubmitted(false)}
// //                         isContactPage={false}
// //                         isRegisterPage={true}
// //                         small
// //                         text="Поздравляем с успешной регистрацией на сайте!"
// //                         subText="Чтобы полноценно работать в личном кабинете, необходимо активировать ваш аккаунт."
// //                     />
// //                 )}
// //
// //                 {/* DataPicker */}
// //                 <DatePicker
// //                     isVisible={showDatePicker}
// //                     onDateSelect={handleDateSelect}
// //                     onClose={() => setShowDatePicker(false)}
// //                     initialDate={selectedDate || ""}
// //                 />
// //             </motion.div>
// //
// //         </>
// //     );
// // }
//
//
// // Типизация данных формы
// type RegisterFormValues = {
//     email: string;
//     password: string;
//     username: string;
//     nickname: string;
//     date: string;
// };
//
// // Функция для валидации email
// const validateEmail = (value: string) => {
//     const trimmedValue = value.trim();
//
//     if (!trimmedValue) {
//         return "Введите email";
//     }
//
//     const isValidEmail = emailRegex.test(trimmedValue);
//
//     if (!isValidEmail) {
//         return "Неверный формат email";
//     }
//
//     return true;
// };
//
// // Функция для валидации даты
// const validateDate = (value: string) => {
//     if (!value) return "Введите дату рождения";
//
//     // Проверяем формат ДД.ММ.ГГГГ
//     const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
//     const match = value.match(dateRegex);
//
//     if (!match) {
//         return "Неверный формат даты. Используйте ДД.ММ.ГГГГ";
//     }
//
//     const [, day, month, year] = match;
//     const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
//
//     // Проверяем, что дата валидна
//     if (date.getDate() !== parseInt(day) ||
//         date.getMonth() !== parseInt(month) - 1 ||
//         date.getFullYear() !== parseInt(year)) {
//         return "Несуществующая дата";
//     }
//
//     // Проверяем, что дата не в будущем
//     const today = new Date();
//     if (date > today) {
//         return "Дата не может быть в будущем";
//     }
//
//     // Проверяем, что возраст не менее 13 лет (или другое ограничение)
//     const minAge = 13;
//     const minDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
//     if (date > minDate) {
//         return `Минимальный возраст: ${minAge} лет`;
//     }
//
//     return true;
// };
//
// export default function RegisterPage() {
//     const methods = useForm<RegisterFormValues>({
//         shouldFocusError: false
//     });
//
//     const {register, handleSubmit, formState} = methods;
//     const [showPolicy, setShowPolicy] = useState(false);
//     const [submitted, setSubmitted] = useState(false);
//
//     const [selectedDate, setSelectedDate] = useState("");
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const controls = useAnimation();
//
//     // Состояния для визуальной индикации email
//     const [emailSuccessful, setEmailSuccessful] = useState(false);
//     const [emailError, setEmailError] = useState(false);
//
//     const dateValue = useWatch({control: methods.control, name: "date"});
//     const emailValue = useWatch({control: methods.control, name: "email"});
//     const dateInputRef = useRef<HTMLInputElement | null>(null);
//
//     const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
//         setShowPolicy(true);
//         try {
//             console.log("SUBMIT DATA:", data);
//             setSubmitted(false);
//         } catch (error) {
//             console.error(error);
//             alert('Ошибка сервера');
//         }
//     };
//
//     // Добавляем обработчик для показа политики при взаимодействии с формой
//     const handleFormInteraction = () => {
//         if (!showPolicy) {
//             setShowPolicy(true);
//         }
//     };
//
//     const togglePicker = () => {
//         setShowDatePicker(prev => {
//             const newState = !prev;
//             if (newState) {
//                 setTimeout(() => dateInputRef.current?.focus(), 0);
//             }
//             return newState;
//         });
//     };
//
//     // обработчики для DatePicker
//     const handleDateSelect = (date: string) => {
//         console.log("Selected date:", date); // для отладки
//         setSelectedDate(date);
//         // Используем setTimeout чтобы избежать конфликтов с состоянием
//         setTimeout(() => {
//             methods.setValue("date", date);
//         }, 0);
//         setShowDatePicker(false);
//     };
//
//     const [bounce, setBounce] = useState(false);
//
//     useEffect(() => {
//         if (formState.isSubmitted && formState.errors.date) {
//             setBounce(true);
//             const t = setTimeout(() => setBounce(false), 500); // длительность bounce-анимации
//             return () => clearTimeout(t);
//         }
//     }, [formState.submitCount, formState.errors.date, formState.isSubmitted]);
//
//     const handleDateInputChange = (value: string) => {
//         methods.setValue("date", value);
//     };
//
//     // Хук для удержания фокуса на инпуте
//     useEffect(() => {
//         const keepFocus = (e: MouseEvent) => {
//             if (showDatePicker && dateInputRef.current) {
//                 const target = e.target as HTMLElement;
//                 // Если кликнули не по самому инпуту
//                 if (target !== dateInputRef.current) {
//                     e.preventDefault(); // Не даём браузеру забрать фокус
//                     dateInputRef.current.focus();
//                 }
//             }
//         };
//
//         document.addEventListener("mousedown", keepFocus, true);
//         return () => document.removeEventListener("mousedown", keepFocus, true);
//     }, [showDatePicker]);
//
//     // Отслеживание изменений email для визуальной индикации
//     useEffect(() => {
//         if (emailValue) {
//             const trimmedValue = emailValue.trim();
//             const isValidEmail = emailRegex.test(trimmedValue);
//             setEmailError(!isValidEmail);
//             setEmailSuccessful(isValidEmail);
//         } else {
//             setEmailError(false);
//             setEmailSuccessful(false);
//         }
//     }, [emailValue]);
//
//     useEffect(() => {
//         register("email", {
//             required: "Введите email",
//             validate: validateEmail, // Используем нашу функцию валидации
//         });
//
//         register("date", {
//             required: "Введите дату рождения",
//             validate: validateDate
//         });
//
//         register("password", {required: "Введите пароль"});
//         register("username", {required: "Введите имя пользователя"});
//         register("nickname", {required: "Введите никнейм"});
//
//         // Если есть начальная дата, устанавливаем ее
//         if (selectedDate) {
//             methods.setValue("date", selectedDate);
//         }
//     }, [register]); // Убираем selectedDate из зависимостей
//
//     // Синхронизируем selectedDate с dateValue из формы
//     useEffect(() => {
//         if (dateValue && dateValue !== selectedDate) {
//             setSelectedDate(dateValue);
//         }
//     }, [dateValue]);
//
//     // Устанавливаем начальное значение selectedDate из dateValue
//     useEffect(() => {
//         if (dateValue) {
//             setSelectedDate(dateValue);
//         }
//     }, []); // Выполняется только при монтировании
//
//     useEffect(() => {
//         bounceActiveBlock('register', controls);
//     }, [controls]);
//
//     useEffect(() => {
//         if (selectedDate) {
//             methods.setValue("date", selectedDate);
//         }
//     }, [register]);
//
//     return (
//         <>
//             <Breadcrumbs registerUrl={true}/>
//             <motion.div
//                 id="auth-register"
//                 initial={{y: 20, opacity: 1}}
//                 animate={controls}
//                 className={`${styles.registerContent} ${styles.BlogPageContent} relative !backdrop-blur-0 w-full max-w-[860px] md:h-[561px] text-[18px] leading-relaxed whitespace-pre-line md:p-[40px]  p-5 border border-[#353535] rounded-[6px]`}
//             >
//
//                 {!submitted ? (
//                     <div
//                         className={`w-full relative flex md:flex-nowrap flex-wrap gap-[30px] items-start justify-between`}>
//                         <div className={`h-full w-full md:w-[374px]`}>
//                             <FormProvider {...methods}>
//                                 <form
//                                     onSubmit={handleSubmit(onSubmit)}
//                                     className="w-full md:w-[374px] h-full"
//                                     onFocus={handleFormInteraction}
//                                     onClick={handleFormInteraction}
//                                 >
//                                     <AppInput
//                                         className={`${styles.bounceElem} w-full md:w-[374px] mb-[33px] mt-5 md:mt-0`}
//                                         type={"email"}
//                                         title={"E-mail"}
//                                         inputName="email"
//                                         required={true}
//                                     />
//
//                                     <PasswordInputWithStrength className={`${styles.bounceElem}`}/>
//                                     <UsernameInputWithValidation
//                                         className={`${styles.bounceElem} w-full md:w-[374px]`}/>
//
//                                     <AppInput
//                                         className={`${styles.bounceElem} w-full md:w-[374px] my-[33px]`}
//                                         title={"Ваш никнейм"}
//                                         inputName="nickname"
//                                         required={true}
//                                     />
//
//                                     <div
//                                         className={`relative mb-[41px] flex items-center justify-between`}
//                                     >
//                                         <DateInput
//                                             ref={dateInputRef}
//                                             title="Дата рождения"
//                                             inputName="date"
//                                             required
//                                             value={methods.watch("date") || ""}
//                                             onChange={handleDateInputChange}
//                                             className={`${styles.bounceElem} w-[290px] md:w-[313px]`}
//                                         />
//
//                                         <button
//                                             type="button"
//                                             onClick={togglePicker}
//                                             className={`active:scale-[.95] ${bounce ? 'bounce' : ''} ${showDatePicker ? 'border-[#737373] !bg-[#20272a]' : ''}  flex items-center justify-center w-[51px] h-[51px] z-10 cursor-pointer border border-[#353535] rounded-[4px]  bg-[#101010] hover:bg-[#20272A] hover:border-[#737373] transition-colors duration-300`}
//                                         >
//                                             <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M18.8333 1.61551H16.3333V0.807814C16.3333 0.593601 16.2455 0.388161 16.0893 0.23669C15.933 0.0852179 15.721 0.00012207 15.5 0.00012207C15.279 0.00012207 15.067 0.0852179 14.9107 0.23669C14.7545 0.388161 14.6667 0.593601 14.6667 0.807814V1.61551H6.33333V0.807814C6.33333 0.593601 6.24554 0.388161 6.08926 0.23669C5.93298 0.0852179 5.72101 0.00012207 5.5 0.00012207C5.27899 0.00012207 5.06702 0.0852179 4.91074 0.23669C4.75446 0.388161 4.66667 0.593601 4.66667 0.807814V1.61551H2.16667C1.72464 1.61551 1.30072 1.7857 0.988155 2.08864C0.675595 2.39159 0.5 2.80246 0.5 3.23089V19.3847C0.5 19.8132 0.675595 20.224 0.988155 20.527C1.30072 20.8299 1.72464 21.0001 2.16667 21.0001H18.8333C19.2754 21.0001 19.6993 20.8299 20.0118 20.527C20.3244 20.224 20.5 19.8132 20.5 19.3847V3.23089C20.5 2.80246 20.3244 2.39159 20.0118 2.08864C19.6993 1.7857 19.2754 1.61551 18.8333 1.61551ZM4.66667 3.23089V4.03858C4.66667 4.2528 4.75446 4.45824 4.91074 4.60971C5.06702 4.76118 5.27899 4.84628 5.5 4.84628C5.72101 4.84628 5.93298 4.76118 6.08926 4.60971C6.24554 4.45824 6.33333 4.2528 6.33333 4.03858V3.23089H14.6667V4.03858C14.6667 4.2528 14.7545 4.45824 14.9107 4.60971C15.067 4.76118 15.279 4.84628 15.5 4.84628C15.721 4.84628 15.933 4.76118 16.0893 4.60971C16.2455 4.45824 16.3333 4.2528 16.3333 4.03858V3.23089H18.8333V6.46166H2.16667V3.23089H4.66667ZM18.8333 19.3847H2.16667V8.07705H18.8333V19.3847Z" fill="#878787"/>
//                                             </svg>
//                                         </button>
//                                     </div>
//
//                                     <div className="relative !w-[220px] md:m-0 m-auto !overflow-hidden">
//                                         <button
//                                             type="submit"
//                                             onMouseMove={handleMouseMove}
//                                             onMouseLeave={handleMouseLeave}
//                                             className={`${styles.btn} ${styles["register-button"]} ${styles["send-button"]} ${HeaderStyles["login-button"]} !border-[#353535] bg-[rgb(42_42_42/0.1)] group !w-[220px] !h-[51px] flex items-center !justify-center`}
//                                             data-text=""
//                                         >
//                                             <span
//                                                 className="!transition-all !duration-[.13s] !ease-in font-normal text-[#adadad] md:text-[20px] text-[18px] leading-[120%]">
//                                                 Регистрация
//                                             </span>
//                                             <svg
//                                                 className={`${styles.sendIconRight} mt-[4px] transition-all !duration-[.13s] ease-in`}
//                                                 width="16" height="17" viewBox="0 0 16 17" fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg">
//                                                 <path
//                                                     d="M3 9.5V7.5H0V9.5H3ZM8.96767 1.5L7.52908 2.93076L12.1092 7.48713H6V9.51185H12.1092L7.52908 14.0682L8.96767 15.5L16 8.5L15.2822 7.78462L14.5634 7.06823L8.96767 1.5Z"
//                                                     fill="#ADADAD"/>
//                                             </svg>
//                                         </button>
//                                         <div className={styles.highlight}/>
//                                     </div>
//                                 </form>
//                             </FormProvider>
//                         </div>
//                         <div className={`relative w-[374px] h-[479px]`}>
//                             <Image
//                                 className={`rounded-[4px]`}
//                                 src='/auth/02.png' alt='03' fill/>
//                         </div>
//
//                         {/* Анимированный блок с политикой */}
//                         <motion.div
//                             className={`w-full absolute bottom-[-14.3%] left-[50%] transform -translate-x-1/2`}
//                             initial={{y: 20, opacity: 0}}
//                             animate={
//                                 showPolicy ? {y: 10, opacity: 1} : {y: -4, opacity: 0}
//                             }
//                             transition={{
//                                 type: "spring",
//                                 stiffness: 300,
//                                 damping: 4, // Меньше значение = больше отскок
//                                 mass: 0.3, // Добавляем массу для более "пружинистого" эффекта
//                             }}
//                         >
//                             <p
//                                 className={`font-[Rubik] hidden md:block text-center text-[#adadad] text-[16px]`}
//                             >
//                                 Нажимая кнопку «Регистрация» вы соглашаетесь с
//                                 <Link
//                                     href="/politic/policy"
//                                     className={`!text-[#adadad] hover:!text-[#3D9ED6] ${styles["menu-item"]} !text-[16px] font-[300] ml-[4px]`}
//                                 >
//                                     политикой конфиденциальности
//                                 </Link>
//                             </p>
//                         </motion.div>
//                     </div>
//                 ) : (
//                     <FlightSuccess
//                         close={() => setSubmitted(false)}
//                         isContactPage={false}
//                         isRegisterPage={true}
//                         small
//                         text="Поздравляем с успешной регистрацией на сайте!"
//                         subText="Чтобы полноценно работать в личном кабинете, необходимо активировать ваш аккаунт."
//                     />
//                 )}
//
//                 {/* DataPicker */}
//                 <DatePicker
//                     isVisible={showDatePicker}
//                     onDateSelect={handleDateSelect}
//                     onClose={() => setShowDatePicker(false)}
//                     initialDate={selectedDate || ""}
//                 />
//             </motion.div>
//
//         </>
//     );
// }

'use client'
import {useForm, FormProvider, SubmitHandler} from "react-hook-form";
import React, {useEffect, useRef, useState} from "react";
import {emailRegex} from "@/components/Form/validation";
import AppInput from "@/components/forms/elements/AppInput";
import styles from "@/app/page.module.scss";
import Image from "next/image";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";
import HeaderStyles from "@/components/header/Header.module.css";
import PasswordInputWithStrength from "@/app/auth/register/PasswordInputWithStrength";
import UsernameInputWithValidation from "@/app/auth/register/UsernameInputWithValidation";
import {motion, useAnimation} from "framer-motion";
import Link from "next/link";
import FlightSuccess from "@/components/Form/FlightSuccess";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
import {bounceActiveBlock} from "@/components/Form/bounce";
import DateInput from "@/components/DatePicker/DateInput";
// import {DatePicker} from "@/components/DatePicker/DatePicker";
import {useWatch} from "react-hook-form";
import {usePathname} from "next/navigation";
import {useIsMac} from "@/components/hooks/useOperatingSystem";

// Типизация данных формы
type RegisterFormValues = {
    email: string;
    password: string;
    username: string;
    nickname: string;
    date: string;
};

// Функция для валидации email
const validateEmail = (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
        return "Введите email";
    }

    const isValidEmail = emailRegex.test(trimmedValue);

    if (!isValidEmail) {
        return "Неверный формат email";
    }

    return true;
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
    const pathname = usePathname();
    const methods = useForm<RegisterFormValues>({
        shouldFocusError: false,
        defaultValues: {
            email: "",
            password: "",
            username: "",
            nickname: "",
            date: ""
        }
    });

    const {register, handleSubmit, formState} = methods;
    const [showPolicy, setShowPolicy] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [selectedDate, setSelectedDate] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const controls = useAnimation();

    // Состояния для визуальной индикации email
    const [emailSuccessful, setEmailSuccessful] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const dateValue = useWatch({control: methods.control, name: "date"});
    const emailValue = useWatch({control: methods.control, name: "email"});
    const dateInputRef = useRef<HTMLInputElement | null>(null);

    const isMac = useIsMac();

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

    // const togglePicker = () => {
    //     setShowDatePicker(prev => {
    //         const newState = !prev;
    //         if (newState) {
    //             setTimeout(() => dateInputRef.current?.focus(), 0);
    //         }
    //         return newState;
    //     });
    // };

    // обработчики для DatePicker
    // const handleDateSelect = (date: string) => {
    //     console.log("Selected date:", date); // для отладки
    //     setSelectedDate(date);
    //     // Используем setTimeout чтобы избежать конфликтов с состоянием
    //     setTimeout(() => {
    //         methods.setValue("date", date);
    //     }, 0);
    //     setShowDatePicker(false);
    // };

    const [bounce, setBounce] = useState(false);

    useEffect(() => {
        if (formState.isSubmitted && formState.errors.date) {
            setBounce(true);
            const t = setTimeout(() => setBounce(false), 500); // длительность bounce-анимации
            return () => clearTimeout(t);
        }
    }, [formState.submitCount, formState.errors.date, formState.isSubmitted]);

    const handleDateInputChange = (value: string) => {
        methods.setValue("date", value);
    };

    // Хук для удержания фокуса на инпуте
    useEffect(() => {
        const keepFocus = (e: MouseEvent) => {
            if (showDatePicker && dateInputRef.current) {
                const target = e.target as HTMLElement;
                // Если кликнули не по самому инпуту
                if (target !== dateInputRef.current) {
                    e.preventDefault(); // Не даём браузеру забрать фокус
                    dateInputRef.current.focus();
                }
            }
        };

        document.addEventListener("mousedown", keepFocus, true);
        return () => document.removeEventListener("mousedown", keepFocus, true);
    }, [showDatePicker]);

    // Отслеживание изменений email для визуальной индикации
    useEffect(() => {
        if (emailValue) {
            const trimmedValue = emailValue.trim();
            const isValidEmail = emailRegex.test(trimmedValue);
            setEmailError(!isValidEmail && trimmedValue.length > 0);
            setEmailSuccessful(isValidEmail);
        } else {
            setEmailError(false);
            setEmailSuccessful(false);
        }
    }, [emailValue]);

    useEffect(() => {
        register("email", {
            required: "Введите email",
            validate: validateEmail, // Используем нашу функцию валидации
        });

        register("date", {
            required: "Введите дату рождения",
            validate: validateDate
        });

        register("password", {required: "Введите пароль"});
        register("username", {required: "Введите имя пользователя"});
        register("nickname", {required: "Введите никнейм"});

        // Если есть начальная дата, устанавливаем ее
        if (selectedDate) {
            methods.setValue("date", selectedDate);
        }
    }, [register]);

    // Синхронизируем selectedDate с dateValue из формы
    useEffect(() => {
        if (dateValue && dateValue !== selectedDate) {
            setSelectedDate(dateValue);
        }
    }, [dateValue]);

    // Устанавливаем начальное значение selectedDate из dateValue
    useEffect(() => {
        if (dateValue) {
            setSelectedDate(dateValue);
        }
    }, []); // Выполняется только при монтировании

    useEffect(() => {
        bounceActiveBlock('register', controls);
    }, [controls]);

    useEffect(() => {
        if (selectedDate) {
            methods.setValue("date", selectedDate);
        }
    }, [register]);

    useEffect(() => {
        methods.reset({
            email: "",
            password: "",
            username: "",
            nickname: "",
            date: ""
        });
        setEmailSuccessful(false);
        setEmailError(false);
        setShowPolicy(false);
        setSelectedDate("");
        setShowDatePicker(false);
    }, [pathname, methods]);

    return (
        <>
            <Breadcrumbs registerUrl={true}/>
            <motion.div
                key={pathname}
                id="auth-register"
                initial={{y: 0, opacity: 1}}
                animate={controls}
                className={`${styles.registerContent} ${styles.BlogPageContent} relative w-full max-w-[860px] md:h-[561px] text-[18px] leading-relaxed whitespace-pre-line md:p-[40px]  p-5 border border-[#353535] rounded-[6px]`}
            >

                {!submitted ? (
                    <div
                        className={`w-full relative flex md:flex-nowrap flex-wrap gap-[30px] items-start justify-between`}>
                        <div className={`h-full w-full md:w-[374px]`}>
                            <FormProvider {...methods}>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="w-full md:w-[374px] h-full"
                                    onFocus={handleFormInteraction}
                                    onClick={handleFormInteraction}
                                >
                                    <AppInput
                                        className={`${styles.bounceElem} w-full md:w-[371px] mt-5 md:mt-0`}
                                        type={"email"}
                                        title={"E-mail"}
                                        inputName="email"
                                        required={true}
                                        fail={emailError}
                                        isValid={emailSuccessful}
                                    />

                                    <PasswordInputWithStrength className={`${styles.bounceElem}`}/>

                                    <UsernameInputWithValidation
                                        className={`${styles.bounceElem} w-full md:w-[371px]`}/>

                                    <AppInput
                                        className={`${styles.bounceElem} w-full md:w-[371px]`}
                                        title={"Ваш никнейм"}
                                        inputName="nickname"
                                        required={true}
                                    />

                                    <div
                                        className={`relative mb-[41px]`}
                                    >
                                        <DateInput
                                            ref={dateInputRef}
                                            title="Дата рождения"
                                            inputName="date"
                                            required
                                            value={methods.watch("date") || ""}
                                            onChange={handleDateInputChange}
                                            className={`${styles.bounceElem} w-[290px] md:w-[313px]`}
                                        />

                                        {/*<button*/}
                                        {/*    type="button"*/}
                                        {/*    onClick={togglePicker}*/}
                                        {/*    className={`active:scale-[.95] ${bounce ? 'bounce' : ''} ${showDatePicker ? 'border-[#737373] !bg-[#20272a]' : ''}  flex items-center justify-center w-[51px] h-[51px] z-10 cursor-pointer border border-[#353535] rounded-[4px]  bg-[#101010] hover:bg-[#20272A] hover:border-[#737373] transition-colors duration-300`}*/}
                                        {/*>*/}
                                        {/*    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                        {/*        <path d="M18.8333 1.61551H16.3333V0.807814C16.3333 0.593601 16.2455 0.388161 16.0893 0.23669C15.933 0.0852179 15.721 0.00012207 15.5 0.00012207C15.279 0.00012207 15.067 0.0852179 14.9107 0.23669C14.7545 0.388161 14.6667 0.593601 14.6667 0.807814V1.61551H6.33333V0.807814C6.33333 0.593601 6.24554 0.388161 6.08926 0.23669C5.93298 0.0852179 5.72101 0.00012207 5.5 0.00012207C5.27899 0.00012207 5.06702 0.0852179 4.91074 0.23669C4.75446 0.388161 4.66667 0.593601 4.66667 0.807814V1.61551H2.16667C1.72464 1.61551 1.30072 1.7857 0.988155 2.08864C0.675595 2.39159 0.5 2.80246 0.5 3.23089V19.3847C0.5 19.8132 0.675595 20.224 0.988155 20.527C1.30072 20.8299 1.72464 21.0001 2.16667 21.0001H18.8333C19.2754 21.0001 19.6993 20.8299 20.0118 20.527C20.3244 20.224 20.5 19.8132 20.5 19.3847V3.23089C20.5 2.80246 20.3244 2.39159 20.0118 2.08864C19.6993 1.7857 19.2754 1.61551 18.8333 1.61551ZM4.66667 3.23089V4.03858C4.66667 4.2528 4.75446 4.45824 4.91074 4.60971C5.06702 4.76118 5.27899 4.84628 5.5 4.84628C5.72101 4.84628 5.93298 4.76118 6.08926 4.60971C6.24554 4.45824 6.33333 4.2528 6.33333 4.03858V3.23089H14.6667V4.03858C14.6667 4.2528 14.7545 4.45824 14.9107 4.60971C15.067 4.76118 15.279 4.84628 15.5 4.84628C15.721 4.84628 15.933 4.76118 16.0893 4.60971C16.2455 4.45824 16.3333 4.2528 16.3333 4.03858V3.23089H18.8333V6.46166H2.16667V3.23089H4.66667ZM18.8333 19.3847H2.16667V8.07705H18.8333V19.3847Z" fill="#878787"/>*/}
                                        {/*    </svg>*/}
                                        {/*</button>*/}
                                    </div>

                                    <div className="relative !w-[222px] md:m-0 m-auto !overflow-hidden">
                                        <button
                                            type="submit"
                                            onMouseMove={handleMouseMove}
                                            onMouseLeave={handleMouseLeave}
                                            className={`${styles.btn} ${styles["register-button"]} ${styles["send-button"]} ${HeaderStyles["login-button"]} !border-[#353535] bg-[rgb(42_42_42/0.1)] group !w-[220px] !h-[51px] flex items-center !justify-center`}
                                            data-text=""
                                        >
                                            <span
                                                className="!font-[Roboto] !font-[300] !transition-all !duration-[.13s] !ease-in text-[#adadad] md:text-[20px] text-[18px] leading-[120%]">
                                                Регистрация
                                            </span>
                                            <svg
                                                className={`${styles.sendIconRight} mt-[4px] transition-all !duration-[.13s] ease-in`}
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
                        <div className={`relative w-[374px] h-[479px]`}>
                            <Image
                                className={`rounded-[4px]`}
                                src='/auth/02.png' alt='03' fill/>
                        </div>

                        {/* Анимированный блок с политикой */}
                        <motion.div
                            className={`w-full absolute bottom-[-14.3%] left-[50%] transform -translate-x-1/2`}
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
                                className={`
                                ${isMac ? 'text-[#adadad]' : 'text-[#e1e1e1]'}
                                !font-[Roboto] !font-[250] hidden md:block text-center  text-[16px] ml-[-2px]`}
                            >
                                Нажимая кнопку «Регистрация» вы соглашаетесь с
                                <Link
                                    href="/politic/policy"
                                    className={`${isMac ? 'text-[#adadad]' : 'text-[#e1e1e1]'}
                                     hover:!text-[#3D9ED6] 
                                     ${styles["menu-item"]} !text-[16px] font-[250] ml-[4px]`}
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
                        subText="Чтобы полноценно работать в личном кабинете, необходимо активировать ваш аккаунт."
                    />
                )}

                {/*/!* DataPicker *!/*/}
                {/*<DatePicker*/}
                {/*    isVisible={showDatePicker}*/}
                {/*    onDateSelect={handleDateSelect}*/}
                {/*    onClose={() => setShowDatePicker(false)}*/}
                {/*    initialDate={selectedDate || ""}*/}
                {/*/>*/}
            </motion.div>

        </>
    );
}