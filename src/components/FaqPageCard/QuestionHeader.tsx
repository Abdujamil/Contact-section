import styles from '../../app/faq/faq.module.scss';
import React from "react";
import {StaticImageData} from "next/image";

interface Props {
    id: number;
    num: number | string;
    question: string;
    src: string | StaticImageData;
    isOpen: boolean | undefined;
    handleClick: () => void;
}

const QuestionHeader: React.FC<Props> = ({question, isOpen, handleClick}) => {
    return (
        <div
            className={`${styles.question}
                    w-full flex flex-row cursor-pointer items-center border border-[#737373] active:bg-[#20272B] rounded-[8px] active:shadow-[2px_2px_4px_0px_#000000CC_inset,-2px_-2px_4px_0px_#000000CC_inset]`}
            onClick={handleClick}
            style={{
                height: isOpen ? "68px" : "68px",
                alignItems: isOpen ? "start" : "center",
                // borderBottom: isOpen ? "1px solid #737373" : "",
                border: isOpen ? "1px solid #CCCCCC" : "",
            }}
        >

            <div
                className={`${styles.questionContainer} relative z-[99] w-full h-full p-5 inline-flex flex-row items-center transition-all ease duration-[.1s] `}>

                <div className={`${styles.answerContainer} w-full`}>
                    <h3 className={`w-full font-[400] text-[20px] text-[#CCCCCC]  `}
                        style={{color: isOpen ? "#3D9ED6" : "",}}
                    >{question}</h3>
                </div>

                <div className={`${styles.arrow}`}>
                    {isOpen ? (
                        /* Синий SVG при открытом состоянии */
                        <svg
                            className={`transition-all duration-300 ease-in-out`}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path d="M5 5L19 19" stroke="#3D9ED6" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M19 11L19 19L11 19" stroke="#3D9ED6" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    ) : (
                        /* Серый SVG при закрытом состоянии */
                        <svg
                            className={`transition-all duration-300 ease-in-out`}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path d="M5 5L19 19" stroke="#737373" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M19 11L19 19L11 19" stroke="#737373" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    )}
                </div>
            </div>

        </div>
    );
};

export default QuestionHeader;

