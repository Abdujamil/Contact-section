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
            className={`${styles.answer} rounded-[8px]`}
            style={{
                height: isOpen ? "auto" : "0px",
                paddingTop: isOpen ? "30px" : "0px",
                paddingBottom: isOpen ? "30px" : "0px",
                paddingRight: isOpen ? "30px" : "0px",
                borderTopRightRadius: isOpen ? "0" : "4px",
                borderTopLeftRadius: isOpen ? "0" : "4px",
                paddingLeft: isOpen ? "20px" : "0px",
                border: isOpen ? "1px solid #CCCCCC" : "",
                borderTop: isOpen ? "none" : "",
                // marginTop: isOpen ? "6px" : "",
                marginTop: isOpen ? "-5px" : "",
                overflow: "hidden",
                // boxShadow: isOpen ? "0 0 10px #0009, inset 0 0 6px #ffffff1a" : "",
                // backdropFilter: isOpen ? "blur(5px)" : "",
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
