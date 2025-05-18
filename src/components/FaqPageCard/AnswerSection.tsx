import {motion, useAnimation} from "framer-motion";
import {ReactNode, useEffect} from "react";
import styles from '../../app/faq/faq.module.scss';
import {AnimationSettings} from "../utils/types";
import {StaticImageData} from "next/image";

interface Props {
    id: number;
    isOpen: boolean | undefined;
    fullAnswer: ReactNode;
    src: string | StaticImageData;
    animationSettings: AnimationSettings;
}

const AnswerSection: React.FC<Props> = ({isOpen, fullAnswer, animationSettings}) => {
    const controls = useAnimation();

    useEffect(() => {
        const target = {
            y: isOpen ? animationSettings.openY : animationSettings.closeY,
            opacity: isOpen ? [0, 1, 1, 1, 1] : [1, 1, 1, 1, 0],
            transition: {
                duration: animationSettings.duration,
                ease: animationSettings.ease,
                times: animationSettings.times,
            },
        };
        controls.start(target);
    }, [isOpen, animationSettings]);

    return (
        <div
            className={`${styles.answer} bg-[#1A1A1A] rounded-[8px]`}
            style={{
                height: isOpen ? "auto" : "0px",
                paddingTop: isOpen ? "30px" : "0px",
                paddingBottom: isOpen ? "30px" : "0px",
                paddingRight: isOpen ? "30px" : "0px",
                paddingLeft: isOpen ? "30px" : "0px",
                border: isOpen ? "1px solid #CCCCCC" : "",
                marginTop: isOpen ? "6px" : "",
                overflow: "hidden",
            }}
        >
            <div className={`${styles.texts}`}>
                <div className="text-[18px] font-normal">{fullAnswer}</div>
                <motion.div
                    initial={{y: 20, opacity: 0}}
                    animate={controls}
                    style={{display: isOpen ? "block" : "none"}}
                >
                </motion.div>
            </div>
        </div>
    );
};

export default AnswerSection;
