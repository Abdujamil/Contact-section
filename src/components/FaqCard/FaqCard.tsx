"use client";
import React from "react";
import styles from '../../app/faq/faq.module.scss';
import {FaqCardProps, defaultSettings} from "../utils/types";
import QuestionHeader from "./QuestionHeader";
import AnswerSection from "./AnswerSection";

const FaqCard: React.FC<FaqCardProps> = ({
                                             id,
                                             num,
                                             question,
                                             answer,
                                             src,
                                             isOpen,
                                             onToggle,
                                             animationSettings = defaultSettings,
                                         }) => {
    const handleClick = () => {
        if (onToggle) onToggle(id);
    };

    // className={`relative cursor-pointer s:py-[23px] active:border-[#3D9ED6] group-active/window:text-[#FFF]`}
    return (
        <div
            className={`${styles.faqCard} ${isOpen ? styles.active : ""} transition-all duration-[.5s] `}
            style={{
                // borderColor: isOpen ? "#CCCCCC" : "transparent",
                background: isOpen ? "#53535380" : "",
                boxShadow: isOpen ? "none" : "",
            }}
        >
            <QuestionHeader
                id={id}
                isOpen={isOpen}
                num={num}
                question={question}
                src={src}
                handleClick={handleClick}
            />
            <AnswerSection
                id={id}
                isOpen={isOpen}
                answer={answer}
                src={src}
                animationSettings={animationSettings}
            />
        </div>
    );
};

export default FaqCard;
