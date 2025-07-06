"use client";

import React from "react";
import styles from "@/app/page.module.scss";
import HeaderStyles from "@/components/header/Header.module.css";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";

interface CustomButtonProps {
    label: string;
    iconLeft: React.ReactNode;
    iconRight: React.ReactNode;
    isActive?: boolean;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
                                                       label,
                                                       iconLeft,
                                                       className,
                                                       isActive = false,
                                                       onClick,
                                                   }) => {

    return (
        <div className="relative !w-[220px] m-auto !overflow-hidden">
            <button
                onClick={onClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={` ${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["customBtn"]} border !border-[#353535] transition-all !duration-[.13s] ease-in cursor-pointer md:!w-[220px] !w-full !h-[51px] m-auto !rounded-[4px] group flex items-center !justify-between`}
                style={{color: isActive ? "#3D9ED6" : "#adadad"}}
            >
        <span
            className={`text-[20px] !transition-all !duration-[.13s] !ease-in ${
                isActive ? "!text-[#3D9ED6]" : "#adadad"
            } ${className} `}
        >
          {label}
        </span>

                <span className={`${styles.sendIconLeft2} flex items-center justify-end transition-all !duration-[.13s] ease-in`}>
          {iconLeft}
        </span>

                <span className={`${styles.sendIconRight2} flex items-center justify-end transition-all !duration-[.13s] ease-in`}>
          {iconLeft}
        </span>
            </button>

            <div className={styles.highlight}/>
        </div>
    );
};

export default CustomButton;
