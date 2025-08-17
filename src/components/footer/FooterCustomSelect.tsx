import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../app/page.module.scss";
import headerStyles from "../header/Header.module.css";
import { useMouseTracking } from "../hooks/useMouseTracking";

interface CustomSelectProps {
    options: string[];
    selectedOption: string;
    onSelect: (option: string) => void;
    className?: string;
    width?: string;
    height?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
                                                       options,
                                                       selectedOption,
                                                       onSelect,
                                                       className = "",
                                                       width = "62px",
                                                       height = "35px",
                                                   }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const { handleMouseMove, handleMouseLeave } = useMouseTracking();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option: string) => {
        onSelect(option);
        setIsOpen(false);
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`relative ${className}`} ref={selectRef}>
            <div style={{ width, maxWidth: "220px", margin: "auto", height }}>
                <button
                    onClick={toggleOpen}
                    className={`${styles["btn"]} ${headerStyles["login-button"]} ${styles["langBtn"]} group hover:border-1 w-full h-full flex items-center justify-center`}
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
                {/*<div className={styles.highlight} />*/}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="select-options"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 6,
                            mass: 0.3,
                        }}
                        className={`${styles.selectOption} z-[99999] backdrop-blur-[5px] absolute w-[191px] right-0 bottom-[40px] p-[26px] px-[26px] pb-[11px] max-w-[210px] max-h-[300px] overflow-auto mt-1 border border-[#353535] rounded-[4px]`}
                    >
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="relative pb-[15px] cursor-pointer hover:text-[#CCC]"
                                onClick={() => handleOptionClick(option)}
                            >
                                <p
                                    className={`${styles["menu-item"]} items-center gap-[4px] ${
                                        selectedOption === option
                                            ? "!text-[#3D9ED6] border-b border-b-[#3D9ED6]"
                                            : "text-[#737373]"
                                    }`}
                                >
                  <span className="flex items-center">
                    {selectedOption === option && (
                        <svg
                            className="absolute left-[-20px]"
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
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
    );
};

export default CustomSelect;