"use client";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import {faqData} from "@/data/faq";
import CardListt from "./ShowCardList";
import styles from "../../app/faq/faq.module.scss";
import HeaderStyles from "../header/Header.module.css";
import {useAuth} from "@/components/context/AuthContext";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";
import {motion, AnimatePresence} from "framer-motion";
import Link from "next/link";

export default function FaqPageContent({
                                           id,
                                           fromHeader,
                                       }: {
    id: number;
    fromHeader?: boolean;
}) {
    const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
    const [initialized, setInitialized] = useState(false);
    const {showRegisterPromo} = useAuth();

    const [openFaqItem, setOpenFaqItem] = useState(
        () => faqData.find((item) => item.id === id) || null
    );

    useEffect(() => {
        if (!fromHeader) {
            setOpenQuestionId(id);
        }
        setInitialized(true);
    }, [id, fromHeader]);

    useEffect(() => {
        faqData.forEach((item) => {
            if (typeof item.largeImgSrc === "string") {
                const img = new window.Image();
                img.src = item.largeImgSrc;
                img.onload = () => {
                    setLoadedImages((prev) => ({...prev, [item.id]: true}));
                };
            }
        });
    }, []);

    const currentFaqItem = faqData.find((item) => item.id === id);

    useEffect(() => {
        const found = faqData.find((item) => item.id === openQuestionId);
        if (found) {
            setOpenFaqItem(found);
        }
    }, [openQuestionId]);

    if (!currentFaqItem) return null;

    return (
        <>
            <div className={`flex justify-center px-[10px]`}>
                {/*<div className={`w-[270px] hidden md:block`}></div>*/}

                <h1
                    className={`${styles.title} ${styles.txtGradientRight} tracking-[-1px]
                        w-fit mb-[20px] mt-[-8px] font-normal leading-[110%] text-center text-[28px] text-[#CCCCCC]
                        md:text-[48px] md:m-0 md:mb-[40px] m-auto md:max-w-full
                    `}
                >
                    FAQ: Ответы на главные вопросы
                </h1>
            </div>

            <div
                className="w-full max-w-[1180px] h-auto mx-auto px-[10px] mb-[100px] block md:grid md:grid-cols-4 gap-[40px]">

                <aside
                    className="md:sticky top-[110px] h-fit max-w-[320px]  md:w-[260px] md:px-0 m-auto md:m-0 backdrop-blur-sm z-[9999]">
                    {/* Промо блок */}
                    {showRegisterPromo && (
                        <div
                            className={`${styles.registerBlock} max-h-[142px] mb-[20px] p-[20px] text-center border border-[#353535] rounded-[6px]`}
                        >
                            <h2 className={`${styles.text} mt-[-4px]
                            max-h-[36px] max-w-[220px] m-auto mb-[19px] text-[#3D9ED6] text-[18px] md:text-[20px] font-[400] leading-[110%]`}
                            >
                                При регистрации дарим 30 минут!
                            </h2>
                            <div className="relative md:min-w-[220px] m-auto h-[50px] !overflow-hidden ml-[-1px]">
                                <Link href="/auth/login"
                                    className={` ${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["faqTryBtn"]} 
                                    border !border-[#353535] w-full max-w-[220px] !h-full group flex items-center !justify-between md:!justify-center`}
                                    data-text=""
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <svg
                                        className={`${styles.sendIconLeft}  transition-all !duration-[.13s] ease-in`}
                                        width="18"
                                        height="24"
                                        viewBox="0 0 18 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.625 0.871195V1.74239L14.7964 1.75176L17.9732 1.76581L17.9893 11.9859L18 22.2108H14.8125H11.625V23.1054V24L11.5018 23.9766C11.4375 23.9625 8.94643 23.5691 5.97321 23.1007C2.99464 22.637 0.433928 22.2342 0.27857 22.2061L0 22.1593V11.9953C0 6.4075 0.0160713 1.83607 0.0375004 1.83607C0.0857143 1.83607 11.3571 0.0562077 11.5018 0.0234203L11.625 1.90735e-06V0.871195ZM11.625 12V20.5714H13.8482H16.0714V12V3.42857H13.8482H11.625V12ZM9.39107 11.2974C9.13929 11.4286 9.03214 11.6393 9.03214 12C9.03214 12.3607 9.13929 12.5714 9.39107 12.7026C9.63214 12.8337 9.86786 12.8197 10.0768 12.6698C10.2911 12.5105 10.3929 12.2998 10.3929 12C10.3929 11.7002 10.2911 11.4895 10.0768 11.3302C9.86786 11.1803 9.63214 11.1663 9.39107 11.2974Z"
                                            fill="#adadad"
                                        />
                                    </svg>
                                    <span
                                        className="font-normal text-[18px] md:text-[20px] leading-[120%] !transition-all !duration-[.13s] !ease-in !group-hover:text-[#ccc]">
                                      Попробовать
                                    </span>
                                </Link>
                                <div className={styles.highlight}/>
                            </div>
                        </div>
                    )}

                    {/* Сайдбар с картинкой и FAQAside */}
                    <AnimatePresence mode="wait">
                        {openQuestionId && openFaqItem ? (
                            <motion.div
                                key={openFaqItem?.id}
                                initial={{opacity: 1, y: -30}}
                                animate={{opacity: 1, y: 0}}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 6,
                                    mass: 0.3,
                                }}
                                className="relative w-full h-[320px] md:h-[260px] mb-[20px] rounded-[6px] border border-[#353535]"
                            >
                                <Image
                                    src={openFaqItem.largeImgSrc}
                                    alt={openFaqItem.question}
                                    fill
                                    sizes="260px"
                                    className="rounded-[6px] object-cover"
                                    priority={openFaqItem.id === id}
                                    quality={85}
                                    onLoadingComplete={() =>
                                        setLoadedImages((prev) => ({
                                            ...prev,
                                            [openFaqItem.id]: true,
                                        }))
                                    }
                                />
                                {!loadedImages[openFaqItem.id] && (
                                    <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-[6px]"/>
                                )}
                            </motion.div>
                        ) : (
                            <div className="relative w-full h-[260px] mb-[20px] rounded-[6px] border border-[#353535]">
                                <Image
                                    src="/faq-default-img.png"
                                    alt="Изображение по умолчанию"
                                    fill
                                    sizes="260px"
                                    className="rounded-[6px] object-cover"
                                    quality={85}
                                    priority
                                />
                            </div>
                        )}
                    </AnimatePresence>
                </aside>

                <div className="col-span-3">
                    <div className="">
                        <section
                            className={`${styles.accordion} w-full flex flex-col gap-[5px]`}
                        >
                            {initialized && (
                                <CardListt
                                    initialOpenId={openQuestionId ?? undefined}
                                    onToggle={(id) => setOpenQuestionId(id)}
                                />
                            )}
                        </section>
                    </div>
                </div>
            </div>

        </>
    );
}
