"use client";
import React from "react";
import styles from '../app/page.module.scss';
// import FooterSubscriptionForm from "../components/footer/FooterSubscriptionForm";
import FooterCompanyInfo from "../components/footer/FooterCompanyInfo";
import FooterLinks from "../components/footer/FooterLinks";

const Footer: React.FC = () => (
    <footer className={`${styles.footer} !font-[Rubik] z-[99] w-full bg-[#ffffff10] shadow-[0_0_10px_-5px_#000000]`}>
        <div className={`${styles.footerTop} 
        w-full h-full md:max-h-[127px] py-[20px] pl-[30px] px-[30px] rounded-[4px] flex flex-col md:flex-row items-center justify-between
        
        `}>
            {/*<FooterSubscriptionForm />*/}
            <FooterCompanyInfo />
            <FooterLinks />
        </div>
    </footer>
);

export default Footer;
