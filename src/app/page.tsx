'use client';
import Footer from './footer';
import styles from "../app/page.module.scss";
import React from "react";
import Header from "@/components/header/Header";

export default function Home() {

    return (
        <>
            <div className={`${styles.page} h-dvh`}>
                {/* Background */}
                <div
                    className={`${styles.faqBg} fixed w-full h-dvh bg-[url(/bg.png)] bg-no-repeat left-0 top-0 z-[-1]`}
                    style={{backgroundAttachment: 'fixed',}}
                >
                    <div className={`${styles.linear}  absolute inset-0 bg-black/20`}></div>
                </div>
                <div className={`${styles.contact} w-full h-full mx-auto flex flex-col items-center`}>
                    <Header/>
                    <div
                        className={`${styles.contactContainer} w-full max-w-[1160px] h-full min-h-[432px] flex justify-center items-center `}>
                       <h1 className={`text-[50px]`} >Welcome</h1>
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    );
}
