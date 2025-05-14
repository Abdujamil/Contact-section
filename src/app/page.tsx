"use client";

import React, {useState} from "react";
import styles from './faq.module.scss';
import FaqCard from '../components/FaqCard/index'
import {faqData} from "@/data/faq";
import Bg from "@/components/background/bg";

const Home: React.FC = () => {
    const [openId, setOpenId] = useState<number | null>(null);
    // const [animationSettings, setAnimationSettings] = useState({
    //     duration: 0.6,
    //     bounce: 5,
    //     delay: 0,
    //     ease: [0.30, 1.7, 0.60, 1],
    //     times: [0, 0.2, 0.5, 0.8, 1],
    //     openY: [0, 26, 0, 0, 0],
    //     closeY: [60, -6, 0, 0, 0],
    //     opacity: [0, 1, 1, 1, 1],
    // });

    const animationSettings = {
        duration: 0.6,
        bounce: 5,
        delay: 0,
        ease: [0.30, 1.7, 0.60, 1],
        times: [0, 0.2, 0.5, 0.8, 1],
        openY: [0, 26, 0, 0, 0],
        closeY: [60, -6, 0, 0, 0],
        opacity: [0, 1, 1, 1, 1],
    }

    const handleToggle = (id: number) => {
        setOpenId(prevId => prevId === id ? null : id);
    };

    return (
        <>
            <Bg />
            <main className={`${styles.main} w-full h-full`}>
                <div className={`w-full h-full mb-[80px] mt-[120px]`}>
                    <section className={`${styles.accordion} w-full mx-auto max-w-[1180px] pr-[10px] pl-[10px]`}>
                        <h2 className={`${styles.title} ${styles.txtGradientRight} font-normal leading-[110%] text-[48px] text-[#ccc] mb-[30px]`}>FAQ:
                            Ответы
                            на
                            главные
                            вопросы</h2>
                        <div className={`flex flex-col gap-[5px] h-full`}>
                            {faqData.map((item) => (
                                <FaqCard
                                    id={item.id}
                                    key={item.id}
                                    num={item.num}
                                    question={item.question}
                                    answer={item.answer}
                                    fullAnswer={""}
                                    src={item.src}
                                    isOpen={openId === item.id}
                                    onToggle={handleToggle}
                                    animationSettings={animationSettings}
                                />
                            ))}
                        </div>
                    </section>
                    {/*<Footer />*/}
                </div>
            </main>
        </>
    );
};

export default Home;
