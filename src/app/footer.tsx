"use client";
import React from "react";
import HeaderStyles from "../components/header/Header.module.css";
import styles from '../app/page.module.scss';
import Image from "next/image";
import AppInput from "@/components/forms/elements/AppInput";
import {useForm, FormProvider} from "react-hook-form";
import Link from "next/link";


const Footer: React.FC = () => {
    const methods = useForm();

    return (
        <footer
            className={`${styles.footer} !fixed bottom-0  w-full bg-[#ffffff10] shadow-[0_0_10px_-5px_#000000] backdrop-blur-sm`}>
            <div
                className={`${styles.footerTop} w-full h-full max-h-[127px] py-[20px] pl-[22px] px-[30px] rounded-[4px] flex items-center justify-between`}>

                <div className={`${styles.form} flex items-center gap-[22px]`}>
                    <Image
                        className="relative bottom-[6px] h-[135px]"
                        src="/micro.png"
                        alt='micro'
                        width={95}
                        height={90}
                    />
                    <div className="flex flex-col items-start justify-between h-[89px]">
                        <p className={`text-[20px] text-[#3D9ED6] mb-[32px] leading-[110%]`}>Подписаться на новости</p>


                        <FormProvider {...methods}>
                            <form action="#" className={`flex items-center gap-[10px]  max-h-[40px]`}>
                                {/*<input*/}
                                {/*    className="w-[228px] bg-[#101010] z-[1] border border-[#353535] rounded-[4px] py-[8px] pr-[10px] pl-[13px] focus:outline-none active:outline-none "*/}
                                {/*    type="email" name="email" id="email" placeholder="Email"/>*/}

                                <AppInput
                                    className={`${styles.footerInpt} !w-[227px] z-[2] mb-[34px] max-h-[40px] !bg-[#101010] focus:!bg-[#20272A] !py-[8px] !pr-[10px] !pl-[13px]`}
                                    title={'Email'}
                                    inputName="email"
                                    required={true}
                                />

                                <div className="relative">
                                    <button
                                          type="submit"
                                          className={`${HeaderStyles["login-button"]} w-[60px] !h-[39] bg-[#101010] z-[1] mb-[10px] border border-[#353535] rounded-[4px] py-[8px] px-[18px] cursor-pointer group flex items-center justify-center`}
                                          data-text=""
                                    >
                                    <span className="font-normal text-[18px] leading-[120%]">
                                      <Image
                                          className=' transition-all duration-[.3s] ease-in-out'
                                          src="/send-icon.svg"
                                          alt='send-icon'
                                          width={24}
                                          height={24}
                                      />
                                    </span>
                                    </button>
                                    <div className={styles.highlight}/>
                                </div>

                                {/*<button*/}
                                {/*    className="w-[60px] h-[40px] bg-[#101010] z-[1] mb-[10px] border border-[#353535] rounded-[4px] py-[8px] px-[18px] cursor-pointer"*/}
                                {/*    type="submit">*/}
                                {/*    <Image*/}
                                {/*        className=' transition-all duration-[.3s] ease-in-out'*/}
                                {/*        src="/send-icon.svg"*/}
                                {/*        alt='send-icon'*/}
                                {/*        width={24}*/}
                                {/*        height={24}*/}
                                {/*    />*/}
                                {/*</button>*/}
                            </form>
                        </FormProvider>
                    </div>
                </div>
                <div className={`${styles.logo} mx-[10px] text-center flex flex-col items-center h-[89px] justify-between`}>
                    <p className="font-[400 text-[#878787] text-[16px]leading-[110%]">ИНН 6000005874 </p>
                    <h3 className="text-[18px] leading-[110%]">ООО &quot;АУДИОСЕКТОР&quot;</h3>
                    <p className="font-[400 text-[#878787] text-[16px] leading-[110%]">© 2025 Audiosector</p>
                </div>
                <div className={`${styles.links}`}>
                    <div className="flex items-end justify-between flex-col h-[89px]">
                        <div className="flex items-center gap-[9px]">
                            <div className="relative">
                                <Link href="/blog"
                                      className={`${HeaderStyles["login-button"]} !border-none group !h-[33px] flex items-center justify-center`}
                                      data-text=""
                                >
                                    <span className="font-normal text-[18px] leading-[120%]">
                                      Блог
                                    </span>
                                </Link>
                                <div className={styles.highlight}/>
                            </div>
                            <div className="relative">
                                <Link href="/contacts"
                                      className={`${HeaderStyles["login-button"]} !w-[120px] !border-none group !h-[33px] flex items-center justify-center`}
                                      data-text=""
                                >
                                    <span className="font-normal text-[18px] leading-[120%]">
                                      Контакты
                                    </span>
                                </Link>
                                <div className={styles.highlight}/>
                            </div>
                        </div>

                        <div className="flex items-center gap-[9px] list-none">
                            <div className="relative">
                                <Link href="/license"
                                      className={`${HeaderStyles["login-button"]} !border-none group !h-[33px] flex items-center justify-center`}
                                      data-text=""
                                >
                                    <span className="font-normal text-[18px] leading-[120%]">
                                      Лицензии
                                    </span>
                                </Link>
                                <div className={styles.highlight}/>
                            </div>
                            <div className="relative">
                                <Link href="/oferta"
                                      className={`${HeaderStyles["login-button"]} !border-none group !h-[33px] flex items-center justify-center`}
                                      data-text=""
                                >
                                    <span className="font-normal text-[18px] leading-[120%]">
                                      Оферта
                                    </span>
                                </Link>
                                <div className={styles.highlight}/>
                            </div>
                            <div className="relative">
                                <Link href="/politic"
                                      className={`${HeaderStyles["login-button"]} !w-[120px] !border-none group !h-[33px] flex items-center justify-center`}
                                      data-text=""
                                >
                                    <span className="font-normal text-[18px] leading-[120%]">
                                      Политика
                                    </span>
                                </Link>
                                <div className={styles.highlight}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;