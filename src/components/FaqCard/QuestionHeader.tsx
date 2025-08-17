import Image, {StaticImageData} from "next/image";
import styles from '../../app/faq/faq.module.scss';
import React from "react";

interface Props {
    id: number;
    num: number | string;
    question: string;
    src: string | StaticImageData;
    isOpen: boolean | undefined;
    handleClick: () => void;
}

const QuestionHeader: React.FC<Props> = ({num, question, src, isOpen, handleClick}) => {
    return (
        <div
            style={{
                alignItems: isOpen ? "start" : "center",
                border: isOpen ? "1px solid #CCCCCC" : "",
                background: isOpen ? "rgba(61,158,214,0.07)" : "",
            }}
            className={`${styles.question} md:h-[68px]
            w-full flex flex-row cursor-pointer items-center border border-[#353535] active:bg-[#20272b07] rounded-[8px] active:shadow-[2px_2px_4px_0px_#000000CC_inset,-2px_-2px_4px_0px_#000000CC_inset]`}
            onClick={handleClick}
        >

            <div
                className={`${styles.logoOnHover} absolute right-[8%] translate-x-[4px] overflow-hidden hidden z-[9999] w-[157px] h-[157px] border border-[#CCCCCC] rounded-[4px] transition-all ease-in-out duration-[0.3s]`}
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
                className={`${styles.questionContainer} relative z-[-1] w-full h-full p-3 md:p-5 inline-flex flex-row items-center transition-all ease duration-[.1s] `}>
                <div className={`${styles.number} p-[6px]`}
                     style={{
                         position: isOpen ? "relative" : "initial",
                         top: isOpen ? "-12px" : "0",
                     }}
                >
                    <p className={`font-[300] w-[45px] text-[22px] transition-all ease duration-[.1s] relative left-0`}>{num}</p>
                </div>
                <div className={`${styles.answerContainer} w-full`}>
                    <h2 className={`w-full font-[400] text-[18px] md:text-[20px] transition-all ease-in-out duration-[0.3s] text-[#adadad]`}>{question}</h2>
                </div>

                <div className={`${styles.arrow} md:block hidden`}>
                    <svg className={`transition-all duration-[.2s] ease-in-out`} width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 3H8V0H6L6 3ZM14 8.96767L12.5692 7.52908L8.01287 12.1092V6H5.98815V12.1092L1.43177 7.52908L0 8.96767L7 16L7.71538 15.2822L8.43177 14.5634L14 8.96767Z" fill="#ADADAD"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default QuestionHeader;

