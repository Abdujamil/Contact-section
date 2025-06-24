"use client";
import Image from "next/image";
import Footer from "../footer";
import styles from "../page.module.scss";
import HeaderStyles from "../../components/header/Header.module.css";
import React, {useState, useEffect} from "react";
import CustomCheckbox from "@/components/CustomCheckbox";
import AppInput from "@/components/forms/elements/AppInput";
import {useForm, FormProvider} from "react-hook-form";
import {motion, useAnimation, AnimatePresence} from "framer-motion";
import Bg from "@/components/background/bg";
import {
    // validContact,
    emailRegex,
    phoneRegex,
} from "@/components/Form/validation";
import {useFormStates} from "@/components/hooks/formState";
import {useFormRefs} from "@/components/hooks/formRefs";
import {handleFileUpload} from "@/components/Form/fileUpload";
import {bounceElements, bounceActiveBlock} from "@/components/Form/bounce";
import Btns from "@/components/ContactsBlockBtns/btns";
import FlightSuccess from "@/components/Form/FlightSuccess";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";
import Link from "next/link";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
// import CustomButton from "@/components/CustomButton/CustomButtom";


export default function Contacts() {
    const controls = useAnimation();
    const methods = useForm({
        mode: "onTouched",
        reValidateMode: "onChange",
        shouldFocusError: false,
    });
    const {
        handleSubmit,
        formState: {submitCount},
        // trigger,
        reset,
    } = methods;

    const [activeTab, setActiveTab] = useState<"contact" | "requisite">(
        "contact"
    );
    // Upload file
    const [text, setText] = useState("");
    const [showPolicy, setShowPolicy] = useState(false);

    const {
        isPhone,
        setIsPhone,
        isEmail,
        setIsEmail,
        emailError,
        setEmailError,
        emailSuccessful,
        setEmailSuccessful,
        selectError,
        setSelectError,
        isSubmitted,
        setIsSubmitted,
        failCheck,
        setFailCheck,
        visibleError,
        setVisibleError,
        contactValue,
        setContactValue,
    } = useFormStates();
    const {
        contactInputRef,
        selectRef,
        checkboxContainerRef,
        fileInputRef,
        textareaRef,
    } = useFormRefs();

    // Select
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const options = [
        "Предложение",
        "Ошибка",
        "Оплата",
        "Изменение данных",
        "Подключиться к API",
    ];
    const [comment, setComment] = useState("");
    const [wasSubmittedSuccessfully, setWasSubmittedSuccessfully] =
        useState(false);

    const [contactData, setContactData] = useState({
        phone: "",
        email: "",
    });

    // Validation
    const {setFocus} = methods;

    const validContactt = (value: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex =
            /^(?:\+7|8)?[\s(-]*\d[\s(-]*\d{2}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/;

        if (
            (!emailRegex.test(value.trim()) && isEmail) ||
            (!phoneRegex.test(value.trim()) && isPhone)
        ) {
            setEmailError(true);
            setEmailSuccessful(false);

            if (isEmail) {
                setContactData((prev) => ({
                    ...prev,
                    email: "",
                }));
            } else {
                setContactData((prev) => ({
                    ...prev,
                    phone: "",
                }));
            }

            return;
        } else {
            setEmailError(false);
            setEmailSuccessful(true);

            if (isEmail) {
                setContactData((prev) => ({
                    ...prev,
                    email: value.trim(),
                }));
            } else {
                setContactData((prev) => ({
                    ...prev,
                    phone: value.trim(),
                }));
            }
        }
    };

    const [emailCheckboxError, setEmailCheckboxError] = useState(false);
    const [phoneCheckboxError, setPhoneCheckboxError] = useState(false);

    useEffect(() => {
        if (!submitCount || wasSubmittedSuccessfully) return;

        setShowPolicy(true);

        const isSelectValid = selectedOption !== "" && selectedOption !== "Тема";

        // ИЗМЕНЕНИЕ: теперь проверяем что ОБА поля заполнены
        const isEmailValid =
            contactData.email !== "" && emailRegex.test(contactData.email);
        const isPhoneValid =
            contactData.phone !== "" && phoneRegex.test(contactData.phone);
        const isBothContactsValid = isEmailValid && isPhoneValid;

        setSelectError(!isSelectValid);

        // Устанавливаем ошибки для отдельных чекбоксов
        setEmailCheckboxError(!isEmailValid);
        setPhoneCheckboxError(!isPhoneValid);

        // Проверяем что выбран хотя бы один способ связи И оба поля заполнены
        if (!isEmail && !isPhone) {
            setFailCheck(true);
            bounceElements();
        } else {
            setFailCheck(false);
            validContactt(contactValue);
        }

        if (!isSelectValid || !isBothContactsValid) {
            setVisibleError(true);
        } else {
            setVisibleError(false);
            validContactt(contactValue);
        }
    }, [submitCount, contactData.email, contactData.phone]);

    useEffect(() => {
        if (emailError && contactValue.length > 0) {
            setEmailError(false);
        }
    }, [contactValue]);

    useEffect(() => {
        bounceActiveBlock(activeTab, controls);
    }, [activeTab]);

    useEffect(() => {
        setFailCheck(false);
        setFocus("contact");
    }, [isPhone, isEmail]);

    useEffect(() => {
        const isValidEmail = isEmail && emailRegex.test(contactValue.trim());
        const isValidPhone = phoneRegex.test(contactValue.trim());

        if (isValidEmail || isValidPhone) {
            setEmailSuccessful(true);
        } else {
            setEmailSuccessful(false);
        }
    }, [contactValue, isEmail, isPhone]);


    // Функция для показа политики при фокусе на поля

    const onSubmit = async (data: Record<string, unknown>) => {
        const formData = new FormData();

        const isSelectValid = selectedOption !== "" && selectedOption !== "Тема";
        const isContactMethodSelected = isEmail || isPhone;

        // ИЗМЕНЕНИЕ: проверяем что ОБА поля заполнены и валидны
        const isEmailValid =
            contactData.email !== "" && emailRegex.test(contactData.email);
        const isPhoneValid =
            contactData.phone !== "" && phoneRegex.test(contactData.phone);
        const isBothContactsValid = isEmailValid && isPhoneValid;

        formData.append("email", contactData.email);
        formData.append("phone", contactData.phone);

        // Проверяем все условия: выбрана тема, выбран способ связи, оба поля заполнены
        if (!isSelectValid || !isContactMethodSelected || !isBothContactsValid) {
            setEmailError(!isBothContactsValid);
            setVisibleError(true);
            setSelectError(!isSelectValid);
            setEmailSuccessful(false);

            // Устанавливаем ошибки для отдельных чекбоксов
            setEmailCheckboxError(!isEmailValid);
            setPhoneCheckboxError(!isPhoneValid);

            return;
        }

        // Сброс всех ошибок при успешной отправке
        setSelectError(false);
        setVisibleError(false);
        setEmailError(false);
        setFailCheck(false);
        setEmailSuccessful(false);
        setIsPhone(false);
        setIsEmail(false);
        setEmailCheckboxError(false);
        setPhoneCheckboxError(false);

        // Заполнение и отправка формы
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value instanceof Blob ? value : String(value));
            }
        });

        console.log("Форма отправлена:", data);
        console.log("Email:", contactData.email);
        console.log("Phone:", contactData.phone);

        setIsSubmitted(true);
        setSelectedOption("Тема");
        setContactValue("");
        setText("");
        setComment("");
        setContactData({email: "", phone: ""});
        setShowPolicy(false);
        reset();
        setWasSubmittedSuccessfully(false);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setWasSubmittedSuccessfully(true);
    };

    const handleFieldFocus = () => {
        setShowPolicy(true);
    };

    useEffect(() => {
        setVisibleError(false);
        setTimeout(() => setVisibleError(true), 30);
    }, [submitCount]);

    useEffect(() => {
        if (selectedOption === "Тема") {
            setSelectError(false);
        }
    }, [selectedOption]);

    useEffect(() => {
        // Сбрасываем все ошибки и состояния
        setSelectError(false);
        setEmailError(false);
        setVisibleError(false);
        setFailCheck(false);
        setIsPhone(false);
        setIsEmail(false);
        setEmailSuccessful(false);
        setIsSubmitted(false);
        setShowPolicy(false);
        setSelectedOption("Тема");
        setContactValue("");
        setComment("");
        setText("");
        reset();

        // Сбрасываем файл, если был
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [activeTab]);

    useEffect(() => {
        const isValidEmail = emailRegex.test(contactData.email.trim());
        const isValidPhone = phoneRegex.test(contactData.phone.trim());

        if (isValidEmail && isValidPhone) {
            setEmailSuccessful(true);
        } else {
            setEmailSuccessful(false);
        }
    }, [contactData]);


    return (
        <>
            <div className={`${styles.page} h-dvh`}>
                <Bg/>
                <div
                    className={`${styles.contact} w-full h-full mx-auto flex flex-col items-center`}
                >
                    <Breadcrumbs contactUrl={true}/>
                    <div
                        className={`${styles.contactContainer} w-full max-w-[1160px] h-full min-h-[432px] flex justify-center items-center`}
                    >
                        <div
                            className={`w-full flex justify-center items-start gap-[40px]`}
                        >
                            <div className={`${styles.contactLeftContent}`}>
                                <h2
                                    className={`${styles.txtGradientRight}  leading-[85%] text-[48px] font-normal mb-[33px] mt-[0]`}
                                >
                                    Контакты
                                </h2>
                                <Btns
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                    controls={controls}
                                />
                            </div>

                            {/* Блок "Связаться" */}
                            <motion.div
                                id="form-main"
                                initial={{y: 20, opacity: 1}}
                                animate={controls}
                                className={`${styles.contactRightContent} w-full max-w-[870px] h-[437px] border border-[#353535] rounded-[6px] p-10 relative`}
                                style={{
                                    display: activeTab !== "contact" ? "none" : "block",
                                }}
                            >
                                <FormProvider {...methods}>
                                    <form
                                        method="post"
                                        onSubmit={handleSubmit(onSubmit)}
                                        encType="multipart/form-data"
                                        className={`${
                                            isSubmitted ? "opacity-0" : "opacity-100"
                                        } flex items-start justify-between w-full gap-[30px]`}
                                    >
                                        {/* Textarea */}
                                        <div className="relative w-full max-w-[375px]">
                      <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className={`${styles.bounceElem}
                           placeholder:!text-[#ccc] w-full h-[352px] relative resize-none border border-[#353535] bg-[#101010] focus:!bg-[#20272A] focus:border focus:border-[#737373] rounded-[4px] pt-[13px] pl-[10px] active:outline-none focus:outline-none text-[#ccc] text-[16px] transition-all duration-300
                           ${
                              comment
                                  ? "!bg-[#20272A] border-[#353535]"
                                  : "bg-[#101010] border-[#353535]"
                          }
                           `}
                      ></textarea>
                                            <span
                                                className={`absolute z-[9] left-[3%] top-[4%] pointer-events-none transition-opacity duration-200 ${
                                                    comment.trim() ? "opacity-0" : "opacity-100"
                                                }`}
                                            >
                        Комментарий
                      </span>

                                            {/* Скрытый input для загрузки файла */}
                                            <input
                                                type="file"
                                                placeholder={text}
                                                ref={fileInputRef}
                                                onChange={(e) =>
                                                    handleFileUpload(e, setText, textareaRef)
                                                }
                                                accept=".txt,.text,.md,.csv,.json,.xml,.html,.log" // Можно указать нужные форматы
                                                className="hidden"
                                            />

                                            <div
                                                onClick={() => fileInputRef.current?.click()}
                                                className={`${styles.fileIcon} w-[32px] h-[32px] rounded-[5px] py-[5px] pr-[4px] pl-[7px] absolute top-5 right-5 cursor-pointer hover:bg-[#20272A] transition-colors duration-200`}
                                            >
                                                <svg
                                                    width="21"
                                                    height="22"
                                                    viewBox="0 0 21 22"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.3366 0.0775394C0.788867 0.248058 0.230801 0.81646 0.0706159 1.36936C0.00344136 1.59672 -0.00689319 2.81619 0.00344135 10.5413L0.0189432 19.4548L0.168794 19.7493C0.375485 20.1524 0.726859 20.4986 1.12991 20.6898L1.46578 20.85L4.51964 20.8655C6.4367 20.8758 7.62517 20.8603 7.70784 20.8293C8.02822 20.7053 8.12123 20.1989 7.8732 19.9509L7.74402 19.8165L4.70049 19.7907L1.65697 19.7648L1.45544 19.6047C1.04206 19.274 1.07823 20.1421 1.07823 10.4328V1.7724L1.19708 1.55021C1.27976 1.39519 1.38827 1.28668 1.54329 1.204L1.76548 1.08516H6.77257H11.7745V2.67151C11.7745 4.16485 11.7797 4.27336 11.8778 4.42838C11.9347 4.52139 11.9863 4.60407 11.9915 4.60924C12.0018 4.6144 12.8079 4.63507 13.7897 4.65058L15.5724 4.67641L15.5879 8.58287L15.5983 12.4893L15.3709 12.5772C14.849 12.7787 14.3891 13.1869 12.0277 15.5484C9.57323 18.0028 9.47505 18.1165 9.26319 18.7572C9.12884 19.1654 9.13918 19.7752 9.28903 20.2196C9.49055 20.819 9.98144 21.377 10.5602 21.6664C10.9581 21.8679 11.2629 21.9248 11.7642 21.8989C12.255 21.8679 12.6116 21.7542 13.0043 21.5011C13.1386 21.4184 14.2238 20.3643 15.4174 19.1603C17.7995 16.7627 17.8254 16.7317 17.8615 16.1168C17.8874 15.6569 17.753 15.3417 17.35 14.9593C16.9521 14.5821 16.6524 14.4426 16.2183 14.4477C15.96 14.4477 15.8205 14.4787 15.6034 14.5924C15.2314 14.7784 15.1694 14.8353 13.5727 16.463L12.1879 17.8736V18.1113C12.1879 18.442 12.3894 18.6539 12.7098 18.6539C12.932 18.6539 12.9371 18.6487 14.4098 17.1864C15.2211 16.3803 15.9393 15.6827 16.0117 15.6362C16.2183 15.4967 16.4457 15.5277 16.6524 15.7292C16.8798 15.9411 16.8901 16.0909 16.6886 16.3596C16.6059 16.4681 15.6034 17.4964 14.4563 18.6332C12.193 20.881 12.2344 20.85 11.6711 20.8396C11.1854 20.8345 10.772 20.5813 10.493 20.1059C10.3742 19.9095 10.3535 19.8062 10.3535 19.5065C10.3587 18.8502 10.3225 18.8916 12.9268 16.2976C14.8335 14.3961 15.3296 13.9258 15.6293 13.7501C16.5646 13.2024 17.4482 13.3368 18.2594 14.1532C19.1947 15.0936 19.329 15.9359 18.6935 16.8815C18.6056 17.021 17.6393 18.0235 16.549 19.1189C15.4484 20.2247 14.5441 21.1755 14.5131 21.2582C14.3891 21.5941 14.6682 21.9609 15.0505 21.9609C15.2572 21.9609 15.2831 21.9403 17.1381 20.0852C18.1716 19.0569 19.1585 18.0441 19.3239 17.8375C20.1093 16.866 20.3625 15.786 20.0473 14.7784C19.6494 13.5176 18.3473 12.3808 17.1485 12.2516L16.8643 12.2206L16.8384 8.0248L16.8126 3.82381L16.5025 3.51894C16.332 3.34842 15.4277 2.48549 14.4873 1.60705L12.7821 3.05176e-05L7.17562 0.00519753C2.53024 0.00519753 1.52779 0.0206985 1.3366 0.0775394ZM13.8931 2.68184L14.7973 3.56028H13.8569L12.9113 3.56545V2.68701C12.9113 2.20129 12.932 1.80857 12.9526 1.80857C12.9733 1.80857 13.4022 2.20129 13.8931 2.68184Z"
                                                        fill="#adadad"
                                                    />
                                                    <path
                                                        d="M4.26105 7.98345C4.04402 8.09713 3.97685 8.21081 3.97168 8.45367C3.97168 8.72237 4.11636 8.91873 4.37473 8.99107C4.50391 9.03241 5.79573 9.04274 8.48271 9.03241L12.4047 9.0169L12.5545 8.84638C12.7612 8.61386 12.7612 8.33482 12.5545 8.1023L12.4047 7.93178L8.4052 7.91627C4.90696 7.90594 4.39023 7.91627 4.26105 7.98345Z"
                                                        fill="#adadad"
                                                    />
                                                    <path
                                                        d="M4.12182 11.673C3.86346 11.9365 3.9358 12.3809 4.2665 12.5514C4.43186 12.6341 12.2344 12.6341 12.4205 12.5462C12.7305 12.4067 12.8028 11.9262 12.5548 11.673L12.405 11.5231H8.33831H4.27167L4.12182 11.673Z"
                                                        fill="#adadad"
                                                    />
                                                    <path
                                                        d="M4.25071 15.0886C4.07503 15.1558 3.97168 15.347 3.97168 15.595C3.97168 15.7759 4.00268 15.8482 4.12153 15.9722L4.27138 16.1221H6.76201H9.25263L9.40248 15.9722C9.60401 15.7707 9.61434 15.4245 9.42832 15.2075L9.3043 15.0628L6.82918 15.0524C5.47019 15.0473 4.30755 15.0628 4.25071 15.0886Z"
                                                        fill="#adadad"
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className={`${styles.formInpts} w-full`}>
                                            {/* Кастомный select */}
                                            <div className={`relative mb-[34px]`}>
                                                <div
                                                    ref={selectRef}
                                                    className={`
                                      w-full border rounded-[4px] px-[12px] pr-[17px] py-3 cursor-pointer flex justify-between items-center
                                      transition-border duration-200 ease-in
                                      ${
                                                        selectError && visibleError
                                                            ? "bounce"
                                                            : ""
                                                    }
                                      ${
                                                        isSelectOpen
                                                            ? "!border-[#737373] !bg-[#20272A]"
                                                            : selectedOption !== "" &&
                                                            selectedOption !== "Тема"
                                                                ? "!border-[#353535] !bg-[#20272A]"
                                                                : "!border-[#353535] !bg-[#101010]"
                                                    }

                                    `}
                                                    onClick={() => {
                                                        setIsSelectOpen(!isSelectOpen);
                                                        setSelectError(false);

                                                        setShowPolicy(true);
                                                    }}
                                                    onFocus={handleFieldFocus}
                                                >
                                                      <span
                                                          className={
                                                              selectError ? "text-[#FF3030]" : "text-[#CCC]"
                                                          }
                                                      >
                                                        {selectedOption || "Тема"}
                                                      </span>

                                                    <svg
                                                        width="16"
                                                        height="10"
                                                        viewBox="0 0 16 10"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={`transition-transform duration-200 ${
                                                            isSelectOpen ? "rotate-180" : ""
                                                        }`}
                                                    >
                                                        <path
                                                            d="M1 1L8 8L15 1"
                                                            stroke={
                                                                isSelectOpen
                                                                    ? "#3D9ED6"
                                                                    : selectError
                                                                        ? "#FF3030"
                                                                        : selectedOption
                                                                            ? "#CCC"
                                                                            : "#adadad"
                                                            }
                                                            strokeWidth="2"
                                                        />
                                                    </svg>
                                                </div>

                                                <AnimatePresence>
                                                    {isSelectOpen && (
                                                        <motion.div
                                                            key="select-options"
                                                            initial={{opacity: 0, y: -30}}
                                                            animate={{opacity: 1, y: 0}}
                                                            // exit={{ opacity: 0, y: -10 }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 300,
                                                                damping: 6,
                                                                mass: 0.3,
                                                            }}
                                                            className={`${styles.selectOption} absolute right-[17px] p-[26px] px-[26px] pb-[11px] top-[30px] z-[99999] w-full max-w-[210px] mt-1 border border-[#353535] rounded-[4px]`}
                                                        >
                                                            {options.map((option, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`pb-[15px] cursor-pointer  hover:text-[#CCC]`}
                                                                    onClick={() => {
                                                                        setSelectedOption(option);
                                                                        setSelectError(false);
                                                                        setIsSelectOpen(false);

                                                                        if (option !== "Тема") {
                                                                            setShowPolicy(true);
                                                                        }
                                                                    }}
                                                                >
                                                                    <p
                                                                        className={`${styles["menu-item"]} ${
                                                                            selectedOption === option
                                                                                ? "!text-[#3D9ED6] border-b border-b-[#3D9ED6]"
                                                                                : "text-[#adadad]"
                                                                        }`}
                                                                    >
                                                                        {option}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>


                                            </div>

                                            <AppInput
                                                className={`${styles.bounceElem} w-full mb-[34px]`}
                                                onFocus={handleFieldFocus}
                                                title={"ФИО"}
                                                inputName="name"
                                                required={true}
                                            />

                                            <div
                                                onClick={() => {
                                                    if (!isEmail && !isPhone) {
                                                        bounceElements();
                                                        setFailCheck(true);
                                                    } else {
                                                        setShowPolicy(true);
                                                        setFailCheck(false);
                                                    }
                                                    setEmailError(false);
                                                }}
                                                className="w-full relative z-[1]"
                                            >
                                                <AppInput
                                                    defaultValue={
                                                        isEmail
                                                            ? contactData.email
                                                            : isPhone
                                                                ? contactData.phone
                                                                : ""
                                                    }
                                                    ref={contactInputRef}
                                                    className={`${styles.bounceElem} w-full focus:!bg-[#20272A] !placeholder-opacity-0`}
                                                    title={isPhone ? "Телефон" : isEmail ? "Email" : ""}
                                                    inputName="Contact"
                                                    mask={isPhone ? "phone" : ""}
                                                    type={isPhone ? "tel" : "text"}
                                                    fail={
                                                        visibleError && failCheck && !isPhone && !isEmail
                                                    }
                                                    // fail={emailError}
                                                    required={true}
                                                    // message={false}
                                                    disable={!isPhone && !isEmail}
                                                    value={contactValue}
                                                    onChange={(value) => setContactValue(value)}
                                                    onBlur={() => validContactt(contactValue)}
                                                />
                                            </div>

                                            {/* <div
                        id="bounce-checkbox"
                        ref={checkboxContainerRef}
                        className={`${styles.formCheckboxes} flex items-center gap-[20px] mt-[10px] ml-[10px]`}
                      >
                        <CustomCheckbox
                          id="check-email"
                          successful={emailSuccessful && isEmail}
                          fail={failCheck}
                          // fail={showEmailCheckboxError}
                          checked={isEmail || contactData.email !== ""}
                          onChange={(value) => {
                            setFailCheck(false);
                            // setIsEmail(value);
                            setIsEmail(value || contactData.email !== "");
                            if (value || contactData.email !== "") {
                              setIsPhone(false);
                              setContactValue(contactData.email);
                            } else if (contactData.phone !== "") {
                              setIsPhone(true);
                              setContactValue(contactData.phone);
                            }
                            if (value) {
                              // setContactValue("");
                              setIsPhone(false);
                              setFocus("Contact");
                              setTimeout(() => {
                                contactInputRef.current?.click();
                                contactInputRef.current?.focus();
                              }, 0);
                              setEmailSuccessful(false);
                            }
                          }}
                          label="Email"
                        />
                        <CustomCheckbox
                          id="check-phone"
                          successful={emailSuccessful && isPhone}
                          fail={failCheck}
                          // fail={showPhoneCheckboxError}
                          checked={isPhone || contactData.phone !== ""}
                          onChange={(value) => {
                            setFailCheck(false);
                            // setIsPhone(value);
                            setIsPhone(value || contactData.phone !== "");
                            if (value || contactData.phone !== "") {
                              setIsEmail(false);
                              setContactValue(contactData.phone);
                            } else if (contactData.email !== "") {
                              setIsEmail(true);
                              setContactValue(contactData.email);
                            }
                            if (value) {
                              // setContactValue("");
                              setIsEmail(false);
                              setFocus("Contact");
                              setTimeout(() => {
                                contactInputRef.current?.click();
                                contactInputRef.current?.focus();
                              }, 0);
                              setEmailSuccessful(false);
                            }
                          }}
                          label="Телефон"
                        />
                      </div> */}

                                            <div
                                                id="bounce-checkbox"
                                                ref={checkboxContainerRef}
                                                className={`${styles.formCheckboxes} flex items-center gap-[20px] mt-[10px] ml-[10px]`}
                                            >
                                                <CustomCheckbox
                                                    id="check-email"
                                                    successful={emailSuccessful && isEmail}
                                                    fail={emailCheckboxError} // Используем отдельное состояние ошибки для email
                                                    checked={isEmail || contactData.email !== ""}
                                                    onChange={(value) => {
                                                        setFailCheck(false);
                                                        setEmailCheckboxError(false); // Сбрасываем ошибку при изменении
                                                        setIsEmail(value || contactData.email !== "");
                                                        if (value || contactData.email !== "") {
                                                            setIsPhone(false);
                                                            setContactValue(contactData.email);
                                                        } else if (contactData.phone !== "") {
                                                            setIsPhone(true);
                                                            setContactValue(contactData.phone);
                                                        }
                                                        if (value) {
                                                            setIsPhone(false);
                                                            setFocus("Contact");
                                                            setTimeout(() => {
                                                                contactInputRef.current?.click();
                                                                contactInputRef.current?.focus();
                                                            }, 0);
                                                            setEmailSuccessful(false);
                                                        }
                                                    }}
                                                    label="Email"
                                                />
                                                <CustomCheckbox
                                                    id="check-phone"
                                                    successful={emailSuccessful && isPhone}
                                                    fail={phoneCheckboxError} // Используем отдельное состояние ошибки для телефона
                                                    checked={isPhone || contactData.phone !== ""}
                                                    onChange={(value) => {
                                                        setFailCheck(false);
                                                        setPhoneCheckboxError(false); // Сбрасываем ошибку при изменении
                                                        setIsPhone(value || contactData.phone !== "");
                                                        if (value || contactData.phone !== "") {
                                                            setIsEmail(false);
                                                            setContactValue(contactData.phone);
                                                        } else if (contactData.email !== "") {
                                                            setIsEmail(true);
                                                            setContactValue(contactData.email);
                                                        }
                                                        if (value) {
                                                            setIsEmail(false);
                                                            setFocus("Contact");
                                                            setTimeout(() => {
                                                                contactInputRef.current?.click();
                                                                contactInputRef.current?.focus();
                                                            }, 0);
                                                            setEmailSuccessful(false);
                                                        }
                                                    }}
                                                    label="Телефон"
                                                />
                                            </div>

                                            <div className="relative !w-[220px] !overflow-hidden">
                                                <button
                                                    type="submit"
                                                    onMouseMove={handleMouseMove}
                                                    onMouseLeave={handleMouseLeave}
                                                    className={`${styles.btn} ${styles["send-button"]} ${HeaderStyles["login-button"]} !border-[#353535] bg-[rgb(42_42_42/0.1)] group !w-[220px] !h-[51px] mt-[50px] flex items-center !justify-center`}
                                                    data-text=""
                                                >
                                                  <span
                                                      className="!transition-all !duration-[.11s] !ease-in font-normal text-[#adadad] text-[20px] leading-[120%]">
                                                    Отправить
                                                  </span>
                                                    <svg
                                                        className={`${styles.sendIconRight} transition-all !duration-[.11s] ease-in`}
                                                        width="23"
                                                        height="20"
                                                        viewBox="0 0 23 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M22.9139 9.91388L0.63604 0.36396L3.88829 8.9858L19.7319 9.91388L3.88829 10.842L0.640018 19.4598L22.9139 9.91388Z"
                                                            fill="#adadad"
                                                        />
                                                    </svg>
                                                </button>
                                                <div className={styles.highlight}/>
                                            </div>
                                        </div>
                                    </form>
                                    {/* )} */}

                                    {isSubmitted && (
                                        <div
                                            className={`${styles.contactRightContent} absolute top-0 left-0 w-full h-full p-10 bg-opacity-90 rounded-[6px] flex items-start justify-center z-20`}
                                        >
                                            <FlightSuccess
                                                close={() => setIsSubmitted(false)}
                                                small
                                                text="Сообщение отправлено!"
                                            />
                                        </div>
                                    )}
                                </FormProvider>

                                {/* Анимированный блок с политикой */}
                                <motion.div
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
                                        className={`text-center relative bottom-[-40px] text-[#878787] text-[14px]`}
                                    >
                                        Нажимая на кнопку «Отправить» вы соглашаетесь с
                                        <Link
                                            href="/politic"
                                            className={`!text-[#878787] hover:!text-[#3D9ED6] ${styles["menu-item"]} !text-[14px] font-[300] ml-[4px]`}
                                        >
                                            политикой конфиденциальности
                                        </Link>
                                    </p>
                                </motion.div>
                            </motion.div>

                            {/* Блок "Реквизиты" */}
                            <motion.div
                                id="requisite-block"
                                initial={{y: 20, opacity: 1}}
                                animate={controls}
                                className={`${styles.contactRightContent} w-full max-w-[870px] h-[437px] border border-[#353535] rounded-[6px] p-10`}
                                style={{
                                    display: activeTab !== "requisite" ? "none" : "block",
                                }}
                            >
                                <div className="flex justify-between items-end  mb-5">
                                    <div className="w-full max-w-[516px]">
                                        <label
                                            className="pl-[18px] block text-lg font-normal text-[#ccc] mb-2 leading-[110%]">
                                            Полное наименование
                                        </label>
                                        <input
                                            type="text"
                                            readOnly={false}
                                            defaultValue="Общество с ограниченной ответственностью «АУДИОСЕКТОР»"
                                            className="w-full bg-[#20272A] cursor-not-allowed  border border-[#353535] rounded-[4px] px-4 py-3 text-[#ссс] focus:outline-none focus:border-[#5F5F5F]"
                                        />
                                    </div>

                                    <div className="relative !overflow-hidden">
                                        <button
                                            type="submit"
                                            className={`${styles.btn} ${styles["btnDownloadPdf"]} ${HeaderStyles["login-button"]} group  !w-[220px] !h-[51px]  flex items-center !justify-center gap-2 px-4 py-2 bg-[rgba(42, 42, 42, 0.1)] rounded-[4px] backdrop-blur-[2px] border !border-[#353535] hover:border-[#ccc] cursor-pointer text-[#ccc] font-normal text-[20px] relative  transition-all !duration-[.11s] ease-in `}
                                        >

                                              <span className="whitespace-nowrap !transition-all !duration-[.11s] !ease-in !group-hover:text-[#ccc] text-[20px]">
                                                Скачать PDF
                                              </span>

                                            <Image
                                                className={`${styles.sendIconRight}   transition-all !duration-[.11s] ease-in `}
                                                src="/pdf-icon.svg"
                                                width={36}
                                                height={49}
                                                alt="pdf-icon"
                                            />
                                        </button>
                                        <div className={styles.highlight}/>
                                    </div>

                                    {/*<div className="relative !w-[220px] !overflow-hidden">*/}
                                    {/*    <button*/}
                                    {/*        type="submit"*/}
                                    {/*        onMouseMove={handleMouseMove}*/}
                                    {/*        onMouseLeave={handleMouseLeave}*/}
                                    {/*        className={`${styles.btn} ${styles["btnDownloadPdf"]} ${HeaderStyles["login-button"]} !border-[#353535] bg-[rgb(42_42_42/0.1)] group !w-[220px] !h-[51px] mt-[50px] flex items-center !justify-center`}*/}
                                    {/*        data-text=""*/}
                                    {/*    >*/}
                                    {/*              <span*/}
                                    {/*                  className="!transition-all !duration-[.11s] !ease-in font-normal text-[#adadad] text-[20px] leading-[120%]">*/}
                                    {/*                Скачать PDF*/}
                                    {/*              </span>*/}

                                    {/*        <Image*/}
                                    {/*            className={`${styles.sendIconRight}   transition-all !duration-[.11s] ease-in `}*/}
                                    {/*            src="/pdf-icon.svg"*/}
                                    {/*            width={36}*/}
                                    {/*            height={49}*/}
                                    {/*            alt="pdf-icon"*/}
                                    {/*        />*/}
                                    {/*    </button>*/}
                                    {/*    <div className={styles.highlight}/>*/}
                                    {/*</div>*/}
                                </div>

                                <div className="mb-6">
                                    <label
                                        className="pl-[18px] block text-lg font-light text-[#ccc] mb-2 leading-[110%]">
                                        Юридический адрес
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="180016, Псковская область, г.о. город Псков, г Псков, пр-кт Римский, д. 64А, кв. 44"
                                        className="w-full max-h-[51px] text-[#ссс] cursor-not-allowed bg-[#20272A] border border-[#353535] rounded-[4px] px-4 py-3  focus:outline-none focus:border-[#5F5F5F]"
                                    />
                                </div>

                                <div className="space-y-[14px]">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                className="pl-[18px] block text-lg font-normal text-[#ccc] mb-2 leading-[110%]">
                                                ИНН
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="6000005874"
                                                className="w-full max-h-[51px] text-[#ссс] cursor-not-allowed bg-[#20272A] border border-[#353535] rounded-[4px] px-4 py-3  focus:outline-none focus:border-[#5F5F5F]"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                className="pl-[18px] block text-lg font-normal text-[#ccc] mb-2 leading-[110%]">
                                                ОГРН
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="1236000004569"
                                                className="w-full max-h-[51px] text-[#ссс] cursor-not-allowed bg-[#20272A] border border-[#353535] rounded-[4px] px-4 py-3  focus:outline-none focus:border-[#5F5F5F]"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                className="pl-[18px] block text-lg font-normal text-[#ccc] mb-2 leading-[110%]">
                                                Генеральный директор
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="Владимиров Владимир Михайлович"
                                                className="w-full max-h-[51px] text-[#ссс] cursor-not-allowed bg-[#20272A] border border-[#353535] rounded-[4px] px-4 py-3  focus:outline-none focus:border-[#5F5F5F]"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                className="pl-[18px] block text-lg font-normal text-[#ccc] mb-2 leading-[110%]">
                                                Почта
                                            </label>
                                            {/* 20272A */}
                                            <input
                                                type="email"
                                                defaultValue="info@audiosector.ru"
                                                className="w-full max-h-[51px] text-[#ссс] cursor-not-allowed bg-[#20272A] border border-[#353535] rounded-[4px] px-4 py-3  focus:outline-none focus:border-[#5F5F5F]"
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
