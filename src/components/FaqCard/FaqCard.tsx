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
    return (
        <div
            className={`${styles.faqCard} ${isOpen ? styles.active : ""} transition-all duration-[.5s]`}
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
