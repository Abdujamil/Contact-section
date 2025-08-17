'use client';

import React, {useEffect, useRef, useState} from 'react';
import styles from "@/app/page.module.scss";
import headerStyles from "@/components/header/Header.module.css";
import {useMouseTracking} from "@/components/hooks/useMouseTracking";
import {motion, AnimatePresence} from "framer-motion";
import Link from "next/link";
import Close from "@/components/closeIcon/close";
import {Check} from "lucide-react";
// import FooterSubscriptionForm from "@/components/footer/FooterSubscriptionForm";
// import FooterCompanyInfo from "@/components/footer/FooterCompanyInfo";
// import FooterLinks from "@/components/footer/FooterLinks";

const FooterMob: React.FC = () => {
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setIsSelectOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Select
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const options = [
        "Россия",
        "English",
        "Беларускі",
        "Қазақ тілі",
        "Кыргыз тили",
        "Հայերեն",
        "Azərbaycan dili",
    ];

    const {handleMouseMove, handleMouseUp, handleMouseLeave} = useMouseTracking();

    const [copied, setCopied] = useState(false);
    const telegramLink = "https://t.me/idsvvs";

    const handleTelegramClick = () => {
        navigator.clipboard.writeText(telegramLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <footer
            className={`${styles.footer} !font-[Rubik] z-[99] w-full relative`}>
            <div className={`${styles.footerTop} 
        w-full h-full p-[20px] rounded-[4px] flex flex-col md:flex-row md:items-center items-start justify-between
        md:gap-0
        `}>
                <div className={` mb-[20px] w-full flex flex-col gap-[10px] items-start`}>
                    <div className={`w-full flex items-center justify-between`}>
                        <div className="relative">
                            <a
                                href="mailto:info@audiosector.ru"
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseLeave}
                                className={`${headerStyles["login-button"]} group !h-[36px] flex items-center justify-center`}
                            >
                        <span className="font-normal text-[18px] leading-[75%] underline">
                          info@audiosector.ru
                        </span>
                            </a>
                            <div className={styles.highlight}/>
                        </div>
                        {/* Кастомный select */}
                        <div className={`relative`} ref={selectRef}>
                            <div className="w-[62px] max-w-[220px] m-auto !h-[36px]">
                                <button
                                    onClick={() => {
                                        setIsSelectOpen(!isSelectOpen);
                                    }}
                                    className={` ${styles["btn"]} ${headerStyles["login-button"]} ${styles["langBtn"]} group hover:border-1 w-full !h-full flex items-center !justify-start !border-[#353535]`}
                                    data-text=""
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <svg
                                        width="19"
                                        height="20"
                                        viewBox="0 0 19 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.3975 18.8814C15.1033 17.9397 17.9075 14.7389 18.2592 10.8314H14.1083C13.9533 13.7872 12.9783 16.5372 11.3975 18.8814ZM18.2592 9.16469C17.9075 5.25635 15.1008 2.05469 11.3942 1.11302C12.9758 3.45802 13.9525 6.20802 14.1083 9.16469H18.2592ZM6.86667 1.11302C3.15833 2.05469 0.353333 5.25635 0 9.16469H4.15167C4.3075 6.20802 5.28417 3.45802 6.86667 1.11302ZM0.000833273 10.8314C0.173908 12.7173 0.926331 14.5034 2.15486 15.9447C3.38338 17.386 5.02781 18.4118 6.8625 18.8814C5.28167 16.5372 4.30667 13.7872 4.15167 10.8314H0.000833273ZM9.13 19.133C7.2075 16.8122 6.00333 13.9489 5.82167 10.8314H12.4392C12.2558 13.948 11.0525 16.8122 9.13083 19.133M9.13 0.867188C11.0525 3.18719 12.255 6.04969 12.4383 9.16469H5.82167C6.005 6.04969 7.20833 3.18719 9.13 0.867188Z"
                                            fill="#adadad"
                                        />
                                    </svg>
                                </button>
                                <div className={styles.highlight}/>
                            </div>
                            <AnimatePresence>
                                {isSelectOpen && (
                                    <motion.div
                                        key="select-options"
                                        initial={{opacity: 0, y: -30}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 6,
                                            mass: 0.3,
                                        }}
                                        className={`${styles.selectOption} !bg-[#353535]/10
                  backdrop-blur-[5px]
                  absolute w-[191px] right-0 bottom-[40px] p-[26px] px-[26px] pb-[11px] max-w-[210px] max-h-[300px] overflow-auto mt-1 border border-[#353535] rounded-[4px]`}
                                    >

                                        <div className={`absolute top-[-20px] !right-[-95px]`}>
                                            <Close onClick={() => setIsSelectOpen(false)}/>
                                        </div>

                                        {options.map((option, index) => (
                                            <div
                                                key={index}
                                                className={`relative pb-[15px] cursor-pointer  hover:text-[#CCC]`}
                                                onClick={() => {
                                                    setSelectedOption(option);
                                                    setIsSelectOpen(false);
                                                }}
                                            >
                                                <p
                                                    className={`${
                                                        styles["menu-item"]
                                                    } items-center gap-[4px] ${
                                                        selectedOption === option
                                                            ? "!text-[#3D9ED6] border-b border-b-[#3D9ED6]"
                                                            : "text-[#737373]"
                                                    }`}
                                                >
                        <span className={`flex items-center`}>
                          {selectedOption === option && (
                              <svg
                                  className={`absolute left-[-20px]`}
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                              >
                                  <g filter="url(#filter0_f_3868_3147)">
                                      <circle cx="9" cy="9" r="3" fill="#3D9ED6"/>
                                  </g>
                                  <circle cx="9" cy="9" r="2" fill="#3D9ED6"/>
                                  <defs>
                                      <filter
                                          id="filter0_f_3868_3147"
                                          x="0"
                                          y="0"
                                          width="18"
                                          height="18"
                                          filterUnits="userSpaceOnUse"
                                          colorInterpolationFilters="sRGB"
                                      >
                                          <feFlood
                                              floodOpacity="0"
                                              result="BackgroundImageFix"
                                          />
                                          <feBlend
                                              mode="normal"
                                              in="SourceGraphic"
                                              in2="BackgroundImageFix"
                                              result="shape"
                                          />
                                          <feGaussianBlur
                                              stdDeviation="3"
                                              result="effect1_foregroundBlur_3868_3147"
                                          />
                                      </filter>
                                  </defs>
                              </svg>
                          )}
                            {option}
                        </span>
                                                </p>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="relative">
                        <Link
                            href="/contacts/connection"
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            className={`${headerStyles["login-button"]} group !h-[36px] flex items-center justify-start`}
                        >
                      <span className="font-normal text-[18px] leading-[75%]">
                        Контакты
                      </span>
                        </Link>
                        <div className={styles.highlight}/>
                    </div>
                    {/* Telegram btn */}
                    <div className="relative w-full min-w-[137px] m-auto !h-[36px] ">
                        <button
                            onClick={handleTelegramClick}
                            className={` ${headerStyles["login-button"]}  group w-full !h-full flex items-center !justify-start !px-[20px] !py-[5.5px] `}
                            data-text=""
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                          <span className="font-normal text-[18px] leading-[75%] !transition-all !duration-[.13s] !ease-in">
                            Telegram
                          </span>
                        </button>

                        {/* Всплывающее уведомление для десктопа */}
                        {copied && (
                            <div
                                className="absolute top-[-50px] mt-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#28262680] backdrop-blur-[20px] rounded-[4px] text-white text-sm px-3 py-1 animate-fade-in-out">
                                <Check className="w-4 h-4 text-green-400"/>
                                <span>Скопировано</span>
                            </div>
                        )}

                        <div className={styles.highlight}/>
                    </div>
                </div>

                <svg className={`pl-5`} width="303" height="1" viewBox="0 0 303 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="-4.37114e-08" y1="0.5" x2="303" y2="0.499974" stroke="url(#paint0_linear_5511_3251)"/>
                    <defs>
                        <linearGradient id="paint0_linear_5511_3251" x1="4.37114e-08" y1="1.5" x2="303" y2="1.49997"
                                        gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#9C9C9C"/>
                            <stop offset="1" stopColor="#9C9C9C" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                </svg>

                <div className={`flex flex-col items-start gap-[10px] mt-[20px]`}>
                    <div className="relative">
                        <Link
                            href="/politic/license"
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            className={`${headerStyles["login-button"]} group !h-[36px] flex items-center justify-start`}
                        >
                          <span className="font-normal text-[18px] leading-[75%]">
                            Лицензии
                          </span>
                        </Link>
                        <div className={styles.highlight}/>
                    </div>
                    <div className="relative">
                        <Link
                            href="/politic/oferta"
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            className={`${headerStyles["login-button"]} group !h-[36px] flex items-center justify-start`}
                        >
                          <span className="font-normal text-[18px] leading-[75%]">
                            Публичная оферта
                          </span>
                        </Link>
                        <div className={styles.highlight}/>
                    </div>

                    <div className="relative">
                        <Link
                            href="/politic/policy"
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            className={`${headerStyles["login-button"]} group !h-[36px] flex items-center justify-start`}
                        >
                      <span className="font-normal text-[18px] leading-[75%] text-left text-nowrap">
                        Политика конфиденциальности
                      </span>
                        </Link>
                        <div className={styles.highlight}/>
                    </div>
                </div>

                {/*<FooterLinks />*/}
                {/*<FooterSubscriptionForm />*/}
                {/*<FooterCompanyInfo />*/}
            </div>


            <div className={`h-[143px] flex flex-col gap-[10px] items-center justify-center mt-[6px]`}>
                <p className="font-[400] text-[#adadad] text-[16px] leading-[110%]">ИНН 6000005874</p>
                <p className="text-[18px] leading-[110%] text-[#ccc]">ООО &quot;АУДИОСЕКТОР&quot;</p>
                <p className="font-[400] text-[#adadad] text-[16px] leading-[110%]">© 2025 Audiosector</p>
            </div>
        </footer>
    );
};

export default FooterMob;