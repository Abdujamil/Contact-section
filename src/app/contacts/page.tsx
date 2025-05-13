'use client';
import Image from "next/image";
import Footer from '../footer';
import styles from '../page.module.scss';
import HeaderStyles from '../../components/header/Header.module.css'
import React, {useState, useRef, useEffect} from "react";
import CustomCheckbox from "@/components/CustomCheckbox";
import {BounceEffect} from "@/components/hooks/useBounce";
import AppInput from "@/components/forms/elements/AppInput";
import {useForm, FormProvider} from 'react-hook-form';
import Header from "@/components/header/Header";
import {motion, useAnimation} from "framer-motion";
import Bg from "@/components/background/bg";


export default function Contacts() {
    const controls = useAnimation();
    const methods = useForm({
        mode: "onTouched",
        reValidateMode: "onChange",
        shouldFocusError: false
    });
    const {handleSubmit, formState: {submitCount}, trigger, reset} = methods;
    const [activeTab, setactiveTab] = useState<'contact' | 'requisite'>('contact');
    const contactInputRef = useRef<HTMLInputElement>(null);

    const [isPhone, setIsPhone] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailSuccessful, setEmailSuccessful] = useState(false);
    const [selectError, setSelectError] = useState(false);

    // Select
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const options = ['Предложение', 'Ошибка', 'Оплата', 'Изменение данных', 'Подключиться к API']

    // Checkboxes
    const [contactValue, setContactValue] = useState('');

    const checkboxContainerRef = useRef<HTMLDivElement>(null);
    const [failCheck, setFailCheck] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const [visibleError, setVisibleError] = useState(false);

    const selectRef = useRef<HTMLDivElement>(null);

    const triggerSelectBounce = () => {
        const el = selectRef.current;
        if (!el) return;

        el.classList.remove('bounce'); // сначала удаляем
        void el.offsetWidth;           // форсируем перерендер (рефлоу)
        el.classList.add('bounce');   // добавляем снова
    };

    // Таймер обратного отсчета
    useEffect(() => {
        if (!isSubmitted) return;

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsSubmitted(false);
                    methods.reset(); // Сбрасываем форму
                    return 10;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isSubmitted, methods]);
    useEffect(() => {
        if (!submitCount) return;

        const isSelectValid = selectedOption !== '' && selectedOption !== 'Тема';
        const isContactValid = isEmail || isPhone;

        if (!isSelectValid) {
            setSelectError(true);
            triggerSelectBounce();
        } else {
            setSelectError(false);
        }

        if (!isContactValid) {
            setFailCheck(true);
            bounceElements(); // Чекбоксы прыгают
        } else {
            setFailCheck(false);
        }

        if (!isSelectValid || !isContactValid) {
            setVisibleError(true);
        } else {
            setVisibleError(false);
            validContact(contactValue);
        }
    }, [submitCount]);
    useEffect(() => {
        if (emailError && contactValue.length > 0) {
            setEmailError(false)
        }
    }, [contactValue])

    // Upload file
    const [text, setText] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const content = await readFileAsText(file);
            setText(prev => prev + content);

            // Позиционируем курсор в конец текста
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(text.length, text.length);
            }
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };

    const readFileAsText = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            // reader.onerror = (e) => reject(reader.error);
            reader.readAsText(file);
        });
    };

    // BounceEffect
    const bounceElements = () => {
        const myElement = document.getElementById('bounce-checkbox');
        // const selectElement = document.querySelector('.relative.mb-\\[34px\\] > div');

        // Анимация для селекта
        // if (selectElement instanceof HTMLElement) {
        //     selectElement.style.animation = 'bounce-input .4s ease';
        //     setTimeout(() => selectElement.style.animation = '', 100);
        // }

        // Анимация для чекбоксов
        if (myElement) {
            BounceEffect(myElement, {
                startPosition: "-50px",
                endPosition: `${5}px`,
                duration: 500,
                easing: "ease",
                direction: 'vertical',
                distanceCoficent: -1
            });
        }
    };

    let lastClickPosition: { x: number; y: number } | null = null;
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        e.currentTarget.style.setProperty("--last-mouse-x", `${x}px`);
        e.currentTarget.style.setProperty("--last-mouse-y", `${y}px`);
    };

    const initializeMousePosition = (button: HTMLButtonElement) => {
        const rect = button.getBoundingClientRect();

        const x = lastClickPosition ? lastClickPosition.x : rect.width / 2;
        const y = lastClickPosition ? lastClickPosition.y : rect.height / 2;

        button.style.setProperty("--mouse-x", `${x}px`);
        button.style.setProperty("--mouse-y", `${y}px`);
        button.style.setProperty("--last-mouse-x", `${x}px`);
        button.style.setProperty("--last-mouse-y", `${y}px`);

        lastClickPosition = null; // сброс после использования
    };

    // BounceEffect for blocks
    const bounceActiveBlock = () => {
        const block = activeTab === 'contact'
            ? document.getElementById('form-main')
            : document.getElementById('requisite-block');

        if (block) {
            // Сброс анимации перед запуском новой
            block.style.animation = 'none';
            void block.offsetHeight; // Trigger reflow

            // BounceEffect(block, {
            //     startPosition: "-50px",
            //     endPosition: `${5}px`,
            //     duration: 500,
            //     easing: "ease",
            //     direction: 'vertical',
            //     distanceCoficent: -1
            // });

            // const target = {
            //     y: block ? animationSettings.openY : animationSettings.closeY,
            //     opacity: block ? [0, 1, 1, 1, 1] : [1, 1, 1, 1, 0],
            //     transition: {
            //         duration: animationSettings.duration,
            //         ease: animationSettings.ease,
            //         times: animationSettings.times,
            //     },
            // };
            // controls.start(target);

            runMotionEffect();

            // if (activeTab === 'bounceEffect') {
            //     runBounceEffect(block);
            // } else {
            //     runMotionEffect();
            // }
        }
    };
    const switchTab = (tab: 'contact' | 'requisite') => {
        setactiveTab(tab);

        setTimeout(() => {
            const targetButton = tab === 'contact'
                ? document.querySelector(`.${styles["contact-btn"]}`) as HTMLButtonElement
                : document.querySelector(`.${styles["requisite-btn"]}`) as HTMLButtonElement;

            if (targetButton) {
                initializeMousePosition(targetButton);
            }

            const targetBlock = tab === 'contact'
                ? document.getElementById('form-main')
                : document.getElementById('requisite-block');

            if (targetBlock && targetBlock.offsetParent !== null) {
                bounceActiveBlock();
            }
        }, 10);
    };
    const handleTabClick = (tab: 'contact' | 'requisite') => (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        lastClickPosition = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        switchTab(tab);
    };

    useEffect(() => {
        bounceActiveBlock();

        // const activeButton = activeTab === 'contact'
        //     ? document.querySelector(`.${styles["contact-btn"]}`) as HTMLButtonElement
        //     : document.querySelector(`.${styles["requisite-btn"]}`) as HTMLButtonElement;
        //
        // if (activeButton) {
        //     if (lastClickPosition) {
        //         activeButton.style.setProperty("--mouse-x", `${lastClickPosition.x}px`);
        //         activeButton.style.setProperty("--mouse-y", `${lastClickPosition.y}px`);
        //         activeButton.style.setProperty("--last-mouse-x", `${lastClickPosition.x}px`);
        //         activeButton.style.setProperty("--last-mouse-y", `${lastClickPosition.y}px`);
        //     } else {
        //         initializeMousePosition(activeButton);
        //     }
        //
        //     activeButton.addEventListener("mouseenter", () => {
        //         const rect = activeButton.getBoundingClientRect();
        //         const x = rect.width / 2;
        //         const y = rect.height / 2;
        //
        //         activeButton.style.setProperty("--mouse-x", `${x}px`);
        //         activeButton.style.setProperty("--mouse-y", `${y}px`);
        //     });
        // }
    }, [activeTab]);


    // Validation
    const validContact = (value: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^(?:\+7|8)?[\s(-]*\d[\s(-]*\d{2}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/;

        const isValid = (isEmail && emailRegex.test(value.trim())) ||
            (isPhone && phoneRegex.test(value.trim()));

        setEmailError(!isValid);
        setEmailSuccessful(isValid);
        return isValid;
    };
    const {setFocus} = methods;
    const onSubmit = async (data: Record<string, unknown>) => {
        const formData = new FormData();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^(?:\+7|8)?[\s(-]*\d[\s(-]*\d{2}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/;


        // Проверка валидности контакта
        const contactValue = typeof data.Contact === 'string' ? data.Contact : '';
        const isSelectValid = selectedOption !== '' && selectedOption !== 'Тема';

        if ((!emailRegex.test(contactValue.trim()) && isEmail) ||
            (!phoneRegex.test(contactValue.trim()) && isPhone) || !isSelectValid) {
            setEmailError(true);
            setVisibleError(true)
            setSelectError(!isSelectValid)
            setEmailSuccessful(false);
            return;
        } else {
            setEmailError(false);
            setVisibleError(false);
            setSelectError(false)
        }

        // Заполнение FormData
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value instanceof Blob ? value : String(value));
            }
        });

        // Валидация формы
        const isFormValid = await trigger(undefined, {shouldFocus: true});
        const isContactMethodSelected = isEmail || isPhone;
        const isContactValid = isContactMethodSelected ? validContact(contactValue) : false;

        // Обработка ошибок
        if (!isFormValid || !isContactMethodSelected || !isContactValid) {
            bounceElements();
            setSelectError(!isSelectValid)
            setFailCheck(true);
            setVisibleError(true)

            if (!isContactMethodSelected) {
                console.log('Ошибка: не выбран способ связи');
            } else if (!isContactValid) {
                console.log('Ошибка: неверный формат контакта');
            } else {
                console.log('Ошибка: не заполнены обязательные поля');
            }
            return;
        }

        // Сброс формы
        console.log('Форма отправлена:', data);
        reset();
        setIsSubmitted(true);
    };
    useEffect(() => {
        setVisibleError(false);
        setTimeout(() => setVisibleError(true), 30);
    }, [submitCount]);

    const motionSettings = {
        duration: 0.6,
        bounce: 5,
        delay: 0,
        ease: [0.34, 1.56, 0.64, 1],
        times: [0, 0.2, 0.5, 0.8, 1],
        openY: [0, 26, 0, 0, 0], // Анимация открытия
        closeY: [60, -6, 0, 0, 0], // Анимация закрытия
        opacity: [0, 1, 1, 1, 1],    // Дефолтные значения для opacity
    };
    const runMotionEffect = () => {
        controls.start({
            y: motionSettings.openY,
            opacity: motionSettings.opacity,
            transition: {
                duration: motionSettings.duration,
                ease: motionSettings.ease,
                times: motionSettings.times,
            },
        });
    };

    return (
        <>
            <div className={`${styles.page} h-dvh`}>
               <Bg />
                <div className={`${styles.contact} w-full h-full mx-auto flex flex-col items-center`}>
                    <Header />
                    <div
                        className={`${styles.contactContainer} w-full max-w-[1160px] h-full min-h-[432px] flex justify-center items-center `}>
                        <div className={`w-full flex justify-center items-start gap-[40px]`}>
                            <div className={`${styles.contactLeftContent}`}>
                                <h2 className={`${styles.txtGradientRight}  leading-[110%] text-[40px] font-normal mb-[35px] mt-[-5px]`}>Контакты</h2>
                                <div
                                    className={`${styles.btns} flex flex-col items-start justify-start w-full max-w-[260px] p-[20px] gap-[12px] bg-[rgba(0, 0, 0, 0.07)] border border-[#353535] rounded-[6px]`}>

                                    <div className="relative !w-[220px] !overflow-hidden">
                                        <button
                                            onClick={handleTabClick("contact")}
                                            onMouseMove={handleMouseMove}
                                            onMouseLeave={handleMouseLeave}
                                            className={`${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["contact-btn"]}   
                                             cursor-pointer !w-[220px] !h-[51px] !rounded-[4px] group flex items-center !justify-between`}
                                            style={{
                                                color: activeTab === "contact" ? "#3D9ED6" : "",
                                            }}>

                                            <svg
                                                className={`${styles.sendIconLeft}  transition-all !duration-[.15s] ease-in`}
                                                width="30" height="17" viewBox="0 0 30 17" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M27.4161 0H11.1661C9.79114 0 8.66614 1.125 8.66614 2.5V13.75C8.66614 14.413 8.92953 15.0489 9.39837 15.5178C9.86721 15.9866 10.5031 16.25 11.1661 16.25H27.4161C28.8036 16.25 29.9161 15.1375 29.9161 13.75V2.5C29.9161 1.83696 29.6527 1.20107 29.1839 0.732233C28.7151 0.263392 28.0792 0 27.4161 0ZM27.4161 4.5875L19.2911 8.75L11.1661 4.5875V2.5L19.2911 6.6375L27.4161 2.5V4.5875ZM6.12375 3.125H7.16602C7.14102 3.3375 7.16602 3.5375 7.16602 3.75V5.11492H6.12375C4.17487 5.11492 4.19616 5.36961 4.87375 4.11492C5.20044 3.50999 5.43625 3.125 6.12375 3.125Z"
                                                    fill={activeTab === 'contact' ? "#ccc" : "#737373"}/>
                                                <path
                                                    d="M7.16602 7.26168H3.90583C3.21833 7.26168 2.98252 7.64667 2.65583 8.2516C1.97824 9.50629 1.95695 9.2516 3.90583 9.2516H7.16602V7.88668C7.16602 7.67418 7.14102 7.47418 7.16602 7.26168Z"
                                                    fill={activeTab === 'contact' ? "#ccc" : "#737373"}/>
                                                <path
                                                    d="M7.16602 11.5188H1.66602C0.978516 11.5188 0.742703 11.9038 0.416016 12.5088C-0.261577 13.7635 -0.282861 13.5088 1.66602 13.5088H7.16602V12.1438C7.16602 11.9313 7.14102 11.7313 7.16602 11.5188Z"
                                                    fill={activeTab === 'contact' ? "#ccc" : "#737373"}/>
                                            </svg>
                                            <span
                                                className="text-[20px] !transition-all !duration-[.15s] !ease-in !group-hover:text-[#ccc]">
                                              Связаться
                                            </span>
                                            <svg
                                                className={`${styles.sendIconRight}  transition-all !duration-[.15s] ease-in`}
                                                width="30" height="17" viewBox="0 0 30 17" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M27.4161 0H11.1661C9.79114 0 8.66614 1.125 8.66614 2.5V13.75C8.66614 14.413 8.92953 15.0489 9.39837 15.5178C9.86721 15.9866 10.5031 16.25 11.1661 16.25H27.4161C28.8036 16.25 29.9161 15.1375 29.9161 13.75V2.5C29.9161 1.83696 29.6527 1.20107 29.1839 0.732233C28.7151 0.263392 28.0792 0 27.4161 0ZM27.4161 4.5875L19.2911 8.75L11.1661 4.5875V2.5L19.2911 6.6375L27.4161 2.5V4.5875ZM6.12375 3.125H7.16602C7.14102 3.3375 7.16602 3.5375 7.16602 3.75V5.11492H6.12375C4.17487 5.11492 4.19616 5.36961 4.87375 4.11492C5.20044 3.50999 5.43625 3.125 6.12375 3.125Z"
                                                    fill={activeTab === 'contact' ? "#ccc" : "#737373"}/>
                                                <path
                                                    d="M7.16602 7.26168H3.90583C3.21833 7.26168 2.98252 7.64667 2.65583 8.2516C1.97824 9.50629 1.95695 9.2516 3.90583 9.2516H7.16602V7.88668C7.16602 7.67418 7.14102 7.47418 7.16602 7.26168Z"
                                                    fill={activeTab === 'contact' ? "#ccc" : "#737373"}/>
                                                <path
                                                    d="M7.16602 11.5188H1.66602C0.978516 11.5188 0.742703 11.9038 0.416016 12.5088C-0.261577 13.7635 -0.282861 13.5088 1.66602 13.5088H7.16602V12.1438C7.16602 11.9313 7.14102 11.7313 7.16602 11.5188Z"
                                                    fill={activeTab === 'contact' ? "#ccc" : "#737373"}/>
                                            </svg>
                                        </button>
                                        <div className={styles.highlight}/>
                                    </div>

                                    <div className="relative !w-[220px] !overflow-hidden">
                                        <button
                                            onClick={handleTabClick("requisite")}
                                            onMouseMove={handleMouseMove}
                                            onMouseLeave={handleMouseLeave}
                                            className={`${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["requisite-btn"]} transition-all !duration-[.15s] ease-in cursor-pointer !w-[220px] !h-[51px] !rounded-[4px] group flex items-center !justify-between`}
                                            style={{
                                                color: activeTab === "requisite" ? "#3D9ED6" : "",
                                            }}>
                                            <svg
                                                className={`${styles.sendIconLeft}  transition-all !duration-[.15s] ease-in`}
                                                width="24" height="27" viewBox="0 0 24 27" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M13.3929 7.38281V0H5.85938C5.19337 0 4.55465 0.259277 4.08372 0.720792C3.61278 1.18231 3.34821 1.80826 3.34821 2.46094V14.7656H12.5558C13.2218 14.7656 13.8605 15.0249 14.3315 15.4864C14.8024 15.9479 15.067 16.5739 15.067 17.2266C15.067 17.8792 14.8024 18.5052 14.3315 18.9667C13.8605 19.4282 13.2218 19.6875 12.5558 19.6875H3.34821V23.7891C3.34821 24.4417 3.61278 25.0677 4.08372 25.5292C4.55465 25.9907 5.19337 26.25 5.85938 26.25H20.9263C21.5923 26.25 22.2311 25.9907 22.702 25.5292C23.1729 25.0677 23.4375 24.4417 23.4375 23.7891V9.84375H15.904C15.238 9.84375 14.5993 9.58447 14.1284 9.12296C13.6574 8.66144 13.3929 8.03549 13.3929 7.38281ZM6.69643 12.3047C6.69643 12.0871 6.78462 11.8785 6.9416 11.7246C7.09857 11.5708 7.31148 11.4844 7.53348 11.4844H19.2522C19.4742 11.4844 19.6871 11.5708 19.8441 11.7246C20.0011 11.8785 20.0893 12.0871 20.0893 12.3047C20.0893 12.5222 20.0011 12.7309 19.8441 12.8847C19.6871 13.0386 19.4742 13.125 19.2522 13.125H7.53348C7.31148 13.125 7.09857 13.0386 6.9416 12.8847C6.78462 12.7309 6.69643 12.5222 6.69643 12.3047ZM6.69643 22.1484C6.69643 21.9309 6.78462 21.7222 6.9416 21.5684C7.09857 21.4146 7.31148 21.3281 7.53348 21.3281H19.2522C19.4742 21.3281 19.6871 21.4146 19.8441 21.5684C20.0011 21.7222 20.0893 21.9309 20.0893 22.1484C20.0893 22.366 20.0011 22.5746 19.8441 22.7285C19.6871 22.8823 19.4742 22.9688 19.2522 22.9688H7.53348C7.31148 22.9688 7.09857 22.8823 6.9416 22.7285C6.78462 22.5746 6.69643 22.366 6.69643 22.1484ZM15.067 7.38281V0.410156L23.019 8.20312H15.904C15.682 8.20312 15.4691 8.1167 15.3121 7.96286C15.1552 7.80902 15.067 7.60037 15.067 7.38281ZM0.837054 16.4062C0.615053 16.4062 0.402145 16.4927 0.245167 16.6465C0.0881895 16.8004 0 17.009 0 17.2266C0 17.4441 0.0881895 17.6528 0.245167 17.8066C0.402145 17.9604 0.615053 18.0469 0.837054 18.0469H12.5558C12.7778 18.0469 12.9907 17.9604 13.1477 17.8066C13.3047 17.6528 13.3929 17.4441 13.3929 17.2266C13.3929 17.009 13.3047 16.8004 13.1477 16.6465C12.9907 16.4927 12.7778 16.4062 12.5558 16.4062H0.837054Z"
                                                    fill={activeTab === 'requisite' ? "#ccc" : "#737373"}/>
                                            </svg>
                                            <span className="text-[20px] !transition-all !duration-[.15s] !ease-in">
                                          Реквизиты
                                        </span>
                                            <svg
                                                className={`${styles.sendIconRight}  transition-all !duration-[.15s] ease-in`}
                                                width="24" height="27" viewBox="0 0 24 27" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M13.3929 7.38281V0H5.85938C5.19337 0 4.55465 0.259277 4.08372 0.720792C3.61278 1.18231 3.34821 1.80826 3.34821 2.46094V14.7656H12.5558C13.2218 14.7656 13.8605 15.0249 14.3315 15.4864C14.8024 15.9479 15.067 16.5739 15.067 17.2266C15.067 17.8792 14.8024 18.5052 14.3315 18.9667C13.8605 19.4282 13.2218 19.6875 12.5558 19.6875H3.34821V23.7891C3.34821 24.4417 3.61278 25.0677 4.08372 25.5292C4.55465 25.9907 5.19337 26.25 5.85938 26.25H20.9263C21.5923 26.25 22.2311 25.9907 22.702 25.5292C23.1729 25.0677 23.4375 24.4417 23.4375 23.7891V9.84375H15.904C15.238 9.84375 14.5993 9.58447 14.1284 9.12296C13.6574 8.66144 13.3929 8.03549 13.3929 7.38281ZM6.69643 12.3047C6.69643 12.0871 6.78462 11.8785 6.9416 11.7246C7.09857 11.5708 7.31148 11.4844 7.53348 11.4844H19.2522C19.4742 11.4844 19.6871 11.5708 19.8441 11.7246C20.0011 11.8785 20.0893 12.0871 20.0893 12.3047C20.0893 12.5222 20.0011 12.7309 19.8441 12.8847C19.6871 13.0386 19.4742 13.125 19.2522 13.125H7.53348C7.31148 13.125 7.09857 13.0386 6.9416 12.8847C6.78462 12.7309 6.69643 12.5222 6.69643 12.3047ZM6.69643 22.1484C6.69643 21.9309 6.78462 21.7222 6.9416 21.5684C7.09857 21.4146 7.31148 21.3281 7.53348 21.3281H19.2522C19.4742 21.3281 19.6871 21.4146 19.8441 21.5684C20.0011 21.7222 20.0893 21.9309 20.0893 22.1484C20.0893 22.366 20.0011 22.5746 19.8441 22.7285C19.6871 22.8823 19.4742 22.9688 19.2522 22.9688H7.53348C7.31148 22.9688 7.09857 22.8823 6.9416 22.7285C6.78462 22.5746 6.69643 22.366 6.69643 22.1484ZM15.067 7.38281V0.410156L23.019 8.20312H15.904C15.682 8.20312 15.4691 8.1167 15.3121 7.96286C15.1552 7.80902 15.067 7.60037 15.067 7.38281ZM0.837054 16.4062C0.615053 16.4062 0.402145 16.4927 0.245167 16.6465C0.0881895 16.8004 0 17.009 0 17.2266C0 17.4441 0.0881895 17.6528 0.245167 17.8066C0.402145 17.9604 0.615053 18.0469 0.837054 18.0469H12.5558C12.7778 18.0469 12.9907 17.9604 13.1477 17.8066C13.3047 17.6528 13.3929 17.4441 13.3929 17.2266C13.3929 17.009 13.3047 16.8004 13.1477 16.6465C12.9907 16.4927 12.7778 16.4062 12.5558 16.4062H0.837054Z"
                                                    fill={activeTab === 'requisite' ? "#ccc" : "#737373"}/>
                                            </svg>
                                        </button>
                                        <div className={styles.highlight}/>
                                    </div>
                                </div>
                            </div>

                            {/* Блок "Связаться" */}
                            <motion.div id="form-main"
                                        initial={{y: 20, opacity: 1}}
                                        animate={controls}
                                        className={`${styles.contactRightContent} w-full max-w-[870px] h-[437px] border border-[#353535] rounded-[6px] p-10 
                            ${
                                            activeTab !== 'contact' ? 'hidden' : ''
                                        }
                            `}>
                                <FormProvider {...methods}>
                                    {isSubmitted ? (
                                        <div className="timer-container">
                                            <h3>Сообщение отправлено!</h3>
                                            <p>Форма будет доступна через: {countdown} сек.</p>
                                        </div>
                                    ) : (
                                        <form method="post" onSubmit={handleSubmit(onSubmit)}
                                              encType="multipart/form-data"
                                              className="flex items-start justify-between w-full gap-[30px]">
                                            {/* Textarea */}
                                            <div className="relative w-full max-w-[375px]">
                                                <textarea
                                                    placeholder="Комментарий"
                                                    name='comment'
                                                    className={`${styles.bounceElem} w-full h-[352px] relative resize-none border border-[#353535] bg-[#101010] focus:!bg-[#20272A] focus:border focus:border-[#737373] rounded-[4px] pt-[18px] pl-[10px] bg-[#101010 active:outline-none focus:outline-none text-[#ссс] text-[16px] transition-all duration-200`}
                                                >
                                                </textarea>

                                                {/* Скрытый input для загрузки файла */}
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileUpload}
                                                    accept=".txt,.text,.md,.csv,.json,.xml,.html,.log" // Можно указать нужные форматы
                                                    className="hidden"
                                                />

                                                <div
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className={`${styles.fileIcon} w-[32px] h-[32px] rounded-[5px] py-[5px] pr-[4px] pl-[7px] absolute top-5 right-5 cursor-pointer hover:bg-[#20272A] transition-colors duration-200`}>
                                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M1.3366 0.0775394C0.788867 0.248058 0.230801 0.81646 0.0706159 1.36936C0.00344136 1.59672 -0.00689319 2.81619 0.00344135 10.5413L0.0189432 19.4548L0.168794 19.7493C0.375485 20.1524 0.726859 20.4986 1.12991 20.6898L1.46578 20.85L4.51964 20.8655C6.4367 20.8758 7.62517 20.8603 7.70784 20.8293C8.02822 20.7053 8.12123 20.1989 7.8732 19.9509L7.74402 19.8165L4.70049 19.7907L1.65697 19.7648L1.45544 19.6047C1.04206 19.274 1.07823 20.1421 1.07823 10.4328V1.7724L1.19708 1.55021C1.27976 1.39519 1.38827 1.28668 1.54329 1.204L1.76548 1.08516H6.77257H11.7745V2.67151C11.7745 4.16485 11.7797 4.27336 11.8778 4.42838C11.9347 4.52139 11.9863 4.60407 11.9915 4.60924C12.0018 4.6144 12.8079 4.63507 13.7897 4.65058L15.5724 4.67641L15.5879 8.58287L15.5983 12.4893L15.3709 12.5772C14.849 12.7787 14.3891 13.1869 12.0277 15.5484C9.57323 18.0028 9.47505 18.1165 9.26319 18.7572C9.12884 19.1654 9.13918 19.7752 9.28903 20.2196C9.49055 20.819 9.98144 21.377 10.5602 21.6664C10.9581 21.8679 11.2629 21.9248 11.7642 21.8989C12.255 21.8679 12.6116 21.7542 13.0043 21.5011C13.1386 21.4184 14.2238 20.3643 15.4174 19.1603C17.7995 16.7627 17.8254 16.7317 17.8615 16.1168C17.8874 15.6569 17.753 15.3417 17.35 14.9593C16.9521 14.5821 16.6524 14.4426 16.2183 14.4477C15.96 14.4477 15.8205 14.4787 15.6034 14.5924C15.2314 14.7784 15.1694 14.8353 13.5727 16.463L12.1879 17.8736V18.1113C12.1879 18.442 12.3894 18.6539 12.7098 18.6539C12.932 18.6539 12.9371 18.6487 14.4098 17.1864C15.2211 16.3803 15.9393 15.6827 16.0117 15.6362C16.2183 15.4967 16.4457 15.5277 16.6524 15.7292C16.8798 15.9411 16.8901 16.0909 16.6886 16.3596C16.6059 16.4681 15.6034 17.4964 14.4563 18.6332C12.193 20.881 12.2344 20.85 11.6711 20.8396C11.1854 20.8345 10.772 20.5813 10.493 20.1059C10.3742 19.9095 10.3535 19.8062 10.3535 19.5065C10.3587 18.8502 10.3225 18.8916 12.9268 16.2976C14.8335 14.3961 15.3296 13.9258 15.6293 13.7501C16.5646 13.2024 17.4482 13.3368 18.2594 14.1532C19.1947 15.0936 19.329 15.9359 18.6935 16.8815C18.6056 17.021 17.6393 18.0235 16.549 19.1189C15.4484 20.2247 14.5441 21.1755 14.5131 21.2582C14.3891 21.5941 14.6682 21.9609 15.0505 21.9609C15.2572 21.9609 15.2831 21.9403 17.1381 20.0852C18.1716 19.0569 19.1585 18.0441 19.3239 17.8375C20.1093 16.866 20.3625 15.786 20.0473 14.7784C19.6494 13.5176 18.3473 12.3808 17.1485 12.2516L16.8643 12.2206L16.8384 8.0248L16.8126 3.82381L16.5025 3.51894C16.332 3.34842 15.4277 2.48549 14.4873 1.60705L12.7821 3.05176e-05L7.17562 0.00519753C2.53024 0.00519753 1.52779 0.0206985 1.3366 0.0775394ZM13.8931 2.68184L14.7973 3.56028H13.8569L12.9113 3.56545V2.68701C12.9113 2.20129 12.932 1.80857 12.9526 1.80857C12.9733 1.80857 13.4022 2.20129 13.8931 2.68184Z"
                                                            fill="#737373"/>
                                                        <path
                                                            d="M4.26105 7.98345C4.04402 8.09713 3.97685 8.21081 3.97168 8.45367C3.97168 8.72237 4.11636 8.91873 4.37473 8.99107C4.50391 9.03241 5.79573 9.04274 8.48271 9.03241L12.4047 9.0169L12.5545 8.84638C12.7612 8.61386 12.7612 8.33482 12.5545 8.1023L12.4047 7.93178L8.4052 7.91627C4.90696 7.90594 4.39023 7.91627 4.26105 7.98345Z"
                                                            fill="#737373"/>
                                                        <path
                                                            d="M4.12182 11.673C3.86346 11.9365 3.9358 12.3809 4.2665 12.5514C4.43186 12.6341 12.2344 12.6341 12.4205 12.5462C12.7305 12.4067 12.8028 11.9262 12.5548 11.673L12.405 11.5231H8.33831H4.27167L4.12182 11.673Z"
                                                            fill="#737373"/>
                                                        <path
                                                            d="M4.25071 15.0886C4.07503 15.1558 3.97168 15.347 3.97168 15.595C3.97168 15.7759 4.00268 15.8482 4.12153 15.9722L4.27138 16.1221H6.76201H9.25263L9.40248 15.9722C9.60401 15.7707 9.61434 15.4245 9.42832 15.2075L9.3043 15.0628L6.82918 15.0524C5.47019 15.0473 4.30755 15.0628 4.25071 15.0886Z"
                                                            fill="#737373"/>
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className={`${styles.formInpts} w-full`}>
                                                {/* Кастомный select */}
                                                <div className={`relative mb-[34px]`}>
                                                    <div
                                                        ref={selectRef}
                                                        className={`w-full  border 
                                                        rounded-[4px] px-[12px] pr-[17px] py-3 cursor-pointer flex justify-between items-center
                                                        transition-border duration-200 ease-in
                                                        ${selectError && visibleError ? 'bounce' : ''}
                                                        ${isSelectOpen ? 'border-[#ccc]' : 'border-[#353535]'}
                                                        ${isSelectOpen ? 'bg-[#1A1A1A]' : 'bg-[#101010]'}
                                                         `}
                                                        onClick={() => {
                                                            setIsSelectOpen(!isSelectOpen);
                                                            setSelectError(false);
                                                        }}
                                                    >
                                                        <span
                                                            className={selectError ? 'text-[#FF3030]' : selectedOption ? 'text-[#CCC]' : 'text-[#CCC]'}>  {/* Тут текст поменял из text-[#737373] на text-[#ССС] так как pagespeed ругался */}
                                                            {selectedOption || 'Тема'}
                                                        </span>
                                                        <svg
                                                            width="16"
                                                            height="10"
                                                            viewBox="0 0 16 10"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className={`transition-transform duration-200 ${isSelectOpen ? 'rotate-180' : ''}`}
                                                        >
                                                            <path
                                                                d="M1 1L8 8L15 1"
                                                                stroke={selectError ? "#FF3030" : isSelectOpen ? "#3D9ED6" : "#737373"}
                                                                strokeWidth="2"
                                                            />
                                                        </svg>
                                                    </div>

                                                    {isSelectOpen && (
                                                        <div
                                                            className={`${styles.selectOption} absolute right-[17px] p-[26px] px-[26px] pb-[11px] top-[30px] z-[99999] w-full max-w-[210px] mt-1 border border-[#353535] rounded-[4px]`}>
                                                            {options.map((option, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`pb-[15px] cursor-pointer  hover:text-[#CCC]`}
                                                                    onClick={() => {
                                                                        setSelectedOption(option);
                                                                        setSelectError(false);
                                                                        setIsSelectOpen(false);
                                                                    }}
                                                                >
                                                                    <p
                                                                        className={`${styles["menu-item"]} ${
                                                                            selectedOption === option ? '!text-[#3D9ED6] border-b border-b-[#3D9ED6]' : 'text-[#737373]'
                                                                        }`}>
                                                                        {option}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <AppInput
                                                    className={`${styles.bounceElem} w-full mb-[34px] !bg-[#101010] focus:!bg-[#20272A]`}
                                                    title={'ФИО'}
                                                    inputName="name"
                                                    required={true}
                                                />

                                                <div
                                                    onClick={() => {
                                                        if (!isEmail && !isPhone) {
                                                            bounceElements()
                                                            setFailCheck(true)
                                                        } else {
                                                            setFailCheck(false)

                                                        }
                                                        setEmailError(false)
                                                    }}
                                                    className="w-full relative z-[1]"
                                                >

                                                    <AppInput
                                                        ref={contactInputRef}
                                                        className={`${styles.bounceElem} w-full !bg-[#101010] focus:!bg-[#20272A] !placeholder-opacity-0`}
                                                        title={isPhone ? 'Телефон' : isEmail ? 'Email' : ''}
                                                        inputName="Contact"
                                                        mask={isPhone ? "phone" : ''}
                                                        type={isPhone ? "tel" : 'text'}
                                                        fail={emailError}
                                                        required={true}
                                                        // message={false}
                                                        disable={!isPhone && !isEmail}
                                                        value={contactValue}
                                                        onChange={(value) => setContactValue(value)}
                                                        onBlur={() => validContact(contactValue)}
                                                    />
                                                </div>

                                                <div
                                                    id='bounce-checkbox'
                                                    ref={checkboxContainerRef}
                                                    className={`${styles.formCheckboxes} flex items-center gap-[20px] mt-[10px] ml-[10px]`}>

                                                    <CustomCheckbox id="check-phone" successful={emailSuccessful}
                                                                    fail={failCheck}
                                                                    checked={isPhone}
                                                                    onChange={(value) => {
                                                                        setIsPhone(value);
                                                                        if (value) {
                                                                            setIsEmail(false);
                                                                            setFocus('Contact');
                                                                            setTimeout(() => {
                                                                                contactInputRef.current?.click();
                                                                                contactInputRef.current?.focus();
                                                                            }, 0);
                                                                            setEmailSuccessful(false)
                                                                        }
                                                                    }}
                                                                    label="Телефон"/>
                                                    <CustomCheckbox id="check-email" successful={emailSuccessful}
                                                                    fail={failCheck}
                                                                    checked={isEmail}
                                                                    onChange={(value) => {
                                                                        setIsEmail(value);
                                                                        if (value) {
                                                                            setIsPhone(false);
                                                                            setFocus('Contact');
                                                                            setTimeout(() => {
                                                                                contactInputRef.current?.click();
                                                                                contactInputRef.current?.focus();
                                                                            }, 0);
                                                                            setEmailSuccessful(false)
                                                                        }
                                                                    }}
                                                                    label="Email"/>
                                                </div>


                                                <div className="relative !w-[220px] !overflow-hidden">
                                                    <button
                                                        type='submit'
                                                        className={`${styles.btn} ${HeaderStyles["login-button"]} group !w-[220px] !h-[51px] mt-[50px] flex items-center !justify-between`}
                                                        data-text=""
                                                    >
                                                        <svg
                                                            className={`${styles.sendIconLeft} transition-all !duration-[.15s] ease-in`}
                                                            width="23" height="20" viewBox="0 0 23 20" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M22.9139 9.91388L0.63604 0.36396L3.88829 8.9858L19.7319 9.91388L3.88829 10.842L0.640018 19.4598L22.9139 9.91388Z"
                                                                fill="#CCCCCC"/>
                                                        </svg>
                                                        <span
                                                            className="!transition-all !duration-[.15s] !ease-in font-normal text-[20px] leading-[120%]">
                                                              Отправить
                                                            </span>
                                                        <svg
                                                            className={`${styles.sendIconRight}  transition-all !duration-[.15s] ease-in`}
                                                            width="23" height="20" viewBox="0 0 23 20" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M22.9139 9.91388L0.63604 0.36396L3.88829 8.9858L19.7319 9.91388L3.88829 10.842L0.640018 19.4598L22.9139 9.91388Z"
                                                                fill="#CCCCCC"/>
                                                        </svg>
                                                    </button>
                                                    <div className={styles.highlight}/>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </FormProvider>
                            </motion.div>

                            {/* Блок "Реквизиты" */}
                            <motion.div id="requisite-block"
                                        initial={{y: 20, opacity: 1}}
                                        animate={controls}
                                        className={`${styles.contactRightContent} w-full max-w-[870px] h-[437px] border border-[#353535] rounded-[6px] p-10 ${
                                            activeTab !== 'requisite' ? 'hidden' : ''
                                        }`}>
                                <div className="flex justify-between items-end  mb-5">
                                    <div className="w-full max-w-[516px]">
                                        <label
                                            className="pl-[18px] block text-lg font-normal text-[#ccc] mb-2 leading-[110%]">Полное
                                            наименование</label>
                                        <input
                                            type="text"
                                            readOnly={false}
                                            defaultValue="Общество с ограниченной ответственностью «АУДИОСЕКТОР»"
                                            className="w-full bg-[#101010] cursor-not-allowed  border border-[#353535] rounded-[4px] px-4 py-3 text-[#737373] focus:outline-none focus:border-[#5F5F5F]"
                                        />
                                    </div>


                                    <div className="relative !overflow-hidden">
                                        <button
                                            type="submit"
                                            className={`${styles.btn} ${styles.btnDownloadPdf} ${HeaderStyles["login-button"]}  group  !w-[220px] !h-[51px]  flex items-center !justify-between gap-2 px-4 py-2 bg-[rgba(42, 42, 42, 0.1)] rounded-[4px] backdrop-blur-[2px] border border-[#353535] hover:border-[#ccc] cursor-pointer text-[#ccc] font-normal text-[20px] relative transition-all duration-200 ease-in`}

                                        >
                                            <Image
                                                className={`${styles.sendIconLeft}  transition-all duration-200 ease-in`}
                                                src='/pdf-icon.svg'
                                                width={36}
                                                height={49}
                                                alt="pdf-icon"
                                            />
                                            <span
                                                className="!transition-all !duration-200 !ease-in !group-hover:text-[#ccc] text-[20px]">
                                                          Скачать PDF
                                                        </span>
                                            <Image
                                                className={`${styles.sendIconRight}  transition-all duration-200 ease-in`}
                                                src='/pdf-icon.svg'
                                                width={36}
                                                height={49}
                                                alt="pdf-icon"
                                            />
                                        </button>
                                        <div className={styles.highlight}/>
                                    </div>


                                </div>

                                <div className="mb-6">
                                    <label
                                        className="pl-[18px] block text-lg font-light text-[#ccc] mb-2 leading-[110%]">Юридический
                                        адрес</label>
                                    <input
                                        type="text"
                                        defaultValue="180016, Псковская область, г.о. город Псков, г Псков, пр-кт Римский, д. 64А, кв. 44"
                                        className="w-full max-h-[51px] text-[#737373] cursor-not-allowed bg-[#101010] border border-[#353535] rounded-[4px] px-4 py-3  focus:outline-none focus:border-[#5F5F5F]"
                                    />
                                </div>

                                <div className="space-y-[14px]">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                className="pl-[18px] block text-lg font-normal text-[#ccc] mb-2 leading-[110%]">ИНН</label>
                                            <input
                                                type="text"
                                                defaultValue="6000005874"
                                                className="w-full max-h-[51px] text-[#737373] cursor-not-allowed bg-[#101010] border border-[#353535] rounded-[4px] px-4 py-3  focus:outline-none focus:border-[#5F5F5F]"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                className="pl-[18px] block text-lg font-normal text-[#ccc] mb-2 leading-[110%]">ОГРН</label>
                                            <input
                                                type="text"
                                                defaultValue="1236000004569"
                                                className="w-full max-h-[51px] text-[#737373] cursor-not-allowed bg-[#101010] border border-[#353535] rounded-[4px] px-4 py-3  focus:outline-none focus:border-[#5F5F5F]"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                className="pl-[18px] block text-lg font-normal text-[#ccc] mb-2 leading-[110%]">Генеральный
                                                директор</label>
                                            <input
                                                type="text"
                                                defaultValue="Владимиров Владимир Михайлович"
                                                className="w-full max-h-[51px] text-[#737373] cursor-not-allowed bg-[#101010] border border-[#353535] rounded-[4px] px-4 py-3  focus:outline-none focus:border-[#5F5F5F]"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                className="pl-[18px] block text-lg font-normal text-[#ccc] mb-2 leading-[110%]">Почта</label>
                                            <input
                                                type="email"
                                                defaultValue="info@audiosector.ru"
                                                className="w-full max-h-[51px] text-[#737373] cursor-not-allowed bg-[#101010] border border-[#353535] rounded-[4px] px-4 py-3  focus:outline-none focus:border-[#5F5F5F]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    );
}
