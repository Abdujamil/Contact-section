"use client";
import Image from "next/image";
import styles from "@/app/page.module.scss";
import HeaderStyles from "@/components/header/Header.module.css";
import React, {useEffect} from "react";
import {motion, useAnimation} from "framer-motion";
import {bounceActiveBlock} from "@/components/Form/bounce";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";


export default function Contacts() {
    const controls = useAnimation();

    const activeTab = "requisite"
    useEffect(() => {
        bounceActiveBlock(activeTab, controls);
    }, [activeTab]);
    return (
        <>
            <Breadcrumbs detailsUrl={true}/>
            {/* Блок "Реквизиты" */}
            <motion.div
                id="requisite-block"
                initial={{y: 20, opacity: 1}}
                animate={controls}
                className={`${styles.contactRightContent} 
                !font-[Rubik] w-full md:w-[860px] md:h-[432px] h-auto border border-[#353535] rounded-[6px] md:mr-[-1px]
                md:p-[41px] md:pt-[34px] md:mt-[3px] p-5`}
            >
                <div className="flex justify-between items-end mb-[12px]">
                    <div className="w-full max-w-[516px]">
                        <label
                            className="pl-[11.5px] block text-[16px] font-normal text-[#ccc] mb-[4px] leading-[125%]">
                            <span className="mb-[1px]">
                                Полное наименование
                            </span>
                        </label>
                        <p
                            className="w-full flex items-center justify-start md:w-[563px] md:max-h-[51px] bg-[#20272A] !text-[18px] md:text-nowrap
                            overflow-auto cursor-not-allowed  border border-[#353535]
                            rounded-[4px] px-[10px] py-[18px] text-[#ссс] focus:outline-none focus:border-[#5F5F5F]"
                        >
                            <span className={`ml-[.5px]`}>
                                Общество с ограниченной ответственностью «АУДИОСЕКТОР»
                            </span>
                        </p>
                    </div>

                    <div className="relative !overflow-hidden hidden md:block md:mr-[-2px]">
                        <button
                            type="submit"
                            className={`${styles.btn} ${styles["btnDownloadPdf"]} ${HeaderStyles["login-button"]} group !w-[191px] !h-[51px]  flex items-center !justify-center gap-2 px-4 py-2 bg-[rgba(42, 42, 42, 0.1)] rounded-[4px] backdrop-blur-[2px] border !border-[#353535] hover:border-[#ccc] cursor-pointer text-[#ccc] font-normal text-[20px] relative  transition-all !duration-[.13s] ease-in `}
                        >

                                              <span
                                                  className="whitespace-nowrap !transition-all !duration-[.13s] !ease-in !group-hover:text-[#ccc] text-[20px]">
                                                Скачать PDF
                                              </span>

                            <Image
                                className={`${styles.sendIconRight}   transition-all translate-y-[3px] !duration-[.13s] ease-in `}
                                src="/pdf-icon.svg"
                                width={36}
                                height={49}
                                alt="pdf-icon"
                            />
                        </button>
                        <div className={styles.highlight}/>
                    </div>
                </div>

                <div className="mb-[12px] md:w-[778px]">
                    <label
                        className="pl-[11px] block text-[16px] font-light text-[#ccc] mb-[3px] leading-[110%]">
                        Юридический адрес
                    </label>
                    <p
                        className="w-full flex items-center justify-start md:max-h-[51px] text-[#ссс] !text-[18px] cursor-not-allowed
                        bg-[#20272A] border border-[#353535] rounded-[4px] px-[10px] py-[18px]  focus:outline-none focus:border-[#5F5F5F]"
                    >
                         <span className="ml-[.5px]">
                                180016, Псковская область, г.о. город Псков, г Псков, пр-кт Римский, д. 64А, кв.
                                44
                         </span>
                    </p>
                </div>

                <div className="md:w-[778px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-[13px]">
                        <div>
                            <label
                                className="pl-[11px] block text-[16px] font-normal text-[#ccc] mb-[4px] leading-[105%]">
                                ИНН
                            </label>
                            <p
                                className="w-full flex items-center justify-start max-h-[51px] text-[#ссс] !text-[18px]  cursor-not-allowed
                                bg-[#20272A] border border-[#353535] rounded-[4px] px-[10px] py-[18px]  focus:outline-none focus:border-[#5F5F5F]"
                            >
                                <span className={`md:ml-[.5px] md:mt-[1px]`}>
                                    6000005874
                                </span>
                            </p>
                        </div>

                        <div>
                            <label
                                className="pl-[11px] block text-[16px] font-normal text-[#ccc] mb-[4px] leading-[105%]">
                                ОГРН
                            </label>
                            <p
                                className="w-full flex items-center justify-start
                                 md:max-h-[51px] text-[#ссс] !text-[18px]  cursor-not-allowed bg-[#20272A] border
                                 border-[#353535] rounded-[4px] px-[10px] py-[18px]  focus:outline-none focus:border-[#5F5F5F]"
                            >
                                <span className={`md:ml-[.5px] md:mt-[1px]`}>
                                    1236000004569
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:mb-[27px]">
                        <div>
                            <label
                                className="pl-[11px] block text-[18px] font-normal text-[#ccc] mb-[3px] mt-[-.5px] leading-[100%] tracking-[-1.10px]">
                                Генеральный директор
                            </label>
                            <p
                                className="w-full flex items-center justify-start md:max-h-[51px] text-[#ссс] !text-[18px]  cursor-not-allowed bg-[#20272A] border border-[#353535] rounded-[4px] px-[10px] py-[18px]  focus:outline-none focus:border-[#5F5F5F]"
                            >
                                <span className={`ml-[1px] mb-[1px]`}>
                                    Владимиров Владимир Михайлович
                                </span>
                            </p>
                        </div>

                        <div>
                            <label
                                className="pl-[11px] block text-[18px] font-normal text-[#ccc] mb-[3px] leading-[98%] tracking-[-1.3px]">
                                Почта
                            </label>
                            <p
                                className="w-full flex items-center justify-start md:max-h-[51px] text-[#ссс] !text-[18px]  cursor-not-allowed bg-[#20272A] border border-[#353535] rounded-[4px] px-[10px] py-[18px]  focus:outline-none focus:border-[#5F5F5F]"
                            >
                                <span className={`ml-[1px] mb-[1px]`}>
                                    info@audiosector.ru
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="hidden grid-cols-1 md:grid-cols-2 gap-[30px] md:grid">
                        <svg width="374" height="1" viewBox="0 0 374 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="374" y1="0.5" y2="0.5" stroke="url(#paint0_linear_7308_5591)"/>
                            <defs>
                                <linearGradient id="paint0_linear_7308_5591" x1="374" y1="-0.5" x2="0" y2="-0.5" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#353535"/>
                                    <stop offset="1" stopColor="#353535" stopOpacity="0"/>
                                </linearGradient>
                            </defs>
                        </svg>


                        <svg width="373" height="1" viewBox="0 0 373 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="-4.37114e-08" y1="0.5" x2="373" y2="0.499967" stroke="url(#paint0_linear_7308_5592)"/>
                            <defs>
                                <linearGradient id="paint0_linear_7308_5592" x1="4.37114e-08" y1="1.5" x2="373" y2="1.49997" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#353535"/>
                                    <stop offset="1" stopColor="#353535" stopOpacity="0"/>
                                </linearGradient>
                            </defs>
                        </svg>

                    </div>

                    <div className="relative !overflow-hidden block md:top-0  mt-[20px] md:hidden">
                        <button
                            type="submit"
                            className={`${styles.btn} ${styles["btnDownloadPdf"]} ${HeaderStyles["login-button"]} group !w-[212px] m-auto !h-[51px] overflow-hidden flex items-center !justify-center gap-2 px-4 py-2 bg-[rgba(42, 42, 42, 0.1)] rounded-[4px] backdrop-blur-[2px] border !border-[#353535] hover:border-[#ccc] cursor-pointer text-[#ccc] font-normal text-[20px] relative  transition-all !duration-[.13s] ease-in `}
                        >
                            <span
                                className="whitespace-nowrap !transition-all !duration-[.13s] !ease-in !group-hover:text-[#ccc] text-[20px]">
                                Скачать PDF
                            </span>

                            <Image
                                className={`${styles.sendIconRight}   transition-all !duration-[.13s] ease-in `}
                                src="/pdf-icon.svg"
                                width={36}
                                height={49}
                                alt="pdf-icon"
                            />
                        </button>
                        <div className={styles.highlight}/>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
