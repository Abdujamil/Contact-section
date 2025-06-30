import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "../../app/page.module.scss";
import headerStyles from "../../components/header/Header.module.css";
import { useMouseTracking } from "../hooks/useMouseTracking";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const links = [
  { href: "/contacts", label: "Контакты" },
  { href: "/blog", label: "Блог" },
  { href: "/politic?tab=license", label: "Лицензии" },
  { href: "/politic?tab=oferta", label: "Оферта" },
  { href: "/politic?tab=politic", label: "Политика" },
];

const FooterLinks: React.FC = () => {
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

  //Links
  const topLinks = links.slice(0, 1);
  const bottomLinks = links.slice(1);

  const { handleMouseMove, handleMouseUp, handleMouseLeave } =
    useMouseTracking();

  const [copied, setCopied] = useState(false);
  const telegramLink = "https://t.me/idsvvs";

  const handleClick = () => {
    navigator.clipboard.writeText(telegramLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.links}>
      <div className="flex items-end justify-between flex-col h-[89px] z-[9999]">
        <div className="flex items-center gap-[9px]">
          {/* Кастомный select */}
          <div className={`relative`} ref={selectRef}>
            <div className="w-[62px] max-w-[220px] m-auto !h-[35px]">
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
              <div className={styles.highlight} />
            </div>
            <AnimatePresence>
              {isSelectOpen && (
                <motion.div
                  key="select-options"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  // exit={{ opacity: 0, y: -10 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 6,
                    mass: 0.3,
                  }}
                  className={`${styles.selectOption}
                  backdrop-blur-[5px]
                  absolute w-[191px] right-0 bottom-[40px] p-[26px] px-[26px] pb-[11px] max-w-[210px] max-h-[300px] overflow-auto mt-1 border border-[#353535] rounded-[4px]`}
                >
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
                                <circle cx="9" cy="9" r="3" fill="#3D9ED6" />
                              </g>
                              <circle cx="9" cy="9" r="2" fill="#3D9ED6" />
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

          {/* Telegram btn */}
          <div className="relative w-full min-w-[137px] m-auto !h-[35px] ">
            <button
              onClick={handleClick}
              className={` ${styles["btn"]} ${headerStyles["login-button"]} ${styles["telegramBtn"]} group w-full !h-full flex items-center !justify-center !px-[15px] !py-[5.5px] `}
              data-text=""
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <span className="font-normal text-[18px] leading-[120%] !transition-all !duration-[.13s] !ease-in">
                Telegram
              </span>

              <svg
                  className={`${styles.sendIconLeft}  transition-all !duration-[.13s] ease-in`}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M16.3356 8.93586L15.2767 15.7155C15.2621 15.809 15.2245 15.8974 15.1674 15.9727C15.1102 16.0481 15.0351 16.1081 14.949 16.1473C14.8629 16.1865 14.7685 16.2037 14.6741 16.1973C14.5797 16.191 14.4883 16.1613 14.4083 16.1109L10.8625 13.8892C10.7888 13.8431 10.7266 13.7808 10.6806 13.707C10.6347 13.6332 10.6062 13.5499 10.5973 13.4635C10.5884 13.377 10.5993 13.2896 10.6293 13.208C10.6593 13.1264 10.7075 13.0527 10.7702 12.9926L13.7137 10.1715C13.7467 10.1404 13.7079 10.089 13.669 10.1123L9.40243 12.6652C9.14884 12.8177 8.84769 12.8707 8.55728 12.8138L7.01269 12.5156C6.45509 12.4078 6.37834 11.6423 6.90195 11.4257L15.1611 8.01105C15.3018 7.95251 15.4556 7.93256 15.6066 7.95324C15.7576 7.97393 15.9003 8.03452 16.0201 8.12875C16.1398 8.22298 16.2323 8.34744 16.2879 8.48932C16.3436 8.63119 16.3594 8.78534 16.3356 8.93586Z"
                    fill="white"
                />
                <path
                    d="M16.3356 8.93586L15.2767 15.7155C15.2621 15.809 15.2245 15.8974 15.1674 15.9727C15.1102 16.0481 15.0351 16.1081 14.949 16.1473C14.8629 16.1865 14.7685 16.2037 14.6741 16.1973C14.5797 16.191 14.4883 16.1613 14.4083 16.1109L10.8625 13.8892C10.7888 13.8431 10.7266 13.7808 10.6806 13.707C10.6347 13.6332 10.6062 13.5499 10.5973 13.4635C10.5884 13.377 10.5993 13.2896 10.6293 13.208C10.6593 13.1264 10.7075 13.0527 10.7702 12.9926L13.7137 10.1715C13.7467 10.1404 13.7079 10.089 13.669 10.1123L9.40243 12.6652C9.14884 12.8177 8.84769 12.8707 8.55728 12.8138L7.01269 12.5156C6.45509 12.4078 6.37834 11.6423 6.90195 11.4257L15.1611 8.01105C15.3018 7.95251 15.4556 7.93256 15.6066 7.95324C15.7576 7.97393 15.9003 8.03452 16.0201 8.12875C16.1398 8.22298 16.2323 8.34744 16.2879 8.48932C16.3436 8.63119 16.3594 8.78534 16.3356 8.93586Z"
                    fill="url(#paint0_linear_3868_3122)"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.47737 2 2 6.47737 2 12C2 17.5226 6.47737 22 12 22C17.5226 22 22 17.5226 22 12C22 6.47737 17.5226 2 12 2ZM4.34438 8.82894C3.92795 9.83429 3.71362 10.9118 3.71362 12C3.71362 14.1977 4.58665 16.3054 6.14064 17.8594C7.69464 19.4134 9.80231 20.2864 12 20.2864C14.1977 20.2864 16.3054 19.4134 17.8594 17.8594C19.4134 16.3054 20.2864 14.1977 20.2864 12C20.2864 10.9118 20.072 9.83429 19.6556 8.82894C19.2392 7.82359 18.6288 6.91011 17.8594 6.14064C17.0899 5.37118 16.1764 4.76081 15.1711 4.34438C14.1657 3.92795 13.0882 3.71362 12 3.71362C10.9118 3.71362 9.83429 3.92795 8.82894 4.34438C7.82359 4.76081 6.91011 5.37118 6.14064 6.14064C5.37118 6.91011 4.76081 7.82359 4.34438 8.82894Z"
                    fill="white"
                    fillOpacity="0.5"
                />
                <defs>
                  <linearGradient
                      id="paint0_linear_3868_3122"
                      x1="496.461"
                      y1="7.94531"
                      x2="496.461"
                      y2="833.274"
                      gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2AABEE" />
                    <stop offset="1" stopColor="#229ED9" />
                  </linearGradient>
                </defs>
              </svg>

            </button>
            {/* Всплывающее уведомление */}
            {copied && (
              <div className="absolute top-[-50px] mt-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#28262680] backdrop-blur-[20px] rounded-[4px] text-white text-sm px-3 py-1 animate-fade-in-out">
                <Check className="w-4 h-4 text-green-400" />
                <span>Скопировано</span>
              </div>
            )}

            <div className={styles.highlight} />
          </div>

          {topLinks.map((link) => (
            <div key={link.href} className="relative">
              <Link
                href={link.href}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className={`${headerStyles["login-button"]}  group !h-[33px] flex items-center justify-center`}
              >
                <span className="font-normal text-[18px] leading-[120%]">
                  {link.label}
                </span>
              </Link>
              <div className={styles.highlight} />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-[9px] list-none">
          {bottomLinks.map((link) => (
            <div key={link.href} className="relative">
              <Link
                href={link.href}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className={`${headerStyles["login-button"]} group !h-[33px] flex items-center justify-center`}
              >
                <span className="font-normal text-[18px] leading-[120%]">
                  {link.label}
                </span>
              </Link>
              <div className={styles.highlight} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
