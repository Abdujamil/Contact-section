'use client';

import React from 'react';
import styles from "@/app/page.module.scss";
// import FooterSubscriptionForm from "@/components/footer/FooterSubscriptionForm";
// import FooterCompanyInfo from "@/components/footer/FooterCompanyInfo";
// import FooterLinks from "@/components/footer/FooterLinks";

const FooterMob: React.FC = () => {
    return (
        <footer
            className={`${styles.footer} !font-[Rubik] z-[99] w-full shadow-[0_0_10px_-5px_#000000] backdrop-blur-sm`}>
            <div className={`${styles.footerTop} 
        w-full h-full md:max-h-[127px] py-[20px] pl-[30px] px-[30px] rounded-[4px] flex flex-col md:flex-row md:items-center items-start justify-between
        md:gap-0 gap-10
        `}>
                <div className={`w-full flex flex-col items-start `}>
                    <div className={`w-full flex items-center justify-between`}>
                        <p>info@audiosector.ru</p>
                        <p>customButton</p>
                    </div>
                    <p>Контакты</p>
                    <p>Telegram</p>
                </div>

                <svg width="303" height="1" viewBox="0 0 303 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="-4.37114e-08" y1="0.5" x2="303" y2="0.499974" stroke="url(#paint0_linear_5511_3251)"/>
                    <defs>
                        <linearGradient id="paint0_linear_5511_3251" x1="4.37114e-08" y1="1.5" x2="303" y2="1.49997"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#9C9C9C"/>
                            <stop offset="1" stopColor="#9C9C9C" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                </svg>

                <div className={`flex flex-col items-start `}>
                    <p>Лицензии</p>
                    <p>Публичная оферта</p>
                    <p>Политика конфиденциальности</p>
                </div>

                {/*<FooterLinks />*/}
                {/*<FooterSubscriptionForm />*/}
                {/*<FooterCompanyInfo />*/}
            </div>


            <div className={`h-[143px] flex flex-col gap-[10px] items-center justify-center mt-[6px]`}>
                <p>ИНН 6000005874</p>
                <p>ООО АУДИОСЕКТОР</p>
                <p>© 2025 Audiosector</p>
            </div>
        </footer>
    );
};

export default FooterMob;