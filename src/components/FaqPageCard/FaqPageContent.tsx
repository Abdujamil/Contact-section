"use client";
import React, {useState, useMemo, useEffect} from "react";
import Image from "next/image";
import {faqData} from "@/data/faq";
import CardListt from "./ShowCardList";
import FaqAside from "./FaqAside";
import styles from '../../app/faq.module.scss';
import HeaderStyles from '../header/Header.module.css';

export default function FaqPageContent({id}: { id: number }) {
    const [openQuestionId, setOpenQuestionId] = useState<number | null>(id);
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

    // Предзагрузка изображений при монтировании
    useEffect(() => {
        faqData.forEach(item => {
            if (typeof item.largeImgSrc === 'string') {
                const img = new window.Image();
                img.src = item.largeImgSrc;
                img.onload = () => {
                    setLoadedImages(prev => ({...prev, [item.id]: true}));
                };
            }
        });
    }, []);

    const {currentFaqItem, openFaqItem} = useMemo(() => {
        const current = faqData.find((item) => item.id === id);
        const open = faqData.find((item) => item.id === openQuestionId) || current;
        return {currentFaqItem: current, openFaqItem: open};
    }, [id, openQuestionId]);

    if (!currentFaqItem || !openFaqItem) return null;

    return (
        <>
            <aside className="sticky top-20 h-fit w-[260px] backdrop-blur-sm z-[999999]">
                <div
                    className={`${styles.registerBlock} mb-[20px] p-[20px] text-center border border-[#353535] rounded-[8px]`}>
                    <p className={`${styles.text} mb-[16px] text-[#3D9ED6] text-[20px] font-[400] leading-[110%]`}>
                        При регистрации дарим 30 минут!
                    </p>

                    <div className="relative w-full flex h-[51px] items-center justify-center">
                        <button
                            className={`${HeaderStyles["login-button"]} w-full max-w-[200px] !h-full  group flex items-center justify-center`}
                            data-text=""
                         >
                        <span className="font-normal  text-[20px] leading-[120%]">
                          Попробовать
                        </span>
                        </button>
                        <div className={styles.highlight}/>
                    </div>

                </div>

                    {openQuestionId && (
                        <>
                            <div className="relative w-full h-[260px] mb-[20px] rounded-[8px]">
                                <Image
                                    src={openFaqItem.largeImgSrc}
                                    alt={openFaqItem.question}
                                    fill
                                    sizes="260px"
                                    className="rounded-[8px] object-cover"
                                    priority={openFaqItem.id === id}
                                    quality={85}
                                    onLoadingComplete={() => setLoadedImages(prev => ({...prev, [openFaqItem.id]: true}))}
                                />

                                {!loadedImages[openFaqItem.id] && (
                                    <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-[8px]"/>
                                )}


                            </div>
                            <FaqAside items={openFaqItem.aside}/>
                        </>
                    )}
            </aside>
            <div className="col-span-3">
                <div className="pb-[40px]">
                    <h2 className={`${styles.title} ${styles.txtGradientRight} mb-[30px] font-normal leading-[110%] text-[48px] text-[#CCCCCC]`}>
                        FAQ: Ответы на главные вопросы
                    </h2>
                    <section className={`${styles.accordion} w-full flex flex-col gap-[5px]`}>
                        <CardListt
                            initialOpenId={id}
                            onToggle={(id) => setOpenQuestionId(id)}
                        />
                    </section>
                </div>
            </div>
        </>
    );
}

