"use client";
import React from "react";
import styles from '../app/page.module.scss';
import Image from "next/image";
import AppInput from "@/components/forms/elements/AppInput";
import {useForm, FormProvider} from "react-hook-form";


const Footer: React.FC = () => {
    const methods = useForm();


    return (
        <footer
            className={`${styles.footer} w-full bg-[#ffffff10] shadow-[0_0_10px_-5px_#000000] backdrop-blur-sm`}>
            <div
                className={`${styles.footerTop} w-full h-full max-h-[127px] p-[20px] rounded-[4px] flex items-center justify-between`}>
                <div className={`${styles.form} flex items-center gap-[30px]`}>
                    <Image
                        className="absolute bottom-[0] h-[137px]"
                        src="/micro.png"
                        alt='micro'
                        width={95}
                        height={90}
                    />
                    <div className="pl-[135px]">
                        <p className={`text-[20px] text-[#3D9ED6] mb-[28px]`}>Подписаться на новости</p>


                        <FormProvider {...methods}>
                            <form action="#"  className={`flex items-center gap-[10px]`}>
                                {/*<input*/}
                                {/*    className="w-[228px] bg-[#101010] z-[1] border border-[#353535] rounded-[4px] py-[8px] pr-[10px] pl-[13px] focus:outline-none active:outline-none "*/}
                                {/*    type="email" name="email" id="email" placeholder="Email"/>*/}

                                <AppInput
                                    className={`${styles.footerInpt} !w-[227px] z-[2] mb-[34px] max-h-[42px] !bg-[#101010] focus:!bg-[#20272A] !py-[8px] !pr-[10px] !pl-[13px]`}
                                    title={'Email'}
                                    inputName="email"
                                    required={true}
                                />

                                <button
                                    className="w-[60px] h-[40px] bg-[#101010] z-[1] mb-[10px] border border-[#353535] rounded-[4px] py-[8px] px-[18px] cursor-pointer"
                                    type="submit">
                                    <Image
                                        className=' transition-all duration-[.3s] ease-in-out'
                                        src="/send-icon.svg"
                                        alt='send-icon'
                                        width={24}
                                        height={24}
                                    />
                                </button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
                <div className={`${styles.logo} mx-[10px] text-center flex flex-col justify-center items-center gap-[13px] w-full`}>
                    <p className="font-[400 text-[#878787] text-[16px]">ИНН 6000005874 </p>
                    <h3 className="text-[18px]">ООО &quot;АУДИОСЕКТОР&quot;</h3>
                    <p className="font-[400 text-[#878787] text-[16px]">Политика конфиденциальности</p>
                </div>
                <div className={`${styles.links} flex text-end gap-[76px] h-full`}>
                    <div className="flex items-end justify-between flex-col">
                        <ul className="flex items-center gap-[20px]">
                            <li><a href="#" className="text-[18px]">Блог</a></li>
                            <li><a href="#" className="text-[18px]">Лицензии</a></li>
                            <li><a href="#" className="text-[18px]">Контакты</a></li>
                        </ul>

                        <p className="text-[16px] text-[#A4A4A4]">
                            © 2025 Audiosector
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
            `}</style>
        </footer>
    );
};

export default Footer;