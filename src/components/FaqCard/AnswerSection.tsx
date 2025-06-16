import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../app/faq/faq.module.scss";
import { useButton } from "../utils/useButton";
import { AnimationSettings } from "../utils/types";
import HeaderStyles from "../header/Header.module.css";
import { StaticImageData } from "next/image";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";


interface Props {
  id: number;
  isOpen: boolean | undefined;
  answer: string;
  src: string | StaticImageData;
  animationSettings: AnimationSettings;
}

const AnswerSection: React.FC<Props> = ({
  id,
  isOpen,
  answer,
  src,
  animationSettings,
}) => {
  const controls = useAnimation();
  const { setButtonRef } = useButton();
  const router = useRouter();

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
      className={`${styles.answer} rounded-[6px]`}
      style={{
        height: isOpen ? "auto" : "0px",
        paddingTop: isOpen ? "30px" : "0px",
        paddingBottom: isOpen ? "30px" : "0px",
        paddingRight: isOpen ? "90px" : "0px",
        paddingLeft: isOpen ? "80px" : "0px",
        borderTopRightRadius: isOpen ? "0" : "4px",
        borderTopLeftRadius: isOpen ? "0" : "4px",
        border: isOpen ? "1px solid #CCCCCC" : "",
        borderTopColor: isOpen ? "transparent" : "",
        marginTop: isOpen ? "-4px" : "",
        boxShadow: isOpen ? "0 0 10px #0009, inset 0 0 6px #ffffff1a" : "",
        overflow: "hidden",
      }}
    >
      <div className={`${styles.texts} flex gap-[40px] mb-[24px]`}>
        <p className="text-[18px] font-normal leading-[140%]">{answer}</p>
        <motion.div
          className="w-[155px] max-h-[155px] mt-[5px]"
          initial={{ y: 20, opacity: 0 }}
          animate={controls}
          style={{ display: isOpen ? "block" : "none" }}
        >
          <img
            src={typeof src === "string" ? src : src.src}
            alt="FAQ image"
            className="w-full min-w-[155px] h-[155px] border border-[#CCCCCC] rounded-[6px]"
          />
        </motion.div>
      </div>

      <motion.div
        ref={setButtonRef}
        initial={{ y: 20, opacity: 0 }}
        style={{ display: isOpen ? "block" : "none" }}
        animate={controls}
        className="relative !w-[220px] !overflow-hidden"
        onClick={() => router.push(`/faqPage/${id}`)}
      >
        <button
          className={`${HeaderStyles["login-button"]} ${styles["btn"]} border !border-[#353535]
                                        cursor-pointer !w-[220px] !h-[51px] !rounded-[4px] group flex items-center !justify-center`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <svg
            className={`${styles.sendIconLeft}  transition-all !duration-[.15s] ease-in`}
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="1" y="1" width="24" height="24" rx="2" fill="#737373" />
            <g clipPath="url(#clip0_3069_1633)">
              <path
                d="M5.81641 13H20.1828"
                stroke="#191919"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.0783 8.8953L20.183 13L16.0783 17.1047"
                stroke="#191919"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_3069_1633">
                <rect
                  width="17.4147"
                  height="17.4147"
                  fill="white"
                  transform="translate(0.685547 13) rotate(-45)"
                />
              </clipPath>
            </defs>
          </svg>

          <span className="text-[20px] !transition-all !duration-[.15s] !ease-in !group-hover:text-[#ccc]">
            Подробнее
          </span>
          {/*<svg*/}
          {/*  className={`${styles.sendIconRight}  transition-all !duration-[.15s] ease-in`}*/}
          {/*  width="26"*/}
          {/*  height="26"*/}
          {/*  viewBox="0 0 26 26"*/}
          {/*  fill="none"*/}
          {/*  xmlns="http://www.w3.org/2000/svg"*/}
          {/*>*/}
          {/*  <rect x="1" y="1" width="24" height="24" rx="2" fill="#737373" />*/}
          {/*  <g clipPath="url(#clip0_3069_1633)">*/}
          {/*    <path*/}
          {/*      d="M5.81641 13H20.1828"*/}
          {/*      stroke="#191919"*/}
          {/*      strokeWidth="2"*/}
          {/*      strokeLinecap="round"*/}
          {/*      strokeLinejoin="round"*/}
          {/*    />*/}
          {/*    <path*/}
          {/*      d="M16.0783 8.8953L20.183 13L16.0783 17.1047"*/}
          {/*      stroke="#191919"*/}
          {/*      strokeWidth="2"*/}
          {/*      strokeLinecap="round"*/}
          {/*      strokeLinejoin="round"*/}
          {/*    />*/}
          {/*  </g>*/}
          {/*  <defs>*/}
          {/*    <clipPath id="clip0_3069_1633">*/}
          {/*      <rect*/}
          {/*        width="17.4147"*/}
          {/*        height="17.4147"*/}
          {/*        fill="white"*/}
          {/*        transform="translate(0.685547 13) rotate(-45)"*/}
          {/*      />*/}
          {/*    </clipPath>*/}
          {/*  </defs>*/}
          {/*</svg>*/}
        </button>
        <div className={styles.highlight} />
      </motion.div>

      {/*</div>*/}
    </div>
  );
};

export default AnswerSection;
