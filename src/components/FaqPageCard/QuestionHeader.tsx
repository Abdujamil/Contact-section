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
                    w-full flex flex-row cursor-pointer items-center border border-[#737373] active:bg-[#20272b07] rounded-[6px] active:shadow-[2px_2px_4px_0px_#000000CC_inset,-2px_-2px_4px_0px_#000000CC_inset]`}
            onClick={handleClick}
            style={{
                alignItems: isOpen ? "start" : "center",
                background: isOpen ? "rgba(61,158,214,0.07)" : "",
                border: isOpen ? "1px solid #CCCCCC" : "",
            }}
        >

            <div
                className={`${styles.questionContainer} relative z-[99] w-full h-full px-[15px] py-[12px] md:p-5 inline-flex flex-row items-center transition-all ease duration-[.1s] `}>

                <div className={`${styles.answerContainer} w-full`}>
                    <h3 className={`w-full font-[400] text-[18px] md:text-[20px] text-[#adadad]`}
                        style={{color: isOpen ? "#3D9ED6" : "",}}
                    >{question}</h3>
                </div>

                <div className={`${styles.arrow} hidden md:block`}>
                    <svg
                        className={`transition-all duration-[.2s] ease-in-out`} width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 3H8V0H6L6 3ZM14 8.96767L12.5692 7.52908L8.01287 12.1092V6H5.98815V12.1092L1.43177 7.52908L0 8.96767L7 16L7.71538 15.2822L8.43177 14.5634L14 8.96767Z" fill="#ADADAD"/>
                    </svg>
                </div>
            </div>

        </div>
    );
};

export default QuestionHeader;

