import React, {useState, useRef, useEffect} from "react";
import Link from "next/link";
import styles from "../../app/page.module.scss";
import headerStyles from "../../components/header/Header.module.css";
import {useMouseTracking} from "../hooks/useMouseTracking";
import {motion, AnimatePresence, useAnimation} from "framer-motion";
import {Check} from "lucide-react";
import Close from "@/components/closeIcon/close";
import {bounceActiveBlock} from "@/components/Form/bounce";

const links = [
    {href: "/contacts", label: "Контакты"},
    {href: "https://t.me/idsvvs", label: "Telegram", isTelegram: true},
    {href: "/politic/policy", label: "Политика"},
    {href: "/politic/license", label: "Лицензии"},
    {href: "/politic/oferta", label: "Оферта"},
    {href: "/blog", label: "Блог"},
];

const FooterLinks: React.FC = () => {
    const controls = useAnimation();
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

    useEffect(() => {
        if (isSelectOpen) {
            const timer = setTimeout(() => {
                bounceActiveBlock('options', controls);
            }, 10);

            return () => clearTimeout(timer);
        }
    }, [isSelectOpen, controls]);

    return (
        <div className={`${styles.links} m-auto sm:m-0`}>
            {/* Мобильная версия */}
            <div className="block md:hidden">
                <div className="grid grid-cols-2 gap-[9px] mb-4">
                    {links.map((link) => (
                        <div key={link.href} className="relative">
                            {link.isTelegram ? (
                                <button
                                    onClick={handleTelegramClick}
                                    className={`${styles["btn"]} ${headerStyles["login-button"]} ${styles["telegramBtn"]} group w-full !h-[50px] flex items-center !justify-center !px-[15px] !py-[5.5px]`}
                                    data-text=""
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                >
                                      <span
                                          className="font-normal text-[18px] leading-[120%] !transition-all !duration-[.13s] !ease-in">
                                        {link.label}
                                      </span>
                                    <svg
                                        className={`${styles.sendIconLeft} ml-2 transition-all !duration-[.13s] ease-in`}
                                        width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14.3356 6.93586L13.2767 13.7155C13.2621 13.809 13.2245 13.8974 13.1674 13.9727C13.1102 14.0481 13.0351 14.1081 12.949 14.1473C12.8629 14.1865 12.7685 14.2037 12.6741 14.1973C12.5797 14.191 12.4883 14.1613 12.4083 14.1109L8.86251 11.8892C8.78881 11.8431 8.72661 11.7808 8.68064 11.707C8.63467 11.6332 8.60615 11.5499 8.59725 11.4635C8.58835 11.377 8.59931 11.2896 8.62928 11.208C8.65926 11.1264 8.70746 11.0527 8.77022 10.9926L11.7137 8.17153C11.7467 8.14045 11.7079 8.08896 11.669 8.11228L7.40243 10.6652C7.14884 10.8177 6.84769 10.8707 6.55728 10.8138L5.01269 10.5156C4.45509 10.4078 4.37834 9.64229 4.90195 9.42566L13.1611 6.01105C13.3018 5.95251 13.4556 5.93256 13.6066 5.95324C13.7576 5.97393 13.9003 6.03452 14.0201 6.12875C14.1398 6.22298 14.2323 6.34744 14.2879 6.48932C14.3436 6.63119 14.3594 6.78534 14.3356 6.93586Z"
                                            fill="white"/>
                                        <path
                                            d="M14.3356 6.93586L13.2767 13.7155C13.2621 13.809 13.2245 13.8974 13.1674 13.9727C13.1102 14.0481 13.0351 14.1081 12.949 14.1473C12.8629 14.1865 12.7685 14.2037 12.6741 14.1973C12.5797 14.191 12.4883 14.1613 12.4083 14.1109L8.86251 11.8892C8.78881 11.8431 8.72661 11.7808 8.68064 11.707C8.63467 11.6332 8.60615 11.5499 8.59725 11.4635C8.58835 11.377 8.59931 11.2896 8.62928 11.208C8.65926 11.1264 8.70746 11.0527 8.77022 10.9926L11.7137 8.17153C11.7467 8.14045 11.7079 8.08896 11.669 8.11228L7.40243 10.6652C7.14884 10.8177 6.84769 10.8707 6.55728 10.8138L5.01269 10.5156C4.45509 10.4078 4.37834 9.64229 4.90195 9.42566L13.1611 6.01105C13.3018 5.95251 13.4556 5.93256 13.6066 5.95324C13.7576 5.97393 13.9003 6.03452 14.0201 6.12875C14.1398 6.22298 14.2323 6.34744 14.2879 6.48932C14.3436 6.63119 14.3594 6.78534 14.3356 6.93586Z"
                                            fill="url(#paint0_linear_3868_3123)"/>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M10 0C4.47737 0 0 4.47737 0 10C0 15.5226 4.47737 20 10 20C15.5226 20 20 15.5226 20 10C20 4.47737 15.5226 0 10 0ZM2.34438 6.82894C1.92795 7.83429 1.71362 8.91182 1.71362 10C1.71362 12.1977 2.58665 14.3054 4.14064 15.8594C5.69464 17.4134 7.80231 18.2864 10 18.2864C12.1977 18.2864 14.3054 17.4134 15.8594 15.8594C17.4134 14.3054 18.2864 12.1977 18.2864 10C18.2864 8.91182 18.072 7.83429 17.6556 6.82894C17.2392 5.82359 16.6288 4.91011 15.8594 4.14064C15.0899 3.37118 14.1764 2.76081 13.1711 2.34438C12.1657 1.92795 11.0882 1.71362 10 1.71362C8.91182 1.71362 7.83429 1.92795 6.82894 2.34438C5.82359 2.76081 4.91011 3.37118 4.14064 4.14064C3.37118 4.91011 2.76081 5.82359 2.34438 6.82894Z"
                                              fill="#ADADAD"/>
                                        <defs>
                                            <linearGradient id="paint0_linear_3868_3123" x1="494.461" y1="5.94531"
                                                            x2="494.461" y2="831.274" gradientUnits="userSpaceOnUse">
                                                <stop offset="0" stopColor="#2AABEE"/>
                                                <stop offset="1" stopColor="#229ED9"/>
                                            </linearGradient>
                                        </defs>

                                    </svg>
                                </button>
                            ) : (
                                <Link
                                    href={link.href}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseLeave}
                                    className={`${headerStyles["login-button"]} group !h-[50px] flex items-center justify-center w-full`}
                                >
                                  <span className="font-normal text-[18px] leading-[120%]">
                                    {link.label}
                                  </span>
                                </Link>
                            )}
                            <div className={styles.highlight}/>
                        </div>
                    ))}
                </div>

                {/* Всплывающее уведомление для мобильной версии */}
                {copied && (
                    <div
                        className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#28262680] backdrop-blur-[20px] rounded-[4px] text-white text-sm px-3 py-1 animate-fade-in-out z-50">
                        <Check className="w-4 h-4 text-green-400"/>
                        <span>Скопировано</span>
                    </div>
                )}
            </div>

            {/* Десктопная версия */}
            <div className="hidden md:flex items-end justify-between flex-col h-[89px] z-[9999]">
                <div className="flex items-center gap-[9px]">

                    <div className="relative">
                        <a
                            href="mailto:info@audiosector.ru"
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            className={`${headerStyles["login-button"]} group !h-[36px] flex items-center justify-center`}
                        >
                        <span className="font-normal text-[18px] leading-[75%]">
                          info@audiosector.ru
                        </span>
                        </a>
                        <div className={styles.highlight}/>
                    </div>


                    <div className="relative">
                        <Link
                            href="/contacts/connection"
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            className={`${headerStyles["login-button"]} group !h-[36px] flex items-center justify-center`}
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
                            className={` ${headerStyles["login-button"]}  group w-full !h-full flex items-center !justify-center !px-[15px] !py-[5.5px] `}
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

                    {/* Кастомный select */}
                    <div className={`relative`} ref={selectRef}>
                        <div className="w-[62px] max-w-[220px] m-auto !h-[36px]">
                            <button
                                onClick={() => {
                                    setIsSelectOpen(!isSelectOpen);
                                }}
                                className={` ${styles["btn"]} ${headerStyles["login-button"]} ${styles["langBtn"]} group hover:border-1 w-full !h-full flex items-center !justify-center`}
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
                                    id="select-options"
                                    key="select-options"
                                    initial={{y: 0, opacity: 1}}
                                    animate={controls}
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

                <div className="flex items-center gap-[9px] list-none">
                    <div className="relative">
                        <Link
                            href="/politic/policy"
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            className={`${headerStyles["login-button"]} group !h-[36px] flex items-center justify-center`}
                        >
                      <span className="font-normal text-[18px] leading-[75%]">
                        Политика конфиденциальности
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
                            className={`${headerStyles["login-button"]} group !h-[36px] flex items-center justify-center`}
                        >
              <span className="font-normal text-[18px] leading-[75%]">
                Публичная оферта
              </span>
                        </Link>
                        <div className={styles.highlight}/>
                    </div>

                    <div className="relative">
                        <Link
                            href="/politic/license"
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            className={`${headerStyles["login-button"]} group !h-[36px] flex items-center justify-center`}
                        >
              <span className="font-normal text-[18px] leading-[75%]">
                Лицензии
              </span>
                        </Link>
                        <div className={styles.highlight}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterLinks;