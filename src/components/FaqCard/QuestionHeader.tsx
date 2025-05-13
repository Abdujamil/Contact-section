import Image from "next/image";
import styles from '../../app/faq.module.scss';
import React from "react";

interface Props {
    id: number;
    num: number | string;
    question: string;
    src: any;
    isOpen: boolean | undefined;
    handleClick: () => void;
}

const QuestionHeader: React.FC<Props> = ({id, num, question, src, isOpen, handleClick}) => {
    return (
        <div
            style={{
                height: isOpen ? "68px" : "68px",
                alignItems: isOpen ? "start" : "center",
                border: isOpen ? "1px solid #CCCCCC" : "",
            }}
            className={`${styles.question}
                    w-full flex flex-row items-center cursor-pointer bg-[#5353537F] active:border-[#3D9ED6] group-active/window:text-[#FFF] active:bg-[#20272B] rounded-[6px] active:shadow-[2px_2px_4px_0px_#000000CC_inset,-2px_-2px_4px_0px_#000000CC_inset]`}
            onClick={handleClick}
        >

            <div
                className={`${styles.logoOnHover} absolute right-[8%] overflow-hidden hidden z-[9999] w-[157px] h-[157px] border border-[#CCCCCC] backdrop-blur-[2.5px]  rounded-[4px] transition-all ease-in-out duration-[0.3s]`}
                style={{
                    display: isOpen ? "none" : "",
                }}
            >

                <Image
                    src={src}
                    alt="FAQ image"
                    width={155}
                    height={155}
                    className="rounded-[4px] transition-all ease-in-out duration-[.3s]"
                    style={{objectFit: "contain", aspectRatio: "1 / 1"}}
                />
            </div>

            <div
                className={`${styles.questionContainer} relative z-[99] w-full h-full p-5 inline-flex flex-row items-center transition-all ease duration-[.1s] `}>
                <div className={`${styles.number} p-[6px]`}
                     style={{
                         position: isOpen ? "relative" : "initial",
                         top: isOpen ? "-12px" : "0",
                     }}
                >
                    <p className={`font-[300] w-[45px] text-[22px] transition-all ease duration-[.1s] relative left-0`}>{num}</p>
                </div>
                <div className={`${styles.answerContainer} w-full`}>
                    <h3 className={`w-full font-[400] text-[20px] transition-all ease-in-out duration-[0.3s] `}>{question}</h3>
                </div>

                <div className={`${styles.arrow}`}>
                    <svg className={`transition-all duration-[.2s] ease-in-out`} width="24" height="24"
                         viewBox="0 0 24 24" fill="none">
                        <path d="M5 5L19 19" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M19 11L19 19L11 19" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default QuestionHeader;

